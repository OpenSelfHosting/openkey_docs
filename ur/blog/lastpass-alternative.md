---
title: "LastPass کا متبادل: کیسے منتقل ہوں اور کیا دیکھیں"
description: LastPass سے نکلنا — کیا export کریں، دوسرے مینیجر میں کیسے import کریں، اور متبادل چننے سے پہلے چار ضروریات جو جانچنی ہیں۔
date: 2026-09-19
cover: /blog/covers/lastpass-alternative.png
---

# LastPass کا متبادل: کیسے منتقل ہوں اور کیا دیکھیں

LastPass دنیا کے زیادہ تر حصے میں پاس ورڈ مینیجر کا سب سے مشہور نام ہے، جو اس لیے "lastpass alternative" اس category کی سب سے زیادہ سرچ کی جانے والی مقابلوں میں ایک ہے۔ لوگ تین مختلف وجوہات سے یہاں آتے ہیں، اور انہیں تین مختلف چیزیں درکار ہوتی ہیں:

1. **بھروسہ** — آپ "میرے پاس ورڈ کون پڑھ سکتا ہے" کا ایک مختلف جواب چاہتے ہیں۔
2. **لاگت یا حدود** — free tier یا family plan اب آپ کے لیے مناسب نہیں رہا۔
3. **Features** — آپ passkeys، self-hosting، یا developer secrets چاہتے ہیں۔

یہ مضمون پورش کرتا ہے کہ migration کے دوران اصل میں کیا بدلتا ہے، commit کرنے سے پہلے کیا تصدیق کرنا ہے، اور تبدیلی ایسے کیسے کریں کہ ایسا کوئی وقفہ نہ ہو جب آپ کسی چیز میں login ہی نہ کر سکیں۔

## اس migration کو کیا منفرد بناتا ہے

LastPass بہت عرصے سے خبروں میں رہا ہے، اور migration کے عملی نتائج dramatic نہیں بلکہ عملی ہیں:

- **Export ایک CSV ہے۔** Plaintext، غیر خفیہ شدہ، ہر پاس ورڈ صاف صاف۔ جو بھی وہ فائل حاصل کر لے، اس کے پاس آپ کا vault ہے۔
- **پاس ورڈ سے محفوظ export دستیاب ہو سکتا ہے۔** اگر آپ کا plan یہ فراہم کرتا ہے تو یہ طے شدہ CSV سے کہیں زیادہ محفوظ ہے۔ اسے استعمال کریں۔
- **Export میں attachments کی سہولت محدود ہے۔** entries سے منسلک فائلیں عموماً CSV میں نہیں آتیں۔
- **طویل عرصے سے استعمال کنندگان کے لیے vault بڑا ہوتا ہے۔** دس سال پرانا account کئی فولڈرز میں سیکڑوں entries رکھ سکتا ہے۔ ایک دوپہر کا وقت رکھیں۔

اس migration کے بارے میں سب سے اہم بات یہ ہے کہ یہ **ایک طرفہ export ہے جس کے بعد ایک بار کی import آتی ہے**۔ اسے احتیاط سے کریں، تصدیق کریں، اور تب ہی پرانے account کو حذف کریں۔

## متبادل کے لیے چار ضروریات

### 1. یہ zero-knowledge ہونا چاہیے، قابلِ ثبوت

جانچیں کہ decryption key کس کے پاس ہے۔ اگر کوئی support agent آپ کا ماسٹر پاس ورڈ reset کر سکتا ہے یا آپ کا vault unlock کر سکتا ہے تو آپ اُن کی infrastructure کو اپنے plaintext پر بھروسہ دے رہے ہیں، مارکیٹنگ جو کہے۔ اچھا متبادل آپ کو vault بنانے سے *پہلے* بتا دیتا ہے کہ بھولا ہوا ماسٹر پاس ورڈ کسی کے ذریعے — ان کے سمیت — بازیاب نہیں ہو سکتا۔

### 2. یہ آپ کی LastPass CSV import کرنا چاہیے

تصدیق کریں کہ importer خاص طور پر LastPass CSV کو سپورٹ کرتا ہے، اور فولڈر کی structure collections پر map ہوتی ہے۔ اگر tool اجازت دے تو پہلے جزوی export سے آزمائیں۔

### 3. یہ آپ کا راستۂ خروج paywall نہیں کرنا چاہیے

یہ وہ asymmetry ہے جس پر نظر رکھنی ہے: **import مفت، export ادا شدہ**۔ جو مینیجرز آپ کو اندر آنے دیتے ہیں مگر باہر جانے کے لیے پیسے لیتے ہیں، اُنہوں خاموشی سے آپ کا ڈیٹا ٹھہرنے کا بہانہ بنا دیا ہے۔ migration سے پہلے export tier چیک کریں، بعد میں نہیں۔

### 4. یہ آپ کی ڈیوائسز پر autofill ٹھیک سے کرنا چاہیے

پہلے ہفتے میں آپ سب سے زیادہ autofill کا فرق محسوس کریں گے۔ پرانے account کو حذف کرنے سے پہلے اسے اپنی تین سب سے زیادہ استعمال ہونے والی سائٹس پر آزمائیں۔

## مرحلہ وار migration

### 1. LastPass سے export کریں

1. Log in کریں، **Settings → Advanced Export** کھولیں، اور **LastPass CSV** چنیں (یا اگر آپ کے plan میں پاس ورڈ سے محفوظ export ہے تو وہ)۔
2. اسے ایسی جگہ محفوظ کریں جو آپ کے اختیار میں ہو، کسی shared cloud folder میں نہیں۔
3. اسے email نہ کریں، اور Downloads میں چھوڑ کر نہ جائیں۔

### 2. نئے مینیجر میں import کریں

OpenKey میں: **Settings → Data → Import & export → Import → LastPass CSV**، فائل چنیں، اور تصدیق کریں۔ سب کچھ مقامی طور پر ہوتا ہے — کوئی server round-trip نہیں، اور آپ کا plaintext کبھی sync server کو نہیں چھوتا۔

فولڈر سے collection کی mapping کا، اور بہت پرانے vault میں کچھ entries فولڈر کے بغیر آنے کا انتظار رکھیں۔ فرض نہ کریں، بعد میں دیکھیں۔

### 3. پاس ورڈز تبدیل کرنے سے *پہلے* autofill چالو کریں

یہ ترتیب اہم ہے۔ autofill کام کر رہا ہو تو اس نقطے سے آپ جو بھی login کریں گے خودکار محفوظ ہو جائے گا، اس لیے vault کام کرتے ہوئے خود بخود ترتیب دیتا رہے گا۔

- [Autofill پاس ورڈز](/ur/blog/autofill-passwords) — سیٹ اپ گائیڈ
- [Autofill کام نہیں کر رہا](/ur/blog/autofill-not-working) — جب وہ ہم آہنگ نہ ہو

### 4. سب سے قیمتی accounts پہلے درست کریں

400 پاس ورڈز تبدیل کرنے کی کوشش نہ کریں۔ email، banking اور cloud پہلے تبدیل کریں، ہر ایک کو کام کرتے ہوئے بناتے ہوئے:

```bash
openkey gen -l 24
```

ایک ہی وقت میں 2FA بھی شامل کریں ([گائیڈ](/ur/blog/two-factor-authentication))، اور جہاں سائٹ پیش کرے وہاں passkey بھی شامل کریں ([passkeys کیا ہیں؟](/ur/blog/what-are-passkeys))۔

### 5. تصدیق کریں، پھر export کو ختم کریں

- اہم logins کا spot-check کریں، TOTP entries بھی اگر آپ نے استعمال کی ہوں۔
- اپنے main browser اور phone پر autofill کی تصدیق کریں۔
- تصدیق کریں کہ آپ دوسری ڈیوائس پر sign in کر سکتے ہیں۔
- **CSV کو محفوظ طریقے سے حذف کریں۔** یہ ٹھیک سے کریں؛ SSD پر حذف کی گئی فائل ممکن ہے بازیاب ہو جائے۔ فائل کو overwrite کرنا اور trash خالی کرنا کم از کم قابلِ قبول حد ہے۔
- ان چیزوں کو تبدیل کریں جو لمبے عرصے سے اُس plaintext فائل میں رہی ہیں۔

### 6. منسوخ کرنے سے پہلے backup رکھیں

پہلے ایک خفیہ شدہ مقامی backup لیں — OpenKey میں ایک `.okbak`، یا آپ کے مینیجر کا اس کا متبادل۔ پھر پرانے account کو حذف کریں۔ منسوخی آخری قدم ہونی چاہیے، دوسرا نہیں۔

## لوگ عموماً کس چیز پر منتقل ہوتے ہیں

| اگر آپ… | دیکھیں |
|-------------|---------|
| کوئی سرور نہیں، کوئی vendor نہیں، صرف مقامی فائل | KeePass جیسا file-based مینیجر — بہت اچھا، مگر backups آپ کے ذمے ہیں |
| اپنا sync سرور، کھلا کوڈ | ایک self-hostable مینیجر — [OpenKey](/ur/blog/self-hosted-password-manager) ایک ہے |
| vendor کی polished ایپ اور اصلی free tier | mainstream مینیجرز میں سے کوئی بھی، [یہاں دیے معیار](/ur/blog/best-password-managers) کے مطابق جج کر دیکھیں |
| بالکل کوئی migration نہیں — بس دوسرا مینیجر شامل کرنا ہے | دونوں ایک مہینے چلائیں؛ پرانے account کو read-only رکھیں جب تک آپ کو اعتماد نہ ہو |

دو مینیجرز کا ساتھ چلنا سب سے کم خطرے والا اختیار ہے اور اس کی لاگت صفر ہے۔ پرانے میں autofill بند کر دیں، اسے installed رکھیں، اور ایک ہفتے کے بغیر کسی رکاوٹ کے logins کے بعد ہی account حذف کریں۔

## سرچ ڈیٹا کیا کہتا ہے

Google Trends (دنیا بھر، گزشتہ 12 ماہ) دکھاتا ہے کہ LastPass کے متبادل ایک حقیقی اور بڑھتا ہوا cluster ہیں، اور یہ کہ 1Password کے متبادل LastPass والے متبادلوں سے زیادہ سرچ دلچسپی کھینچتے ہیں۔ متبادل queries کا آپس میں مقابلہ:

| Query | cluster میں نسبتی دلچسپی |
|-------|-------------------------------|
| 1password alternative | 100 |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

تقریباً چار گنا دلچسپی پر بیٹھا "1password alternative" اس پر غور کرنے کے قابل ہے: اس کا مطلب ہے کہ اس category کی سب سے بڑی migration wave LastPass سے دور جانے والی نہیں، بلکہ 1Password کی pricing اور family-plan کی structure سے ہے۔ "1password pricing" کی سرچیں Bitwarden سے متعلق تیزی سے بڑھنے والی queries میں بھی شمار ہوتی ہیں، سال بہ سال تقریباً 200% کا اضافہ۔

head term اب بھی غائب طور پر brand سے anchored ہے۔ "password manager" کی refinements میں Bitwarden اور 1Password دونوں LastPass سے زیادہ brand search لیتے ہیں، جبکہ LastPass *تعریفی* اور recovery والی queries میں کہیں زیادہ نظر آتا ہے — سب سے نمایاں طور پر "lastpass forgot master password"، جو "forgot master password" کے تحت آنے والی ایک متعلقہ query ہے۔

یہ تقسیم ہی مفید insight ہے: LastPass اس وقت سرچ کیا جاتا ہے جب کچھ غلط ہو گیا ہو، اور 1Password اس وقت جب کچھ مہنگا ہو گیا ہو۔ مختلف مسائل، مختلف حل — اور ان میں سے ایک مسئلہ ہی سیکیورٹی کا نہیں ہے۔

طریقہ: Google Trends، دنیا بھر، گزشتہ 12 ماہ، ستمبر 2026 میں نکالا گیا۔ قدریں نسبتی دلچسپی (0–100) کے طور پر normalize شدہ ہیں، سرچ volumes نہیں۔

## ایک منٹ کا خلاصہ

LastPass سے export کریں (دستیاب ہو تو پاس ورڈ سے محفوظ)، CSV ایک ایسے متبادل میں import کریں جس کا export مفت ہو اور جس کا vault zero-knowledge ہو، کچھ بھی تبدیل کرنے سے پہلے autofill چالو کریں، پہلے email اور banking تبدیل کریں، پھر export حذف کریں اور تب ہی پرانا account۔ منسوخ کرنے سے پہلے ایک خفیہ شدہ backup رکھیں۔

## اگلے مراحل

- [1Password کا متبادل](/ur/blog/1password-alternative) — وہی عمل، مختلف وجوہات
- [Chrome سے import](/ur/blog/import-passwords-from-chrome) — اگر آپ browser exports بھی ایک جگہ کر رہے ہیں
- [بہترین پاس ورڈ مینیجر](/ur/blog/best-password-managers) — اسکور شیٹ
- [Import اور export](/ur/guide/import-export) — supported formats، free بمقابلہ Pro
