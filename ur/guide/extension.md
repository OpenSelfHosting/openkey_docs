# براؤزر ایکسٹینشن

**Chrome**، **Edge**، **Brave**، اور **Firefox** کے لیے MV3 ایکسٹینشن۔ یہ آپ کے [self-hosted سرور](./server) کے خلاف unlock کر سکتی ہے (standalone) یا unlocked **desktop app** کے ذریعے fill کر سکتی ہے (native messaging)۔

Host نام: `com.openselfhosting.openkey`

<img src="/guide/extension-unlock-modes.svg" alt="Two unlock modes: standalone sync with the self-hosted server, or desktop app bridge via native messaging without a separate extension vault unlock" class="ok-diagram" width="920" height="400" />

## یہ کیا کرتی ہے

1. **Standalone vault** — email + master password سے unlock؛ سرور سے ciphertext سنک
2. **Native bridge** — جب desktop OpenKey app unlocked ہو، native messaging سے fill اور save
3. **Autofill** — logins اور payment cards کے لیے overlays، context menu، keyboard shortcut
4. **Save / update** — صفحے سے نئے logins vault میں capture
5. **Passkeys** — WebAuthn `create` / `get` intercept؛ ES256 credentials محفوظ (ایکسٹینشن unlocked)
6. **Cards، crypto & secrets** — vault کے reserved حصے browse اور fill/copy
7. **Attachments** — login کے decrypted attachments فہرست اور ڈاؤن لوڈ (standalone)
8. **Shares & orgs** — shares اور org invites فہرست/قبول/منسوخ (standalone)

### Keyboard shortcut

| عمل | Windows / Linux | macOS |
|--------|-----------------|-------|
| OpenKey سے login fill | `Ctrl+Shift+L` | `⌘⇧L` |

اگر دوسری ایکسٹینشن نے command پہلے لے لی ہو تو براؤزرز extension keyboard shortcuts میں confirm یا remap مانگ سکتے ہیں۔

## انسٹال (unpacked)

Store listings ابھی شائع نہ ہوں۔ مقامی طور پر build اور load کریں:

```bash
cd openkey_extension
npm install
npm run build
```

- **Chrome / Edge / Brave:** `chrome://extensions` → Developer mode → **Load unpacked** → `dist/` منتخب کریں
- **Firefox:** `about:debugging` → This Firefox → **Load Temporary Add-on** → `dist/manifest.json` چنیں

Popup یا Options page سے extension ID کاپی کریں — Chromium براؤزرز میں desktop bridge جوڑنے کے لیے چاہیے۔

## Permissions

ایکسٹینشن `<all_urls>` host / content-script matches استعمال کرتی ہے تاکہ autofill، login capture، passkey interception آپ کے ملنے والے سائٹس پر کام کریں (مقررہ allowlist کھلی ویب نہیں ڈھانپ سکتی)۔ Ciphertext sync اور unlock آپ کے device یا [self-hosted سرور](./server) پر رہتے ہیں؛ OpenKey صفحے کا HTML vendor cloud میں نہیں بھیجتا۔ جب الگ extension vault unlock کے بغیر fill چاہیں تو **Use desktop app** ترجیح دیں۔

## Unlock modes

### Self-hosted server

1. Popup یا Options میں **Self-hosted server URL** سیٹ کریں۔
2. **Create account** (register) یا **Unlock** (prelogin + login — app جیسا email اور master password)۔
3. Ciphertext `POST /sync` سے سنک ہوتا ہے۔ Master password client نہیں چھوڑتا۔

### Desktop app bridge

1. OpenKey desktop app unlock کریں۔
2. Autofill فعال / ایکسٹینشن جوڑیں (نیچے platform steps)۔
3. ایکسٹینشن میں **Use desktop app** چنیں۔

Fill اور save unlocked app سے جاتے ہیں — ان flows کے لیے الگ extension vault unlock نہیں۔

اختیاری: air-gapped bootstrap کے لیے app میں **Settings → Browser extension → Copy offline vault link**۔

## Native messaging جوڑیں

### Windows

**Settings → Security** کھولنے سے `openkey_native_host.exe` یہاں رجسٹر ہوتا ہے:

`HKCU\Software\...\NativeMessagingHosts\com.openselfhosting.openkey`

Chromium کے لیے unpacked extension ID یہاں لکھیں:

`%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt`

پھر Autofill دوبارہ کھولیں تاکہ host manifest دوبارہ بنے۔ Firefox خود `openkey@openselfhosting.local` استعمال کرتا ہے۔

Vault unlocked رکھیں (loopback TCP)۔

### macOS

Unlock پر OpenKey `openkey_native_host.py` انسٹال کرتا ہے اور Chrome / Chromium / Edge / Brave / Firefox NativeMessagingHosts folders میں manifests لکھتا ہے۔

1. Unpacked extension load کریں اور ID کاپی کریں۔
2. App: **Settings → Browser extension** → ID paste → **Connect extension**۔
3. Vault unlocked رکھیں → ایکسٹینشن: **Use desktop app**۔

`PATH` پر **Python 3** درکار۔

### Linux

**Settings → Security** host manifests `~/.config/google-chrome/`، Chromium، Edge، اور `~/.mozilla/native-messaging-hosts/` میں لکھتا ہے۔

Chromium extension ID فائل:

`~/.local/share/OpenKey/chrome_extension_id.txt`

پھر Autofill دوبارہ۔ Firefox `openkey@openselfhosting.local` استعمال کرتا ہے۔

Bridge socket: `$XDG_RUNTIME_DIR/openkey-native.sock` (vault unlocked رکھیں)۔

## Capture شدہ logins محفوظ کریں

Login submit (یا login button / Enter) کے بعد in-page banner **Save** یا **Update** پیش کرتا ہے:

1. **Native bridge** — unlocked desktop app پر `createEntry` / `updateEntry`
2. **Standalone** — مقامی encrypt اور sync سے ciphertext push

وہی host + username + password نظرانداز؛ بدلا ہوا password update مانگتا ہے۔

## Passkeys

ایکسٹینشن unlocked ہونے پر OpenKey سائٹس پر WebAuthn handle کر سکتا ہے۔ In-page dialog تصدیق؛ platform authenticator پر واپس **Use browser** چنیں۔

Unlock کے بعد smoke test: [webauthn.io](https://webauthn.io) یا `openkey_extension` میں `npx tsx src/passkey/smoke.test.ts`۔

## متعلقہ

- [ڈاؤن لوڈ اور انسٹال](./download)
- [ایپ کا استعمال](./app) — Autofill اور Browser extension settings
- [سرور سیٹ اپ](./server)
- [سیکیورٹی](./security) — extension trust boundary
