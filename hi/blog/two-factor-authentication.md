---
title: पासवर्ड मैनेजर में two-factor authentication
description: 2FA और TOTP codes क्या होते हैं, authenticator seeds को उन logins के बगल में कैसे रखें जिनकी रक्षा वे करते हैं, और passkeys कैसे सब बदल देते हैं।
date: 2026-09-17
cover: /blog/covers/two-factor-authentication.png
---

# पासवर्ड मैनेजर में two-factor authentication

**Two-factor authentication (2FA)** का मतलब है कि आप सिर्फ़ अपने पासवर्ड से नहीं, दूसरे सबूत से यह साबित करें कि आप आप हैं। सबसे आम रूप authenticator app से आता घूमता हुआ छह-अंकों का कोड है — **TOTP** — जो एक shared seed से गणना किए गए time-based one-time password पर आधारित होता है।

अटपटा हिस्सा यह है कि seed और code आपके पासवर्ड से *अलग app* में रहते हैं। यह लेख mechanics समझाता है, बताता है कि seeds को पासवर्ड मैनेजर में रखना ही समझदार व्यवस्था क्यों है, और यह कि passkeys इसे कैसे बदल देते हैं।

## 2FA कैसे काम करता है

1. जब आप किसी साइट पर 2FA चालू करते हैं, तो वह आपको एक **secret** दिखाती है — आमतौर पर एक QR code के रूप में, जिसमें कोई `otpauth://` URI होता है।
2. आप उस secret को scan या paste करके किसी authenticator में डालते हैं।
3. हर 30 सेकंड में authenticator secret और मौजूदा समय से छह-अंकों का कोड गणना करता है: `HMAC(secret, floor(time/30))`।
4. साइट वही value गणना करती है। दोनों मिल जाएँ, तो आप अंदर हैं।

एक मिनट बाद यह कोड बेकार हो जाता है, और यही इसके काम करने की वजह है। लेकिन *secret* असल में एक स्थायी पासवर्ड है — जिसके पास भी यह हो, वह हमेशा valid codes बना सकता है।

## फ़ैसला: authenticator app, SMS, या passkey

| Method | Phishable | Server breach का असर | टिप्पणी |
|--------|-----------|----------------------|-------|
| SMS code | हाँ | नहीं | SIM swap और number recycling के प्रति संवेदनशील; फिर भी कुछ न होने से बेहतर |
| TOTP app / code | हाँ (seed theft) | नहीं | Offline काम करता है; secret सुरक्षित रखना ज़रूरी |
| Hardware key (FIDO2) | नहीं | नहीं | सबसे मज़बूत; backup के लिए दूसरे डिवाइस या key की ज़रूरत |
| Passkey | नहीं | नहीं | न टाइप करने को कुछ, न चुराने को कुछ; नीचे देखें |

Hardware keys और passkeys ही एकमात्र विकल्प हैं जो phishable नहीं हैं, क्योंकि credential कभी आपके डिवाइस से बाहर नहीं जाता और signing माँगने वाले origin से बँधा होता है।

## TOTP seeds आपके vault में क्यों होने चाहिए

आम सलाह यह है कि "अपना authenticator app अपने पासवर्ड मैनेजर से अलग रखें", इस ठीक-ठाक तर्क पर कि एक compromised app सब कुछ unlock न कर सके। व्यवहार में इससे एक बुरी समस्या बनती है: पासवर्ड और उसका second factor अलग-अलग जगह जमा होते हैं, इसलिए एक से recovery दूसरे के बिना असंभव हो जाता है, और लोग बार-बार 2FA दोबारा enroll करते रहते हैं।

बेहतर framing यह है: TOTP seed को **credential का हिस्सा** मानें, और उसी नियंत्रणों से उसकी रक्षा करें। अगर आपका vault मास्टर पासवर्ड और, आदर्शतः, किसी biometric के पीछे unlock होता है, तो seed उस पासवर्ड से कमज़ोर नहीं होता जिसकी रक्षा वह करता है — और वह हमेशा वहीं मौजूद रहता है जहाँ आपको उसे चाहिए।

ज़्यादातर मैनेजर इसका सीधा समर्थन करते हैं: secret paste करें, कोई `otpauth://` URI paste करें, या QR code सीधे entry में scan कर लें।

OpenKey में, authenticator secret या `otpauth` URI को login entry में जोड़ें, या साइट के 2FA setup screen से QR scan कर लें। जब भी vault unlocked होता है, codes दिखाई देते हैं, और system Autofill provider या browser extension उन्हें वहाँ भर सकता है जहाँ platform समर्थन करता है। Terminal से, CLI उन्हें सीधे पढ़ सकता है:

```bash
openkey totp "GitHub" -c     # copy the live code
openkey totp "GitHub" -w     # watch it refresh until you stop it
```

## किसी खाते पर 2FA सेट अप करना

1. Login करें और साइट की security settings खोलें।
2. Authenticator app चुनें, और **QR code scan करें** या secret हाथ से डालें।
3. उस secret की एक कॉपी उसी vault entry में सहेजें जहाँ username और password हैं।
4. पुष्टि के लिए मौजूदा कोड डालें।
5. साइट के **recovery codes** किसी ऐसी जगह सहेजें जो आपके नियंत्रण में हो — उसी vault में एक एन्क्रिप्टेड note, या छपा हुआ कॉपी offline रखा हुआ।

चरण 3 वही है जिसे लोग छोड़ देते हैं, और यही वह चरण है जो बाद में फ़ोन बदलने पर आपको बचा लेता है।

## पूरे खाते में इसे लागू करना

कुछ logins पर 2FA चालू हो जाने के बाद, इसे default मान लें:

- **हर site के लिए अलग recovery method** रखें, क्योंकि हर site इसे अलग तरह से संभालता है।
- जहाँ site इजाज़त दे, वहाँ **दो authenticators** रखना बेहतर है: phone और desktop, दोनों vault से। एक डिवाइस खो जाए, तो दूसरा काम करता रहे।
- **सबसे पहले email पर 2FA** चालू करें। यही वह खाता है जो बाक़ी हर खाते को reset करता है।
- hardware-key या passkey विकल्प देखें, और उसे TOTP के बदले नहीं, उसके साथ जोड़ें — जब तक आपको पूरा भरोसा न हो कि आप recover कर सकते हैं।

## 2FA कहाँ गड़बड़ करता है

**बिना backup के खोया हुआ फ़ोन।** दूसरे authenticator, recovery code, या hardware key के बिना खाता चला जाता है। यह 2FA की सबसे आम अकेली विफलता है, और इसीलिए recovery codes मायने रखते हैं।

**Screenshot में seed।** फ़ोटो खींचा गया QR code एक plaintext credential है। seed को अपने vault में सहेजें और image मिटा दें।

**Synced notes file में seed।** Cloud notes plaintext में sync होते हैं। अगर आप recovery material के लिए notes का उपयोग करते ही हैं, तो वह एन्क्रिप्टेड vault के भीतर होना चाहिए।

**ग़लत app से टाइप किए गए बदलते कोड।** कुछ authenticators में आप accounts का क्रम बदल सकते हैं, जिससे codes ग़लत site पर डाल दिए जाते हैं। यह सुरक्षा समस्या नहीं — support समस्या है।

**यह मान लेना कि 2FA दोहराना सुरक्षित बना देता है।** ऐसा नहीं है। अगर आप दो साइटों पर एक ही पासवर्ड दोहराते हैं और केवल एक पर 2FA है, तो दूसरा अभी भी एक breach की दूरी पर है।

## Passkeys 2FA को कैसे बदलते हैं

एक passkey second factor को मज़बूत करने के बजाय हटा देता है। private key डिवाइस के secure hardware से सुरक्षित रहता है और केवल biometric या PIN जाँच के बाद उपयोग में आता है, इसलिए "कुछ जो आप जानते हैं" और "कुछ जो आप हैं" एक ही hardware-backed क्रिया में समा जाते हैं। न चुराने को कोई कोड, न लीक होने को कोई seed, और न बदलने को कोई SIM।

यही कारण है कि उद्योग जिस दिशा में चला वह passkeys हैं: यह वह दुर्लभ credential है जो *और* ज़्यादा सुरक्षित भी है *और* कम मेहनत वाला भी। 2FA बनाए रखने का बचा हुआ कारण coverage है — passkeys अभी हर site पर उपलब्ध नहीं हैं, इसलिए जो पीछे रह गए हैं उनके लिए आपके vault में एक TOTP seed एक समझदार पुल है।

[passkeys कैसे काम करते हैं, इस पर और](/hi/blog/what-are-passkeys) · [OpenKey इन्हें कैसे संभालता है](/hi/blog/passkeys-and-autofill)

## Search data क्या कहता है

2FA web पर सबसे बड़े security-सन्निकट query terms में से एक है। head term के स्तर पर, "2fa" "password manager" की लगभग **67%** रुचि खींचता है — "passkey" के 42% और "password generator" के 36% से ज़्यादा।

लोग "two-factor authentication" में जो refinements जोड़ते हैं (Google Trends, worldwide, last 12 months):

| संबंधित query | सापेक्ष रुचि |
|---------------|-------------------|
| what is two-factor authentication | 100 |
| two-factor authentication app | 14 |
| two-factor authentication code | 12 |
| two-factor authentication google | 8 |
| enable two-factor authentication | 7 |
| two-factor authentication iphone | 5 |
| two-factor authentication examples | 2 |

"what is two-factor authentication" भी cluster में सबसे तेज़ी से बढ़ने वाला term है, साल-दर-साल लगभग 550% ऊपर। परिभाषात्मक query का सबसे तेज़ी से बढ़ना यह साफ़ संकेत है कि दर्शक नए हैं — इसीलिए यह लेख recommendation के बजाय mechanics से शुरू होता है।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values normalized relative interest (0–100) हैं, search volumes नहीं।

## एक-मिनट का संस्करण

TOTP codes एक स्थायी secret से गणना होते हैं जो साइट के साथ साझा होता है, इसलिए वह secret असल में एक पासवर्ड है और उसे वही सुरक्षा मिलनी चाहिए। उसे username और password वाली ही एन्क्रिप्टेड vault entry में रखें, दूसरा authenticator रखें, साइट के recovery codes offline सहेजें, अपने email खाते पर सबसे पहले 2FA चालू करें, और जहाँ भी दिया जाए वहाँ passkey जोड़ दें।

## अगले कदम

- [What are passkeys?](/hi/blog/what-are-passkeys) — वह credential जो codes की जगह लेता है
- [Autofill passwords](/hi/blog/autofill-passwords) — logins और codes को साथ भरना
- [ऐप का उपयोग](/hi/guide/app) — किसी entry में TOTP जोड़ना
- [CLI guide](/hi/guide/cli#secrets-और-logins-में-search) — terminal से codes पढ़ना
