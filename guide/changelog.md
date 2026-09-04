# Changelog

Release notes for OpenKey. Official **app** version is the GitHub Release tag on [OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey/releases) (source is private). Open packages version independently. Docs version tracks this site.

## 1.0.6 (2026-08-28)

Aligned with app **1.0.6+7**.

### App

- **Linux on every distro family** — AppImage (any glibc), `.deb`, `.rpm`, portable `.tar.gz` with Arch `PKGBUILD`; desktop icon uses `com.openselfhosting.openkey`
- **Rounded app icon** on Windows, Linux, macOS, and this docs site (forest default)
- **Nearby** — LAN merge while both vaults are unlocked; discovery beacons include the device name on the LAN; lock pauses Nearby; desktop may prompt for UDP/TCP **47821** and TCP **47822**
- **Autofill** — richer system suggestions (password generate, dataset UI) on Android / iOS / macOS
- **Payment cards** — Visa, Mastercard, Amex, Discover, UnionPay, RuPay, Elo, Hipercard, Mir; bank grouping
- **Restore at setup** — pick a Pro `.okbak` on the first-run screen instead of creating an empty vault
- **Termux / CLI** — Android (and desktop) Settings → Data shows install + connect commands; Termux uses `OPENKEY_NATIVE_PORT` + `OPENKEY_NATIVE_TOKEN`
- Native messaging also registers **LibreWolf** and **Vivaldi** (plus Chrome Beta)

### Docs

- Download picker and install notes for AppImage / RPM / Arch
- Official app source is proprietary; binaries and protocol spec live in [OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey)
- Nearby, Autofill (under Settings → Security), CLI (Termux), card banks / crypto folders, and extension native-host paths updated
- Removed stale Password health / HIBP claims (not in the current app)

### CLI

- Native bridge on Android Termux via `OPENKEY_NATIVE_PORT` / `OPENKEY_NATIVE_TOKEN` (unlock the app, copy the connect block)
- `cards` / `crypto` list commands; session vault decrypts card and crypto payloads
- `npm install -g openkey-cli`

### Browser extension

- Card brands aligned with the app; toolbar icons use the rounded forest mark
- Native `createSecret` / `updateSecret` / card and crypto CRUD; card bank and crypto folder fields; LibreWolf / Vivaldi host dirs documented

## 1.0.2 (2026-08-13)

Aligned with app **1.0.2+3**.

### App

- **Removed Flutter web target** — OpenKey ships as native Android, iOS, macOS, Windows, and Linux only (no `web/` build or `build_all` web artifacts)
- Pro enforcement applies on all shipped desktop and mobile targets

### Docs

- Removed references to a separate web app build; pricing, FAQ, privacy, and terms updated accordingly
- Product screenshots on the home hero and [Using the app](./app) guide (vault, onboarding, desktop previews)

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
- FAQ heading polish for hi / bn (some English H2/H3 skeletons remain)
- Changelog entries per package as standalone remotes ship tagged releases

## How versions relate

| Package | Where to look |
|---------|----------------|
| App | GitHub Releases on [OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey/releases) |
| Server | Git tags / image tags for `openkey_server` |
| Extension / CLI | `package.json` in each package |
| Docs | This page + site deploy |

Report security issues privately — **security@openselfhosting.com**. See [Security → Reporting](./security#reporting-vulnerabilities).

Next: [Download](./download) · [Nearby](./nearby) · [FAQ](./faq) · [Security](./security)
