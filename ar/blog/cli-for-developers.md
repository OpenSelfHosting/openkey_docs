---
title: واجهة سطر أوامر لأسرار المطورين
description: نظرة احترافية على OpenKey CLI — التوليد دون اتصال، جسر سطح المكتب، الاكتشاف، أنواع الأسرار، ومزامنة الخادم الاختيارية بلا معرفة.
date: 2026-08-01
cover: /blog/covers/cli-for-developers-ar.svg
---

# واجهة سطر أوامر لأسرار المطورين

مفاتيح SSH وملفات `.env` ورموز API تتناثر عبر الحواسيب ووكلاء CI. **CLI** في OpenKey (`openkey`) هو واجهة الطرفية لنفس الخزنة ذات المعرفة الصفرية: ولّد كلمات مرور دون اتصال، واستورد ما يُكتشف محلياً إلى تطبيق **سطح المكتب** المفتوح القفل، وأدر أسراراً ذات أنواع، واختيارياً اسحب النص المشفّر من خادم مستضاف ذاتياً.

هذه المقالة جولة موجّهة. المرجع الكامل على مستوى الأعلام موجود في [دليل CLI](/ar/guide/cli).

## ثلاثة أوضاع تشغيل

<img src="/guide/cli-architecture-ar.svg" alt="نظرة عامة على بنية OpenKey CLI" class="ok-diagram" width="920" height="420" />

| الوضع | المتطلب | الدور |
|------|---------|------|
| دون اتصال | لا شيء | `openkey gen` — كلمات مرور مفيدة تشفيرياً بلا شبكة وبلا خزنة مفتوحة |
| الجسر الأصلي | تطبيق سطح المكتب مفتوح القفل على هذا الجهاز | المسار الافتراضي للأسرار واستيراد الاكتشاف والبحث عبر الأسرار **وتسجيلات الدخول** |
| جلسة CLI | `login` ثم `eval $(openkey unlock)` | ذاكرة نص مشفّر محلية و`sync` عندما لا يتوفر تطبيق سطح المكتب |

يفضّل CLI الجسر عند توفّره. وإلا يستخدم `OPENKEY_SESSION`. الجسر محلي فقط ويرفض العمل والخزنة مقفلة — نفس حدود الثقة لجلسة سطح المكتب.

<img src="/guide/cli-backend-choice-ar.svg" alt="كيف تختار أوامر الخزنة وضع الجسر أو الجلسة" class="ok-diagram" width="920" height="360" />

## التوليد دون اتصال

```bash
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c          # تجنّب Il1O0o، وانسخ إلى الحافظة
openkey --json gen -l 20
```

اضبط الطول وفئات الأحرف (`--no-upper`، `--no-lower`، `--no-digits`، `--no-symbols`)، أو انسخ مباشرة إلى الحافظة بـ `-c`. لا يلزم فتح قفل التطبيق ولا تسجيل على الخادم.

## الاكتشاف إلى مجموعة جهاز

<img src="/guide/cli-discover-flow-ar.svg" alt="تدفّق الاكتشاف من المسح إلى الحفظ في الخزنة" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme --depth 3 --no-aws
```

يمكن للاكتشاف أن يمسح:

- مفاتيح خاصة تحت `~/.ssh` (مع ملفات `.pub` الشقيقة عند وجودها)
- متغيرات بيئة معروفة أو شبيهة بالأسرار
- اعتمادات AWS المشتركة
- أشجار `.env` / `.env.*` من جذر مشروع واحد أو أكثر

تُجمَّع النتائج تحت تسمية **جهاز** (اسم المضيف افتراضياً) داخل قسم الأسرار في الخزنة. القيم المستوردة مسبقاً تُتخطى ببصمة المحتوى. استخدم `--dry-run` للمعاينة و`-y` للاستيراد دون مطالبة. الحفظ ما زال يحتاج تطبيق سطح المكتب مفتوح القفل (أو جلسة CLI).

## عمليات الأسرار اليومية

الأسرار سجلات ذات أنواع: `apiToken` (افتراضي)، `sshKey`، `envSnippet`، أو `other`.

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub
openkey secret list
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret rm "old token" -y
```

السرد والبحث **يقنّعان** القيم. استخدم `get` / `copy` فقط عند الحاجة للنص الصريح. تطابق الاستعلامات الاسم أو المضيف أو بادئة UUID؛ التطابق الغامض يعرض المرشحين بدل التخمين.

للبحث في **الأسرار وتسجيلات الدخول** معاً:

```bash
openkey search github
openkey get "GitHub"
openkey copy api.example.com
```

## مزامنة مستضافة ذاتياً (اختيارية)

<img src="/guide/cli-server-flow-ar.svg" alt="تدفّق تسجيل الدخول وسحب النص المشفّر وتعيين OPENKEY_SESSION" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server https://openkey.example.com
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
eval $(openkey lock)
```

يشتق تسجيل الدخول `auth_hash` بـ Argon2id، ولا يرسل كلمة المرور الرئيسية كعلم، ويخزّن في ذاكرة CLI مفاتيح ملفوفة ونصاً مشفّراً فقط، ويطبع تصدير `OPENKEY_SESSION` من `unlock` (المدة الافتراضية 15 دقيقة؛ غيّرها بـ `openkey config set-lock`). للـ CI يمكن تعيين `OPENKEY_PASSWORD`؛ فضّل المطالبة التفاعلية على أجهزتك الشخصية.

افحص الحالة في أي وقت:

```bash
openkey status
openkey config show
```

## لماذا تنتمي CLI لمدير كلمات مرور

المطورون يعيشون في الطرفيات. CLI تكتب في نفس منطقة الأسرار المشفّرة التي يستخدمها التطبيق — ونفس واجهة المزامنة للنص المشفّر فقط — فتُبقي سير العمل ونموذج التهديد متوافقين. لا تحتاج مخزناً ثانياً للأسرار من أجل السكربتات.

## التثبيت

```bash
cd openkey_cli
npm install && npm run build
npm link   # اختياري
```

يتطلب Node.js 20+. مرجع الأوامر الكامل ومتغيرات البيئة ومسارات الإعداد وملاحظات الأمان: [دليل CLI](/ar/guide/cli).
