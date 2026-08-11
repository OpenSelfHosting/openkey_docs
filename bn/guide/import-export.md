# ইমপোর্ট ও এক্সপোর্ট

OpenKey ও অন্যান্য manager-এর মধ্যে passwords সরান, অথবা encrypted full-vault backup নিন। Path: **Settings → Data → Import & export** (`.okbak`-এর জন্য **Backup & Restore**)।

| Action | Free | Pro |
|--------|------|-----|
| Import (নিচের সব formats) | Yes | Yes |
| Export (নিচের সব formats) | — | Yes |
| Encrypted local backup / restore (`.okbak`) | — | Yes |

Exports ও backups ডিভাইসে decrypt করে file লিখে — প্রতিটি export **secret** মানুন। Offline encrypted storage প্রাথমিক। [FAQ](./faq) ও [Free vs Pro](./app#free-vs-openkey-pro) দেখুন।

## Import walkthrough

1. OpenKey unlock করুন।
2. **Settings → Data → Import & export → Import**।
3. Format বেছে নিন, file বেছে নিন, confirm করুন।
4. Vault-এ নতুন entries/collections review করুন। Server ব্যবহার করলে [server](./server)-এ sync করুন।

### Bitwarden JSON

1. Bitwarden-এ: **JSON** export (unencrypted export — file সুরক্ষিত রাখুন)।
2. OpenKey-এ: Import → **Bitwarden JSON**।
3. Folders যেখানে সম্ভব collections-এ map; logins entries হয়।

### Chrome / Edge CSV

1. Browser password manager → CSV export।
2. OpenKey → Import → **Chrome CSV**।
3. url / username / password columns প্রত্যাশিত; custom fields limited হতে পারে।

### LastPass CSV

1. LastPass → CSV export।
2. OpenKey → Import → **LastPass CSV**।

### 1Password CSV

1. 1Password → CSV export (OpenKey importer supported format)।
2. OpenKey → Import → **1Password CSV**।
3. Complex item types login-like entries-এ flatten হতে পারে।

### KeePass (`.kdbx`)

1. OpenKey → Import → **KeePass `.kdbx`**।
2. Database password ও optional **key file** দিন।
3. Groups collections হয়; fields cleanly map হলে entries logins হিসেবে import।

ভুল password / key file → unlock failed; server round-trip নয় (সব local)।

### OpenKey JSON

OpenKey-native exports-এর round-trip format। Server sync ছাড়া devices-এর মধ্যে সরান, অথবা portable vault dump-এর জন্য (**Pro** file বানাতে)।

**Attachments:** OpenKey JSON exports entries-এ attachment *metadata* দেয় কিন্তু **attachment ciphertext blobs omit** করে। Attachments সহ full vault-এর জন্য encrypted **`.okbak`** backup ব্যবহার করুন।

## Export walkthrough (Pro)

1. **Settings → Data → Import & export → Export**।
2. Format বেছে নিন। KeePass-এর জন্য নতুন database password (ও optional key file) সেট করুন।
3. File encrypted / offline স্থানে save করুন।
4. Migration শেষে plaintext exports মুছুন।

Available exports: **OpenKey JSON**, **Bitwarden JSON**, **Chrome CSV**, **LastPass CSV**, **KeePass `.kdbx`**, **1Password CSV**।

## Encrypted backup (Pro)

**Settings → Data → Backup & Restore**

- Vault credentials-এ restore-এর জন্য encrypted full-vault `.okbak` (database, settings, attachments) বানায়।
- Restore local vault data প্রতিস্থাপন করে — proceed-এর আগে confirm করুন।
- Nearby / server sync ব্যাকআপ **নয়** ([FAQ](./faq))।

## After migrating from another manager

1. গুরুত্বপূর্ণ logins (ও TOTP ব্যবহার করলে) spot-check করুন।
2. [autofill](./app) / [extension](./extension) enable করুন।
3. Server-এ sync অথবা অন্য devices-এর জন্য Nearby pair (Pro) করুন।
4. পুরানো export files securely wipe করুন।
5. ঐচ্ছিক: transfer-এ unencrypted CSV-এ থাকা passwords বদলান।

## সম্পর্কিত

- [Sharing & organizations](./sharing) — server-এ team ciphertext
- [Using the app](./app)
- [Security](./security) — exports trusted material

Next: [Download](./download) · [FAQ](./faq) · [CLI](./cli)
