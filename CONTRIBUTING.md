# Contribution Guidelines

## Installation

- `git clone <repository-url>`
- `cd ember-cli-polyfill-io`
- `yarn install`

## Linting

- `yarn lint`
- `yarn lint --fix`

## Running tests

- `yarn test` – Run the tests

## Committing

This project uses [conventional commits][conventional-commits] to help generate changelogs and handle versioning based on the changed made. Please read that document to understand the format. The high-level points are that:

- Commits names should be prefixed with one of:
  - `feat:` for new features that do not break old functionality
  - `fix:` for bug fixes or cleanup work
  - `chore:` for basic project maintenance
- Breaking changes should include the words `BREAKING CHANGE:` in the commit body

Additionally, make sure commit in small, logical chunks. If the entire pull request is for a single change, please squash all commits together. If there are multiple changes, please split them out into logical groupings with the appropriate commit format.

[conventional-commits]: https://conventionalcommits.org/

## Releasing

Use `standard-version` to generate a new release with a changelog based on the commit log.

Make sure everything looks correct first using the `--dry-run` flag

```
yarn release --dry-run
```

Assuming it does, cut a "real" release

```
yarn release
```
