# Sharing & organizations

Share individual items or work in **organizations** with other OpenKey users on the **same self-hosted server**. Everything the server stores for orgs and shares stays **ciphertext** — clients wrap keys for recipients; the API never decrypts names or payloads.

**Requires OpenKey Pro** and a configured [server](./server) account (register / login + sync). Publish identity keys before inviting or sharing so peers can wrap keys for you.

## Prerequisites

1. Install the app ([Download](./download)) and unlock your vault.
2. Connect **Settings → Data → Self-hosted server** and sync.
3. **Settings → Data → Publish identity keys** (Pro) — uploads opaque public / wrapped private key material used for sharing.
4. Recipients must use the **same server URL** and have published identity keys (or at least a registered account the server can look up).

## Organizations

Path: **Settings → Data → Organizations**, or **Items hub → Organizations**.

### Create an org

1. Open Organizations → create.
2. The client encrypts the org name and wraps an org key for you as owner.
3. Create **shared collections** under the org for team logins (encrypted names + payloads).

Org shared vault entries live under those org collections and sync as opaque rows (`encrypted_payload`).

### Invite members

1. Open the org → **Invite member**.
2. Enter their **email** (must already exist on this server) and choose a role (`admin` / `member`).
3. The client wraps the org key for their public identity key and posts the invite.
4. They see **Pending invites**, accept, then can open shared collections after sync.

Owner/admin can revoke pending invites, change roles, or remove members. The owner cannot leave the org; transfer ownership is not a separate recovery path — plan admins carefully.

### Accept an invite

1. Open Organizations → **Pending invites**.
2. Accept. Sync so shared collections appear.
3. Use the same master password and server as usual — joining does not give the server plaintext.

## Item & collection shares

Share a single login (or collection) with another user without putting them in an org.

1. Open the entry (or collection) → **Share**.
2. Pick the recipient email on your server.
3. The client wraps an item key for them. **Entry shares snapshot** the encrypted payload at share time.
4. Recipient: accept under shares / pending UI, then the snapshot imports into **their** vault (new local uuid).

### Snapshot semantics (important)

- Accepting an **entry** share copies the frozen ciphertext into the recipient’s personal vault.
- Later edits to the owner’s original entry are **not** pushed to recipients.
- **Revoke** stops a pending accept; it does **not** delete an already-imported copy on the recipient’s device.

Treat shares like handing someone a sealed copy, not a live shared document. Prefer **org shared collections** when you need ongoing team access to the same ciphertext under a shared org key.

## Extension

In standalone (server) mode the [browser extension](./extension) can list/accept/revoke shares and list organizations / shared collections. Desktop-bridge mode relies on the unlocked app for vault operations.

## Security notes

- Only share with people and devices you trust — recipients who accept can decrypt what you wrapped for them.
- Org names, share payloads, and identity key blobs are opaque on the server ([Security](./security)).
- Revoking access on the server does not wipe local copies already decrypted onto another device.
- Keep Pro backups; sharing is not a substitute for offline recovery materials.

## Related API (self-hosters)

See `openkey_server` README: `/orgs`, `/invites/*`, `/shares`, plus `POST /auth/lookup-public-key` for wrapping keys by email.

Next: [Using the app](./app) · [Import & export](./import-export) · [FAQ](./faq) · [Server setup](./server)
