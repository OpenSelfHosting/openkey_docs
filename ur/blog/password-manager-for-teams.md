---
title: "ٹیموں کے لیے پاس ورڈ مینیجر: کیا جانچنا ہے"
description: ٹیم کا پاس ورڈ مینیجر کیسے چنیں — shared vaults، roles، offboarding، CLI اور API رسائی، auditability — اور اسے اپنے سرور پر کیسے چلائیں۔
date: 2026-09-23
cover: /blog/covers/password-manager-for-teams.png
---

# ٹیموں کے لیے پاس ورڈ مینیجر: کیا جانچنا ہے

ٹیم کا پاس ورڈ مینیجر کسی consumer پروڈکٹ کا وہ نہیں جس میں seats زیادہ ہوں۔ اس کا کام مختلف ہے: اسے لوگوں کے آنا اور جانے کا مقابلہ کرنا پڑتا ہے، اور اسے یہ جواب دینا پڑتا ہے کہ کس کو کس چیز تک رسائی تھی، اور کب۔ زیادہ تر tools شیئرنگ feature کے لحاظ سے ججے جاتے ہیں اور دوسرے سوال پر ناکام ہو جاتے ہیں۔

یہ مضمون evaluation کی checklist ہے، نیز اگر آپ اپنے کنٹرول میں infrastructure پر shared collections چاہتے ہیں تو OpenKey کا ماڈل کیسے کام کرتا ہے۔

## وہ ضروریات جو واقعی مختلف ہیں

### 1. اصل access control کے ساتھ shared vaults

"میں اپنی ٹیم سے share کر سکتا ہوں" تو بنیادی شرط ہے۔ اہم بات یہ ہے کہ رسائی فی collection ہے یا فی فرد، کہ آپ کسی subset کو share کر کے سب کچھ expose کیے بغیر کر سکتے ہیں، اور کہ ایک contractor صرف ایک ہی service دیکھ سکتا ہے۔

- **سب یا کچھ نہ کچھ والی شیئرنگ** جلد ناکام ہو جاتی ہے۔ یہ تقریباً پانچ لوگوں سے آگے نہیں بڑھتی۔
- **فی collection شیئرنگ** کم از کم مفید ماڈل ہے۔
- **Role-based access** (admin / member، اور بہتر ہو تو read-only) وہ ہے جو آپ چاہتے ہیں جب reviewers اور approvers ہوں۔

### 2. Offboarding جو واقعی رسائی ختم کرے

یہ وہ ضرورت ہے جو consumer tools سے team tools کو الگ کرتی ہے، اور یہی وہ ہے جو سب سے زیادہ کمی سے موجود ہوتی ہے۔

جب کوئی فرد جاتا ہے تو آپ کو یہ جاننا ہے:

- کیا اسے رسائی **فوراً** ختم ہو جاتی ہے، یا اگلی sync پر؟
- کیا اس کے پاس شیئر شدہ credentials کی **آف لائن نقلیں** رہ جاتی ہیں — اور اگر ہاں تو آپ ان کے ساتھ کیا کرتے ہیں؟
- کیا آپ کسی **share کو revoke** کر کے یہ جان سکتے ہیں کہ نقل حذف ہو چکی ہے؟
- کیا **org ownership** اور admin rights ان کی روانگتی کے بعد باقی رہتے ہیں، یا ٹیم خود کو administer کرنے کی صلاحیت کھو دیتی ہے؟

جو tool ان سوالوں کا جواب نہیں دے سکتا، وہ productivity feature کے بھیس میں پہنی ہوئی compliance liability ہے۔

### 3. Automation اور machine access

UI میں انسان آدھا مسئلہ ہیں۔ دوسرا ادھا حصہ یہ ہے:

- ایک **CLI** CI اور scripting کے لیے
- ایک **API** provisioning اور internal tools کے لیے
- **Service accounts** جو کسی فرد کے جانے پر expire نہ ہوں
- کسی directory یا legacy شیئر شدہ credentials کی spreadsheet سے **Bulk import**

زیادہ تر ٹیموں کو infrastructure دیا جاتا ہے ان میں سے چاروں چاہیئیں گی۔ جس پاس ورڈ مینیجر میں صرف browser extension ہو، وہ deploy pipeline سے ٹکر کر نہیں بچتا۔

### 4. Zero-knowledge، اور اس کا تجارتی مطلب

کسی فرد کے لیے zero-knowledge ایک رازداری کی ترجیح ہے۔ کسی organization کے لیے یہ ایک compliance position ہے: یہ "ہمارا vendor breach ہوا" اور "ہمارا vendor breach ہوا، اور اُن کے پاس ciphertext تھا" کے درمیان کا فرق ہے۔

یہ features کو بھی محدود کرتا ہے۔ کچھ vendors account recovery، admin resets، یا ایسی policy enforcement فراہم کریں گے جس کے لیے server-side plaintext درکار ہو — اور ان میں سے ہر ایک zero-knowledge خصوصیت کا عمدی کم کرنا ہے۔ دونوں positions کا دفاع کیا جا سکتا ہے؛ آپ کو جانے بغیر چننا چاہیے، ایک incident review کے دوران پتہ لگنے کی تاخیر سے نہیں۔

### 5. Audit trail

"کیا میں ثابت کر سکتا ہوں کہ 3 مارچ کو production database کے پاس ورڈ تک کس کی رسائی تھی؟" کے لیے ایک access log درکار ہے، متعین مدت کے لیے محفوظ، اور auditor کے لیے export کے قابل۔

حد کو ایماندانہ نوٹ کریں: zero-knowledge سسٹم میں admin یہ دیکھ سکتا ہے کہ کوئی entry *access* ہوئی تھی، یہ نہیں کہ اس میں *کیا* تھا۔ یہ درست رویہ ہے، اور یہ آپ کی audit کے لیے قابلِ ثبوت ہونے کی ایک حد بھی ہے۔

### 6. اپنا infrastructure لائیں

کسی نہ کسی وقت ایک سیکیورٹی review پوچھے گا کہ کیا شیئر شدہ credentials آپ کا نیٹ ورک چھوڑتے ہیں۔ جواب یہ ہیں: contractual DPA کے ساتھ vendor-hosted، private cloud، یا self-hosted۔ Self-hosting ہی واحد ہے جو آپ خود تصدیق کر سکتے ہیں، اور یہی واحد ہے جہاں آپ دکھا سکتے ہیں کہ سرور ciphertext رکھتا ہے۔

### 7. لاگت کا ماڈل جو headcount کے ساتھ ٹک جائے

فی seat pricing جس میں ہر contractor، ہر service account اور ہر read-only auditor شامل ہو، جلدی مہنگی ہو جاتی ہے یہ دیکھیں:

- Read-only seat کی pricing
- کیا service accounts مفت ہیں
- کیا deactivated users اب بھی شمار ہوتے ہیں
- کیا evaluation کے لیے کوئی free tier ہے

## ٹیموں کے لیے ایک اسکور شیٹ

| معیار | وزن | کیوں اہم ہے |
|-----------|--------|----------------|
| Offboarding اور revocation | ×3 | وہ ضرورت جس پر زیادہ تر tools ناکام ہوتے ہیں |
| فی collection access control | ×3 | ایک contractor کو سب کچھ دیکھنے سے روکتا ہے |
| CLI اور API رسائی | ×3 | ماشینیں آپ کے آدھے users ہیں |
| قابلِ ثبوت zero-knowledge | ×3 | Compliance اور breach exposure |
| Service accounts | ×2 | طویل عمر، غیر انسانی رسائی |
| retention کے ساتھ audit log | ×2 | تاریخی رسائی ثابت کرنا |
| Self-hosting دستیاب | ×2 | Credentials آپ کے نیٹ ورک کے اندر رکھنا |
| Emergency access | ×1 | جب admin تک رسائی نہ ہو تو break-glass |
| Bulk migration tooling | ×1 | شیئر شدہ spreadsheet سے نکلنا |

## OpenKey ٹیم رسائی کو کیسے سنبھالتا ہے

OpenKey کا شیئرنگ ماڈل اسی کے لیے بنایا گیا ہے، اور چند جگہوں پر جان بوجھ کے غیر معمولی ہے جنہیں اپنے پراسیس گاڑنے سے پہلے سمجھ لیں۔

### Organizations اور shared collections

شیئرنگ کے لیے **Pro** اور ایک ترتیب شدہ self-hosted سرور درکار ہے، اور سب کو **ایک ہی server URL** پر ہونا چاہیے۔ ماڈل یہ ہے:

1. **Identity keys publish کریں** تاکہ peers آپ کے لیے keys wrap کر سکیں۔ OpenKey میں یہ standalone (server) mode میں browser extension سے کیا جاتا ہے — ایپ کے Settings → Data پیج میں یہ کارروائی شامل نہیں۔
2. **ایک organization بنائیں** اور اس کے تحت shared collections۔ کلائنٹ org name کو encrypt کرتا ہے اور owner کے طور پر آپ کے لیے org key wrap کرتا ہے۔
3. **اعضاء کو email سے invite** کریں (وہ سرور پر پہلے سے موجود ہونے چاہئیں)، role `admin` یا `member` کے ساتھ۔ آپ کا کلائنٹ اُن کے published identity key کے لیے org key wrap کرتا ہے اور invite بھیجتا ہے۔
4. وہ **Pending invites** میں قبول کرتے ہیں اور sync کرتے ہیں؛ shared collections ظاہر ہو جاتے ہیں۔

سرور org names، shared payloads اور identity keys کو **غیر شفاف ciphertext** کے طور پر ذخیرہ کرتا ہے۔ یہ کبھی org key کو unwrap نہیں کرتا۔

Admin کے اختیارات: pending invites revoke کرنا، roles بدلنا، اعضاء ہٹانا۔ ایک حد جس کا پیمانہ کر لیں — **owner org سے نکل نہیں سکتا**، اور ownership کی منتقلی کوئی الگ recovery راستہ نہیں۔ اسے رسمی کردار کے بجائے جلد دوسرا owner مقرر کریں۔

### Item shares snapshots ہیں، زندہ دستاویزات نہیں

یہ عملی طور پر سب سے اہم تفصیل ہے۔ جب آپ کوئی single entry یا collection کسی کے ساتھ share کرتے ہیں:

- خفیہ شدہ payload **شیئر کے وقت پر جم** ہوتا ہے اور قبول کرنے پر recipient کے vault میں نقل ہوتا ہے۔
- آپ کی اپنی نقل میں بعد کے edits ان تک **نہیں** بھیجے جاتے۔
- **Revoke** کرنا pending accept روک دیتا ہے۔ یہ recipient کے پہلے ہی import کر چکے copy کو **نہیں** حذف کرتا۔

تو entry share ایسے ہے جیسے کسی کو مہر بند لفافہ دے دیا جائے، ایسے نہیں کہ کوئی زندہ دستاویز شیئر کی جائے۔ ہر ایسی چیز کے لیے جو sync میں رہنی چاہیے — شیئر شدہ service account، ٹیم کے سطح کا internal tool — **organization shared collection** استعمال کریں، جہاں اعضاء مشترکہ org key کے تحت اُسی ciphertext کو پڑھتے رہتے ہیں۔

اسے الٹا سمجھنے سے کلاسی bug بنتی ہے: آپ کوئی شیئر شدہ پاس ورڈ اپ ڈیٹ کرتے ہیں، فرض کر لیتے ہیں کہ سب کے پاس نیا ہے، اور ٹیم کا آدھا حصہ ایک credential پر قائم ہے جسے آپ نے ایک ماہ پہلے تبدیل کیا تھا۔

### OpenKey کیا نہیں کرتا

یہ صاف صاف کہنا مناسب ہے، کیونکہ اس سے یہ متاثر ہوتا ہے کہ آپ کو کب کچھ اور چنا چاہیے:

- کلائنٹ میں **admin-enforced policy engine نہیں**۔ ایسی کوئی server-side rule نہیں جو پوری ٹیم میں کم از کم پاس ورڈ کی لمبائی پابند کرے۔
- **خودکار offboarding hook نہیں۔** کسی member کو ہٹانا ایک دستی کارروائی ہے: org میں revoke یا remove کریں، پھر ان entry shares سے نمٹیں جو قبول ہو چکے ہیں۔
- **SCIM یا directory sync نہیں۔** رکنیت org اور sharing APIs کے ذریعے سنبھالی جاتی ہے۔
- **entry access کا server-side audit log نہیں۔** سرور plaintext نہیں دیکھ سکتا، اس لیے یہ لاگ نہیں کر سکتا کہ کیا پڑھا گیا۔
- **Sync CRDT نہیں بلکہ revision کے لحاظ سے last-write-wins ہے۔** ہمزمان edits ایک دوسرے کو overwrite کر سکتے ہیں؛ جہاں اہم ہو وہاں ایک وقت میں ایک ہی ڈیوائس پر edit کریں۔

اگر آپ کو خودکار offboarding، policy engine، یا compliance درجے کا access log درکار ہے تو ایک تجارتی ٹیم پروڈکٹ چنیں۔ OpenKey اُن ٹیموں کے لیے ہے جو cryptography اپنے کلائنٹس پر رکھنا چاہتی ہیں اور collaboration layer خود چلانے کو تیار ہیں۔

## ٹیم میں توسیع کرنا

1. **پہلے سرور چلائیں۔** [سرور سیٹ اپ](/ur/guide/server)، [سیکیورٹی checklist](/ur/blog/self-hosted-password-manager#hardening-کی-checklist) کے مطابق hardened۔
2. **اپنا account بنائیں**، extension سے identity keys publish کریں۔
3. **Org بنائیں**، پھر ہر service یا ٹیم کی سرحد کے لیے ایک shared collection۔ شیئر شدہ infrastructure accounts سے شروع کریں — غلط ہونے پر سب سے زیادہ نقصان یہی دیتے ہیں۔
4. **invite کرنے سے پہلے سب کی identity keys publish کریں**، ورنہ wrap مرحلہ ان تک نہیں پہنچے گا۔
5. **چھوٹے گروپوں میں invite** کریں اور اگلا بیچ بھیجھنے سے پہلے تصدیق کریں کہ کوئی member واقعی کوئی shared collection کھول سکتا ہے۔
6. **شیئر شدہ spreadsheet منتقل کریں۔** ٹیم کی spreadsheet میں موجود ہر credential آپ کی سب سے زیادہ ترجیحی import ہے۔
7. **Offboarding کا پروسیجر اس سے پہلے لکھ دیں جب آپ کو اس کی ضرورت ہو۔** دو قدم، تحریر میں: org سے ہٹائیں؛ entry shares کا جائزہ لے کر revoke کریں۔

## ایک منٹ کا خلاصہ

پہلے offboarding، فی collection رسائی، اور machine access پر جائزہ لیں — شیئرنگ feature پر نہیں۔ وہ zero-knowledge ترجیح دیں جس کی آپ تصدیق کر سکیں، اور دیکھیں کہ vendor کی recovery اور admin features خاموشی سے server-side plaintext مانگتی ہیں یا نہیں۔ اگر آپ self-host کرتے ہیں تو یاد رکھیں کہ entry shares snapshots ہیں: ہر ایسی چیز کے لیے جسے تازہ رکھنا ہے org shared collections استعمال کریں۔

## اگلے مراحل

- [Sharing اور organizations](/ur/guide/sharing) — مکمل walkthrough
- [Self-hosted پاس ورڈ مینیجر](/ur/blog/self-hosted-password-manager) — سرور چلانا
- [خاندان کے لیے پاس ورڈ مینیجر](/ur/blog/password-manager-for-family) — گھر کے پیمانے کا ورژن
- [سیکیورٹی](/ur/guide/security) — سرور کیا دیکھ سکتا ہے اور کیا نہیں
