# Nearby LAN সিঙ্ক

**OpenKey Pro** আপনার স্থানীয় Wi‑Fi-তে ডিভাইসগুলোর মধ্যে একই ভল্ট **স্ব-হোস্ট সার্ভার ছাড়াই** সিঙ্ক করতে পারে। Ciphertext একটি paired LAN session-এ চলে; ভল্ট কী শেয়ার হয় শুধু যখন আপনি স্পষ্টভাবে **Link vault** করেন।

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: pair with QR or code for a session key, explicitly link vault to share the vault key, then sync ciphertext on the LAN; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

এই পৃষ্ঠা pairing, QR codes, vault link, send-entry, LAN Pro, এবং trust rules কভার করে। সংক্ষিপ্ত troubleshooting: [FAQ](./faq#nearby-does-not-find-the-other-device-pro)। Threat model: [Security](./security)।

## প্রয়োজনীয়তা

- সিঙ্ক করতে চান প্রতিটি ডিভাইসে OpenKey Pro (অথবা non–store-IAP প্ল্যাটফর্মে বৈধ **LAN Pro** attestation — নিচে দেখুন)
- উভয় ডিভাইস unlocked এবং **একই LAN**-এ (guest Wi‑Fi / client isolation নয়)
- উভয় পক্ষে **Settings → Nearby devices** চালু

Nearby **ব্যাকআপ নয়**। Pro [encrypted `.okbak`](./import-export#encrypted-backup-pro) রাখুন।

## ডিভাইস pair করুন

1. উভয় ডিভাইসে OpenKey unlock করুন → **Settings → Nearby devices**।
2. **Visible on local network** চালু করুন (মনে রাখা হয়: ভল্ট unlocked থাকলে পরবর্তী unlock-এ resume)।
3. যেকোনো একটিতে pair করুন:
   - **QR (প্রাথমিক):** advertising ডিভাইস pairing QR দেখায়; অন্য ডিভাইসে **Scan pairing QR** ট্যাপ করুন (অথবা Linux/Windows-এ **Paste pairing QR**) — code টাইপ করার দরকার নেই।
   - **Short code:** প্রায় দুই মিনিটের মধ্যে peer-এ দেখানো code দিন।
4. Pairing-এর পর **Link vault** ট্যাপ করুন যাতে উভয় একই vault-key fingerprint শেয়ার করে। Pairing একাই vault key auto-share না করে।

ভল্ট কী ভিন্ন হলে, receiving ডিভাইস peer-এর কী **adopt** করতে পারে (master-password confirmation-এর পর local vault data প্রতিস্থাপন)। Link + adopt-কে full vault trust মানুন।

### Firewall / dial-back

কিছু desktop (বিশেষ করে macOS) inbound TCP ব্লক করে। QR scan-এ connect ব্যর্থ হলে OpenKey QR host-কে guest-এ dial-back করতে বলতে পারে (unicast UDP only — pairing code LAN-এ broadcast নয়)। OS prompt-এ local-network / firewall অনুমতি দিন। একই subnet প্রাথমিক; VPN ও private relay প্রায়ই discovery ভাঙে। অনেক ভুল code-এ short lockout।

## Linking-এর পর

- উভয় ভল্ট unlocked ও Nearby advertising চালু থাকলে changes স্বয়ংক্রিয় সিঙ্ক।
- Manual catch-up-এ **Sync now** ব্যবহার করুন।
- সিঙ্ক **revision অনুযায়ী last-write-wins** (একই নিয়ম [server](./server) যেমন) — যেখানে সম্ভব এক ডিভাইসে edit করুন।
- **Trusted devices:** এক সফল pair + vault link-এর পর peers reconnect ও সিঙ্ক যখনই Nearby চালু — re-pairing নয়।
- **Trusted networks only (ঐচ্ছিক):** home/office Wi‑Fi SSID যোগ করুন; current SSID তালিকায় না থাকলে Nearby pause (তালিকা খালি হলে start ব্লক)। OS SSID পড়তে না পারলে warning banner-সহ Nearby চলতে পারে।
- **Unpair** LAN trust revoke, সিঙ্ক বন্ধ, এবং সেই peer-এর LAN Pro claims সাফ করতে।

## Entry পাঠান

Full vault sync-এর অপেক্ষা ছাড়াই paired peer-এ single login push করতে পারেন:

1. Entry খুলুন (অথবা **Settings → Nearby devices**-এ Nearby peer actions)।
2. সেই peer-এর জন্য **Send to device** / send entry বেছে নিন।
3. Peer LAN session-এ ciphertext পায় এবং locally store করতে পারে।

LAN-এ one-off share-এর জন্য; peers একই self-hosted server ব্যবহার করলে [organizations & sharing](./sharing) প্রাথমিক।

## LAN Pro attestation {#lan-pro-attestation}

Store in-app purchase **বিহীন** প্ল্যাটফর্মে (সাধারণত Windows / Linux), **vault-linked** Pro peer **LAN Pro** status শেয়ার করতে পারে যাতে অন্য ডিভাইস Nearby-তে Pro limits unlock করে। Pairing একাই যথেষ্ট নয় — প্রথমে **Link vault** ট্যাপ করুন।

- শুধু সুবিধা — purchase-এর **cryptographic proof নয়**।
- Android, iOS, এবং macOS (store IAP) LAN Pro **ignore** করে; সেই store-এ Pro কিনুন বা restore করুন।
- Unpairing attestation বন্ধ করে।

## Trust সারাংশ

| Action | Trust implication |
|--------|-------------------|
| Pair | LAN-এ সেই peer-এর সাথে session key |
| Link vault | Vault-key material শেয়ার — peer full vault ciphertext সিঙ্ক করতে পারে |
| Send entry | Peer সেই entry-এর ciphertext পায় |
| LAN Pro | Peer non-IAP প্ল্যাটফর্মে Pro limits unlock করতে পারে |

শুধু trusted ডিভাইস ও মানুষের সাথে pair ও link করুন। বিস্তারিত: [Security → Threat model](./security#threat-model)।

## সম্পর্কিত

- [Using the app](./app) — settings map ও Pro matrix
- [Download](./download)
- [Import & export](./import-export) — বাস্তব backups
- [FAQ](./faq)
- [Security](./security)

Next: [Using the app](./app) · [Sharing](./sharing) · [FAQ](./faq)
