---
title: "Self-hosted password manager: इसके लिए सचमुच क्या चाहिए"
description: Docker के साथ अपना password manager sync server चलाना — self-hosted vault वास्तव में आपको क्या देता है, इसकी क्या कीमत है, और पूरा setup व hardening checklist।
date: 2026-09-22
cover: /blog/covers/self-hosted-password-manager.png
---

# Self-hosted password manager: इसके लिए सचमुच क्या चाहिए

पासवर्ड मैनेजर को self-host करने का मतलब है encrypted-sync server खुद चलाना। आपके clients डिवाइस पर एन्क्रिप्ट करते हैं; जिस server का आप संचालन करते हैं वह ciphertext संग्रहीत करता है और आपकी पहचान सत्यापित करता है। उस server के चोरी-छपी होने पर आपको पासवर्ड list नहीं, एक एन्क्रिप्टेड blob मिलता है।

यह एक असली और टिकाऊ जीत है। यह साथ में एक maintenance commitment भी है, और इस लेख का ईमानदार संस्करण दोनों बताता है।

## Self-hosting असल में क्या बदलता है

इस बारे में सटीक रहें, क्योंकि यहीं अपेक्षाएँ गड़बड़ होती हैं:

| | Vendor cloud | Self-hosted |
|---|--------------|-------------|
| आपका vault कौन पढ़ सकता है | कोई नहीं, यदि zero-knowledge | कोई नहीं, यदि zero-knowledge |
| आपका vault कौन **मिटा** सकता है | Vendor | आप |
| Metadata कौन देखता है | Vendor | आप |
| Data सौंपने पर किसे बाध्य किया जा सकता है | Vendor, उसके jurisdiction में | आप, आपके jurisdiction में |
| Uptime की ज़िम्मेदारी | Vendor | आप |
| TLS, patching, backups | Vendor | आप |
| लागत | Subscription | Server + आपका समय |

Confidentiality का दावा नहीं बदलता। जो बदलता है वह है **storage plane पर नियंत्रण** और यह कि trust chain में कौन है। Self-hosting एक तीसरा पक्ष हटाता है; यह कोई cryptography नहीं जोड़ता।

## यह कब सार्थक है

- आप पहले से services चलाते हैं और आपके पास कोई NAS, homelab, या छोटा VPS है।
- आपके threat model में "provider compromised या बाध्य है" शामिल है।
- आप ऐसे jurisdiction में हैं जहाँ किसी और का data-hosting ज़िम्मेदारी बन जाता है।
- आप ऐसी infrastructure पर टीम के लिए shared collections चाहते हैं जिसकी आप audit करते हैं।
- आप उस किस्म के व्यक्ति हैं जिसे पाँच मिनट का Docker Compose और एक cron job पसंद है।

## यह कब सार्थक नहीं है

- आपने कभी reverse proxy नहीं चलाया और पहले TLS, DNS, और firewall rules सीखने पड़ेंगे।
- किसी को patch करना याद नहीं रहेगा। बिना patch किया सर्वर सुरक्षा की जीत नहीं, ज़िम्मेदारी है।
- आप एक ही डिवाइस पर अकेले उपयोगकर्ता हैं। तो server पूरी तरह छोड़ दें और local vault इस्तेमाल करें।
- आपको किसी business-critical system के लिए guaranteed uptime चाहिए, लेकिन कोई backup plan नहीं है।

पिछले दो मामलों के लिए एक बीच का रास्ता है: एक **local encrypted vault** जो आपके अपने डिवाइसों के लिए [Nearby LAN sync](/hi/blog/nearby-without-a-server) से जुड़ा हो, और बिल्कुल कोई server नहीं।

## पाँच मिनट में सेट अप करना

OpenKey Server एक FastAPI application है जिसमें PostgreSQL है, जो Docker Compose stack के रूप में आता है।

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32      # paste this into JWT_SECRET in .env
docker compose up --build -d
```

फिर पुष्टि करें कि यह healthy है:

| URL | उद्देश्य |
|-----|---------|
| `http://localhost:8000` | API base |
| `http://localhost:8000/docs` | OpenAPI docs |
| `http://localhost:8000/health` | Health check |

Schema migrations startup पर अपने आप चलते हैं। किसी client को **Settings → Data → Self-hosted server** से जोड़ें, फिर पहले डिवाइस पर **Register** करें और बाक़ी पर **Login**। पूरा विवरण: [Server setup](/hi/guide/server)।

## Hardening checklist

यह वह हिस्सा है जिसे लोग छोड़ देते हैं, और यही तय करता है कि self-hosting मदद कर पाया या नहीं। [security guide](/hi/guide/security) से:

### बिना समझौते के

1. **कम से कम 32 वर्णों का एक अलग `JWT_SECRET`।** Placeholder values startup पर अस्वीकार कर दिए जाते हैं। कोई generate करें; उदाहरण कॉपी न करें।
2. **मान्य certificate के साथ HTTPS।** Clients platform की TLS stack का उपयोग करते हैं, certificate pinning के बिना, इसलिए टाइप-एक गलत `http://` URL या खराब certificate login और sync पर man-in-the-middle को संभव बना देता है। TLS को Caddy, nginx, या अपने load balancer पर terminate करें।
3. **एक स्पष्ट `CORS_ORIGINS` allow-list।** कभी `*` नहीं। अगर आप browser extension इस्तेमाल करते हैं, तो उसके `chrome-extension://` और `moz-extension://` origins साफ़-साफ़ जोड़ें।
4. **Postgres और raw API port निजी रहें।** केवल reverse proxy को expose करें।
5. **Proxy पर HSTS**, ताकि browsers पहली visit के बाद कभी HTTP पर लौटें नहीं।

### दृढ़ता से अनुशंसित

6. **Reverse proxy पर rate limits।** API का built-in limiter in-memory है और **प्रति worker process**, इसलिए कई workers या replicas होने पर असरदार सीमा गुणा हो जाती है। nginx में `limit_req` जोड़ें, या edge पर Caddy rate limits लगाएँ।
7. **`TRUST_PROXY_HEADERS=true` तभी सेट करें, जब proxy `X-Forwarded-For` को overwrite करता है** और आप उस रास्ते पर भरोसा करते हैं। वरना आपकी per-IP सीमाएँ user पर नहीं, proxy पर लागू होंगी।
8. **Email enumeration से सावधान रहें।** `POST /auth/prelogin` और `POST /auth/lookup-public-key` अज्ञात emails के लिए 404 लौटाते हैं, जो वैध clients की मदद करता है पर किसी को यह जाँचने देता है कि कौन-से पते registered हैं। कठोर rate limits, TLS, और अधिक संवेदनशील deployments के लिए वैकल्पिक रूप से VPN या IP allow-list।
9. **Postgres का backup लें और restore का परीक्षण करें।** वह पासवर्ड मैनेजर server जो कभी backup से restore नहीं हुआ, केवल एक परिकल्पना है।
10. **`/health` और API logs की निगरानी करें**; जवाब देना बंद कर दे तो alert लगाएँ।

## Self-hosted sync server क्या कर सकता है और क्या नहीं

| यह कर सकता है | यह नहीं कर सकता |
|--------|-----------|
| आपकी `auth_hash` से आपकी पहचान सत्यापित करना | आपका मास्टर पासवर्ड पढ़ना |
| entries, attachments, orgs और shares के लिए opaque ciphertext संग्रहीत करना | collection names या entry payloads decrypt करना |
| आपका data मिटाना या रोक रखना | भूला हुआ मास्टर पासवर्ड recover करना |
| Metadata देखना: email, ciphertext sizes, timings | database से आपका vault दोबारा बनाना |
| आपके द्वारा rate-limited, patched या restarted होना | आपके मास्टर पासवर्ड भूलने पर बच पाना |

चौथी पंक्ति को ध्यान से पढ़ें: self-hosted server आपको पासवर्ड भूलने से **नहीं** सुरक्षित बनाता। यह trust chain से एक पक्ष हटाता है और आपको उस operator के रूप में जोड़ता है जो data खो सकता है। [Forgotten master password](/hi/blog/forgot-master-password) बचाव का पक्ष संभालता है।

## Sync semantics जिन्हें भरोसा करने से पहले जान लेना चाहिए

- **Last-write-wins, प्रति-item `revision` के हिसाब से — CRDT नहीं।** दो डिवाइस पर एक साथ हुए edits एक-दूसरे को मिटा सकते हैं। जब मायने रखे, तो एक समय पर एक ही डिवाइस पर बदलाव करें।
- **Deletes tombstones के रूप में sync होते हैं** जब तक peers पीछे न हो जाएँ, इसलिए delete हर जगह तुरंत नहीं होता।
- **Nearby LAN sync वही LWW नियम इस्तेमाल करता है** paired, vault-linked devices के बीच।
- **दोनों में से कोई भी backup नहीं है।** कम से कम एक encrypted local backup रखें (OpenKey में `.okbak`)।

यह आख़िरी बात ही वह है जिसमें लोग सबसे ज़्यादा गलती करते हैं, और यही "मैंने अपना vault अपने सर्वर पर ले आया" और "मेरे पास एक recovery plan है" के बीच का अंतर है।

## Operator के लिए operational security

- Server ऐसे host पर चलाएँ जिसे आप तयशुदा समय पर patch करते हैं। बिना patch किया हुआ server vendor-hosted से भी बुरा है।
- `JWT_SECRET` को किसी secrets manager में रखें, या कम से कम 600-mode वाली file में — shell history में नहीं।
- Log retention एक ज़िम्मेदारी है: sync logs timings और sizes उजागर कर सकते हैं। उन्हें rotate करें और सीमित रखें।
- सिर्फ़ volume नहीं, **database** का backup लें, और हर तिमाही restores जाँचें।
- बिना TLS के API को कभी अविश्वसित network पर expose न करें।
- अगर आपको uptime guarantees चाहिए, तो load balancer के पीछे दूसरा host रखें और स्वीकार कर लें कि sync conflict resolution अब भी last-write-wins है।

## OpenKey server को हमलावर के लिए बेकार कैसे रखता है

- Clients email + मास्टर पासवर्ड + salt से **Argon2id** के ज़रिए master key derive करते हैं।
- Login एक **`auth_hash`** भेजता है, जो पासवर्ड बताए बिना ज्ञान साबित करता है।
- एक **vault key** collection names और entry payloads को **AES-256-GCM** से एन्क्रिप्ट करती है। सर्वर केवल एक wrapped vault key संग्रहीत करता है।
- Access JWTs अल्प-जीवन वाले होते हैं; refresh tokens संग्रहण पर hashed रहते हैं और उपयोग पर rotate होते हैं।
- Attachments ciphertext के रूप में sync होते हैं, हर एक 20 MB तक सीमित।

चुराया गया `postgres` dump हमलावर को salts, KDF parameters, wrapped keys, और blobs देता है। उसे crack करने का मतलब है Argon2id पर हमला करना, और फिर भी उसके पास ऐसा ciphertext रहता है जिसे वह key के बिना पढ़ नहीं सकता। यही पूरी security argument है, और यह ठीक इसलिए टिकती है क्योंकि मास्टर पासवर्ड कभी किसी client से बाहर नहीं गया।

## Search data क्या कहता है

Self-hosting एक छोटा पर असली cluster है, और यह "self-hosted" से कहीं ज़्यादा "open source" शब्द के इर्द-गिर्द जमा होता है। Google Trends (worldwide, last 12 months), इन terms की आपस में तुलना करते हुए:

| Query | Cluster में सापेक्ष रुचि |
|-------|-------------------------------|
| passbolt | 100 |
| **open source password manager** | **55** |
| password manager self hosted | 13 |
| self-hosted password manager | 4 |
| keepass alternative | 1 |

इसका मतलब यह है कि "open source" वह phrase है जिसे लोग पकड़ते हैं, और "self-hosted" वह phrase है जहाँ वे बाद में उतरते हैं — एक search जो एक पसंद से शुरू होकर एक implementation बन जाता है। "open source password manager" के तहत संबंधित queries भी यही दिशा बताते हैं: KeePass 100 पर, "open source password manager self hosted" 84 पर, और Passbolt 78 पर। शीर्ष तीन में से दो नाम हैं जिनकी लोग तुलना कर रहे हैं, किसी feature के विवरण नहीं।

head term के बगल में ये अब भी छोटे आँकड़े हैं। "Self-hosted password manager" एक niche का भी niche है, और ईमानदार निष्कर्ष यह है कि यह phrase खोजने वाले ज़्यादातर लोग technical users हैं जिन्हें पहले से पता है कि वे क्या चाहते हैं।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values normalized relative interest (0–100) हैं, search volumes नहीं।

## पाँच-मिनट का संस्करण

Self-hosting trust chain में provider की जगह आपको रख देता है। यह कोई cryptography नहीं जोड़ता, यह आपकी सूची में TLS, backups, patching, और rate limiting जोड़ता है। अगर आप पहले से services चलाते हैं: Compose stack, अलग `JWT_SECRET`, मान्य certificate के साथ HTTPS, स्पष्ट `CORS_ORIGINS`, और परीक्षित backups। अगर नहीं, तो इसके बजाय local encrypted vault और [Nearby LAN sync](/hi/blog/nearby-without-a-server) इस्तेमाल करें, और किसी भी हाल में कम से कम एक encrypted offline backup रखें।

## अगले कदम

- [अपना password vault self-host क्यों करें](/hi/blog/self-host-your-vault) — इसके पक्ष में तर्क
- [Zero-knowledge sync समझाया गया](/hi/blog/zero-knowledge-sync) — protocol
- [Server setup](/hi/guide/server) — install, configure, production hardening
- [Security](/hi/guide/security) — threat model और operator checklist
