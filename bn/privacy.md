# গোপনীয়তা নীতি

**Last updated:** 6 August 2026  
**Product:** OpenKey (`com.openselfhosting.openkey`)  
**Publisher:** OpenSelfHosting  
**Contact:** [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com) · Security: [security@openselfhosting.com](mailto:security@openselfhosting.com)

এই গোপনীয়তা নীতি বর্ণনা করে **OpenKey** mobile ও desktop app তথ্য কীভাবে handle করে। OpenKey একটি **zero-knowledge** password manager হিসেবে ডিজাইন: vault secrets device ছাড়ার আগে আপনার device-এ encrypt হয়।

সম্পর্কিত পড়ুন: [Security](/bn/guide/security) · [সেবার শর্তাবলী](/bn/terms)

## সারাংশ

| Topic | Practice |
|-------|----------|
| Master password | আপনার device-এ plaintext-এ কখনো যায় না |
| Vault contents | Device-এ encrypted (AES-256-GCM); optional sync শুধু **ciphertext** পাঠায় |
| আমাদের cloud | OpenKey আপনার passwords-এর mandatory vendor vault cloud **চালায় না** |
| Self-hosted server | connect করলে **আপনি** (অথবা org) operate করেন ও সেই data control করেন |
| Store billing | Pro purchases Apple / Google / Microsoft store billing-এর মাধ্যমে যেখানে উপলব্ধ |

## কাকে কভার করে

এই policy official OpenKey **app** (Android, iOS, macOS, Windows, Linux)-এ প্রযোজ্য। আলাদা packages (self-hosted server, browser extension, CLI, documentation site) same zero-knowledge principles অনুসরণ করে; self-hosted server operators সেই instance-এর operational data-এর controllers (নিচে দেখুন)।

## তথ্য যা আমরা collect না করি

OpenSelfHosting **পায় না** আপনার:

- Master password
- Plaintext vault key
- Decrypted logins, notes, TOTP secrets, payment cards, crypto wallet data, developer secrets, বা attachment contents
- আপনি যে websites visit করেন তাদের full page HTML (browser extension pages vendor cloud-এ exfiltrate না করে)

আমরা personal data বিক্রি না করি।

## আপনার device-এ processed তথ্য

OpenKey নিম্নলিখিত **locally** আপনার device-এ store ও process করে (unlock setup-এর পর at rest encrypted):

- Vault database (collections, entries, attachments metadata/blobs as ciphertext যখন locked/synced)
- App settings (appearance, language, autofill preferences, আপনি যে server URL দেন, Nearby preferences)
- Unlock material-এর optional biometric wrap (OS secure enclave / keystore handle করে যেখানে উপলব্ধ)
- আপনি যে server **configure** করেন তার cached sync tokens (access JWTs / refresh material app store করে সেই host-এর জন্য)

App delete বা device wipe করলে local data সরে, OS backups যা আপনি control করেন তার অধীনে।

## Optional self-hosted sync server

**Settings → Data → Self-hosted server** enable করলে app **আপনার** API (অথবা যা বেছে নেন)-এ পাঠায়:

- Email (account identifier)
- Client-derived `auth_hash` (master password নয়)
- Salt ও KDF parameters
- Wrapped (encrypted) vault key ও vault items, attachments, orgs, shares-এর opaque ciphertext

OpenKey project-এর reference server **ciphertext only** store করার জন্য designed। যে server run করে (আপনি, company, বা trusted host) metadata দেখতে পারে যেমন email, ciphertext sizes, timestamps, data delete বা withhold করতে পারে — কিন্তু design অনুযায়ী vault contents decrypt না করতে পারে। দেখুন [Security](/bn/guide/security)।

## Nearby LAN sync (Pro)

Nearby আপনার local network-এ devices pair করে, **Link vault**-এর পর সেই devices-এর মধ্যে vault ciphertext sync করে। Pairing ও vault-key sharing আপনার LAN-এ chosen devices-এর মধ্যে। OpenSelfHosting Nearby traffic receive না করে।

## Optional password health (Have I Been Pwned)

Optional breached-password check enable করলে OpenKey Have I Been Pwned range API-তে শুধু **SHA-1 hash prefix** (k-anonymity) পাঠাতে পারে। Password itself কখনো upload নয়। feature off রাখতে পারেন।

## Autofill, passkeys, ও browser extension

- **System Autofill / Credential Provider** credentials apps ও sites-এর সাথে share করে শুধু OS-mediated fill flows-এর মাধ্যমে যা আপনি initiate বা approve করেন।
- **Browser extension** আপনার server-এর against unlock করতে পারে বা unlocked desktop app (native messaging)-এর মাধ্যমে fill করতে পারে। Fill ও save intentional user actions। দেখুন [Browser extension](/bn/guide/extension)।

## Purchases ও subscriptions (OpenKey Pro)

Pro app store-এর মাধ্যমে বিক্রি হলে payment processing, receipts, related account data **Apple, Google, বা Microsoft** handle করে তাদের policies অনুযায়ী। OpenKey Pro features unlock করতে store entitlements / purchase status পেতে পারে। stores থেকে full payment card number receive না করি।

Nearby peers-এর মধ্যে **LAN Pro** attestation কিছু desktop platforms-এ local convenience — OpenSelfHosting-এর cloud billing account নয়।

## Diagnostics ও support

OpenKey-তে mandatory third-party analytics SDK নেই যা vault content upload করে। support email ([openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)) বা Telegram community channels-এ আপনি choose করেন কী include করবেন (যেমন app version)। Cleartext email-এ master passwords বা vault exports না পাঠান।

## Children's privacy

OpenKey 13 বছরের কম (অথবা jurisdiction-এ required minimum age) children-এর জন্য directed নয়। সেই age-এর কম হলে app ব্যবহার না করুন।

## International processing

Processing আপনার devices-এ, sync configure করলে chosen server host-এ। contact করলে messages regions-এ process হতে পারে যেখানে mail বা support tools operate করে।

## Retention

- **On device:** vault delete, app uninstall, বা device / backups wipe না করলে।
- **On your sync server:** server account delete বা operator data delete না করলে; tombstones peers sync হওয়া পর্যন্ত থাকতে পারে।
- **Support email:** respond ও legitimate security/legal purposes-এর জন্য যত দরকার retain।

## আপনার choices

- Server ছাড়াই fully offline OpenKey ব্যবহার
- Nearby pairing choose বা refuse
- Optional HIBP checks disable
- Local data export বা delete (export / backup Pro লাগতে পারে)
- Authenticated delete flow-এ server account delete (server ciphertext সরায়; local copies wipe করতে হবে)
- Store subscription management-এর মাধ্যমে store subscriptions revoke

## Changes

Product বদলালে policy update করতে পারি। “Last updated” date বদলবে; material changes [changelog](/bn/guide/changelog) বা in-app About links-এ noted হতে পারে।

## Contact

- Product / support: [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)
- Security reports: [security@openselfhosting.com](mailto:security@openselfhosting.com) — দেখুন [Reporting vulnerabilities](/bn/guide/security#reporting-vulnerabilities)
- Organization: [OpenSelfHosting](https://github.com/OpenSelfHosting) · Product: [openkey.openselfhosting.com](https://openkey.openselfhosting.com) · Company: [openselfhosting.com](https://openselfhosting.com)

Next: [সেবার শর্তাবলী](/bn/terms) · [Security](/bn/guide/security) · [অ্যাপ ব্যবহার](/bn/guide/app)
