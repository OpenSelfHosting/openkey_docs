---
title: التنزيل والتثبيت
---

<DownloadPicker layout="page" />

احصل على تطبيق OpenKey، ثم اربط اختيارياً [خادماً مستضافاً ذاتياً](./server) أو [امتداد المتصفح](./extension) أو [CLI](./cli).

معرّف التطبيق: `com.openselfhosting.openkey` · المنظمة: [OpenSelfHosting](https://github.com/OpenSelfHosting)

قوائم المتاجر وإصدارات GitHub تُنشر تدريجياً لكل منصة. **Google Play و Microsoft Store متاحان الآن** — ثبّت OpenKey على أندرويد من [صفحة Google Play](https://play.google.com/store/apps/details?id=com.openselfhosting.openkey) أو على ويندوز من [صفحة Microsoft Store](https://apps.microsoft.com/detail/9MXNBRPMDT53). يأخذك زر التنزيل الرئيسي إلى متجر نظامك، ويتيح الزر المجاور تنزيل الحزمة المباشرة بدلاً منه. الباينري الرسمي متاح أيضاً على [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases). **OpenKey مفتوح المصدر** برخصة MIT؛ [الشيفرة المصدرية](https://github.com/OpenSelfHosting/OpenKey) وتعليمات البناء متاحة للجميع.

## الجوال

### Android {#android}

| القناة | ملاحظات |
|---------|--------|
| Google Play {#android-play} | [احصل على OpenKey من Google Play](https://play.google.com/store/apps/details?id=com.openselfhosting.openkey) — منشور باسم **OpenSelfHosting** بمعرّف `com.openselfhosting.openkey` |
| تثبيت جانبي APK/AAB {#android-apk} | من [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases) (`OpenKey-*-android.apk`) |

### iOS {#ios}

| القناة | ملاحظات |
|---------|--------|
| App Store | عند الإدراج — ابحث عن **OpenKey** من OpenSelfHosting |
| أرشيف Xcode | محلياً من `build_all/ios/` |

فعّل **الإعدادات ← الأمان** (الملء التلقائي) ليُملأ OpenKey كلمات المرور ومفاتيح المرور على مستوى النظام.

## سطح المكتب

### macOS {#macos}

| البناء | الحزمة |
|-------|----------|
| Apple Silicon {#macos-arm64} | `OpenKey-*-macos-arm64.dmg` / `.zip` من `build_all/macos/` |
| Intel {#macos-x64} | `OpenKey-*-macos-x64.dmg` / `.zip` |
| Universal {#macos-universal} | فضّل `.dmg` المطابق للمعمارية؛ Mac App Store عند الإدراج |
| Mac App Store {#macos-appstore} | عند الإدراج — ابحث عن **OpenKey** من OpenSelfHosting |

### Windows {#windows}

| البناء | الحزمة |
|-------|----------|
| Microsoft Store {#windows-store} | [احصل على OpenKey من Microsoft Store](https://apps.microsoft.com/detail/9MXNBRPMDT53) — مُوصى به لزوار ويندوز؛ يُحدّث نفسه تلقائياً |
| مثبّت x64 {#windows-x64} | `OpenKey-*-windows-x64.exe` · `.zip` محمول |
| Arm64 {#windows-arm64} | عند النشر على GitHub Releases / Microsoft Store |

### Linux {#linux}

| البناء | الحزمة |
|-------|----------|
| AppImage x64 {#linux-appimage-x64} | `OpenKey-*-linux-x64.AppImage` |
| AppImage Arm64 {#linux-appimage-arm64} | `OpenKey-*-linux-arm64.AppImage` |
| `.deb` x64 {#linux-deb-x64} | `OpenKey-*-linux-x64.deb` |
| `.deb` Arm64 {#linux-deb-arm64} | `OpenKey-*-linux-arm64.deb` |
| `.rpm` x64 {#linux-rpm-x64} | `OpenKey-*-linux-x64.rpm` |
| `.rpm` Arm64 {#linux-rpm-arm64} | `OpenKey-*-linux-arm64.rpm` |
| `.tar.gz` x64 {#linux-tar-x64} | أرشيف محمول من `build_all/linux/` |
| `.tar.gz` Arm64 {#linux-tar-arm64} | أرشيف محمول (arm64) |

مستخدمو Arch يمكنهم `makepkg -si` مع `PKGBUILD` داخل الأرشيف.

ملء سطح المكتب يسجّل **مضيف الرسائل الأصلية** الذي يستخدمه [امتداد المتصفح](./extension). أبقِ الخزنة مفتوحة القفل أثناء الملء من المتصفح.

مثبّتات سطح المكتب الرسمية متاحة في [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases). الشيفرة المصدرية لتطبيق Flutter منشورة برخصة MIT في [OpenSelfHosting/OpenKey](https://github.com/OpenSelfHosting/OpenKey)، وتجد تعليمات البناء في [README](https://github.com/OpenSelfHosting/OpenKey#build-from-source).

## امتداد المتصفح

امتداد MV3 لمتصفحات Chrome وEdge وFirefox. [ثبّت امتداد OpenKey من متجر Chrome](https://chromewebstore.google.com/detail/openkey/cmebbcnocamcolnedgafbkeelejldoga). لمتصفحات Edge وFirefox أو للتثبيت اليدوي، ابنِ الامتداد وحمّل مجلد `dist/`:

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
