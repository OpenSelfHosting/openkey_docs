# رازداری کی پالیسی

**آخری تازہ کاری:** 6 August 2026  
**پروڈکٹ:** OpenKey (`com.openselfhosting.openkey`)  
**ناشر:** OpenSelfHosting  
**رابطہ:** [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com) · سیکیورٹی: [security@openselfhosting.com](mailto:security@openselfhosting.com)

یہ رازداری کی پالیسی بیان کرتی ہے کہ موبائل اور ڈیسک ٹاپ ایپ **OpenKey** معلومات کیسے سنبھالتی ہے۔ OpenKey کو **zero-knowledge** پاس ورڈ مینیجر کے طور پر ڈیزائن کیا گیا ہے: vault کے راز device سے نکلنے سے پہلے encrypted ہوتے ہیں۔

متعلقہ مطالعہ: [سیکیورٹی](/ur/guide/security) · [سروس کی شرائط](/ur/terms)

## خلاصہ

| موضوع | عمل |
|-------|----------|
| ماسٹر پاس ورڈ | کبھی plaintext میں device نہیں چھوڑتا |
| vault کا مواد | device پر encrypted (AES-256-GCM)؛ اختیاری sync صرف **ciphertext** بھیجتا ہے |
| ہمارا cloud | OpenKey آپ کے پاس ورڈز کے لیے لازمی vendor vault cloud **نہیں** چلاتا |
| Self-hosted سرور | اگر آپ جوڑیں تو **آپ** (یا آپ کی تنظیم) اسے چلاتے اور وہ ڈیٹا کنٹرول کرتے ہیں |
| اسٹور بلنگ | Pro خریدارییں جہاں دستیاب ہوں Apple / Google / Microsoft اسٹور بلنگ سے گزرتی ہیں |

## کس پر لاگو ہوتی ہے

یہ پالیسی سرکاری OpenKey **ایپ** (Android، iOS، macOS، Windows، Linux) پر لاگو ہے۔ الگ پیکجز (self-hosted سرور، براؤزر ایکسٹینشن، CLI، دستاویزات سائٹ) وہی zero-knowledge اصولوں پر ہیں؛ self-hosted سرور کے آپریٹرز اس instance کے آپریشنل ڈیٹا کے controllers ہیں (نیچے دیکھیں)۔

## معلومات جو ہم جمع نہیں کرتے

OpenSelfHosting **نہیں** وصول کرتا:

- ماسٹر پاس ورڈ
- سادہ vault key
- ڈکرپٹ شدہ logins، notes، TOTP secrets، payment cards، crypto wallet data، developer secrets، یا attachment contents
- آپ کی ملاحظہ کردہ ویب سائٹس کا مکمل page HTML (براؤزر ایکسٹینشن صفحات vendor cloud میں نہیں بھیجتی)

ہم ذاتی ڈیٹا نہیں بیچتے۔

## device پر پروسیس ہونے والی معلومات

OpenKey آپ کے device پر **مقامی طور پر** ذخیرہ اور پروسیس کرتا ہے (unlock سیٹ اپ کے بعد rest پر encrypted):

- Vault ڈیٹا بیس (collections، entries، attachments metadata/blobs ciphertext کے طور پر جب locked/synced)
- ایپ settings (appearance، language، autofill preferences، آپ کا درج کردہ server URL، Nearby preferences)
- اختیاری biometric wrap unlock material کا (جہاں دستیاب OS secure enclave / keystore سے)
- آپ کے configure کردہ سرور کے لیے cached sync tokens (access JWTs / refresh material اس host کے لیے ایپ میں محفوظ)

ایپ حذف یا device wipe مقامی ڈیٹا ہٹاتا ہے، آپ کے کنٹرول والے OS backups کے مطابق۔

## اختیاری self-hosted sync سرور

اگر آپ **Settings → Data → Self-hosted server** فعال کریں تو ایپ **آپ کے** API (یا آپ کے منتخب) کو بھیجتی ہے:

- Email (اکاؤنٹ identifier)
- Client-derived `auth_hash` (ماسٹر پاس ورڈ نہیں)
- Salt اور KDF parameters
- Wrapped (encrypted) vault key اور vault items، attachments، orgs اور shares کا opaque ciphertext

OpenKey پروجیکٹ کا reference سرور **صرف ciphertext** ذخیرہ کرنے کے لیے ڈیزائن ہے۔ جو اس سرور کو چلاتا ہے (آپ، آپ کی کمپنی، یا قابلِ اعتماد host) email، ciphertext sizes اور timestamps جیسا metadata دیکھ سکتا ہے، اور ڈیٹا حذف یا روک سکتا ہے — لیکن design کے مطابق vault contents decrypt نہیں کر سکتا۔ دیکھیں [سیکیورٹی](/ur/guide/security)۔

## Nearby LAN sync (Pro)

Nearby آپ کے local network پر devices جوڑتا ہے، اور **Link vault** کے بعد ان devices کے درمیان vault ciphertext sync کرتا ہے۔ Pairing اور vault-key sharing آپ کی LAN پر آپ کے منتخب devices کے درمیان ہوتی ہے۔ OpenSelfHosting Nearby traffic وصول نہیں کرتا۔


## Autofill، passkeys اور براؤزر ایکسٹینشن

- **System Autofill / Credential Provider** credentials apps اور sites کے ساتھ صرف OS-mediated fill flows سے شیئر کرتا ہے جنہیں آپ شروع یا منظور کریں۔
- **براؤزر ایکسٹینشن** آپ کے سرور کے خلاف unlock یا unlocked desktop ایپ (native messaging) کے ذریعے fill کر سکتی ہے۔ Fill اور save جان بوجھ کر user actions ہیں۔ دیکھیں [براؤزر ایکسٹینشن](/ur/guide/extension)۔

## خریداری اور سبسکرپشنز (OpenKey Pro)

جہاں Pro app store سے فروخت ہو، ادائیگی، receipts اور متعلقہ اکاؤنٹ ڈیٹا **Apple، Google یا Microsoft** اپنی پالیسیوں کے تحت سنبھالتے ہیں۔ OpenKey Pro فیچرز unlock کرنے کے لیے store entitlements / purchase status وصول کر سکتا ہے۔ ہمیں ان اسٹورز سے آپ کا مکمل payment card number نہیں ملتا۔

Nearby peers کے درمیان **LAN Pro** attestation کچھ desktop platforms پر مقامی سہولت ہے — OpenSelfHosting کے ساتھ cloud billing account نہیں۔

## Diagnostics اور support

OpenKey میں لازمی third-party analytics SDK نہیں جو vault content upload کرے۔ اگر آپ support کو email ([openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)) یا Telegram community channels پر لکھیں تو آپ خود شامل کرتے ہیں (مثلاً app version)۔ cleartext email میں ماسٹر پاس ورڈز یا vault exports نہ بھیجیں۔

## بچوں کی رازداری

OpenKey 13 سال سے کم (یا آپ کے دائرہ اختیار میں کم از کم عمر) بچوں کے لیے نہیں۔ اس عمر سے کم ہوں تو ایپ استعمال نہ کریں۔

## بین الاقوامی processing

Processing آپ کے devices پر ہوتی ہے، اور اگر sync configure کریں تو آپ کے منتخب server host پر۔ اگر آپ ہم سے رابطہ کریں تو messages ان علاقوں میں process ہو سکتی ہیں جہاں ہمارے mail یا support tools چلتے ہیں۔

## برقراری

- **Device پر:** جب تک vault حذف، ایپ uninstall یا device / backups wipe نہ کریں۔
- **آپ کے sync سرور پر:** جب تک server account حذف یا operator ڈیٹا حذف نہ کرے؛ tombstones peers sync ہونے تک رہ سکتے ہیں۔
- **Support email:** جواب اور جائز security/legal مقاصد کے لیے ضرورت کے مطابق رکھا جاتا ہے۔

## آپ کے اختیارات

- بغیر سرور مکمل offline OpenKey استعمال کریں
- Nearby pairing قبول یا مسترد کریں
- مقامی ڈیٹا export یا delete کریں (export / backup کے لیے Pro درکار ہو سکتا ہے)
- authenticated delete flow سے server account حذف کریں (server ciphertext ہٹاتا ہے؛ مقامی copies جب تک wipe نہ کریں رہتی ہیں)
- اسٹور subscription management سے store subscriptions منسوخ کریں

## تبدیلیاں

پروڈکٹ بدلنے پر ہم یہ پالیسی update کر سکتے ہیں۔ «آخری تازہ کاری» کی تاریخ بدلے گی؛ اہم تبدیلیاں [changelog](/ur/guide/changelog) یا in-app About links میں بھی نوٹ ہو سکتی ہیں۔

## رابطہ

- پروڈکٹ / support: [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)
- Security reports: [security@openselfhosting.com](mailto:security@openselfhosting.com) — دیکھیں [کمزوریوں کی رپورٹ](/ur/guide/security)
- تنظیم: [OpenSelfHosting](https://github.com/OpenSelfHosting) · پروڈکٹ: [openkey.openselfhosting.com](https://openkey.openselfhosting.com) · کمپنی: [openselfhosting.com](https://openselfhosting.com)

اگلا: [سروس کی شرائط](/ur/terms) · [سیکیورٹی](/ur/guide/security) · [ایپ کا استعمال](/ur/guide/app)
