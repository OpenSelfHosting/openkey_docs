# التنزيل والتثبيت

احصل على تطبيق OpenKey، ثم اربط اختيارياً [خادماً مستضافاً ذاتياً](./server) أو [امتداد المتصفح](./extension) أو [CLI](./cli).

معرّف التطبيق: `com.openselfhosting.openkey` · المنظمة: [OpenSelfHosting](https://github.com/OpenSelfHosting)

قوائم المتاجر وإصدارات GitHub تُنشر تدريجياً لكل منصة. إلى أن يصبح رابط المتجر حيّاً، ابنِ من المستودع أو استخدم حزمة سطح المكتب من تشغيل `build_all/` لديك. قد تبقى صفحات المتاجر العامة قيد المراجعة حتى بعد أن تنتج سكربتات التعبئة حزم Play / App Store / Flathub محلياً.

## الجوال

| المنصة | القناة | ملاحظات |
|----------|---------|--------|
| **Android** | Google Play (`com.openselfhosting.openkey`) عند الإدراج · APK/AAB من `build_all/` | ابحث عن **OpenKey** من OpenSelfHosting بعد نشر القائمة |
| **iOS** | App Store عند الإدراج · أرشيف Xcode | ابحث عن **OpenKey** من OpenSelfHosting بعد اعتماد القائمة |

فعّل **الإعدادات ← الملء التلقائي** ليُملأ OpenKey كلمات المرور ومفاتيح المرور على مستوى النظام.

## سطح المكتب

| المنصة | القناة | الحزمة / ملاحظات |
|----------|---------|------------------|
| **macOS** | Mac App Store (عند الإدراج) · `.dmg` / `.zip` مباشر | بنى Apple Silicon و Intel من التعبئة (`build_all/macos/`) |
| **Windows** | Microsoft Store (عند الإدراج) · مثبّت Inno Setup · `.zip` محمول | حزمة المتجر `.msix`؛ التثبيت الجانبي `*-setup.exe` عند توفر Inno Setup |
| **Linux** | Flathub · Snap Store (عند الإدراج) · `.tar.gz` / `.deb` | معرّف Flatpak / Snap: `com.openselfhosting.openkey`. لا يوجد AppImage بعد — استخدم الأرشيف المحمول أو `.deb` من `build_all/` |

ملء سطح المكتب يسجّل **مضيف الرسائل الأصلية** الذي يستخدمه [امتداد المتصفح](./extension). أبقِ الخزنة مفتوحة القفل أثناء الملء من المتصفح.

### بناء سطح المكتب بنفسك

```bash
cd openkey_app
./build_all.sh --desktop    # أو --macos / أعلام خاصة بالمضيف
```

انظر `openkey_app/packaging/README.md` لتعبئة المتاجر (Play، App Store، Microsoft Store، Snap، Flathub).

## امتداد المتصفح

Chrome / Edge / Firefox (MV3). ليس بعد على متاجر الإضافات العامة — حمّل بناءاً غير معبّأ:

```bash
cd openkey_extension
npm install && npm run build
```

ثم حمّل `dist/` من `chrome://extensions` أو Firefox `about:debugging`. الإعداد الكامل: [امتداد المتصفح](./extension).

## الخادم و CLI

| الحزمة | التثبيت |
|---------|---------|
| **الخادم** | Docker Compose في `openkey_server` — [تثبيت الخادم](./server) |
| **CLI** | Node 20+ في `openkey_cli` (`npm link`) — [CLI](./cli) |

تشغيل محلي سريع: [بداية سريعة](./quick-start).

## بعد التثبيت

1. أنشئ خزنة أو افتح قفلها بكلمة مرور رئيسية قوية ([استخدام التطبيق](./app)).
2. اختياري: عيّن **الإعدادات ← البيانات ← خادم مستضاف ذاتياً** على رابط الـ API وزامن.
3. اختياري (Pro): اقرن الأجهزة عبر **Nearby** لمزامنة الخزنة على LAN دون خادم.
4. على سطح المكتب: اربط [الامتداد](./extension) عبر الملء التلقائي / إعدادات امتداد المتصفح.

التالي: [استخدام التطبيق](./app) · [امتداد المتصفح](./extension) · [تثبيت الخادم](./server)
