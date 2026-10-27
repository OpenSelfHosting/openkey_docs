# Overview

OpenKey is a **self-hosted, end-to-end encrypted password manager**. Clients encrypt vault data before it leaves the device. The optional sync server stores **ciphertext only** — master passwords and plaintext vault keys never leave the client.

<img src="/guide/overview-ecosystem.svg" alt="OpenKey ecosystem: app, browser extension, and CLI encrypt on device; optional sync via self-hosted server (ciphertext only) or Nearby LAN pairing" class="ok-diagram" width="920" height="440" />

## What you get

- Local encrypted vault (collections, logins, cards, crypto wallets, developer secrets)
- Optional sync across devices through your own server **or** Nearby LAN pairing (Pro). A new device can also **copy** a vault over Nearby at setup, restore a `.okbak`, or sign in to your server.
- Browser extension with autofill, fill shortcut, and passkeys
- Mobile / desktop app and developer CLI
- Organizations, shared collections, and item shares — still ciphertext on the server

## Zero-knowledge model

1. The client derives keys from your master password with **Argon2id**.
2. An `auth_hash` authenticates you to the server without revealing the master password.
3. Vault contents stay encrypted with a vault key that the server never sees in plaintext.
4. Names, payloads, attachments, org names, and share payloads are opaque ciphertext at rest on the server.

## Open-source projects

| Project | License | Role |
|---------|---------|------|
| [OpenKey app](https://github.com/OpenSelfHosting/OpenKey) | MIT | Flutter client for Android, iOS, macOS, Linux, and Windows |
| `spec/` in [OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey/tree/main/spec) | MIT | Protocol and cryptography specifications |
| `openkey_server` | MIT | FastAPI zero-knowledge sync API + PostgreSQL |
| `openkey_extension` | MIT | MV3 browser extension (Chrome / Firefox) |
| `openkey_cli` | MIT | Developer CLI (secrets, password gen, sync) |
| `openkey_docs` | MIT | Product site and documentation |

Build the app from source using the [repository README](https://github.com/OpenSelfHosting/OpenKey#build-from-source), or get an official build through [Download](./download). For product use, see [Using the app](./app), [Nearby](./nearby), [Browser extension](./extension), [Packages](./packages), [Server setup](./server), [FAQ](./faq), [Changelog](./changelog), and [Quick start](./quick-start).
