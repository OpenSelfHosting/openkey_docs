---
title: अपना password vault self-host क्यों करें
description: नियंत्रण, गोपनीयता, और ciphertext-only sync सर्वर — Docker के साथ अपने हार्डवेयर पर OpenKey कैसे चलाएँ।
date: 2026-08-03
cover: /blog/covers/self-host-your-vault.png
---

# अपना password vault self-host क्यों करें

पासवर्ड मैनेजर आपके डिजिटल जीवन के केंद्र में हैं। जब वह vault केवल किसी और के क्लाउड पर रहता है, outages, policy changes और breaches *आपका* जोखिम बन जाते हैं। Self-hosting डिफ़ॉल्ट पलट देता है: आप मशीन, backups और API तक कौन पहुँच सकता है चुनते हैं।

## आप क्या नियंत्रित करते हैं

| आपके पास | सर्वर को कभी नहीं मिलता |
|----------|------------------------|
| ciphertext कहाँ संग्रहीत है | मास्टर पासवर्ड |
| upgrades और backups कब चलते हैं | Plaintext vault keys |
| कौन से clients connect कर सकते हैं (`CORS_ORIGINS`, HTTPS) | पढ़ने योग्य entry names या passwords |
| sync चालू है या नहीं | Decrypted attachments या shares |

OpenKey ऐप स्थानीय एन्क्रिप्टेड database के साथ ऑफ़लाइन काम करता है। multi-device sync चाहिए तो **Settings → Data → Self-hosted server** अपनी instance पर point करें — दोनों तरह same zero-knowledge rules। कम से कम एक **encrypted local backup** रखना बेहतर; सर्वर भूले मास्टर पासवर्ड recover नहीं कर सकता।

## एक व्यावहारिक आकार

कई लोग home NAS या छोटे VPS पर Docker से शुरू करते हैं:

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # JWT_SECRET (min 32 characters; placeholders are rejected)
docker compose up --build -d
```

सामने TLS लगाएँ (Caddy, Traefik, या अपना reverse proxy), लंबा unique `JWT_SECRET` सेट करें, और `CORS_ORIGINS` अपने ऐप और extension origins तक सीमित करें — कभी `*` नहीं। फिर पहले डिवाइस से **Register** करें और बाकी से **Login**, और explicit pull/push के लिए **Sync now** उपयोग करें।

## सर्वर के बिना LAN

यदि केवल एक ही Wi‑Fi पर डिवाइस चाहिए, **Nearby** vault sync (Pro) PostgreSQL के बिना LAN पर vaults pair और link कर सकता है। सुविधा के लिए उपयोग करें; आपदा recovery के लिए ऑफ़लाइन backups रखें।

## यह किसके लिए है

- SaaS vault के बिना sync चाहने वाले व्यक्ति
- shared collections चाहने वाली टीमें लेकिन crypto clients पर रखती हैं
- पहले से PostgreSQL चलाने वाले और Compose से सहज developers

OpenKey स्थानीय रूप से उपयोग करने के लिए self-host ज़रूरी नहीं। जब **अपना** sync plane चाहिए — ciphertext-only storage कठिन नियम के साथ — तब self-host करें।

## अगले कदम

- [सर्वर सेटअप](/hi/guide/server) — install, configure, और clients लिंक करें
- [ऐप का उपयोग](/hi/guide/app) — vault workflows, Nearby, import/export
- [सुरक्षा](/hi/guide/security) — hardening checklist और threat model
- [अवलोकन](/hi/guide/overview) — packages और zero-knowledge मॉडल
