---
title: Nearby without a server
description: Discover peers on your Wi‑Fi, copy a vault at setup or link vaults for LAN sync — no self-hosted API required.
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.png
---

# Nearby without a server

Self-hosting a sync API is powerful — and optional. **Nearby** (OpenKey Pro) keeps the same zero-knowledge posture on your local network: devices discover each other, pair for a session key, and you either **copy a vault** onto a new device at setup or explicitly **Trust & link vault** for ongoing merge sync. Pairing alone never auto-shares the vault key.

## When to use it

- Two or more of your devices on the same home or office Wi‑Fi
- You want sync without standing up Docker / Postgres yet
- A **new phone or desktop** should receive a full vault copy without a `.okbak` file
- You need a one-off **Send to device** for a single login without a full vault pull

Merge sync is **not** a backup. Keep a Pro [encrypted `.okbak`](/guide/import-export) offline. Guest networks and client isolation break discovery — use a normal LAN segment.

## Copy vault to a new device

1. Unlock the existing device → **Settings → Nearby devices** → **Visible on local network**.
2. On the new device, choose **Nearby device** on the first-run setup chooser.
3. Tap the peer → confirm → unlock with the **same master password**.

That ships a session-encrypted full-vault archive (including attachments). Details: [Nearby → Copy vault at setup](/guide/nearby#copy-vault-at-setup-vault-clone).

## Pair for ongoing sync

1. Unlock OpenKey on both devices → **Settings → Nearby devices**.
2. Enable **Visible on local network**.
3. Tap a discovered peer to pair (short code still works within about two minutes when discovery is awkward).
4. Tap **Trust & link vault** so both share the same vault-key fingerprint.

If a Mac firewall blocks inbound TCP, OpenKey can ask the advertising host to dial back — allow the OS network prompts.

## After you link

Changes sync while both vaults are unlocked and Nearby is advertising (**last-write-wins by revision**, same rule as the server). Trusted devices reconnect automatically; optional **Trusted networks only** pauses Nearby off your SSIDs. **Unpair** revokes LAN trust and LAN Pro claims.

## LAN Pro, briefly

On Windows / Linux (no store IAP), a **vault-linked** Pro peer may share a **LAN Pro** attestation so the other device unlocks Pro limits. Pairing without link is not enough. Android, iOS, and macOS ignore it — buy or restore Pro on the store. Treat attestation as convenience, not a cryptographic purchase proof.

## Dig deeper

- Full walkthrough: [Nearby LAN sync](/guide/nearby)
- Threat model: [Security](/guide/security)
- App Pro matrix: [Using the app](/guide/app)
- FAQ troubleshooting: [Nearby does not find the other device](/guide/faq)
