# মূল্য নির্ধারণ

**OpenKey** যুক্তিসঙ্গত সীমার সঙ্গে সম্পূর্ণ encrypted ভল্টের জন্য বিনামূল্যে। **OpenKey Pro** সীমা সরিয়ে export, backups, Nearby, sharing, এবং attachments unlock করে।

Store prices Apple / Google / Microsoft billing-এ region অনুযায়ী সেট হয় এবং purchase time-এ app-এ দেখায়। এই পৃষ্ঠা **আপনি কী পাবেন** এবং **কীভাবে কিনবেন** ব্যাখ্যা করে — fixed USD table নয় (stores currency ও tax localize করে)।

সম্পর্কিত: [অ্যাপ ব্যবহার](/bn/guide/app#free-vs-openkey-pro) · [OpenKey Pro explained](/bn/blog/openkey-pro) · [Download](/bn/guide/download) · [শর্তাবলী](/bn/terms)

## Plans

| Plan | Billing | Notes |
|------|---------|--------|
| **Free** | $0 | Core vault + server sync + autofill + import (item caps সহ) |
| **Monthly** | Subscription | Auto-renew; store-এ যেকোনো সময় cancel |
| **Yearly** | Subscription | Auto-renew; সাধারণত best recurring value; যেকোনো সময় cancel |
| **Lifetime** | One-time | সেই store account-এর জন্য permanent Pro unlock |

সঠিক amounts Android, iOS, এবং macOS (ও listed অন্য IAP platforms) পর **Settings → OpenKey Pro**-এ দেখায়।

## Free vs Pro {#free-vs-openkey-pro}

| | Free | Pro |
|--|------|-----|
| Login entries | **50** পর্যন্ত | Unlimited |
| Collections (folders) | **3** পর্যন্ত | Unlimited |
| Payment cards | **3** পর্যন্ত | Unlimited |
| Crypto wallets | **3** পর্যন্ত | Unlimited |
| Developer secrets | **3** পর্যন্ত | Unlimited |
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

Zero-knowledge Free ও Pro-তে একই: server এখনো শুধু ciphertext দেখে। Pro client features ও limits unlock করে — OpenSelfHosting-এর hosted “cloud vault” নয়।

## কীভাবে subscribe করবেন

1. OpenKey install করুন [download channel](/bn/guide/download) থেকে যা in-app purchases support করে (Play Store, App Store, Mac App Store যখন listed)।
2. ভল্ট unlock করুন → **Settings → OpenKey Pro**।
3. **Monthly**, **Yearly**, বা **Lifetime** বেছে নিন এবং store purchase সম্পন্ন করুন।
4. একই store account-এ reinstall বা device switch-এ **Restore purchases** / status refresh ব্যবহার করুন।

### Windows & Linux

In-app purchases **Android, iOS, এবং macOS**-এ উপলব্ধ। Windows ও Linux-এ:

- mobile বা Mac device-এ subscribe-এর পর **same OpenKey account**-এ sign in করুন যখন account-linked Pro supported, **অথবা**
- paired Nearby Pro peer-এর **LAN Pro** ব্যবহার করুন (শুধু convenience — store receipt নয়; Android / iOS / macOS LAN Pro ignore করে)

বিস্তারিত: [Nearby → LAN Pro](/bn/guide/nearby#lan-pro-attestation) · [FAQ](/bn/guide/faq)

### Web builds

Web builds **এখনো Pro enforce না করে**। Mobile ও desktop store builds enforce করে।

## Manage বা cancel

- **Apple:** Settings → Apple ID → Subscriptions (অথবা App Store subscriptions)
- **Google Play:** Play Store → Payments & subscriptions
- **Microsoft:** account.microsoft.com / Store subscriptions যখন applicable

Refunds store-এর policies অনুযায়ী। দেখুন [সেবার শর্তাবলী](/bn/terms)।

## FAQ

### Free tier payment ছাড়া usable?

হ্যাঁ — vault, autofill, import, ও self-hosted sync উপরের caps-এর মধ্যে কাজ করে।

### Self-hosted server-এর জন্য Pro লাগে?

না। Server sync Free-তে উপলব্ধ। Pro export, backups, Nearby, orgs/sharing, attachments, ও higher limits যোগ করে।

### Prices বদলাবে?

Stores regional prices বদলাতে পারে। In-app paywall সবসময় আপনার account ও region-এর current offer দেখায়।

### Privacy policy কোথায়?

[গোপনীয়তা নীতি](/bn/privacy) · [শর্তাবলী](/bn/terms)

## শুরু করুন

- [OpenKey download](/bn/guide/download)
- [Quick start](/bn/guide/quick-start)
- [Server ছাড়াই Nearby](/bn/blog/nearby-without-a-server) (Pro)
