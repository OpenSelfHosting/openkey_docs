# Nearby LAN सिंक

**OpenKey Pro** आपके स्थानीय Wi‑Fi पर डिवाइसों के बीच एक ही vault को **बिना self-hosted server** के sync कर सकता है। Ciphertext एक paired LAN session पर चलता है; vault key साझा होता है केवल जब आप स्पष्ट रूप से **Link vault** करते हैं। **नए डिवाइस** पर first-run setup के दौरान Nearby से मौजूदा vault **कॉपी** भी कर सकते हैं (vault clone) — अभी भी peer-to-peer, sync API से नहीं।

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: discover a peer on the LAN, pair for a session key, then either copy a vault at setup or explicitly link vaults for ongoing merge sync; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

यह पेज discovery, tap-to-pair, setup पर vault clone, vault link, send-entry, LAN Pro, और trust rules को कवर करता है। संक्षिप्त troubleshooting: [FAQ](./faq#nearby-does-not-find-the-other-device-pro)। Threat model: [Security](./security)। Protocol details: [OpenKey spec → Nearby](https://github.com/OpenSelfHosting/OpenKey/blob/main/spec/nearby.md)।

## आवश्यकताएँ

- हर sync या clone करने वाले डिवाइस पर OpenKey Pro (या non–store-IAP प्लेटफ़ॉर्म पर valid **LAN Pro** attestation — नीचे देखें)
- एक ही **LAN** (guest Wi‑Fi / client isolation नहीं)
- **Merge sync** के लिए: दोनों डिवाइस unlocked और **Settings → Nearby devices** शुरू
- **Setup पर vault clone** के लिए: मौजूदा डिवाइस unlocked और advertising (vault के साथ); नया डिवाइस first-run **Nearby device** path पर

Nearby merge sync **backup नहीं** है। Pro [encrypted `.okbak`](./import-export#encrypted-backup-pro) भी रखें। Vault clone एक बार पूरा vault कॉपी करता है (attachments सहित); उसके बाद भी offline backups रखें।

Discovery beacons में LAN पर **device name साफ़** होता है (और peer के पास पहले से account है या नहीं — `vault` flag)। केवल अपने डिवाइस स्वीकार करें। Vault lock करने से Nearby unlock तक रुक जाता है।

Linux और Windows एक बार LAN ports खोलने को कह सकते हैं (**UDP/TCP 47821**, **TCP 47822**)। Peers को यह मशीन मिल सके इसलिए prompts allow करें।

## Setup पर vault कॉपी करें (vault clone)

जब **नया फोन या desktop** Wi‑Fi पर मौजूदा vault की पूरी कॉपी चाहिए (बिना `.okbak` फ़ाइल, बिना server):

1. **मौजूदा** डिवाइस पर: OpenKey unlock → **Settings → Nearby devices** → **Visible on local network** चालू करें। Peer को दिखाना चाहिए कि उसके पास **vault है**।
2. **नए** डिवाइस पर: first-run chooser → **Nearby device** (या समकक्ष setup path)।
3. Discovered peer पर टैप करें → कॉपी confirm करें। Vault holder push करता है (या खाली डिवाइस pull) — session-encrypted archive LAN पर।
4. नए डिवाइस पर स्रोत वाले **उसी master password** से unlock करें। Password wire पर नहीं जाता — केवल unlock material और vault ciphertext paired session के अंदर चलते हैं।

Clone में local database, preferences, attachments, optional avatar, और account unlock fields (email, salt, KDF, wrapped vault key) शामिल हैं। अगर वह email नए डिवाइस पर पहले से है तो clone `email_exists` से fail होता है।

**Clone vs Link vault**

| | Vault clone | Link vault |
|--|-------------|------------|
| कब | First-run / खाली डिवाइस | दोनों डिवाइसों पर पहले से vaults |
| परिणाम | एक पूरा vault खाली डिवाइस पर कॉपी | Vault-key fingerprint साझा; ongoing LWW merge sync |
| Master password | कॉपी unlock करने के लिए वही password | दोनों तरफ पहले से unlocked |

## डिवाइस पेयर करें (merge sync)

1. दोनों डिवाइस पर OpenKey unlock करें → **Settings → Nearby devices**।
2. **Visible on local network** चालू करें (याद रखा जाता है: vault unlocked रहने पर अगले unlock पर resume होता है)।
3. Discovered peer पर टैप करके pair करें (short pairing code LAN session पर अपने आप exchange होता है)। Discovery कठिन हो तो लगभग दो मिनट में short code मैन्युअल दर्ज करना अभी भी काम करता है।
4. Pairing के बाद **Link vault** टैप करें ताकि दोनों एक ही vault-key fingerprint साझा करें। Pairing अकेले vault key auto-share नहीं करता।

यदि vault keys अलग हैं, receiving डिवाइस peer की key **adopt** कर सकता है (master-password confirmation के बाद local vault data बदलता है)। Link + adopt को full vault trust मानें।

### Firewall / dial-back

कुछ desktops (विशेषकर macOS) inbound TCP ब्लॉक करते हैं। Linux और Windows builds एक बार **UDP/TCP 47821** और **TCP 47822** माँग सकते हैं। Peer dial-in न कर पाए तो OpenKey advertising host से guest पर dial-back कर सकता है (unicast UDP only — pairing code LAN पर broadcast नहीं होता)। OS prompt पर local-network / firewall अनुमति दें। एक ही subnet प्राथमिक; VPN और private relay अक्सर discovery तोड़ते हैं। बहुत गलत codes पर short lockout।

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

## LAN Pro attestation {#lan-pro-attestation}

Store in-app purchase **बिना** प्लेटफ़ॉर्म पर (आमतौर पर Windows / Linux), **vault-linked** Pro peer **LAN Pro** status साझा कर सकता है ताकि दूसरा डिवाइस Nearby पर Pro limits unlock करे। Pairing अकेले काफ़ी नहीं — पहले **Link vault** टैप करें।

- केवल सुविधा — purchase का **cryptographic proof नहीं**।
- Android, iOS, और macOS (store IAP) LAN Pro **ignore** करते हैं; उस store पर Pro खरीदें या restore करें।
- Unpairing attestation रोकता है।

## Trust सारांश

| Action | Trust implication |
|--------|-------------------|
| Pair | LAN पर उस peer के साथ session key |
| Vault clone | Peer को पूरा vault copy मिलता है (ciphertext + unlock material); unlock के लिए वही master password चाहिए |
| Link vault | Vault-key material साझा — peer full vault ciphertext sync कर सकता है |
| Send entry | Peer उस entry का ciphertext प्राप्त करता है |
| LAN Pro | Peer non-IAP प्लेटफ़ॉर्म पर Pro limits unlock कर सकता है |

केवल trusted डिवाइस और लोगों के साथ pair, clone, और link करें। विवरण: [Security → Threat model](./security#threat-model)।

## संबंधित

- [Using the app](./app) — setup chooser, settings map और Pro matrix
- [Download](./download)
- [Import & export](./import-export) — `.okbak` vs Nearby clone
- [FAQ](./faq)
- [Security](./security)

Next: [Using the app](./app) · [Sharing](./sharing) · [FAQ](./faq)
