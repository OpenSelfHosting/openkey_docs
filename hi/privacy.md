# गोपनीयता नीति

**Last updated:** 6 August 2026  
**Product:** OpenKey (`com.openselfhosting.openkey`)  
**Publisher:** OpenSelfHosting  
**Contact:** [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com) · Security: [security@openselfhosting.com](mailto:security@openselfhosting.com)

यह गोपनीयता नीति बताती है कि **OpenKey** mobile और desktop app जानकारी को कैसे handle करता है। OpenKey एक **zero-knowledge** password manager के रूप में डिज़ाइन किया गया है: vault secrets device छोड़ने से पहले आपके device पर encrypt होते हैं।

संबंधित पढ़ें: [Security](/hi/guide/security) · [सेवा की शर्तें](/hi/terms)

## सारांश

| Topic | Practice |
|-------|----------|
| Master password | आपके device पर plaintext में कभी नहीं जाता |
| Vault contents | Device पर encrypted (AES-256-GCM); optional sync केवल **ciphertext** भेजता है |
| हमारा cloud | OpenKey आपके passwords के लिए mandatory vendor vault cloud **नहीं** operate करता |
| Self-hosted server | यदि connect करें, **आप** (या आपकी org) इसे operate करते हैं और उस data को control करते हैं |
| Store billing | Pro purchases Apple / Google / Microsoft store billing से होते हैं जहाँ उपलब्ध |

## यह किसे कवर करती है

यह policy official OpenKey **app** (Android, iOS, macOS, Windows, Linux) पर लागू होती है। अलग packages (self-hosted server, browser extension, CLI, documentation site) same zero-knowledge principles follow करते हैं; self-hosted server के operators उस instance के operational data के controllers हैं (नीचे देखें)।

## जानकारी जो हम collect नहीं करते

OpenSelfHosting **नहीं** receive करता आपका:

- Master password
- Plaintext vault key
- Decrypted logins, notes, TOTP secrets, payment cards, crypto wallet data, developer secrets, या attachment contents
- आप जिन websites visit करते हैं उनकी full page HTML (browser extension pages vendor cloud में exfiltrate नहीं करता)

हम personal data नहीं बेचते।

## आपके device पर processed जानकारी

OpenKey निम्नलिखित **locally** आपके device पर store और process करता है (unlock setup के बाद at rest encrypted):

- Vault database (collections, entries, attachments metadata/blobs as ciphertext जब locked/synced)
- App settings (appearance, language, autofill preferences, आप जो server URL enter करते हैं, Nearby preferences)
- Unlock material का optional biometric wrap (OS secure enclave / keystore handle करता है जहाँ उपलब्ध)
- आप जो server **configure** करते हैं उसके लिए cached sync tokens (access JWTs / refresh material app store करता है उस host के लिए)

App delete करने या device wipe करने से local data हट जाता है, OS backups जिन्हें आप control करते हैं के अधीन।

## Optional self-hosted sync server

यदि **Settings → Data → Self-hosted server** enable करें, app **आपके** API (या जो आप choose करें) पर भेजता है:

- Email (account identifier)
- Client-derived `auth_hash` (master password नहीं)
- Salt और KDF parameters
- Wrapped (encrypted) vault key और vault items, attachments, orgs, और shares के opaque ciphertext

OpenKey project का reference server **ciphertext only** store करने के लिए designed है। जो भी server run करता है (आप, आपकी company, या host जिस पर trust करते हैं) metadata देख सकता है जैसे email, ciphertext sizes, और timestamps, और data delete या withhold कर सकता है — लेकिन design के अनुसार vault contents decrypt नहीं कर सकता। देखें [Security](/hi/guide/security)।

## Nearby LAN sync (Pro)

Nearby आपके local network पर devices pair करता है, और **Link vault** के बाद उन devices के बीच vault ciphertext sync करता है। Pairing और vault-key sharing आपके LAN पर आपके chosen devices के बीच होता है। OpenSelfHosting Nearby traffic receive नहीं करता।

## Optional password health (Have I Been Pwned)

यदि optional breached-password check enable करें, OpenKey Have I Been Pwned range API पर केवल **SHA-1 hash prefix** (k-anonymity) भेज सकता है। आपका password itself कभी upload नहीं होता। यह feature off रख सकते हैं।

## Autofill, passkeys, और browser extension

- **System Autofill / Credential Provider** credentials apps और sites के साथ share करता है केवल OS-mediated fill flows के through जो आप initiate या approve करते हैं।
- **Browser extension** आपके server के against unlock कर सकता है या unlocked desktop app (native messaging) के through fill कर सकता है। Fill और save intentional user actions हैं। देखें [Browser extension](/hi/guide/extension)।

## Purchases और subscriptions (OpenKey Pro)

जहाँ Pro app store के through बिकता है, payment processing, receipts, और related account data **Apple, Google, या Microsoft** handle करते हैं उनकी policies के तहत। OpenKey Pro features unlock करने के लिए store entitlements / purchase status receive कर सकता है। हम उन stores से आपका full payment card number receive नहीं करते।

Nearby peers के बीच **LAN Pro** attestation कुछ desktop platforms पर local convenience है — OpenSelfHosting के साथ cloud billing account नहीं।

## Diagnostics और support

OpenKey में mandatory third-party analytics SDK नहीं है जो vault content upload करता है। यदि support email करें ([openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)) या Telegram community channels, आप choose करते हैं क्या include करें (उदाहरण app version)। Cleartext email में master passwords या vault exports न भेजें।

## Children's privacy

OpenKey 13 से कम (या आपके jurisdiction में required minimum age) children के लिए directed नहीं है। यदि उस age से कम हैं तो app उपयोग न करें।

## International processing

Processing आपके devices पर होता है, और यदि sync configure करें तो आप जो server host choose करते हैं उस पर। यदि हमसे contact करें, messages regions में process हो सकते हैं जहाँ हमारे mail या support tools operate करते हैं।

## Retention

- **On device:** जब तक vault delete न करें, app uninstall न करें, या device / backups wipe न करें।
- **On your sync server:** जब तक server account delete न करें या operator data delete न करे; tombstones peers sync होने तक रह सकते हैं।
- **Support email:** respond करने और legitimate security/legal purposes के लिए जितना आवश्यक retain।

## आपके choices

- Server बिना fully offline OpenKey उपयोग करें
- Nearby pairing choose या refuse करें
- Optional HIBP checks disable करें
- Local data export या delete करें (export / backup Pro require कर सकता है)
- Authenticated delete flow के through server account delete करें (server ciphertext हटाता है; local copies wipe करने तक रहते हैं)
- Store के subscription management के through store subscriptions revoke करें

## Changes

Product बदलने पर हम policy update कर सकते हैं। “Last updated” date बदल जाएगी; material changes [changelog](/hi/guide/changelog) या in-app About links में भी noted हो सकते हैं।

## Contact

- Product / support: [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)
- Security reports: [security@openselfhosting.com](mailto:security@openselfhosting.com) — देखें [Reporting vulnerabilities](/hi/guide/security#reporting-vulnerabilities)
- Organization: [OpenSelfHosting](https://github.com/OpenSelfHosting) · Product: [openkey.openselfhosting.com](https://openkey.openselfhosting.com) · Company: [openselfhosting.com](https://openselfhosting.com)

Next: [सेवा की शर्तें](/hi/terms) · [Security](/hi/guide/security) · [ऐप का उपयोग](/hi/guide/app)
