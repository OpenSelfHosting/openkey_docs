---
title: Zero-knowledge sync explained
description: How OpenKey syncs vaults across devices without giving the server plaintext — Argon2id, auth hashes, and ciphertext-only storage.
date: 2026-08-04
cover: /blog/covers/zero-knowledge-sync.png
---

# Zero-knowledge sync explained

Sync is useful. Trusting a remote machine with your passwords is not. OpenKey separates those ideas: you can sync across phones, desktops, and the browser extension while the server only ever stores **ciphertext**.

## What “zero-knowledge” means here

1. Your master password stays on the device. Clients derive a master key with **Argon2id** from email + master password and a salt.
2. Login sends an `auth_hash` — enough to prove you know the password, not enough to recover it.
3. A **vault key** encrypts collection names and entry payloads with **AES-256-GCM**. The server stores only a wrapped (encrypted) vault key, never the plaintext key.
4. Attachments, organization names, and share payloads leave the device already encrypted. The sync API persists opaque blobs; it cannot decrypt them even if the database is copied.

## What the server is for

The optional OpenKey server is a sync and auth surface:

- Account registration and login (via `auth_hash`)
- Push / pull of encrypted vault payloads (last-write-wins by per-item `revision`)
- Organizations and shares — still ciphertext at rest
- Short-lived access JWTs and hashed, rotated refresh tokens

It is **not** a place that reconstructs your vault. If you never configure a server URL, the app still works as a local encrypted vault. There is also **no master-password recovery**: if you lose it, ciphertext is unrecoverable — keep an offline backup.

## Nearby on the LAN

Want multi-device sync without standing up PostgreSQL? **Nearby** (Pro) pairs devices on local Wi‑Fi, links a shared vault key, and syncs ciphertext between them with the same LWW rule. Treat pairing and vault link like full vault trust; it is not a substitute for encrypted backups.

## Why this model matters

Cloud password managers ask you to trust their infrastructure and their operators. OpenKey asks you to trust **your** host (or a VPS you control) with storage and uptime only — not with secrets. A stolen database is not a stolen vault.

## Dig deeper

- [Security](/guide/security) — key derivation, threat model, and operational checklist
- [Server setup](/guide/server) — install Docker sync and link clients
- [Using the app](/guide/app) — Nearby, backups, and everyday vault use
- [Quick start](/guide/quick-start) — run the stack locally
