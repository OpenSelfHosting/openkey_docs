---
title: Zero-knowledge sync کی وضاحت
description: OpenKey سرور کو plaintext دیے بغیر ڈیوائسز پر والٹس کیسے sync کرتا ہے — Argon2id، auth hashes، اور صرف ciphertext storage۔
date: 2026-08-04
cover: /blog/covers/zero-knowledge-sync.png
---

# Zero-knowledge sync کی وضاحت

Sync مفید ہے۔ دور دراز مشین پر اپنے پاس ورڈز کا بھروسہ کرنا نہیں۔ OpenKey ان خیالات کو الگ رکھتا ہے: آپ فونز، desktops اور براؤزر ایکسٹینشن کے درمیان sync کر سکتے ہیں جبکہ سرور صرف **ciphertext** رکھتا ہے۔

## یہاں «zero-knowledge» کا کیا مطلب ہے

1. آپ کا ماسٹر پاس ورڈ ڈیوائس پر رہتا ہے۔ کلائنٹس email + ماسٹر پاس ورڈ اور نمک سے **Argon2id** کے ساتھ ماسٹر key نکالتے ہیں۔
2. Login `auth_hash` بھیجتا ہے — پاس ورڈ جاننے کا ثبوت کافی ہے، اسے بحال کرنے کے لیے کافی نہیں۔
3. **Vault key** collection کے ناموں اور entry payloads کو **AES-256-GCM** سے خفیہ کرتی ہے۔ سرور صرف لپٹی ہوئی (خفیہ شدہ) vault key رکھتا ہے، کبھی plaintext key نہیں۔
4. Attachments، organization کے نام اور share payloads ڈیوائس سے پہلے ہی خفیہ شدہ نکلتے ہیں۔ sync API غیر شفاف blobs محفوظ کرتی ہے؛ ڈیٹابیس کاپی ہونے پر بھی decrypt نہیں کر سکتی۔

## سرور کس لیے ہے

اختیاری OpenKey سرور sync اور auth سطح ہے:

- اکاؤنٹ رجسٹریشن اور login (`auth_hash` کے ذریعے)
- خفیہ شدہ vault payloads کا push / pull (ہر item کی `revision` پر last-write-wins)
- Organizations اور shares — rest پر پھر بھی ciphertext
- مختصر مدتی access JWTs اور hashed، rotated refresh tokens

یہ وہ جگہ **نہیں** جہاں آپ کا والٹ دوبارہ بنتا ہے۔ اگر آپ سرور URL کنفیگر نہیں کرتے تو ایپ پھر بھی مقامی خفیہ شدہ والٹ کے طور پر کام کرتی ہے۔ **ماسٹر پاس ورڈ recovery بھی نہیں**: اگر کھو دیا تو ciphertext ناقابلِ بحالی — آف لائن backup رکھیں۔

## LAN پر Nearby

PostgreSQL کھڑا کیے بغیر multi-device sync چاہیے؟ **Nearby** (Pro) مقامی Wi‑Fi پر ڈیوائسز pair کرتا ہے، مشترکہ vault key لنک کرتا ہے، اور انہی LWW اصول سے ان کے درمیان ciphertext sync کرتا ہے۔ Pairing اور vault link کو مکمل vault trust سمجھیں؛ یہ خفیہ شدہ backups کا متبادل نہیں۔

## یہ ماڈل کیوں اہم ہے

کلاؤڈ پاس ورڈ مینیجرز آپ سے ان کے infrastructure اور operators پر بھروسہ مانگتے ہیں۔ OpenKey آپ سے **اپنے** host (یا آپ کے کنٹرول والے VPS) پر صرف storage اور uptime کا بھروسہ مانگتا ہے — secrets کا نہیں۔ چوری شدہ ڈیٹابیس چوری شدہ والٹ نہیں بنتا۔

## مزید پڑھیں

- [سیکیورٹی](/ur/guide/security) — key derivation، threat model، اور operational checklist
- [سرور سیٹ اپ](/ur/guide/server) — Docker sync انسٹال کریں اور کلائنٹس لنک کریں
- [ایپ کا استعمال](/ur/guide/app) — Nearby، backups، اور روزمرہ vault استعمال
- [فوری آغاز](/ur/guide/quick-start) — stack مقامی طور پر چلائیں
