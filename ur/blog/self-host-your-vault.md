---
title: اپنا پاس ورڈ vault خود host کیوں کریں
description: کنٹرول، رازداری، اور sync سرور جو صرف ciphertext رکھتا ہے — Docker کے ساتھ اپنے hardware پر OpenKey کیسے چلائیں۔
date: 2026-08-03
cover: /blog/covers/self-host-your-vault.svg
---

# اپنا پاس ورڈ vault خود host کیوں کریں

پاس ورڈ مینیجرز آپ کی ڈیجیٹل زندگی کے مرکز میں ہیں۔ جب وہ vault صرف کسی اور کے کلاؤڈ میں ہو تو outages، policy changes اور breaches *آپ* کا خطرہ بن جاتے ہیں۔ Self-hosting ڈیفالٹ بدل دیتی ہے: آپ مشین، backups اور API تک کون پہنچ سکتا ہے منتخب کرتے ہیں۔

## آپ کیا کنٹرول کرتے ہیں

| آپ کے پاس | سرور کبھی نہیں پاتا |
|-----------|---------------------|
| ciphertext کہاں ذخیرہ ہے | ماسٹر پاس ورڈ |
| upgrades اور backups کب چلیں | Plaintext vault keys |
| کون سے کلائنٹس connect کر سکتے ہیں (`CORS_ORIGINS`، HTTPS) | قابلِ مطالعہ entry نام یا پاس ورڈز |
| sync بالکل آن ہے یا نہیں | Decrypted attachments یا shares |

OpenKey ایپ مقامی خفیہ شدہ ڈیٹابیس کے ساتھ آف لائن کام کرتی ہے۔ multi-device sync چاہیں تو **Settings → Data → Self-hosted server** میں اپنا instance دکھائیں — zero-knowledge اصول ویسے ہی۔ کم از کم ایک **خفیہ شدہ مقامی backup** رکھنا بہتر؛ سرور بھولا ہوا ماسٹر پاس ورڈ recover نہیں کر سکتا۔

## ایک عملی ڈھانچہ

بہت سے لوگ home NAS یا چھوٹے VPS پر Docker سے شروع کرتے ہیں:

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # JWT_SECRET (min 32 characters; placeholders are rejected)
docker compose up --build -d
```

سامنے TLS لگائیں (Caddy، Traefik، یا اپنا reverse proxy)، لمبا unique `JWT_SECRET` سیٹ کریں، اور `CORS_ORIGINS` کو اپنی ایپ اور ایکسٹینشن origins تک محدود رکھیں — کبھی `*` نہیں۔ پھر پہلی ڈیوائس سے **Register** اور باقی سے **Login** کریں، اور واضح pull/push چاہیں تو **Sync now** استعمال کریں۔

## بغیر سرور LAN

اگر صرف ایک ہی Wi‑Fi پر ڈیوائسز چاہیں تو **Nearby** vault sync (Pro) PostgreSQL کے بغیر LAN پر vaults pair اور link کر سکتا ہے۔ سہولت کے لیے استعمال کریں؛ تب بھی disaster recovery کے لیے آف لائن backups رکھیں۔

## یہ کس کے لیے ہے

- وہ افراد جو SaaS vault کے بغیر sync چاہتے ہیں
- ٹیمیں جنہیں shared collections چاہیں مگر crypto کلائنٹس پر
- Developers جو پہلے سے PostgreSQL چلاتے ہیں اور Compose سے واقف ہیں

OpenKey مقامی طور پر استعمال کرنے کے لیے self-host ضروری نہیں۔ آپ self-host کرتے ہیں جب **اپنا** sync plane چاہیں — ciphertext-only storage سخت اصول کے ساتھ۔

## اگلے مراحل

- [سرور سیٹ اپ](/ur/guide/server) — انسٹال، configure، کلائنٹس لنک کریں
- [ایپ کا استعمال](/ur/guide/app) — vault workflows، Nearby، import/export
- [سیکیورٹی](/ur/guide/security) — hardening checklist اور threat model
- [جائزہ](/ur/guide/overview) — packages اور zero-knowledge ماڈل
