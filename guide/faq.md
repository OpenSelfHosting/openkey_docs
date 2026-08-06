# FAQ & troubleshooting

Short answers to common questions. Deeper background: [Security](./security), [Server setup](./server), [Using the app](./app), [Nearby](./nearby), [Browser extension](./extension), [CLI](./cli).

## Master password & recovery

### I forgot my master password. Can I recover the vault?

**No.** OpenKey is zero-knowledge: the server never sees the master password or plaintext vault key. Without the password (and any device that still has an unlocked session or encrypted local backup you can unlock), ciphertext is unrecoverable.

Keep a strong unique master password and at least one **Pro** encrypted local backup (`.okbak`) or export offline.

### Can the server admin reset my password?

No. Admins can delete or withhold ciphertext and observe metadata (email, sizes, timings). They cannot decrypt your vault or set a new master password for you.

### How do I change my master password?

In the app, use the account / security flow that rotates credentials (`/auth/rekey` on the server). The vault key itself stays the same; only the auth hash and wrapped vault key on the server are updated. Sync other devices afterward with the **new** master password.

## Sync & server

### Sync fails or login returns an error

1. Confirm `http(s)://your-host/health` returns healthy.
2. Use the **exact** same server URL on every client (trailing slash is fine; prefer HTTPS in production).
3. Check `JWT_SECRET` is set (≥ 32 chars, not a placeholder) — the API will refuse to start otherwise.
4. Check `CORS_ORIGINS` includes your extension / web origins if you use them (**never `*`**).
5. Auth endpoints are **rate-limited** per IP (`AUTH_RATE_LIMIT_*`). Wait a minute and retry after many failed logins.
6. Register once on the first device; on other devices **login** with the same email + master password, then **Sync now**.

### Phone cannot reach `http://localhost:8000`

`localhost` on the phone is the phone itself. Use your computer’s LAN IP (`http://192.168.x.x:8000`) on the same Wi‑Fi, or expose HTTPS via a reverse proxy / tunnel. Cleartext HTTP may be blocked on mobile — prefer HTTPS for anything beyond local debugging.

### Two devices show different vault contents after sync

Sync is **last-write-wins by revision**, not a CRDT. Concurrent edits can overwrite. Pull/push again after editing on one device at a time. Nearby LAN sync uses the same LWW rule.

### How do I delete my server account?

Clients call authenticated `POST /auth/delete` after re-proving the current `auth_hash`. That permanently removes server-side ciphertext. **Local vaults on devices are unaffected** — delete or wipe them separately if needed.

## App & Pro

### What is free vs Pro?

See the matrix in [Using the app](./app#free-vs-openkey-pro). Short version: free includes core vault + server sync with item limits; Pro unlocks unlimited items, export, encrypted backups, Nearby, organizations/sharing, attachments, and custom icons.

### Nearby does not find the other device (Pro)

1. Both devices unlocked, **Settings → Nearby devices** started, same Wi‑Fi (not guest/client isolation).
2. Prefer **Scan pairing QR** instead of typing the code; allow camera / local-network permission prompts.
3. Disable VPN / private relay temporarily. On macOS, allow firewall dial-back if the QR connection fails.
4. Pair, then **Link vault** (same vault key fingerprint). Full guide: [Nearby](./nearby).
5. Optional **Trusted networks only**: add your SSID or Nearby pauses on unknown networks.
6. Store-IAP platforms (Android / iOS / macOS) ignore **LAN Pro** from peers — buy/restore Pro on that store if required.

### How do I send one password to another device on the LAN?

After pairing (Pro), use **Send to device** on the entry or from Nearby peer actions. That pushes one entry over the LAN session without waiting for a full vault sync. Details: [Nearby → Send an entry](./nearby#send-an-entry).

### Autofill / passkeys do not appear

Enable OpenKey as the system password & passkey provider under **Settings → Autofill**, then unlock the vault. On iOS/macOS grant OS permission prompts. Restart the browser or target app after changing providers.

### What is the extension fill shortcut?

`Ctrl+Shift+L` on Windows/Linux, `⌘⇧L` on macOS. Remap under the browser’s extension keyboard shortcuts if needed. See [Browser extension](./extension#keyboard-shortcut).

### Import worked but export is locked

**Import is free; export requires Pro** (same for encrypted `.okbak` backups). Walkthrough: [Import & export](./import-export).

### How do attachments work?

**Pro.** Open a login → add an encrypted attachment (about **20 MB** max). Attachments sync as ciphertext through your server. OpenKey JSON export includes metadata only — use `.okbak` for a full vault including attachment blobs.

### How do I add TOTP / authenticator codes?

On an entry, add an authenticator secret or `otpauth` URI, or **scan the QR** from the site’s 2FA setup. Codes appear when the vault is unlocked; system Autofill / the extension can fill where supported.

### Can collections be nested?

Yes — folders can contain other folders (`parent` relationship). Nested logins are included in autofill and the desktop bridge.

### Do deleted items disappear immediately on other devices?

Soft-deleted items sync as **tombstones** until peers catch up. Last-write-wins uses per-item `revision` — concurrent edits can still overwrite.

### Do web builds require Pro?

**Not yet.** Web builds do not enforce Pro limits today. Mobile and desktop store/desktop builds do.

### How do organizations and shares work?

Pro + same self-hosted server. Publish identity keys, then invite to an org or share an entry snapshot. Details: [Sharing & organizations](./sharing).

### How do biometrics / auto-lock work?

Under **Settings → Security** you can enable biometric unlock (platform-dependent) and related lock protections. Prefer locking when idle on shared machines. Biometrics wrap the vault key on device — they do not replace a strong master password.

## Browser extension

### Extension cannot talk to the desktop app

1. Unlock the desktop vault and leave it unlocked.
2. Open **Settings → Autofill** (and **Browser extension** on macOS) so the native host registers.
3. Chromium: write the unpacked extension ID to the platform file (see [Browser extension](./extension)), then re-open Autofill.
4. Choose **Use desktop app** in the extension.
5. macOS needs Python 3 on `PATH` for the host script.

### Standalone unlock fails against my server

Confirm prelogin works: email must already be registered. Same master password as the app. Server URL must be reachable from the browser (CORS / HTTPS). Check the Options page for the URL and try `/health` in a normal tab.

### Passkeys fall back to the browser authenticator

That is expected when you pick **Use browser** in the confirm dialog, or when the extension vault is locked. Unlock the extension (standalone) to store/use OpenKey passkeys.

## CLI

### `openkey secret …` says unlock the app

Vault commands need either an **unlocked desktop app** (native bridge) or `eval $(openkey unlock)` after `login`. Run `openkey status` to see bridge / session state.

### Session expired

Default lock is 15 minutes (`openkey config set-lock`). Run `eval $(openkey unlock)` again. Prefer the interactive password prompt over `OPENKEY_PASSWORD` on personal machines.

## Security / privacy

### Does Password health send my passwords to the internet?

Local weak/reused checks stay on device. Optional Have I Been Pwned uses **SHA-1 prefix k-anonymity** only — never the full password. See [Security](./security).

### Is Nearby a backup?

No. It syncs ciphertext on the LAN between paired, vault-linked devices. Keep offline Pro backups too.

## Still stuck?

1. Capture the failing client (app / extension / CLI) and approximate time.
2. Check server logs (`docker compose logs -f api`) and `/health`.
3. Report security issues privately — **security@openselfhosting.com** or a private advisory under [OpenSelfHosting](https://github.com/OpenSelfHosting). See [Security → Reporting](./security#reporting-vulnerabilities).
4. For product bugs, open an issue under [OpenSelfHosting](https://github.com/OpenSelfHosting) with package name and version.

Next: [Nearby](./nearby) · [Server setup](./server) · [Security](./security) · [Download](./download)
