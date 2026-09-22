---
title: Zero-knowledge sync समझाया गया
description: OpenKey सर्वर को plaintext दिए बिना डिवाइसों में vaults कैसे sync करता है — Argon2id, auth hashes, और ciphertext-only storage।
date: 2026-08-04
cover: /blog/covers/zero-knowledge-sync.png
---

# Zero-knowledge sync समझाया गया

Sync उपयोगी है। दूर की मशीन पर अपने पासवर्ड भरोसा करना नहीं। OpenKey इन विचारों को अलग करता है: आप फ़ोन, डेस्कटॉप और ब्राउज़र एक्सटेंशन में sync कर सकते हैं जबकि सर्वर केवल **ciphertext** संग्रहीत करता है।

## यहाँ «zero-knowledge» का मतलब

1. आपका मास्टर पासवर्ड डिवाइस पर रहता है। क्लाइंट email + मास्टर पासवर्ड और salt से **Argon2id** से master key derive करते हैं।
2. Login `auth_hash` भेजता है — पासवर्ड जानने का प्रमाण पर्याप्त, उसे पुनर्प्राप्त करने के लिए नहीं।
3. **vault key** collection names और entry payloads को **AES-256-GCM** से एन्क्रिप्ट करती है। सर्वर केवल wrapped (एन्क्रिप्टेड) vault key रखता है, plaintext key कभी नहीं।
4. attachments, organization names और share payloads डिवाइस छोड़ने से पहले ही एन्क्रिप्टेड होते हैं। sync API अपारदर्शी blobs persist करता है; डेटाबेस कॉपी होने पर भी decrypt नहीं कर सकता।

## सर्वर किस लिए है

वैकल्पिक OpenKey सर्वर sync और auth surface है:

- खाता registration और login (`auth_hash` के ज़रिए)
- एन्क्रिप्टेड vault payloads का push / pull (प्रति-item `revision` पर last-write-wins)
- organizations और shares — अभी भी विश्राम पर ciphertext
- short-lived access JWTs और hashed, rotated refresh tokens

यह आपका vault पुनर्निर्माण करने की जगह **नहीं** है। यदि आप सर्वर URL कभी configure न करें, ऐप स्थानीय एन्क्रिप्टेड vault की तरह चलता है। **मास्टर पासवर्ड recovery भी नहीं**: यदि खो दें तो ciphertext अपुनर्प्राप्य — ऑफ़लाइन बैकअप रखें।

## LAN पर Nearby

PostgreSQL खड़ा किए बिना multi-device sync चाहिए? **Nearby** (Pro) स्थानीय Wi‑Fi पर डिवाइसों को pair करता है, shared vault key लिंक करता है, और उसी LWW नियम से उनके बीच ciphertext sync करता है। pairing और vault link को full vault trust मानें; यह एन्क्रिप्टेड बैकअप का विकल्प नहीं।

## यह मॉडल क्यों मायने रखता है

क्लाउड पासवर्ड मैनेजर अपने infrastructure और operators पर भरोसा माँगते हैं। OpenKey केवल storage और uptime के लिए **आपके** host (या आपके नियंत्रण वाले VPS) पर भरोसा माँगता है — secrets पर नहीं। चोरी हुआ डेटाबेस चोरी हुआ vault नहीं।

## और गहराई से

- [सुरक्षा](/hi/guide/security) — key derivation, threat model, और operational checklist
- [सर्वर सेटअप](/hi/guide/server) — Docker sync इंस्टॉल करें और clients लिंक करें
- [ऐप का उपयोग](/hi/guide/app) — Nearby, backups, और रोज़मर्रा का vault उपयोग
- [Quick start](/hi/guide/quick-start) — stack स्थानीय रूप से चलाएँ
