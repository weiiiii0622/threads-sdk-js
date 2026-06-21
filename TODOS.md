# TODOS

## Infrastructure

### Add npm release workflow

**What:** Add a GitHub Actions workflow that builds, tests, packs, and publishes `thread-sdk-js` to npm.

**Why:** Manual npm publish is acceptable for v1, but repeated releases need reproducible build/test/docs/pack checks and a safer maintainer handoff.

**Context:** The approved v1 plan intentionally stops at package metadata, `npm run build`, `npm test`, `npm run docs:check`, and `npm pack --dry-run`. After the first SDK scaffold exists and the npm publishing account is chosen, add a release workflow with npm provenance if available.

**Effort:** M
**Priority:** P2
**Depends on:** v1 package scaffold and chosen npm publishing account.

## Completed
