---
title: "1Password विकल्प: vault खोए बिना switch करना"
description: लोग 1Password से क्यों निकलते हैं — लागत, family plans, और self-hosting — साथ ही आपके नियंत्रण वाले password manager तक चरण-दर-चरण migration।
date: 2026-09-20
cover: /blog/covers/1password-alternative.png
---

# 1Password विकल्प: vault खोए बिना switch करना

1Password एक बेहतरीन product है, और उसकी बेहतरीनता के कारणों में से एक यह भी है कि इसका कोई free tier नहीं है। यह एक ही design decision लोगों को "1password alternative" खोजने का सबसे आम कारण है — पूरी श्रेणी का सबसे ज़्यादा खोजा जाने वाला alternative query, "lastpass alternative" की रुचि के लगभग चार गुना।

यह लेख उन लोगों के लिए है जिनका कारण इन तीन में से एक है: **लागत**, **family sharing में friction**, या **अपना sync अपने hardware पर चाहना**। यह किसी पर दोषारोपण नहीं है; 1Password एक वैध चुनाव है, और ईमानदार framing यह है कि "अगर यह आपकी समस्या नहीं है, तो रहिए।"

## Switch करने के तीन असली कारण

### लागत

Subscription ही शामिल होने का क़ीमत है और कोई स्थायी मुफ़्त विकल्प नहीं है। Pricing store और region के हिसाब से बदलती है, इसलिए ईमानदार framing संरचनात्मक है: आप एक subscription की तुलना किसी और जगह के free tier से, या एक बार की ख़रीद से अपने सर्वर सहित, कर रहे हैं।

Queries यही दर्शाते हैं। "1password pricing" Bitwarden से जुड़े सबसे तेज़ी से बढ़ने वाले refinements में से एक है, साल-दर-साल लगभग **200%** ऊपर, और कई बड़े brands के तहत pricing से जुड़े terms बढ़ती सूची पर हावी हैं।

### Family और team sharing

Family plans friction का एक आम स्रोत हैं — seat management, plan upgrade जब किसी बच्चे को पता चलता है कि उसे अलग खाता चाहिए, और अलग-अलग devices वाले households के बीच sharing। अगर आपका household मिश्रित iOS/Android/Windows है, या आप किसी ऐसे व्यक्ति के साथ share करना चाहते हैं जो family plan पर नहीं है, तो move करना एक वैध कारण है।

### Self-hosting

1Password ने कुछ समय पहले standalone local vaults बंद कर दिए थे, तो sync vendor के ज़रिए चलता है। अगर शर्त यह है कि encrypted data आपके नियंत्रण वाली infrastructure पर रहे, तो यह एक कठिन शर्त है, पसंद नहीं — और यह एक self-hostable manager की ओर इशारा करती है।

## Migration से पहले: क्या लागत सच में समस्या है?

ईमानदारी से जाँचने लायक है, क्योंकि migration काम का एक दोपहर है जो आप सावधान न रहे तो एक से ज़्यादा बार करेंगे:

- **क्या आपको सच में move करना है?** एक साल का subscription अक्सर migration की लागत से सस्ता पड़ता है। अगर दर्द साल की एक चार्ज है, तो जवाब शायद रहने में ही है।
- **बात plan की है या seat count की?** Personal plan और family plan अलग products हैं; family plan के अटप होने से move करना एक अलग निर्णय है, बिना subscription चाहने से move करना दूसरा।
- **क्या आपको self-hosting किसी असली कारण से चाहिए?** अगर आपके household में कोई सर्वर नहीं चला सकता, तो self-hosting एक ऐसा hobby है जिसे आप छोड़ देंगे। Nearby LAN sync maintenance के बिना ज़्यादातर फ़ायदा दे देता है।

अगर जवाब हाँ है, तो move कीजिए — और इस लेख का बाक़ी हिस्सा यह है कि इसे कैसे करें।

## चरण-दर-चरण migration

### 1. 1Password से export करें

1. Web या desktop app पर login करें।
2. **Settings → Export** खोलें और **1Password CSV** चुनें।
3. अगर उपलब्ध हो तो **encrypted 1PUX** export को तरजीब दें — यह items को plaintext में लिखने के बजाय पासवर्ड से बंद रखता है।
4. इसे किसी ऐसी जगह सेव करें जो आपके नियंत्रण में हो, फिर उसे offline कर दें।

जटिल item types — attachments वाले secure notes, identities, documents, Wi-Fi credentials — export पर login-जैसी rows में समा जाते हैं। महत्वपूर्ण वाले हाथ से दोबारा बनाने की अपेक्षा करें।

### 2. नए manager में import करें

OpenKey में: **Settings → Data → Import & export → Import → 1Password CSV**। Import स्थानीय होता है; कुछ भी upload नहीं होता। Folders साफ़ी से map होने पर collections बन जाते हैं।

### 3. तुरंत autofill चालू करें

autofill काम करने पर, यहाँ से आगे आप जिस भी चीज़ में login करेंगे वह आपके लिए सेव हो जाएगी, तो पासवर्ड rotate करते हुए vault ख़ुद को ठीक करता रहेगा।

- [Autofill passwords](/hi/blog/autofill-passwords)
- [Autofill not working](/hi/blog/autofill-not-working) — अगर suggestions नहीं मिल रहे

### 4. मायने रखने वाले खाते rotate करें

पहले email, फिर banking और cloud, फिर बाक़ी जैसे-जैसे हर site आपसे कहे। हर पासवर्ड locally generate करें:

```bash
openkey gen -l 24 -c
```

Security settings में रहते हुए 2FA जोड़ें ([guide](/hi/blog/two-factor-authentication)), और जहाँ मिले वहाँ passkey जोड़ें ([what are passkeys?](/hi/blog/what-are-passkeys))।

### 5. Shared items हाथ से दोबारा बनाएँ

यही वह हिस्सा है जिसे लोग कम आँकते हैं। दोबारा बनाएँ:

- **Payment cards**, issuer के हिसाब से grouped
- **Identities** जो forms में इस्तेमाल होती हैं
- **Wi-Fi और device credentials** जो आपने रखे थे
- **Attachments वाले secure notes** — वे नहीं आईं

OpenKey cards, crypto wallets और developer secrets को free-text notes के बजाय vault के पहले-दर्जा क्षेत्रों में रखता है, जिससे यह rebuild किसी notes-only manager की तुलना में कम तकलीफ़देह है। [ऐप का उपयोग](/hi/guide/app) देखें।

### 6. Backup लें, फिर रद्द करें

रद्द करने से **पहले** एक encrypted local backup निकालें (OpenKey में `.okbak`), फिर दूसरे डिवाइस पर नया sign-in सत्यापित करें। तभी पुराना खाता बंद करें।

### 7. Export files नष्ट करें

Encrypted exports: मिटा दें। Plaintext CSVs: overwrite करें और shred करें। जो कुछ एक हफ़्ते तक plaintext file में रहा, उसे चाहे कुछ भी हो, rotate कर दें।

## Replacement में क्या देखें

| शर्त | क्या सत्यापित करें |
|-------------|----------------|
| महँगा नहीं | एक free tier जो vault, autofill और sync कवर करे — *item* limits स्पष्ट बताए |
| Family sharing | Revocation वाले shared collections, और बच्चों के लिए अलग plans चाहिए या नहीं |
| 1Password CSV import | साफ़ तौर पर supported, folder mapping के साथ |
| मुफ़्त export | Tier की पुष्टि करें; export paywall data को hostage बना देता है |
| Self-hosting | वैकल्पिक, पर यह trust model पूरी तरह बदल देता है |
| Passkeys और TOTP | दोनों, काम करते हुए, "coming soon" नहीं |
| CLI या API | तब क़ीमती, जब आप कुछ भी script करें |

पूरे मानदंड और scoring sheet: [बेस्ट पासवर्ड मैनेजर](/hi/blog/best-password-managers)।

## Families-and-teams का पहलू

अगर driver लागत नहीं, sharing थी, तो कोई consumer plan चुनने से पहले यह देखें:

- [Password manager for family](/hi/blog/password-manager-for-family) — household setups, बच्चे, shared accounts
- [Password manager for teams](/hi/blog/password-manager-for-teams) — orgs, roles, revocation, offboarding

OpenKey में, organizations और shared collections के लिए Pro और एक self-hosted server चाहिए, और वे जो कुछ संग्रहीत करते हैं — org names, entry payloads, attachments — सब ciphertext रहते हैं। Clients recipients के लिए keys wrap करते हैं; सर्वर उन्हें कभी unwrap नहीं करता। किसी process के चारों ओर डिज़ाइन करने से पहले जानने लायक एक बात: **entry shares snapshots हैं**, live documents नहीं। किसी share को revoke करना एक लंबित accept रोकता है, पर recipient के पास पहले से स्वीकार की हुई copy नहीं मिटाता। लगातार shared access के लिए इसके बजाय एक org shared collection इस्तेमाल करें।

## Search data क्या कहता है

Google Trends (worldwide, last 12 months) इस migration की आकृति साफ़ कर देता है। alternative queries की आपस में तुलना करते हुए:

| Query | Cluster में सापेक्ष रुचि |
|-------|-------------------------------|
| **1password alternative** | **100** |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

और बड़े brands से जुड़े बढ़ते queries commercial सवालों से भरे हैं, security वालों से नहीं: Bitwarden के लिए "bitwarden price increase" साल-दर-साल लगभग **+450%** पर आगे है, "bitwarden review" और "bitwarden lite" दोनों लगभग +350% पर, और "bitwarden pricing" लगभग +190% पर। Open-source, self-hostable और छोटी team वाली रुचि भी बढ़ रही है — "bitwarden open source", "bitwarden enterprise", और "bitwarden cli" तीनों बढ़ती सूची में दिखते हैं।

दो निष्कर्ष। पहला, इस श्रेणी में switch करने का प्रमुख driver **price** है, breach anxiety नहीं। दूसरा, सबसे तेज़ी से बढ़ते आसन्न रुचियाँ open source, enterprise और CLI हैं — यह बताता है कि paid plans छोड़ने वाले लोग कुछ ऐसा ढूँढ़ रहे हैं जो वे ख़ुद चला और जाँच सकें।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values normalized relative interest (0–100) हैं, search volumes नहीं।

## एक-मिनट का संस्करण

अगर दर्द लागत है, तो 1Password CSV export और मुफ़्त export वाला free-tier manager आपको बिना एक रुपये के बाहर निकाल देता है। अगर दर्द family sharing या self-hosting है, तो पहले इन दो शर्तों पर चुनें और कीमत बाद में। Export करें, locally import करें, autofill चालू करें, email और banking rotate करें, cards और notes हाथ से दोबारा बनाएँ, encrypted backup लें, फिर रद्द करें।

## अगले कदम

- [LastPass विकल्प](/hi/blog/lastpass-alternative) — वही प्रक्रिया, अलग triggers
- [Self-hosted password manager](/hi/blog/self-hosted-password-manager) — self-hosting का रास्ता
- [Password manager for family](/hi/blog/password-manager-for-family) — household sharing
- [Pricing](/hi/pricing) — OpenKey Free और Pro में क्या शामिल है
