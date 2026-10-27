# Nearby LAN sync

**OpenKey Pro** can sync the same vault across devices on your local Wi‑Fi **without a self-hosted server**. Ciphertext moves over a paired LAN session; the vault key is shared only after you explicitly **Link vault**. On a **new device**, you can also **copy** an existing vault over Nearby during first-run setup (vault clone) — still peer-to-peer, never through the sync API.

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: discover a peer on the LAN, pair for a session key, then either copy a vault at setup or explicitly link vaults for ongoing merge sync; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

This page covers discovery, tap-to-pair, vault clone at setup, vault link, send-entry, LAN Pro, and trust rules. Short troubleshooting: [FAQ](./faq#nearby-does-not-find-the-other-device-pro). Threat model: [Security](./security). Protocol details: [OpenKey spec → Nearby](https://github.com/OpenSelfHosting/OpenKey/blob/main/spec/nearby.md).

## Requirements

- OpenKey Pro on each device that should sync or clone (or a valid **LAN Pro** attestation on non–store-IAP platforms — see below)
- Same **LAN** (not guest Wi‑Fi / client isolation)
- For **merge sync**: both devices unlocked with **Settings → Nearby devices** started
- For **vault clone** at setup: existing device unlocked and advertising; new device on the first-run **Nearby device** path

Nearby merge sync is **not** a backup. Keep a Pro [encrypted `.okbak`](./import-export#encrypted-backup-pro) as well. Vault clone copies the full vault once (including attachments); still keep offline backups afterward.

Discovery beacons include the **device name in the clear** on the LAN (and a `vault` flag for whether the peer already has an account). Only accept devices you own. Locking the vault pauses Nearby until you unlock again.

Linux and Windows may prompt once to open LAN ports (**UDP/TCP 47821**, **TCP 47822**). Allow those prompts so peers can find this machine.

## Copy vault at setup (vault clone)

Use this when a **new phone or desktop** should receive a full copy of an existing vault over Wi‑Fi (no `.okbak` file, no server).

1. On the **existing** device: unlock OpenKey → **Settings → Nearby devices** → turn on **Visible on local network**. The peer must show that it **has a vault**.
2. On the **new** device: first-run chooser → **Nearby device** (or the equivalent setup path).
3. Tap the discovered peer → confirm the copy. The vault holder pushes (or the empty device pulls) a session-encrypted archive over the LAN.
4. Unlock on the new device with the **same master password** as the source. The password is never sent on the wire — only unlock material and vault ciphertext move inside the paired session.

Clone includes the local database, preferences, attachments, optional avatar, and account unlock fields (email, salt, KDF, wrapped vault key). If that email already exists on the new device, clone fails with `email_exists`.

**Clone vs Link vault**

| | Vault clone | Link vault |
|--|-------------|------------|
| When | First-run / empty device | Both devices already have vaults |
| Result | Full copy of one vault onto the empty device | Share vault-key fingerprint; ongoing LWW merge sync |
| Master password | Same password to unlock the copy | Already unlocked on both sides |

## Pair devices (merge sync)

1. Unlock OpenKey on both devices → **Settings → Nearby devices**.
2. Turn on **Visible on local network** (remembered: resumes on next unlock while the vault is unlocked).
3. Tap a discovered peer to pair (short pairing code is exchanged automatically over the LAN session). Entering a short code manually still works within about two minutes when discovery is awkward.
4. After pairing, tap **Link vault** so both share the same vault-key fingerprint. Pairing alone never auto-shares the vault key.

If vault keys differ, the receiving device can **adopt** the peer’s key (replaces local vault data after master-password confirmation). Treat link + adopt like full vault trust.

### Firewall / dial-back

Some desktops (especially macOS) block inbound TCP. Linux and Windows builds may prompt once for **UDP/TCP 47821** and **TCP 47822**. If a peer cannot dial in, OpenKey can ask the advertising host to dial back to the guest (unicast UDP only — the pairing code is not broadcast on the LAN). Allow local-network / firewall prompts when the OS asks. Prefer the same subnet; VPNs and private relay often break discovery. Too many wrong codes trigger a short lockout.

## After linking

- Changes sync automatically while both vaults are unlocked and Nearby is advertising.
- Use **Sync now** for a manual catch-up.
- Sync is **last-write-wins by revision** (same rule as the [server](./server)) — edit one device at a time when possible.
- **Trusted devices:** after one successful pair + vault link, peers reconnect and sync whenever Nearby is on — no re-pairing.
- **Trusted networks only (optional):** add home/office Wi‑Fi SSIDs; Nearby pauses when the current SSID is not on the list (and blocks start if the list is empty). When the OS cannot read the SSID, Nearby may still run with a warning banner.
- **Unpair** to revoke LAN trust, stop sync, and clear LAN Pro claims from that peer.

## Send an entry

You can push a single login to a paired peer without waiting for a full vault sync:

1. Open the entry (or use the Nearby peer actions on **Settings → Nearby devices**).
2. Choose **Send to device** / send entry for that peer.
3. The peer receives the ciphertext over the LAN session and can store it locally.

Use this for one-off shares on the LAN; prefer [organizations & sharing](./sharing) when peers use the same self-hosted server.

## LAN Pro attestation {#lan-pro-attestation}

On platforms **without** store in-app purchase (typically Windows / Linux), a **vault-linked** Pro peer can share a **LAN Pro** status so the other device unlocks Pro limits over Nearby. Pairing alone is not enough — you must tap **Link vault** first.

- Convenience only — **not** a cryptographic proof of purchase.
- Android, iOS, and macOS (store IAP) **ignore** LAN Pro; buy or restore Pro on that store.
- Unpairing stops the attestation.

## Trust summary

| Action | Trust implication |
|--------|-------------------|
| Pair | Session key with that peer on the LAN |
| Vault clone | Peer receives a full vault copy (ciphertext + unlock material); needs the same master password to unlock |
| Link vault | Share vault-key material — peer can sync full vault ciphertext |
| Send entry | Peer receives that entry’s ciphertext |
| LAN Pro | Peer may unlock Pro limits on non-IAP platforms |

Only pair, clone, and link with devices and people you trust. Details: [Security → Threat model](./security#threat-model).

## Related

- [Using the app](./app) — setup chooser, settings map, and Pro matrix
- [Download](./download)
- [Import & export](./import-export) — `.okbak` vs Nearby clone
- [FAQ](./faq)
- [Security](./security)

Next: [Using the app](./app) · [Sharing](./sharing) · [FAQ](./faq)
