# الحزم

تطبيق OpenKey الرسمي **مفتوح المصدر** ومرخّص برخصة **MIT**؛ الشيفرة المصدرية لتطبيق Flutter ومواصفات البروتوكول متاحة للجميع في [مستودع OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey)، مع [تعليمات البناء من المصدر](https://github.com/OpenSelfHosting/OpenKey#build-from-source). يمكنك تثبيت النسخة الجاهزة من [صفحة التنزيل](./download). استضف وابنِ الحزم **المفتوحة المصدر** أدناه. الاستخدام اليومي: [استخدام التطبيق](./app). إعداد المتصفح: [امتداد المتصفح](./extension).

مواصفات البروتوكول في [OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey) (`spec/`). قد تنشر المستودعات تحت [OpenSelfHosting](https://github.com/OpenSelfHosting) الحزم بشكل منفصل.

| المسار | المصدر | الوصف |
|------|--------|-------------|
| تطبيق **OpenKey** الرسمي | MIT | عميل Flutter مفتوح المصدر. [الشيفرة وتعليمات البناء](https://github.com/OpenSelfHosting/OpenKey#build-from-source)؛ تتوفر الإصدارات الجاهزة عبر [التنزيل](./download) |
| `openkey_server` | MIT | واجهة مزامنة FastAPI بلا معرفة + PostgreSQL |
| `openkey_extension` | MIT | امتداد متصفح MV3 (Chrome / Firefox) |
| `openkey_cli` | MIT | CLI للمطوّرين — أسرار وتوليد كلمات مرور ومزامنة |
| `openkey_docs` | MIT | هذا الموقع — صفحات المنتج والتوثيق |

لكل حزمة **مفتوحة** README خاص بإعدادها. أبلغ عن مشاكل الأمان إلى **security@openselfhosting.com** — انظر [الأمان](./security).

## أبرز نقاط الخادم

- تخزين ciphertext فقط
- رموز JWT للوصول + رموز تحديث معتمة دوّارة
- ترحيلات Alembic على PostgreSQL 16
- حد معدّل للمصادقة و CORS صارم

## أبرز نقاط الامتداد

- فتح قفل خزنة مستقل + مزامنة، أو جسر أصلي لتطبيق سطح المكتب المفتوح
- طبقات الملء التلقائي، مطالبات الحفظ/التحديث، مفاتيح المرور
- بطاقات ومحافظ عملات وأسرار مطوّر

الدليل الكامل: [امتداد المتصفح](./extension).

## أبرز نقاط CLI

- توليد كلمات مرور دون اتصال
- اكتشاف مفاتيح SSH وملفات `.env` ورموز API في تطبيق سطح المكتب المفتوح
- تسجيل دخول / فتح قفل / مزامنة اختيارية مقابل خادمك
