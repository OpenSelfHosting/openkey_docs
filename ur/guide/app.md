# ایپ کا استعمال

OpenKey Android، iOS، macOS، Linux اور Windows کے لیے موبائل اور ڈیسک ٹاپ کلائنٹ ہے۔ بنیادی vault فیچرز مفت ہیں؛ OpenKey Pro اضافی سہولیات کھولتا ہے۔ آپ کا vault device پر encrypted رہتا ہے؛ self-hosted [سرور](./server) sync کے لیے اختیاری ہے۔ ایپ اپنے پلیٹ فارم کے سرکاری اسٹور یا ڈاؤن لوڈ چینل سے انسٹال کریں۔

<img src="/app_icon.png" alt="OpenKey app icon" width="96" height="96" style="border-radius: 20px; margin: 1rem 0;" />

## انسٹال

1. اپنے پلیٹ فارم کے سرکاری اسٹور / ڈسٹریبیوٹر سے OpenKey حاصل کریں۔
2. ایپ کھولیں اور master password سے vault بنائیں یا unlock کریں۔

اس پروجیکٹ کے اوپن سورس پیکجز صرف [سرور](./server)، [براؤزر ایکسٹینشن](./extension) اور [CLI](./cli) کا احاطہ کرتے ہیں۔



## مفت بمقابلہ OpenKey Pro {#free-vs-openkey-pro}

بنیادی والٹ خصوصیات بغیر سبسکرپشن آف لائن چلتی ہیں۔ Android، iOS، macOS، Windows اور Linux پر Pro حدیں بڑھاتا اور اضافی خصوصیات کھولتا ہے۔ Web بلڈز ابھی Pro نافذ نہیں کرتے۔ **اسٹور IAP کے بغیر** پلیٹ فارمز (عام طور پر Windows/Linux) پر جوڑا Nearby **LAN Pro** attestation شیئر کر سکتا ہے — صرف سہولت، خریداری کا کرپٹو ثبوت نہیں۔

| | مفت | Pro |
|--|------|-----|
| لاگ ان اندراجات | زیادہ سے زیادہ **50** | بلا حد |
| کلیکشنز (فولڈرز) | زیادہ سے زیادہ **3** | بلا حد |
| کارڈز / کرپٹو / سیکریٹس | ہر ایک زیادہ سے زیادہ **3** | بلا حد |
| سرور سنک، آٹوفل، امپورٹ | ہاں | ہاں |
| **ایکسپورٹ**، **`.okbak` بیک اپ**، **Nearby**، **orgs/شیئر**، **اٹیچمنٹس**، **آئیکن** | — | ہاں |

اسٹور بلنگ جہاں دستیاب ہو: **Settings → OpenKey Pro**۔

## Nearby LAN والٹ سنک (Pro)

بغیر سرور مقامی Wi‑Fi پر ایک ہی والٹ سنک کریں:

1. دونوں ڈیوائسز پر OpenKey انلاک → **Settings → Nearby devices**۔
2. دونوں پر Nearby شروع کریں، مختصر کوڈ سے جوڑیں، پھر **Link vault**۔
3. ایک ہی vault key (ایک fingerprint) چاہیے۔ مختلف ہوں تو وصول کنندہ peer کی key اپنا سکتا ہے (ماسٹر پاس ورڈ تصدیق کے بعد مقامی ڈیٹا بدل جاتا ہے)۔
4. لنک کے بعد دونوں انلاک رہتے ہوئے آٹو سنک؛ دستی کے لیے **Sync now**۔
5. **Visible on local network** یاد رہتا ہے: ایک بار آن کرنے کے بعد اگلی انلاک پر Nearby واپس آتا ہے۔
6. اختیاری **Trusted networks only**: SSID شامل کریں؛ نامعلوم نیٹ ورکس پر Nearby رک جاتا ہے۔
7. **Trusted devices**: ایک pairing + link کے بعد Nearby آن ہونے پر خود بخود جڑتے ہیں۔

LAN سنک صرف **ciphertext** بھیجتا ہے (revision کے مطابق LWW)۔ یہ بیک اپ نہیں۔ دیکھیں [FAQ](./faq) · [شیئرنگ](./sharing) · [امپورٹ/ایکسپورٹ](./import-export)۔

## Vault بنانا یا unlock کرنا

1. مضبوط **master password** منتخب کریں (12+ مخلوط حروف تجویز)۔
2. vault notices قبول کریں: master password بھولنے پر **کوئی recovery نہیں**؛ ڈیٹا device پر encrypted؛ backups اہم ہیں۔
3. ایپ کھولنے پر master password سے unlock کریں۔

Master password کبھی plaintext میں device نہیں چھوڑتا۔

## روزمرہ استعمال

### Vault home

- **collections** (folders) اور password **entries** براؤز کریں۔
- تلاش، tags سے filter، اور username/password copy یا custom fields دیکھنے entry کھولیں۔
- URLs، notes، icons اور TOTP کے ساتھ entries بنائیں جہاں supported ہو۔

### Password generator

**Settings → Password generator** (یا entry form سے generator) کھول کر اپنی length اور character rules سے مضبوط passwords بنائیں۔

### Cards، crypto اور secrets

محفوظ vault علاقوں میں:

- **Payment cards**
- **Crypto wallets**
- **Developer secrets** (API tokens، SSH keys، `.env` snippets) — [CLI](./cli) بھی استعمال کرتی ہے

### Organizations اور sharing

اسی server پر دوسرے OpenKey users کے ساتھ collections یا individual items share کریں۔ org names اور share payloads server پر ciphertext رہتے ہیں۔

## Settings map

| Area | What it does |
|------|----------------|
| **Appearance** | Theme mode اور language (اس docs site کے same locales) |
| **Security** | Lock / biometrics / **system Autofill** (not a separate page) |
| **Password generator** | Default generation options |
| **Data** | Server sync، import/export، backups، browser extension، sharing |
| **OpenKey Pro** | Subscription management جہاں available |

## Self-hosted server connect کریں

1. [OpenKey Server](./server) چلائیں۔
2. **Settings → Data → Self-hosted server** → URL set → **Register** یا **Login** → **Sync now**۔

تفصیل: [سرور انسٹال](./server)۔

## Autofill اور browser

- **Mobile / desktop Autofill:** Settings → Security میں OpenKey کو system password & passkey provider enable کریں۔
- **Browser:** extension install کریں؛ desktop پر app unlock کر native host register کریں، یا standalone mode میں server کے خلاف extension unlock کریں۔

## Import، export اور backup

- **Import / export:** passwords اندر/باہر منتقل (Bitwarden JSON، Chrome CSV، 1Password CSV، OpenKey JSON)۔ export device پر decrypt — file sensitive سمجھیں۔
- **Local backup / restore:** encrypted device backups (جہاں Pro required)۔
- server sync کے باوجود offline backups ترجیح دیں — بھولا master password server سے recover نہیں ہو سکتا۔

## اچھی عادات

- unique، مضبوط master password استعمال کریں۔
- server استعمال میں بڑی تبدیلیوں کے بعد sync کریں۔
- کم از کم ایک offline backup رکھیں۔
- shared machine سے ہٹتے وقت vault lock کریں۔

اگلا: [سرور انسٹال](./server) · [CLI](./cli) · [Quick start](./quick-start)

Also: [Download](./download) · [Sharing](./sharing) · [Import & export](./import-export) · [FAQ](./faq) · [Changelog](./changelog)
