# Changelog

Release notes for OpenKey packages in this monorepo. App version follows `openkey_app` (`pubspec.yaml`). Docs version tracks this site.

## 1.0.0 (2026)

First public documentation cut aligned with app **1.0.0+1** and the open packages (`openkey_server`, `openkey_extension`, `openkey_cli`, `openkey_docs`).

### App

- Local encrypted vault: collections, logins, cards, crypto wallets, developer secrets, TOTP
- System Autofill / Credential Provider and passkeys (platform-dependent)
- Self-hosted server sync (ciphertext only)
- Nearby LAN vault sync between paired devices (**Pro**)
- Organizations, invites, and item/collection shares (**Pro**)
- Import (free) / export & `.okbak` backups (**Pro**)
- Freemium limits: 50 entries, 3 collections / cards / crypto / secrets on free tier
- Packaging for Play, App Store, Mac App Store, Microsoft Store, Snap, Flathub, and desktop installers

### Server

- FastAPI zero-knowledge sync API + PostgreSQL 16
- Auth (`prelogin` / register / login / refresh / rekey / delete), sync, attachments, orgs, shares
- Short-lived JWTs, rotating opaque refresh tokens, auth rate limits, strict CORS

### Browser extension

- MV3 Chrome / Firefox: standalone unlock + sync, or desktop native messaging bridge
- Autofill, save/update, passkeys, cards / crypto / secrets, shares & orgs (standalone)

### CLI

- Offline `gen`, native bridge to unlocked desktop app, `discover`, secrets CRUD
- Optional server `login` / `unlock` / `sync` session

### Docs site

- VitePress product site in 10 locales (RTL for Arabic and Urdu)
- Guides: overview, security, quick start, download, server (incl. HTTPS reverse proxy + API overview), app, **Nearby**, extension, CLI, sharing, import/export, FAQ, packages, changelog
- **Chinese (zh), Spanish (es), and French (fr)** full guide sets aligned with EN/AR for major pages
- Blog posts in all 10 locales (7 articles each), including **Nearby without a server** and **OpenKey Pro**
- **Pricing** (`/pricing`): Free vs Pro matrix in all locales (zh abbreviated); stable `#free-vs-openkey-pro` anchors
- Privacy & Terms in all locales (zh summarized)
- Home page: hero + feature / platforms / how-it-works / CTA sections
- Site footer + GitHub social link

## Unreleased / next

- Live GitHub Release artifacts + store listing URLs once each channel is published (`scripts/store-urls.config.json`)
- Fuller changelog and security guides for hi / bn / pt / ru / ur
- FAQ heading polish for hi / bn (some English H2/H3 skeletons remain)
- Changelog entries per package as standalone remotes ship tagged releases
- Product screenshots beyond brand icon / wordmark

## How versions relate

| Package | Where to look |
|---------|----------------|
| App | `openkey_app/pubspec.yaml` → `version` |
| Server | Git tags / image tags for `openkey_server` |
| Extension / CLI | `package.json` in each package |
| Docs | This page + site deploy |

Report security issues privately — **security@openselfhosting.com**. See [Security → Reporting](./security#reporting-vulnerabilities).

Next: [Download](./download) · [Nearby](./nearby) · [FAQ](./faq) · [Security](./security)
