---
title: پاس ورڈ مینیجر میں دو عاملی تصدیق (2FA)
description: 2FA اور TOTP codes کیا ہیں، authenticator seeds کو اُن logins کے ساتھ کیسے رکھیں جن کی حفاظت کرتے ہیں، اور passkeys صورتِ حال کو کیسے بدل دیتے ہیں۔
date: 2026-09-17
cover: /blog/covers/two-factor-authentication.png
---

# پاس ورڈ مینیجر میں دو عاملی تصدیق (2FA)

**دو عاملی تصدیق (2FA)** کا مطلب ہے کہ آپ اپنی شناخت صرف اپنے پاس ورڈ سے نہیں، بلکہ دوسرے ثبوت سے ثابت کریں۔ سب سے عام صورت authenticator ایپ کا بدلتا ہوا چھ ہندسہ code ہے — **TOTP** — جو مشترکہ seed اور وقت کی بنیاد پر بننے والے ایک بار کے پاس ورڈ پر قائم ہے۔

مشکل یہ ہے کہ seed اور code آپ کے پاس ورڈ سے ایک *دوسری ایپ* میں رہتے ہیں۔ یہ مضمون طریقۂ کار بتاتا ہے، یہ کہ seeds کو پاس ورڈ مینیجر میں رکھنا کیوں عقلِ درست ترتیب ہے، اور یہ کہ passkeys اسے کیسے بدل دیتے ہیں۔

## 2FA کیسے کام کرتا ہے

1. جب آپ کسی سائٹ پر 2FA شروع کرتے ہیں تو وہ آپ کو ایک **secret** دکھاتی ہے — عموماً ایک QR code کے شکل میں جس میں ایک `otpauth://` URI ہوتا ہے۔
2. آپ وہ secret scan یا paste کر کے authenticator میں ڈالتے ہیں۔
3. ہر 30 سیکنڈ میں authenticator، secret اور موجودہ وقت سے چھ ہندسہ code بناتا ہے: `HMAC(secret, floor(time/30))`۔
4. سائٹ وہی قدر حساب کرتی ہے۔ اگر دونوں مل جائیں تو آپ اندر ہیں۔

ایک منٹ بعد code بے کار ہو جاتا ہے، اور یہی وجہ ہے کہ یہ کام کرتا ہے۔ لیکن *secret* عملاً ایک مستقل پاس ورڈ ہے — جس کے پاس یہ ہے وہ ہمیشہ کے لیے مؤددہ codes بنا سکتا ہے۔

## فیصلہ: authenticator ایپ، SMS، یا passkey

| طریقہ | Phishable ہے؟ | سرور کی breach کا اثر | نوٹس |
|--------|-----------|----------------------|-------|
| SMS code | ہاں | نہیں | SIM swap اور نمبر کی دوبارہ بٹوی سے متاثر؛ پھر بھی کچھ نہ کرنے سے بہتر |
| TOTP ایپ / code | ہاں (seed کی چوری) | نہیں | آف لائن کام کرتا ہے؛ secret کی حفاظت لازمی ہے |
| Hardware key (FIDO2) | نہیں | نہیں | سب سے مضبوط؛ backup کے لیے دوسری ڈیوائس یا کی درکار |
| Passkey | نہیں | نہیں | ٹائپ کرنے کو کچھ نہیں، چرانے کو کچھ نہیں؛ نیچے دیکھیں |

Hardware keys اور passkeys ہی وہ اختیارات ہیں جو phishable نہیں ہیں، کیونکہ credential کبھی آپ کی ڈیوائس سے باہر نہیں جاتا اور signing درخواست کرنے والے origin سے منسلک ہوتی ہے۔

## TOTP seeds کیوں آپ کے vault میں ہونے چاہئیں

عام مشورہ یہ ہے کہ "اپنی authenticator ایپ کو اپنے پاس ورڈ مینیجر سے الگ رکھیں"، اس قابلِ قبول سوچ پر کہ ایک compromise شدہ ایپ سب کچھ unlock نہ کرے۔ عملی طور پر اس سے بُر مسئلہ پیدا ہوتا ہے: پاس ورڈ اور اس کا دوسرا factor الگ الگ جگہ محفوظ ہو جاتے ہیں، اس لیے ایک کی recovery دوسرے کے بغیر ناممکن ہو جاتی ہے، اور لوگ بار بار 2FA دوبارہ enrol کرنے لگتے ہیں۔

بہتر فریم یہ ہے: TOTP seed کو **credential کا حصہ** سمجھیں، اور اسے اُنہی controls سے محفوظ کریں۔ اگر آپ کا vault ماسٹر پاس ورڈ کے پیچھے، اور Ideally کسی biometric کے پیچھے unlock ہوتا ہے، تو seed اُس پاس ورڈ سے کمزور نہیں جتنا وہ خود محفوظ کرتا ہے — اور ہمیشہ وہیں ہوگا جہاں آپ کو اس کی ضرورت ہو۔

زیادہ تر مینیجرز یہ براہِ راست سپورٹ کرتے ہیں: secret paste کریں، `otpauth://` URI paste کریں، یا QR code براہِ راست entry میں scan کریں۔

OpenKey میں، login entry پر authenticator secret یا `otpauth` URI شامل کریں، یا سائٹ کے 2FA سیٹ اپ screen سے QR scan کریں۔ Codes تب ظاہر ہوتے ہیں جب vault unlocked ہو، اور system Autofill provider یا براؤزر ایکسٹینشن انہیں وہاں fill کر سکتی ہے جہاں platform سپورٹ کرتا ہے۔ ٹرمینل سے، CLI انہیں براہِ راست پڑھ سکتا ہے:

```bash
openkey totp "GitHub" -c     # copy the live code
openkey totp "GitHub" -w     # watch it refresh until you stop it
```

## کسی account پر 2FA سیٹ اپ کرنا

1. Login کر کے سائٹ کی security settings کھولیں۔
2. authenticator ایپ چنیں، اور **QR code scan کریں** یا secret دستی درج کریں۔
3. اُسی vault entry میں اُس secret کی نقل محفوظ کریں جہاں username اور پاس ورڈ ہیں۔
4. تصدیق کے لیے موجودہ code درج کریں۔
5. سائٹ کے **recovery codes** کسی ایسی جگہ محفوظ کریں جو آپ کے اختیار میں ہو — اُسی vault میں ایک خفیہ شدہ note، یا ایک printed copy جو آف لائن رکھی ہو۔

مرحلہ 3 وہ ہے جو لوگ چھوڑ دیتے ہیں، اور یہی وہ مرحلہ ہے جو بعد میں فون بدلنے پر آپ کو بچاتا ہے۔

## پورے account پر اسے لازمی بنانا

چند logins میں 2FA آن ہونے کے بعد اُسے ڈیفالٹ سمجھیں:

- **ہر سائٹ کے لیے الگ recovery method** رکھیں، کیونکہ ہر سائٹ اسے مختلف طریقے سے سنبھالتی ہے۔
- جہاں سائٹ اجازت دے وہاں **دو authenticators** پسند کریں: فون اور desktop، دونوں vault سے بھرے ہوئے۔ اگر ایک ڈیوائی کھو دیں تو دوسری ابھی بھی کام کرے گی۔
- **پہلے email پر 2FA شروع کریں۔** یہی وہ account ہے جو ہر دوسرے account کو reset کرتا ہے۔
- hardware-key یا passkey کا اختیار چیک کریں، اور اسے TOTP کے ساتھ شامل کریں، اُس کی جگہ نہیں، یہاں تک کہ آپ کو یقین ہو جائے کہ آپ recovery کر سکتے ہیں۔

## 2FA کہاں خراب ہوتا ہے

**بغیر backup کے فون ضائع ہو گیا۔** دوسرے authenticator، recovery code یا hardware key کے بغیر account ختم۔ یہ 2FA کی ناکامی کا سب سے عام واحد سبب ہے، اور اسی لیے recovery codes اہم ہیں۔

**Seed کسی screenshot میں۔** QR کی تصویر کھینچنا ایک plaintext credential ہے۔ seed اپنے vault میں محفوظ کریں اور تصویر حذف کریں۔

**Seed کسی sync شدہ notes فائل میں۔** کلاؤڈ notes plaintext میں sync ہوتے ہیں۔ اگر آپ recovery material کے لیے notes استعمال کرتے ہیں تو وہ خفیہ شدہ vault کے اندر ہونا چاہیے۔

**غلط ایپ سے ٹائپ کیے گئے بدلتے codes۔** کچھ authenticators میں accounts کی ترتیب بدلی جا سکتی ہے، جس کے نتیجے میں codes غلط سائٹ کے خلاف درج کیے جاتے ہیں۔ یہ سیکیورٹی کا مسئلہ نہیں — معاونت کا مسئلہ ہے۔

**ایسا سمجھنا کہ 2FA دوبارہ استعمال محفوظ بنا دیتا ہے۔** ایسا نہیں۔ اگر آپ دو سائٹس پر ایک ہی پاس ورڈ دوبارہ استعمال کرتے ہیں اور صرف ایک پر 2FA ہے تو دوسری اب بھی ایک breach ہوئی تو دور ہے۔

## Passkeys 2FA کو کیسے بدلتے ہیں

ایک passkey دوسرے factor کو مضبوط کرنے کے بجائے ہٹا دیتا ہے۔ private key ڈیوائس کے محفوظ hardware کی حفاظت میں ہوتی ہے اور صرف biometric یا PIN check کے بعد ہی قابلِ استعمال ہوتی ہے، اس لیے "جو آپ جانیں" اور "جو آپ ہیں" ایک ہی hardware-backed عمل میں مدںم جاتے ہیں۔ چوری کرنے کا کوئی code نہیں، leak ہونے کا کوئی seed نہیں، اور swap کرنے کا کوئی SIM نہیں۔

یہی وجہ ہے کہ passkeys اُن سمت ہیں جس سمت industry منتقل ہوئی: یہ وہ نایاب credential ہے جو زیادہ محفوظ *بھی* ہے اور کم محنت *بھی۔ passkeys براہِ راست رکھنے کا باقی واحد سبب coverage ہے — passkeys ابھی ہر سائٹ پر دستیاب نہیں، اس لیے اُن سائٹس کے لیے جہاں صورتِ حال نہیں بہتر ہوئی، آپ کے vault میں ایک TOTP seed ایک قابلِ قبول پل ہے۔

[Passkeys کیسے کام کرتے ہیں](/ur/blog/what-are-passkeys) · [OpenKey انہیں کیسے سنبھالتا ہے](/ur/blog/passkeys-and-autofill)

## سرچ ڈیٹا کیا کہتا ہے

2FA ویب کے سب سے بڑے سیکیورٹی متعلقہ query terms میں سے ایک ہے۔ head term کی سطح پر "2fa" "password manager" کی تقریباً **67%** دلچسپی کھینچتا ہے — جو "passkey" کے 42% اور "password generator" کے 36% سے زیادہ ہے۔

وہ باریکیاں جو لوگ "two-factor authentication" میں شامل کرتے ہیں (Google Trends، دنیا بھر، گزشتہ 12 ماہ):

| متعلقہ query | نسبتی دلچسپی |
|---------------|-------------------|
| what is two-factor authentication | 100 |
| two-factor authentication app | 14 |
| two-factor authentication code | 12 |
| two-factor authentication google | 8 |
| enable two-factor authentication | 7 |
| two-factor authentication iphone | 5 |
| two-factor authentication examples | 2 |

"what is two-factor authentication" اس cluster کا سب سے تیزی سے بڑھنے والا term بھی ہے، سال بہ سال تقریباً 550% کا اضافہ۔ تعریفی query کا سب سے تیزی سے بڑھنا واضح اشارہ ہے کہ سامعی نیا ہے — اسی لیے یہ مضمون سفارش کے بجائے طریقۂ کار سے شروع ہوتا ہے۔

طریقہ: Google Trends، دنیا بھر، گزشتہ 12 ماہ، ستمبر 2026 میں نکالا گیا۔ قدریں نسبتی دلچسپی (0–100) کے طور پر normalize شدہ ہیں، سرچ volumes نہیں۔

## ایک منٹ کا خلاصہ

TOTP codes ایک مستقل secret سے بنتے ہیں جو سائٹ کے ساتھ مشترکہ ہوتا ہے، اس لیے وہ secret عملاً ایک پاس ورڈ ہے اور اُسی حفاظت کا مستحق ہے۔ اسے اُسی خفیہ شدہ vault entry میں رکھیں جہاں username اور پاس ورڈ ہیں، دوسرا authenticator رکھیں، سائٹ کے recovery codes آف لائن محفوظ کریں، پہلے اپنے email account پر 2FA شروع کریں، اور جہاں passkey دی جائے وہاں شامل کریں۔

## اگلے مراحل

- [Passkeys کیا ہیں؟](/ur/blog/what-are-passkeys) — وہ credential جو codes کی جگہ لیتا ہے
- [Autofill پاس ورڈز](/ur/blog/autofill-passwords) — logins اور codes ساتھ بھرنا
- [ایپ کا استعمال](/ur/guide/app) — entry پر TOTP شامل کرنا
- [CLI گائیڈ](/ur/guide/cli#secrets-اور-logins-میں-search) — ٹرمینل سے codes پڑھنا
