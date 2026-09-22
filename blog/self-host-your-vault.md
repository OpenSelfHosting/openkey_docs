---
title: Why self-host your password vault
description: Control, privacy, and a sync server that stores ciphertext only — how to run OpenKey on your own hardware with Docker.
date: 2026-08-03
cover: /blog/covers/self-host-your-vault.png
---

# Why self-host your password vault

Password managers sit at the center of your digital life. When that vault lives only on someone else’s cloud, outages, policy changes, and breaches become *your* risk. Self-hosting flips the default: you choose the machine, the backups, and who can reach the API.

## What you control

| You own | The server never gets |
|---------|------------------------|
| Where ciphertext is stored | Master password |
| When upgrades and backups run | Plaintext vault keys |
| Which clients may connect (`CORS_ORIGINS`, HTTPS) | Readable entry names or passwords |
| Whether sync is on at all | Decrypted attachments or shares |

The OpenKey app works offline with a local encrypted database. Point **Settings → Data → Self-hosted server** at your instance when you want multi-device sync — same zero-knowledge rules either way. Prefer keeping at least one **encrypted local backup**; the server cannot recover a forgotten master password.

## A practical shape

Many people start with Docker on a home NAS or a small VPS:

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # JWT_SECRET (min 32 characters; placeholders are rejected)
docker compose up --build -d
```

Put TLS in front (Caddy, Traefik, or your reverse proxy), set a long unique `JWT_SECRET`, and restrict `CORS_ORIGINS` to your app and extension origins — never `*`. Then **Register** from the first device and **Login** from the rest, and use **Sync now** when you want an explicit pull/push.

## LAN without a server

If you only need devices on the same Wi‑Fi, **Nearby** vault sync (Pro) can pair and link vaults on the LAN without PostgreSQL. Use it for convenience; still keep offline backups for disaster recovery.

## Who this is for

- Individuals who want sync without a SaaS vault
- Teams that need shared collections but keep crypto on clients
- Developers already running PostgreSQL and comfortable with Compose

You do not need to self-host to use OpenKey locally. You self-host when you want **your** sync plane — with ciphertext-only storage as the hard rule.

## Next steps

- [Server setup](/guide/server) — install, configure, and link clients
- [Using the app](/guide/app) — vault workflows, Nearby, import/export
- [Security](/guide/security) — hardening checklist and threat model
- [Overview](/guide/overview) — packages and the zero-knowledge model
