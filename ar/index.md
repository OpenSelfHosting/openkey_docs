---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="مدير كلمات مرور مستضاف ذاتياً. نص مشفّر فقط على الخادم."
  cta-primary="تنزيل"
  cta-secondary="ابدأ الآن"
  download-link="/ar/guide/download"
  quick-start-link="/ar/guide/quick-start"
/>

<HomeSections
  features-title="لماذا OpenKey"
  :features="[
    { title: 'نص مشفّر فقط', body: 'Argon2id على الجهاز. الخادم لا يرى كلمة المرور الرئيسية ولا مفتاح الخزنة.', href: '/ar/guide/security', linkLabel: 'نموذج الأمان' },
    { title: 'استضافة ذاتية أو Nearby', body: 'زامن عبر API على Docker — أو اقرن الأجهزة على LAN بـ QR دون خادم.', href: '/ar/guide/nearby', linkLabel: 'دليل Nearby' },
    { title: 'ملء تلقائي ومفاتيح مرور', body: 'Autofill النظام وامتداد متصفح مع اختصار ملء وWebAuthn.', href: '/ar/guide/extension', linkLabel: 'امتداد المتصفح' },
    { title: 'فرق بلا معرفة أيضاً', body: 'المنظمات والمشاركات تُشفَّر بمفاتيح لا يفكّها الخادم.', href: '/ar/guide/sharing', linkLabel: 'المشاركة والمنظمات' },
  ]"
  platforms-title="يعمل حيث تعمل"
  :platforms="['Android', 'iOS', 'macOS', 'Windows', 'Linux', 'Chrome / Firefox', 'خادم Docker', 'CLI']"
  how-title="كيف تبقى المزامنة بلا معرفة"
  :how-steps="[
    'اشتق المفاتيح من البريد + كلمة المرور الرئيسية بـ Argon2id',
    'أرسل تجزئة مصادقة فقط لتسجيل الدخول',
    'شفّر الأسماء والإدخالات والمرفقات قبل الرفع',
    'الخادم يخزّن نصاً مشفّراً غير شفاف — أبداً مفتاح الخزنة',
  ]"
  diagram-label="مزامنة بلا معرفة: المفاتيح على أجهزتك والخادم يخزّن نصاً مشفّراً فقط"
  diagram-device="الجهاز"
  diagram-encrypt="تشفير"
  diagram-on-device="على الجهاز"
  diagram-ciphertext="نص مشفّر"
  diagram-store="تخزين"
  diagram-opaque="غير شفاف"
  diagram-server="الخادم"
  diagram-nearby="أو Nearby على LAN — بلا خادم"
  cta-title="ابدأ على بنيتك الخاصة"
  cta-body="نزّل التطبيق، أشره إلى خادمك، أو اقرن Nearby للمزامنة على LAN فقط."
  cta-primary="تنزيل"
  cta-secondary="ابدأ الآن"
  cta-security="اقرأ نموذج التهديد"
  download-link="/ar/guide/download"
  quick-start-link="/ar/guide/quick-start"
  security-link="/ar/guide/security"
/>

</div>
