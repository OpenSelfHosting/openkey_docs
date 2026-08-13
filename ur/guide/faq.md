# عمومی سوالات اور ازالہ

عام سوالات کے مختصر جوابات۔ گہرا پس منظر: [سیکیورٹی](./security)، [سرور سیٹ اپ](./server)، [ایپ کا استعمال](./app)، [Nearby](./nearby)، [براؤزر ایکسٹینشن](./extension)، [CLI](./cli)۔

## Master password اور recovery

### میں نے master password بھول گیا۔ کیا vault recover کر سکتا ہوں؟

**نہیں۔** OpenKey zero-knowledge ہے: سرور master password یا plaintext vault key نہیں دیکھتا۔ Password کے بغیر (اور بغیر ایسی ڈیوائس جس پر unlocked session یا encrypted local backup ہو جسے unlock کر سکیں)، ciphertext ناقابلِ بحال ہے۔

مضبوط unique master password اور کم از کم ایک **Pro** encrypted local backup (`.okbak`) یا offline export رکھیں۔

### کیا server admin میرا password reset کر سکتا ہے؟

نہیں۔ Admins ciphertext حذف یا روک سکتے ہیں اور metadata (email، sizes، timings) دیکھ سکتے ہیں۔ وہ آپ کا vault decrypt یا نیا master password سیٹ نہیں کر سکتے۔

### Master password کیسے بدلوں؟

ایپ میں account / security flow استعمال کریں جو credentials rotate کرتا ہے (سرور پر `/auth/rekey`)۔ Vault key خود وہی رہتی ہے؛ صرف auth hash اور server پر wrapped vault key update ہوتے ہیں۔ **نئے** master password سے دوسری ڈیوائسز بعد میں سنک کریں۔

## Sync اور سرور

### Sync ناکام یا login error دیتا ہے

1. تصدیق کریں `http(s)://your-host/health` healthy واپس آتا ہے۔
2. ہر client پر **بالکل وہی** server URL (trailing slash ٹھیک؛ production میں HTTPS ترجیح)۔
3. `JWT_SECRET` سیٹ ہے (≥ 32 chars، placeholder نہیں) — ورنہ API start نہیں کرے گی۔
4. `CORS_ORIGINS` میں extension / web origins شامل ہوں اگر استعمال کریں (**کبھی `*` نہیں**)۔
5. Auth endpoints فی IP **rate-limited** (`AUTH_RATE_LIMIT_*`)۔ بہت سے failed logins کے بعد ایک منٹ انتظار اور retry۔
6. پہلی ڈیوائس پر ایک بار register؛ دوسری پر وہی email + master password سے **login**، پھر **Sync now**۔

### فون `http://localhost:8000` تک نہیں پہنچتا

فون پر `localhost` خود فون ہے۔ ایک ہی Wi‑Fi پر کمپیوٹر کا LAN IP (`http://192.168.x.x:8000`)، یا reverse proxy / tunnel سے HTTPS۔ Mobile پر cleartext HTTP بلاک ہو سکتا ہے — local debugging کے علاوہ HTTPS ترجیح۔

### دو ڈیوائسز پر sync کے بعد vault مواد مختلف

Sync **revision کے مطابق last-write-wins** ہے، CRDT نہیں۔ ہم وقت edits overwrite ہو سکتی ہیں۔ ایک وقت میں ایک ڈیوائس پر edit کے بعد دوبارہ pull/push۔ Nearby LAN sync بھی وہی LWW rule۔

### Server account کیسے حذف کروں؟

Clients authenticated `POST /auth/delete` current `auth_hash` دوبارہ ثابت کرنے کے بعد۔ Server-side ciphertext مستقل حذف۔ **ڈیوائسز پر local vaults متاثر نہیں** — ضرورت ہو تو الگ حذف یا wipe۔

## ایپ اور Pro

### مفت کیا ہے بمقابلہ Pro؟

[ایپ کا استعمال](./app#مفت-بمقابلہ-openkey-pro) میں matrix دیکھیں۔ مختصر: مفت میں بنیادی vault + item limits کے ساتھ server sync؛ Pro unlimited items، export، encrypted backups، Nearby، organizations/sharing، attachments، custom icons کھولتا ہے۔

### Nearby دوسری ڈیوائس نہیں ملتی (Pro)

1. دونوں unlocked، **Settings → Nearby devices** شروع، ایک Wi‑Fi (guest/client isolation نہیں)۔
2. کوڈ ٹائپ کرنے کی بجائے **Scan pairing QR** ترجیح؛ camera / local-network permission prompts اجازت دیں۔
3. عارضی طور پر VPN / private relay بند۔ macOS پر QR connection fail ہو تو firewall dial-back اجازت۔
4. Pair، پھر **Link vault** (ایک vault key fingerprint)۔ مکمل گائیڈ: [Nearby](./nearby)۔
5. اختیاری **Trusted networks only**: SSID شامل یا unknown networks پر Nearby رک جاتا ہے۔
6. Store-IAP platforms (Android / iOS / macOS) peers سے **LAN Pro** نظرانداز — ضرورت ہو تو اس store پر Pro خریدیں/restore۔

### LAN پر ایک password دوسری ڈیوائس کو کیسے بھیجوں؟

Pairing (Pro) کے بعد entry پر **Send to device** یا Nearby peer actions سے۔ مکمل vault sync کا انتظار کیے بغیر ایک entry LAN session پر push۔ تفصیل: [Nearby → ایک entry بھیجیں](./nearby#ایک-entry-بھیجیں)۔

### Autofill / passkeys نظر نہیں آتے

**Settings → Autofill** میں OpenKey کو system password & passkey provider بنائیں، پھر vault unlock۔ iOS/macOS پر OS permission prompts دیں۔ Provider بدلنے کے بعد براؤزر یا target app restart۔

### Extension fill shortcut کیا ہے؟

Windows/Linux پر `Ctrl+Shift+L`، macOS پر `⌘⇧L`۔ ضرورت ہو تو browser extension keyboard shortcuts میں remap۔ [براؤزر ایکسٹینشن](./extension#keyboard-shortcut) دیکھیں۔

### Import ہو گیا مگر export locked

**Import مفت؛ export Pro چاہیے** (encrypted `.okbak` backups بھی)۔ Walkthrough: [امپورٹ اور ایکسپورٹ](./import-export)۔

### Attachments کیسے کام کرتے ہیں؟

**Pro.** Login کھولیں → encrypted attachment شامل (زیادہ سے زیادہ تقریباً **20 MB**)۔ Attachments سرور سے ciphertext کے طور پر سنک۔ OpenKey JSON export صرف metadata — attachment blobs سمیت مکمل vault کے لیے `.okbak`۔

### TOTP / authenticator codes کیسے شامل کروں؟

Entry پر authenticator secret یا `otpauth` URI، یا سائٹ کے 2FA setup سے **QR scan**۔ Codes vault unlocked ہونے پر؛ system Autofill / extension جہاں supported ہو fill کر سکتے ہیں۔

### Collections nested ہو سکتی ہیں؟

ہاں — folders دوسرے folders رکھ سکتے ہیں (`parent` relationship)۔ Nested logins autofill اور desktop bridge میں شامل۔

### حذف شدہ items دوسری ڈیوائسز پر فوراً غائب؟

Soft-deleted items **tombstones** کے طور پر سنک جب تک peers catch up نہ کریں۔ Last-write-wins فی-item `revision` — ہم وقت edits پھر overwrite ہو سکتی ہیں۔


### Organizations اور shares کیسے کام کرتے ہیں؟

Pro + ایک ہی self-hosted server۔ Identity keys شائع، پھر org میں دعوت یا entry snapshot share۔ تفصیل: [شیئرنگ اور تنظیمیں](./sharing)۔

### Biometrics / auto-lock کیسے کام کرتے ہیں؟

**Settings → Security** میں biometric unlock (platform-dependent) اور related lock protections۔ Shared machines پر idle پر lock ترجیح۔ Biometrics device پر vault key wrap — مضبوط master password کی جگہ نہیں۔

## براؤزر ایکسٹینشن

### Extension desktop app سے بات نہیں کر پاتی

1. Desktop vault unlock اور unlocked رکھیں۔
2. Native host register کے لیے **Settings → Autofill** (macOS پر **Browser extension**) کھولیں۔
3. Chromium: platform file میں unpacked extension ID لکھیں ([براؤزر ایکسٹینشن](./extension) دیکھیں)، پھر Autofill دوبارہ۔
4. Extension میں **Use desktop app** چنیں۔
5. macOS کو host script کے لیے `PATH` پر Python 3 چاہیے۔

### Standalone unlock میرے سرور کے خلاف ناکام

Prelogin کام کرتا ہے تصدیق: email پہلے register ہونا چاہیے۔ App جیسا master password۔ Server URL browser سے reachable (CORS / HTTPS)۔ Options page URL اور عام tab میں `/health` آزمائیں۔

### Passkeys browser authenticator پر واپس

Expected جب confirm dialog میں **Use browser** چنیں، یا extension vault locked ہو۔ OpenKey passkeys store/use کے لیے extension unlock (standalone)۔

## CLI

### `openkey secret …` کہتا ہے app unlock کرو

Vault commands کو **unlocked desktop app** (native bridge) یا `login` کے بعد `eval $(openkey unlock)` چاہیے۔ Bridge / session state کے لیے `openkey status` چلائیں۔

### Session expired

Default lock 15 منٹ (`openkey config set-lock`)۔ دوبارہ `eval $(openkey unlock)`۔ Personal machines پر `OPENKEY_PASSWORD` کی بجائے interactive password prompt ترجیح۔

## سیکیورٹی / privacy

### Password health میرے passwords انٹرنیٹ پر بھیجتا ہے؟

Local weak/reused checks device پر رہتے ہیں۔ اختیاری Have I Been Pwned صرف **SHA-1 prefix k-anonymity** — کبھی مکمل password نہیں۔ [سیکیورٹی](./security) دیکھیں۔

### کیا Nearby backup ہے؟

نہیں۔ Paired، vault-linked ڈیوائسز کے درمیان LAN پر ciphertext سنک۔ Offline Pro backups بھی رکھیں۔

## ابھی بھی پھنسے؟

1. ناکام client (app / extension / CLI) اور تقریباً وقت نوٹ کریں۔
2. Server logs (`docker compose logs -f api`) اور `/health` چیک کریں۔
3. Security issues نجی طور پر — **security@openselfhosting.com** یا [OpenSelfHosting](https://github.com/OpenSelfHosting) کے تحت private advisory۔ [سیکیورٹی](./security) دیکھیں۔
4. Product bugs کے لیے [OpenSelfHosting](https://github.com/OpenSelfHosting) پر issue package name اور version کے ساتھ۔

اگلا: [Nearby](./nearby) · [سرور سیٹ اپ](./server) · [سیکیورٹی](./security) · [ڈاؤن لوڈ](./download)
