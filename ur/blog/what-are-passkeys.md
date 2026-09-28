---
title: Passkeys کیا ہیں؟
description: Passkeys کا آسان زبان میں رہنمائی — WebAuthn کیسے کام کرتا ہے، وہ phishing کے لیے کیوں ناقابلِ ہیں، ایک passkey کیسے بنائیں اور استعمال کریں، اور آپ کے پاس ورڈ مینیجر کا کیا ہوگا۔
date: 2026-09-16
cover: /blog/covers/what-are-passkeys.png
---

# Passkeys کیا ہیں؟

ایک **passkey** ایک login credential ہے جو characters کی سٹرنگ کے بجائے ایک cryptographic key pair سے بنتا ہے۔ اس کا نجی حصہ آپ کی ڈیوائس پر خفیہ شدہ رہتا ہے، اُسی unlock کے پیچھے (biometric، screen lock، یا ماسٹر پاس ورڈ) جو آپ پہلے سے استعمال کرتے ہیں۔ سائٹ صرف عوامی حصہ ذخیرہ کرتی ہے، جو آپ کے طور پر sign in کرنے کے لیے بے کار ہے۔

عملی نتیجہ: ٹائپ کرنے کا کوئی پاس ورڈ نہیں، phishing کے لیے کچھ نہیں، breached سائٹ کے پاس attacker کو دینے کو کچھ نہیں، اور کسی کے لیے social-engineer کرنے والی کوئی reset flow بھی نہیں۔

## پاس ورڈز کا کیا مسئلہ ہے

آپ نے زندگی بھر میں جو بھی login کیا ہے وہ ایک shared secret ہے۔ آپ اور سائٹ وہی سٹرنگ ذخیرہ کرتے ہیں، جس سے تین ناکامی کے طریقے پیدا ہوتے ہیں:

- **Phishing۔** login page کی پڑھنے کے قابل نقلِ کاپی وہ سٹرنگ نکال لیتی ہے، کیونکہ وہ سٹرنگ اصل سائٹ اور جعلی دونوں پر کام کرتی ہے۔
- **Credential stuffing۔** کسی ایک سائٹ سے لیک ہوئی سٹرنگ اُس ہر account کے خلاف دوبارہ چلا دی جاتی ہے جو اسے دوبارہ استعمال کرتا ہے۔
- **سرور کی breach۔** جو سائٹس پڑھنے کے قابل پاس ورڈ ذخیرہ کرتی ہیں وہ breach ہونے کے فوراً بعد کام کرتے attacker کے ہاتھوں میں credentials پہنچا دیتی ہیں۔

Passkeys یہ shared secret ہٹا دیتے ہیں۔ سائٹ کبھی ایسا کچھ نہیں دیکھتی جو دوبارہ استعمال کیا جا سکے۔

## Passkey کیسے کام کرتا ہے

رجسٹریشن، جب آپ پہلی بار login کرتے ہیں:

1. آپ کی ڈیوائس ایک **key pair** بناتی ہے — ایک private key اور ایک public key۔
2. public key سائٹ کو بھیجی جاتی ہے اور اس کے user database میں ذخیرہ ہوتی ہے۔
3. private key آپ کی ڈیوائس پر خفیہ شدہ رہتا ہے، اور صرف unlock کرنے کے بعد ہی قابلِ استعمال ہوتا ہے۔

Sign in، اس کے بعد ہر بار:

1. سائٹ ایک **challenge** جاری کرتی ہے۔
2. آپ کی ڈیوائیس اسے private key سے sign کرتی ہے۔
3. سائٹ اپنے ذخیرہ کردہ public key کے خلاف signature کی تصدیق کرتی ہے۔

دونوں مراحل پر کوئی shared secret نہیں ہوتا۔ جعلی سائٹ استعمال نہیں ہو سکتی، کیونکہ challenge اصل سائٹ سے آتا ہے اور آپ کی ڈیوائیس صرف اُسی origin کے لیے sign کرے گی جس کے لیے رجسٹر ہوئی تھی۔ یہی anti-phishing خصوصیت ہے، اور یہ کاربر کی نگرانی سے نہیں بلکہ protocol سے آتی ہے۔

اس کے اندر یہ **WebAuthn** ہے (اب اسہ passkeys کہتے ہیں)، اور credential عموماً ایک **FIDO2** ہارڈ ویئر authenticator پر ہوتا ہے — آپ کی ڈیوائس کا secure element، ایک platform authenticator، یا ایک USB/NFC سیکیورٹی کی۔

## Passkey بنانا

یہ flow تقریباً ہر جگہ ایک جیسا ہے، اور credential آپ کا پاس ورڈ مینیجر فراہم کرتا ہے:

1. سائٹ کے sign-in page پر **Sign in with a passkey** چنیں (اگر ابھی account نہیں ہے تو **Create a passkey**)۔
2. آپ کا provider ایک تصدیقی dialog دکھاتا ہے جس میں سائٹ اور account کا نام آتا ہے۔
3. Face ID، Touch ID، fingerprint، یا اپنے ڈیوائس PIN سے تصدیق کریں۔
4. ہو گیا۔ passkey آپ کے vault میں ذخیرہ ہو جاتا ہے اور اُسی سائٹ سے منسلک ہو جاتا ہے۔

اگر dialog میں "Use browser" یا "Use this device instead" کا اختیار آتا ہے تو اسے لینا credential آپ کے manager کے بجائے platform authenticator کو دے دیتا ہے — کسی ایک بار کے لیے مفید، مگر اس کا مطلب یہ ہے کہ passkey اب آپ کے vault میں نہیں رہا۔

## روزمرہ passkey کا استعمال

Login کے طریقے میں کچھ نہیں بدلتا، صرف یہ بدلتا ہے کہ نیچے کیا ہوتا ہے:

1. username فیلڈ پر focus کریں اور **Sign in with a passkey** پر کلک کریں۔
2. prompt کی تصدیق کریں۔
3. سائٹ signature کی تصدیق کرتی ہے۔ آپ اندر ہیں۔

کوئی ٹائپنگ نہیں، کوئی paste buffer نہیں، کوئی دوسرا factor prompt نہیں — unlock *ہی* دوسرا factor ہے۔ چونکہ آپ کی ڈیوائیس تصدیقی dialog میں درخواست کرنے والی سائٹ دکھاتی ہے، اس لیے attacker اسے خاموشی سے کسی اور جگہ نہیں بھیج سکتا۔

## Passkeys ہٹانا اور منتقل کرنا

- **ہٹانا:** سائٹ کی account security settings کھولیں اور passkey وہیں حذف کریں، یا اپنے provider سے ہٹا دیں۔ ایک جگہ سے حذف کرنے پر دوسری نقل محفوظ رہتی ہے، اس لیے اگر اسے چھوڑنا ہے تو دونوں جگہ سے ہٹا دیں۔
- **منتقل کرنا:** کسی platform account (iCloud Keychain، Google Password Manager) کے ذریعے sync ہونے والا passkey اُسی account کے ساتھ منتقل ہوتا ہے۔ self-hosted vault میں ذخیرہ passkey اس وقت منتقل ہوتا ہے جب آپ sync کریں، یا کسی نئے manager میں import کریں۔

اگر آپ ہر اُن ڈیوائسز کو کھو دیں جو passkey رکھتی ہیں *اور* آپ کے پاس کوئی recovery راستہ نہ ہو تو account بازیاب نہیں ہو سکتا۔ کم از کم ایک passkey کسی دوسری ڈیوائس یا سیکیورٹی کی پر رجسٹر کر کے رکھیں۔

## Passkeys اور پاس ورڈ مینیجر

Passkeys آپ کے پاس ورڈ مینیجر کی جگہ نہیں لیتے — یہ اسے سب سے کمزور کام سے سب سے مضبوط کام پر منتقل کر دیتے ہیں۔

| کام | پہلے | بعد میں |
|-----|--------|-------|
| پاس ورڈ یاد رکھنا | آپ کے ذہن میں ایک سٹرنگ، دوبارہ استعمال شدہ | آپ کے vault میں ایک key pair |
| Phishing سے مزاحمت | دستی domain جانچ | Cryptographic، شامل |
| دوسرا factor | ایک بدلتا ہوا code | خود ڈیوائس unlock |
| Breach کا اثر | سائٹ کے database میں پڑھنے کے قابل credentials | ایک public key، attacker کے لیے بے کار |

مینیجر اب بھی passkey کی private key ذخیرہ کرتا ہے، اب بھی رسائی آپ کے vault unlock پر رکھتا ہے، اور اب بھی sync کرتا ہے۔ جو بدلتا ہے وہ یہ ہے کہ ذخیرہ شدہ secret اب یاد رکھنے کے قابل سٹرنگ نہیں رہا — اور پاس ورڈز کے دوبارہ استعمال ہونے کی پوری وجہ بھی اسی طرح ختم ہو گئی۔

OpenKey میں ایکسٹینشن WebAuthn کے `create` اور `get` calls روکتی ہے، ES256 credentials ذخیرہ کرتی ہے، اور آپ کی مرضی ہو تو platform authenticator پر واپس جاتی ہے۔ system-level provider کا راستہ اُن ایپس اور براؤزرز کو سنبھالتا ہے جو OS credential UI سے بات کرتے ہیں۔ دونوں unlock کے بعد، کلائنٹ پر چلتے ہیں۔ [OpenKey میں یہ کیسے کام کرتا ہے](/ur/blog/passkeys-and-autofill)۔

## کیا passkeys ابھی ہر جگہ کام کرتے ہیں؟

تقریباً ہر جگہ، مگر چند پائیدار کمیاں: کچھ enterprise single-sign-on setups، کچھ پرانی موبائل ایپس کے WebViews، اور چند سائٹس نے WebAuthn تو implement کیا مگر passkey sync نہیں۔ عملی راستہ یہ ہے کہ جب تک کوئی سائٹ دونوں دے، اپنے manager میں پاس ورڈز کو fallback کے طور پر رکھیں — اور جب passkey دستیاب ہو تو اُسی پر ترجیح دیں۔

## سرچ ڈیٹا کیا کہتا ہے

Passkey کی دلچسپی بڑی ہے اور ابھی بڑھ رہی ہے، اور queries تقریباً طور پر beginner سوال ہیں۔ Google Trends (دنیا بھر، گزشتہ 12 ماہ) کے مطابق "passkey" کی باریکیاں:

| متعلقہ query | نسبتی دلچسپی |
|---------------|-------------------|
| what is passkey | 100 |
| what is a passkey | 93 |
| google passkey | 50 |
| passkey microsoft | 28 |
| passkey login | 22 |
| create passkey | 20 |
| passkey app | 19 |
| passkey iphone | 19 |
| windows passkey | 18 |
| passkeys | 17 |
| how to use passkey | 8 |
| how to remove passkey | 6 |

"what is a passkey" اور "what is passkey" اس cluster کی دو سب سے مضبوط queries ہیں، اور "what is a passkey" سال بہ سال تقریباً 450% بڑھ رہی ہے۔ یہ ایسی ٹیکنالوجی کی شکل ہے جو enthusiasts سے عام سامعی کی طرف جا رہی ہے: ابھی تقریباً کوئی passkey *management* نہیں تلاش کر رہا، اور اکثر لوگ تعریف تلاش کر رہے ہیں۔

head term کی سطح پر "passkey" "password manager" کی تقریباً 42% سرچ دلچسپی کھینچتا ہے، اور "2fa" تقریباً 67% — دونوں کئی، اور دونوں ایک ہی کام پر آ رہے ہیں۔

طریقہ: Google Trends، دنیا بھر، گزشتہ 12 ماہ، ستمبر 2026 میں نکالا گیا۔ قدریں نسبتی دلچسپی (0–100) کے طور پر normalize شدہ ہیں، سرچ volumes نہیں۔

## ایک منٹ کا خلاصہ

ایک passkey ایک key pair ہے جس کا نجی حصہ خفیہ شدہ آپ کی ڈیوائس پر رہتا ہے اور سائٹ صرف عوامی حصہ ذخیرہ کرتی ہے۔ چونکہ کوئی shared secret نہیں ہے، جعلی سائٹ کوئی بھی دوبارہ استعمال کہ قابل چیز جمع نہیں کر سکتی، اور آپ کا ڈیوائس unlock دوسرا factor بن جاتا ہے۔ کسی سائٹ کے sign-in page سے ایک بنائیں، اسے Face ID یا اپنے ڈیوائس PIN سے منظور کریں، اور اگلی بار ایک ٹیپ اور ایک signature سے login کریں۔

## اگلے مراحل

- [براؤزر میں passkeys اور autofill](/ur/blog/passkeys-and-autofill) — OpenKey کا implementation
- [پاس ورڈ مینیجر کیا ہے؟](/ur/blog/what-is-a-password-manager) — passkeys کہاں رہتے ہیں
- [براؤزر ایکسٹینشن](/ur/guide/extension) — WebAuthn سیٹ اپ اور fallback رویہ
- [دو عاملی تصدیق](/ur/blog/two-factor-authentication) — passkeys کیا بدلتے ہیں
