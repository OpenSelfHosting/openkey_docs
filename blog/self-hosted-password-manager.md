---
title: "Self-hosted password manager: what it actually takes"
description: Running your own password manager sync server with Docker — what a self-hosted vault really gives you, what it costs you, and a complete setup and hardening checklist.
date: 2026-09-22
cover: /blog/covers/self-hosted-password-manager.png
---

# Self-hosted password manager: what it actually takes

Self-hosting a password manager means running the encrypted-sync server yourself. Your clients encrypt on device; the server you operate stores ciphertext and authenticates you. A compromise of that server yields an encrypted blob, not a password list.

That is a real and durable privacy win. It is also a maintenance commitment, and the honest version of this article describes both.

## What self-hosting actually changes

Be precise about this, because it is where expectations go wrong:

| | Vendor cloud | Self-hosted |
|---|--------------|-------------|
| Who can read your vault | Nobody, if zero-knowledge | Nobody, if zero-knowledge |
| Who can **delete** your vault | The vendor | You |
| Who sees metadata | The vendor | You |
| Who can be compelled to hand over data | The vendor, in their jurisdiction | You, in yours |
| Uptime responsibility | The vendor | You |
| TLS, patching, backups | The vendor | You |
| Cost | Subscription | Server + your time |

The confidentiality claim does not change. What changes is **control over the storage plane** and who is in the trust chain. Self-hosting removes a third party; it does not add cryptography.

## When it is worth it

- You already run services and have a NAS, a homelab, or a small VPS.
- Your threat model includes "the provider is compromised or coerced".
- You are in a jurisdiction where someone else's data-hosting is a liability.
- You want shared collections for a team on infrastructure you audit.
- You are the kind of person who enjoys a five-minute Docker Compose and a cron job.

## When it is not worth it

- You have never run a reverse proxy and would need to learn TLS, DNS, and firewall rules first.
- Nobody will remember to patch. An unpatched server is a liability, not a security win.
- You are the only user, on one device. Then skip the server entirely and use a local vault.
- You need guaranteed uptime for a business-critical system with no backup plan.

For the last two cases there is a middle path: a **local encrypted vault** with [Nearby LAN sync](/blog/nearby-without-a-server) for your own devices, and no server at all.

## Setting one up in five minutes

OpenKey Server is a FastAPI application with PostgreSQL, shipped as a Docker Compose stack.

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32      # paste this into JWT_SECRET in .env
docker compose up --build -d
```

Then confirm it is healthy:

| URL | Purpose |
|-----|---------|
| `http://localhost:8000` | API base |
| `http://localhost:8000/docs` | OpenAPI docs |
| `http://localhost:8000/health` | Health check |

Schema migrations run automatically on startup. Connect a client from **Settings → Data → Self-hosted server**, then **Register** on the first device and **Login** on the rest. Full detail: [Server setup](/guide/server).

## The hardening checklist

This is the part people skip, and it is the part that decides whether self-hosting helped. From the [security guide](/guide/security):

### Non-negotiable

1. **A unique `JWT_SECRET` of at least 32 characters.** Placeholder values are rejected at startup. Generate one; do not copy an example.
2. **HTTPS with a valid certificate.** Clients use the platform TLS stack with no certificate pinning, so a typo'd `http://` URL or a bad certificate enables a man-in-the-middle on login and sync. Terminate TLS at Caddy, nginx, or your load balancer.
3. **An explicit `CORS_ORIGINS` allow-list.** Never `*`. If you use the browser extension, add its `chrome-extension://` and `moz-extension://` origins explicitly.
4. **Postgres and the raw API port stay private.** Expose only the reverse proxy.
5. **HSTS at the proxy**, so browsers never fall back to HTTP after the first visit.

### Strongly recommended

6. **Rate limits at the reverse proxy.** The API's built-in limiter is in-memory and **per worker process**, so with multiple workers or replicas the effective limit multiplies. Add `limit_req` in nginx or Caddy rate limits at the edge.
7. **Set `TRUST_PROXY_HEADERS=true` only if the proxy overwrites `X-Forwarded-For`** and you trust that path. Otherwise your per-IP limits apply to the proxy, not the user.
8. **Be aware of email enumeration.** `POST /auth/prelogin` and `POST /auth/lookup-public-key` return 404 for unknown emails, which helps legitimate clients but lets someone probe which addresses are registered. Strict rate limits, TLS, and optionally a VPN or IP allow-list for high-sensitivity deployments.
9. **Back up Postgres and test the restore.** A password manager server that has never been restored from backup is a hypothesis.
10. **Monitor `/health`** and the API logs; alert if it stops responding.

## What a self-hosted sync server can and cannot do

| It can | It cannot |
|--------|-----------|
| Authenticate you from your `auth_hash` | Read your master password |
| Store opaque ciphertext for entries, attachments, orgs, and shares | Decrypt collection names or entry payloads |
| Delete or withhold your data | Recover a forgotten master password |
| See metadata: email, ciphertext sizes, timings | Reconstruct your vault from the database |
| Be rate-limited, patched, or restarted by you | Survive you forgetting the master password |

Read that fourth row carefully: a self-hosted server does **not** make you safer from forgetting your password. It removes one party from the trust chain and adds you as the operator who can lose the data. [Forgotten master password](/blog/forgot-master-password) covers the prevention side.

## Sync semantics you should know before you rely on it

- **Last-write-wins by per-item `revision`, not a CRDT.** Concurrent edits on two devices can overwrite each other. Edit on one device at a time when it matters.
- **Deletes sync as tombstones** until peers catch up, so a delete is not instant everywhere.
- **Nearby LAN sync uses the same LWW rule** between paired, vault-linked devices.
- **Neither is a backup.** Keep at least one encrypted local backup (`.okbak` in OpenKey).

That last point is the one people get wrong most often, and it is the difference between "I moved my vault to my own server" and "I have a recovery plan".

## Operational security for the operator

- Run the server on a host you patch on a schedule. Unpatched is worse than vendor-hosted.
- Keep `JWT_SECRET` in a secrets manager or at least a 600-mode file, not in your shell history.
- Log retention is a liability: sync logs can reveal timings and sizes. Rotate and cap them.
- Back up the **database**, not just the volume, and verify restores quarterly.
- Never expose the API on an untrusted network without TLS.
- If you need uptime guarantees, put a second host behind a load balancer and accept that sync conflict resolution is still last-write-wins.

## How OpenKey keeps the server useless to an attacker

- Clients derive a master key with **Argon2id** from email + master password + salt.
- Login sends an **`auth_hash`**, which proves knowledge without revealing the password.
- A **vault key** encrypts collection names and entry payloads with **AES-256-GCM**. The server stores only a wrapped vault key.
- Access JWTs are short-lived; refresh tokens are hashed at rest and rotated on use.
- Attachments sync as ciphertext, capped at 20 MB each.

A stolen `postgres` dump gives an attacker salts, KDF parameters, wrapped keys, and blobs. Cracking it means attacking Argon2id, and then they still hold ciphertext they cannot read without the key. That is the entire security argument, and it holds precisely because the master password never left a client.

## What search data says

Self-hosting is a small but real cluster, and it clusters around the phrase "open source" more than around "self-hosted". Google Trends (worldwide, last 12 months), comparing these terms against each other:

| Query | Relative interest in cluster |
|-------|-------------------------------|
| passbolt | 100 |
| **open source password manager** | **55** |
| password manager self hosted | 13 |
| self-hosted password manager | 4 |
| keepass alternative | 1 |

The implication is that "open source" is the phrase people reach for, and "self-hosted" is the phrase they land on afterwards — a search that starts as a preference and becomes an implementation. The related queries under "open source password manager" point the same way: KeePass at 100, "open source password manager self hosted" at 84, and Passbolt at 78. Two of the top three are names people are comparing, not descriptions of a feature.

These remain small numbers next to the head term. "Self-hosted password manager" is a niche of a niche, and the honest conclusion is that most people searching this phrase are technical users who already know what they want.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The five-minute version

Self-hosting swaps the provider for you in the trust chain. It does not add cryptography, it adds TLS, backups, patching, and rate limiting to your list. If you already run services: Compose stack, unique `JWT_SECRET`, HTTPS with a valid certificate, explicit `CORS_ORIGINS`, and tested backups. If you do not, use a local encrypted vault and [Nearby LAN sync](/blog/nearby-without-a-server) instead, and keep at least one encrypted offline backup either way.

## Next steps

- [Why self-host your password vault](/blog/self-host-your-vault) — the case for it
- [Zero-knowledge sync explained](/blog/zero-knowledge-sync) — the protocol
- [Server setup](/guide/server) — install, configure, production hardening
- [Security](/guide/security) — threat model and operator checklist
