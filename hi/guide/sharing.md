# शेयरिंग और संगठन

**एक ही self-hosted server** पर अन्य OpenKey users के साथ individual items share करें या **organizations** में काम करें। Server जो orgs और shares के लिए store करता है वह **ciphertext** रहता है — clients recipients के लिए keys wrap करते हैं; API names या payloads decrypt नहीं करता।

<img src="/guide/sharing-key-wrap.svg" alt="Sharing model: publish identity keys, wrap org keys for live shared collections, or wrap entry shares as frozen ciphertext snapshots; server stores opaque blobs only" class="ok-diagram" width="920" height="400" />

**OpenKey Pro** और configured [server](./server) account (register / login + sync) ज़रूरी। Invite या share से पहले identity keys publish करें ताकि peers आपके लिए keys wrap कर सकें।

## Prerequisites

1. App install करें ([Download](./download)) और vault unlock करें।
2. **Settings → Data → Self-hosted server** connect करें और sync करें।
3. **Settings → Data → Publish identity keys** (Pro) — sharing के लिए opaque public / wrapped private key material upload।
4. Recipients **एक ही server URL** उपयोग करें और identity keys publish किए हों (या कम से कम registered account जिसे server look up कर सके)।

## Organizations

Path: **Settings → Data → Organizations**, या **Items hub → Organizations**।

### Create an org

1. Organizations → create खोलें।
2. Client org name encrypt करता है और owner के रूप में आपके लिए org key wrap करता है।
3. Org के तहत team logins के लिए **shared collections** बनाएँ (encrypted names + payloads)।

Org shared vault entries उन org collections के तहत रहते हैं और opaque rows (`encrypted_payload`) के रूप में sync होते हैं।

### Invite members

1. Org → **Invite member** खोलें।
2. उनका **email** दर्ज करें (इस server पर पहले से exist होना चाहिए) और role चुनें (`admin` / `member`)।
3. Client उनकी public identity key के लिए org key wrap करता है और invite post करता है।
4. वे **Pending invites** देखते हैं, accept करते हैं, फिर sync के बाद shared collections खोल सकते हैं।

Owner/admin pending invites revoke, roles बदल, या members हटा सकते हैं। Owner org छोड़ नहीं सकता; ownership transfer अलग recovery path नहीं — admins सावधानी से plan करें।

### Accept an invite

1. Organizations → **Pending invites** खोलें।
2. Accept करें। Sync करें ताकि shared collections दिखें।
3. सामान्य master password और server उपयोग करें — join करने से server को plaintext नहीं मिलता।

## Item & collection shares

Org में रखे बिना single login (या collection) दूसरे user के साथ share करें।

1. Entry (या collection) → **Share** खोलें।
2. अपने server पर recipient email चुनें।
3. Client उनके लिए item key wrap करता है। **Entry shares** share time पर encrypted payload **snapshot** करते हैं।
4. Recipient: shares / pending UI में accept करें, फिर snapshot **उनके** vault में import होता है (नया local uuid)।

### Snapshot semantics (महत्वपूर्ण)

- **Entry** share accept करने पर frozen ciphertext recipient के personal vault में copy होता है।
- Owner की original entry के बाद के edits recipients को **push नहीं** होते।
- **Revoke** pending accept रोकता है; recipient के डिवाइस पर पहले से import की copy **delete नहीं** करता।

Shares को sealed copy देने जैसा मानें, live shared document नहीं। Ongoing team access के लिए shared org key के तहत same ciphertext चाहिए तो **org shared collections** प्राथमिक।

## Extension

Standalone (server) mode में [browser extension](./extension) shares list/accept/revoke और organizations / shared collections list कर सकता है। Desktop-bridge mode unlocked app पर vault operations के लिए निर्भर।

## Security notes

- केवल trusted लोगों और डिवाइसों के साथ share करें — accept करने वाले recipients जो आपने wrap किया decrypt कर सकते हैं।
- Org names, share payloads, और identity key blobs server पर opaque ([Security](./security))।
- Server पर access revoke करने से दूसरे डिवाइस पर पहले से decrypt की local copies wipe नहीं होती।
- Pro backups रखें; sharing offline recovery materials का substitute नहीं।

## Related API (self-hosters)

`openkey_server` README देखें: `/orgs`, `/invites/*`, `/shares`, और email से keys wrap के लिए `POST /auth/lookup-public-key`।

Next: [Using the app](./app) · [Import & export](./import-export) · [FAQ](./faq) · [Server setup](./server)
