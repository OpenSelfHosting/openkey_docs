---
title: Passkeys क्या हैं?
description: Passkeys की आसान भाषा में गाइड — WebAuthn कैसे काम करता है, वे phish क्यों नहीं हो सकते, एक कैसे बनाएँ और इस्तेमाल करें, और आपके पासवर्ड मैनेजर के साथ क्या होता है।
date: 2026-09-16
cover: /blog/covers/what-are-passkeys.png
---

# Passkeys क्या हैं?

एक **passkey** वह login credential है जो अक्षरों की string के बजाय एक cryptographic key pair से बना होता है। निजी आधा आपके डिवाइस पर एन्क्रिप्टेड रहता है, उसी unlock के पीछे (biometric, screen lock, या मास्टर पासवर्ड) जिसे आप पहले से इस्तेमाल करते हैं। साइट केवल सार्वजनिक आधा संग्रहीत करती है, जो आपके रूप में sign in करने के लिए बेकार है।

व्यावहारिक नतीजा: न टाइप करने को कोई पासवर्ड, न phish करने को कुछ, न किसी breached site के पास हमलावर को सौंपने को कुछ, और न ही कोई reset flow जिसे कोई social engineering से चला सके।

## पासवर्ड की अपनी समस्या

आपने आज तक जो भी login किया है, वह एक shared secret है। आप और साइट दोनों एक ही string संग्रहीत करते हैं, जिससे तीन failure modes बनते हैं:

- **Phishing.** login page की भारी-भरकम नकली कॉपी उस string को निगल लेती है, क्योंकि वही string असली साइट और नकली दोनों पर काम करती है।
- **Credential stuffing.** एक साइट से लीक हुआ string हर उस दूसरे खाते के विरुद्ध दोबारा चलाया जाता है जो उसे दोहराता है।
- **Server breach.** जो साइटें पढ़ने योग्य पासवर्ड संग्रहीत करती हैं, वे breach होते ही हमलावरों को काम करते हुए credentials सौंप देती हैं।

Passkeys shared secret हटा देते हैं। साइट कभी कुछ ऐसा नहीं देखती जो दोबारा इस्तेमाल हो सके।

## Passkey कैसे काम करता है

पहली बार login करते समय registration:

1. आपका डिवाइस एक **key pair** generate करता है — एक private key और एक public key।
2. public key साइट को भेजा जाता है और उसके user database में संग्रहीत होता है।
3. private key आपके डिवाइस पर एन्क्रिप्टेड रहता है, और केवल unlock करने के बाद ही उपयोग में आता है।

उसके बाद हर बार sign in करते समय:

1. साइट एक **challenge** जारी करती है।
2. आपका डिवाइस उसे private key से sign करता है।
3. साइट अपने संग्रहीत public key के मुकाबले signature सत्यापित करती है।

दोनों चरणों में कोई shared secret नहीं होता। नकली साइट का उपयोग संभव नहीं, क्योंकि challenge असली साइट से आता है और आपका डिवाइस केवल उसी origin के लिए sign करेगा जिसके साथ वह registered था। यही anti-phishing गुण है, और यह protocol से आता है, user की सतर्कता से नहीं।

इसके पीछे यह **WebAuthn** है (अब इसे passkeys कहा जाता है), जहाँ credential आमतौर पर किसी **FIDO2** hardware authenticator पर रहता है — आपके डिवाइस का secure element, कोई platform authenticator, या कोई USB/NFC security key।

## Passkey बनाना

यह flow लगभग हर जगह एक जैसा है, और credential आपका पासवर्ड मैनेजर देता है:

1. साइट के sign-in page पर **Sign in with a passkey** चुनें (या यदि अभी खाता नहीं है, तो **Create a passkey**)।
2. आपका provider एक confirmation dialog दिखाता है जो साइट और खाते का नाम बताता है।
3. Face ID, Touch ID, fingerprint, या अपने डिवाइस के PIN से स्वीकृत करें।
4. हो गया। passkey आपके vault में संग्रहीत हो जाता है और उस साइट से बँध जाता है।

अगर dialog में "Use browser" या "Use this device instead" विकल्प हो, तो उसे चुनने से credential आपके manager के बजाय platform authenticator को सौंप दिया जाता है — किसी one-off के लिए उपयोगी, लेकिन इसका मतलब यह भी है कि passkey अब आपके vault में नहीं है।

## रोज़मर्रा में passkey का उपयोग

Login में कुछ नहीं बदलता, बस नीचे की प्रक्रिया बदल जाती है:

1. username field पर फ़ोकस करें और **Sign in with a passkey** पर क्लिक करें।
2. prompt को स्वीकृत करें।
3. साइट signature मान्य करती है। आप अंदर हैं।

न टाइप करना, न paste buffer, न second factor prompt — unlock *ही* second factor है। चूँकि आपका डिवाइस approval dialog में माँगने वाली साइट दिखाता है, हमलावर उसे चुपचाप कहीं और नहीं भेज सकता।

## Passkeys हटाना और स्थानांतरित करना

- **हटाएँ:** साइट की account security settings खोलकर वहाँ passkey मिटा दें, या उसे अपने provider से हटा दें। एक जगह मिटाने से दूसरी कॉपी बाक़ी रह जाती है, इसलिए पूरी तरह हटाने के लिए दोनों जगह से हटाएँ।
- **स्थानांतरित करें:** platform account (iCloud Keychain, Google Password Manager) के ज़रिए sync हुआ passkey उसी खाते के साथ चलता है। self-hosted vault में संग्रहीत passkey तब चलता है जब आप sync करते हैं, या किसी नए manager में import करते हैं।

अगर आप passkey रखने वाला हर डिवाइस खो देते हैं *और* कोई recovery path नहीं है, तो खाता अपुनर्प्राप्य है। कम से कम एक passkey दूसरे डिवाइस या किसी security key पर registered रखें।

## Passkeys और पासवर्ड मैनेजर

Passkeys आपके पासवर्ड मैनेजर की जगह नहीं लेते — वे उसे सबसे कमज़ोर काम से सबसे मज़बूत काम की ओर ले जाते हैं।

| काम | पहले | बाद में |
|-----|--------|-------|
| पासवर्ड याद रखना | आपके सिर में एक दोहराई हुई string | आपके vault में एक key pair |
| Phishing resistance | Manual domain जाँचना | Cryptographic, बनी हुई |
| Second factor | एक बदलता कोड | डिवाइस का unlock ही |
| Breach का असर | साइट के database में पढ़ने योग्य credentials | एक public key, हमलावर के लिए बेकार |

मैनेजर अब भी passkey private key संग्रहीत करता है, अब भी access को आपके vault unlock पर रोकता है, और अब भी sync करता है। जो बदलता है वह यह है कि संग्रहीत secret अब कोई याद रखने योग्य string नहीं रहता — और इसी से पासवर्ड दोहराए जाने की पूरी वजह हट जाती है।

OpenKey में extension WebAuthn के `create` और `get` calls को intercept करता है, ES256 credentials संग्रहीत करता है, और आपकी पसंद होने पर platform authenticator पर वापस चल जाता है। system-level provider path उन apps और browsers को संभालता है जो OS credential UI से बात करते हैं। दोनों unlock के बाद, client पर चलते हैं। [OpenKey में यह कैसे काम करता है](/hi/blog/passkeys-and-autofill)।

## क्या passkeys अभी हर जगह काम करते हैं?

लगभग हर जगह, कुछ लगातार खामियों के साथ: कुछ enterprise single-sign-on setups, कुछ पुराने mobile app WebViews, और एक-दो साइटें जिन्होंने WebAuthn तो लागू किया पर passkey sync नहीं। व्यावहारिक तरीका यह है कि जब तक कोई site दोनों दे, आपके manager में पासवर्ड fallback के रूप में रखें — और जब वह दे, तब passkey को प्राथमिकता दें।

## Search data क्या कहता है

Passkey में रुचि बड़ी है और अब भी बढ़ रही है, और queries ज़्यादातर शुरुआत करने वालों के सवाल हैं। Google Trends (worldwide, last 12 months) से "passkey" के refinements:

| संबंधित query | सापेक्ष रुचि |
|---------------|-------------------|
| what is passkey | 100 |
| what is a passkey | 93 |
| google passkey | 50 |
| passkey microsoft | 28 |
| passkey login | 22 |
| create passkey | 20 |
| passkey app | 19 |
| passkey iphone | 19 |
| windows passkey | 18 |
| passkeys | 17 |
| how to use passkey | 8 |
| how to remove passkey | 6 |

"what is a passkey" और "what is passkey" cluster के दो सबसे मज़बूत queries हैं, और "what is a passkey" साल-दर-साल लगभग 450% बढ़ रहा है। यह उस तकनीक का आकार है जो enthusiasts से आम दर्शक की ओर पार हो रही है: लगभग कोई अभी passkey *management* नहीं खोज रहा, और ज़्यादातर परिभाषा खोज रहे हैं।

head term के स्तर पर, "passkey" "password manager" की लगभग 42% search interest खींचता है, और "2fa" लगभग 67% — दोनों काफ़ी, और दोनों एक ही काम की ओर बढ़ रहे हैं।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values normalized relative interest (0–100) हैं, search volumes नहीं।

## एक-मिनट का संस्करण

एक passkey एक key pair है जहाँ निजी आधा आपके डिवाइस पर एन्क्रिप्टेड रहता है और साइट केवल सार्वजनिक आधा संग्रहीत करती है। चूँकि कोई shared secret नहीं है, नकली साइट कुछ भी दोबारा इस्तेमाल होने योग्य नहीं जुटा सकती, और आपका device unlock ही second factor बन जाता है। किसी साइट के sign-in page से एक बनाएँ, उसे Face ID या डिवाइस के PIN से स्वीकृत करें, और अगली बार एक tap और एक signature से login कर लें।

## अगले कदम

- [ब्राउज़र में passkeys और autofill](/hi/blog/passkeys-and-autofill) — OpenKey का implementation
- [पासवर्ड मैनेजर क्या है?](/hi/blog/what-is-a-password-manager) — passkeys कहाँ रहते हैं
- [Browser extension](/hi/guide/extension) — WebAuthn setup और fallback behaviour
- [Two-factor authentication](/hi/blog/two-factor-authentication) — passkeys किसकी जगह लेते हैं
