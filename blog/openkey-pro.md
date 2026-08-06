---
title: OpenKey Pro — what unlocks (and what doesn’t)
description: Free vs Pro limits, Nearby and LAN Pro, store IAP vs desktop, and what stays free on every platform.
date: 2026-08-06
cover: /blog/covers/openkey-pro.svg
---

# OpenKey Pro — what unlocks (and what doesn’t)

OpenKey’s core vault works offline without a subscription. **Pro** raises limits and unlocks extras that matter when you sync across devices, export, or share with a team. Here is the practical split — and the LAN Pro caveat that often confuses people.

## What stays free

- Local encrypted vault (with freemium caps — see below)
- Self-hosted [server sync](/guide/server) (ciphertext only)
- System Autofill / passkeys where the OS allows it
- [Browser extension](/guide/extension) bridge to the unlocked desktop app
- **Import** from Bitwarden, browser CSVs, KeePass, and more

Free tier caps (mobile/desktop builds that enforce Pro): **50** login entries; **3** collections, payment cards, crypto wallets, and developer secrets each.

## What Pro unlocks

| Capability | Notes |
|------------|--------|
| Unlimited entries / collections / cards / crypto / secrets | Removes free caps |
| **Export** + encrypted **`.okbak`** backup | Treat exports as secret |
| **Nearby** LAN vault sync | QR pair, link vault, send entry — [guide](/guide/nearby) |
| Organizations & sharing | Same self-hosted server |
| Attachments on entries | ~20 MB each, ciphertext on the server |
| Custom app icon | Where the platform supports it |

Full matrix: [Pricing](/pricing) · [Using the app → Free vs Pro](/guide/app#free-vs-openkey-pro).

## LAN Pro is not a store receipt

On platforms **without** store in-app purchase (typically Windows / Linux), a Pro peer can share a **LAN Pro** attestation over Nearby so the other device unlocks Pro limits on the LAN.

- Convenience only — **not** cryptographic proof of purchase
- Android, iOS, and macOS **ignore** LAN Pro; buy or restore Pro on that store
- Unpairing stops the attestation

## Web builds

**Web builds do not enforce Pro yet.** Mobile and desktop store/desktop builds do. Plan accordingly if you test in the browser.

## Dig deeper

- [Pricing](/pricing) — plans, how to buy, cancel
- [Nearby without a server](/blog/nearby-without-a-server)
- [Import & export](/guide/import-export)
- [Sharing & organizations](/guide/sharing)
- [FAQ](/guide/faq)
- [Security](/guide/security)
