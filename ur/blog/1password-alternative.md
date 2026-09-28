---
title: "1Password کا متبادل: vault کھوئے بغیر منتقل ہونا"
description: 1Password سے لوگ کیوں نکلتے ہیں — لاگت، family plans اور self-hosting — نیز ایسے پاس ورڈ مینیجر کی طرف مرحلہ وار migration جو آپ کے کنٹرول میں ہو۔
date: 2026-09-20
cover: /blog/covers/1password-alternative.png
---

# 1Password کا متبادل: vault کھوئے بغیر منتقل ہونا

1Password ایک شاندار پروڈکٹ ہے، اور اُس کی شانداری کا ایک سبب یہ بھی ہے کہ اس کا کوئی free tier نہیں۔ یہی ایک design فیصلہ وہ سب سے عام وجہ ہے جس کے لیے لوگ "1password alternative" سرچ کرتے ہیں — پوری category کا سب سے زیادہ سرچ کیا جانے والا متبادل query، تقریباً "lastpass alternative" کے مقابلے میں چار گنا دلچسپی۔

یہ مضمون اُن لوگوں کے لیے ہے جن کی وجہ ان تین میں سے ایک ہے: **لاگت**، **خاندانی شیئرنگ کی رکاوٹ**، یا **اپنے hardware پر sync چاہنا**۔ یہ کسی پر الزام نہیں ہے؛ 1Password ایک جائز انتخاب ہے، اور سچا فریم یہ ہے کہ "اگر یہ آپ کا مسئلہ نہیں ہے تو رہ جائیں۔"

## منتقل ہونے کے تین اصل وجوہات

### لاگت

Subscription داخلے کی قیمت ہے اور کوئی مستقل free اختیار نہیں۔ Pricing store اور region کے لحاظ سے بدلتی ہے، اس لیے سچا فریم structural ہے: آپ ایک subscription کا مقابلہ کسی اور جگہ free tier سے، یا ایک بار کی خریداری اور اپنے سرور سے کر رہے ہیں۔

Queries یہی بتاتی ہیں۔ "1password pricing" Bitwarden سے متعلق تیزی سے بڑھنے والی refinements میں سے ایک ہے، سال بہ سال تقریباً **200%** کا اضافہ، اور کئی بڑے brands کے تحت بڑھتی فہرست میں pricing سے متعلق اصطلاحات غالب ہیں۔

### خاندان اور ٹیم کی شیئرنگ

Family plans رکاوٹ کا عام ذریعہ ہیں — seat کا انتظام، بچے کو الگ account درکار ہونے پر plan کا upgrade، اور مختلف ڈیوائسز والے گھرانوں کے درمیان شیئرنگ۔ اگر آپ کا گھر ملا جلا (iOS/Android/Windows) ہے، یا آپ کسی ایسے شخص کے ساتھ شیئر کرنا چاہتے ہیں جو family plan پر نہیں ہے، تو یہ منتقل ہونے کا جائز وجہ ہے۔

### Self-hosting

1Password نے کچھ عرصے پہلے standalone مقامی vaults بند کر دی ہیں، اس لیے sync vendor کے ذریعے چلتا ہے۔ اگر شرط یہ ہے کہ خفیہ شدہ ڈیٹا آپ کے کنٹرول میں infrastructure پر رہے، تو یہ ترجیح نہیں بلکہ سخت شرط ہے — اور اس کا مطلب ایک self-hostable مینیجر ہے۔

## منتقل ہونے سے پہلے: کیا لاگت واقعی مسئلہ ہے؟

ایماندانہ جانچ لیں، کیونکہ migration ایک دوپہر کا کام ہے جسے آپ غیر محتاطی کے بارے میں ایک سے زیادہ بار کریں گے:

- **کیا آپ کو واقعاً منتقل ہونا چاہیے؟** ایک سال کا subscription اکثر اس وقت سے سستا ہے جتنی migration کی لاگت آتا وقت ہے۔ اگر تکلیف صرف ایک سالانہ charge ہے تو جواب شاید رکھ جانا ہیے۔
- **مسئلہ plan ہے یا seat کی تعداد؟** ایک personal plan اور ایک family plan دو مختلف پروڈکٹ ہیں؛ family plan کی رکاوٹ کی وجہ سے منتقل ہونا ایک فیصلہ ہے، اور اس وجہ سے منتقل ہونا کہ آپ کو subscription نہیں چاہیے، بالکل مختلف فیصلہ ہے۔
- **کیا آپ کو self-hosting کی کوئی حقیقی وجہ ہے؟** اگر آپ کے گھر کا کوئی فرد سرور نہیں چلا سکتا تو self-hosting ایک hobby ہے جسے آپ چھوڑ دیں گے۔ Nearby LAN sync اسی فائدے کا زیادہ تر حصہ بغیر کسی maintenance کے دے دیتا ہے۔

اگر جواب ہاں ہے تو منتقل ہو جائیں — اور اس مضمون کا باقی حصہ طریقۂ کار ہے۔

## مرحلہ وار منتقلی

### 1. 1Password سے export کریں

1. ویب پر یا desktop ایپ پر log in کریں۔
2. **Settings → Export** کھولیں اور **1Password CSV** چنیں۔
3. اگر **خفیہ شدہ 1PUX** export دستیاب ہو تو اسے ترجیح دیں — یہ items کو پاس ورڈ سے مقفل رکھتا ہے بجائے اُنہیں plaintext میں لکھنے کے۔
4. اسے ایسی جگہ محفوظ کریں جو آپ کے اختیار میں ہو، پھر اسے آف لائن لے جائیں۔

پیچیدہ item اقسام — attachments کے ساتھ secure notes، identities، دستاویزات، Wi-Fi credentials — export پر login جیسی rows میں flat ہو جاتی ہیں۔ اہم items ہاتھ سے دوبارہ بنانے کی تیاری کریں۔

### 2. نئے مینیجر میں import کریں

OpenKey میں: **Settings → Data → Import & export → Import → 1Password CSV**۔ import مقامی ہے؛ کچھ بھی upload نہیں ہوتا۔ فولڈرز جہاں صاف سے map ہوتے ہیں وہاں collections بن جاتے ہیں۔

### 3. فوراً autofill چالو کریں

autofill کام کر رہا ہو تو آپ جب بھی log in کریں گے سب کچھ آپ کے لیے محفوظ ہو جائے گا، اس لیے پاس ورڈز تبدیل کرتے ہوئے vault خود بخود درست ہوتا رہے گا۔

- [Autofill پاس ورڈز](/ur/blog/autofill-passwords)
- [Autofill کام نہیں کر رہا](/ur/blog/autofill-not-working) — اگر تجاویز غائب ہوں

### 4. اہم accounts تبدیل کریں

پہلے email، پھر banking اور cloud، پھر باقی جیسے جیسے ہر سائٹ آپ سے پوچھے۔ ہر پاس ورڈ مقامی طور پر بنائیں:

```bash
openkey gen -l 24 -c
```

security settings میں ہونے کے دوران 2FA بھی شامل کریں ([گائیڈ](/ur/blog/two-factor-authentication))، اور جہاں دیا جائے وہاں passkey بھی ([passkeys کیا ہیں؟](/ur/blog/what-are-passkeys))۔

### 5. شیئر شدہ items ہاتھ سے دوبارہ بنائیں

یہ وہ حصہ ہے جو لوگ کم سمجھتے ہیں۔ دوبارہ بنائیں:

- **Payment cards**، issuer کے لحاظ سے group کریں
- **Identities** جو forms میں استعمال ہوتی ہیں
- ذخیرہ کردہ **Wi-Fi اور ڈیوائس credentials**
- **Secure notes** اور ان کے attachments — وہ نہیں آئیں

OpenKey cards، crypto wallets اور developer secrets کو free-text notes کے بجائے vault کے پہلے درجے کے حصوں کے طور پر رکھتا ہے، جو اس دوبارہ بنانے کو ایسے مینیجر سے کہیں کم تکلیف دیتا ہے جو صرف notes رکھتا ہے۔ [ایپ کا استعمال](/ur/guide/app) دیکھیں۔

### 6. Backup لیں، پھر منسوخ کریں

منسوخ کرنے سے **پہلے** ایک خفیہ شدہ مقامی backup export کریں (OpenKey میں `.okbak`)، پھر دوسری ڈیوائس پر تازہ sign-in کی تصدیق کریں۔ تب ہی پرانا account بند کریں۔

### 7. Export فائلیں ختم کریں

خفیہ شدہ exports: حذف کر دیں۔ Plaintext CSVs: overwrite کریں اور shred کریں۔ جو کچھ ایک ہفتے سے plaintext فائل میں رہا ہے، اسے کسی صورت میں تبدیل کر دیں۔

## متبادل میں کیا دیکھنا چاہیے

| ضروریت | کیا تصدیق کرنی ہے |
|-------------|----------------|
| مہنگا نہ ہو | ایک free tier جو vault، autofill اور sync کو ڈھانپے — *item* limits کے ساتھ بیان کردہ |
| خاندانی شیئرنگ | revocation کے ساتھ shared collections، اور یہ کہ بچوں کو الگ plans چاہئیں یا نہیں |
| 1Password CSV import | واضح طور پر سپورٹ شدہ، folder mapping کے ساتھ |
| مفت export | tier تصدیق کریں؛ export paywall ڈیٹا کو hostage بنا دیتا ہے |
| Self-hosting | اختیاری، مگر یہ trust model مکمل بدل دیتا ہے |
| Passkeys اور TOTP | دونوں، کام کرتے ہوئے، "coming soon" نہیں |
| CLI یا API | قیمتی اگر آپ کچھ بھی script کرتے ہیں |

مکمل معیارات اور اسکور شیٹ: [بہترین پاس ورڈ مینیجر](/ur/blog/best-password-managers)۔

## خاندان اور ٹیم کا پہلو

اگر محرک شیئرنگ تھی، لاگت نہیں، تو کسی consumer plan چننے سے پہلے یہ دیکھیں:

- [خاندان کے لیے پاس ورڈ مینیجر](/ur/blog/password-manager-for-family) — گھر کے setups، بچے، شیئر شدہ accounts
- [ٹیموں کے لیے پاس ورڈ مینیجر](/ur/blog/password-manager-for-teams) — orgs، roles، revocation، offboarding

OpenKey میں organizations اور shared collections کے لیے Pro اور ایک self-hosted سرور درکار ہے، اور وہ سب کچھ جو یہ ذخیرہ کرتے ہیں — org names، entry payloads، attachments — ciphertext رہتا ہے۔ کلائنٹس recipients کے لیے keys wrap کرتے ہیں؛ سرور کبھی انہیں unwrap نہیں کرتا۔ ایسے پراسیس گاڑنے سے پہلے جاننے کے قابل ایک تفصیل: **entry shares snapshots ہیں**، زندہ دستاویزات نہیں۔ کسی share کو revoke کرنا pending accept روک دیتا ہے مگر recipient کے قبول کر چکے copy کو حذف نہیں کرتا۔ مسلسل shared access کے لیے org shared collection استعمال کریں۔

## سرچ ڈیٹا کیا کہتا ہے

Google Trends (دنیا بھر، گزشتہ 12 ماہ) اس migration کی شکل واضح کر دیتا ہے۔ متبادل queries کا آپس میں مقابلہ:

| Query | cluster میں نسبتی دلچسپی |
|-------|-------------------------------|
| **1password alternative** | **100** |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

اور بڑے brands سے منسلک بڑھتی queries تجارتی سوالوں کے تحت ہیں، سیکیورٹی والوں کے نہیں: Bitwarden کے لیے "bitwarden price increase" تقریباً **+450%** کے سال بہ سال اضافے کے ساتھ سب سے آگے ہے، جبکہ "bitwarden review" اور "bitwarden lite" دونوں تقریباً +350% پر اور "bitwarden pricing" تقریباً +190% پر ہیں۔ Open-source، self-hostable اور چھوٹی ٹیم کی دلچسپی بھی بڑھ رہی ہے — "bitwarden open source"، "bitwarden enterprise" اور "bitwarden cli" تینوں بڑھتی فہرست میں نظر آتے ہیں۔

دو نتائج۔ پہلا، اس category میں منتقل ہونے کا غالب محرک **قیمت** ہے، breach کی فکر نہیں۔ دوسرا، تیزی سے بڑھنے والی مجاور دلچسپیاں open source، enterprise اور CLI ہیں — جو اشارہ ہے کہ ادا شدہ plans چھوڑنے والے لوگ کچھ ایسا ڈھونڈ رہے ہیں جو خود چلا اور جاچ سکیں۔

طریقہ: Google Trends، دنیا بھر، گزشتہ 12 ماہ، ستمبر 2026 میں نکالا گیا۔ قدریں نسبتی دلچسپی (0–100) کے طور پر normalize شدہ ہیں، سرچ volumes نہیں۔

## ایک منٹ کا خلاصہ

اگر تکلیف لاگت ہے تو 1Password CSV export اور ایک مفت export والا free-tier مینیجر آپ کے بغیر کسی لاگت کے باہر نکال دیتا ہے۔ اگر تکلیف خاندانی شیئرنگ یا self-hosting ہے تو پہلے اُن دو ضروریات پر فیصلہ کریں اور لاگت پر بعد میں۔ Export کریں، مقامی طور پر import کریں، autofill چالو کریں، email اور banking تبدیل کریں، cards اور notes ہاتھ سے دوبارہ بنائیں، ایک خفیہ شدہ backup لیں، پھر منسوخ کریں۔

## اگلے مراحل

- [LastPass کا متبادل](/ur/blog/lastpass-alternative) — وہی عمل، مختلف محرکات
- [Self-hosted پاس ورڈ مینیجر](/ur/blog/self-hosted-password-manager) — self-hosting کا راستہ
- [خاندان کے لیے پاس ورڈ مینیجر](/ur/blog/password-manager-for-family) — گھر کے لیے شیئرنگ
- [Pricing](/ur/pricing) — OpenKey Free اور Pro میں کیا شامل ہے
