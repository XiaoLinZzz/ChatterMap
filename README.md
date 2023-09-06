# MyApp

## Getting Started

View our [change log](CHANGELOG.md)

Our change log template is following [keep a changelog](http://keepachangelog.com/en/1.0.0/)

A changelog should be maintained to document all changes introduced into the codebase and should be updated as part of the final step in each pull request process.

****Criteria -**** Branch types can be one of:

- `init` for initial setting up.
- `feat` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

**e.g.**

Format of the branch name is `{feat, fix, refactor}/{your_modification}`

## Workflow

1. Fetch the newest master: `git pull origin master`
2. From master branch checkout your branch in this format: `{branch_type}/{your_modification}`
3. Before you start coding, make a temporary update in `[CHANGELOG.md](http://changelog.md)` and make a commit, then push the branch onto remote and create pull request
4. Work on your task and commit code incrementally and push to remote
5. Update `[CHANGELOG.md](<http://changelog.md>)` when all code is done, in accordance to Semantic Versioning, and https://keepachangelog.com/en/1.0.0/
6. When task is finished, fetch new master: `git checkout master && git pull origin master` and rebase: `git checkout <your branch> && git push origin <your branch>`