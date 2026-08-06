---
title: Welcome to OpenKey
description: Why we built a self-hosted password manager that stores ciphertext only — and what ships across app, server, extension, and CLI.
date: 2026-08-05
cover: /blog/covers/welcome-to-openkey.svg
---

# Welcome to OpenKey

Most password managers ask you to trust a cloud you do not control. OpenKey takes the other path: your vault stays encrypted on the device, an optional sync server stores **ciphertext only**, and master passwords never leave the client.

## Ciphertext only

Clients encrypt vault data before anything leaves the device. The sync API — when you use one — stores opaque blobs. Collection names, entry payloads, attachments, organization names, and share data stay ciphertext at rest. Compromising the database yields salts, KDF parameters, wrapped keys, and blobs — not readable logins.

## What ships today

| Piece | Role |
|-------|------|
| **App** | Everyday vault on Android, iOS, macOS, Linux, and Windows — logins, cards, crypto wallets, developer secrets, organizations, and sharing |
| **Server** | FastAPI + PostgreSQL zero-knowledge sync API you can self-host |
| **Extension** | MV3 autofill and passkeys for Chrome and Firefox |
| **CLI** | Offline password generation, local secret discovery, and optional sync |

You can also sync a vault across devices on the same Wi‑Fi with **Nearby** (Pro) — no server required for that LAN path. Server sync and Nearby both move ciphertext only (last-write-wins by revision).

## Get started

- [Quick start](/guide/quick-start) — run the stack locally
- [Using the app](/guide/app) — vault workflows on phone and desktop
- [Security](/guide/security) — zero-knowledge model and threat boundaries
- [Server setup](/guide/server) — install and link your own sync host

Also on the blog: [zero-knowledge sync](/blog/zero-knowledge-sync), [Nearby without a server](/blog/nearby-without-a-server), [self-hosting](/blog/self-host-your-vault), [passkeys & autofill](/blog/passkeys-and-autofill), and the [developer CLI](/blog/cli-for-developers). Code lives under [OpenSelfHosting on GitHub](https://github.com/OpenSelfHosting).
