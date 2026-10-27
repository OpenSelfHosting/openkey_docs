---
title: "Strong password generator: पासवर्ड गढ़ना बंद करें"
description: हाथ से गढ़े पासवर्ड क्यों कमज़ोर होते हैं, ऐसे पासवर्ड कैसे generate करें जो crack होने से बचें, और अपने पास मौजूद कमज़ोर पासवर्ड की जाँच व मरम्मत कैसे करें।
date: 2026-09-18
cover: /blog/covers/strong-password-generator.png
---

# Strong password generator: पासवर्ड गढ़ना बंद करें

इंसान द्वारा पासवर्ड गढ़ना एक हल हो चुकी समस्या है, मगर उसका जवाब बुरा है। लगभग हर कोई एक ही संरचना इस्तेमाल करता है — एक शब्द, एक capital letter, साल, `!` — और यही संरचना है जिसका अनुमान cracking tools लगाते हैं। generator अंदाज़े और इंसान को प्रक्रिया से पूरी तरह हटा देता है।

यह बताता है कि टिकाऊ पासवर्ड कैसे generate करें, आपके पास मौजूद पासवर्ड की जाँच कैसे करें, और उनमें से सबसे खराब को बिना पूरा दिन बिताए कैसे ठीक करें।

## `P@ssw0rd1!` क्यों विफल होता है

हमलावर पासवर्ड एक-एक करके अंदाज़ा नहीं लगाते। वे पूरी आबादियों पर बड़े पैमाने की precomputation चलाते हैं, असली breaches में देखे गए patterns का उपयोग करते हुए:

- कई भाषाओं के dictionary words, और नाम तथा brands
- keyboard walks (`qwerty`, `1qaz2wsx`) और उनके rotations
- तारीख़ें: साल, महीने, मौसम
- leetspeak substitutions: `a→@`, `i→1`, `o→0`, `e→3`
- अंत में जोड़े गए अंक और एक अकेला trailing symbol

आपका गढ़ा हुआ पासवर्ड इनमें से कई सूचियों के प्रतिच्छेद पर गिरता है। आधुनिक hardware तेज़ hashes के सामने प्रति सेकंड अरबों candidates आज़माता है, इसलिए "complex" pattern जो इंसान को अनगिनेय लगता है, अक्सर घंटों में या उससे भी कम में crack हो जाता है।

## पासवर्ड को मज़बूत क्या बनाता है

**लंबाई complexity से आगे है।** हर अतिरिक्त अक्षर search space को गुणा कर देता है। चार असंबंधित शब्द — `harbour-lantern-margarine-tricycle` — `X7$kq2!` से दोनों तरह लंबा है और याद रखने में आसान भी, और crack करने में कहीं कठिन। अपने मास्टर पासवर्ड के लिए passphrase चुनें और बाकी हर जगह random strings।

**Randomness vocabulary से आगे है।** पूरे character set में से चुनने वाला generator ऐसी string बनाता है जिसमें exploit करने को कोई pattern नहीं होता। wordlist में से चुनने वाला generator एक passphrase बनाता है, जो *यदि* शब्द असंबंधित हों और उनकी संख्या पर्याप्त हो तो ठीक है।

**Uniqueness strength से आगे है।** एक site पर इस्तेमाल किया गया 12-वर्ण वाला पासवर्ड ठीक है। वही 12-वर्ण वाला पासवर्ड 40 साइटों पर एक breach से 40 breaches दूर है। पासवर्ड मैनेजर मौजूद ही इसी बात को स्पष्ट करने के लिए है।

## Generator का उपयोग कैसे करें

इनमें से कोई भी, बिना किसी network के, offline में वास्तव में random output देता है:

```bash
openkey gen -l 24                       # 24 characters
openkey gen -l 32 -a -c                 # avoid confusing characters, copy to clipboard
openkey gen -l 20 --no-symbols          # for sites that reject symbols
openkey --json gen -l 24                # machine-readable output
```

App में, अपनी default length और character classes सेट करने के लिए **Settings → Password generator** खोलें, या किसी entry form से generator इस्तेमाल करें। जिन पासवर्ड्स को आप रखना चाहते हैं उनके लिए online generators से बचना समझदार है: आप किसी अजनबी के सर्वर से एक secret माँग रहे हैं, और आप यह सत्यापित नहीं कर सकते कि उसने उसके साथ किया क्या।

### लंबाई चुनना

| संदर्भ | लंबाई |
|---------|--------|
| आपका मास्टर पासवर्ड | 4–6 असंबंधित शब्द, या 20+ वर्ण |
| Email, banking, cloud account | 20+ random वर्ण |
| साधारण site account | 16+ random वर्ण |
| password-expiry policy वाली कोई भी चीज़ | 12–14 काफ़ी है, बशर्ते unique हो |

## Strength की जाँच

खोजने वाले लगातार "password strength checker" और "password strength tester" के बारे में पूछते हैं, और उपयोगी अंतर किसी *candidate* की जाँच करने और *जो आपके पास पहले से है* उसका audit करने के बीच है।

**किसी candidate के लिए:** पहले लंबाई, फिर जाँचें कि वह किसी breach list में नहीं है और न ही आपके नाम, site के नाम या मौजूदा साल से बनी है। उसे कहीं भेजने की ज़रूरत नहीं — length का अनुमान और pattern जाँच स्थानीय क्रियाएँ हैं।

**आपके vault के लिए:** आपको strength score नहीं, *reuse* report चाहिए। तीन सवाल मायने रखते हैं:

1. **क्या मैं एक से ज़्यादा site पर एक ही पासवर्ड इस्तेमाल करता हूँ?** यही वह निष्कर्ष है जो आपका जोखिम सचमुच बदल देता है।
2. **क्या यह पासवर्ड किसी जाने-पहचाने breach corpus में है?** किसी breach में आया पासवर्ड किसी भी लंबाई में बेकार है, क्योंकि वही string पहले से crackers की wordlists में मौजूद है।
3. **क्या किसी ऐसे खाते में यह पासवर्ड वर्षों से अपरिवर्तित है जिसमें कुछ कीमती रखा है?**

ध्यान दें कि OpenKey जान-बूझकर have-i-been-pwned को कोई call नहीं करता और password-health screen नहीं चलाता, और यह एक समझदार default है: कोई health screen या तो data बाहर भेजता है, या local breach corpus माँगता है। इसके बजाय audit हाथ से कीजिए — email, banking और cloud से शुरू कीजिए, और बाहर की ओर बढ़ते जाइए।

## कमज़ोर और दोहराए गए पासवर्ड ठीक करना

आपको एक साथ सब कुछ बदलने की ज़रूरत नहीं। प्राथमिकता दें:

1. **Email** — यह बाक़ी हर खाते को reset करता है।
2. **Banking और cloud** — cloud storage में बाक़ी सब रह सकता है।
3. **आपका मुख्य social account** — password-reset flows अक्सर email तक ले जाते हैं।
4. **आपका मास्टर पासवर्ड**, यदि वह छोटा है या कहीं दोहराया गया है।
5. **बाक़ी सब**, मौका आने पर, जैसे-जैसे हर site अगली बार आपसे पूछे।

एक व्यावहारिक workflow:

1. पहले autofill चालू करें, ताकि नए logins अपने आप सहेजे जाएँ।
2. हर priority खाते के लिए नया random पासवर्ड generate करें, **जबकि आप logged in हैं**।
3. उसे टाइप करने के बजाय generator से ही paste करें।
4. उसी समय 2FA चालू कर दें — आप पहले से security settings में हैं ([2FA guide](/hi/blog/two-factor-authentication))।
5. जहाँ दिया जाए वहाँ passkey जोड़ दें ([what are passkeys?](/hi/blog/what-are-passkeys))।
6. migration पूरी होने पर पुरानी plaintext export file मिटा दें ([Chrome से import](/hi/blog/import-passwords-from-chrome))।

## मोटे तौर पर नियम

- कभी दोहराएँ नहीं। इसे discipline से नहीं, generator से लागू करें।
- लंबाई वह सबसे सस्ती सुरक्षा है जो आपके पास है।
- सिर्फ़ इसलिए कि एक साल बीत गया, मज़बूत unique पासवर्ड rotate न करें। बिना कारण rotation बस उथल-पुथल है।
- बदलने पर मजबूर होकर पुराने पासवर्ड के अंत में `1` या `!` न जोड़ें — यह जाने-पहचाने string का predict होने वाला विस्तार है, और यही तरीका है जिससे "अलग-अलग" पासवर्डों का एक ही set बन जाता है।
- Generated पासवर्ड्स की spreadsheet न रखें। उन्हें vault में रखें, और एक encrypted offline backup अलग रखें।

## Search data क्या कहता है

Password generation एक बड़ा स्वतंत्र cluster है, पासवर्ड मैनेजर का सिर्फ़ उप-विषय नहीं। head term के स्तर पर, "password generator" "password manager" की लगभग **36%** रुचि खींचता है।

लोग "strong password generator" में जो refinements जोड़ते हैं (Google Trends, worldwide, last 12 months):

| संबंधित query | सापेक्ष रुचि |
|---------------|-------------------|
| google strong password generator | 100 |
| random strong password generator | 100 |
| random password generator | 99 |
| strong passwords | 58 |
| strong password generator online | 57 |
| generate strong password | 49 |
| password manager | 26 |
| apple strong password generator | 17 |

शीर्ष दो **Google** और **Apple** accounts के built-in generators हैं — लोग उस generator की तलाश कर रहे हैं जो उनका platform पहले से देता है, किसी third-party site की नहीं। 57 पर "strong password generator online" वह group है जिससे सावधान रहना चाहिए: online generator एक third party है जो आपके रखने के इरादे वाले secret को संभाल रहा है।

एक अलग cluster auditing की intent साफ़ दिखाता है। "password strength" के तहत संबंधित queries: *password strength checker* (100), *strength check* (51), *strength tester* (41), *strength tool* (28), *strength generator* (27)। "checker" और "tester" वाली phrasing लगभग पूरी तरह उस पासवर्ड को validate करने के बारे में है जो आपके पास पहले से है, इसीलिए जो कोई data बाहर नहीं भेजना चाहता उसके लिए हाथ से audit करना किसी in-app health screen से बेहतर है।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values normalized relative interest (0–100) हैं, search volumes नहीं।

## एक-मिनट का संस्करण

लंबाई complexity से आगे है, randomness vocabulary से आगे, और uniqueness दोनों से आगे। किसी website के बजाय local tool से generate करें, साधारण खातों के लिए 16+ random वर्ण और अपने मास्टर पासवर्ड के लिए multi-word passphrase लक्ष्य बनाएँ, और अपनी सीमित मेहनत उन खातों में लगाएँ जो बाक़ी सब को reset कर सकते हैं।

## अगले कदम

- [पासवर्ड मैनेजर क्या है?](/hi/blog/what-is-a-password-manager) — generated पासवर्ड कहाँ रहते हैं
- [Autofill passwords](/hi/blog/autofill-passwords) — signup पर अपने आप generate करें
- [Two-factor authentication](/hi/blog/two-factor-authentication) — दूसरी परत
- [CLI guide](/hi/guide/cli#password-generation-gen) — generation flags और character classes
