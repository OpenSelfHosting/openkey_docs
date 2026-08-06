# Overview

OpenKey is a **self-hosted, end-to-end encrypted password manager**. Clients encrypt vault data before it leaves the device. The optional sync server stores **ciphertext only** — master passwords and plaintext vault keys never leave the client.

## What you get

- Local encrypted vault (collections, logins, cards, crypto wallets, developer secrets)
- Optional sync across devices through your own server **or** Nearby LAN pairing (Pro)
- Browser extension with autofill, fill shortcut, and passkeys
- Mobile / desktop app and developer CLI
- Organizations, shared collections, and item shares — still ciphertext on the server

## Zero-knowledge model

1. The client derives keys from your master password with **Argon2id**.
2. An `auth_hash` authenticates you to the server without revealing the master password.
3. Vault contents stay encrypted with a vault key that the server never sees in plaintext.
4. Names, payloads, attachments, org names, and share payloads are opaque ciphertext at rest on the server.

## Open packages

| Package | Role |
|---------|------|
| `openkey_server` | FastAPI zero-knowledge sync API + PostgreSQL |
| `openkey_extension` | MV3 browser extension (Chrome / Firefox) |
| `openkey_cli` | Developer CLI (secrets, password gen, sync) |

The mobile and desktop **OpenKey app** is covered separately. See [Download](./download), [Using the app](./app), [Nearby](./nearby), [Browser extension](./extension), [Packages](./packages), [Server setup](./server), [FAQ](./faq), [Changelog](./changelog), and [Quick start](./quick-start).
