---
title: براؤزر میں passkeys اور autofill
description: OpenKey براؤزر اور سسٹم credential provider کے طور پر logins اور passkeys کیسے بھرتا ہے — vault ڈیٹا کلائنٹ پر خفیہ شدہ رکھتے ہوئے۔
date: 2026-08-02
cover: /blog/covers/passkeys-and-autofill.svg
---

# براؤزر میں passkeys اور autofill

فون پر والٹ کہانی کا آدھا حصہ ہے۔ روزمرہ login Chrome، Firefox اور OS credential UI میں ہوتا ہے — اس لیے OpenKey **MV3** براؤزر ایکسٹینشن اور mobile/desktop پر سسٹم Autofill / Credential Provider سپورٹ بھیجتا ہے۔

## ایکسٹینشن کیا کرتا ہے

- آپ کے vault کے خلاف unlock (desktop ایپ سے مقامی bridge، اور/یا self-hosted sync)
- ویب forms پر مماثل logins تجویز کرتا ہے
- WebAuthn / passkey flows سپورٹ کرتا ہے جہاں سائٹ پیش کرے
- sync پر ایپ جیسا ہی سرور URL استعمال کرتا ہے

`openkey_extension` سے build اور load کریں:

```bash
cd openkey_extension
npm install
npm run build
```

`dist/` فولڈر unpacked extension کے طور پر load کریں۔ Desktop پر OpenKey ایپ unlock کریں اور native messaging host رجسٹر کریں، یا standalone mode میں سرور کے خلاف ایکسٹینشن unlock کریں۔ sync استعمال کریں تو Options میں سرور URL سیٹ کریں، پھر email اور ماسٹر پاس ورڈ سے unlock کریں۔

## سسٹم Autofill بھی

ایپ میں **Settings → Autofill** کے تحت OpenKey کو سسٹم پاس ورڈ اور passkey provider کے طور پر فعال کریں۔ یہ راستہ ایسی ایپس اور براؤزرز کو cover کرتا ہے جو OS credential store سے بات کرتے ہیں — ایکسٹینشن کی تکمیل، ہر پلیٹ فارم پر اس کی جگہ نہیں۔

## پھر بھی zero-knowledge

Autofill کلائنٹ پر unlock کے بعد چلتا ہے۔ ایکسٹینشن یا OS provider صرف ضرورت کی چیز decrypt کرتا ہے۔ Sync — اگر فعال — پھر بھی غیر شفاف ciphertext کا تبادلہ کرتا ہے۔ سمجھوتہ شدہ sync ڈیٹابیس بھرے ہوئے پاس ورڈز کا dump نہیں بنتا۔ غیر قابلِ اعتماد ویب صفحات کو secrets صرف جان بوجھ کر autofill mediation سے ملنی چاہئیں۔

## باقی stack کے ساتھ

| کلائنٹ | کردار |
|--------|--------|
| ایپ | فون اور desktop پر روزمرہ vault؛ سسٹم Autofill / passkeys |
| ایکسٹینشن | Chrome / Firefox میں autofill اور passkeys |
| CLI | Developer secrets اور generation |
| سرور | اختیاری ciphertext sync |

## مزید جانیں

- [ایپ کا استعمال](/ur/guide/app) — Autofill، براؤزر، backups
- [Packages](/ur/guide/packages) — ایکسٹینشن سیٹ اپ
- [سرور سیٹ اپ](/ur/guide/server) — ایکسٹینشن اپنے host سے جوڑیں
- [سیکیورٹی](/ur/guide/security) — ایکسٹینشن اور native messaging کے لیے trust boundaries
