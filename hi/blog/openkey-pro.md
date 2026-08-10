---
title: OpenKey Pro — क्या unlock होता है (और क्या नहीं)
description: Free बनाम Pro limits, Nearby और LAN Pro, store IAP बनाम desktop, और हर platform पर क्या मुफ़्त रहता है।
date: 2026-08-06
cover: /blog/covers/openkey-pro.svg
---

# OpenKey Pro — क्या unlock होता है (और क्या नहीं)

OpenKey का core vault बिना subscription ऑफ़लाइन काम करता है। **Pro** limits बढ़ाता है और extras unlock करता है जब आप डिवाइसों में sync, export, या टीम के साथ share करते हैं। यहाँ व्यावहारिक विभाजन — और LAN Pro caveat जो अक्सर भ्रमित करता है।

## क्या मुफ़्त रहता है

- स्थानीय एन्क्रिप्टेड vault (freemium caps के साथ — नीचे)
- Self-hosted [server sync](/hi/guide/server) (केवल ciphertext)
- जहाँ OS अनुमति दे system Autofill / passkeys
- unlocked desktop ऐप का [browser extension](/hi/guide/extension) bridge
- Bitwarden, browser CSVs, KeePass और अधिक से **Import**

Free tier caps (Pro enforce करने वाले mobile/desktop builds): **50** login entries; **3** collections, payment cards, crypto wallets, और developer secrets प्रत्येक।

## Pro क्या unlock करता है

| क्षमता | नोट्स |
|--------|-------|
| असीमित entries / collections / cards / crypto / secrets | free caps हटाता है |
| **Export** + encrypted **`.okbak`** backup | exports को secret मानें |
| **Nearby** LAN vault sync | QR pair, link vault, send entry — [guide](/hi/guide/nearby) |
| Organizations और sharing | वही self-hosted server |
| entries पर attachments | प्रत्येक ~20 MB, सर्वर पर ciphertext |
| Custom app icon | जहाँ platform support करे |

पूर्ण matrix: [Pricing](/hi/pricing) · [ऐप का उपयोग → मुफ़्त बनाम Pro](/hi/guide/app#मुफ़्त-बनाम-openkey-pro)।

## LAN Pro store receipt नहीं है

**बिना** store in-app purchase वाले platforms (आमतौर पर Windows / Linux) पर Pro peer Nearby के ज़रिए **LAN Pro** attestation साझा कर सकता है ताकि दूसरा डिवाइस LAN पर Pro limits unlock करे।

- केवल सुविधा — खरीदारी का **cryptographic proof नहीं**
- Android, iOS, और macOS LAN Pro **ignore** करते हैं; उस store पर Pro खरीदें या restore करें
- Unpairing attestation रोकता है

## Web builds

**Web builds अभी Pro enforce नहीं करते।** Mobile और desktop store/desktop builds करते हैं। browser में test करें तो उसी हिसाब से plan करें।

## और गहराई से

- [Pricing](/hi/pricing) — plans, खरीदना, cancel
- [सर्वर के बिना Nearby](/hi/blog/nearby-without-a-server)
- [Import और export](/hi/guide/import-export)
- [Sharing और organizations](/hi/guide/sharing)
- [FAQ](/hi/guide/faq)
- [सुरक्षा](/hi/guide/security)
