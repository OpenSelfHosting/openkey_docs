---
title: بغیر سرور Nearby
description: Wi‑Fi پر peers دریافت کریں، سیٹ اپ پر vault کاپی کریں یا LAN sync کے لیے vaults لنک کریں — self-hosted API درکار نہیں۔
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.png
---

# بغیر سرور Nearby

Self-hosted sync API طاقتور ہے — اور اختیاری۔ **Nearby** (OpenKey Pro) آپ کے مقامی نیٹ ورک پر وہی zero-knowledge رویہ رکھتا ہے: ڈیوائسز ایک دوسرے کو دریافت کرتی ہیں، session key کے لیے pair ہوتی ہیں، اور آپ یا تو سیٹ اپ پر نئی ڈیوائس پر **vault کاپی** کرتے ہیں یا جاری merge sync کے لیے واضح طور پر **Trust & link vault** کرتے ہیں۔ صرف pairing کبھی خود بخود vault key share نہیں کرتی۔

## کب استعمال کریں

- ایک ہی گھر یا دفتر Wi‑Fi پر آپ کی دو یا زیادہ ڈیوائسز
- Docker / Postgres کھڑا کیے بغیر sync چاہیے
- **نیا فون یا ڈیسک ٹاپ** کو `.okbak` فائل کے بغیر مکمل vault کاپی ملنی چاہیے
- مکمل vault pull کے بغیر ایک login کے لیے یک بار **Send to device** چاہیے

Merge sync **backup نہیں**۔ آف لائن Pro [خفیہ شدہ `.okbak`](/ur/guide/import-export) رکھیں۔ Guest networks اور client isolation discovery توڑ دیتے ہیں — عام LAN segment استعمال کریں۔

## نئی ڈیوائس پر vault کاپی کریں

1. موجودہ ڈیوائس unlock کریں → **Settings → Nearby devices** → **Visible on local network**۔
2. نئی ڈیوائس پر first-run setup chooser میں **Nearby device** منتخب کریں۔
3. Peer پر ٹیپ کریں → confirm کریں → **اسی master password** سے unlock کریں۔

یہ session-encrypted مکمل vault archive بھیجتا ہے (attachments سمیت)۔ تفصیل: [Nearby → Setup پر vault کاپی](/ur/guide/nearby#setup-پر-vault-کاپی-کریں-vault-clone)۔

## جاری sync کے لیے pair کریں

1. دونوں ڈیوائسز پر OpenKey unlock کریں → **Settings → Nearby devices**۔
2. **Visible on local network** فعال کریں۔
3. Pair کرنے کے لیے discovered peer پر ٹیپ کریں (discovery مشکل ہو تو مختصر code تقریباً دو منٹ کے اندر اب بھی کام کرتا ہے)۔
4. **Trust & link vault** دبائیں تاکہ دونوں ایک ہی vault-key fingerprint share کریں۔

اگر Mac firewall inbound TCP روکے تو OpenKey advertising host سے dial back مانگ سکتا ہے — OS network prompts اجازت دیں۔

## لنک کے بعد

تبدیلیاں sync ہوتی ہیں جب دونوں vaults unlock ہوں اور Nearby advertise کر رہا ہو (**revision کے لحاظ سے last-write-wins**، سرور جیسا ہی اصول)۔ Trusted ڈیوائسز خود reconnect ہوتی ہیں؛ اختیاری **Trusted networks only** آپ کے SSIDs سے باہر Nearby روک دیتی ہے۔ **Unpair** LAN trust اور LAN Pro claims منسوخ کرتا ہے۔

## LAN Pro، مختصراً

Windows / Linux (بغیر store IAP) پر **vault-linked** Pro peer **LAN Pro** attestation شیئر کر سکتا ہے تاکہ دوسری ڈیوائس Pro limits کھولے۔ بغیر link pairing کافی نہیں۔ Android، iOS اور macOS اسے نظرانداز کرتے ہیں — store پر Pro خریدیں یا restore کریں۔ Attestation کو سہولت سمجھیں، خریداری کا کرپٹوگرافک ثبوت نہیں۔

## مزید پڑھیں

- مکمل walkthrough: [Nearby LAN sync](/ur/guide/nearby)
- Threat model: [سیکیورٹی](/ur/guide/security)
- ایپ Pro matrix: [ایپ کا استعمال](/ur/guide/app)
- FAQ troubleshooting: [Nearby دوسری ڈیوائس نہیں ڈھونڈتا](/ur/guide/faq)
