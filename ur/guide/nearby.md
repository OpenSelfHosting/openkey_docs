# Nearby LAN والٹ سنک

**OpenKey Pro** آپ کے مقامی Wi‑Fi پر ایک ہی vault کو ڈیوائسز کے درمیان **بغیر self-hosted سرور** سنک کر سکتا ہے۔ Ciphertext جوڑی گئی LAN سیشن پر منتقل ہوتا ہے؛ vault key صرف اس کے بعد شیئر ہوتی ہے جب آپ واضح طور پر **Link vault** کریں۔ **نئی ڈیوائس** پر first-run setup کے دوران Nearby سے موجودہ vault **کاپی** بھی کر سکتے ہیں (vault clone) — اب بھی peer-to-peer، sync API سے نہیں۔

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: discover a peer on the LAN, pair for a session key, then either copy a vault at setup or explicitly link vaults for ongoing merge sync; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

یہ صفحہ discovery، tap-to-pair، setup پر vault clone، vault link، send-entry، LAN Pro اور trust rules کا احاطہ کرتا ہے۔ مختصر troubleshooting: [FAQ](./faq#nearby-دوسری-ڈیوائس-نہیں-ملتی-pro)۔ Threat model: [سیکیورٹی](./security#خطر-ماڈل)۔ Protocol details: [OpenKey spec → Nearby](https://github.com/OpenSelfHosting/OpenKey/blob/main/spec/nearby.md)۔

## ضروریات

- ہر ڈیوائس پر OpenKey Pro جسے سنک یا clone کرنا ہو (یا non–store-IAP پلیٹ فارمز پر درست **LAN Pro** attestation — نیچے دیکھیں)
- ایک ہی **LAN** (guest Wi‑Fi / client isolation نہیں)
- **Merge sync** کے لیے: دونوں ڈیوائسز unlocked اور **Settings → Nearby devices** شروع
- **Setup پر vault clone** کے لیے: موجودہ ڈیوائس unlocked اور advertising (vault کے ساتھ)؛ نئی ڈیوائس first-run **Nearby device** path پر

Nearby merge sync **backup نہیں**۔ Pro [encrypted `.okbak`](./import-export#encrypted-backup-pro) بھی رکھیں۔ Vault clone ایک بار پورا vault کاپی کرتا ہے (attachments سمیت)؛ بعد میں بھی offline backups رکھیں۔

Discovery beacons میں LAN پر **device name صاف** ہوتا ہے (اور peer کے پاس پہلے سے account ہے یا نہیں — `vault` flag)۔ صرف اپنی ڈیوائسز قبول کریں۔ Vault lock کرنے سے Nearby unlock تک رک جاتا ہے۔

Linux اور Windows ایک بار LAN ports کھولنے کو کہہ سکتے ہیں (**UDP/TCP 47821**, **TCP 47822**)۔ Peers کو یہ مشین مل سکے اس لیے prompts اجازت دیں۔

## Setup پر vault کاپی کریں (vault clone)

جب **نیا فون یا desktop** Wi‑Fi پر موجودہ vault کی مکمل کاپی چاہیے (بغیر `.okbak` فائل، بغیر سرور):

1. **موجودہ** ڈیوائس پر: OpenKey unlock → **Settings → Nearby devices** → **Visible on local network** آن کریں۔ Peer دکھائے کہ اس کے پاس **vault ہے**۔
2. **نئی** ڈیوائس پر: first-run chooser → **Nearby device** (یا مساوی setup path)۔
3. Discovered peer پر ٹیپ کریں → کاپی confirm کریں۔ Vault holder push کرتا ہے (یا خالی ڈیوائس pull) — session-encrypted archive LAN پر۔
4. نئی ڈیوائس پر ماخذ والے **ایک ہی master password** سے unlock کریں۔ Password تار پر نہیں جاتا — صرف unlock material اور vault ciphertext paired session کے اندر چلتے ہیں۔

Clone میں local database، preferences، attachments، اختیاری avatar، اور account unlock fields (email، salt، KDF، wrapped vault key) شامل ہیں۔ اگر وہ email نئی ڈیوائس پر پہلے سے ہو تو clone `email_exists` سے ناکام ہوتا ہے۔

**Clone بمقابلہ Link vault**

| | Vault clone | Link vault |
|--|-------------|------------|
| کب | First-run / خالی ڈیوائس | دونوں ڈیوائسز پر پہلے سے vaults |
| نتیجہ | ایک مکمل vault خالی ڈیوائس پر کاپی | Vault-key fingerprint شیئر؛ جاری LWW merge sync |
| Master password | کاپی unlock کے لیے وہی password | دونوں طرف پہلے سے unlocked |

## ڈیوائسز جوڑیں (merge sync)

1. دونوں ڈیوائسز پر OpenKey unlock کریں → **Settings → Nearby devices**۔
2. **Visible on local network** آن کریں (یاد رہتا ہے: vault unlocked رہتے ہوئے اگلی unlock پر دوبارہ شروع)۔
3. Discovered peer پر ٹیپ کر کے pair کریں (short pairing code LAN session پر خود بخود exchange ہوتا ہے)۔ Discovery مشکل ہو تو تقریباً دو منٹ میں short code دستی درج کرنا اب بھی کام کرتا ہے۔
4. Pairing کے بعد **Link vault** دبائیں تاکہ دونوں ایک ہی vault-key fingerprint شیئر کریں۔ صرف pairing vault key خودکار شیئر نہیں کرتی۔

اگر vault keys مختلف ہوں تو وصول کنندہ peer کی key **adopt** کر سکتا ہے (master password تصدیق کے بعد مقامی vault ڈیٹا بدل جاتا ہے)۔ link + adopt کو مکمل vault trust سمجھیں۔

### Firewall / dial-back

کچھ desktops (خاص طور پر macOS) inbound TCP بلاک کرتے ہیں۔ Linux اور Windows builds ایک بار **UDP/TCP 47821** اور **TCP 47822** مانگ سکتے ہیں۔ Peer dial-in نہ کر سکے تو OpenKey advertising host سے guest کو dial-back کر سکتا ہے (صرف unicast UDP — pairing code LAN پر broadcast نہیں)۔ OS کے local-network / firewall prompts اجازت دیں۔ ایک ہی subnet ترجیح دیں؛ VPNs اور private relay اکثر discovery توڑ دیتے ہیں۔ بہت زیادہ غلط codes پر مختصر lockout۔

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
| Vault clone | Peer کو مکمل vault کاپی ملتی ہے (ciphertext + unlock material)؛ unlock کے لیے وہی master password چاہیے |
| Link vault | Vault-key material شیئر — peer مکمل vault ciphertext سنک کر سکتا ہے |
| Send entry | Peer اس entry کا ciphertext وصول کرتا ہے |
| LAN Pro | Peer non-IAP پلیٹ فارمز پر Pro limits unlock کر سکتا ہے |

صرف ان ڈیوائسز اور لوگوں سے pair، clone اور link کریں جن پر اعتماد ہے۔ تفصیل: [سیکیورٹی → خطر ماڈل](./security#خطر-ماڈل)۔

## متعلقہ

- [ایپ کا استعمال](./app) — setup chooser، settings map اور Pro matrix
- [ڈاؤن لوڈ](./download)
- [امپورٹ اور ایکسپورٹ](./import-export) — `.okbak` بمقابلہ Nearby clone
- [FAQ](./faq)
- [سیکیورٹی](./security)

اگلا: [ایپ کا استعمال](./app) · [شیئرنگ](./sharing) · [FAQ](./faq)
