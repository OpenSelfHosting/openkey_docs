---
title: "Autofill کام نہیں کر رہا: وہ fixes جو واقعی کام کرتے ہیں"
description: پاس ورڈ autofill Chrome، Firefox، Safari اور موبائل پر کیوں بند ہو جاتا ہے — پانچ عام وجوہات اور ان کے حل، ممکنہ ترتیب سے۔
date: 2026-09-15
cover: /blog/covers/autofill-not-working.png
---

# Autofill کام نہیں کر رہا: وہ fixes جو واقعی کام کرتے ہیں

Autofill تعداد کی چند پیش ہوئی صورتوں میں ٹوٹتا ہے۔ عملی طور پر وجہ تقریباً کبھی bug نہیں ہوتی: یہ ایک locked vault ہے، غلط provider منتخب ہوا ہے، ایک bridge جس کا connection ٹوٹ گیا، ایک ایپ جسے restart چاہیے، یا ایک براؤزر جو خاموشی سے کہیں اور سے fill کرنے لگا ہے۔

انہیں ممکنہ ترتیب سے دیکھیں۔ اس میں تقریباً پانچ منٹ لگتے ہیں اور زیادہ تر معاملات حل ہو جاتے ہیں۔

## Fix 1: vault کو unlock کریں

بہت فاصلے سے سب سے عام وجہ، اور سب سے آسان جو نظر نہیں آتی، کیونکہ ایپ *نصب* اور *فعال* دکھائی دیتی ہے۔

- **ایکسٹینشن standalone mode:** ایکسٹینشن کا popup کھولیں اور اسے unlock کریں۔ ایک locked ایکسٹینشن کچھ بھی decrypt نہیں کر سکتی، اس لیے کچھ نہیں پیش کرتی۔
- **Desktop bridge mode:** desktop ایپ کا unlock ہونا چاہیے۔ vault locked ہونے پر bridge کام سے انکار کرتا ہے، یہ اس کا منصوبہ بند ہے۔
- **موبائل:** فیلڈ پر focus کرنے سے پہلے ایپ کھولیں اور unlock کریں۔ بیکار وقت پر lock ہونا یعنی autofill بھی رک جاتا ہے۔

اگر تجاویز صرف unlock کرنے کے فوراً بعد آتی ہیں اور پھر غائب ہو جاتی ہیں تو یہی آپ کا جواب ہے۔

## Fix 2: system provider چیک کریں

پاس ورڈ مینیجر تبدیل کرنے سے ہمیشہ یہ نہیں بدلتا کہ OS کیا پیش کرتا ہے۔

| پلیٹ فارم | کہاں دیکھیں |
|----------|----------------|
| Android | Settings → Security → **Autofill service** |
| iOS / iPadOS | Settings → Passwords → **AutoFill Passwords** |
| macOS | System Settings → General → **AutoFill & Passwords** |
| Windows | Settings → Accounts → **Passwords** (credential providers) |
| Chrome | Settings → Passwords, passkeys and autofill → **Password manager** |

اگر دو managers فعال ہوں تو OS ایک چنتا ہے اور دوسرا ٹوٹا ہوا لگتا ہے۔ جسے آپ نہیں چاہتے اسے بند کریں، یا جان بوجھ کر جسے آپ چاہتے ہیں وہی منتخب کریں — اور براؤزر میں بھی اسی انتخاب کی تصدیق کریں۔

## Fix 3: target ایپ یا براؤزر restart کریں

credential provider تبدیل کرنا ہمیشہ ایک چلتے ہوئے process پر اثر نہیں کرتا۔ یہ معمول کی بات ہے، bug نہیں:

- موبائل: جس ایپ میں autofill کرنا ہے، اسے force-quit کریں، پھر دوبارہ کھولیں۔
- ڈیسک ٹاپ: براؤزر کو مکمل طور پر quit کریں (صرف کھڑکی نہیں) اور دوبارہ کھولیں۔
- اگر مسئلہ براؤزر ہے تو باقی سب سے پہلے اسے restart کریں — ایکسٹینشن کی دوبارہ لوڈنگ اکثر native host کو دوبارہ رجسٹر کر دیتی ہے۔

## Fix 4: desktop bridge کو دوبارہ جوڑیں

Desktop autofill ایک دو حصوں والا handshake ہے: ایپ ایک native messaging host رجسٹر کرتی ہے، اور ایکسٹینشن مقامی socket کے ذریعے اس سے بات کرتی ہے۔ یہ اس وقت ناکام ہوتا ہے جب host کی رجسٹریشن غائب ہو یا پرانی ہو چکی ہو۔

1. OpenKey desktop ایپ unlock کریں۔
2. **Settings → Security** کھولیں اور Autofill بدلیں — اس سے native messaging host (دوبارہ) رجسٹر ہوتا ہے۔
3. Chromium براؤزرز پر اپنے unpacked extension ID کو پلیٹ فارم فائل میں لکھیں، پھر Autofill دوبارہ بدلیں تاکہ manifest دوبارہ بنے:

| پلیٹ فارم | extension ID فائل |
|----------|-------------------|
| Windows | `%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt` |
| Linux | `~/.local/share/OpenKey/chrome_extension_id.txt` |

4. ایکسٹینشن میں **Use desktop app** چنیں۔
5. صرف macOS: تصدیق کر لیں کہ Python 3 آپ کے `PATH` پر ہے — host script کو اس کی ضرورت ہے۔

یہ بھی دیکھ لیں کہ آزمائش کے وقت vault **ابھی بھی unlocked** ہے۔ bridge socket صرف unlocked session کے دوران ہی موجود ہوتا ہے۔

## Fix 5: مقابلہ کرنے والا manager چیک کریں

Chrome اور Edge دونوں بلٹ ان پاس ورڈ اسٹوریج لے کر آتے ہیں، اور دونوں خوشی سے خود fill کرتے رہیں گے۔ اگر تجاویز "غائب ہو جاتی ہیں" اور credentials پھر بھی بھر دیے جاتے ہیں تو بلٹ ان manager ہی یہ کر رہا ہے۔

- براؤزر settings میں محفوظ پاس ورڈز کے لیے automatic sign-in بند کریں، یا
- بلٹ ان entry حذف کریں اور اپنے manager کو اس login کا مالک بننے دیں۔

یہی تصادم iCloud Keychain اور کسی تیسرے فریق کے AutoFill provider کے درمیان بھی سامنے آتا ہے، اور دو ایکسٹینشنز کے درمیان بھی جو دونوں `<all_urls>` مانگتی ہیں۔

## پلیٹ فارم کے مطابق وجوہات

### Chrome

ایکسٹینشن کی site access: `chrome://extensions` → آپ کی ایکسٹینشن → **Details** → Site access → *On all sites*، یا اگر آپ واضح اجازتیں چاہتے ہیں تو *On click*۔ Autofill کو fields پہچاننے کے لیے page access درکار ہے۔

اگر کسی دوسری ایکسٹینشن نے fill shortcut لے لیا ہے تو `chrome://extensions/shortcuts` کے تحت دوبارہ مختص کریں۔

### Firefox

Firefox پہلی بار میں اجازت مانگتا ہے جب کوئی ایکسٹینشن کسی سائٹ پر fill کرنا چاہے، اور کچھ all-sites درخواستیں خاموشی سے مسترد کر دیتا ہے۔ `about:addons` → Permissions → Access your data for all websites میں ایکسٹینشن کی permissions چیک کریں۔

Firefox `openkey@openselfhosting.local` native host خودکار استعمال کرتا ہے؛ اس پلیٹ فارم پر دستی manifest کی کوئی ضرورت نہیں۔

### Safari

Safari کا AutoFill اور آپ کا manager الگ panels ہیں۔ System Settings میں manager فعال کریں، پھر Safari میں تصدیق کر لیں کہ **Passwords** autofill آن ہے۔ اگر system settings میں ترتیب بدل گئی ہو تو Safari کسی *دوسرے* credential provider سے بھی auto-fill کر سکتا ہے — صرف toggle نہیں، انتخاب کی ترتیب بھی دیکھیں۔

### iOS اور Android

- **ہر ایپ کا اپنا state:** iOS providers صرف کسی فیلڈ کے menu میں پیش کرتا ہے، اس لیے علامت یہ ہوتی ہے کہ "اختیار وہاں ہی نہیں"، نہ کہ "اس نے غلط چیز بھر دی"۔
- **اجازت کے prompts:** سیٹ اپ کے دوران OS local-network یا biometric اجازتیں مانگتا ہے۔ ایک مسترد prompt ٹوٹے manager جیسا لگتا ہے۔
- **Fill سے پہلے biometrics:** اگر آپ نے biometric-before-fill فعال کیا ہے تو اب ہر fill کے لیے تصدیق درکار ہے۔ یہ درست رویہ ہے، خرابی نہیں۔
- **پس منظر کی پابندیاں:** Android پر سخت battery optimisers provider کا process مار سکتے ہیں، اس لیے تجاویز صرف ایپ foreground ہونے پر آتی ہیں۔

## براؤزر کے autofill audit سے تشخیص

براؤزر ایک diagnostic فراہم کرتے ہیں جو ہر دیکھا ہوا field، پیش کی گئی ہر تجویز اور یہ بتاتا ہے کہ اسے reject کیوں کیا گیا۔ اس سے اندازہ لگانا دو منٹ کا کام بن جاتا ہے۔

Chrome میں DevTools → **Application** → **Autofill** کھولیں، پھر صفحے پر fill کی صورتِ حال دہرائیں۔ آپ کو پائے گئے fields، dropdown میں پیش کیے گئے items اور کسی بھی suppression کی وجہ ملتی ہے۔ جب card یا address autofill ہی وہ حصہ ہے جو ناکام ہو رہا ہو تو `autofill.creditCards` اور `autofill.profiles` کو `chrome://flags` میں بھی بدل سکتے ہیں۔

Firefox: `about:debugging` → ایکسٹینشن inspect کریں، اور fill کے وقت کی errors کے لیے اس کا console چیک کریں۔

## اگر آپ خاص طور پر OpenKey استعمال کرتے ہیں

| علامت | کیا دیکھیں |
|---------|-------|
| براؤزر میں کوئی تجویز نہیں | ایکسٹینشن unlocked ہو، یا desktop ایپ unlocked ہو اور **Use desktop app** منتخب ہو |
| "Extension cannot talk to the desktop app" | native host رجسٹریشن، extension ID فائل، macOS پر Python 3 |
| Android پر کچھ نہیں | Android میں **Settings → Security → Autofill** فعال ہو، پھر ایپ unlock کریں |
| iOS پر کچھ نہیں | system settings میں AutoFill provider فعال ہو؛ target ایپ restart کریں |
| Passkeys براؤزر پر واپس چلے جاتے ہیں | **Use browser** چننے پر یہ متوقع ہے، یا جب ایکسٹینشن کا vault locked ہو |
| Fill ہوتا ہے، save نہیں ہوتا | تصدیق کر لیں کہ صفحے کا save banner خود صفحے نے روکا نہیں ہے |

ایکسٹینشن کو fields پہچاننے، logins پکڑنے اور کسی بھی سائٹ پر WebAuthn روکنے کے لیے `<all_urls>` host access درکار ہے — کوئی مقررہ allowlist کھلے عام web کو cover نہیں کر سکتی۔ اس کا decrypt کیا ہوا سب کچھ آپ کی ڈیوائس یا آپ کے اپنے سرور پر رہتا ہے؛ page content کسی vendor cloud کو نہیں بھیجا جاتا۔

## سرچ ڈیٹا کیا کہتا ہے

یہ ایک بڑا query cluster ہے، جو اُن کے لیے اچھی نشانی ہے جو کبھی اس سے ٹکرا چکے ہیں۔ long-tail autofill troubleshooting terms کا آپس میں مقابلہ (Google Trends، دنیا بھر، گزشتہ 12 ماہ):

| متعلقہ query | cluster میں نسبتی دلچسپی |
|-------|-------------------------------|
| autofill extension | 100 |
| autofill safari | 71 |
| **autofill not working** | **55** |
| password autofill chrome | 33 |
| chrome autofill not working | 2 |

"Autofill not working" کی دلچسپی عام اصطلاح "autofill extension" کی دلچسپی کے آدھے سے زیادہ ہے، یعنی بہت بڑی audience پہلے ہی ٹوٹی ہوئی آتی ہے۔ خاص طور پر Chrome cluster کے تحت "google chrome autofill settings" 100 پر سب سے اوپر والا متعلقہ query ہے اور تقریباً +70% سال بہ سال سب سے تیزی سے بڑھنے والا بھی، جبکہ "chrome autofill extension" 62 اور "chrome autofill not working" 16 پر ہے۔

یہ تقسیم ایک مخصوص سپورٹ حکمتِ عملی کی طرف اشارہ کرتی ہے: settings پر مبنی مواد اور ایک قابلِ اعتماد troubleshooting checklist کسی اور feature announcement سے زیادہ لوگوں تک پہنچیں گے۔

طریقہ: Google Trends، دنیا بھر، گزشتہ 12 ماہ، ستمبر 2026 میں نکالا گیا۔ قدریں نسبتی دلچسپی (0–100) کے طور پر normalize شدہ ہیں، سرچ volumes نہیں۔

## 30 سیکنڈ کا خلاصہ

vault کو unlock کریں۔ تصدیق کر لیں کہ صحیح system provider منتخب ہے۔ ایپ یا براؤزر restart کریں۔ ایپ میں Autofill دوبارہ بدلیں تاکہ native host دوبارہ رجسٹر ہو۔ مقابلہ کرنے والا ہر manager بند کریں۔ اگر پھر بھی ناکام ہو تو براؤزر کا autofill audit کھولیں اور rejection کی وجہ پڑھیں — وہ مسئلے کا نام لیتا ہے۔

## اگلے مراحل

- [Autofill پاس ورڈز](/ur/blog/autofill-passwords) — سیٹ اپ گائیڈ
- [براؤزر ایکسٹینشن](/ur/guide/extension) — unlock modes اور native messaging کی تفصیل
- [FAQ اور troubleshooting](/ur/guide/faq) — OpenKey کے لیے مخصوص fixes
- [Passkeys کیا ہیں؟](/ur/blog/what-are-passkeys) — وہ credential قسم جو پاس ورڈز کی جگہ لیتا ہے
