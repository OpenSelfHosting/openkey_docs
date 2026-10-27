---
title: "Password manager for teams: क्या आँकना है"
description: Team password manager चुनना — shared vaults, roles, offboarding, CLI और API access, auditability — और उसे अपने सर्वर पर कैसे चलाना है।
date: 2026-09-23
cover: /blog/covers/password-manager-for-teams.png
---

# Password manager for teams: क्या आँकना है

Team password manager consumer product का बस ज़्यादा seats वाला रूप नहीं है। इसका काम दूसरा है: इसे लोगों के आने-जाने पर टिकना होता है, और इसे यह जवाब देना होता है कि किसे कब किस तक पहुँच थी। ज़्यादातर tools sharing feature के आधार पर आँके जाते हैं और दूसरे सवाल पर विफल हो जाते हैं।

यह लेख वह evaluation checklist है, साथ ही यह भी कि अगर आप shared collections अपनी नियंत्रण वाली infrastructure पर चाहते हैं तो OpenKey का मॉडल कैसे काम करता है।

## ज़रूरतें जो सच में अलग हैं

### 1. वास्तविक access control वाले shared vaults

"क्या मैं अपनी team के साथ share कर सकता हूँ" table stakes है। असल में यह मायने रखता है कि access per-collection है या per-person, क्या आप सब कुछ उजागर किए बिना कोई हिस्सा share कर सकते हैं, और क्या कोई contractor ठीक-ठाक एक ही service देख सकता है।

- **All-or-nothing sharing** जल्दी विफल हो जाता है। लगभग पाँच लोगों के आगे यह scale नहीं करता।
- **Per-collection sharing** न्यूनतम उपयोगी मॉडल है।
- **Role-based access** (admin / member, और आदर्शतः read-only) तब चाहिए जब reviewers और approvers हों।

### 2. Offboarding जो सच में access हटाता है

यही वह शर्त है जो consumer tools को team tools से अलग करती है, और यही सबसे ज़्यादा ग़ायब रहती है।

जब कोई जाता है, तो आपको जानना है:

- क्या उनका access **तुरंत** ख़त्म होता है, या अगली sync पर?
- क्या उनके पास shared credentials की **offline copies** रह जाती हैं — और अगर हाँ, तो आप इसका क्या करते हैं?
- क्या आप **share revoke** कर सकते हैं और यह जान सकते हैं कि copy ग़ायब हो गई?
- क्या उनके जाने के बाद **org ownership** और admin rights बचते हैं, या team ख़ुद को administer करने की क्षमता खो देती है?

जो tool इनका जवाब नहीं दे सकता, वह productivity feature का भेस में एक compliance liability है।

### 3. Automation और machine access

UI में इंसान आधी समस्या है। दूसरी आधी यह है:

- CI और scripting के लिए एक **CLI**
- provisioning और internal tools के लिए एक **API**
- **Service accounts** जो किसी व्यक्ति के जाने पर expire न होते
- किसी directory या legacy shared credentials की spreadsheet से **Bulk import**

infrastructure वाली teams को आमतौर पर चारों चाहिए। जिस password manager में केवल browser extension होगा, वह deploy pipeline के सामना नहीं टिकेगा।

### 4. Zero-knowledge, और उसका व्यावहारिक मतलब

किसी व्यक्ति के लिए zero-knowledge एक privacy पसंद है। किसी organisation के लिए यह एक compliance स्थिति है: यह "हमारा vendor breached हुआ" और "हमारा vendor breached हुआ, और उसके पास ciphertext था" के बीच का अंतर है।

यह features को भी सीमित करता है। कुछ vendors account recovery, admin resets या ऐसी policy enforcement देंगे जिसे server-side plaintext चाहिए — और इनमें से हर एक zero-knowledge गुण का एक जान-बूझकर किया गया कटौती है। दोनों स्थितियाँ बचाव योग्य हैं; आपको इसे जान-बूझकर चुनना चाहिए, बजाय इसके कि किसी incident review में पता चले।

### 5. Audit trail

"क्या मैं साबित कर सकता हूँ कि 3 मार्च को production database password तक किसकी पहुँच थी?" के लिए एक access log चाहिए, तय अवधि तक retained, और auditor के लिए exportable।

सीमा ईमानदारी से बताइए: zero-knowledge system में admin यह देख सकता है कि कोई entry *access* हुई, यह नहीं कि उसमें *क्या* था। यही सही व्यवहार है, और यह आपके audit के साबित कर सकने वाली बातों पर एक सीमा भी।

### 6. अपनी infrastructure लाओ

किसी न किसी बिंदु पर security review पूछेगा कि क्या shared credentials आपका network छोड़ते हैं। जवाब हैं: contractual DPA के साथ vendor-hosted, private cloud, या self-hosted। Self-hosting इनमें एकमात्र ऐसा है जिसे आप ख़ुद सत्यापित कर सकते हैं, और एकमात्र ऐसा है जहाँ आप दिखा सकते हैं कि सर्वर के पास ciphertext है।

### 7. Cost model जो headcount के साथ टिके

Per-seat pricing जिसमें हर contractor, हर service account और हर read-only auditor शामिल हो, जल्दी महँगी हो जाती है। देखें:

- Read-only seat pricing
- क्या service accounts मुफ़्त हैं
- क्या deactivated users अब भी गिने जाते हैं
- क्या evaluation के लिए free tier है

## Teams के लिए एक scoring sheet

| मानदंड | वज़न | यह क्यों मायने रखता है |
|-----------|--------|----------------|
| Offboarding और revocation | ×3 | वह शर्त जिसमें ज़्यादातर tools विफल होते हैं |
| Per-collection access control | ×3 | यह रोकता है कि एक contractor सब कुछ देख ले |
| CLI और API access | ×3 | आपके users आधे machines हैं |
| Zero-knowledge, verifiable | ×3 | Compliance और breach exposure |
| Service accounts | ×2 | लंबे समय तक रहने वाला non-human access |
| Audit log with retention | ×2 | ऐतिहासिक access साबित करना |
| Self-hosting उपलब्ध | ×2 | Credentials आपके network के अंदर रखना |
| Emergency access | ×1 | Admin तक न पहुँच पाए तो break-glass |
| Bulk migration tooling | ×1 | shared spreadsheet से बाहर निकलना |

## OpenKey team access को कैसे संभालता है

OpenKey का sharing model इसी के लिए बना है, और कुछ जगहों पर जानबूझकर असामान्य है — वे process के चारों ओर डिज़ाइन करने से पहले समझ लेने लायक हैं।

### Organizations और shared collections

Sharing के लिए **Pro** और एक configured self-hosted server चाहिए, और सबको **एक ही server URL** पर होना चाहिए। मॉडल यह है:

1. **Identity keys publish करें** ताकि peers आपके लिए keys wrap कर सकें। OpenKey में यह browser extension से standalone (server) mode में किया जाता है — ऐप का Settings → Data पेज इस क्रिया को शामिल नहीं करता।
2. **एक organization बनाएँ** और उसके तहत shared collections। Client org name को एन्क्रिप्ट करता है और owner के रूप में आपके लिए एक org key wrap करता है।
3. **Members को email से invite करें** (वे सर्वर पर पहले से मौजूद होने चाहिए), `admin` या `member` की भूमिका के साथ। आपका client उनके published identity key के लिए org key wrap करता है और invite post करता है।
4. वे **Pending invites** के तहत स्वीकार करते हैं और sync करते हैं; shared collections दिखने लगते हैं।

सर्वर org names, shared payloads और identity keys को **opaque ciphertext** के रूप में रखता है। यह कभी कोई org key unwrap नहीं करता।

Admin की शक्तियाँ: pending invites revoke करना, roles बदलना, members हटाना। एक सीमा जिसकी योजना बनानी होगी — **owner org छोड़ नहीं सकता**, और ownership transfer कोई अलग recovery path नहीं है। इसे औपचारिक बात मानकर छोड़ने के बजाय जल्दी दूसरा owner नामित करें।

### Item shares snapshots हैं, live documents नहीं

यह एकमात्र सबसे महत्वपूर्ण operational detail है। जब आप कोई एक entry या collection किसी के साथ share करते हैं:

- encrypted payload **share समय पर freeze** हो जाता है और accept करने पर recipient के vault में copy हो जाता है।
- आपकी copy में बाद के edits उन्हें **push नहीं** होते।
- **Revoke करना** लंबित accept रोकता है। यह recipient द्वारा पहले ही import की गई copy **नहीं** मिटाता।

तो एक entry share ऐसा व्यवहार करता है जैसे आप किसी को मोहरबंद लिफ़ाफ़ा दे रहे हों, live document share करना नहीं। जिस भी चीज़ का sync में रहना ज़रूरी हो — shared service account, team-wide internal tool — उसके लिए **organization shared collection** इस्तेमाल करें, जहाँ members एक shared org key के तहत वही ciphertext पढ़ते रहते हैं।

यह उल्टा समझने से एक classic bug पैदा होता है: आप shared password बदलते हैं, मान लेते हैं कि सबके पास नया है, और आधी team के पास एक महीना पहले rotate किया गया credential होता है।

### OpenKey क्या नहीं करता

साफ़-साफ़ कहना उचित है, क्योंकि इससे पता चलता है कि आपको कब कुछ और चुनना चाहिए:

- Client में **कोई admin-enforced policy engine नहीं**। ऐसा कोई server-side rule नहीं जो पूरी team में minimum password length लागू करे।
- **कोई automatic offboarding hook नहीं।** Member हटाना एक manual क्रिया है: org में revoke या remove करें, फिर उन entry shares से निपटें जो स्वीकार हो चुके थे।
- **कोई SCIM या directory sync नहीं।** Membership org और sharing APIs के ज़रिए संभाली जाती है।
- **Entry access का server-side audit log नहीं।** सर्वर plaintext नहीं देख सकता, इसलिए वह लिख नहीं सकता कि क्या पढ़ा गया।
- **Sync last-write-wins by revision है, CRDT नहीं।** एक साथ हुए edits overwrite कर सकते हैं; जब मायने रखे तो एक समय पर एक ही डिवाइस पर बदलाव करें।

अगर आपको automated offboarding, policy engine या compliance-grade access log चाहिए, तो कोई commercial team product चुनें। OpenKey उन teams के लिए है जो crypto अपने clients पर रखना चाहती हैं और collaboration layer ख़ुद चलाने को तैयार हैं।

## Team में rollout करना

1. **पहले सर्वर चलाएँ।** [Server setup](/hi/guide/server), [security checklist](/hi/blog/self-hosted-password-manager#hardening-checklist) के अनुसार hardened।
2. **अपना खाता बनाएँ**, extension से identity keys publish करें।
3. **Org बनाएँ**, फिर हर service या team boundary के लिए एक shared collection। Shared infrastructure accounts से शुरू करें — ग़लत होने पर सबसे ज़्यादा नुक़सान वही करते हैं।
4. Invite से पहले **सबके identity keys publish करें**, वरना wrap step उन्हें नहीं ढूँढेगा।
5. **छोटे groups में invite करें** और अगला batch जोड़ने से पहले पुष्टि करें कि member सच में कोई shared collection खोल सकता है।
6. **Shared spreadsheet हटाकर लाएँ।** आज भी किसी team spreadsheet में मौजूद हर credential आपकी सबसे ऊँची प्राथमिकता import है।
7. **Offboarding प्रक्रिया उससे पहले लिखें जब आपको उसकी ज़रूरत पड़े।** दो चरण, लिखे हुए: org से हटाएँ; entry shares की समीक्षा करें और revoke करें।

## एक-मिनट का संस्करण

पहले offboarding, per-collection access और machine access पर आँकें — sharing feature पर नहीं। ऐसा zero-knowledge पसंद करें जिसे आप सत्यापित कर सकें, और जाँचें कि vendor की recovery और admin features चुपचाप server-side plaintext माँगती हैं तो नहीं। अगर आप self-host करते हैं, तो याद रखें कि entry shares snapshots हैं: जो कुछ current रहना चाहिए उसके लिए org shared collections इस्तेमाल करें।

## अगले कदम

- [Sharing & organizations](/hi/guide/sharing) — पूरा walkthrough
- [Self-hosted password manager](/hi/blog/self-hosted-password-manager) — सर्वर चलाना
- [Password manager for family](/hi/blog/password-manager-for-family) — household-scale संस्करण
- [Security](/hi/guide/security) — सर्वर क्या देख सकता है और क्या नहीं
