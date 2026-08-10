# امپورٹ اور ایکسپورٹ

OpenKey اور دوسرے managers کے درمیان passwords منتقل کریں، یا encrypted مکمل-vault backup لیں۔ راستہ: **Settings → Data → Import & export** (اور `.okbak` کے لیے **Backup & Restore**)۔

| عمل | مفت | Pro |
|--------|------|-----|
| Import (نیچے تمام formats) | ہاں | ہاں |
| Export (نیچے تمام formats) | — | ہاں |
| Encrypted local backup / restore (`.okbak`) | — | ہاں |

Exports اور backups فائل لکھنے سے پہلے device پر decrypt ہوتے ہیں — ہر export کو **secret** سمجھیں۔ Offline encrypted storage ترجیح دیں۔ [FAQ](./faq) اور [مفت بمقابلہ Pro](./app#مفت-بمقابلہ-openkey-pro) دیکھیں۔

## Import walkthrough

1. OpenKey unlock کریں۔
2. **Settings → Data → Import & export → Import**۔
3. Format چنیں، فائل منتخب کریں، تصدیق کریں۔
4. Vault میں نئی entries/collections دیکھیں۔ اگر سرور استعمال کریں تو [سرور](./server) سے سنک کریں۔

### Bitwarden JSON

1. Bitwarden میں: **JSON** export (unencrypted export — فائل محفوظ رکھیں)۔
2. OpenKey میں: Import → **Bitwarden JSON**۔
3. Folders جہاں ممکن ہو collections میں map؛ logins entries بنتے ہیں۔

### Chrome / Edge CSV

1. Browser password manager → CSV export۔
2. OpenKey → Import → **Chrome CSV**۔
3. url / username / password columns توقع؛ custom fields محدود ہو سکتے ہیں۔

### LastPass CSV

1. LastPass → CSV export۔
2. OpenKey → Import → **LastPass CSV**۔

### 1Password CSV

1. 1Password → CSV export (OpenKey importer supported format)۔
2. OpenKey → Import → **1Password CSV**۔
3. پیچیدہ item types login جیسے entries میں سادہ ہو سکتے ہیں۔

### KeePass (`.kdbx`)

1. OpenKey → Import → **KeePass `.kdbx`**۔
2. Database password اور اختیاری **key file** درج کریں۔
3. Groups collections بنتے ہیں؛ fields صاف map ہوں تو entries logins کے طور پر import۔

غلط password / key file → unlock ناکام؛ server round-trip نہیں (سب local)۔

### OpenKey JSON

OpenKey-native exports کے لیے round-trip format۔ Server sync کے بغیر devices کے درمیان منتقلی، یا portable vault dump (**Pro** فائل بنانے کے لیے)۔

**Attachments:** OpenKey JSON exports entries پر attachment *metadata* شامل کرتے ہیں مگر **attachment ciphertext blobs چھوڑتے ہیں**۔ attachments سمیت مکمل vault کے لیے encrypted **`.okbak`** backup استعمال کریں۔

## Export walkthrough (Pro)

1. **Settings → Data → Import & export → Export**۔
2. Format چنیں۔ KeePass کے لیے نیا database password (اور اختیاری key file) سیٹ کریں۔
3. فائل encrypted / offline جگہ محفوظ کریں۔
4. migration ختم ہونے پر plaintext exports حذف کریں۔

دستیاب exports: **OpenKey JSON**، **Bitwarden JSON**، **Chrome CSV**، **LastPass CSV**، **KeePass `.kdbx`**، **1Password CSV**۔

## Encrypted backup (Pro)

**Settings → Data → Backup & Restore**

- مکمل-vault `.okbak` (database، settings، attachments) بناتا ہے، vault credentials سے restore کے لیے encrypted۔
- Restore مقامی vault ڈیٹا بدل دیتا ہے — آگے بڑھنے سے پہلے تصدیق کریں۔
- Nearby / server sync **backup نہیں** ([FAQ](./faq))۔

## دوسرے manager سے migration کے بعد

1. اہم logins (اور TOTP اگر استعمال کیا) چیک کریں۔
2. [autofill](./app) / [extension](./extension) فعال کریں۔
3. سرور سے سنک یا دوسری ڈیوائسز کے لیے Nearby (Pro) pair کریں۔
4. پرانے export files محفوظ طریقے سے مٹائیں۔
5. اختیاری: منتقلی میں unencrypted CSV میں رہے passwords بدلیں۔

## متعلقہ

- [شیئرنگ اور تنظیمیں](./sharing) — آپ کے سرور پر ٹیم ciphertext
- [ایپ کا استعمال](./app)
- [سیکیورٹی](./security) — exports trusted material ہیں

اگلا: [ڈاؤن لوڈ](./download) · [FAQ](./faq) · [CLI](./cli)
