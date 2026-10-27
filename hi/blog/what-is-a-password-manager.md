---
title: पासवर्ड मैनेजर क्या है?
description: पासवर्ड मैनेजर की आसान भाषा में गाइड — वे क्या संग्रहीत करते हैं, कैसे एन्क्रिप्ट करते हैं, कौन-कौन से प्रकार होते हैं, और अपने पासवर्ड किसी अजनबी को सौंपे बिना एक चुनने का तरीका।
date: 2026-09-12
cover: /blog/covers/what-is-a-password-manager.png
---

# पासवर्ड मैनेजर क्या है?

एक **पासवर्ड मैनेजर** एक एन्क्रिप्टेड vault है जो आपकी ओर से एक मज़बूत मास्टर पासवर्ड याद रखता है और बाकी सब भर देता है। `Summer2019!` को बारह साइटों पर दोहराने के बजाय, आप हर एक के लिए अलग 20-वर्ण वाला पासवर्ड generate करते हैं, और मैनेजर उसे store करता है, वापस लाता है, और जब ज़रूरत हो तो टाइप कर देता है।

बस यही पूरा विचार है। बाकी सब — sync, sharing, passkeys, autofill, self-hosting — उस एक ही लाभ के चारों ओर की plumbing है।

## लोगों को इसकी ज़रूरत क्यों होती है

समस्या गणित की है। एक अच्छा इंसानी पासवर्ड याद रहने वाला होता है, और याद रहने वाला यानी दोहराया गया। Credential-stuffing हमले एक साइट से लीक हुए पासवर्ड लेकर हज़ारों दूसरों के विरुद्ध आज़माते हैं, इसलिए एक दोहराया हुआ पासवर्ड आपका कोई बिल्कुल असंबंधित खाता भी ले सकता है। इसका हल है प्रति खाता एक अलग पासवर्ड — और यही वह चीज़ है जिसे कोई याद रखना नहीं चाहता।

पासवर्ड मैनेजर याद रखने का कदम हटा देता है। आप एक secret याद रखते हैं; vault बाकी सब संभालता है।

## पासवर्ड मैनेजर असल में क्या संग्रहीत करता है

सिर्फ़ पासवर्ड नहीं। एक आधुनिक vault में आश्चर्यजनक मात्रा में कुछ होता है:

| चीज़ | यह क्या है |
|------|------------|
| Login | URL, username, password, notes, TOTP seed |
| Payment card | Number, expiry, CVV, issuer grouping |
| Crypto wallet | Address, private key, seed phrase |
| Identity | Name, address, phone, ID numbers |
| Secure note | वह कुछ भी जो आप किसी chat app में paste नहीं करेंगे |
| Passkey | एक WebAuthn credential जो पासवर्ड की पूरी तरह जगह लेता है |

**TOTP** पर ध्यान देने लायक बात: two-factor authentication के लिए time-based one-time codes उसी entry में रह सकते हैं जिसमें वे जिस पासवर्ड की रक्षा करते हैं, इसलिए एक login और उसका बदलता कोड एक साथ रहते हैं, दो अलग apps में नहीं।

## चार बातें जो अच्छे को बुरे से अलग करती हैं

### 1. एन्क्रिप्शन मॉडल

एक विश्वसनीय मैनेजर आपके vault को आपके डिवाइस पर, आपके मास्टर पासवर्ड से derive किए गए key से एन्क्रिप्ट करता है (OpenKey derivation के लिए **Argon2id** और vault data के लिए **AES-256-GCM** इस्तेमाल करता है)। सर्वर चलाने वाली कंपनी को आपकी entries पढ़ने योग्य नहीं होनी चाहिए — यही *zero-knowledge* गुण है। अगर provider आपके लिए मास्टर पासवर्ड reset कर सकता है, या ऐसा कोई master key रखता है जिससे वह decrypt कर सके, तो वह zero-knowledge नहीं है, चाहे marketing कुछ भी कहे।

### 2. एन्क्रिप्टेड data कहाँ रहता है

तीन सामान्य उत्तर, नियंत्रण के बढ़ते क्रम में:

- **Vendor cloud** — सर्वर कोई और चलाता है। सबसे सरल, और आप उनकी uptime, उनका breach history और उनका jurisdiction विरासत में पाते हैं।
- **Vendor cloud, self-hostable** — वही client, वैकल्पिक रूप से अपना सर्वर लाना।
- **आपका अपना सर्वर** — आप sync API चलाते हैं। सर्वर ciphertext रखता है और उसे पढ़ नहीं सकता।

[OpenKey](/hi/blog/zero-knowledge-sync) जैसे self-hosted setup में चुराया गया सर्वर database चुराया गया ciphertext का ढेर है, चुराया गया पासवर्ड list नहीं।

### 3. Autofill की गुणवत्ता

Autofill वह जगह है जहाँ पासवर्ड मैनेजर अपनी कीमत चुकाता है, क्योंकि यही वह चीज़ है जिसे आप दिन में पचास बार छूते हैं। browser extension, mobile के लिए system-level provider, और passkey path देखें। search की माँग भी यही दर्शाती है: "autofill" और उसके refinements, "password vault" queries से कई गुना ज़्यादा हैं।

### 4. Recovery की स्थिति

किसी को आपसे सच बताना होगा कि मास्टर पासवर्ड भूल जाने पर क्या होता है। Zero-knowledge designs ऐसा नहीं कर सकते: सर्वर के पास ऐसा कुछ नहीं होता जो मदद करे। एक अच्छा मैनेजर इस बात पर सीधा-सादा रहता है, आपको नियंत्रण में एन्क्रिप्टेड local backups देता है, और यह नहीं जताता कि कोई support agent मदद कर सकता है। इस स्थिति से पूरी तरह बचने का तरीका [forgot master password](/hi/blog/forgot-master-password) में है।

## पासवर्ड मैनेजर क्या नहीं है

- **आपके खातों का backup नहीं।** यह credentials रखता है; यह locked-out email account reset नहीं करता।
- **अपने आप 2FA नहीं।** TOTP seed संग्रहीत करना hardware keys से खाते की सुरक्षा करने के बराबर नहीं है।
- **पासवर्ड दोहराने की इजाज़त नहीं।** पूरी कीमत uniqueness में है।
- **मास्टर पासवर्ड छोड़ देने का कारण नहीं।** vault उतना ही मज़बूत है जितना उसे खोलने वाला key।

## इसका वास्तव में उपयोग कैसे करें

1. **एक मज़बूत मास्टर पासवर्ड चुनें।** लंबाई complexity से आगे है। चार से छह असंबंधित शब्दों का multi-word passphrase `P@ssw0rd!` से ज़्यादा मज़बूत और याद रखने में आसान है।
2. कुछ भी import करने से पहले **autofill चालू करें**, ताकि सहेजे गए logins खुद-ब-खुद जमा होने लगें।
3. **जो कुछ है उसे import करें।** [Chrome export](/hi/blog/import-passwords-from-chrome) में लगभग एक मिनट लगता है।
4. **Generate करें, गढ़ें नहीं।** हर नए खाते के लिए [built-in generator](/hi/blog/strong-password-generator) इस्तेमाल करें।
5. **सबसे खराब मामले पहले ठीक करें** — banking, email, और आपका मुख्य social account।
6. **कोड्स को खाते के साथ ही रखें।** TOTP seeds उसी entry में जोड़ें ([यह कैसे काम करता है](/hi/blog/two-factor-authentication))।
7. **एक एन्क्रिप्टेड backup लें** और उसे कहीं offline रखें।

## कौन-सा प्रकार चुनना चाहिए?

| अगर आप… | तो देखें |
|---------|---------|
| शून्य setup चाहते हैं और यह नहीं सोचना कि सर्वर कौन चलाता है | कोई mainstream cloud manager |
| commit करने से पहले आज़माना चाहते हैं | कुछ भी जिसमें सचमुच free tier हो — [OpenKey का free tier](/hi/pricing#free-vs-openkey-pro) में vault, autofill, passkeys और self-hosted sync शामिल हैं |
| अपना sync अपने नियंत्रण वाले hardware पर चाहते हैं | एक [self-hosted password manager](/hi/blog/self-hosted-password-manager) |
| किसी बड़े vendor से निकल रहे हैं | [LastPass](/hi/blog/lastpass-alternative) या [1Password](/hi/blog/1password-alternative) migration गाइड्स |
| Google ecosystem में गहरे हैं | [Google Password Manager](/hi/blog/google-password-manager) — और इससे कब निकलना है |
| परिवार के साथ share करते हैं | [Password manager for family](/hi/blog/password-manager-for-family) |
| सहकर्मियों के साथ share करते हैं | [Password manager for teams](/hi/blog/password-manager-for-teams) |

## लोग क्या खोजते हैं, और इससे क्या पता चलता है

search data यह बताने का ठीक-ठाक proxy है कि शुरुआत करने वालों के मन में असल में कौन-कौन से सवाल होते हैं। Google Trends (worldwide, last 12 months) से, head term "password manager" में लोग सबसे ज़्यादा कौन-से refinements जोड़ते हैं:

| संबंधित query | सापेक्ष रुचि |
|---------------|-------------------|
| google password manager | 100 |
| google password | 93 |
| **what is a password manager** | **39** |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| bitwarden | 7 |
| 1password | 4 |

दो बातें तुरंत सामने आती हैं। पहली, सबसे आम follow-up सवाल ठीक वही है जिसका जवाब यह लेख देता है — यह term साधारण भाषा में पूछा जाता है, यानी दर्शक इस श्रेणी में नए हैं। दूसरी, brand queries का दबदबा है: ज़्यादातर लोग इस विषय पर पहले से "कौन सा product" सोचते हुए आते हैं, "यह है क्या" सोचते हुए नहीं। वही data set "what is a password manager" को सबसे तेज़ी से बढ़ता *informational* refinement दिखाता है, साल-दर-साल लगभग 1,050% ऊपर, जबकि "nord password manager" जैसे brand-presence terms लगभग 850% बढ़े।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Figures normalized relative interest (0–100) हैं, monthly search volumes नहीं। बढ़ते आँकड़े पिछले मिलते अवधि के मुकाबले वृद्धि हैं।

## एक-मिनट का संस्करण

पासवर्ड मैनेजर एक एन्क्रिप्टेड vault है जिस तक एक ही मज़बूत मास्टर पासवर्ड से पहुँचा जाता है, इसलिए हर खाते के लिए एक अलग पासवर्ड हो सकता है जिसे आपको कभी याद रखने की ज़रूरत नहीं पड़े। जो बातें मायने रखती हैं वे हैं: क्या provider आपका data पढ़ सकता है (नहीं होना चाहिए), एन्क्रिप्टेड data कहाँ रहता है, क्या autofill आपके डिवाइसों पर सचमुच काम करता है, और मास्टर पासवर्ड भूल जाने पर क्या होता है। एक चुनें, autofill चालू करें, import करें, फिर generate करते हुए दोहराने से बाहर निकल जाएँ।

## आगे कहाँ जाएँ

- [Best password managers](/hi/blog/best-password-managers) — विकल्पों की तुलना कैसे करें
- [Autofill passwords](/hi/blog/autofill-passwords) — इसे ठीक से सेट अप करें
- [Strong password generator](/hi/blog/strong-password-generator) — पासवर्ड गढ़ना बंद करें
- [Security model](/hi/guide/security) — key derivation और threat boundaries
- [ऐप का उपयोग](/hi/guide/app) — व्यवहार में OpenKey vault
