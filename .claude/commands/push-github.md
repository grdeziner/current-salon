# Push to GitHub

Commit all current changes and push to the `grdeziner/current-salon` repo on the `main` branch.

## Steps
1. Run `git status` to review what has changed
2. Stage only the relevant files (HTML, CSS, images — never `.env` or secrets)
3. Write a clear, descriptive commit message summarizing what changed and why
4. Run `git commit`
5. Run `git pull --rebase` to sync with remote first
6. Run `git push`

## Rules
- Never force-push
- Never commit the `.claude/` settings files
- Always pull before pushing to avoid rejected pushes
- Commit message format: short summary line, then bullet details if needed

## Repo
`https://github.com/grdeziner/current-salon` — branch: `main`
