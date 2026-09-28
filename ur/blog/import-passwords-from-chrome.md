---
title: Chrome سے پاس ورڈز import کریں
description: Chrome، Edge اور Google Password Manager سے پاس ورڈز کیسے export کریں، انہیں دوسرے پاس ورڈ مینیجر میں کیسے import کریں، اور پھر export کو محفوظ طریقے سے کیسے حذف کریں۔
date: 2026-09-25
cover: /blog/covers/import-passwords-from-chrome.png
---

# Chrome سے پاس ورڈز import کریں

Export آسان حصہ ہے۔ خطرناک حصہ اس کے بعد کے دس منٹ ہیں، جب ایک plaintext CSV جس میں آپ کے تمام پاس ورڈز ہیں، آپ کے Downloads فولڈر میں پڑی رہی ہوتی ہے۔

یہ مکمل عمل ہے: Chrome، Edge یا Google Password Manager سے export کریں؛ اپنے نئے vault میں import کریں؛ تصدیق کریں؛ پھر فائل ختم کریں۔ پہلی بار پندرہ منٹ رکھیں۔

## پہلے سمجھیں کہ آپ بنا کیا رہے ہیں

Chrome کا password export ایک **plaintext CSV** ہے۔ جو بھی اسے کھولے اس کے پاس آپ کے پاس ورڈز ہو گئے — نہ ماسٹر پاس ورڈ، نہ encryption، نہ دوسرا factor۔ اسے اپنے گھر کی چابیوں کی printed فائل سمجھیں۔

پورے پروسیجر کے لیے تین اصول:

1. **اسے کبھی email یا message نہ کریں، اور کسی converter site پر upload نہ کریں۔** پاس ورڈ کا export کسی تیسے "میرا CSV بدلو" ٹول پر upload کرنا آپ کا پورا vault کسی کے حوالے کر دیتا ہے۔
2. **import اُسی ڈیوائس پر کریں جہاں فائل پہلے سے موجود ہے۔** فائل کو اِدھر اُدھر لے جانے سے آپ کی نمائش کئی گہری ہو جاتی ہے۔
3. **import کی تصدیق ہونے کے لمحے export حذف کر دیں** — ٹھیک سے، صرف trash خالی کر کے نہیں۔

## Chrome سے export کریں

Chrome کا بلٹ ان مینیجر اور Google Password Manager (account سے sync ہونے والا ورژن) ایک ہی export راستہ استعمال کرتے ہیں، اور دونوں کا یہاں احاطہ ہے۔

1. `chrome://password-manager/settings` کھولیں۔
2. **Export passwords** تک scroll کریں، یا براہِ راست `chrome://password-manager/export` پر جائیں۔
3. Chrome آپ سے دوبارہ تصدیق کرنے کو کہے گا — اپنے Google account کا پاس ورڈ یا اپنی ڈیوائس کے credentials درج کریں۔
4. فائل محفوظ کریں، پھر **اسے Downloads سے نکالیں** اور کسی خفیہ شدہ جگہ لے جائیں، پہلے کچھ بھی کرنے سے پہلے۔

```bash
# Immediately get it out of Downloads and note the date
mkdir -p ~/secure-vault-staging
mv ~/Downloads/passwords*.csv ~/secure-vault-staging/chrome-export-$(date +%F).csv
chmod 600 ~/secure-vault-staging/chrome-export-*.csv
```

### فائل میں کیا ہوتا ہے

| کالم | مواد |
|--------|----------|
| `name` | وہ سائٹ کا نام جیسا Chrome نے محفوظ کیا |
| `url` | مکمل URL، subdomain سمیت |
| `username` | آپ کا username یا email |
| `password` | پاس ورڈ، plaintext میں |
| `note` | آپ نے شامل کیا ہوا کوئی بھی نوٹ |

کوئی فولڈر کی structure نہیں ہوتی — Chrome میں فولڈرز ہی نہیں ہوتے۔ سب کچھ flat آتا ہے، اور یہی وجہ ہے کہ بعد کا collection والا قدم اہم ہے۔

## Edge سے export کریں

Microsoft Edge بھی وہی Chromium password store استعمال کرتا ہے:

1. `edge://wallet/passwords` کھولیں۔
2. **More settings → Export passwords**، یا `edge://wallet/exportpasswords` پر جائیں۔
3. دوبارہ تصدیق کریں، محفوظ کریں، اور فائل کسی خفیہ شدہ جگہ لے جائیں۔

## Google Password Manager سے براہِ راست export کریں

اگر آپ ڈیوائسز کے پاس account-synced مینیجر استعمال کرتے ہیں تو کسی بھی log in شدہ براؤزر سے `passwords.google.com` → **Export passwords** پر export کر سکتے ہیں۔ یہ وہی CSV بناتا ہے، اور وہی اصول لاگو ہوتے ہیں۔

## OpenKey میں import کریں

1. OpenKey انسٹال کریں اور unlock کریں۔
2. **Settings → Data → Import & export → Import**۔
3. **Chrome CSV** چنیں۔
4. فائل منتخب کریں اور تصدیق کریں۔

import بالکل مقامی ہے۔ کوئی server round-trip نہیں، اور آپ کا plaintext کسی sync server پر نہیں جاتا — جو اہم ہے اگر آپ self-hosted سرور استعمال کرتے ہیں، کیونکہ CSV کبھی کوئی ایسی چیز نہیں بنتا جسے سرور سے کہا جا سکے۔

اگر آپ ایک ساتھ کئی ذریعے consolidate کر رہے ہیں تو دوسرے supported formats یہ ہیں: **Bitwarden JSON**، **LastPass CSV**، **1Password CSV**، **KeePass `.kdbx`** (database پاس ورڈ اور اختیاری key file)، اور OpenKey کا اپنا JSON۔ جہاں map ہوتے ہیں وہاں فولڈرز collections بن جاتے ہیں۔

## ترتیب بدلیں: بھروسے کی سطح کے لحاظ سے collections بنائیں

import flat ہے، اور flat vaults میں پاس ورڈز دوبارہ استعمال ہو جاتے ہیں کیونکہ آپ خطرہ نظر نہیں دیکھ سکتے۔ تیس منٹ کی صفائی اپنی لاگت نکال لیتی ہے:

| Collection | اس میں کیا جائے | اصول |
|-----------|-----------------|------|
| Identity | Email، cloud root، government | سب سے مضبوط پاس ورڈز، passkeys، ایک hardware-key backup |
| Finance | Banking، payment cards، tax | ہر چیز پر 2FA؛ جہاں دیا جائے وہاں passkeys |
| Work | Employer accounts | کبھی دوبارہ استعمال نہ کریں؛ offboarding checklist |
| Shopping and social | جو کچھ قابلِ ضائع ہے | لمبے بنائے گئے پاس ورڈز، محنت نہ لگائیں |
| Devices | Router، NAS، cameras، smart home | بنائے گئے؛ آف لائن بھی رکھے گئے |

پھر اپنے لیے ایک اصول مقرر کریں: **Shopping یا Social میں کوئی نئی چیز دوبارہ استعمال شدہ پاس ورڈ کے ساتھ نہیں جاتی۔** autofill آن ہو تو یہ خود بخود ہو جاتا ہے۔

## فوراً autofill چالو کریں

یہی وہ قدم ہے جو migration کو خود بخود درست کرتا ہے۔ ایک بار autofill کام کرنے لگے تو آج سے ہر login آپ کے لیے محفوظ ہو جائے گا، اس لیے اہم accounts سے گزرتے ہوئے vault خود بخود بہتر ہوتا رہے گا۔

- [Autofill پاس ورڈز](/ur/blog/autofill-passwords) — سیٹ اپ گائیڈ
- [Autofill کام نہیں کر رہا](/ur/blog/autofill-not-working) — جب تجاویز غائب ہوں

پھر **Chrome کا اپنا autofill بند** کر دیں تاکہ دونوں آپس میں مقابلہ نہ کریں:

1. `chrome://settings/addresses`۔
2. **Offer to save passwords** اور **Automatically sign in with saved passwords** بند کریں۔
3. Password manager وہ مقرر کریں جسے آپ استعمال کرنا چاہتے ہیں۔

## سب سے قیمتی accounts درست کریں

400 پاس ورڈز تبدیل کرنے کی کوشش نہ کریں۔ ایک فہرست پر نیچے آگے بڑھیں:

1. **Email** — یہ باقی سب کو reset کرتا ہے۔
2. **Banking اور cloud storage** — cloud باقی سب رکھ سکتا ہے۔
3. **آپ کا بنیادی social account**۔
4. باقی، جیسے جیسے ہر سائٹ آگے پوچھے۔

کام کرتے ہوئے ہر پاس ورڈ مقامی طور پر بنائیں:

```bash
openkey gen -l 24 -c
```

جب آپ پہلے ہی security settings میں ہیں تو وہیں 2FA بھی شامل کریں ([گائیڈ](/ur/blog/two-factor-authentication))، اور جہاں سائٹ پیش کرے وہاں passkey بھی ([passkeys کیا ہیں؟](/ur/blog/what-are-passkeys))۔

## کچھ بھی حذف کرنے سے پہلے تصدیق کریں

یہ نہ چھوڑیں۔ جانچیں:

- [ ] چند اہم logins نئے vault سے درست کھلتے ہیں۔
- [ ] TOTP entries، اگر آپ کے پاس تھیں، درست codes بناتی ہیں۔
- [ ] Autofill آپ کے main browser **اور** phone پر کام کرتا ہے۔
- [ ] آپ **دوسری ڈیوائس** پر sign in کر کے وہی entries دیکھ سکتے ہیں۔
- [ ] آپ نے ایک **خفیہ شدہ مقامی backup** (OpenKey میں `.okbak`) لیا ہے۔

تہی حذف کی طرف بڑھیں۔

## Export کو ٹھیک سے حذف کریں

```bash
# Overwrite the file, then remove it
for f in ~/secure-vault-staging/chrome-export-*.csv; do
  dd if=/dev/urandom of="$f" bs=1M count=8 conv=notrunc status=none
  rm -f "$f"
done
```

`shred` دستیاب ہونے پر زیادہ بھروسہ مند ہے، مگر SSDs اور copy-on-write filesystems پر دونوں طریقے پر بھروسہ نہیں کیا جا سکتا۔ عملی جواب یہ ہے کہ جہاں تک ممکن ہو overwrite کریں اور پھر ان چیزوں کو تبدیل کریں جو اتنی دیر plaintext میں رہی ہیں کہ فکر کرنے کی ضرورت ہو۔

ایک ہفتے تک plaintext CSV میں رہا ہوا پاس ورڈ بحران نہیں ہے؛ وہی پاس ورڈ ایک سال بعد بھی اُسی فائل میں رہنا بحران ہے۔

پھر براؤزر کی محفوظ کردہ نقل حذف کریں: `chrome://password-manager/settings` → **Delete passwords from Chrome**۔

## سرچ ڈیٹا کیا کہتا ہے

Migration ایک بڑی، مخصوص نیت ہے — سرچ کرنے والا جانتا ہے کہ وہ *کیا کرنا* چاہتا ہے، کیا خریدنا ہے۔ Google Trends (دنیا بھر، گزشتہ 12 ماہ) ان migration اصطلاحات کا آپس میں مقابلہ کرتا ہے:

| Query | cluster میں نسبتی دلچسپی |
|-------|-------------------------------|
| export passwords chrome | 100 |
| **import passwords from chrome** | **46** |
| chrome password manager export | 11 |
| move passwords to another password manager | 1 |
| import passwords from lastpass | 0.1 |

پہلی دو پوری کہانی ہیں، اور ان کے درمیان کا نسبہ ہی مفید نتیجہ ہے: **لوگ export کی سرچ import سے دوگنے سے زیادہ کرتے ہیں۔** سیکیورٹی کے لحاظ سے یہ الٹی ترتیب غلط ہے، کیونکہ export ہی exposed artifact بناتا ہے اور import ہی مسئلہ حل کرنے والا حصہ ہے۔ جو مواد export کے راستے سے شروع ہو، اسے فوراً import پر اور پھر حذف کے قدم پر لے جانا چاہیے۔

Long tail بھی پتلا ہے اور زیادہ تر انگریزی میں لکھی گئی عبارتوں پر مشتمل ہے، جو ایک چھوٹے، واضح مخاطب کا اشارہ ہے جو اصطلاحات پہلے ہی جانتا ہے — یعنی وہ قسم کا reader جسے موازنے کے بجائے ایک درست walkthrough زیادہ فائدہ دیتا ہے۔

طریقہ: Google Trends، دنیا بھر، گزشتہ 12 ماہ، ستمبر 2026 میں نکالا گیا۔ قدریں نسبتی دلچسپی (0–100) کے طور پر normalize شدہ ہیں، سرچ volumes نہیں۔

## ایک منٹ کا خلاصہ

`chrome://password-manager/settings` سے export کریں، plaintext CSV کو فوراً Downloads سے نکالیں، اسے مقامی طور پر اپنے نئے vault میں import کریں، بھروسے کی سطح کے لحاظ سے collections بنائیں، autofill چالو کریں اور Chrome کا بند کریں، email اور banking تبدیل کریں، دوسری ڈیوائس پر تصدیق کریں، پھر CSV کو overwrite اور حذف کریں اور Chrome کی محفوظ کردہ نقل ہٹا دیں۔

## اگلے مراحل

- [Autofill پاس ورڈز](/ur/blog/autofill-passwords) — کچھ بھی تبدیل کرنے سے پہلے یہ کریں
- [Google Password Manager](/ur/blog/google-password-manager) — وہی walkthrough، Google کے ecosystem کے گرد
- [مضبوط پاس ورڈ generator](/ur/blog/strong-password-generator) — کس چیز پر تبدیل کریں
- [Import اور export](/ur/guide/import-export) — ہر supported format، free بمقابلہ Pro
