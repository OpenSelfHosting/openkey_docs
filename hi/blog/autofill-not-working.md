---
title: "Autofill not working: असल में काम करने वाले हल"
description: Chrome, Firefox, Safari और mobile पर password autofill क्यों रुक जाता है — पाँच आम कारण और उनके हल, संभावना के क्रम में।
date: 2026-09-15
cover: /blog/covers/autofill-not-working.png
---

# Autofill not working: असल में काम करने वाले हल

Autofill सिखली भर predict होने वाले तरीकों से टूटता है। व्यवहार में कारण लगभग कभी bug नहीं होता: वह होता है locked vault, चुना गया ग़लत provider, ऐसा bridge जो connect करना छोड़ चुका है, कोई app जिसे restart चाहिए, या कोई browser जो चुपचाप कहीं और से भरने लगा है।

इन्हें संभावना के क्रम में सँवालिए। इसमें लगभग पाँच मिनट लगते हैं और यह अधिकांश मामले सँवाल देता है।

## हल 1: Vault unlock करें

बहुत बड़े अंतर से सबसे आम कारण, और सबसे आसानी से छूटने वाला, क्योंकि app *दिखने में* इंस्टॉल और सक्षम लगता है।

- **Extension standalone mode:** extension का popup खोलकर उसे unlock करें। locked extension कुछ भी decrypt नहीं कर सकता, इसलिए कुछ भी देता नहीं।
- **Desktop bridge mode:** desktop app unlock होना चाहिए। vault locked रहने पर bridge डिज़ाइन के तौर पर काम करने से मना कर देता है।
- **Mobile:** field पर फ़ोकस करने से पहले app खोलकर unlock करें। idle होने पर lock होने का मतलब autofill भी रुक जाता है।

अगर suggestions केवल unlock करने के तुरंत बाद दिखती हैं और फिर गायब हो जाती हैं, तो आपका जवाब यही है।

## हल 2: System provider जाँचें

अपना पासवर्ड मैनेजर बदलने से यह हमेशा नहीं बदलता कि OS क्या देता है।

| Platform | कहाँ देखें |
|----------|----------------|
| Android | Settings → Security → **Autofill service** |
| iOS / iPadOS | Settings → Passwords → **AutoFill Passwords** |
| macOS | System Settings → General → **AutoFill & Passwords** |
| Windows | Settings → Accounts → **Passwords** (credential providers) |
| Chrome | Settings → Passwords, passkeys and autofill → **Password manager** |

अगर दो managers सक्षम हैं, तो OS एक चुन लेता है और दूसरा broken दिखाई देता है। जिसे आप नहीं चाहते उसे बंद कर दें, या जिसे आप चाहते हैं उसे सोच-समझकर चुनें — और browser में भी वही चुनाव पुष्टि करें।

## हल 3: Target app या browser restart करें

Credential provider बदलना हमेशा चल रहे process में असर नहीं करता। यह सामान्य बात है, bug नहीं:

- Mobile: जिस app में autofill करना चाहते हैं उसे force-quit करें, फिर दोबारा खोलें।
- Desktop: browser को पूरी तरह quit करें (सिर्फ़ window नहीं) और दोबारा खोलें।
- अगर browser ही समस्या है, तो कुछ भी बदलने से पहले उसे restart करें — extension reload होने पर native host अक्सर दोबारा register हो जाता है।

## हल 4: Desktop bridge दोबारा जोड़ें

Desktop autofill दो-हिस्सों वाला handshake है: app एक native messaging host register करता है, और extension उससे local socket के ज़रिए बात करता है। host registration के missing या stale होने पर यह fail होता है।

1. OpenKey desktop app unlock करें।
2. **Settings → Security** खोलें और Autofill टॉगल करें — इससे native messaging host दोबारा register होता है।
3. Chromium browsers में, अपना unpacked extension ID platform file में लिखें, फिर Autofill दोबारा टॉगल करें ताकि manifest दोबारा बने:

| Platform | Extension ID file |
|----------|-------------------|
| Windows | `%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt` |
| Linux | `~/.local/share/OpenKey/chrome_extension_id.txt` |

4. Extension में **Use desktop app** चुनें।
5. केवल macOS: पुष्टि करें कि आपके `PATH` में Python 3 है — host script को उसकी ज़रूरत है।

जाँच करते समय यह भी सुनिश्चित करें कि vault **अब भी unlocked** है। bridge socket केवल unlocked session के दौरान ही मौजूद रहता है।

## हल 5: मुक़ाबली manager की जाँच करें

Chrome और Edge दोनों built-in password storage के साथ आते हैं, और दोनों खुद-ब-खुद भरते रहने से नहीं चुकते। अगर suggestions "गायब" हो जाती हैं और credentials फिर भी भर दिए जाते हैं, तो वह काम built-in manager कर रहा है।

- browser settings में saved passwords के लिए automatic sign-in बंद करें, या
- built-in entry मिटा दें और login अपने manager को सौंप दें।

यही टकराव iCloud Keychain और किसी third-party AutoFill provider के बीच, और उन दो extensions के बीच भी दिखाई देता है जो दोनों `<all_urls>` माँगते हैं।

## Platform-विशिष्ट कारण

### Chrome

Extension site access: `chrome://extensions` → आपका extension → **Details** → Site access → *On all sites*, या explicit grants पसंद हों तो *On click*। Autofill को fields पहचानने के लिए page access चाहिए।

अगर किसी दूसरे extension ने fill shortcut ले लिया है, तो `chrome://extensions/shortcuts` में remap करें।

### Firefox

Firefox पहली बार किसी site पर भरने की इच्छा जताने पर extension से permission माँगता है, और कुछ all-sites requests चुपचाप ठुकरा देता है। `about:addons` → Permissions → Access your data for all websites में extension की permissions जाँचें।

Firefox `openkey@openselfhosting.local` native host अपने आप इस्तेमाल करता है; उस platform पर manifest पर हाथ से काम की ज़रूरत नहीं।

### Safari

Safari का AutoFill और आपका manager अलग-अलग panels हैं। System Settings में manager सक्षम करें, फिर Safari में सुनिश्चित करें कि **Passwords** autofill चालू है। अगर system settings में क्रम बदल गया हो, तो Safari किसी *दूसरे* credential provider से भी auto-fill कर सकता है — सिर्फ़ toggle नहीं, चुनाव का क्रम भी जाँचें।

### iOS और Android

- **Per-app state:** iOS providers केवल किसी field के menu में देता है, इसलिए लक्षण "विकल्प वहाँ है ही नहीं" होता है, "इसने ग़लत चीज़ भर दी" नहीं।
- **Permission prompts:** setup के दौरान OS local-network या biometric permissions माँगता है। मना किया गया prompt टूटे हुए manager जैसा दिखता है।
- **Biometrics before fill:** अगर आपने fill से पहले biometric चालू किया है, तो अब हर fill को स्वीकृति चाहिए। यह सही व्यवहार है, कोई कमी नहीं।
- **Background restrictions:** Android के aggressive battery optimisers provider process को मार सकते हैं, इसलिए suggestions केवल तब दिखती हैं जब app foreground में हो।

## Browser के autofill audit से पता लगाना

Browsers एक diagnostic लेकर आते हैं जो बताता है कि उन्होंने कौन-सा field देखा, कौन-सा suggestion दिया, और उसे क्यों ठुकरा। इससे अंदाज़ा लगाना दो मिनट की प्रक्रिया बन जाता है।

Chrome में DevTools → **Application** → **Autofill** खोलें, फिर page पर वही fill दोहराएँ। आपको मिलते हैं पहचाने गए fields, दिए गए dropdown items, और किसी भी suppression का कारण। जब card या address autofill ही नाकाम हो रहा हो, तो `autofill.creditCards` और `autofill.profiles` को `chrome://flags` में टॉगल भी किया जा सकता है।

Firefox: `about:debugging` → extension को inspect करें, और उसके console में fill-time errors देखें।

## अगर आप खासकर OpenKey इस्तेमाल करते हैं

| Symptom | जाँच |
|---------|-------|
| Browser में कोई suggestion नहीं | Extension unlocked, या desktop app unlocked और **Use desktop app** चुना हुआ |
| "Extension desktop app से बात नहीं कर सकता" | Native host registration, extension ID file, macOS पर Python 3 |
| Android पर कुछ नहीं | Android में **Settings → Security → Autofill** चालू, फिर app unlock करें |
| iOS पर कुछ नहीं | system settings में AutoFill provider सक्षम; target app restart करें |
| Passkeys browser पर वापस चले जाते हैं | **Use browser** चुनने पर, या extension vault locked होने पर यह अपेक्षित है |
| Fill होता है, save नहीं | पुष्टि करें कि in-page save banner को page block नहीं कर रहा |

Extension को fields पहचानने, logins पकड़ने और किसी भी site पर WebAuthn intercept करने के लिए `<all_urls>` host access चाहिए — कोई fixed allowlist पूरे खुले web को कवर नहीं कर सकती। वह जो कुछ भी decrypt करता है वह आपके डिवाइस या आपके अपने सर्वर पर रहता है; page content किसी vendor cloud को नहीं भेजा जाता।

## Search data क्या कहता है

यह एक बड़ा query cluster है, जो इससे जूझ चुके किसी भी व्यक्ति के लिए अच्छा संकेत है। long-tail autofill troubleshooting terms की आपस में तुलना (Google Trends, worldwide, last 12 months):

| Query | Cluster में सापेक्ष रुचि |
|-------|-------------------------------|
| autofill extension | 100 |
| autofill safari | 71 |
| **autofill not working** | **55** |
| password autofill chrome | 33 |
| chrome autofill not working | 2 |

"Autofill not working" तक generic "autofill extension" term से आधे से ज़्यादा रुचि तक पहुँचने का मतलब है कि बहुत बड़ा दर्शक पहले से टूटी हुई हालत में आता है। खासकर Chrome cluster के तहत "google chrome autofill settings" 100 पर शीर्ष संबंधित query है और लगभग +70% साल-दर-साल सबसे तेज़ी से बढ़ने वाला भी, जबकि "chrome autofill extension" 62 पर और "chrome autofill not working" 16 पर है।

यह वितरण एक खास support strategy का संकेत देता है: settings-ओरिएंटेड content और एक भरोसेमंद troubleshooting checklist किसी और feature announcement से ज़्यादा लोगों तक पहुँचेगी।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values normalized relative interest (0–100) हैं, search volumes नहीं।

## 30-सेकंड का संस्करण

Vault unlock करें। पुष्टि करें कि सही system provider चुना गया है। App या browser restart करें। Native host दोबारा register करने के लिए app में Autofill दोबारा टॉगल करें। किसी भी मुक़ाबली manager को बंद करें। अगर फिर भी fail हो, तो browser का autofill audit खोलें और rejection reason पढ़ें — वह समस्या का नाम बताता है।

## अगले कदम

- [Autofill passwords](/hi/blog/autofill-passwords) — setup गाइड
- [Browser extension](/hi/guide/extension) — unlock modes और native messaging का विवरण
- [FAQ & troubleshooting](/hi/guide/faq) — OpenKey-विशिष्ट हल
- [What are passkeys?](/hi/blog/what-are-passkeys) — वह credential type जो पासवर्ड की जगह लेता है
