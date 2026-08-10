# FAQ ও সমস্যা নির্ণয়

সাধারণ প্রশ্নের সংক্ষিপ্ত উত্তর। গভীর পটভূমি: [Security](./security), [Server setup](./server), [Using the app](./app), [Nearby](./nearby), [Browser extension](./extension), [CLI](./cli)।

## Master password & recovery

### I forgot my master password. Can I recover the vault?

**না।** OpenKey zero-knowledge: server master password বা plaintext vault key কখনো দেখে না। Password (ও unlocked session বা encrypted local backup যা unlock করতে পারেন) ছাড়া ciphertext recover নয়।

শক্তিশালী unique master password ও কমপক্ষে এক **Pro** encrypted local backup (`.okbak`) বা offline export রাখুন।

### Can the server admin reset my password?

না। Admins ciphertext delete বা withhold করতে পারে এবং metadata (email, sizes, timings) দেখতে পারে। তারা vault decrypt বা নতুন master password set না করতে পারে।

### How do I change my master password?

App-এ account / security flow ব্যবহার করুন যা credentials rotate করে (server-এ `/auth/rekey`)। Vault key একই; শুধু server-এ auth hash ও wrapped vault key update। **নতুন** master password-এ পরে অন্য devices sync করুন।

## Sync & server

### Sync fails or login returns an error

1. `http(s)://your-host/health` healthy return করে confirm করুন।
2. প্রতিটি client-এ **একই** server URL ব্যবহার করুন (trailing slash ঠিক; production-এ HTTPS প্রাথমিক)।
3. `JWT_SECRET` set আছে check করুন (≥ 32 chars, placeholder নয়) — otherwise API start না করবে।
4. `CORS_ORIGINS`-এ extension / web origins include আছে check করুন (**কখনো `*` নয়**)।
5. Auth endpoints per IP **rate-limited** (`AUTH_RATE_LIMIT_*`)। অনেক failed login-এর পর এক মিনিট wait ও retry।
6. প্রথম device-এ একবার register; অন্য devices-এ same email + master password-এ **login**, তারপর **Sync now**।

### Phone cannot reach `http://localhost:8000`

Phone-এ `localhost` phone নিজেই। Same Wi‑Fi-এ computer-এর LAN IP (`http://192.168.x.x:8000`) ব্যবহার করুন, অথবা reverse proxy / tunnel-এ HTTPS expose করুন। Mobile-এ cleartext HTTP block হতে পারে — local debugging-এর বাইরে HTTPS প্রাথমিক।

### Two devices show different vault contents after sync

Sync **revision অনুযায়ী last-write-wins**, CRDT নয়। Concurrent edits overwrite করতে পারে। এক device-এ edit-এর পর pull/push আবার। Nearby LAN sync একই LWW rule ব্যবহার করে।

### How do I delete my server account?

Clients authenticated `POST /auth/delete` current `auth_hash` re-prove-এর পর call করে। Server-side ciphertext permanently সরে। **Devices-এ local vaults unaffected** — দরকার হলে আলাদা delete বা wipe করুন।

## App & Pro

### What is free vs Pro?

[Using the app](./app#free-vs-openkey-pro)-এ matrix দেখুন। সংক্ষেপ: free-এ core vault + item limits সহ server sync; Pro unlimited items, export, encrypted backups, Nearby, organizations/sharing, attachments, ও custom icons unlock করে।

### Nearby does not find the other device (Pro)

1. উভয় device unlocked, **Settings → Nearby devices** started, same Wi‑Fi (guest/client isolation নয়)।
2. Code টাইপের বদলে **Scan pairing QR** প্রাথমিক; camera / local-network permission prompts allow করুন।
3. VPN / private relay temporarily disable। macOS-এ QR connection fail হলে firewall dial-back allow করুন।
4. Pair করুন, তারপর **Link vault** (same vault key fingerprint)। বিস্তারিত: [Nearby](./nearby)।
5. ঐচ্ছিক **Trusted networks only**: SSID যোগ করুন অথবা unknown networks-এ Nearby pause।
6. Store-IAP platforms (Android / iOS / macOS) peers-এর **LAN Pro** ignore — দরকার হলে সেই store-এ Pro buy/restore।

### How do I send one password to another device on the LAN?

Pairing (Pro)-এর পর entry-তে অথবা Nearby peer actions-এ **Send to device** ব্যবহার করুন। Full vault sync-এর অপেক্ষা ছাড়াই LAN session-এ এক entry push। বিস্তারিত: [Nearby → Send an entry](./nearby#send-an-entry)।

### Autofill / passkeys do not appear

**Settings → Autofill**-এ OpenKey system password & passkey provider enable করুন, তারপর vault unlock করুন। iOS/macOS-এ OS permission prompts grant করুন। Providers বদলানোর পর browser বা target app restart করুন।

### What is the extension fill shortcut?

Windows/Linux-এ `Ctrl+Shift+L`, macOS-এ `⌘⇧L`। দরকার হলে browser-এর extension keyboard shortcuts-এ remap। [Browser extension](./extension#keyboard-shortcut) দেখুন।

### Import worked but export is locked

**Import free; export-এ Pro লাগে** (encrypted `.okbak` backups-এর জন্যও)। Walkthrough: [Import & export](./import-export)।

### How do attachments work?

**Pro.** Login খুলুন → encrypted attachment যোগ করুন (প্রায় **20 MB** max)। Attachments server-এ ciphertext হিসেবে sync। OpenKey JSON export শুধু metadata — attachment blobs সহ full vault-এ `.okbak` ব্যবহার করুন।

### How do I add TOTP / authenticator codes?

Entry-তে authenticator secret বা `otpauth` URI যোগ করুন, অথবা site-এর 2FA setup-এর **QR scan** করুন। Vault unlocked থাকলে codes দেখায়; system Autofill / extension যেখানে supported fill করতে পারে।

### Can collections be nested?

হ্যাঁ — folders অন্য folders contain করতে পারে (`parent` relationship)। Nested logins autofill ও desktop bridge-এ include।

### Do deleted items disappear immediately on other devices?

Soft-deleted items **tombstones** হিসেবে sync যতক্ষণ peers catch up। Last-write-wins per-item `revision` ব্যবহার করে — concurrent edits এখনো overwrite করতে পারে।

### Do web builds require Pro?

**এখনো না।** Web builds আজ Pro limits enforce না করে। Mobile ও desktop store/desktop builds করে।

### How do organizations and shares work?

Pro + same self-hosted server। Identity keys publish করুন, তারপর org invite বা entry snapshot share। বিস্তারিত: [Sharing & organizations](./sharing)।

### How do biometrics / auto-lock work?

**Settings → Security**-এ biometric unlock (platform-dependent) ও related lock protections enable করতে পারেন। Shared machines-এ idle-এ lock প্রাথমিক। Biometrics device-এ vault key wrap করে — strong master password replace না করে।

## Browser extension

### Extension cannot talk to the desktop app

1. Desktop vault unlock করুন ও unlocked রাখুন।
2. **Settings → Autofill** (macOS-এ **Browser extension**) খুলুন যাতে native host register হয়।
3. Chromium: unpacked extension ID platform file-এ লিখুন ([Browser extension](./extension) দেখুন), তারপর Autofill আবার খুলুন।
4. Extension-এ **Use desktop app** বেছে নিন।
5. macOS-এ host script-এর জন্য `PATH`-এ Python 3 প্রয়োজন।

### Standalone unlock fails against my server

Prelogin কাজ করে confirm করুন: email আগে থেকে registered হতে হবে। App-এর মতো master password। Server URL browser থেকে reachable (CORS / HTTPS)। Options page-এ URL check করুন ও normal tab-এ `/health` try করুন।

### Passkeys fall back to the browser authenticator

Confirm dialog-এ **Use browser** বেছে নিলে, অথবা extension vault locked থাকলে expected। OpenKey passkeys store/use-এর জন্য extension unlock করুন (standalone)।

## CLI

### `openkey secret …` says unlock the app

Vault commands-এ **unlocked desktop app** (native bridge) অথবা `login`-এর পর `eval $(openkey unlock)` লাগে। Bridge / session state-এর জন্য `openkey status` চালান।

### Session expired

Default lock 15 minutes (`openkey config set-lock`)। `eval $(openkey unlock)` আবার চালান। Personal machines-এ `OPENKEY_PASSWORD`-এর বদলে interactive password prompt প্রাথমিক।

## Security / privacy

### Does Password health send my passwords to the internet?

Local weak/reused checks device-এ থাকে। Optional Have I Been Pwned শুধু **SHA-1 prefix k-anonymity** — পূর্ণ password কখনো নয়। [Security](./security) দেখুন।

### Is Nearby a backup?

না। Paired, vault-linked devices-এর মধ্যে LAN-এ ciphertext sync করে। Offline Pro backups রাখুন।

## Still stuck?

1. Failing client (app / extension / CLI) ও approximate time capture করুন।
2. Server logs (`docker compose logs -f api`) ও `/health` check করুন।
3. Security issues privately report করুন — **security@openselfhosting.com** অথবা [OpenSelfHosting](https://github.com/OpenSelfHosting)-এ private advisory। [Security → Reporting](./security#reporting-vulnerabilities) দেখুন।
4. Product bugs-এর জন্য package name ও version সহ [OpenSelfHosting](https://github.com/OpenSelfHosting)-এ issue খুলুন।

Next: [Nearby](./nearby) · [Server setup](./server) · [Security](./security) · [Download](./download)
