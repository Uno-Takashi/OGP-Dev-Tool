Run TypeScript type checking and report any errors.

**In devcontainer (standard):**
```
npm run type-check
```

**On local machine without devcontainer:**
```
docker compose run --rm typescript npm run type-check
```

Execute the appropriate command. If there are type errors, show the file paths and error messages.
