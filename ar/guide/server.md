# تثبيت الخادم

OpenKey Server واجهة مزامنة اختيارية **zero-knowledge**. يخزّن النص المشفّر فقط حتى تتمكّن من مزامنة الخزائن عبر أجهزتك. كلمات المرور الرئيسية ومفاتيح الخزنة الصريحة لا تغادر العميل أبداً.

## المتطلبات

- Docker و Docker Compose (موصى بهما)، **أو** Python 3.12+ مع PostgreSQL 16
- `JWT_SECRET` قوي (32 حرفاً على الأقل، وليس قيمة نائبة)

## التثبيت بـ Docker

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

عندما يصبح سليماً:

| الرابط | الغرض |
|-----|---------|
| `http://localhost:8000` | قاعدة الواجهة |
| `http://localhost:8000/docs` | توثيق OpenAPI |
| `http://localhost:8000/health` | فحص الصحة |

تُطبَّق ترحيلات المخطط تلقائياً عند إقلاع الواجهة (`alembic upgrade head`).

## إعدادات مهمة

| المتغير | ملاحظات |
|----------|--------|
| `JWT_SECRET` | مطلوب. 32 حرفاً كحد أدنى؛ تُرفض القيم النائبة عند الإقلاع |
| `DATABASE_URL` | رابط Postgres غير متزامن (Compose يضبطه لخدمة `db`) |
| `CORS_ORIGINS` | أصول مفصولة بفواصل — **بدون `*`** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT وصول قصير العمر (الافتراضي 15) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | مدة رمز التحديث (الافتراضي 7، يُدوَّر عند الاستخدام) |
| `AUTH_RATE_LIMIT_*` | حدود لكل عنوان IP على نقاط المصادقة |

للإنتاج: ضع الواجهة خلف HTTPS، عيّن `JWT_SECRET` فريداً، وقيّد `CORS_ORIGINS` بعملائك. عالق؟ انظر [الأسئلة الشائعة](./faq).

## الإنتاج خلف HTTPS

اعرض reverse proxy فقط للعامة. أبقِ Postgres والـ API على شبكة خاصة (الإعداد الافتراضي لـ Compose مناسب على مضيف واحد).

مثال **Caddy** (Let’s Encrypt تلقائي):

```txt
openkey.example.com {
	reverse_proxy 127.0.0.1:8000
}
```

مثال **nginx**:

```nginx
server {
	listen 443 ssl http2;
	server_name openkey.example.com;

	# ssl_certificate / ssl_certificate_key … (certbot أو شهادتك)

	location / {
		proxy_pass http://127.0.0.1:8000;
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```

ثم في `.env`:

```bash
CORS_ORIGINS=https://openkey.example.com
# أضف chrome-extension://<id> و moz-extension://<id> إذا استدعى الامتداد الـ API من تلك الأصول
```

وجّه العملاء إلى `https://openkey.example.com` (بلا منفذ). تأكد من `https://openkey.example.com/health`.

## نظرة عامة على واجهة البرمجة

OpenAPI التفاعلي: `http://localhost:8000/docs` على خادم قيد التشغيل. الجداول الكاملة في README لحزمة `openkey_server`. أبرز النقاط:

### المصادقة

| الطريقة | المسار | ملاحظات |
|--------|------|--------|
| `POST` | `/auth/register` | الحساب الأول — يخزّن `auth_hash` ومفتاح الخزنة الملفوف والملح ومعلمات KDF |
| `POST` | `/auth/prelogin` | يعيد الملح + معلمات KDF لاشتقاق `auth_hash` |
| `POST` | `/auth/login` | بريد + `auth_hash` → رموز وصول وتحديث |
| `POST` | `/auth/refresh` | يدوّر رمز التحديث المعتم |
| `POST` | `/auth/rekey` | بعد تغيير كلمة المرور الرئيسية — مفتاح الخزنة يبقى كما هو |
| `POST` | `/auth/delete` | إثبات `auth_hash` مجدداً؛ يحذف ciphertext **الخادم** فقط |
| `POST` | `/auth/lookup-public-key` | بريد → مفتاح هوية عام (لفّ مفاتيح المنظمة/المشاركة) |

نقاط المصادقة محدودة المعدل لكل IP. تُجزَّأ رموز التحديث عند التخزين.

### المزامنة والمجموعات والإدخالات

`POST /sync` يدفع/يسحب النص المشفّر بقاعدة **آخر كتابة تفوز حسب `revision` لكل عنصر**. الحذف الناعم يصبح **tombstones** ليعلم الأقران بالإزالة. المجلدات المتداخلة تستخدم `parent_uuid` للمجموعة.

### المرفقات

نص مشفّر فقط. الحد الأقصى **20 MB**. فضّل `POST /attachments` متعدد الأجزاء للرفع؛ `GET /attachments/{uuid}/content` يبث البايتات المشفّرة.

### المنظمات والمشاركات

أسماء المنظمات وحمولات المشاركة تبقى مشفّرة. مشاركات الإدخال تأخذ **لقطة** للنص المشفّر عند الإنشاء. التفاصيل: [المشاركة والمنظمات](./sharing).

## ربط عملائك

وجّه كل عميل إلى **نفس** رابط الخادم (محلياً: `http://localhost:8000`، أو رابط HTTPS العام).

### تطبيق OpenKey (هاتف / سطح المكتب)

ثبّت تطبيق OpenKey من [قنوات التنزيل](./download).

1. افتح قفل خزنة محلية أو أنشئها بكلمة المرور الرئيسية.
2. افتح **الإعدادات ← البيانات ← خادم مستضاف ذاتياً**.
3. أدخل رابط الخادم (مثال: `https://openkey.example.com`).
4. **تسجيل** (الجهاز الأول) أو **تسجيل الدخول** (جهاز آخر يملك حساب هذه الخزنة).
5. اضغط **مزامنة الآن** عندما تريد سحب/دفع النص المشفّر.

يحتفظ التطبيق بقاعدة بيانات محلية مشفّرة. المزامنة تتبادل نصاً مشفّراً غير شفاف فقط. المزيد: [استخدام التطبيق](./app).

### امتداد المتصفح

1. ابنِ وحمّل `openkey_extension` (`npm install && npm run build` ثم حمّل `dist/`) — انظر [امتداد المتصفح](./extension).
2. افتح **الخيارات** وعيّن نفس رابط الخادم.
3. افتح القفل بنفس البريد + كلمة المرور الرئيسية (الامتداد يستخدم `/auth/prelogin` ثم login).

**جسر سطح المكتب (اختياري):** افتح قفل تطبيق OpenKey لسطح المكتب، فعّل الملء التلقائي لتسجيل مضيف المراسلة الأصلي، ثم اختر «استخدام تطبيق سطح المكتب» في الامتداد. يمكن أن يمر الملء/الحفظ عبر التطبيق المفتوح دون فتح قفل منفصل للامتداد.

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

راجع [CLI](./cli) لاكتشاف الأسرار دون خادم (جسر تطبيق سطح المكتب).

## قائمة تحقق متعددة الأجهزة

1. ثبّت الخادم وآمّنه مرة واحدة.
2. على الجهاز الأول: سجّل + زامن.
3. على كل جهاز جديد: ثبّت العميل ← عيّن نفس رابط الخادم ← سجّل الدخول بنفس البريد وكلمة المرور الرئيسية ← زامن.
4. احتفظ بنسخ احتياطية دون اتصال منتظمة (تصدير / نسخ احتياطي محلي) — الخادم ليس مسار استرداد لكلمة مرور رئيسية منسية.

<img src="/guide/server-sync-topology-ar.svg" alt="طوبولوجيا المزامنة: التطبيق والامتداد وCLI يرسلون auth_hash والنص المشفّر إلى openkey_server الذي يخزّن صفوفاً غير شفافة في PostgreSQL" class="ok-diagram" width="920" height="400" />

التالي: [التنزيل](./download) · [استخدام التطبيق](./app) · [امتداد المتصفح](./extension) · [الأسئلة الشائعة](./faq) · [CLI](./cli) · [الأمان](./security)
