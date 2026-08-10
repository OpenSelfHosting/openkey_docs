# Nearby LAN والٹ سنک

**OpenKey Pro** آپ کے مقامی Wi‑Fi پر ایک ہی vault کو ڈیوائسز کے درمیان **بغیر self-hosted سرور** سنک کر سکتا ہے۔ Ciphertext جوڑی گئی LAN سیشن پر منتقل ہوتا ہے؛ vault key صرف اس کے بعد شیئر ہوتی ہے جب آپ واضح طور پر **Link vault** کریں۔

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: pair with QR or code for a session key, explicitly link vault to share the vault key, then sync ciphertext on the LAN; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

یہ صفحہ pairing، QR codes، vault link، send-entry، LAN Pro اور trust rules کا احاطہ کرتا ہے۔ مختصر troubleshooting: [FAQ](./faq#nearby-دوسری-ڈیوائس-نہیں-ملتی-pro)۔ Threat model: [سیکیورٹی](./security#خطر-ماڈل)۔

## ضروریات

- ہر ڈیوائس پر OpenKey Pro جسے سنک کرنا ہو (یا non–store-IAP پلیٹ فارمز پر درست **LAN Pro** attestation — نیچے دیکھیں)
- دونوں ڈیوائسز unlocked اور **ایک ہی LAN** پر (guest Wi‑Fi / client isolation نہیں)
- دونوں طرف **Settings → Nearby devices** شروع ہو

Nearby **backup نہیں**۔ Pro [encrypted `.okbak`](./import-export#encrypted-backup-pro) بھی رکھیں۔

## ڈیوائسز جوڑیں

1. دونوں ڈیوائسز پر OpenKey unlock کریں → **Settings → Nearby devices**۔
2. **Visible on local network** آن کریں (یاد رہتا ہے: vault unlocked رہتے ہوئے اگلی unlock پر دوبارہ شروع)۔
3. ان میں سے ایک سے جوڑیں:
   - **QR (ترجیحی):** advertising ڈیوائس pairing QR دکھاتی ہے؛ دوسری پر **Scan pairing QR** (یا Linux/Windows پر **Paste pairing QR**) — کوڈ ٹائپ کرنے کی ضرورت نہیں۔
   - **Short code:** peer پر دکھایا گیا کوڈ تقریباً دو منٹ میں درج کریں۔
4. Pairing کے بعد **Link vault** دبائیں تاکہ دونوں ایک ہی vault-key fingerprint شیئر کریں۔ صرف pairing vault key خودکار شیئر نہیں کرتی۔

اگر vault keys مختلف ہوں تو وصول کنندہ peer کی key **adopt** کر سکتا ہے (master password تصدیق کے بعد مقامی vault ڈیٹا بدل جاتا ہے)۔ link + adopt کو مکمل vault trust سمجھیں۔

### Firewall / dial-back

کچھ desktops (خاص طور پر macOS) inbound TCP بلاک کرتے ہیں۔ QR scan سے کنکشن نہ ہو تو OpenKey QR host سے guest کو dial-back کر سکتا ہے (صرف unicast UDP — pairing code LAN پر broadcast نہیں)۔ OS کے local-network / firewall prompts اجازت دیں۔ ایک ہی subnet ترجیح دیں؛ VPNs اور private relay اکثر discovery توڑ دیتے ہیں۔ بہت زیادہ غلط codes پر مختصر lockout۔

## لنک کے بعد

- دونوں vaults unlocked اور Nearby advertising رہتے ہوئے تبدیلیاں خود سنک ہوتی ہیں۔
- دستی catch-up کے لیے **Sync now** استعمال کریں۔
- سنک **revision کے مطابق last-write-wins** ہے (اسی rule جیسا [سرور](./server)) — جب ممکن ہو ایک وقت میں ایک ڈیوائس پر edit کریں۔
- **Trusted devices:** ایک کامیاب pair + vault link کے بعد peers دوبارہ جڑتے اور سنک کرتے ہیں جب Nearby آن ہو — دوبارہ pairing نہیں۔
- **Trusted networks only (اختیاری):** گھر/دفتر Wi‑Fi SSIDs شامل کریں؛ موجودہ SSID فہرست میں نہ ہو تو Nearby رک جاتا ہے (اور فہرست خالی ہو تو start بلاک)۔ جب OS SSID نہیں پڑھ سکتا تو Nearby warning banner کے ساتھ چل سکتا ہے۔
- **Unpair** LAN trust منسوخ، سنک بند، اور اس peer سے LAN Pro claims صاف کرتا ہے۔

## ایک entry بھیجیں

مکمل vault سنک کا انتظار کیے بغیر جوڑے ہوئے peer کو ایک login push کر سکتے ہیں:

1. Entry کھولیں (یا **Settings → Nearby devices** پر Nearby peer actions استعمال کریں)۔
2. **Send to device** / اس peer کے لیے entry بھیجیں منتخب کریں۔
3. Peer LAN سیشن پر ciphertext وصول کرتا ہے اور مقامی طور پر محفوظ کر سکتا ہے۔

LAN پر one-off shares کے لیے استعمال کریں؛ جب peers ایک ہی self-hosted سرور استعمال کریں تو [organizations & sharing](./sharing) ترجیح دیں۔

## LAN Pro attestation {#lan-pro-attestation}

**بغیر** store in-app purchase والے پلیٹ فارمز پر (عام طور پر Windows / Linux)، vault-linked Pro peer **LAN Pro** status شیئر کر سکتا ہے تاکہ دوسری ڈیوائس Nearby پر Pro limits unlock کرے۔ صرف pairing کافی نہیں — پہلے **Link vault** دبائیں۔

- صرف سہولت — خریداری کا **کرپٹو ثبوت نہیں**۔
- Android، iOS، macOS (store IAP) **LAN Pro نظرانداز** کرتے ہیں؛ اس store پر Pro خریدیں یا restore کریں۔
- Unpairing attestation بند کر دیتی ہے۔

## Trust خلاصہ

| عمل | Trust مفہوم |
|--------|-------------------|
| Pair | LAN پر اس peer کے ساتھ session key |
| Link vault | Vault-key material شیئر — peer مکمل vault ciphertext سنک کر سکتا ہے |
| Send entry | Peer اس entry کا ciphertext وصول کرتا ہے |
| LAN Pro | Peer non-IAP پلیٹ فارمز پر Pro limits unlock کر سکتا ہے |

صرف ان ڈیوائسز اور لوگوں سے pair اور link کریں جن پر اعتماد ہے۔ تفصیل: [سیکیورٹی → خطر ماڈل](./security#خطر-ماڈل)۔

## متعلقہ

- [ایپ کا استعمال](./app) — settings map اور Pro matrix
- [ڈاؤن لوڈ](./download)
- [امپورٹ اور ایکسپورٹ](./import-export) — اصل backups
- [FAQ](./faq)
- [سیکیورٹی](./security)

اگلا: [ایپ کا استعمال](./app) · [شیئرنگ](./sharing) · [FAQ](./faq)
