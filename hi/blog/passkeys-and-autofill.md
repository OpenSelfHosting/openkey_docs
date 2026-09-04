---
title: ब्राउज़र में passkeys और autofill
description: OpenKey ब्राउज़र और system credential provider में logins और passkeys कैसे भरता है — vault डेटा क्लाइंट पर एन्क्रिप्टेड रहते हुए।
date: 2026-08-02
cover: /blog/covers/passkeys-and-autofill.svg
---

# ब्राउज़र में passkeys और autofill

आपके फ़ोन पर vault कहानी का आधा हिस्सा है। रोज़मर्रा का login Chrome, Firefox और OS credential UI में होता है — इसलिए OpenKey **MV3** ब्राउज़र एक्सटेंशन और mobile/desktop पर system Autofill / Credential Provider support देता है।

## एक्सटेंशन क्या करता है

- आपके vault के विरुद्ध unlock (डेस्कटॉप ऐप का local bridge, और/या self-hosted sync)
- web forms पर matching logins सुझाता है
- WebAuthn / passkey flows support करता है जहाँ साइट उन्हें देती है
- sync पर ऐप के **समान** server URL उपयोग करता है

`openkey_extension` से build और load करें:

```bash
cd openkey_extension
npm install
npm run build
```

`dist/` folder को unpacked extension के रूप में load करें। डेस्कटॉप पर OpenKey ऐप unlock करें और native messaging host register करें, या standalone mode में अपने सर्वर के विरुद्ध एक्सटेंशन unlock करें। sync उपयोग करें तो Options में server URL सेट करें, फिर email और मास्टर पासवर्ड से unlock करें।

## system Autofill भी

ऐप में **Settings → Security** के तहत OpenKey को system password और passkey provider के रूप में सक्षम करें। यह path उन apps और browsers को कवर करता है जो OS credential store से बात करते हैं — एक्सटेंशन के पूरक, हर platform पर प्रतिस्थापन नहीं।

## अभी भी zero-knowledge

Autofill क्लाइंट पर unlock के बाद चलता है। एक्सटेंशन या OS provider केवल ज़रूरी चीज़ decrypt करता है। sync — यदि सक्षम — अभी भी अपारदर्शी ciphertext exchange करता है। समझौता हुआ sync database भरे पासवर्ड का dump नहीं बनता। untrusted web pages को केवल intentional autofill mediation से secrets मिलने चाहिए।

## बाकी stack के साथ जोड़ें

| Client | भूमिका |
|--------|--------|
| ऐप | फ़ोन और डेस्कटॉप पर रोज़मर्रा का vault; system Autofill / passkeys |
| एक्सटेंशन | Chrome / Firefox में autofill और passkeys |
| CLI | Developer secrets और generation |
| सर्वर | वैकल्पिक ciphertext sync |

## और जानें

- [ऐप का उपयोग](/hi/guide/app) — Autofill, browser, और backups
- [पैकेज](/hi/guide/packages) — एक्सटेंशन setup
- [सर्वर सेटअप](/hi/guide/server) — एक्सटेंशन को अपने host से कनेक्ट करें
- [सुरक्षा](/hi/guide/security) — extension और native messaging के लिए trust boundaries
