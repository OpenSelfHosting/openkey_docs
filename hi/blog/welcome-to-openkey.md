---
title: OpenKey में आपका स्वागत है
description: हमने self-hosted पासवर्ड मैनेजर क्यों बनाया जो केवल ciphertext संग्रहीत करता है — और ऐप, सर्वर, एक्सटेंशन और CLI में क्या उपलब्ध है।
date: 2026-08-05
cover: /blog/covers/welcome-to-openkey.svg
---

# OpenKey में आपका स्वागत है

अधिकांश पासवर्ड मैनेजर आपसे ऐसे क्लाउड पर भरोसा करने को कहते हैं जिसे आप नियंत्रित नहीं करते। OpenKey दूसरा रास्ता अपनाता है: आपका vault डिवाइस पर एन्क्रिप्टेड रहता है, वैकल्पिक sync सर्वर **केवल ciphertext** रखता है, और मास्टर पासवर्ड कभी क्लाइंट नहीं छोड़ते।

## केवल ciphertext

क्लाइंट vault डेटा को डिवाइस छोड़ने से पहले एन्क्रिप्ट करते हैं। sync API — यदि उपयोग करें — अपारदर्शी blobs संग्रहीत करता है। collection names, entry payloads, attachments, organization names और share data विश्राम पर ciphertext रहते हैं। डेटाबेस से समझौता salts, KDF parameters, wrapped keys और blobs देता है — पढ़ने योग्य logins नहीं।

## आज क्या उपलब्ध है

| हिस्सा | भूमिका |
|--------|--------|
| **ऐप** | Android, iOS, macOS, Linux और Windows पर रोज़मर्रा का vault — logins, cards, crypto wallets, developer secrets, organizations और sharing |
| **सर्वर** | FastAPI + PostgreSQL zero-knowledge sync API जिसे आप self-host कर सकते हैं |
| **एक्सटेंशन** | Chrome और Firefox के लिए MV3 autofill और passkeys |
| **CLI** | ऑफ़लाइन password generation, local secret discovery, और वैकल्पिक sync |

आप **Nearby** (Pro) से एक ही Wi‑Fi पर डिवाइसों के बीच vault sync भी कर सकते हैं — उस LAN path के लिए सर्वर आवश्यक नहीं। सर्वर sync और Nearby दोनों केवल ciphertext ले जाते हैं (revision के अनुसार last-write-wins)।

## शुरू करें

- [Quick start](/hi/guide/quick-start) — stack स्थानीय रूप से चलाएँ
- [ऐप का उपयोग](/hi/guide/app) — फ़ोन और डेस्कटॉप पर vault workflows
- [सुरक्षा](/hi/guide/security) — zero-knowledge मॉडल और trust boundaries
- [सर्वर सेटअप](/hi/guide/server) — अपना sync host इंस्टॉल और लिंक करें

ब्लॉग पर और भी: [zero-knowledge sync](/hi/blog/zero-knowledge-sync), [सर्वर के बिना Nearby](/hi/blog/nearby-without-a-server), [self-hosting](/hi/blog/self-host-your-vault), [passkeys और autofill](/hi/blog/passkeys-and-autofill), और [developer CLI](/hi/blog/cli-for-developers)। कोड [GitHub पर OpenSelfHosting](https://github.com/OpenSelfHosting) के तहत है।
