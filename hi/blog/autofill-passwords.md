---
title: "Autofill passwords: इसे सेट अप और ठीक कैसे करें"
description: Autofill क्या है, Chrome, Firefox, Safari और mobile पर password autofill कैसे चालू करें, और OpenKey logins, cards तथा passkeys कैसे भरता है।
date: 2026-09-14
cover: /blog/covers/autofill-passwords.png
---

# Autofill passwords: इसे सेट अप और ठीक कैसे करें

**Autofill** वह feature है जो पासवर्ड मैनेजर को "पासवर्ड यहाँ जमा होते हैं" की जगह से उस औज़ार में बदल देता है जिसे आप सचमुच इस्तेमाल करते हैं। vault खोलने, सही entry ढूँढ़ने और एक string कॉपी करने के बजाय, आप username field पर फ़ोकस करते हैं और एक suggestion सामने आ जाता है।

यही वह जगह है जहाँ ज़्यादातर लोग पहले खोजते हैं — "how to autofill", "autofill password", "autofill chrome", "autofill iphone" — और यही वह जगह है जहाँ ज़्यादातर लोग पहले हार मान देते हैं। तो: यह क्या है, हर जगह इसे कैसे चालू करें, और इसे भरोसेमंद कैसे बनाएँ।

## Autofill असल में करता क्या है

इस नाम को तीन अलग mechanisms साझा करते हैं:

1. **Form autofill** — login page पहचान लिया जाता है, मैनेजर मिलती हुई entries देता है, आप एक पर tap करते हैं, और username व password भर दिए जाते हैं।
2. **Save prompts** — login करने के बाद मैनेजर credentials store या update करने की पेशकश करता है।
3. **Password generation** — sign-up form पर मैनेजर एक मज़बूत पासवर्ड बना सकता है और जैसे ही आप टाइप करें, उसे field में लिख सकता है।

तीसरा वाला कम आँका जाने वाला हिस्सा है। signup के *दौरान* पासवर्ड generate करना उपलब्ध सबसे बड़ी आदत-बदलाव है: यह वह क्षण ही हटा देता है जहाँ आप कुछ कमज़ोर गढ़ते, क्योंकि आपके टाइप करने से पहले ही field भर चुका होता है।

## Chrome में autofill चालू करें

Chrome का built-in manager और कोई third-party manager, दोनों एक ही जगह रहते हैं, इसीलिए यह उलझन भरा हो जाता है।

1. `chrome://settings/addresses` खोलें (passwords and autofill)।
2. **Offer to save passwords** चालू करें।
3. अगर आप one-tap sign-in चाहते हैं, तो **Automatically sign in with saved passwords** चालू करें।
4. **Passwords, passkeys and autofill** के तहत वह manager चुनें जिसे आप इस्तेमाल करना चाहते हैं — Chrome का built-in, या आपके पासवर्ड मैनेजर का extension।
5. अगर आप extension इस्तेमाल करते हैं, तो उसका popup एक बार खोलकर पुष्टि करें कि वह unlocked है।

Keyboard से भरना भी आम तौर पर काम करता है: Windows और Linux पर `Ctrl+Shift+L`, macOS पर `⌘⇧L`। अगर कोई दूसरा extension पहले ही यह shortcut ले चुका है, तो browser के extension keyboard shortcuts में उसे remap कर दें।

## Firefox में autofill

Firefox का अपना built-in manager है और वह इस बात पर सख्त है कि कौन-से extensions भर सकते हैं। अगर suggestions नहीं दिखतीं, तो जाँचें कि extension को उस site पर अनुमति है, और कि extension unlocked है। Firefox native messaging host के लिए अपने आप `openkey@openselfhosting.local` इस्तेमाल करता है — उस platform पर manifest को हाथ से बदलने की ज़रूरत नहीं।

## iPhone और iPad पर autofill

iOS के पास Android जैसा कोई global "किसी भी app से भरें" toggle नहीं है। आप per-app flow में **AutoFill Passwords** का उपयोग करते हैं:

1. अपना पासवर्ड मैनेजर इंस्टॉल करें और system settings में उसे AutoFill provider के रूप में सक्षम करें।
2. जिस app में आप login कर रहे हैं, वहाँ username या password field पर tap करें और field menu (या keyboard की password row) से अपना provider चुनें।
3. prompt आने पर Face ID / Touch ID से स्वीकृत करें।

दो iOS बातें जानने लायक हैं: अगर OpenKey provider list में नहीं दिखता, तो वह system settings में सक्षम नहीं किया गया है; और providers बदलने के बाद iOS को कभी-कभी target app restart करने की ज़रूरत पड़ती है। [Passkeys](/hi/blog/what-are-passkeys) भी उसी AutoFill picker से चलते हैं, इसलिए वही setup दोनों को संभाल लेता है।

## Android पर autofill

Android एक असली system-wide password और passkey provider उपलब्ध कराता है, जो इसे mobile platforms में सबसे सहज बनाता है:

1. **Settings → Security → Autofill service** खोलें और अपना manager चुनें।
2. permission prompts स्वीकार करें।
3. अपने manager की settings में **inline suggestions** या **popup** चुनें, और वैकल्पिक रूप से हर fill से पहले biometric आवश्यक करें।
4. ऐसी site पर test login से पुष्टि करें जिसके लिए आपके पास पहले से credentials हैं।

हर fill से पहले biometric आवश्यक करना एक असली upgrade है: यह "कोई आपके खुले फ़ोन के पास आकर आपके inbox के पासवर्ड पढ़ ले" वाला छेद बंद कर देता है, बिना autofill को परेशान करने के।

## Desktop apps पर autofill

Desktop autofill एक दो-हिस्सों वाला handshake है। आप Autofill setting चालू करने पर app एक **native messaging host** register करता है, और browser extension फिर local socket के ज़रिए unlocked app से बात करता है। macOS पर host script को आपके `PATH` में Python 3 चाहिए; Linux और Windows पर setting टॉगल करते ही app manifests आपके लिए लिख देता है।

अगर extension app तक नहीं पहुँच पाता, तो लगभग हमेशा इसी handshake की वजह से होता है — पूरी checklist के लिए [autofill not working](/hi/blog/autofill-not-working) देखें।

## OpenKey autofill सेट अप करना

| Platform | कदम |
|----------|-------|
| Android | **Settings → Security** → OpenKey को system provider के रूप में सक्षम करें → vault unlock करें |
| iOS / macOS | system AutoFill settings में OpenKey चालू करें → OS prompts स्वीकार करें → target app restart करें |
| Windows / Linux | **Settings → Security** → native host register करने के लिए Autofill चालू करें |
| Browser | `openkey_extension` build और load करें → server URL सेट करें, या **Use desktop app** चुनें |

दो unlock modes उपलब्ध हैं। **Standalone** extension को आपके email और मास्टर पासवर्ड से आपके self-hosted server के विरुद्ध unlock करता है। **Desktop bridge** पहले से unlocked app के ज़रिए भरता है, बिना extension के अलग unlock के — आम तौर पर रोज़मर्रा का बेहतर अनुभव, क्योंकि app ही वह एक जगह है जहाँ आप unlock करते हैं।

पूरा walkthrough: [Browser extension guide](/hi/guide/extension)।

## Autofill एक security feature भी क्यों है

Autofill सिर्फ़ सुविधा नहीं है; यह एक नियंत्रण है।

- **Phishing resistance.** जो मैनेजर किसी login को उसी exact origin से मिलाता है जिसके लिए वह सहेजा गया था, वह किसी lookalike domain पर कुछ नहीं देगा। आपके बैंक की भारी-भरकम नकली कॉपी में पासवर्ड हाथ से paste करना वही हमला है जिसे autofill रोकता है।
- **कम plaintext copies।** कोई password manager app नहीं, कोई clipboard history entry नहीं, कोई notes file में बैठा पासवर्ड नहीं।
- **स्वाभाविक rotation।** जब कोई site नया पासवर्ड माँगे, तो inline generate करना अलग पासवर्डों को सबसे कम प्रयास वाला रास्ता बना देता है।

## Autofill और passkeys

Passkeys password field को पूरी तरह हटा देते हैं, इसलिए autofill के लिए कुछ बचता ही नहीं — credential vault से निकलकर उसी जगह sign हो जाता है। autofill के लिए जो unlock आप इस्तेमाल करते हैं, वही WebAuthn को भी संभाल लेता है, इसीलिए provider एक बार सेट अप करने से दोनों काम हो जाते हैं। [What are passkeys?](/hi/blog/what-are-passkeys)

## Search data क्या कहता है

Autofill एक बड़ा, intent-rich query cluster है। Google Trends (worldwide, last 12 months) से, "autofill" में लोग जो refinements जोड़ते हैं:

| संबंधित query | सापेक्ष रुचि |
|---------------|-------------------|
| how to autofill | 100 |
| autofill iphone | 44 |
| google autofill | 42 |
| chrome autofill | 38 |
| autofill password | 35 |
| autofill passwords | 28 |
| what is autofill | 21 |
| autofill extension | 17 |
| autofill settings | 13 |
| safari autofill | 12 |
| password manager | 10 |

इसे एक funnel की तरह पढ़ें: लोग बिना यह जाने आते हैं कि autofill क्या है, किसी खास platform पर उतरते हैं, फिर settings में अटक जाते हैं। और *troubleshooting* cluster के भीतर — आपस में तुलना किए गए long-tail terms के समूह में — "autofill not working" लगभग **55%** तक लोकप्रिय है "autofill extension" का, यानी बहुत बड़ी संख्या में ऐसे लोग हैं जिनका autofill टूट चुका है और जिन्हें tutorial से ज़्यादा किसी हल की ज़रूरत है।

वही data "google chrome autofill settings" को Chrome cluster के भीतर सबसे तेज़ी से बढ़ता refinement दिखाता है, साल-दर-साल लगभग 70% ऊपर।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values normalized relative interest (0–100) हैं, search volumes नहीं।

## अगर autofill काम नहीं कर रहा

दस में से नौ मामले इन पाँच में से एक होते हैं: vault locked है, system settings में ग़लत provider चुना गया है, extension app से जुड़ा नहीं है, provider बदलने के बाद browser restart चाहिए, या autofill जान-बूझकर एक browser तक सीमित है। चरण-दर-चरण संस्करण के लिए [autofill not working](/hi/blog/autofill-not-working) देखें।

## अगले कदम

- [Autofill not working](/hi/blog/autofill-not-working) — पूरी troubleshooting checklist
- [Browser extension](/hi/guide/extension) — install, unlock modes, native messaging
- [What are passkeys?](/hi/blog/what-are-passkeys) — autofill के चलने के बाद अगला कदम
- [ऐप का उपयोग](/hi/guide/app) — संदर्भ में Autofill और browser settings
