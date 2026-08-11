---
title: OpenKey میں خوش آمدید
description: ہم نے self-hosted پاس ورڈ مینیجر کیوں بنایا جو صرف ciphertext ذخیرہ کرتا ہے — اور ایپ، سرور، ایکسٹینشن اور CLI میں کیا دستیاب ہے۔
date: 2026-08-05
cover: /blog/covers/welcome-to-openkey.svg
---

# OpenKey میں خوش آمدید

زیادہ تر پاس ورڈ مینیجرز آپ سے ایسے کلاؤڈ پر بھروسہ کرنے کو کہتے ہیں جس پر آپ کا اختیار نہیں۔ OpenKey دوسرا راستہ اختیار کرتا ہے: آپ کا والٹ ڈیوائس پر خفیہ شدہ رہتا ہے، اختیاری sync سرور **صرف ciphertext** رکھتا ہے، اور ماسٹر پاس ورڈز کبھی کلائنٹ سے باہر نہیں جاتے۔

## صرف ciphertext

کلائنٹس ڈیوائس سے کچھ بھی نکلنے سے پہلے والٹ ڈیٹا خفیہ کرتے ہیں۔ sync API — اگر آپ استعمال کریں — غیر شفاف blobs ذخیرہ کرتی ہے۔ collection کے نام، entry payloads، attachments، organization کے نام اور share ڈیٹا rest پر ciphertext ہی رہتے ہیں۔ ڈیٹابیس کے سمجھوتے سے نمک، KDF پیرامیٹرز، لپٹی ہوئی keys اور blobs ملتے ہیں — قابلِ مطالعہ logins نہیں۔

## آج کیا دستیاب ہے

| حصہ | کردار |
|-----|--------|
| **ایپ** | Android، iOS، macOS، Linux اور Windows پر روزمرہ والٹ — logins، cards، crypto wallets، developer secrets، organizations اور sharing |
| **سرور** | FastAPI + PostgreSQL zero-knowledge sync API جو آپ خود host کر سکتے ہیں |
| **ایکسٹینشن** | Chrome اور Firefox کے لیے MV3 autofill اور passkeys |
| **CLI** | آف لائن پاس ورڈ جنریشن، مقامی secret discovery، اور اختیاری sync |

آپ **Nearby** (Pro) سے ایک ہی Wi‑Fi پر ڈیوائسز کے درمیان والٹ sync بھی کر سکتے ہیں — اس LAN راستے کے لیے سرور درکار نہیں۔ سرور sync اور Nearby دونوں صرف ciphertext منتقل کرتے ہیں (revision کے لحاظ سے last-write-wins)۔

## شروع کریں

- [فوری آغاز](/ur/guide/quick-start) — stack مقامی طور پر چلائیں
- [ایپ کا استعمال](/ur/guide/app) — فون اور ڈیسک ٹاپ پر والٹ workflows
- [سیکیورٹی](/ur/guide/security) — zero-knowledge ماڈل اور threat boundaries
- [سرور سیٹ اپ](/ur/guide/server) — اپنا sync host انسٹال اور لنک کریں

بلاگ میں بھی: [zero-knowledge sync](/ur/blog/zero-knowledge-sync)، [بغیر سرور Nearby](/ur/blog/nearby-without-a-server)، [self-hosting](/ur/blog/self-host-your-vault)، [passkeys اور autofill](/ur/blog/passkeys-and-autofill)، اور [developer CLI](/ur/blog/cli-for-developers)۔ کوڈ [GitHub پر OpenSelfHosting](https://github.com/OpenSelfHosting) کے تحت ہے۔
