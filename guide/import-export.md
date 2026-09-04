# Import & export

Move passwords between OpenKey and other managers, or take an encrypted full-vault backup. Path: **Settings → Data → Import & export** (and **Backup & Restore** for `.okbak`).

| Action | Free | Pro |
|--------|------|-----|
| Import (all formats below) | Yes | Yes |
| Export (all formats below) | — | Yes |
| Encrypted local backup / restore (`.okbak`) | — | Yes |

Exports and backups decrypt on device before writing a file — treat every export as **secret**. Prefer offline encrypted storage. See [FAQ](./faq) and [Free vs Pro](./app#free-vs-openkey-pro).

## Import walkthrough

1. Unlock OpenKey.
2. **Settings → Data → Import & export → Import**.
3. Choose a format, pick the file, confirm.
4. Review new entries/collections in the vault. Sync to your [server](./server) if you use one.

### Bitwarden JSON

1. In Bitwarden: export **JSON** (unencrypted export — protect the file).
2. In OpenKey: Import → **Bitwarden JSON**.
3. Folders map to collections where possible; logins become entries.

### Chrome / Edge CSV

1. Browser password manager → export CSV.
2. OpenKey → Import → **Chrome CSV**.
3. Expect url / username / password columns; custom fields may be limited.

### LastPass CSV

1. LastPass → export CSV.
2. OpenKey → Import → **LastPass CSV**.

### 1Password CSV

1. 1Password → export CSV (format supported by OpenKey’s importer).
2. OpenKey → Import → **1Password CSV**.
3. Complex item types may flatten to login-like entries.

### KeePass (`.kdbx`)

1. OpenKey → Import → **KeePass `.kdbx`**.
2. Enter the database password and optional **key file**.
3. Groups become collections; entries import as logins when fields map cleanly.

Wrong password / key file → unlock failed; no server round-trip (all local).

### OpenKey JSON

Round-trip format for OpenKey-native exports. Use when moving between devices without server sync, or as a portable vault dump (**Pro** to create the file).

**Attachments:** OpenKey JSON exports include attachment *metadata* on entries but **omit attachment ciphertext blobs**. For a full vault including attachments, use an encrypted **`.okbak`** backup instead.

## Export walkthrough (Pro)

1. **Settings → Data → Import & export → Export**.
2. Choose format. For KeePass, set a new database password (and optional key file).
3. Save the file somewhere encrypted / offline.
4. Delete plaintext exports when finished migrating.

Available exports: **OpenKey JSON**, **Bitwarden JSON**, **Chrome CSV**, **LastPass CSV**, **KeePass `.kdbx`**, **1Password CSV**.

## Encrypted backup (Pro)

**Settings → Data → Backup & Restore**

- Creates a full-vault `.okbak` (database, settings, attachments) encrypted for restore with your vault credentials.
- Restore replaces local vault data — confirm before proceeding.
- On a **new device**, you can pick the `.okbak` on the first-run setup screen instead of creating an empty vault.
- Nearby / server sync is **not** a backup ([FAQ](./faq)).

## After migrating from another manager

1. Spot-check important logins (and TOTP if you used it).
2. Enable [autofill](./app) / [extension](./extension).
3. Sync to your server or pair Nearby (Pro) for other devices.
4. Securely wipe the old export files.
5. Optionally change passwords that lived in an unencrypted CSV during transfer.

## Related

- [Sharing & organizations](./sharing) — team ciphertext on your server
- [Using the app](./app)
- [Security](./security) — exports are trusted material

Next: [Download](./download) · [FAQ](./faq) · [CLI](./cli)
