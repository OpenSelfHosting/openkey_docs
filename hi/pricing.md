# मूल्य निर्धारण

**OpenKey** sensible limits के साथ पूर्ण encrypted vault के लिए मुफ़्त है। **OpenKey Pro** caps हटाता है और export, backups, Nearby, sharing, और attachments unlock करता है।

Store prices Apple / Google / Microsoft billing में region के अनुसार सेट होते हैं और purchase time पर app में दिखते हैं। यह पेज **आपको क्या मिलता है** और **कैसे खरीदें** समझाता है — fixed USD table नहीं (stores currency और tax localize करते हैं)।

संबंधित: [ऐप का उपयोग](/hi/guide/app#free-vs-openkey-pro) · [OpenKey Pro explained](/hi/blog/openkey-pro) · [Download](/hi/guide/download) · [शर्तें](/hi/terms)

## Plans

| Plan | Billing | Notes |
|------|---------|--------|
| **Free** | $0 | Core vault + server sync + autofill + import (item caps के साथ) |
| **Monthly** | Subscription | Auto-renew; store में कभी भी cancel |
| **Yearly** | Subscription | Auto-renew; आमतौर पर best recurring value; कभी भी cancel |
| **Lifetime** | One-time | उस store account के लिए permanent Pro unlock |

सटीक amounts Android, iOS, और macOS (और जहाँ listed अन्य IAP platforms) पर **Settings → OpenKey Pro** के तहत दिखते हैं।

## Free vs Pro {#free-vs-openkey-pro}

| | Free | Pro |
|--|------|-----|
| Login entries | **50** तक | Unlimited |
| Collections (folders) | **3** तक | Unlimited |
| Payment cards | **3** तक | Unlimited |
| Crypto wallets | **3** तक | Unlimited |
| Developer secrets | **3** तक | Unlimited |
| Self-hosted server sync | Yes | Yes |
| Autofill / passkeys (system) | Yes | Yes |
| Browser extension bridge | Yes | Yes |
| Import from other managers | Yes | Yes |
| **Export** | — | Yes |
| **Encrypted `.okbak` backup** | — | Yes |
| **Nearby LAN vault sync** | — | Yes |
| **Organizations & sharing** | — | Yes |
| **Attachments** (~20 MB each) | — | Yes |
| **Custom app icon** | — | Yes |

Zero-knowledge Free और Pro पर समान रहता है: server अभी भी केवल ciphertext देखता है। Pro client features और limits unlock करता है — OpenSelfHosting से hosted “cloud vault” नहीं है।

## कैसे subscribe करें

1. OpenKey install करें [download channel](/hi/guide/download) से जो in-app purchases support करता है (Play Store, App Store, Mac App Store जब listed)।
2. अपना vault unlock करें → **Settings → OpenKey Pro**।
3. **Monthly**, **Yearly**, या **Lifetime** चुनें और store purchase पूरा करें।
4. उसी store account पर reinstall या device switch करने पर **Restore purchases** / status refresh उपयोग करें।

### Windows & Linux

In-app purchases **Android, iOS, और macOS** पर उपलब्ध हैं। Windows और Linux पर:

- mobile या Mac device पर subscribe करने के बाद **same OpenKey account** से sign in करें जब account-linked Pro supported हो, **या**
- paired Nearby Pro peer से **LAN Pro** उपयोग करें (केवल convenience — store receipt नहीं; Android / iOS / macOS LAN Pro ignore करते हैं)

विवरण: [Nearby → LAN Pro](/hi/guide/nearby#lan-pro-attestation) · [FAQ](/hi/guide/faq)

### Web builds

Web builds **अभी Pro enforce नहीं करते**। Mobile और desktop store builds करते हैं।

## Manage या cancel

- **Apple:** Settings → Apple ID → Subscriptions (या App Store subscriptions)
- **Google Play:** Play Store → Payments & subscriptions
- **Microsoft:** account.microsoft.com / Store subscriptions जब applicable

Refunds store की policies के अनुसार। देखें [सेवा की शर्तें](/hi/terms)।

## FAQ

### Free tier बिना payment usable है?

हाँ — vault, autofill, import, और self-hosted sync ऊपर के caps के भीतर काम करते हैं।

### Self-hosted server के लिए Pro चाहिए?

नहीं। Server sync Free पर उपलब्ध है। Pro export, backups, Nearby, orgs/sharing, attachments, और higher limits जोड़ता है।

### Prices बदलेंगे?

Stores regional prices बदल सकते हैं। In-app paywall हमेशा आपके account और region के लिए current offer दिखाता है।

### Privacy policy कहाँ है?

[गोपनीयता नीति](/hi/privacy) · [शर्तें](/hi/terms)

## शुरू करें

- [OpenKey download](/hi/guide/download)
- [Quick start](/hi/guide/quick-start)
- [Server बिना Nearby](/hi/blog/nearby-without-a-server) (Pro)
