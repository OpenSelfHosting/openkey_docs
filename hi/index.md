---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="सेल्फ-होस्टेड पासवर्ड मैनेजर। सर्वर केवल सिफरटेक्स्ट रखता है।"
  cta-primary="डाउनलोड"
  cta-secondary="शुरू करें"
  download-link="/hi/guide/download"
  quick-start-link="/hi/guide/quick-start"
/>

<HomeSections
  features-title="OpenKey क्यों"
  :features="[
    { title: 'केवल सिफरटेक्स्ट', body: 'डिवाइस पर Argon2id। सर्वर आपका मास्टर पासवर्ड या वॉल्ट कुंजी कभी नहीं देखता।', href: '/hi/guide/security', linkLabel: 'सुरक्षा मॉडल' },
    { title: 'सेल्फ-होस्ट या Nearby', body: 'Docker API से सिंक करें — या QR से LAN पर डिवाइस पेयर करें, सर्वर की जरूरत नहीं।', href: '/hi/guide/nearby', linkLabel: 'Nearby गाइड' },
    { title: 'Autofill और passkeys', body: 'सिस्टम Autofill के साथ ब्राउज़र एक्सटेंशन, फिल शॉर्टकट और WebAuthn।', href: '/hi/guide/extension', linkLabel: 'ब्राउज़र एक्सटेंशन' },
    { title: 'टीमें भी ज़ीरो-नॉलेज', body: 'ऑर्ग और शेयर ऐसी कुंजियों से एन्क्रिप्ट होते हैं जिन्हें सर्वर अनरैप नहीं कर सकता।', href: '/hi/guide/sharing', linkLabel: 'शेयरिंग और ऑर्ग' }
  ]"
  platforms-title="जहाँ आप काम करते हैं"
  :platforms="['Android', 'iOS', 'macOS', 'Windows', 'Linux', 'Chrome / Firefox', 'Docker सर्वर', 'CLI']"
  how-title="सिंक ज़ीरो-नॉलेज कैसे रहता है"
  :how-steps="['Argon2id से ईमेल + मास्टर पासवर्ड से कुंजियाँ व्युत्पन्न करें', 'लॉगिन के लिए केवल auth hash भेजें', 'अपलोड से पहले नाम, एंट्री और अटैचमेंट एन्क्रिप्ट करें', 'सर्वर अपारदर्शी सिफरटेक्स्ट रखता है — वॉल्ट कुंजी कभी नहीं']"
  cta-title="अपने इन्फ्रा पर शुरू करें"
  cta-body="ऐप डाउनलोड करें, सर्वर पर पॉइंट करें, या LAN-only सिंक के लिए Nearby पेयर करें।"
  cta-primary="डाउनलोड"
  cta-secondary="शुरू करें"
  cta-security="थ्रेट मॉडल पढ़ें"
  download-link="/hi/guide/download"
  quick-start-link="/hi/guide/quick-start"
  security-link="/hi/guide/security"
/>

</div>
