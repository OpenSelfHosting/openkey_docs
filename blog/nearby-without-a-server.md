---
title: Nearby without a server
description: Pair devices on your Wi‑Fi with QR codes, link vaults, and sync ciphertext on the LAN — no self-hosted API required.
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.svg
---

# Nearby without a server

Self-hosting a sync API is powerful — and optional. **Nearby** (OpenKey Pro) keeps the same zero-knowledge posture on your local network: devices pair, you explicitly **Trust & link vault**, and only then does vault-key material move so peers can sync **ciphertext**. Pairing alone never auto-shares the vault key.

## When to use it

- Two or more of your devices on the same home or office Wi‑Fi
- You want sync without standing up Docker / Postgres yet
- You need a one-off **Send to device** for a single login without a full vault pull

It is **not** a backup. Keep a Pro [encrypted `.okbak`](/guide/import-export) offline. Guest networks and client isolation break discovery — use a normal LAN segment.

## Pair with a QR (preferred)

1. Unlock OpenKey on both devices → **Settings → Nearby devices**.
2. Enable **Visible on local network**.
3. On one device, show the pairing QR; on the other, **Scan pairing QR** (or **Paste pairing QR** on Linux/Windows desktop).
4. Tap **Trust & link vault** so both share the same vault-key fingerprint.

Typing the short code still works within about two minutes. If a Mac firewall blocks inbound TCP after a scan, OpenKey can ask the QR host to dial back — allow the OS network prompts.

## After you link

Changes sync while both vaults are unlocked and Nearby is advertising (**last-write-wins by revision**, same rule as the server). Trusted devices reconnect automatically; optional **Trusted networks only** pauses Nearby off your SSIDs. **Unpair** revokes LAN trust and LAN Pro claims.

## LAN Pro, briefly

On Windows / Linux (no store IAP), a **vault-linked** Pro peer may share a **LAN Pro** attestation so the other device unlocks Pro limits. Pairing without link is not enough. Android, iOS, and macOS ignore it — buy or restore Pro on the store. Treat attestation as convenience, not a cryptographic purchase proof.

## Dig deeper

- Full walkthrough: [Nearby LAN sync](/guide/nearby)
- Threat model: [Security](/guide/security)
- App Pro matrix: [Using the app](/guide/app)
- FAQ troubleshooting: [Nearby does not find the other device](/guide/faq)
