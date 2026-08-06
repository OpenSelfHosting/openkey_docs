# جائزہ

OpenKey ایک **self-hosted، end-to-end encrypted password manager** ہے۔ clients vault data device چھوڑنے سے پہلے encrypt کرتے ہیں۔ optional sync server **صرف ciphertext** store کرتا ہے — master passwords اور plaintext vault keys کبھی client نہیں چھوڑتے۔

## آپ کو کیا ملتا ہے

- Local encrypted vault (collections، logins، cards، crypto wallets، developer secrets)
- اپنے server کے ذریعے devices میں optional sync
- autofill اور passkeys کے ساتھ browser extension
- mobile / desktop app اور open developer CLI
- organizations، shared collections، اور item shares — server پر اب بھی ciphertext

## Zero-knowledge model

1. client **Argon2id** سے master password سے keys derive کرتا ہے۔
2. `auth_hash` master password ظاہر کیے بغیر server پر authenticate کرتا ہے۔
3. vault contents vault key سے encrypted رہتے ہیں جو server plaintext میں نہیں دیکھتا۔
4. names، payloads، attachments، org names، اور share payloads server پر opaque ciphertext۔

## Open packages

| Package | Role |
|---------|------|
| `openkey_server` | FastAPI zero-knowledge sync API + PostgreSQL |
| `openkey_extension` | MV3 browser extension (Chrome / Firefox) |
| `openkey_cli` | Developer CLI (secrets، password gen، sync) |

<img src="/guide/overview-ecosystem.svg" alt="OpenKey ecosystem: app, browser extension, and CLI encrypt on device; optional sync via self-hosted server (ciphertext only) or Nearby LAN pairing" class="ok-diagram" width="920" height="440" />

Mobile اور desktop **OpenKey app** الگ سے cover ہے۔ product usage کے لیے [ایپ کا استعمال](./app)، setup کے لیے [پیکجز](./packages)، sync install کے لیے [سرور سیٹ اپ](./server)، اور locally stack چلانے کے لیے [Quick start](./quick-start) دیکھیں۔
