# بداية سريعة

ثبّت عميلاً من [التنزيل](./download)، شغّل خادم المزامنة، ثم اربط التطبيق أو [الامتداد](./extension) أو CLI.

## الخادم

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # الصق في JWT_SECRET
docker compose up --build -d
```

الـ API: `http://localhost:8000` — OpenAPI على `/docs`، الصحة على `/health`.

## التطبيق

ثبّت تطبيق **OpenKey** ([قنوات التنزيل](./download)). في **الإعدادات ← البيانات ← خادم مستضاف ذاتياً** عيّن `http://localhost:8000` (أو رابط HTTPS)، ثم سجّل أو سجّل الدخول وزامن.

انظر [استخدام التطبيق](./app).

## امتداد المتصفح

```bash
cd openkey_extension
npm install
npm run build
```

حمّل `dist/` كامتداد غير معبّأ. عيّن رابط الخادم في الخيارات وافتح القفل بالبريد + كلمة المرور الرئيسية. على سطح المكتب، فعّل الملء التلقائي في التطبيق لتسجيل مضيف الرسائل الأصلية.

التفاصيل: [امتداد المتصفح](./extension).

## CLI

```bash
cd openkey_cli
npm install
npm run build
npm link   # اختياري

openkey gen -l 24
openkey discover --dry-run
openkey discover -y
```

أبقِ تطبيق سطح المكتب مفتوح القفل لاكتشاف الأسرار محلياً. مزامنة خادم اختيارية:

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

التالي: [الأمان](./security)، [تثبيت الخادم](./server)، [استخدام التطبيق](./app)، [امتداد المتصفح](./extension)، [الأسئلة الشائعة](./faq)، [سجل التغييرات](./changelog)، و[CLI](./cli).
