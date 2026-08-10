# FAQ और समस्या निवारण

सामान्य प्रश्नों के संक्षिप्त उत्तर। गहरी पृष्ठभूमि: [Security](./security), [Server setup](./server), [Using the app](./app), [Nearby](./nearby), [Browser extension](./extension), [CLI](./cli)।

## Master password & recovery

### I forgot my master password. Can I recover the vault?

**नहीं।** OpenKey zero-knowledge है: server master password या plaintext vault key कभी नहीं देखता। Password (और कोई डिवाइस जिस पर unlocked session या encrypted local backup बचा है जिसे unlock कर सकें) बिना ciphertext recover नहीं होता।

मज़बूत unique master password और कम से कम एक **Pro** encrypted local backup (`.okbak`) या offline export रखें।

### Can the server admin reset my password?

नहीं। Admins ciphertext delete या withhold कर सकते हैं और metadata (email, sizes, timings) देख सकते हैं। वे आपका vault decrypt या नया master password set नहीं कर सकते।

### How do I change my master password?

App में account / security flow उपयोग करें जो credentials rotate करता है (server पर `/auth/rekey`)। Vault key समान रहता है; केवल server पर auth hash और wrapped vault key update होते हैं। **नए** master password से बाद में अन्य devices sync करें।

## Sync & server

### Sync fails or login returns an error

1. `http(s)://your-host/health` healthy return करता है confirm करें।
2. हर client पर **एक ही** server URL उपयोग करें (trailing slash ठीक; production में HTTPS प्राथमिक)।
3. `JWT_SECRET` set है check करें (≥ 32 chars, placeholder नहीं) — otherwise API start नहीं करेगा।
4. `CORS_ORIGINS` में extension / web origins include हैं check करें यदि उपयोग करते हैं (**कभी `*` नहीं**)।
5. Auth endpoints per IP **rate-limited** (`AUTH_RATE_LIMIT_*`)। बहुत failed logins के बाद एक मिनट wait और retry।
6. पहले डिवाइस पर एक बार register; अन्य devices पर same email + master password से **login**, फिर **Sync now**।

### Phone cannot reach `http://localhost:8000`

Phone पर `localhost` phone ही है। Same Wi‑Fi पर computer का LAN IP (`http://192.168.x.x:8000`) उपयोग करें, या reverse proxy / tunnel से HTTPS expose करें। Mobile पर cleartext HTTP block हो सकता है — local debugging से आगे HTTPS प्राथमिक।

### Two devices show different vault contents after sync

Sync **revision के अनुसार last-write-wins** है, CRDT नहीं। Concurrent edits overwrite कर सकते हैं। एक डिवाइस पर edit करने के बाद pull/push दोबारा। Nearby LAN sync उसी LWW rule उपयोग करता है।

### How do I delete my server account?

Clients authenticated `POST /auth/delete` current `auth_hash` re-prove करने के बाद call करते हैं। Server-side ciphertext permanently हटता है। **Devices पर local vaults unaffected** — ज़रूरत हो तो अलग delete या wipe करें।

## App & Pro

### What is free vs Pro?

[Using the app](./app#free-vs-openkey-pro) में matrix देखें। संक्षेप: free में core vault + item limits के साथ server sync; Pro unlimited items, export, encrypted backups, Nearby, organizations/sharing, attachments, और custom icons unlock करता है।

### Nearby does not find the other device (Pro)

1. दोनों devices unlocked, **Settings → Nearby devices** started, same Wi‑Fi (guest/client isolation नहीं)।
2. Code टाइप करने की बजाय **Scan pairing QR** प्राथमिक; camera / local-network permission prompts allow करें।
3. VPN / private relay temporarily disable। macOS पर QR connection fail हो तो firewall dial-back allow करें।
4. Pair करें, फिर **Link vault** (same vault key fingerprint)। विवरण: [Nearby](./nearby)।
5. वैकल्पिक **Trusted networks only**: SSID जोड़ें या unknown networks पर Nearby pause।
6. Store-IAP platforms (Android / iOS / macOS) peers से **LAN Pro** ignore — ज़रूरत हो तो उस store पर Pro buy/restore।

### How do I send one password to another device on the LAN?

Pairing (Pro) के बाद entry पर या Nearby peer actions से **Send to device** उपयोग करें। Full vault sync की प्रतीक्षा बिना LAN session पर एक entry push होता है। विवरण: [Nearby → Send an entry](./nearby#send-an-entry)।

### Autofill / passkeys do not appear

**Settings → Autofill** के तहत OpenKey system password & passkey provider enable करें, फिर vault unlock करें। iOS/macOS पर OS permission prompts grant करें। Providers बदलने के बाद browser या target app restart करें।

### What is the extension fill shortcut?

Windows/Linux पर `Ctrl+Shift+L`, macOS पर `⌘⇧L`। ज़रूरत हो तो browser के extension keyboard shortcuts में remap। [Browser extension](./extension#keyboard-shortcut) देखें।

### Import worked but export is locked

**Import free; export Pro ज़रूरी** (encrypted `.okbak` backups के लिए भी)। Walkthrough: [Import & export](./import-export)।

### How do attachments work?

**Pro.** Login खोलें → encrypted attachment जोड़ें (लगभग **20 MB** max)। Attachments server से ciphertext के रूप में sync। OpenKey JSON export केवल metadata — attachment blobs सहित full vault के लिए `.okbak` उपयोग करें।

### How do I add TOTP / authenticator codes?

Entry पर authenticator secret या `otpauth` URI जोड़ें, या site के 2FA setup से **QR scan** करें। Vault unlocked होने पर codes दिखते हैं; system Autofill / extension जहाँ supported fill कर सकते हैं।

### Can collections be nested?

हाँ — folders अन्य folders contain कर सकते हैं (`parent` relationship)। Nested logins autofill और desktop bridge में include होते हैं।

### Do deleted items disappear immediately on other devices?

Soft-deleted items **tombstones** के रूप में sync जब तक peers catch up। Last-write-wins per-item `revision` उपयोग करता है — concurrent edits अभी overwrite कर सकते हैं।

### Do web builds require Pro?

**अभी नहीं।** Web builds आज Pro limits enforce नहीं करते। Mobile और desktop store/desktop builds करते हैं।

### How do organizations and shares work?

Pro + same self-hosted server। Identity keys publish करें, फिर org invite या entry snapshot share। विवरण: [Sharing & organizations](./sharing)।

### How do biometrics / auto-lock work?

**Settings → Security** के तहत biometric unlock (platform-dependent) और related lock protections enable कर सकते हैं। Shared machines पर idle पर lock प्राथमिक। Biometrics device पर vault key wrap करते हैं — strong master password replace नहीं करते।

## Browser extension

### Extension cannot talk to the desktop app

1. Desktop vault unlock करें और unlocked रखें।
2. **Settings → Autofill** (macOS पर **Browser extension**) खोलें ताकि native host register हो।
3. Chromium: unpacked extension ID platform file में लिखें ([Browser extension](./extension) देखें), फिर Autofill दोबारा खोलें।
4. Extension में **Use desktop app** चुनें।
5. macOS पर host script के लिए `PATH` पर Python 3 ज़रूरी।

### Standalone unlock fails against my server

Prelogin काम करता है confirm करें: email पहले से registered होना चाहिए। App के समान master password। Server URL browser से reachable (CORS / HTTPS)। Options page पर URL check करें और normal tab में `/health` try करें।

### Passkeys fall back to the browser authenticator

Confirm dialog में **Use browser** चुनने पर, या extension vault locked होने पर expected। OpenKey passkeys store/use के लिए extension unlock करें (standalone)।

## CLI

### `openkey secret …` says unlock the app

Vault commands के लिए **unlocked desktop app** (native bridge) या `login` के बाद `eval $(openkey unlock)` ज़रूरी। Bridge / session state के लिए `openkey status` चलाएँ।

### Session expired

Default lock 15 minutes (`openkey config set-lock`)। `eval $(openkey unlock)` दोबारा चलाएँ। Personal machines पर `OPENKEY_PASSWORD` की बजाय interactive password prompt प्राथमिक।

## Security / privacy

### Does Password health send my passwords to the internet?

Local weak/reused checks device पर रहते हैं। Optional Have I Been Pwned केवल **SHA-1 prefix k-anonymity** — पूरा password कभी नहीं। [Security](./security) देखें।

### Is Nearby a backup?

नहीं। Paired, vault-linked devices के बीच LAN पर ciphertext sync करता है। Offline Pro backups भी रखें।

## Still stuck?

1. Failing client (app / extension / CLI) और approximate time capture करें।
2. Server logs (`docker compose logs -f api`) और `/health` check करें।
3. Security issues privately report करें — **security@openselfhosting.com** या [OpenSelfHosting](https://github.com/OpenSelfHosting) के तहत private advisory। [Security → Reporting](./security#reporting-vulnerabilities) देखें।
4. Product bugs के लिए package name और version के साथ [OpenSelfHosting](https://github.com/OpenSelfHosting) पर issue खोलें।

Next: [Nearby](./nearby) · [Server setup](./server) · [Security](./security) · [Download](./download)
