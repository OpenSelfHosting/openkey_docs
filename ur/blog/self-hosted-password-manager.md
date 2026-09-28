---
title: "Self-hosted پاس ورڈ مینیجر: اس کے لیے واقعاً کتنا کچھ چاہیے"
description: اپنا پاس ورڈ مینیجر sync سرور Docker کے ساتھ چلانا — ایک self-hosted vault آپ کو واقعی کیا دیتا ہے، اس کی قیمت کیا ہے، اور سیٹ اپ اور hardening کی مکمل checklist۔
date: 2026-09-22
cover: /blog/covers/self-hosted-password-manager.png
---

# Self-hosted پاس ورڈ مینیجر: اس کے لیے واقعاً کتنا کچھ چاہیے

پاس ورڈ مینیجر کو self-host کرنے کا مطلب ہے خفیہ شدہ sync سرور خود چلانا۔ آپ کے کلائنٹس ڈیوائس پر encrypt کرتے ہیں؛ آپ جو سرور چلاتے ہیں وہ ciphertext ذخیرہ کرتا ہے اور آپ کی تصدیق کرتا ہے۔ اس سرور کی compromise سے ایک خفیہ شدہ blob ملتا ہے، پاس ورڈ لسٹ نہیں۔

یہ ایک حقیقی اور پائیدار privacy win ہے۔ یہ ایک maintenance کا عہد بھی ہے، اور اس مضمون کا سچا نسخہ دونوں بتاتا ہے۔

## Self-hosting اصل میں کیا بدلتا ہے

اس بارے میں واضح رہیں، کیونکہ یہی وہ جگہ ہے جہاں توقعاں خراب ہوتی ہیں:

| | Vendor cloud | Self-hosted |
|---|--------------|-------------|
| آپ کا vault کون پڑھ سکتا ہے | کوئی نہیں، اگر zero-knowledge ہو | کوئی نہیں، اگر zero-knowledge ہو |
| آپ کا vault کون **حذف** کر سکتا ہے | vendor | آپ |
| metadata کون دیکھتا ہے | vendor | آپ |
| ڈیٹا ہاندپانے پر مجبور کسے کو ہو سکتا ہے | vendor، اپنے jurisdiction میں | آپ، اپنے jurisdiction میں |
| Uptime کی ذمہ داری | vendor | آپ |
| TLS، patching، backups | vendor | آپ |
| لاگت | Subscription | سرور + آپ کا وقت |

رازداری کا دعویٰ نہیں بدلتا۔ جو بدلتا ہے وہ **storage plane پر کنٹرول** ہے اور یہ کہ trust chain میں کون شامل ہے۔ Self-hosting ایک فریق ہٹا دیتا ہے؛ یہ cryptography نہیں بڑھاتا۔

## کب یہ قابلِ فائدہ ہے

- آپ پہلے سے services چلاتے ہیں اور آپ کے پاس NAS، homelab، یا چھوٹا VPS ہے۔
- آپ کے threat model میں "provider compromise یا مجبوری ہو گیا" شامل ہے۔
- آپ ایسے jurisdiction میں ہیں جہاں کسی اور کا ڈیٹا رکھنا ذمہ داری بن جاتا ہے۔
- آپ اُس infrastructure کے ذریعے ٹیم کے لیے shared collections چاہتے ہیں جس کا آپ audit کریں۔
- آپ اُن لوگوں میں سے ہیں جنہیں پانچ منٹ کا Docker Compose اور ایک cron job پسند ہے۔

## کب یہ قابلِ فائدہ نہیں

- آپ نے کبھی reverse proxy نہیں چلایا اور پہلے TLS، DNS اور firewall rules سیکھنے پڑیں گے۔
- کوئی نہیں یاد رکھے گا کہ patch کرنا ہے۔ ایک unpatched سرور liability ہے، سیکیورٹی win نہیں۔
- آپ واحد صارف ہیں، ایک ہی ڈیوائس پر۔ تو سرور بالکل چھوڑ دیں اور مقامی vault استعمال کریں۔
- آپ کو کسی کاروباری اہم سسٹم کے لیے guaranteed uptime چاہیے اور کوئی backup منصوبہ نہیں۔

پچھلے دو معاملات کے لیے ایک درمیان کا راستہ ہے: ایک **مقامی خفیہ شدہ vault** اور اپنی ڈیوائسز کے لیے [Nearby LAN sync](/ur/blog/nearby-without-a-server)، اور بالکل کوئی سرور نہیں۔

## پانچ منٹ میں سیٹ اپ کرنا

OpenKey Server ایک FastAPI ایپلیکیشن ہے PostgreSQL کے ساتھ، Docker Compose stack کے شکل میں فراہم کی گئی۔

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32      # paste this into JWT_SECRET in .env
docker compose up --build -d
```

پھر تصدیق کریں کہ یہ صحیح حال میں ہے:

| URL | مقصد |
|-----|---------|
| `http://localhost:8000` | API base |
| `http://localhost:8000/docs` | OpenAPI docs |
| `http://localhost:8000/health` | Health check |

Schema migrations اسٹارٹ اپ پر خودکار چلتے ہیں۔ کسی کلائنٹ کو **Settings → Data → Self-hosted server** سے جوڑیں، پھر پہلی ڈیوائس پر **Register** اور باقی پر **Login** کریں۔ مکمل تفصیل: [سرور سیٹ اپ](/ur/guide/server)۔

## hardening کی checklist

یہ وہ حصہ ہے جو لوگ چھوڑ دیتے ہیں، اور یہی وہ حصہ ہے جو طے کرتا ہے کہ self-hosting کمدی ہوئی بھی یا نہیں۔ [سیکیورٹی گائیڈ](/ur/guide/security) سے:

### غیر قابلِ سودا

1. **کم از کم 32 کریکٹر کا منفرد `JWT_SECRET`۔** Placeholder values اسٹارٹ اپ پر مسترد ہوتے ہیں۔ ایک بنائیں؛ کوئی مثال نقل نہ کریں۔
2. **معتبر certificate کے ساتھ HTTPS۔** کلائنٹس certificate pinning کے بغیر platform TLS stack استعمال کرتے ہیں، اس لیے غلطی سے لکھا گیا `http://` URL یا خراب certificate لاگ اِن اور sync پر man-in-the-middle ممکن بنا دیتا ہے۔ TLS کو Caddy، nginx، یا اپنے load balancer پر ختم کریں۔
3. **ایک واضح `CORS_ORIGINS` allow-list۔** کبھی `*` نہیں۔ اگر آپ براؤزر ایکسٹینشن استعمال کرتے ہیں تو اس کے `chrome-extension://` اور `moz-extension://` origins واضح طور پر شامل کریں۔
4. **Postgres اور raw API port نجی رہیں۔** صرف reverse proxy ہی expose کریں۔
5. **proxy پر HSTS**، تاکہ براؤزر پہلی بار کے بعد کبھی HTTP پر واپس نہ جائیں۔

### سختی سے تجویز کردہ

6. **reverse proxy پر rate limits۔** API کا بلٹ ان limiter میں میں ہے اور وہ **ہر worker process** کے لیے ہے، اس لیے کئی workers یا replicas کے ساتھ مؤثر حد گنڈھ جاتی ہے۔ nginx میں `limit_req` یا Caddy کے edge پر rate limits لگائیں۔
7. **`TRUST_PROXY_HEADERS=true` صرف اسی صورت میں سیٹ کریں جب proxy `X-Forwarded-For` کو overwrite کرتا ہے** اور آپ اُس راستے پر بھروسہ کرتے ہیں۔ ورنہ آپ کی فی IP حدود proxy پر لاگو ہوں گی، صارف پر نہیں۔
8. **email enumeration سے آگاہ رہیں۔** `POST /auth/prelogin` اور `POST /auth/lookup-public-key` نامعلوم emails کے لیے 404 واپس کرتے ہیں، جو مشروع کلائنٹس کے لیے مددگار ہے مگر کسی کو یہ جاننے کی اجازت دیتا ہے کہ کون سے addresses رجسٹرڈ ہیں۔ سخت rate limits، TLS، اور بطورِ انتخاب زیادہ حساس deployments کے لیے VPN یا IP allow-list۔
9. **Postgres کا backup لیں اور restore آزمائیں۔** ایک پاس ورڈ مینیجر سرور جسے کبھی backup سے restore نہیں کیا گیا، محض ایک فرضیہ ہے۔
10. **`/health` اور API logs monitor کریں**؛ اگر جواب دینا بند ہو جائے تو alert دیں۔

## ایک self-hosted sync سرور کیا کر سکتا ہے اور کیا نہیں

| یہ کر سکتا ہے | یہ نہیں کر سکتا |
|--------|-----------|
| آپ کی تصدیق آپ کے `auth_hash` سے کرنا | آپ کا ماسٹر پاس ورڈ پڑھنا |
| entries، attachments، orgs اور shares کے لیے غیر شفاف ciphertext ذخیرہ کرنا | collection names یا entry payloads decrypt کرنا |
| آپ کا ڈیٹا حذف کرنا یا روک دینا | بھولے ہوئے ماسٹر پاس ورڈ کی بازیاب |
| metadata دیکھنا: email، ciphertext کے سائز، timings | ڈیٹابیس سے آپ کا vault دوبارہ بنانا |
| آپ کے ذریعے rate-limit، patch یا restart ہونا | آپ کے ماسٹر پاس ورڈ کے بھولنے سے بچ جانا |

چوتھی سطر غور سے پڑھیں: ایک self-hosted سرور آپ کو پاس ورڈ بھولنے سے **نہیں** محفوظ بناتا۔ یہ trust chain سے ایک فریق ہٹا دیتا ہے اور آپ کو اُس operator کے طور پر شامل کر دیتا ہے جو ڈیٹا کھو سکتا ہے۔ [ماسٹر پاس ورڈ بھول گئے](/ur/blog/forgot-master-password) روک تھام کے پہلو کو سنبھالتا ہے۔

## Sync semantics جو آپ کو پہلے جاننے چاہئیں

- **فی item کے `revision` کے مطابق last-write-wins، CRDT نہیں۔** دو ڈیوائسز پر ہمزمان edits آپس میں overwrite کر سکتے ہیں۔ جب ضرورت ہو تو ایک وقت میں ایک ہی ڈیوائس پر edit کریں۔
- **Deletes tombstones کے طور پر sync ہوتے ہیں** یہاں تک کہ peers پیچھے رہ جائیں، اس لیے کوئی delete ہر جگہ فوراً نہیں ہوتا۔
- **Nearby LAN sync بھی یہی LWW اصول** استعمال کرتا ہے paired، vault-linked ڈیوائسز کے درمیان۔
- **کوئی بھی backup نہیں۔** کم از کم ایک خفیہ شدہ مقامی backup رکھیں (OpenKey میں `.okbak`)۔

یہ آخری نکتہ وہ ہے جو لوگ سب سے زیادہ غلط سمجھتے ہیں، اور یہی فرق ہے "میں نے اپنا vault اپنے سرور پر منتقل کر لیا" اور "میرے پاس ایک recovery منصوبہ ہے" کا۔

## operator کے لیے operational security

- سرور ایسے host پر چلائیں جس کے لیے ایک شیڈول پر patches آتے ہوں۔ Unpatched ہونا vendor-hosted سے بھی برا ہے۔
- `JWT_SECRET` کو کسی secrets manager یا کم از کم 600-mode فائل میں رکھیں، اپنے shell history میں نہیں۔
- Logs کی retention ذمہ داری ہے: sync logs timings اور sizes ظاہر کر سکتے ہیں۔ انہیں rotate کریں اور حد رکھیں۔
- **ڈیٹابیس** کا backup لیں، صرف volume کا نہیں، اور ہر سہ ماہی restores تصدیق کریں۔
- TLS کے بغیر API کو کسی غیر قابلِ اعتماد نیٹ ورک پر کبھی expose نہ کریں۔
- اگر آپ کو uptime کی ضمانت چاہیے تو دوسرا host load balancer کے پیچھے رکھیں اور قبول کریں کہ sync conflict resolution اب بھی last-write-wins ہے۔

## OpenKey سرور کو attacker کے لیے بے کار کیسے رکھتا ہے

- کلائنٹس email + ماسٹر پاس ورڈ + نمک سے **Argon2id** کے ساتھ ماسٹر key نکالتے ہیں۔
- Login ایک **`auth_hash`** بھیجتا ہے، جو پاس ورڈ ظاہر کیے بغیر علم کی تصدیق کرتا ہے۔
- ایک **vault key** collection names اور entry payloads کو **AES-256-GCM** سے encrypt کرتی ہے۔ سرور صرف ایک لپٹی ہوئی vault key ذخیرہ کرتا ہے۔
- Access JWTs کی مدت مختصر ہوتی ہے؛ refresh tokens آرام پر hashed ہوتے ہیں اور استعمال پر گھومتے ہیں۔
- Attachments ciphertext کے طور پر sync ہوتے ہیں، ہر ایک 20 MB تک محدود۔

ایک چوری ہوا `postgres` dump attacker کو نمک، KDF پیرامیٹرز، لپٹی ہوئی keys اور blobs دیتا ہے۔ اسے توڑنے کا مطلب Argon2id پر حملہ ہے، اور پھر بھی اُس کے پاس ایسا ciphertext ہوگا جسے وہ key کے بغیر نہیں پڑھ سکتا۔ یہی پوری سیکیورٹی کا دلیل ہے، اور یہ اسی لیے برقرار ہے کہ ماسٹر پاس ورڈ کبھی کسی کلائنٹ سے باہر نہیں گیا۔

## سرچ ڈیٹا کیا کہتا ہے

Self-hosting ایک چھوٹا مگر حقیقی cluster ہے، اور یہ "self-hosted" کے بجائے "open source" کے لفظ کے گرد زیادہ جمع ہوتا ہے۔ Google Trends (دنیا بھر، گزشتہ 12 ماہ)، ان اصطلاحات کا آپس میں مقابلہ:

| متعلقہ query | cluster میں نسبتی دلچسپی |
|-------|-------------------------------|
| passbolt | 100 |
| **open source password manager** | **55** |
| password manager self hosted | 13 |
| self-hosted password manager | 4 |
| keepass alternative | 1 |

اس کا مطلب ہے کہ "open source" وہ لفظ ہے جو لوگ پکڑتے ہیں، اور "self-hosted" وہ لفظ ہے جہاں وہ بعد میں پہنچتے ہیں — ایک ایسا سرچ جو ترجیح کے طور پر شروع ہوتا ہے اور عمل میں بدل جاتا ہے۔ "open source password manager" کے تحت متعلقہ queries بھی یہی اشارہ کرتے ہیں: KeePass 100 پر، "open source password manager self hosted" 84 پر، اور Passbolt 78 پر۔ اوپر کی تین میں سے دو نام ایسے ہیں جن کا لوگ موازنہ کر رہے ہیں، کسی feature کی توصیف نہیں۔

یہ ابھی بھی head term کے مقابلے میں چھوٹے نمبر ہیں۔ "Self-hosted password manager" ایک niche کا niche ہے، اور سچا نتیجہ یہ ہے کہ یہ عبارت تلاش کرنے والے زیادہ تر technical صارفین ہیں جو پہلے ہی جانتے ہیں کہ انہیں کیا چاہیے۔

طریقہ: Google Trends، دنیا بھر، گزشتہ 12 ماہ، ستمبر 2026 میں نکالا گیا۔ قدریں نسبتی دلچسپی (0–100) کے طور پر normalize شدہ ہیں، سرچ volumes نہیں۔

## پانچ منٹ کا خلاصہ

Self-hosting trust chain میں provider کی جگہ آپ کو لے دیتا ہے۔ یہ cryptography نہیں بڑھاتا، بلکہ آپ کی فہرست میں TLS، backups، patching اور rate limiting شامل کر دیتا ہے۔ اگر آپ پہلے سے services چلاتے ہیں: Compose stack، منفرد `JWT_SECRET`، متبcertificate والا HTTPS، واضح `CORS_ORIGINS`، اور آزمائے ہوئے backups۔ اگر نہیں چلاتے تو اس کے بجائے مقامی خفیہ شدہ vault اور [Nearby LAN sync](/ur/blog/nearby-without-a-server) استعمال کریں، اور کسی بھی صورت میں کم از کم ایک خفیہ شدہ آف لائن backup رکھیں۔

## اگلے مراحل

- [اپنا پاس ورڈ vault خود host کیوں کریں](/ur/blog/self-host-your-vault) — اس کا دلیل
- [Zero-knowledge sync کی وضاحت](/ur/blog/zero-knowledge-sync) — protocol
- [سرور سیٹ اپ](/ur/guide/server) — install، configure، production hardening
- [سیکیورٹی](/ur/guide/security) — threat model اور operator checklist
