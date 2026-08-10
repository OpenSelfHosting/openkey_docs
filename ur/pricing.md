# قیمتیں

**OpenKey** معقول حدود کے ساتھ مکمل encrypted vault کے لیے مفت ہے۔ **OpenKey Pro** حدیں ہٹاتا ہے اور export، backups، Nearby، sharing اور attachments کھولتا ہے۔

اسٹور کی قیمتیں علاقے کے مطابق Apple / Google / Microsoft billing میں مقرر ہوتی ہیں اور خرید کے وقت ایپ میں دکھائی جاتی ہیں۔ یہ صفحہ بتاتا ہے کہ **آپ کو کیا ملتا ہے** اور **کیسے خریدیں** — USD کی فکسڈ ٹیبل نہیں (اسٹورز کرنسی اور ٹیکس localize کرتے ہیں)۔

متعلقہ: [ایپ کا استعمال](/ur/guide/app#مفت-بمقابلہ-openkey-pro) · [OpenKey Pro کی وضاحت](/ur/blog/openkey-pro) · [ڈاؤن لوڈ](/ur/guide/download) · [شرائط](/ur/terms)

## منصوبے

| منصوبہ | بلنگ | نوٹس |
|------|---------|--------|
| **مفت** | $0 | بنیادی vault + سرور sync + autofill + import (آئٹم کی حدوں کے ساتھ) |
| **ماہانہ** | سبسکرپشن | خودکار تجدید؛ اسٹور میں کسی بھی وقت منسوخ کریں |
| **سالانہ** | سبسکرپشن | خودکار تجدید؛ عام طور پر بہترین بار بار کی قیمت؛ کسی بھی وقت منسوخ کریں |
| **لائف ٹائم** | ایک بار کی ادائیگی | اس اسٹور اکاؤنٹ کے لیے مستقل Pro unlock |

درست رقمیں Android، iOS اور macOS پر **Settings → OpenKey Pro** کے تحت (اور دیگر IAP پلیٹ فارمز پر جب فہرست میں ہوں)۔

## مفت بمقابلہ Pro

| | مفت | Pro |
|--|------|-----|
| لاگ ان اندراجات | زیادہ سے زیادہ **50** | بلا حد |
| کلیکشنز (فولڈرز) | زیادہ سے زیادہ **3** | بلا حد |
| ادائیگی کارڈز | زیادہ سے زیادہ **3** | بلا حد |
| کرپٹو والٹس | زیادہ سے زیادہ **3** | بلا حد |
| ڈویلپر سیکریٹس | زیادہ سے زیادہ **3** | بلا حد |
| Self-hosted سرور sync | ہاں | ہاں |
| Autofill / passkeys (سسٹم) | ہاں | ہاں |
| براؤزر ایکسٹینشن bridge | ہاں | ہاں |
| دوسرے مینیجرز سے import | ہاں | ہاں |
| **Export** | — | ہاں |
| **Encrypted `.okbak` backup** | — | ہاں |
| **Nearby LAN vault sync** | — | ہاں |
| **Organizations اور sharing** | — | ہاں |
| **Attachments** (~20 MB ہر ایک) | — | ہاں |
| **Custom app icon** | — | ہاں |

Zero-knowledge مفت اور Pro پر ایک جیسا رہتا ہے: سرور اب بھی صرف ciphertext دیکھتا ہے۔ Pro کلائنٹ فیچرز اور حدیں کھولتا ہے — یہ OpenSelfHosting کی میزبانی والا «cloud vault» نہیں۔

## سبسکرائب کیسے کریں

1. OpenKey انسٹال کریں [ڈاؤن لوڈ چینل](/ur/guide/download) سے جو in-app purchases سپورٹ کرے (Play Store، App Store، Mac App Store جب فہرست میں ہو)۔
2. اپنا vault unlock کریں → **Settings → OpenKey Pro**۔
3. **Monthly**، **Yearly** یا **Lifetime** منتخب کریں اور اسٹور کی خریداری مکمل کریں۔
4. دوبارہ انسٹال یا اسی اسٹور اکاؤنٹ پر ڈیوائس بدلنے پر **Restore purchases** / status refresh استعمال کریں۔

### Windows اور Linux

In-app purchases **Android، iOS اور macOS** پر دستیاب ہیں۔ Windows اور Linux پر:

- موبائل یا Mac ڈیوائس پر سبسکرائب کرنے کے بعد **اسی OpenKey اکاؤنٹ** سے سائن اِن کریں جب account-linked Pro سپورٹ ہو، **یا**
- جوڑے ہوئے Nearby Pro peer سے **LAN Pro** استعمال کریں (صرف سہولت — اسٹور رسید نہیں؛ Android / iOS / macOS LAN Pro نظرانداز کرتے ہیں)

تفصیل: [Nearby → LAN Pro](/ur/guide/nearby#lan-pro-attestation) · [FAQ](/ur/guide/faq)

### Web builds

Web builds **ابھی Pro نافذ نہیں کرتے**۔ موبائل اور ڈیسک ٹاپ اسٹور builds کرتے ہیں۔

## منظم یا منسوخ کریں

- **Apple:** Settings → Apple ID → Subscriptions (یا App Store subscriptions)
- **Google Play:** Play Store → Payments & subscriptions
- **Microsoft:** account.microsoft.com / Store subscriptions جب لاگو ہو

Refunds اسٹور کی پالیسیوں کے مطابق۔ دیکھیں [سروس کی شرائط](/ur/terms)۔

## FAQ

### کیا مفت tier بغیر ادائیگی کے قابلِ استعمال ہے؟

ہاں — vault، autofill، import اور self-hosted sync اوپر کی حدوں میں کام کرتے ہیں۔

### کیا self-hosted سرور کے لیے Pro چاہیے؟

نہیں۔ سرور sync مفت پر دستیاب ہے۔ Pro export، backups، Nearby، orgs/sharing، attachments اور زیادہ حدیں شامل کرتا ہے۔

### کیا قیمتیں بدلیں گی؟

اسٹورز علاقائی قیمتیں بدل سکتے ہیں۔ In-app paywall ہمیشہ آپ کے اکاؤنٹ اور علاقے کے لیے موجودہ پیشکش دکھاتا ہے۔

### Privacy policy کہاں ہے؟

[Privacy Policy](/ur/privacy) · [شرائط](/ur/terms)

## شروع کریں

- [OpenKey ڈاؤن لوڈ کریں](/ur/guide/download)
- [فوری آغاز](/ur/guide/quick-start)
- [بغیر سرور Nearby](/ur/blog/nearby-without-a-server) (Pro)
