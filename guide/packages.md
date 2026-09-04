# Packages

Install the official app from [Download](./download) (binaries / stores). Self-host and build the **open** packages below. Day-to-day usage: [Using the app](./app). Browser setup: [Browser extension](./extension).

The protocol spec lives in [OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey) (`spec/`). Published remotes under [OpenSelfHosting](https://github.com/OpenSelfHosting) ship packages separately.

| Path | Source | Description |
|------|--------|-------------|
| Official **OpenKey app** | Proprietary | Flutter client (Android, iOS, desktop). Install from [Download](./download) / GitHub Releases — not from public source |
| `openkey_server` | MIT | FastAPI zero-knowledge sync API + PostgreSQL |
| `openkey_extension` | MIT | MV3 browser extension (Chrome / Firefox / Edge / Brave / LibreWolf) |
| `openkey_cli` | MIT | Developer CLI — secrets, password generation, sync; Termux on Android |
| `openkey_docs` | MIT | This site — product pages and documentation |

Each **open** package has its own README with setup details. Report security issues to **security@openselfhosting.com** — see [Security](./security#reporting-vulnerabilities).

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
- Discover SSH keys, `.env` files, and API tokens into the unlocked desktop (or Termux) app
- Optional login / unlock / sync against your server
