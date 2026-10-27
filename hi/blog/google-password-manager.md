---
title: "Google Password Manager: कब रहें और कब move करें"
description: Google Password Manager क्या अच्छा करता है, कहाँ रुक जाता है, इससे export कैसे करें, और अपने पासवर्ड Chrome ecosystem से ऐसे vault में कैसे निकालें जो आपके नियंत्रण में हो।
date: 2026-09-21
cover: /blog/covers/google-password-manager.png
---

# Google Password Manager: कब रहें और कब move करें

"google password manager" head term **password manager** का सबसे मज़बूत refinement है — एक perfect 100 relative interest, हर competitor brand से आगे। "google password" भी 93 पर पीछे नहीं है। यह कोई संयोग नहीं है: "password manager" खोजने वाले बहुत से लोग पहले से एक इस्तेमाल कर रहे हैं और उन्हें पता भी नहीं, क्योंकि Google ने उनके लिए इसे चालू कर दिया था।

तो उपयोगी सवाल यह नहीं है कि "क्या यह अच्छा है?" — यह बहुत अच्छा है। सवाल यह है कि **कब रहें और कब move करें**।

## आपके पास जो पहले से है

Google Password Manager Chrome और Android में बना हुआ है, और Google account के ज़रिए दूसरे browsers पर भी काम करता है। यह passwords, passkeys, codes और payment cards रखता है, passwords generate करता है, compromised credentials पर निशान लगाता है, और आपके Google devices में autofill करता है। यह मुफ़्त है, और यह वास्तव में सक्षम है।

बहुत से लोगों के लिए, एक ही ecosystem में, यह बिना आगे सोचे सही जवाब है।

## पाँच कारण जिनकी वजह से लोग निकलते हैं

### 1. Ecosystem lock-in

Vault आपके Google account में रहता है। यह तब तक बढ़िया है जब तक आप निकलना नहीं चाहते — और तब आपके पासवर्ड एक Google export format के अंदर हैं, और आपने इसके चारों ओर जो कुछ बनाया था (families, sharing, hardware keys) भी उसके साथ ही चला गया।

### 2. Ecosystem के बाहर sharing

Google accounts के बीच sharing अच्छी तरह काम करती है और बाक़ी हर किसी के साथ अटपली है। अगर आपके household या team में कोई Google पर नहीं है, तो आप entries दोहराने पर मजबूर होते हैं या किसी असुरक्षित चीज़ पर लौट जाते हैं।

### 3. Self-hosting नहीं

Sync को अपने hardware पर चलाने का कोई विकल्प नहीं है। अगर encrypted data अपने नियंत्रण वाली infrastructure पर रखना एक शर्त है, तो यह पसंद नहीं, अयोग्य है।

### 4. Browser से बँधापन

अगर आप Firefox या Safari इस्तेमाल करते हैं, तो Chrome का manager आपका native autofill provider नहीं है। आप वापस किसी third-party extension या platform के अपने store पर आ जाते हैं, और integration का लाभ गायब हो जाता है।

### 5. Security model एक trade है

Vault आपके Google account credentials और device unlock से सुरक्षित रहता है, और Google's account recovery एक backstop है। यह एक ठीक-ठाक design है — पर यह एक मूलतः अलग trust model है, उस zero-knowledge vault से जहाँ कोई भी, provider सहित, आपका data recover नहीं कर सकता। दोनों ग़लत नहीं हैं। ये "अगर मैं अपना मास्टर पासवर्ड भूल जाऊँ तो fallback कौन है" के दो अलग जवाब हैं, और आपको सबसे आसान वाला नहीं, अपने हिसाब से सहज वाला चुनना चाहिए।

## रहना: Google Password Manager को अच्छा बनाएँ

अगर आप रह रहे हैं, तो ये वे settings हैं जिनका मायने है:

1. **Passkeys चालू करें** जहाँ sites उन्हें देती हैं — वे सबसे मज़बूत credential हैं और manager इन्हें अच्छे से संभालता है।
2. **Signup पर built-in generator चालू करें**, ताकि नए passwords कभी बनाए न जाएँ।
3. **Password Checkup देखें** (Security → Password Checkup) और दोहराए या compromised entries पर कार्रवाई करें।
4. **एक recovery email और recovery phone जोड़ें** जो आप सच में नियंत्रित करते हों।
5. **Google account पर ही एक passkey दूसरे factor के रूप में जोड़ें** — सिर्फ़ पासवर्ड नहीं।
6. **Encrypted sync चालू करें** अगर आपके region में उपलब्ध है, और किसी shared machine पर कभी logged-in browser profile को unlocked न छोड़ें।

## Move करना: Chrome से export

Chrome का export एक plain CSV है। यह तेज़ है, और यही वह file है जिसे लोग सबसे ज़्यादा ग़लती से इधर-उधर छोड़ देते हैं — इसे अपने पासवर्ड की एक जीवित copy की तरह मानें।

```bash
# Take a backup of the export before you do anything else
cp passwords.csv ~/secure-backup-dir/chrome-export-$(date +%F).csv
```

1. `chrome://password-manager/settings` खोलें।
2. **Export passwords** ढूँढ़ें (या `chrome://password-manager/export`)।
3. CSV सेव करें।
4. उसे **तुरंत** Downloads folder से हटाकर encrypted storage में ले जाएँ।

CSV में `name`, `url`, `username`, `password` और `note` columns होते हैं। Custom fields सीमित हैं, और आपके account setup के हिसाब से cards अलग export में आ सकते हैं।

## ऐसे manager में import करना जो आपके नियंत्रण में हो

OpenKey में: **Settings → Data → Import & export → Import → Chrome CSV**। File चुनें, confirm करें, और import locally चलता है — आपकी plaintext किसी server पर नहीं जाती।

क्या अपेक्षा करें: logins entries के रूप में आते हैं, `url` site match बनता है, `username` और `password` सीधे map होते हैं, और `note` entry की notes field बन जाता है। Chrome के export में nested folders होते ही नहीं, इसलिए बाद में collection structure बनाना पड़ेगा — उपयोगी structure **trust level के हिसाब से collections** (finance, work, shopping, throwaway) है, site के हिसाब से नहीं।

फिर:

1. नए manager में **autofill चालू करें**, कुछ भी करने से पहले ([setup guide](/hi/blog/autofill-passwords))।
2. **Chrome का autofill बंद करें** ताकि दोनों आपस में न लड़ें: `chrome://settings/addresses` → saved passwords से automatic sign-in बंद करें, और password manager को नए पर सेट करें।
3. नया vault सत्यापित होने के बाद **अपना Chrome password store मिटा दें** — `chrome://password-manager/settings` → **Delete passwords from Chrome**।
4. **CSV सुरक्षित रूप से मिटाएँ।**
5. **महत्वपूर्ण पासवर्ड rotate करें** जो plaintext में समय बिता चुके थे: email, banking, cloud।

पूरा walkthrough, troubleshooting सहित: [Chrome से import करें](/hi/blog/import-passwords-from-chrome)।

## एक सुझाया हुआ collection structure

Import होने के बाद, आदत के बजाय trust के हिसाब से पुनर्गठन करें:

| Collection | सामग्री | निपटाना |
|-----------|----------|----------|
| Finance | Banking, payments, tax | जहाँ संभव हो 2FA के साथ passkey भी |
| Identity | Email, government, cloud root | सबसे मज़बूत पासवर्ड, passkeys, hardware key backup |
| Work | Employer accounts | कभी दोहराए न जाएँ; offboarding पर समीक्षा करें |
| Shopping | जो कुछ भी one-off है | लंबे random पासवर्ड, 2FA पर कोई मेहनत नहीं |
| Devices | Router, NAS, camera, smart home | Generated, और offline भी रखा जाए |

## Search data क्या कहता है

Google का brand इस श्रेणी का gravitational centre है। Google Trends (worldwide, last 12 months) में "password manager" के refinements:

| संबंधित query | सापेक्ष रुचि |
|---------------|-------------------|
| **google password manager** | **100** |
| google password | 93 |
| what is a password manager | 39 |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| windows password manager | 8 |
| apple password manager | 8 |
| microsoft password manager | 7 |
| bitwarden | 7 |
| gmail password manager | 5 |
| samsung password manager | 5 |
| 1password | 4 |

उस table की आकृति ध्यान से पढ़िए। चारों platform built-ins — Google, Windows, Apple, Microsoft — सब दिखते हैं, और query का "app" रूप "google password manager app" पर 100 पर settle होता है। इसके बीच dedicated-brand terms कहीं नीचे हैं: Bitwarden 7 पर, 1Password 4 पर।

इस श्रेणी की search traffic मुख्यतः **"मेरे पास पहले से एक है, जो ठीक है"** है, "मुझे चुनने में मदद करें" नहीं। इस क्षेत्र में कुछ भी प्रकाशित करने वालों के लिए दो परिणाम: searchers के एक बड़े हिस्से को buying guides से ज़्यादा migration और troubleshooting content चाहिए, और platform built-ins features की बजाय defaults पर मुक़ाबला कर रहे हैं।

एक अलग cluster वही पैटर्न दिखाता है — "password manager android" के नीचे "google password manager android" 100 पर आगे है, "chrome password manager android" 20 पर, और "best free password manager android" साल-दर-साल लगभग 80% बढ़ रहा है। "chrome password manager" के नीचे एकमात्र मज़बूत संबंधित query "chrome password manager security" है, जो 100 पर है और लगभग 50% बढ़ रहा है — यह ऐसा पढ़ता है जैसे लोग यह पूछ रहे हों कि यह सुरक्षित है या नहीं, इसका उपयोग कैसे करें।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values normalized relative interest (0–100) हैं, search volumes नहीं।

## एक-मिनट का संस्करण

Google Password Manager मुफ़्त है, अच्छा है, और सही जवाब है अगर आपकी पूरी ज़िंदगी एक Google ecosystem में है और आपको Google को recovery path के रूप में स्वीकार्य लगता है। इसे छोड़ दें अगर आपको non-Google accounts के साथ sharing चाहिए, cross-browser native autofill चाहिए, या अपना server चाहिए। अगर आप निकलते हैं, तो CSV निकालें, उसे locally import करें, नए manager में autofill चालू करें, Chrome का autofill बंद करें, Chrome के संग्रहीत पासवर्ड मिटाएँ, CSV shred करें, और जो कुछ plaintext में रहा था उसे rotate करें।

## अगले कदम

- [Chrome से import करें](/hi/blog/import-passwords-from-chrome) — पूरा walkthrough
- [पासवर्ड मैनेजर क्या है?](/hi/blog/what-is-a-password-manager) — मूल बातें
- [Autofill passwords](/hi/blog/autofill-passwords) — switch को seamless बनाएँ
- [Self-hosted password manager](/hi/blog/self-hosted-password-manager) — अपना data ख़ुद रखने का रास्ता
