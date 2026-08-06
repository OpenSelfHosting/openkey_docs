# Packages

Packages you can self-host and build. Install the app from [Download](./download). Day-to-day usage: [Using the app](./app). Browser setup: [Browser extension](./extension).

Published remotes under [OpenSelfHosting](https://github.com/OpenSelfHosting) may ship packages separately; this docs site describes the open packages in the local monorepo checkout.

| Path | Description |
|------|-------------|
| `openkey_app` | Flutter client (Android, iOS, desktop) — product app |
| `openkey_server` | FastAPI zero-knowledge sync API + PostgreSQL |
| `openkey_extension` | MV3 browser extension (Chrome / Firefox) |
| `openkey_cli` | Developer CLI — secrets, password generation, sync |
| `openkey_docs` | This site — product pages and documentation |

Each package has its own README with setup details. Report security issues to **security@openselfhosting.com** — see [Security](./security#reporting-vulnerabilities).

## Server highlights

- Ciphertext-only storage
- JWT access tokens + rotating opaque refresh tokens
- Alembic migrations on PostgreSQL 16
- Auth rate limiting and strict CORS

## Extension highlights

- Standalone vault unlock + sync, or native bridge to the unlocked desktop app
- Autofill overlays, save/update prompts, passkeys
- Cards, crypto wallets, and developer secrets

Full guide: [Browser extension](./extension).

## CLI highlights

- Offline password generation
- Discover SSH keys, `.env` files, and API tokens into the unlocked desktop app
- Optional login / unlock / sync against your server
