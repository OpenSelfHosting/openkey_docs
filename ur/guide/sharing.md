# شیئرنگ اور تنظیمیں

انفرادی آئٹمز شیئر کریں یا **organizations** میں دوسرے OpenKey صارفین کے ساتھ **ایک ہی self-hosted سرور** پر کام کریں۔ orgs اور shares کے لیے سرور جو محفوظ کرتا ہے **ciphertext** رہتا ہے — clients وصول کنندگان کے لیے keys wrap کرتے ہیں؛ API نام یا payloads decrypt نہیں کرتی۔

<img src="/guide/sharing-key-wrap.svg" alt="Sharing model: publish identity keys, wrap org keys for live shared collections, or wrap entry shares as frozen ciphertext snapshots; server stores opaque blobs only" class="ok-diagram" width="920" height="400" />

**OpenKey Pro** اور ترتیب شدہ [سرور](./server) اکاؤنٹ (register / login + sync) درکار۔ دعوت یا share سے پہلے identity keys شائع کریں تاکہ peers آپ کے لیے keys wrap کر سکیں۔

## شرائط

1. ایپ انسٹال ([ڈاؤن لوڈ](./download)) کریں اور vault unlock کریں۔
2. **Settings → Data → Self-hosted server** جوڑیں اور سنک کریں۔
3. **Settings → Data → Publish identity keys** (Pro) — sharing کے لیے opaque public / wrapped private key material اپ لوڈ۔
4. وصول کنندگان **وہی server URL** استعمال کریں اور identity keys شائع کر چکے ہوں (یا کم از کم registered account جسے سرور تلاش کر سکے)۔

## Organizations

راستہ: **Settings → Data → Organizations**، یا **Items hub → Organizations**۔

### Org بنائیں

1. Organizations → create کھولیں۔
2. Client org نام encrypt کرتا ہے اور آپ کے لیے owner کے طور پر org key wrap کرتا ہے۔
3. org کے تحت **shared collections** بنائیں ٹیم logins کے لیے (encrypted names + payloads)۔

Org shared vault entries ان org collections کے تحت رہتے ہیں اور opaque rows (`encrypted_payload`) کے طور پر سنک ہوتے ہیں۔

### اراکین کو دعوت

1. Org کھولیں → **Invite member**۔
2. ان کا **email** درج کریں (اس سرور پر پہلے سے موجود ہونا چاہیے) اور role (`admin` / `member`) چنیں۔
3. Client ان کی public identity key کے لیے org key wrap کرتا ہے اور invite پوسٹ کرتا ہے۔
4. وہ **Pending invites** دیکھتے ہیں، قبول کرتے ہیں، پھر سنک کے بعد shared collections کھول سکتے ہیں۔

Owner/admin pending invites منسوخ، roles بدل، یا members ہٹا سکتے ہیں۔ Owner org نہیں چھوڑ سکتا؛ ownership transfer الگ recovery path نہیں — admins احتیاط سے منصوبہ بندی کریں۔

### دعوت قبول کریں

1. Organizations → **Pending invites** کھولیں۔
2. قبول کریں۔ سنک کریں تاکہ shared collections ظاہر ہوں۔
3. وہی master password اور server — شامل ہونا سرور کو plaintext نہیں دیتا۔

## Item & collection shares

کسی org میں ڈالے بغیر ایک login (یا collection) دوسرے صارف کے ساتھ شیئر کریں۔

1. Entry (یا collection) → **Share** کھولیں۔
2. اپنے سرور پر وصول کنندہ email چنیں۔
3. Client ان کے لیے item key wrap کرتا ہے۔ **Entry shares** share کے وقت encrypted payload کا **snapshot** لیتے ہیں۔
4. وصول کنندہ: shares / pending UI میں قبول؛ snapshot **ان کے** vault میں import (نیا local uuid)۔

### Snapshot semantics (اہم)

- **Entry** share قبول کرنے سے منجمد ciphertext وصول کنندہ کے ذاتی vault میں کاپی ہوتا ہے۔
- مالک کی اصل entry میں بعد کی edits وصول کنندگان کو **نہیں** بھیجی جاتیں۔
- **Revoke** pending accept روکتا ہے؛ وصول کنندہ کے device پر پہلے import شدہ کاپی **نہیں** مٹاتا۔

Shares کو مہر بند کاپی دینے جیسا سمجھیں، live shared document نہیں۔ جب ٹیم کو shared org key کے تحت ایک ہی ciphertext تک جاری رسائی چاہیے تو **org shared collections** ترجیح دیں۔

## Extension

Standalone (server) mode میں [browser extension](./extension) shares فہرست/قبول/منسوخ اور organizations / shared collections فہرست کر سکتی ہے۔ Desktop-bridge mode vault operations کے لیے unlocked app پر انحصار کرتا ہے۔

## سیکیورٹی نوٹس

- صرف ان لوگوں اور ڈیوائسز کے ساتھ شیئر کریں جن پر اعتماد ہے — قبول کرنے والے وہ decrypt کر سکتے ہیں جو آپ نے ان کے لیے wrap کیا۔
- Org names، share payloads، identity key blobs سرور پر opaque ([سیکیورٹی](./security))۔
- سرور پر رسائی منسوخ کرنے سے دوسری ڈیوائس پر پہلے decrypt شدہ مقامی copies نہیں مٹتیں۔
- Pro backups رکھیں؛ sharing offline recovery مواد کی جگہ نہیں۔

## متعلقہ API (self-hosters)

`openkey_server` README دیکھیں: `/orgs`، `/invites/*`، `/shares`، اور email سے keys wrap کے لیے `POST /auth/lookup-public-key`۔

اگلا: [ایپ کا استعمال](./app) · [امپورٹ اور ایکسپورٹ](./import-export) · [FAQ](./faq) · [سرور سیٹ اپ](./server)
