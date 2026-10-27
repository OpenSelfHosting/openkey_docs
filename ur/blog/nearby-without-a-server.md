---
title: بغیر سرور Nearby
description: QR codes سے Wi‑Fi پر ڈیوائسز pair کریں، vaults لنک کریں، اور LAN پر ciphertext sync کریں — self-hosted API درکار نہیں۔
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.png
---

# بغیر سرور Nearby

Self-hosted sync API طاقتور ہے — اور اختیاری۔ **Nearby** (OpenKey Pro) آپ کے مقامی نیٹ ورک پر وہی zero-knowledge رویہ رکھتا ہے: ڈیوائسز pair ہوتی ہیں، آپ واضح طور پر **Trust & link vault** کرتے ہیں، اور تب ہی vault-key material منتقل ہوتا ہے تاکہ peers **ciphertext** sync کر سکیں۔ صرف pairing کبھی خود بخود vault key share نہیں کرتی۔

## کب استعمال کریں

- ایک ہی گھر یا دفتر Wi‑Fi پر آپ کی دو یا زیادہ ڈیوائسز
- Docker / Postgres کھڑا کیے بغیر sync چاہیے
- مکمل vault pull کے بغیر ایک login کے لیے یک بار **Send to device** چاہیے

یہ **backup نہیں**۔ آف لائن Pro [خفیہ شدہ `.okbak`](/ur/guide/import-export) رکھیں۔ Guest networks اور client isolation discovery توڑ دیتے ہیں — عام LAN segment استعمال کریں۔

## QR سے pair کریں (ترجیحی)

1. دونوں ڈیوائسز پر OpenKey unlock کریں → **Settings → Nearby devices**۔
2. **Visible on local network** فعال کریں۔
3. ایک ڈیوائس پر pairing QR دکھائیں؛ دوسری پر **Scan pairing QR** (یا Linux/Windows desktop پر **Paste pairing QR**)۔
4. **Trust & link vault** دبائیں تاکہ دونوں ایک ہی vault-key fingerprint share کریں۔

مختصر code لکھنا بھی تقریباً دو منٹ کے اندر کام کرتا ہے۔ اگر Mac firewall scan کے بعد inbound TCP روکے تو OpenKey QR host سے dial back مانگ سکتا ہے — OS network prompts اجازت دیں۔

## لنک کے بعد

تبدیلیاں sync ہوتی ہیں جب دونوں vaults unlock ہوں اور Nearby advertise کر رہا ہو (**revision کے لحاظ سے last-write-wins**، سرور جیسا ہی اصول)۔ Trusted ڈیوائسز خود reconnect ہوتی ہیں؛ اختیاری **Trusted networks only** آپ کے SSIDs سے باہر Nearby روک دیتی ہے۔ **Unpair** LAN trust اور LAN Pro claims منسوخ کرتا ہے۔

## LAN Pro، مختصراً

Windows / Linux (بغیر store IAP) پر **vault-linked** Pro peer **LAN Pro** attestation شیئر کر سکتا ہے تاکہ دوسری ڈیوائس Pro limits کھولے۔ بغیر link pairing کافی نہیں۔ Android، iOS اور macOS اسے نظرانداز کرتے ہیں — store پر Pro خریدیں یا restore کریں۔ Attestation کو سہولت سمجھیں، خریداری کا کرپٹوگرافک ثبوت نہیں۔

## مزید پڑھیں

- مکمل walkthrough: [Nearby LAN sync](/ur/guide/nearby)
- Threat model: [سیکیورٹی](/ur/guide/security)
- ایپ Pro matrix: [ایپ کا استعمال](/ur/guide/app)
- FAQ troubleshooting: [Nearby دوسری ڈیوائس نہیں ڈھونڈتا](/ur/guide/faq)
