---
title: सर्वर के बिना Nearby
description: QR codes से Wi‑Fi पर डिवाइस पेयर करें, vaults लिंक करें, और LAN पर ciphertext sync करें — self-hosted API आवश्यक नहीं।
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.png
---

# सर्वर के बिना Nearby

Sync API self-host करना शक्तिशाली है — और वैकल्पिक। **Nearby** (OpenKey Pro) आपके स्थानीय नेटवर्क पर वही zero-knowledge posture रखता है: डिवाइस pair होते हैं, आप स्पष्ट रूप से **Link vault** करते हैं, और तभी vault-key material चलता है ताकि peers **ciphertext** sync कर सकें। केवल pairing vault key auto-share नहीं करता।

## कब उपयोग करें

- एक ही घर या ऑफ़िस Wi‑Fi पर आपके दो या अधिक डिवाइस
- अभी Docker / Postgres खड़ा किए बिना sync चाहिए
- पूर्ण vault pull के बिना एक login के लिए one-off **Send to device** चाहिए

यह **backup नहीं** है। Pro [encrypted `.okbak`](/hi/guide/import-export) ऑफ़लाइन रखें। guest networks और client isolation discovery तोड़ते हैं — सामान्य LAN segment उपयोग करें।

## QR से पेयर करें (प्राथमिक)

1. दोनों डिवाइस पर OpenKey unlock करें → **Settings → Nearby devices**।
2. **Visible on local network** चालू करें।
3. एक डिवाइस पर pairing QR दिखाएँ; दूसरे पर **Scan pairing QR** (या Linux/Windows डेस्कटॉप पर **Paste pairing QR**)।
4. **Link vault** टैप करें ताकि दोनों एक ही vault-key fingerprint साझा करें।

लगभग दो मिनट के भीतर short code टाइप करना अभी भी काम करता है। यदि scan के बाद Mac firewall inbound TCP ब्लॉक करे, OpenKey QR host से dial-back कर सकता है — OS network prompts की अनुमति दें।

## लिंक के बाद

दोनों vaults unlocked और Nearby advertising चालू रहने पर changes sync होते हैं (**revision के अनुसार last-write-wins**, सर्वर जैसा ही नियम)। trusted devices स्वचालित reconnect होते हैं; वैकल्पिक **Trusted networks only** आपके SSIDs के बाहर Nearby रोकता है। **Unpair** LAN trust और LAN Pro claims revoke करता है।

## LAN Pro, संक्षेप में

Windows / Linux (कोई store IAP नहीं) पर, **vault-linked** Pro peer **LAN Pro** attestation साझा कर सकता है ताकि दूसरा डिवाइस Pro limits unlock करे। link के बिना pairing पर्याप्त नहीं। Android, iOS और macOS इसे ignore करते हैं — store पर Pro खरीदें या restore करें। attestation को सुविधा मानें, cryptographic purchase proof नहीं।

## और गहराई से

- पूर्ण walkthrough: [Nearby LAN sync](/hi/guide/nearby)
- Threat model: [सुरक्षा](/hi/guide/security)
- ऐप Pro matrix: [ऐप का उपयोग](/hi/guide/app)
- FAQ troubleshooting: [Nearby दूसरा डिवाइस नहीं ढूँढता](/hi/guide/faq)
