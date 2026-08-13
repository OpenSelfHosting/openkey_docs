---
title: OpenKey Pro — کیا کھلتا ہے (اور کیا نہیں)
description: Free بمقابلہ Pro حدود، Nearby اور LAN Pro، store IAP بمقابلہ desktop، اور ہر پلیٹ فارم پر کیا مفت رہتا ہے۔
date: 2026-08-06
cover: /blog/covers/openkey-pro.svg
---

# OpenKey Pro — کیا کھلتا ہے (اور کیا نہیں)

OpenKey کا بنیادی والٹ سبسکرپشن کے بغیر آف لائن کام کرتا ہے۔ **Pro** حدود بڑھاتا ہے اور ایسی اضافی چیزیں کھولتا ہے جو ڈیوائسز پر sync، export یا ٹیم کے ساتھ share کرتے وقت اہم ہوتی ہیں۔ یہ عملی تقسیم — اور LAN Pro کی وہ بات جو اکثر لوگوں کو الجھاتی ہے۔

## کیا مفت رہتا ہے

- مقامی خفیہ شدہ والٹ (freemium caps کے ساتھ — نیچے دیکھیں)
- Self-hosted [سرور sync](/ur/guide/server) (صرف ciphertext)
- سسٹم Autofill / passkeys جہاں OS اجازت دے
- ان لاک شدہ desktop ایپ سے [براؤزر ایکسٹینشن](/ur/guide/extension) bridge
- Bitwarden، براؤزر CSVs، KeePass وغیرہ سے **Import**

مفت tier کی حدود (mobile/desktop builds جو Pro نافذ کرتے ہیں): **50** login entries؛ **3** collections، payment cards، crypto wallets، اور developer secrets ہر ایک۔

## Pro کیا کھولتا ہے

| صلاحیت | نوٹس |
|--------|------|
| لامحدود entries / collections / cards / crypto / secrets | مفت caps ہٹاتا ہے |
| **Export** + خفیہ شدہ **`.okbak`** backup | exports کو خفیہ سمجھیں |
| **Nearby** LAN والٹ sync | QR pair، vault link، entry بھیجیں — [گائیڈ](/ur/guide/nearby) |
| Organizations اور sharing | وہی self-hosted سرور |
| entries پر attachments | ~20 MB ہر ایک، سرور پر ciphertext |
| حسبِ منشا app icon | جہاں پلیٹ فارم سپورٹ کرے |

مکمل matrix: [قیمتیں](/ur/pricing) · [ایپ کا استعمال → Free بمقابلہ Pro](/ur/guide/app#free-vs-openkey-pro)۔

## LAN Pro store receipt نہیں

ایسے پلیٹ فارمز پر جہاں store in-app purchase **نہیں** (عام طور پر Windows / Linux)، Pro peer **Nearby** پر **LAN Pro** attestation شیئر کر سکتا ہے تاکہ دوسری ڈیوائس LAN پر Pro limits کھولے۔

- صرف سہولت — خریداری کا **کرپٹوگرافک ثبوت نہیں**
- Android، iOS اور macOS **LAN Pro نظرانداز** کرتے ہیں؛ اس store پر Pro خریدیں یا restore کریں
- Unpairing attestation روک دیتی ہے


## مزید پڑھیں

- [قیمتیں](/ur/pricing) — منصوبے، خریداری، منسوخی
- [بغیر سرور Nearby](/ur/blog/nearby-without-a-server)
- [Import اور export](/ur/guide/import-export)
- [Sharing اور organizations](/ur/guide/sharing)
- [FAQ](/ur/guide/faq)
- [سیکیورٹی](/ur/guide/security)
