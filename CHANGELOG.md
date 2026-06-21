# Changelog

## 0.1.5

- Fix Threads carousel publishing types and docs to use `media_type=CAROUSEL` with `children`.
- Add Postman collection path coverage for reposts, media container status, profiles, locations, oEmbed, reply approvals, and token helpers.
- Add `client.locations`, public profile lookup/posts helpers, user replies, publishing limits, `client.posts.repost()`, and `client.posts.getContainerStatus()`.
- Update generated API reference and README against current Meta Threads reference pages and the public Postman collection.

## 0.1.4

- Fix token exchange and refresh utilities to call unversioned Threads token endpoints.
- Add a regression test covering `/access_token` and `/refresh_access_token` request paths.

## 0.1.0

- Initial publish-ready SDK scaffold for the Meta Threads API.
- Registry-driven API reference and README endpoint status.
- Typed Node.js client with token-safe errors, pagination helpers, and mocked endpoint tests.
