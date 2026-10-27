---
title: "Autofill پاس ورڈز: کیسے سیٹ اپ اور درست کریں"
description: Autofill کیا ہے، Chrome، Firefox، Safari اور موبائل پر password autofill کیسے شروع کریں، اور OpenKey logins، cards اور passkeys کیسے بھرتا ہے۔
date: 2026-09-14
cover: /blog/covers/autofill-passwords.png
---

# Autofill پاس ورڈز: کیسے سیٹ اپ اور درست کریں

**Autofill** وہ feature ہے جو پاس ورڈ مینیجر کو "پاس ورڈز رکھنے کی جگہ" سے ایسے tool میں بدل دیتا ہے جسے آپ واقعی استعمال کرتے ہیں۔ vault کھولنے، صحیح entry ڈھونڈنے اور کوئی سٹرنگ کاپی کرنے کے بجائے آپ username field پر focus کرتے ہیں اور ایک تجویز سامنے آ جاتی ہے۔

یہی وہ جگہ ہے جہاں زیادہ تر لوگ پہلے سرچ کرتے ہیں — "how to autofill"، "autofill password"، "autofill chrome"، "autofill iphone" — اور جہاں زیادہ تر لوگ پہلے ہار بیٹھتے ہیں۔ تو: یہ کیا ہے، ہر جگہ کیسے شروع کریں، اور اسے قابلِ اعتماد کیسے بنائیں۔

## Autofill اصل میں کیا کرتا ہے

تین الگ mechanisms ایک ہی نام رکھتے ہیں:

1. **Form autofill** — ایک login page پہچان لیا جاتا ہے، مینیجر مطابقت رکھنے والی entries پیش کرتا ہے، آپ ایک پر ٹیپ کرتے ہیں، اور username وہ پاس ورڈ بھر دیے جاتے ہیں۔
2. **Save prompts** — login کے بعد مینیجر credentials محفوظ یا اپ ڈیٹ کرنے کی پیشکش کرتا ہے۔
3. **Password generation** — sign-up form پر مینیجر مضبوط پاس ورڈ بنا سکتا ہے اور آپ کے ٹائپ کرتے ہی آپ کے فیلڈ میں لکھ سکتا ہے۔

تیسرا حصہ کم قدر دیا جاتا ہے۔ Signup کے دوران پاس ورڈ بنانا *دستیاب سب سے بہتر عادتی تبدیلی* ہے: یہ وہ لمحہ ہٹا دیتا ہے جہاں آپ کمزور کچھ ایجاد کرتے، کیونکہ فیلڈ اس سے پہلے بھر جاتا ہے کہ آپ اوپر سے ٹائپ کر سکیں۔

## Chrome میں autofill شروع کریں

Chrome کا بلٹ ان manager اور کسی تیسرے فریق کا manager ایک ہی جگہ رہتے ہیں، اسی لیے یہ معاملہ پیچیدہ ہو جاتا ہے۔

1. `chrome://settings/addresses` کھولیں (passwords and autofill)۔
2. **Offer to save passwords** آن کریں۔
3. اگر آپ ایک ٹیپ میں sign-in چاہتے ہیں تو **Automatically sign in with saved passwords** آن کریں۔
4. **Passwords, passkeys and autofill** کے تحت وہ manager چنیں جو آپ استعمال کرنا چاہتے ہیں — Chrome کا بلٹ ان، یا آپ کے پاس ورڈ مینیجر کی ایکسٹینشن۔
5. اگر آپ ایکسٹینشن استعمال کرتے ہیں تو اس کا popup ایک بار کھولیں اور تصدیق کر لیں کہ وہ unlocked ہے۔

کی بورڈ سے پہلا کرنا بھی عموماً کام کرتا ہے: Windows اور Linux پر `Ctrl+Shift+L`، macOS پر `⌘⇧L`۔ اگر کوئی دوسری ایکسٹینشن پہلے ہی یہ shortcut مختص کر چکی ہے تو براؤزر کے extension keyboard shortcuts میں دوبارہ مختص کریں۔

## Firefox میں Autofill

Firefox کا اپنا بلٹ ان manager ہے اور یہ سختی سے بتاتا ہے کہ کون سی ایکسٹینشنیں fill کر سکتی ہیں۔ اگر تجاویز نہیں آتیں تو دیکھیں کہ ایکسٹینشن کو اس سائٹ پر اجازت ہے اور یہ unlocked ہے۔ Firefox `openkey@openselfhosting.local` کو native messaging host کے طور پر خودکار استعمال کرتا ہے — اس پلیٹ فارم پر دستی manifest میں ترمیم کی ضرورت نہیں۔

## iPhone اور iPad پر Autofill

iOS میں Android کی طرح کا سراسری "کسی بھی ایپ سے بھروں" والا toggle نہیں ہوتا۔ آپ ہر ایپ کے لیے الگ flow میں **AutoFill Passwords** استعمال کرتے ہیں:

1. اپنا پاس ورڈ مینیجر install کریں اور system settings میں اسے AutoFill provider کے طور پر فعال کریں۔
2. جس ایپ میں login کر رہے ہیں، وہاں username یا پاس ورڈ فیلڈ پر ٹیپ کریں اور فیلڈ کے menu (یا کی بورڈ کی password row) سے اپنا provider چنیں۔
3. جب کہا جائے تو Face ID / Touch ID سے تصدیق کریں۔

دو iOS عادتیں جاننے کے قابل ہیں: اگر OpenKey provider کی فہرست میں نظر نہیں آتا تو اسے system settings میں فعال نہیں کیا گیا، اور provider تبدیل کرنے کے بعد iOS کو کبھی کبھی target ایپ restart کرنی پڑتی ہے۔ [Passkeys](/ur/blog/what-are-passkeys) بھی اُسی AutoFill picker سے گزرتے ہیں، اس لیے ایک ہی سیٹ اپ دونوں کا کام کرتا ہے۔

## Android پر Autofill

Android ایک اصل system-wide password اور passkey provider فراہم کرتا ہے، جو اسے موبائل پلیٹ فارمز میں سب سے ہموار بناتا ہے:

1. **Settings → Security → Autofill service** کھولیں اور اپنا manager چنیں۔
2. اجازت کے prompts دے دیں۔
3. اپنے manager کی settings میں **inline suggestions** یا **popup** چنیں، اور چاہیں تو ہر fill سے پہلے biometric لازم کریں۔
4. ایسی سائٹ پر test login کر کے تصدیق کریں جس کی credentials آپ کے پاس پہلے سے ہیں۔

Fill سے پہلے biometric لازم کرنا ایک معنی دار upgrade ہے: یہ "کوئی آپ کے unlocked فون کے پاس آ کر آپ کے inbox کے پاس ورڈز پڑھ لے" والا سوراخ بند کر دیتا ہے، بغیر autofill کو تھکا دیے۔

## Desktop ایپس میں Autofill

Desktop autofill ایک دو حصوں والا handshake ہے۔ آپ Autofill setting فعال کرتے ہیں تو ایپ ایک **native messaging host** رجسٹر کرتی ہے، اور پھر براؤزر ایکسٹینشن unlocked ایپ سے مقامی socket کے ذریعے بات کرتی ہے۔ macOS پر host script کو آپ کے `PATH` پر Python 3 درکار ہے؛ Linux اور Windows پر setting on کرتے ہیں تو ایپ آپ کے لیے manifests لکھ دیتی ہے۔

اگر ایکسٹینشن ایپ تک نہیں پہنچ سکتی تو یہ handshake ہی تقریباً ہمیشہ وجہ ہوتی ہے — مکمل checklist کے لیے [autofill کام نہیں کر رہا](/ur/blog/autofill-not-working) دیکھیں۔

## OpenKey autofill سیٹ اپ کرنا

| پلیٹ فارم | مراحل |
|----------|-------|
| Android | **Settings → Security** → OpenKey کو system provider کے طور پر فعال کریں → vault unlock کریں |
| iOS / macOS | system AutoFill settings میں OpenKey فعال کریں → OS prompts کو اجازت دیں → target ایپ restart کریں |
| Windows / Linux | **Settings → Security** → native host رجسٹر کرنے کے لیے Autofill فعال کریں |
| براؤزر | `openkey_extension` build اور load کریں → server URL سیٹ کریں، یا **Use desktop app** چنیں |

دو unlock modes دستیاب ہیں۔ **Standalone** ایکسٹینشن کو آپ کے self-hosted server کے خلاف ایمیل اور ماسٹر پاس ورڈ سے unlock کرتا ہے۔ **Desktop bridge** پہلے سے unlock ہو چکی ایپ کے ذریعے fill کرتا ہے، الگ ایکسٹینشن unlock کے بغیر — روزمرہ کا تجربہ عموماً یہی بہتر ہے کیونکہ ایپ ہی وہ ایک جگہ ہے جہاں آپ unlock کرتے ہیں۔

مکمل walkthrough: [براؤزر ایکسٹینشن گائیڈ](/ur/guide/extension)۔

## Autofill ایک سیکیورٹی feature بھی کیوں ہے

Autofill صرف سہولت نہیں؛ یہ ایک کنٹرول ہے۔

- **Phishing سے مزاحمت۔** جو مینیجر login کو اُسی اصل origin سے ملاپے جس کے لیے وہ محفوظ کیا گیا تھا، وہ ملتے جھوٹے domain پر کچھ نہیں پیش کرتا۔ اپنے بینک کی پڑھنے کے قابل نقلِ کاپی میں پاس ورڈ دستی طور پر paste کرنا بالکل وہی حملہ ہے جسے autofill روکتا ہے۔
- **کم plaintext کاپیاں۔** نہ کوئی پاس ورڈ مینیجر ایپ، نہ clipboard history کا entry، نہ کوئی پاس ورڈ notes فائل میں پڑا رہا۔
- **قدرتی تبدیلی۔** جب کوئی سائٹ نیا پاس ورڈ مانگے تو اسے inline بنانا unique پاس ورڈز کو کم از کم محنت کا راستہ بنا دیتا ہے۔

## Autofill اور passkeys

Passkeys پاس ورڈ فیلڈ کو مکمل طور پر ہٹا دیتے ہیں، تو fill کرنے کے لیے کچھ باقی نہیں رہتا — credential vault سے واپس آتا ہے اور وہیں sign کیا جاتا ہے۔ autofill کے لیے جو unlock آپ استعمال کرتے ہیں وہی WebAuthn کو بھی کھل دیتا ہے، اس لیے provider ایک بار سیٹ اپ کرنے سے دونوں کام ہو جاتے ہیں۔ [Passkeys کیا ہیں؟](/ur/blog/what-are-passkeys)

## سرچ ڈیٹا کیا کہتا ہے

Autofill ایک بڑا، نیت سے بھرا query cluster ہے۔ Google Trends (دنیا بھر، گزشتہ 12 ماہ) کے مطابق، وہ باریکیاں جو لوگ "autofill" میں شامل کرتے ہیں:

| متعلقہ query | نسبتی دلچسپی |
|---------------|-------------------|
| how to autofill | 100 |
| autofill iphone | 44 |
| google autofill | 42 |
| chrome autofill | 38 |
| autofill password | 35 |
| autofill passwords | 28 |
| what is autofill | 21 |
| autofill extension | 17 |
| autofill settings | 13 |
| safari autofill | 12 |
| password manager | 10 |

اسے ایک funnel سمجھیں: لوگ یہ جانے بغیر آتے ہیں کہ autofill کیا ہے، کسی مخصوص پلیٹ فارم پر پہنچتے ہیں، پھر settings پر پھنس جاتے ہیں۔ اور *troubleshooting* cluster کے اندر — یعنی long-tail terms کا آپس میں مقابلہ — "autofill not working" عام اصطلاح "autofill extension" کے مقابلے میں تقریباً **55%** ہے، یعنی بہت بڑی تعداد میں لوگ ایسے ہیں جن کا autofill ٹوٹ گیا اور جنہیں tutorial سے زیادہ fix چاہیے۔

اسی ڈیٹا میں "google chrome autofill settings" Chrome cluster کے تحت سب سے تیزی سے بڑھنے والی refinement ہے، سال بہ سال تقریباً 70% کا اضافہ۔

طریقہ: Google Trends، دنیا بھر، گزشتہ 12 ماہ، ستمبر 2026 میں نکالا گیا۔ قدریں نسبتی دلچسپی (0–100) کے طور پر normalize شدہ ہیں، سرچ volumes نہیں۔

## اگر autofill کام نہیں کر رہا

دس میں سے نو معاملات پانچ میں سے کوئی ایک چیز ہوتے ہیں: vault locked ہے، system settings میں غلط provider منتخب ہے، ایکسٹینشن ایپ سے منسلک نہیں، provider تبدیلی کے بعد براؤزر کو restart چاہیے، یا autofill عمداً ایک ہی براؤزر تک محدود ہے۔ مرحلہ وار طریقہ [autofill کام نہیں کر رہا](/ur/blog/autofill-not-working) میں ہے۔

## اگلے مراحل

- [Autofill کام نہیں کر رہا](/ur/blog/autofill-not-working) — مکمل troubleshooting checklist
- [براؤزر ایکسٹینشن](/ur/guide/extension) — install، unlock modes، native messaging
- [Passkeys کیا ہیں؟](/ur/blog/what-are-passkeys) — autofill کے چال ہونے کے بعد اگلا قدم
- [ایپ کا استعمال](/ur/guide/app) — ایک ساتھ میں Autofill اور براؤزر settings
