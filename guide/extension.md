# Browser extension

MV3 extension for **Chrome**, **Edge**, **Brave**, and **Firefox**. It can unlock against your [self-hosted server](./server) (standalone) or fill through the unlocked **desktop app** (native messaging).

Host name: `com.openselfhosting.openkey`

## What it does

1. **Standalone vault** — unlock with email + master password; sync ciphertext from your server
2. **Native bridge** — when the desktop OpenKey app is unlocked, fill and save via native messaging
3. **Autofill** — overlays, context menu, and keyboard shortcut for logins and payment cards
4. **Save / update** — capture new logins from the page into the vault
5. **Passkeys** — intercept WebAuthn `create` / `get`; store ES256 credentials (extension unlocked)
6. **Cards, crypto & secrets** — browse and fill/copy reserved vault areas
7. **Attachments** — list and download decrypted attachments for a login (standalone)
8. **Shares & orgs** — list/accept/revoke shares and org invites (standalone)

### Keyboard shortcut

| Action | Windows / Linux | macOS |
|--------|-----------------|-------|
| Fill login with OpenKey | `Ctrl+Shift+L` | `⌘⇧L` |

Browsers may require you to confirm or remap the command under extension keyboard shortcuts if another extension already claimed it.

## Install (unpacked)

Store listings may not be published yet. Build and load locally:

```bash
cd openkey_extension
npm install
npm run build
```

- **Chrome / Edge / Brave:** `chrome://extensions` → Developer mode → **Load unpacked** → select `dist/`
- **Firefox:** `about:debugging` → This Firefox → **Load Temporary Add-on** → pick `dist/manifest.json`

Copy the extension ID from the popup or Options page — you need it to connect the desktop bridge on Chromium browsers.

## Permissions

The extension uses `<all_urls>` host / content-script matches so autofill, login capture, and passkey interception work on sites you visit (a fixed allowlist cannot cover the open web). Ciphertext sync and unlock stay on your device or your [self-hosted server](./server); OpenKey does not exfiltrate page HTML to a vendor cloud. Prefer **Use desktop app** when you want fill without unlocking a separate extension vault.

## Unlock modes

### Self-hosted server

1. Set **Self-hosted server URL** in the popup or Options.
2. **Create account** (register) or **Unlock** (prelogin + login with the same email and master password as the app).
3. Ciphertext syncs through `POST /sync`. Master password never leaves the client.

### Desktop app bridge

1. Unlock the OpenKey desktop app.
2. Enable Autofill / connect the extension (platform steps below).
3. In the extension choose **Use desktop app**.

Fill and save go through the unlocked app — no separate extension vault unlock required for those flows.

Optional: **Settings → Browser extension → Copy offline vault link** in the app for air-gapped bootstrap.

## Connect native messaging

### Windows

Opening **Settings → Autofill** registers `openkey_native_host.exe` under:

`HKCU\Software\...\NativeMessagingHosts\com.openselfhosting.openkey`

For Chromium, write the unpacked extension ID to:

`%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt`

then open Autofill again so the host manifest regenerates. Firefox uses `openkey@openselfhosting.local` automatically.

Keep the vault unlocked (loopback TCP).

### macOS

On unlock, OpenKey installs `openkey_native_host.py` and writes manifests under Chrome / Chromium / Edge / Brave / Firefox NativeMessagingHosts folders.

1. Load the unpacked extension and copy its ID.
2. App: **Settings → Browser extension** → paste ID → **Connect extension**.
3. Keep the vault unlocked → extension: **Use desktop app**.

Requires **Python 3** on `PATH`.

### Linux

**Settings → Autofill** writes host manifests under `~/.config/google-chrome/`, Chromium, Edge, and `~/.mozilla/native-messaging-hosts/`.

Chromium extension ID file:

`~/.local/share/OpenKey/chrome_extension_id.txt`

then tap Autofill again. Firefox uses `openkey@openselfhosting.local`.

Bridge socket: `$XDG_RUNTIME_DIR/openkey-native.sock` (keep vault unlocked).

## Save captured logins

After a login submit (or login button / Enter), an in-page banner offers **Save** or **Update**:

1. **Native bridge** — `createEntry` / `updateEntry` on the unlocked desktop app
2. **Standalone** — encrypt locally and push ciphertext via sync

Same host + username + password is ignored; a changed password prompts update.

## Passkeys

With the extension unlocked, OpenKey can handle WebAuthn on sites. An in-page dialog confirms; choose **Use browser** to fall back to the platform authenticator.

Smoke test after unlock: [webauthn.io](https://webauthn.io) or `npx tsx src/passkey/smoke.test.ts` in `openkey_extension`.

## Related

- [Download & install](./download)
- [Using the app](./app) — Autofill and Browser extension settings
- [Server setup](./server)
- [Security](./security) — extension trust boundary
