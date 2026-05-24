Run ESLint and report any violations.

**In devcontainer (standard):**

```
npm run lint
```

**On local machine without devcontainer:**

```
docker compose run --rm typescript npm run lint
```

Execute the appropriate command. If there are lint errors or warnings, show the file paths, rule names, and messages.
