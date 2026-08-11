# इंपोर्ट और एक्सपोर्ट

OpenKey और अन्य managers के बीच passwords move करें, या encrypted full-vault backup लें। Path: **Settings → Data → Import & export** (और `.okbak` के लिए **Backup & Restore**)।

| Action | Free | Pro |
|--------|------|-----|
| Import (नीचे सभी formats) | Yes | Yes |
| Export (नीचे सभी formats) | — | Yes |
| Encrypted local backup / restore (`.okbak`) | — | Yes |

Exports और backups device पर decrypt होकर file लिखते हैं — हर export को **secret** मानें। Offline encrypted storage प्राथमिक। [FAQ](./faq) और [Free vs Pro](./app#free-vs-openkey-pro) देखें।

## Import walkthrough

1. OpenKey unlock करें।
2. **Settings → Data → Import & export → Import**।
3. Format चुनें, file चुनें, confirm करें।
4. Vault में नई entries/collections review करें। Server उपयोग करते हैं तो [server](./server) पर sync करें।

### Bitwarden JSON

1. Bitwarden में: **JSON** export (unencrypted export — file सुरक्षित रखें)।
2. OpenKey में: Import → **Bitwarden JSON**।
3. Folders जहाँ संभव collections में map; logins entries बनते हैं।

### Chrome / Edge CSV

1. Browser password manager → CSV export।
2. OpenKey → Import → **Chrome CSV**।
3. url / username / password columns अपेक्षित; custom fields limited हो सकते हैं।

### LastPass CSV

1. LastPass → CSV export।
2. OpenKey → Import → **LastPass CSV**।

### 1Password CSV

1. 1Password → CSV export (OpenKey importer supported format)।
2. OpenKey → Import → **1Password CSV**।
3. Complex item types login-like entries में flatten हो सकते हैं।

### KeePass (`.kdbx`)

1. OpenKey → Import → **KeePass `.kdbx`**।
2. Database password और optional **key file** दर्ज करें।
3. Groups collections बनते हैं; fields cleanly map होने पर entries logins के रूप में import।

गलत password / key file → unlock failed; server round-trip नहीं (सब local)।

### OpenKey JSON

OpenKey-native exports के लिए round-trip format। Server sync बिना devices के बीच move, या portable vault dump के लिए उपयोग करें (file बनाने के लिए **Pro**)।

**Attachments:** OpenKey JSON exports entries पर attachment *metadata* include करते हैं लेकिन **attachment ciphertext blobs omit** करते हैं। Attachments सहित full vault के लिए encrypted **`.okbak`** backup उपयोग करें।

## Export walkthrough (Pro)

1. **Settings → Data → Import & export → Export**।
2. Format चुनें। KeePass के लिए नया database password (और optional key file) सेट करें।
3. File encrypted / offline स्थान पर save करें।
4. Migration पूरी होने पर plaintext exports delete करें।

Available exports: **OpenKey JSON**, **Bitwarden JSON**, **Chrome CSV**, **LastPass CSV**, **KeePass `.kdbx`**, **1Password CSV**।

## Encrypted backup (Pro)

**Settings → Data → Backup & Restore**

- Vault credentials से restore के लिए encrypted full-vault `.okbak` (database, settings, attachments) बनाता है।
- Restore local vault data replace करता है — proceed से पहले confirm करें।
- Nearby / server sync backup **नहीं** ([FAQ](./faq))।

## After migrating from another manager

1. महत्वपूर्ण logins (और TOTP यदि उपयोग किया) spot-check करें।
2. [autofill](./app) / [extension](./extension) enable करें।
3. Server पर sync या अन्य devices के लिए Nearby pair (Pro) करें।
4. पुरानी export files securely wipe करें।
5. वैकल्पिक: transfer के दौरान unencrypted CSV में रहे passwords बदलें।

## संबंधित

- [Sharing & organizations](./sharing) — server पर team ciphertext
- [Using the app](./app)
- [Security](./security) — exports trusted material हैं

Next: [Download](./download) · [FAQ](./faq) · [CLI](./cli)
