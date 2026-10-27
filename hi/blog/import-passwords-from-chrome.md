---
title: Chrome से passwords import करें
description: Chrome, Edge और Google Password Manager से passwords कैसे export करें, किसी दूसरे password manager में import कैसे करें, और फिर export को सुरक्षित रूप से कैसे मिटाएँ।
date: 2026-09-25
cover: /blog/covers/import-passwords-from-chrome.png
---

# Chrome से passwords import करें

Export करना आसान हिस्सा है। ख़तरनाक हिस्सा उसके बाद के दस मिनट हैं, जब आपके हर पासवर्ड वाला एक plaintext CSV आपके Downloads folder में पड़ा होता है।

यह पूरी प्रक्रिया है: Chrome, Edge या Google Password Manager से export करें; अपने नए vault में import करें; सत्यापित करें; फिर file नष्ट कर दें। पहली बार के लिए पंद्रह मिनट रखें।

## पहले समझें कि आप बना क्या रहे हैं

Chrome password export एक **plaintext CSV** है। जो भी इसे खोलेगा, उसके पास आपके पासवर्ड हैं — कोई मास्टर पासवर्ड नहीं, कोई encryption नहीं, कोई second factor नहीं। इसे ऐसे मानें जैसे आपके घर की चाबियों की एक छपी हुई सूची।

पूरी प्रक्रिया के लिए तीन नियम:

1. **इसे कभी email न करें, message न करें, और किसी converter site पर upload न करें।** पासवर्ड export को किसी third-party "convert my CSV" tool पर upload करना आपका पूरा vault सौंप देना है।
2. **Import उसी डिवाइस पर करें जहाँ file पहले से है।** File को इधर-उधर ले जाना आपका exposure बढ़ा देता है।
3. **Import सत्यापित होते ही export मिटा दें** — ठीक से, सिर्फ़ trash खाली करके नहीं।

## Chrome से export करें

Chrome का built-in manager और Google Password Manager (account-synced वाला संस्करण) एक ही export path इस्तेमाल करते हैं, और दोनों यहाँ शामिल हैं।

1. `chrome://password-manager/settings` खोलें।
2. **Export passwords** तक scroll करें, या सीधे `chrome://password-manager/export` पर जाएँ।
3. Chrome आपसे दोबारा authenticate करने को कहता है — अपना Google account password या device credentials डालें।
4. File सेव करें, फिर **उसे Downloads से हटाकर** किसी encrypted जगह ले जाएँ, और यह सब कुछ और करने से पहले करें।

```bash
# Immediately get it out of Downloads and note the date
mkdir -p ~/secure-vault-staging
mv ~/Downloads/passwords*.csv ~/secure-vault-staging/chrome-export-$(date +%F).csv
chmod 600 ~/secure-vault-staging/chrome-export-*.csv
```

### File में क्या है

| Column | सामग्री |
|--------|----------|
| `name` | Site का नाम, जैसा Chrome ने सेव किया |
| `url` | पूरा URL, subdomain सहित |
| `username` | आपका username या email |
| `password` | पासवर्ड, plaintext में |
| `note` | आपने जो भी note जोड़ा |

कोई folder structure नहीं है — Chrome के पास folders होते ही नहीं। सब कुछ flat आता है, इसीलिए बाद का collection चरण मायने रखता है।

## Edge से export करें

Microsoft Edge वही Chromium password store इस्तेमाल करता है:

1. `edge://wallet/passwords` खोलें।
2. **More settings → Export passwords**, या `edge://wallet/exportpasswords` पर जाएँ।
3. दोबारा authenticate करें, सेव करें, file को किसी encrypted जगह ले जाएँ।

## सीधे Google Password Manager से export करें

अगर आप devices के बीच account-synced manager इस्तेमाल करते हैं, तो किसी भी logged-in browser पर `passwords.google.com` → **Export passwords** से export कर सकते हैं। यह वही CSV बनाता है, और वही नियम लागू होते हैं।

## OpenKey में import करें

1. OpenKey इंस्टॉल करें और unlock करें।
2. **Settings → Data → Import & export → Import**।
3. **Chrome CSV** चुनें।
4. File चुनें और confirm करें।

Import पूरी तरह local होता है। कोई server round-trip नहीं, और आपकी plaintext किसी sync server पर नहीं जाती — यह तब मायने रखता है जब आप self-hosted server इस्तेमाल करते हैं, क्योंकि CSV कभी ऐसी चीज़ नहीं बनती जिसे सर्वर से माँगा जा सके।

जब आप एक साथ कई sources जोड़ रहे हों, तो अन्य supported formats: **Bitwarden JSON**, **LastPass CSV**, **1Password CSV**, **KeePass `.kdbx`** (database password और वैकल्पिक key file), और OpenKey का अपना JSON। Folders जहाँ साफ़ी से map हों, collections बन जाते हैं।

## पुनर्गठन: trust level के हिसाब से collections बनाएँ

Import flat है, और flat vaults में दोहरे पासवर्ड पनपते हैं क्योंकि आप जोखिम नहीं देख पाते। तीस मिनट की सफ़ाई अपनी लागत निकाल लेती है:

| Collection | इसमें क्या जाता है | नियम |
|-----------|-----------------|------|
| Identity | Email, cloud root, government | सबसे मज़बूत पासवर्ड, passkeys, hardware-key backup |
| Finance | Banking, payment cards, tax | सब कुछ पर 2FA; जहाँ मिले वहाँ passkeys |
| Work | Employer accounts | कभी दोहराए न जाएँ; offboarding checklist |
| Shopping and social | जो कुछ भी one-off है | लंबे generated पासवर्ड, कोई मेहनत खर्च नहीं |
| Devices | Router, NAS, cameras, smart home | Generated; offline भी संग्रहीत |

फिर अपने लिए एक नियम बना लें: **Shopping या Social में दोहराया पासवर्ड लेकर कोई नई चीज़ नहीं जाती।** autofill चालू होने पर यह वैसे भी अपने आप हो जाता है।

## तुरंत autofill चालू करें

यही वह चरण है जो migration को self-repairing बनाता है। autofill काम करने के बाद, यहाँ से आगे हर login आपके लिए सेव हो जाता है, तो ज़रूरी खाते निपटाते हुए vault ख़ुद को बेहतर बनाता रहता है।

- [Autofill passwords](/hi/blog/autofill-passwords) — setup guide
- [Autofill not working](/hi/blog/autofill-not-working) — जब suggestions न मिलें

फिर **Chrome का अपना autofill बंद करें** ताकि दोनों आपस में न लड़ें:

1. `chrome://settings/addresses`।
2. **Offer to save passwords** और **Automatically sign in with saved passwords** बंद करें।
3. Password manager को वही सेट करें जिसे आप इस्तेमाल करना चाहते हैं।

## सबसे ज़्यादा मूल्य वाले खाते ठीक करें

400 पासवर्ड rotate करने की कोशिश न करें। एक सूची पर नीचे से काम कीजिए:

1. **Email** — यह बाक़ी सब reset करता है।
2. **Banking और cloud storage** — cloud में बाक़ी रह सकता है।
3. **आपका मुख्य social account**।
4. बाक़ी सब, जैसे-जैसे हर site अगली बार पूछे।

हर पासवर्ड काम करते हुए locally generate करें:

```bash
openkey gen -l 24 -c
```

Security settings में पहले से खड़े होते हुए 2FA जोड़ें ([guide](/hi/blog/two-factor-authentication)), और जहाँ site passkey देती हो वहाँ passkey जोड़ें ([what are passkeys?](/hi/blog/what-are-passkeys))।

## कुछ भी मिटाने से पहले सत्यापित करें

यह क़दम न छोड़ें। जाँचें:

- [ ] कुछ महत्वपूर्ण logins नए vault से ठीक से खुलते हैं।
- [ ] TOTP entries, अगर आपके पास थीं, valid codes देती हैं।
- [ ] Autofill आपके मुख्य browser **और** फ़ोन पर काम करता है।
- [ ] आप **दूसरे डिवाइस** पर sign in कर सकते हैं और वही entries दिखती हैं।
- [ ] आपने एक **encrypted local backup** ले लिया है (OpenKey में `.okbak`)।

तभी deletion की ओर बढ़ें।

## Export मिटाएँ, ठीक से

```bash
# Overwrite the file, then remove it
for f in ~/secure-vault-staging/chrome-export-*.csv; do
  dd if=/dev/urandom of="$f" bs=1M count=8 conv=notrunc status=none
  rm -f "$f"
done
```

जहाँ उपलब्ध हो, वहाँ `shred` ज़्यादा भरोसेमंद है, पर SSDs और copy-on-write filesystems पर दोनों तरीके भरोसेमंद नहीं हैं। व्यावहारिक जवाब यह है: जितना हो सके overwrite करें, फिर जो कुछ plaintext में इतनी देर रहा कि चिंता करने लायक हो, उसे rotate कर दें।

एक हफ़्ते तक plaintext CSV में रहा पासवर्ड कोई संकट नहीं; वही पासवर्ड एक साल बाद भी उसी file में रहा तो संकट है।

फिर browser में संग्रहीत copy मिटाएँ: `chrome://password-manager/settings` → **Delete passwords from Chrome**।

## Search data क्या कहता है

Migration एक बड़ा, विशिष्ट intent है — searcher जानता है कि वह *क्या करना* चाहता है, क्या ख़रीदना नहीं। Google Trends (worldwide, last 12 months) इन migration terms की आपस में तुलना करता है:

| Query | Cluster में सापेक्ष रुचि |
|-------|-------------------------------|
| export passwords chrome | 100 |
| **import passwords from chrome** | **46** |
| chrome password manager export | 11 |
| move passwords to another password manager | 1 |
| import passwords from lastpass | 0.1 |

पहले दो ही पूरी कहानी हैं, और उनके बीच का अनुपात उपयोगी नतीजा है: **लोग export को import से दुगुनी से ज़्यादा खोजते हैं।** सुरक्षा के लिहाज़ से यह उल्टा क्रम है, क्योंकि export वह exposed artifact बनाता है और import वह हिस्सा है जो समस्या ठीक करता है। जो content export path से शुरू हो, उसे तुरंत import पर और फिर deletion चरण पर हस्तांतरित करना चाहिए।

Long tail भी पतला है और ज़्यादातर English-native phrasing, जो एक छोटे, साफ़-सीमा वाले दर्शक का संकेत है जो vocabulary पहले से जानता है — यानी वह पाठक जिसे किसी तुलना से ज़्यादा एक सटीक walkthrough से लाभ होता है।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values normalized relative interest (0–100) हैं, search volumes नहीं।

## एक-मिनट का संस्करण

`chrome://password-manager/settings` से export करें, plaintext CSV को तुरंत Downloads से बाहर ले जाएँ, उसे locally अपने नए vault में import करें, trust level के हिसाब से collections बनाएँ, autofill चालू करें और Chrome वाला बंद करें, email और banking rotate करें, दूसरे डिवाइस पर सत्यापित करें, फिर CSV को overwrite करके मिटाएँ और Chrome की संग्रहीत copy हटा दें।

## अगले कदम

- [Autofill passwords](/hi/blog/autofill-passwords) — पासवर्ड rotate करने से पहले यह करें
- [Google Password Manager](/hi/blog/google-password-manager) — वही walkthrough, Google के ecosystem के आसपास framed
- [Strong password generator](/hi/blog/strong-password-generator) — किस चीज़ पर rotate करें
- [Import & export](/hi/guide/import-export) — हर supported format, free vs Pro
