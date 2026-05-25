Review and merge open Dependabot version-bump PRs. Work through each PR sequentially, waiting for CI before merging.

## Step 1 — List open Dependabot PRs

```
gh pr list --author "app/dependabot" --state open --json number,title,headRefName,mergeable,statusCheckRollup
```

## Step 2 — Triage each PR

For each open PR, check its CI status and categorize:

| Status | Action |
|--------|--------|
| All checks pass | Merge immediately with `gh pr merge <N> --squash` |
| Only `format-check` failing | Comment `@dependabot rebase` — the PR was based on an old commit and `public/manifest.json` formatting differs. Rebase picks up formatting fixes. |
| `build` or `type-check` failing | Investigate via `gh run view <run-id> --log-failed`; fix the root cause with a separate PR on `main`, then `@dependabot rebase` |
| `lint` failing | Same as build failure — investigate and fix before rebasing |

## Step 3 — Investigate build/type-check failures

```
gh run view <run-id> --log-failed
```

### Known patterns (from 2026-05-25 session)

**TypeScript 6.0 — moduleResolution deprecation (TS5107)**
> `Option 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0.`
- Fix: In `tsconfig.json`, change `"module": "commonjs"` → `"module": "ES2020"` and `"moduleResolution": "node"` → `"moduleResolution": "bundler"`. The `bundler` option is the recommended replacement for webpack projects (available since TS 5.0). Do NOT add `"ignoreDeprecations": "6.0"` — it is only valid at runtime with TS 6.x and breaks TS 5.x builds.
- Applied in PR #75.

**TypeScript 6.0 — SCSS side-effect import (TS2882)**
> `Cannot find module or type declarations for side-effect import of '*.scss'`
- Fix: Add `src/declarations.d.ts` containing `declare module '*.scss';` and `declare module '*.css';`
- Applied in PR #76.

**ESLint 10 — eslint-plugin-react incompatibility**
> `TypeError: contextOrFilename.getFilename is not a function`
- Root cause: `eslint-plugin-react` v7.x uses the old ESLint context API removed in ESLint 10.
- As of 2026-05, `eslint-plugin-react` latest (v7.37.5) still doesn't support ESLint 10. See: https://github.com/jsx-eslint/eslint-plugin-react/issues/3977
- Action: Leave a comment on the PR explaining the blocker. Do NOT merge.

**manifest.json format-check failures on all PRs**
> `[warn] public/manifest.json — Code style issues found`
- Root cause: prettier formats single-element arrays inline; older PR branches have the multi-line version.
- Fix: `@dependabot rebase` on the affected PRs (they pick up the formatted version from main).

## Step 4 — Fix in codebase (if needed)

1. Create a fix branch: `git checkout -b fix/<description>`
2. Verify locally before pushing:
   ```
   docker compose run --rm typescript npm run type-check
   docker compose run --rm typescript npm run build
   docker compose run --rm typescript npm run lint
   docker compose run --rm typescript npx prettier --check "src/**/*.{ts,tsx,json}" "public/manifest.json" "tsconfig.json"
   ```
3. Commit, push, open PR, wait for all CI to pass, then merge
4. After the fix PR merges to main: `@dependabot rebase` on the dependabot PR

## Step 5 — Merge passing PRs

```
gh pr merge <N> --squash
```

After each merge, dependabot auto-rebases remaining PRs (package-lock.json conflicts). Wait for the rebase (watch for SHA change) before merging the next one.

To detect rebase:
```
until [ "$(gh pr view <N> --json headRefOid --jq '.headRefOid')" != "<old-sha>" ]; do sleep 20; done
```

## Step 6 — Skip incompatible upgrades

If a major-version dep upgrade requires replacing a plugin or significant refactoring, leave a comment on the PR explaining:
- Why it can't be merged yet
- What needs to happen before it can be merged (e.g. upstream plugin releasing ESLint 10 support)
- Link to the relevant upstream issue

Do NOT merge a PR where CI is failing.
