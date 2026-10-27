# Changelog

Release notes for OpenKey. Official **app** version is the GitHub Release tag on [OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey/releases). The app source is public under MIT. Related packages version independently; docs version tracks this site.

## App source is public

The official Flutter app and protocol specification are now published under the MIT License in [OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey). See the repository [README](https://github.com/OpenSelfHosting/OpenKey#build-from-source) to build from source; prebuilt official releases remain available on [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases).

## 1.0.6 (2026-09-08)

Aligned with app **1.0.6+14**.

### App

- **Setup chooser** — Create vault / Sign in / **Nearby device** (vault clone) / Restore `.okbak` on first run
- **Nearby vault clone** — copy a full vault (incl. attachments) over Wi‑Fi to an empty device; beacon `vault` flag; session-encrypted chunked archive (`vault_clone` / `vault_clone_push`)
- **Nearby pairing UX** — tap a discovered peer to pair (QR scanner screen removed); Link vault still required for merge sync
- **Attachment preview** — in-app preview for image / text / audio; video on Android / iOS / macOS when supported; richer `content_type` on upload
- **Linux on every distro family** — AppImage (any glibc), `.deb`, `.rpm`, portable `.tar.gz` with Arch `PKGBUILD`; desktop icon uses `com.openselfhosting.openkey`
- **Rounded app icon** on Windows, Linux, macOS, and this docs site (forest default)
- **Nearby merge sync** — LAN LWW while both vaults are unlocked; discovery beacons include the device name on the LAN; lock pauses Nearby; desktop may prompt for UDP/TCP **47821** and TCP **47822**
- **Autofill** — richer system suggestions (password generate, dataset UI) on Android / iOS / macOS
- **Payment cards** — Visa, Mastercard, Amex, Discover, UnionPay, RuPay, Elo, Hipercard, Mir; bank grouping
- **Termux / CLI** — Android (and desktop) Settings → Data shows install + connect commands; Termux uses `OPENKEY_NATIVE_PORT` + `OPENKEY_NATIVE_TOKEN`
- Native messaging also registers **LibreWolf** and **Vivaldi** (plus Chrome Beta)

### Docs

- Nearby / FAQ / app guides: vault clone, setup chooser, tap-to-pair (QR-first docs removed)
- Attachment preview and `content_type`; `.okbak` vs Nearby clone in import-export
- Spec: new [Nearby LAN protocol](https://github.com/OpenSelfHosting/OpenKey/blob/main/spec/nearby.md); sync/vault attachment `content_type`
- Download picker and install notes for AppImage / RPM / Arch

### CLI

- Native bridge on Android Termux via `OPENKEY_NATIVE_PORT` / `OPENKEY_NATIVE_TOKEN` (unlock the app, copy the connect block)
- `cards` / `crypto` list commands; session vault decrypts card and crypto payloads
- `npm install -g openkey-cli`
- Docs clarify: `openkey discover` scans this machine for secrets — it is **not** Nearby LAN discovery; attachments and vault clone live in the app

### Browser extension

- Card brands aligned with the app; toolbar icons use the rounded forest mark
- Native `createSecret` / `updateSecret` / card and crypto CRUD; card bank and crypto folder fields; LibreWolf / Vivaldi host dirs documented
- Attachment downloads use stored / guessed MIME `content_type` when saving files (standalone)

### Server

- Attachments: optional multipart `content_type` (already in API); docs note Nearby vault clone is P2P and never hits this API

## 1.0.6 (2026-08-28)

Earlier **1.0.6+7** cut (superseded by the notes above for current docs):

### App

- Linux packaging family, Nearby merge sync, Autofill extras, card banks, restore at setup, Termux / CLI sheet, LibreWolf / Vivaldi native host

### Docs / CLI / extension

- Initial 1.0.6 alignment for download channels, Nearby merge docs, CLI Termux bridge, extension card brands

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
