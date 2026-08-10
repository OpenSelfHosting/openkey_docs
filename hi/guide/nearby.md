# Nearby LAN सिंक

**OpenKey Pro** आपके स्थानीय Wi‑Fi पर डिवाइसों के बीच एक ही vault को **बिना self-hosted server** के sync कर सकता है। Ciphertext एक paired LAN session पर चलता है; vault key साझा होता है केवल जब आप स्पष्ट रूप से **Link vault** करते हैं।

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: pair with QR or code for a session key, explicitly link vault to share the vault key, then sync ciphertext on the LAN; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

यह पेज pairing, QR codes, vault link, send-entry, LAN Pro, और trust rules को कवर करता है। संक्षिप्त troubleshooting: [FAQ](./faq#nearby-does-not-find-the-other-device-pro)। Threat model: [Security](./security)।

## आवश्यकताएँ

- हर sync करने वाले डिवाइस पर OpenKey Pro (या non–store-IAP प्लेटफ़ॉर्म पर valid **LAN Pro** attestation — नीचे देखें)
- दोनों डिवाइस unlocked और **एक ही LAN** पर (guest Wi‑Fi / client isolation नहीं)
- दोनों तरफ **Settings → Nearby devices** शुरू किया गया

Nearby **backup नहीं** है। Pro [encrypted `.okbak`](./import-export#encrypted-backup-pro) भी रखें।

## डिवाइस पेयर करें

1. दोनों डिवाइस पर OpenKey unlock करें → **Settings → Nearby devices**।
2. **Visible on local network** चालू करें (याद रखा जाता है: vault unlocked रहने पर अगले unlock पर resume होता है)।
3. इनमें से किसी एक से pair करें:
   - **QR (प्राथमिक):** advertising डिवाइस pairing QR दिखाता है; दूसरे डिवाइस पर **Scan pairing QR** टैप करें (या Linux/Windows पर **Paste pairing QR**) — code टाइप करने की ज़रूरत नहीं।
   - **Short code:** लगभग दो मिनट के भीतर peer पर दिखाया गया code दर्ज करें।
4. Pairing के बाद **Link vault** टैप करें ताकि दोनों एक ही vault-key fingerprint साझा करें। Pairing अकेले vault key auto-share नहीं करता।

यदि vault keys अलग हैं, receiving डिवाइस peer की key **adopt** कर सकता है (master-password confirmation के बाद local vault data बदलता है)। Link + adopt को full vault trust मानें।

### Firewall / dial-back

कुछ desktops (विशेषकर macOS) inbound TCP ब्लॉक करते हैं। QR scan से connect fail होने पर OpenKey QR host से guest पर dial-back कर सकता है (unicast UDP only — pairing code LAN पर broadcast नहीं होता)। OS prompt पर local-network / firewall अनुमति दें। एक ही subnet प्राथमिक; VPN और private relay अक्सर discovery तोड़ते हैं। बहुत गलत codes पर short lockout।

## Linking के बाद

- दोनों vaults unlocked और Nearby advertising चालू रहने पर changes स्वचालित sync होते हैं।
- Manual catch-up के लिए **Sync now** उपयोग करें।
- Sync **revision के अनुसार last-write-wins** है (उसी नियम जैसे [server](./server)) — जहाँ संभव एक डिवाइस पर edit करें।
- **Trusted devices:** एक सफल pair + vault link के बाद peers reconnect और sync करते हैं जब भी Nearby चालू — re-pairing नहीं।
- **Trusted networks only (वैकल्पिक):** home/office Wi‑Fi SSIDs जोड़ें; current SSID सूची में न हो तो Nearby pause होता है (और सूची खाली हो तो start ब्लॉक)। OS SSID न पढ़ सके तो warning banner के साथ Nearby चल सकता है।
- **Unpair** LAN trust revoke करने, sync रोकने, और उस peer से LAN Pro claims साफ़ करने के लिए।

## Entry भेजें

Full vault sync की प्रतीक्षा बिना एक paired peer पर single login push कर सकते हैं:

1. Entry खोलें (या **Settings → Nearby devices** पर Nearby peer actions उपयोग करें)।
2. उस peer के लिए **Send to device** / send entry चुनें।
3. Peer LAN session पर ciphertext प्राप्त करता है और locally store कर सकता है।

LAN पर one-off shares के लिए उपयोग करें; peers एक ही self-hosted server उपयोग करते हों तो [organizations & sharing](./sharing) प्राथमिक।

## LAN Pro attestation

Store in-app purchase **बिना** प्लेटफ़ॉर्म पर (आमतौर पर Windows / Linux), **vault-linked** Pro peer **LAN Pro** status साझा कर सकता है ताकि दूसरा डिवाइस Nearby पर Pro limits unlock करे। Pairing अकेले काफ़ी नहीं — पहले **Link vault** टैप करें।

- केवल सुविधा — purchase का **cryptographic proof नहीं**।
- Android, iOS, और macOS (store IAP) LAN Pro **ignore** करते हैं; उस store पर Pro खरीदें या restore करें।
- Unpairing attestation रोकता है।

## Trust सारांश

| Action | Trust implication |
|--------|-------------------|
| Pair | LAN पर उस peer के साथ session key |
| Link vault | Vault-key material साझा — peer full vault ciphertext sync कर सकता है |
| Send entry | Peer उस entry का ciphertext प्राप्त करता है |
| LAN Pro | Peer non-IAP प्लेटफ़ॉर्म पर Pro limits unlock कर सकता है |

केवल trusted डिवाइस और लोगों के साथ pair और link करें। विवरण: [Security → Threat model](./security#threat-model)।

## संबंधित

- [Using the app](./app) — settings map और Pro matrix
- [Download](./download)
- [Import & export](./import-export) — वास्तविक backups
- [FAQ](./faq)
- [Security](./security)

Next: [Using the app](./app) · [Sharing](./sharing) · [FAQ](./faq)
