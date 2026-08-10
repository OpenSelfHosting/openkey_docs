---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="خود میزبان پاس ورڈ مینیجر۔ سرور پر صرف سائفر ٹیکسٹ۔"
  cta-primary="ڈاؤن لوڈ"
  cta-secondary="شروع کریں"
  download-link="/ur/guide/download"
  quick-start-link="/ur/guide/quick-start"
/>

<HomeSections
  features-title="OpenKey کیوں"
  :features="[
    { title: 'صرف سائفر ٹیکسٹ', body: 'ڈیوائس پر Argon2id۔ سرور آپ کا ماسٹر پاس ورڈ یا والٹ کی کبھی نہیں دیکھتا۔', href: '/ur/guide/security', linkLabel: 'سیکیورٹی ماڈل' },
    { title: 'سیلف ہوسٹ یا Nearby', body: 'Docker API سے سنک — یا QR سے LAN پر ڈیوائسز جوڑیں، سرور کی ضرورت نہیں۔', href: '/ur/guide/nearby', linkLabel: 'Nearby گائیڈ' },
    { title: 'Autofill اور passkeys', body: 'سسٹم Autofill کے ساتھ براؤزر ایکسٹینشن، فل شارٹ کٹ اور WebAuthn۔', href: '/ur/guide/extension', linkLabel: 'براؤزر ایکسٹینشن' },
    { title: 'ٹیمیں بھی زیرو نالج', body: 'Orgs اور shares ایسی کیز سے encrypt جو سرور unwrap نہیں کر سکتا۔', href: '/ur/guide/sharing', linkLabel: 'شیئرنگ اور orgs' }
  ]"
  platforms-title="جہاں آپ کام کرتے ہیں"
  :platforms="['Android', 'iOS', 'macOS', 'Windows', 'Linux', 'Chrome / Firefox', 'Docker سرور', 'CLI']"
  how-title="سنک زیرو نالج کیسے رہتی ہے"
  :how-steps="['Argon2id سے ای میل + ماسٹر پاس ورڈ سے کیز بنائیں', 'لاگ ان کے لیے صرف auth hash بھیجیں', 'اپ لوڈ سے پہلے نام، entries اور attachments encrypt کریں', 'سرور opaque ciphertext رکھتا ہے — والٹ کی کبھی نہیں']"
  cta-title="اپنی انفرا پر شروع کریں"
  cta-body="ایپ ڈاؤن لوڈ کریں، سرور لگائیں، یا LAN-only سنک کے لیے Nearby جوڑیں۔"
  cta-primary="ڈاؤن لوڈ"
  cta-secondary="شروع کریں"
  cta-security="تھریٹ ماڈل پڑھیں"
  download-link="/ur/guide/download"
  quick-start-link="/ur/guide/quick-start"
  security-link="/ur/guide/security"
/>

</div>
