---
title: التنزيل والتثبيت
---

<DownloadPicker layout="page" />

احصل على تطبيق OpenKey، ثم اربط اختيارياً [خادماً مستضافاً ذاتياً](./server) أو [امتداد المتصفح](./extension) أو [CLI](./cli).

معرّف التطبيق: `com.openselfhosting.openkey` · المنظمة: [OpenSelfHosting](https://github.com/OpenSelfHosting)

قوائم المتاجر وإصدارات GitHub تُنشر تدريجياً لكل منصة. إلى أن يصبح رابط المتجر حيّاً، ابنِ من المستودع أو استخدم حزمة سطح المكتب من تشغيل `build_all/` لديك. قد تبقى صفحات المتاجر العامة قيد المراجعة حتى بعد أن تنتج سكربتات التعبئة حزم Play / App Store / Flathub محلياً.

## الجوال

### Android {#android}

| القناة | ملاحظات |
|---------|--------|
| [Google Play](https://play.google.com/store/apps/details?id=com.openselfhosting.openkey) {#android-play} | `com.openselfhosting.openkey` — ابحث عن **OpenKey** من OpenSelfHosting بعد نشر القائمة |
| تثبيت جانبي APK/AAB {#android-apk} | من `build_all/android/` (`OpenKey-*-android.apk`) |

### iOS {#ios}

| القناة | ملاحظات |
|---------|--------|
| App Store | عند الإدراج — ابحث عن **OpenKey** من OpenSelfHosting |
| أرشيف Xcode | محلياً من `build_all/ios/` |

فعّل **الإعدادات ← الملء التلقائي** ليُملأ OpenKey كلمات المرور ومفاتيح المرور على مستوى النظام.

## سطح المكتب

### macOS {#macos}

| البناء | الحزمة |
|-------|----------|
| Apple Silicon {#macos-arm64} | `OpenKey-*-macos-arm64.dmg` / `.zip` من `build_all/macos/` |
| Intel {#macos-x64} | `OpenKey-*-macos-x64.dmg` / `.zip` |
| Universal {#macos-universal} | فضّل `.dmg` المطابق للمعمارية؛ Mac App Store عند الإدراج |

### Windows {#windows}

| البناء | الحزمة |
|-------|----------|
| مثبّت x64 {#windows-x64} | `OpenKey-*-windows-x64-setup.exe` · `.zip` محمول · `.msix` اختياري |
| Arm64 {#windows-arm64} | عند النشر على GitHub Releases / Microsoft Store |

### Linux {#linux}

| البناء | الحزمة |
|-------|----------|
| `.deb` x64 {#linux-deb-x64} | `OpenKey-*-linux-x64.deb` |
| `.deb` Arm64 {#linux-deb-arm64} | `OpenKey-*-linux-arm64.deb` |
| `.tar.gz` x64 {#linux-tar-x64} | أرشيف محمول من `build_all/linux/` |
| `.tar.gz` Arm64 {#linux-tar-arm64} | أرشيف محمول (arm64) |

أيضاً: Flathub / Snap Store عند الإدراج (`com.openselfhosting.openkey` / `openkey`). لا يوجد AppImage بعد.

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
