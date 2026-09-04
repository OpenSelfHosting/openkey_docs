import type { OsId } from './catalog'

export type DownloadCopy = {
  detectedLead: string
  downloadFor: (platformLabel: string) => string
  otherDownloads: string
  allPlatforms: string
  yourOs: string
  pickBuild: string
  platformsHeading: string
  channelsNote: string
  getStarted: string
  unknownCta: string
  thanksTitle: string
  thanksLead: (platformLabel: string, buildLabel: string) => string
  thanksPending: string
  thanksStarted: string
  installHeading: string
  retryDownload: string
  otherBuilds: string
  backToDownload: string
  openGuide: string
  platform: Record<OsId, string>
  requirement: Record<OsId, string>
  variant: Record<string, string>
  installSteps: Record<OsId, string[]>
}

const enInstall: Record<OsId, string[]> = {
  windows: [
    'Open the downloaded installer (or .zip) from your Downloads folder.',
    'If Windows SmartScreen appears, choose More info → Run anyway for a signed OpenSelfHosting build.',
    'Finish setup, then launch OpenKey and create or unlock your vault.',
    'Optional: enable Autofill under Settings → Security so the browser extension can fill passwords.',
  ],
  macos: [
    'Open the .dmg and drag OpenKey into Applications.',
    'On first launch, right-click → Open if Gatekeeper asks to confirm.',
    'Create or unlock your vault with a strong master password.',
    'Optional: enable Autofill in System Settings and OpenKey Settings → Security.',
  ],
  linux: [
    'Use the AppImage on any glibc distro (chmod +x, then run), or install the .deb / .rpm for your family.',
    'Debian/Ubuntu/Mint: .deb · Fedora/RHEL/openSUSE: .rpm · Arch: PKGBUILD in the tarball or makepkg.',
    'Create or unlock your vault, then optionally point Settings → Data at your server.',
    'Desktop Autofill registers the native messaging host for the browser extension.',
  ],
  android: [
    'Install from Google Play, or sideload the APK if you use a direct build.',
    'Open OpenKey and create or unlock your vault.',
    'Enable Autofill in system settings so OpenKey can fill passwords and passkeys.',
    'Optional: connect your self-hosted server or pair Nearby on LAN.',
  ],
  ios: [
    'Install from the App Store when the listing is live.',
    'Open OpenKey and create or unlock your vault.',
    'Enable Autofill / Passwords provider for OpenKey in iOS Settings.',
    'Optional: connect your server or use Nearby for LAN sync (Pro).',
  ],
}

const arInstall: Record<OsId, string[]> = {
  windows: [
    'افتح المثبّت (أو ملف .zip) من مجلد التنزيلات.',
    'إذا ظهر SmartScreen اختر المزيد من المعلومات ← تشغيل على أي حال لبناء موقّع من OpenSelfHosting.',
    'أكمل التثبيت ثم شغّل OpenKey وأنشئ خزنة أو افتح قفلها.',
    'اختياري: فعّل الملء التلقائي من الإعدادات ← الأمان ليعمل امتداد المتصفح.',
  ],
  macos: [
    'افتح ملف .dmg واسحب OpenKey إلى التطبيقات.',
    'عند أول تشغيل: زر أيمن ← فتح إذا طلب Gatekeeper التأكيد.',
    'أنشئ خزنة أو افتح قفلها بكلمة مرور رئيسية قوية.',
    'اختياري: فعّل الملء التلقائي من إعدادات النظام / OpenKey.',
  ],
  linux: [
    'استخدم AppImage على أي توزيعة glibc (chmod +x ثم شغّله)، أو ثبّت .deb / .rpm حسب عائلة التوزيعة.',
    'Debian/Ubuntu/Mint: .deb · Fedora/RHEL/openSUSE: .rpm · Arch: PKGBUILD داخل الأرشيف.',
    'أنشئ خزنة أو افتح قفلها، ثم اربط الخادم اختيارياً من الإعدادات ← البيانات.',
    'الملء التلقائي على سطح المكتب يسجّل مضيف الرسائل الأصلية للامتداد.',
  ],
  android: [
    'ثبّت من Google Play، أو ثبّت APK جانبياً إن استخدمت بناءاً مباشراً.',
    'افتح OpenKey وأنشئ خزنة أو افتح قفلها.',
    'فعّل الملء التلقائي في إعدادات النظام لملء كلمات المرور ومفاتيح المرور.',
    'اختياري: اربط خادمك المستضاف ذاتياً أو Nearby على LAN.',
  ],
  ios: [
    'ثبّت من App Store عند توفر القائمة.',
    'افتح OpenKey وأنشئ خزنة أو افتح قفلها.',
    'فعّل ملء تلقائي / مزوّد كلمات المرور لـ OpenKey في إعدادات iOS.',
    'اختياري: اربط الخادم أو Nearby للمزامنة على LAN (Pro).',
  ],
}

const en: DownloadCopy = {
  detectedLead: 'We picked the build that fits your machine — one click and you’re in.',
  downloadFor: (platformLabel) => `Download for ${platformLabel}`,
  otherDownloads: 'Other downloads',
  allPlatforms: 'All platforms',
  yourOs: 'Your OS',
  pickBuild: 'Select a download…',
  platformsHeading: 'Download OpenKey',
  channelsNote:
    'Store listings and GitHub Releases roll out per platform. Until a channel is live, the guide below covers stores, sideload artifacts, and building from source.',
  getStarted: 'Get started',
  unknownCta: 'Download',
  thanksTitle: 'Thanks for downloading OpenKey',
  thanksLead: (platformLabel, buildLabel) =>
    `You’re set up for ${platformLabel} · ${buildLabel}.`,
  thanksPending:
    'The binary channel for this build is not public yet. Use Retry when a release is live, or follow the install notes and build guide below.',
  thanksStarted: 'Your download should start automatically. If it did not, use Retry download.',
  installHeading: 'Install next',
  retryDownload: 'Retry download',
  otherBuilds: 'Other platforms & builds',
  backToDownload: 'Back to download',
  openGuide: 'Open install notes',
  platform: {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    android: 'Android',
    ios: 'iOS',
  },
  requirement: {
    windows: 'Requires Windows 10 or 11 (64-bit)',
    macos: 'Requires macOS 10.15 or later',
    linux: 'AppImage · .deb · .rpm · portable .tar.gz',
    android: 'Google Play · sideload APK when needed',
    ios: 'App Store when listed',
  },
  variant: {
    windowsX64: 'Installer (x64)',
    windowsArm64: 'Installer (Arm64)',
    windowsStore: 'Microsoft Store',
    macosArm64: '.dmg Apple Silicon',
    macosX64: '.dmg Intel Chip',
    macosUniversal: '.dmg Universal',
    macosAppStore: 'Mac App Store',
    linuxDebX64: '.deb x64',
    linuxDebArm64: '.deb Arm64',
    linuxRpmX64: '.rpm x64',
    linuxRpmArm64: '.rpm Arm64',
    linuxAppImageX64: 'AppImage x64',
    linuxAppImageArm64: 'AppImage Arm64',
    linuxTarX64: '.tar.gz x64',
    linuxTarArm64: '.tar.gz Arm64',
    linuxFlathub: 'Flathub',
    linuxSnap: 'Snap Store',
    androidPlay: 'Google Play',
    androidApk: 'APK (sideload)',
    iosAppStore: 'App Store',
  },
  installSteps: enInstall,
}

const ar: DownloadCopy = {
  detectedLead: 'اخترنا البناء المناسب لجهازك — نقرة واحدة وتبدأ.',
  downloadFor: (platformLabel) => `تنزيل لـ ${platformLabel}`,
  otherDownloads: 'تنزيلات أخرى',
  allPlatforms: 'كل المنصات',
  yourOs: 'نظامك',
  pickBuild: 'اختر تنزيلاً…',
  platformsHeading: 'تنزيل OpenKey',
  channelsNote:
    'قوائم المتاجر وإصدارات GitHub تُنشر تدريجياً لكل منصة. إلى أن تصبح القناة حيّة، يغطي الدليل أدناه المتاجر والحزم الجانبية والبناء من المصدر.',
  getStarted: 'ابدأ الآن',
  unknownCta: 'التنزيل',
  thanksTitle: 'شكراً لتنزيل OpenKey',
  thanksLead: (platformLabel, buildLabel) =>
    `أنت جاهز لـ ${platformLabel} · ${buildLabel}.`,
  thanksPending:
    'قناة الملف لهذا البناء ليست عامة بعد. استخدم إعادة المحاولة عند توفر الإصدار، أو اتبع ملاحظات التثبيت ودليل البناء أدناه.',
  thanksStarted: 'يفترض أن يبدأ التنزيل تلقائياً. إن لم يبدأ، استخدم إعادة محاولة التنزيل.',
  installHeading: 'خطوات التثبيت',
  retryDownload: 'إعادة محاولة التنزيل',
  otherBuilds: 'منصات وبناءات أخرى',
  backToDownload: 'العودة للتنزيل',
  openGuide: 'ملاحظات التثبيت',
  platform: {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    android: 'Android',
    ios: 'iOS',
  },
  requirement: {
    windows: 'يتطلب Windows 10 أو 11 (64-بت)',
    macos: 'يتطلب macOS 10.15 أو أحدث',
    linux: 'AppImage · .deb · .rpm · أرشيف .tar.gz',
    android: 'Google Play · APK جانبي عند الحاجة',
    ios: 'App Store عند الإدراج',
  },
  variant: {
    windowsX64: 'المثبّت (x64)',
    windowsArm64: 'المثبّت (Arm64)',
    windowsStore: 'Microsoft Store',
    macosArm64: '.dmg Apple Silicon',
    macosX64: '.dmg Intel',
    macosUniversal: '.dmg Universal',
    macosAppStore: 'Mac App Store',
    linuxDebX64: '.deb x64',
    linuxDebArm64: '.deb Arm64',
    linuxRpmX64: '.rpm x64',
    linuxRpmArm64: '.rpm Arm64',
    linuxAppImageX64: 'AppImage x64',
    linuxAppImageArm64: 'AppImage Arm64',
    linuxTarX64: '.tar.gz x64',
    linuxTarArm64: '.tar.gz Arm64',
    linuxFlathub: 'Flathub',
    linuxSnap: 'Snap Store',
    androidPlay: 'Google Play',
    androidApk: 'APK (تثبيت جانبي)',
    iosAppStore: 'App Store',
  },
  installSteps: arInstall,
}

const zhInstall: Record<OsId, string[]> = {
  windows: [
    '从“下载”文件夹打开安装程序（或 .zip）。',
    '若出现 Windows SmartScreen，对已签名的 OpenSelfHosting 构建选择“更多信息”→“仍要运行”。',
    '完成安装后启动 OpenKey，创建或解锁保险库。',
    '可选：在设置中启用自动填充，以便浏览器扩展填充密码。',
  ],
  macos: [
    '打开 .dmg，将 OpenKey 拖入“应用程序”。',
    '首次启动时，若 Gatekeeper 提示，请右键→打开以确认。',
    '用强主密码创建或解锁保险库。',
    '可选：在系统设置 / OpenKey 设置中启用自动填充。',
  ],
  linux: [
    '在任意 glibc 发行版上使用 AppImage（chmod +x 后运行），或按发行版安装 .deb / .rpm。',
    'Debian/Ubuntu/Mint: .deb · Fedora/RHEL/openSUSE: .rpm · Arch: 压缩包内 PKGBUILD 或 makepkg。',
    '创建或解锁保险库，可选在设置→数据中指向您的服务器。',
    '桌面自动填充会为浏览器扩展注册原生消息主机。',
  ],
  android: [
    '从 Google Play 安装，或使用直接构建侧载 APK。',
    '打开 OpenKey 并创建或解锁保险库。',
    '在系统设置中启用自动填充，以便 OpenKey 填充密码与通行密钥。',
    '可选：连接自托管服务器或在局域网配对 Nearby。',
  ],
  ios: [
    'App Store 上架后从商店安装。',
    '打开 OpenKey 并创建或解锁保险库。',
    '在 iOS 设置中为 OpenKey 启用自动填充 / 密码提供程序。',
    '可选：连接服务器或使用 Nearby 做局域网同步（Pro）。',
  ],
}

const esInstall: Record<OsId, string[]> = {
  windows: [
    'Abre el instalador (o .zip) descargado desde la carpeta Descargas.',
    'Si aparece SmartScreen, elige Más información → Ejecutar de todos modos para una build firmada de OpenSelfHosting.',
    'Termina la instalación, inicia OpenKey y crea o desbloquea tu vault.',
    'Opcional: activa Autocompletar en Ajustes para que la extensión del navegador rellene contraseñas.',
  ],
  macos: [
    'Abre el .dmg y arrastra OpenKey a Aplicaciones.',
    'En el primer inicio, clic derecho → Abrir si Gatekeeper pide confirmación.',
    'Crea o desbloquea tu vault con una contraseña maestra fuerte.',
    'Opcional: activa Autocompletar en Ajustes del sistema / OpenKey.',
  ],
  linux: [
    'Usa el AppImage en cualquier distro glibc (chmod +x y ejecuta), o instala el .deb / .rpm de tu familia.',
    'Debian/Ubuntu/Mint: .deb · Fedora/RHEL/openSUSE: .rpm · Arch: PKGBUILD en el tarball o makepkg.',
    'Crea o desbloquea tu vault; opcionalmente apunta Ajustes → Datos a tu servidor.',
    'Autocompletar de escritorio registra el host de mensajería nativa para la extensión.',
  ],
  android: [
    'Instala desde Google Play o sideload el APK si usas una build directa.',
    'Abre OpenKey y crea o desbloquea tu vault.',
    'Activa Autocompletar en ajustes del sistema para que OpenKey rellene contraseñas y passkeys.',
    'Opcional: conecta tu servidor autoalojado o empareja Nearby en la LAN.',
  ],
  ios: [
    'Instala desde App Store cuando la ficha esté activa.',
    'Abre OpenKey y crea o desbloquea tu vault.',
    'Activa Autocompletar / proveedor de contraseñas para OpenKey en Ajustes de iOS.',
    'Opcional: conecta tu servidor o usa Nearby para sync en LAN (Pro).',
  ],
}

const frInstall: Record<OsId, string[]> = {
  windows: [
    'Ouvrez l’installateur (ou .zip) téléchargé depuis le dossier Téléchargements.',
    'Si SmartScreen apparaît, choisissez Plus d’infos → Exécuter quand même pour une build signée OpenSelfHosting.',
    'Terminez l’installation, lancez OpenKey et créez ou déverrouillez votre coffre.',
    'Optionnel : activez Saisie automatique dans Réglages pour l’extension navigateur.',
  ],
  macos: [
    'Ouvrez le .dmg et glissez OpenKey dans Applications.',
    'Au premier lancement, clic droit → Ouvrir si Gatekeeper demande confirmation.',
    'Créez ou déverrouillez votre coffre avec un mot de passe principal fort.',
    'Optionnel : activez Saisie automatique dans Réglages système / OpenKey.',
  ],
  linux: [
    'Utilisez l’AppImage sur toute distro glibc (chmod +x, puis lancez), ou installez le .deb / .rpm de votre famille.',
    'Debian/Ubuntu/Mint : .deb · Fedora/RHEL/openSUSE : .rpm · Arch : PKGBUILD dans l’archive ou makepkg.',
    'Créez ou déverrouillez votre coffre ; pointez optionnellement Réglages → Données vers votre serveur.',
    'L’Autofill bureau enregistre l’hôte de messagerie native pour l’extension.',
  ],
  android: [
    'Installez depuis Google Play ou sideload l’APK si vous utilisez une build directe.',
    'Ouvrez OpenKey et créez ou déverrouillez votre coffre.',
    'Activez Saisie automatique dans les réglages système pour remplir mots de passe et passkeys.',
    'Optionnel : connectez votre serveur auto-hébergé ou appariez Nearby sur le LAN.',
  ],
  ios: [
    'Installez depuis l’App Store lorsque la fiche est en ligne.',
    'Ouvrez OpenKey et créez ou déverrouillez votre coffre.',
    'Activez Saisie automatique / fournisseur de mots de passe pour OpenKey dans Réglages iOS.',
    'Optionnel : connectez votre serveur ou utilisez Nearby pour la sync LAN (Pro).',
  ],
}

const hiInstall: Record<OsId, string[]> = {
  windows: [
    'डाउनलोड फ़ोल्डर से इंस्टॉलर (या .zip) खोलें।',
    'SmartScreen आए तो OpenSelfHosting साइन्ड बिल्ड के लिए अधिक जानकारी → फिर भी चलाएँ।',
    'सेटअप पूरा करें, OpenKey चलाएँ और वॉल्ट बनाएँ या अनलॉक करें।',
    'वैकल्पिक: सेटिंग्स में Autofill सक्षम करें ताकि एक्सटेंशन पासवर्ड भर सके।',
  ],
  macos: [
    '.dmg खोलें और OpenKey को Applications में खींचें।',
    'पहली बार चलाते समय Gatekeeper पूछे तो राइट-क्लिक → खोलें।',
    'मजबूत मास्टर पासवर्ड से वॉल्ट बनाएँ या अनलॉक करें।',
    'वैकल्पिक: सिस्टम सेटिंग्स / OpenKey में Autofill सक्षम करें।',
  ],
  linux: [
    'किसी भी glibc डिस्ट्रो पर AppImage चलाएँ (chmod +x), या अपने परिवार के लिए .deb / .rpm इंस्टॉल करें।',
    'Debian/Ubuntu/Mint: .deb · Fedora/RHEL/openSUSE: .rpm · Arch: tarball में PKGBUILD या makepkg।',
    'वॉल्ट बनाएँ/अनलॉक करें; वैकल्पिक सेटिंग्स → डेटा में सर्वर सेट करें।',
    'डेस्कटॉप Autofill ब्राउज़र एक्सटेंशन के लिए native messaging host रजिस्टर करता है।',
  ],
  android: [
    'Google Play से इंस्टॉल करें, या सीधे APK साइडलोड करें।',
    'OpenKey खोलें और वॉल्ट बनाएँ/अनलॉक करें।',
    'सिस्टम सेटिंग्स में Autofill सक्षम करें।',
    'वैकल्पिक: सर्वर कनेक्ट करें या LAN पर Nearby पेयर करें।',
  ],
  ios: [
    'App Store लिस्टिंग के बाद इंस्टॉल करें।',
    'OpenKey खोलें और वॉल्ट बनाएँ/अनलॉक करें।',
    'iOS सेटिंग्स में OpenKey के लिए Autofill सक्षम करें।',
    'वैकल्पिक: सर्वर या Nearby LAN सिंक (Pro)।',
  ],
}

const bnInstall: Record<OsId, string[]> = {
  windows: [
    'ডাউনলোড ফোল্ডার থেকে ইনস্টলার (বা .zip) খুলুন।',
    'SmartScreen এলে OpenSelfHosting সাইন্ড বিল্ডের জন্য আরও তথ্য → যাই হোক চালান।',
    'সেটআপ শেষ করে OpenKey চালু করুন এবং ভল্ট তৈরি/আনলক করুন।',
    'ঐচ্ছিক: সেটিংসে Autofill চালু করুন যাতে এক্সটেনশন পাসওয়ার্ড পূরণ করে।',
  ],
  macos: [
    '.dmg খুলে OpenKey Applications-এ টানুন।',
    'প্রথম চালুতে Gatekeeper জিজ্ঞেস করলে রাইট-ক্লিক → খুলুন।',
    'শক্তিশালী মাস্টার পাসওয়ার্ডে ভল্ট তৈরি/আনলক করুন।',
    'ঐচ্ছিক: সিস্টেম সেটিংস / OpenKey-তে Autofill চালু করুন।',
  ],
  linux: [
    'যেকোনো glibc ডিস্ট্রোতে AppImage চালান (chmod +x), অথবা .deb / .rpm ইনস্টল করুন।',
    'Debian/Ubuntu/Mint: .deb · Fedora/RHEL/openSUSE: .rpm · Arch: tarball-এ PKGBUILD বা makepkg।',
    'ভল্ট তৈরি/আনলক করুন; ঐচ্ছিক সেটিংস → ডেটায় সার্ভার সেট করুন।',
    'ডেস্কটপ Autofill ব্রাউজার এক্সটেনশনের জন্য native messaging host রেজিস্টার করে।',
  ],
  android: [
    'Google Play থেকে ইনস্টল করুন বা সরাসরি APK সাইডলোড করুন।',
    'OpenKey খুলে ভল্ট তৈরি/আনলক করুন।',
    'সিস্টেম সেটিংসে Autofill চালু করুন।',
    'ঐচ্ছিক: সার্ভার সংযুক্ত করুন বা LAN-এ Nearby পেয়ার করুন।',
  ],
  ios: [
    'App Store লিস্টিংয়ের পর ইনস্টল করুন।',
    'OpenKey খুলে ভল্ট তৈরি/আনলক করুন।',
    'iOS সেটিংসে OpenKey-এর জন্য Autofill চালু করুন।',
    'ঐচ্ছিক: সার্ভার বা Nearby LAN সিঙ্ক (Pro)।',
  ],
}

const ptInstall: Record<OsId, string[]> = {
  windows: [
    'Abra o instalador (ou .zip) baixado na pasta Downloads.',
    'Se o SmartScreen aparecer, escolha Mais informações → Executar mesmo assim para build assinada da OpenSelfHosting.',
    'Conclua a instalação, inicie o OpenKey e crie ou desbloqueie o cofre.',
    'Opcional: ative Preenchimento automático em Configurações para a extensão preencher senhas.',
  ],
  macos: [
    'Abra o .dmg e arraste o OpenKey para Aplicativos.',
    'Na primeira execução, clique com o botão direito → Abrir se o Gatekeeper pedir confirmação.',
    'Crie ou desbloqueie o cofre com uma senha mestra forte.',
    'Opcional: ative Preenchimento automático nas Configurações do sistema / OpenKey.',
  ],
  linux: [
    'Use o AppImage em qualquer distro glibc (chmod +x e execute), ou instale o .deb / .rpm da sua família.',
    'Debian/Ubuntu/Mint: .deb · Fedora/RHEL/openSUSE: .rpm · Arch: PKGBUILD no tarball ou makepkg.',
    'Crie ou desbloqueie o cofre; opcionalmente aponte Configurações → Dados ao servidor.',
    'Preenchimento automático no desktop registra o host de mensagens nativas para a extensão.',
  ],
  android: [
    'Instale pela Google Play ou sideload o APK se usar build direta.',
    'Abra o OpenKey e crie ou desbloqueie o cofre.',
    'Ative Preenchimento automático nas configurações do sistema.',
    'Opcional: conecte servidor auto-hospedado ou emparelhe Nearby na LAN.',
  ],
  ios: [
    'Instale pela App Store quando a listagem estiver ativa.',
    'Abra o OpenKey e crie ou desbloqueie o cofre.',
    'Ative Preenchimento automático / provedor de senhas do OpenKey nas Configurações do iOS.',
    'Opcional: conecte servidor ou use Nearby para sync na LAN (Pro).',
  ],
}

const ruInstall: Record<OsId, string[]> = {
  windows: [
    'Откройте установщик (или .zip) из папки «Загрузки».',
    'Если появится SmartScreen, выберите «Подробнее» → «Выполнить в любом случае» для подписанной сборки OpenSelfHosting.',
    'Завершите установку, запустите OpenKey и создайте или разблокируйте сейф.',
    'Необязательно: включите автозаполнение в настройках для расширения браузера.',
  ],
  macos: [
    'Откройте .dmg и перетащите OpenKey в «Программы».',
    'При первом запуске: правый клик → «Открыть», если Gatekeeper запросит подтверждение.',
    'Создайте или разблокируйте сейф с надёжным мастер-паролем.',
    'Необязательно: включите автозаполнение в настройках системы / OpenKey.',
  ],
  linux: [
    'Используйте AppImage на любом glibc-дистрибутиве (chmod +x и запуск) или установите .deb / .rpm.',
    'Debian/Ubuntu/Mint: .deb · Fedora/RHEL/openSUSE: .rpm · Arch: PKGBUILD в архиве или makepkg.',
    'Создайте или разблокируйте сейф; при необходимости укажите сервер в Настройки → Данные.',
    'Автозаполнение на рабочем столе регистрирует native messaging host для расширения.',
  ],
  android: [
    'Установите из Google Play или sideload APK при прямой сборке.',
    'Откройте OpenKey и создайте или разблокируйте сейф.',
    'Включите автозаполнение в настройках системы.',
    'Необязательно: подключите сервер или спарьте Nearby в LAN.',
  ],
  ios: [
    'Установите из App Store после публикации листинга.',
    'Откройте OpenKey и создайте или разблокируйте сейф.',
    'Включите автозаполнение / провайдер паролей OpenKey в настройках iOS.',
    'Необязательно: подключите сервер или используйте Nearby для синхронизации по LAN (Pro).',
  ],
}

const urInstall: Record<OsId, string[]> = {
  windows: [
    'ڈاؤن لوڈ فولڈر سے انسٹالر (یا .zip) کھولیں۔',
    'SmartScreen آئے تو OpenSelfHosting سائنڈ بلڈ کے لیے مزید معلومات → پھر بھی چلائیں۔',
    'سیٹ اپ مکمل کریں، OpenKey چلائیں اور والٹ بنائیں یا ان لاک کریں۔',
    'اختیاری: سیٹنگز میں Autofill فعال کریں تاکہ ایکسٹینشن پاس ورڈ بھر سکے۔',
  ],
  macos: [
    '.dmg کھولیں اور OpenKey کو Applications میں کھینچیں۔',
    'پہلی بار چلاتے وقت Gatekeeper پوچھے تو دائیں کلک → کھولیں۔',
    'مضبوط ماسٹر پاس ورڈ سے والٹ بنائیں یا ان لاک کریں۔',
    'اختیاری: سسٹم سیٹنگز / OpenKey میں Autofill فعال کریں۔',
  ],
  linux: [
    'کسی بھی glibc ڈسٹرو پر AppImage چلائیں (chmod +x)، یا اپنے خاندان کے لیے .deb / .rpm انسٹال کریں۔',
    'Debian/Ubuntu/Mint: .deb · Fedora/RHEL/openSUSE: .rpm · Arch: tarball میں PKGBUILD یا makepkg۔',
    'والٹ بنائیں/ان لاک کریں؛ اختیاری سیٹنگز → ڈیٹا میں سرور سیٹ کریں۔',
    'ڈیسک ٹاپ Autofill براؤزر ایکسٹینشن کے لیے native messaging host رجسٹر کرتا ہے۔',
  ],
  android: [
    'Google Play سے انسٹال کریں، یا براہ راست APK سائیڈلوڈ کریں۔',
    'OpenKey کھولیں اور والٹ بنائیں/ان لاک کریں۔',
    'سسٹم سیٹنگز میں Autofill فعال کریں۔',
    'اختیاری: سرور منسلک کریں یا LAN پر Nearby جوڑیں۔',
  ],
  ios: [
    'App Store لسٹنگ کے بعد انسٹال کریں۔',
    'OpenKey کھولیں اور والٹ بنائیں/ان لاک کریں۔',
    'iOS سیٹنگز میں OpenKey کے لیے Autofill فعال کریں۔',
    'اختیاری: سرور یا Nearby LAN سنک (Pro)۔',
  ],
}

const zh: DownloadCopy = {
  ...en,
  detectedLead: '我们已为你的设备选好构建 — 一键即可开始。',
  downloadFor: (platformLabel) => `下载 ${platformLabel} 版`,
  otherDownloads: '其他下载',
  allPlatforms: '全部平台',
  yourOs: '你的系统',
  pickBuild: '选择下载…',
  platformsHeading: '下载 OpenKey',
  channelsNote:
    '各平台商店与 GitHub Releases 将逐步上线。在渠道可用前，下方指南涵盖商店、侧载包与自行构建。',
  getStarted: '开始使用',
  unknownCta: '下载',
  thanksTitle: '感谢下载 OpenKey',
  thanksLead: (platformLabel, buildLabel) => `已为 ${platformLabel} · ${buildLabel} 准备就绪。`,
  thanksPending: '该构建的公开下载通道尚未上线。发布后请重试，或按下方安装说明自行构建。',
  thanksStarted: '下载应已自动开始。若没有，请点击重新下载。',
  installHeading: '接下来安装',
  retryDownload: '重新下载',
  otherBuilds: '其他平台与构建',
  backToDownload: '返回下载页',
  openGuide: '打开安装说明',
  requirement: {
    windows: '需要 Windows 10 或 11（64 位）',
    macos: '需要 macOS 10.15 或更高版本',
    linux: 'AppImage · .deb · .rpm · 便携 .tar.gz',
    android: 'Google Play · 需要时可侧载 APK',
    ios: '上架后的 App Store',
  },
  variant: {
    ...en.variant,
    windowsX64: '安装包 (x64)',
    windowsArm64: '安装包 (Arm64)',
    androidPlay: 'Google Play',
    androidApk: 'APK（侧载）',
    iosAppStore: 'App Store',
    windowsStore: 'Microsoft Store',
    macosAppStore: 'Mac App Store',
    linuxFlathub: 'Flathub',
    linuxSnap: 'Snap 商店',
  },
  installSteps: zhInstall,
}

const es: DownloadCopy = {
  ...en,
  detectedLead: 'Elegimos el build que encaja con tu equipo — un clic y listo.',
  downloadFor: (platformLabel) => `Descargar para ${platformLabel}`,
  otherDownloads: 'Otras descargas',
  allPlatforms: 'Todas las plataformas',
  yourOs: 'Tu SO',
  pickBuild: 'Elige una descarga…',
  platformsHeading: 'Descargar OpenKey',
  channelsNote:
    'Las fichas de tienda y las Releases de GitHub se despliegan por plataforma. Hasta que un canal esté activo, la guía abajo cubre tiendas, sideload y compilación desde el código.',
  getStarted: 'Empezar',
  unknownCta: 'Descargar',
  thanksTitle: 'Gracias por descargar OpenKey',
  thanksLead: (platformLabel, buildLabel) => `Listo para ${platformLabel} · ${buildLabel}.`,
  thanksPending:
    'El canal binario de este build aún no es público. Reintenta cuando haya release, o sigue la guía abajo.',
  thanksStarted: 'La descarga debería iniciar sola. Si no, usa Reintentar descarga.',
  installHeading: 'Instalación',
  retryDownload: 'Reintentar descarga',
  otherBuilds: 'Otras plataformas',
  backToDownload: 'Volver a descargas',
  openGuide: 'Notas de instalación',
  installSteps: esInstall,
}

const fr: DownloadCopy = {
  ...en,
  detectedLead: 'Nous avons choisi le build adapté à votre machine — un clic suffit.',
  downloadFor: (platformLabel) => `Télécharger pour ${platformLabel}`,
  otherDownloads: 'Autres téléchargements',
  allPlatforms: 'Toutes les plateformes',
  yourOs: 'Votre OS',
  pickBuild: 'Choisir un téléchargement…',
  platformsHeading: 'Télécharger OpenKey',
  channelsNote:
    'Les fiches magasin et les GitHub Releases se déploient par plateforme. Tant qu’un canal n’est pas en ligne, le guide ci-dessous couvre magasins, sideload et compilation depuis les sources.',
  getStarted: 'Commencer',
  unknownCta: 'Télécharger',
  thanksTitle: 'Merci d’avoir téléchargé OpenKey',
  thanksLead: (platformLabel, buildLabel) => `Prêt pour ${platformLabel} · ${buildLabel}.`,
  thanksPending:
    'Le canal binaire de ce build n’est pas encore public. Réessayez quand la release est en ligne, ou suivez le guide ci-dessous.',
  thanksStarted: 'Le téléchargement devrait démarrer. Sinon, utilisez Réessayer.',
  installHeading: 'Installation',
  retryDownload: 'Réessayer le téléchargement',
  otherBuilds: 'Autres plateformes',
  backToDownload: 'Retour au téléchargement',
  openGuide: 'Notes d’installation',
  installSteps: frInstall,
}

const hi: DownloadCopy = {
  ...en,
  detectedLead: 'हमने आपके डिवाइस के लिए सही बिल्ड चुना है — एक क्लिक और शुरू करें।',
  downloadFor: (platformLabel) => `${platformLabel} के लिए डाउनलोड`,
  otherDownloads: 'अन्य डाउनलोड',
  allPlatforms: 'सभी प्लेटफ़ॉर्म',
  yourOs: 'आपका OS',
  pickBuild: 'डाउनलोड चुनें…',
  platformsHeading: 'OpenKey डाउनलोड',
  channelsNote:
    'स्टोर लिस्टिंग और GitHub Releases धीरे-धीरे आते हैं। जब तक चैनल लाइव न हो, नीचे का गाइड स्टोर, साइडलोड और सोर्स बिल्ड कवर करता है।',
  getStarted: 'शुरू करें',
  unknownCta: 'डाउनलोड',
  thanksTitle: 'OpenKey डाउनलोड के लिए धन्यवाद',
  thanksLead: (platformLabel, buildLabel) => `${platformLabel} · ${buildLabel} के लिए तैयार।`,
  thanksPending:
    'इस बिल्ड का बाइनरी चैनल अभी सार्वजनिक नहीं है। रिलीज़ लाइव होने पर पुनः प्रयास करें, या नीचे की गाइड देखें।',
  thanksStarted: 'डाउनलोड स्वचालित रूप से शुरू होना चाहिए। नहीं हुआ तो पुनः प्रयास करें।',
  installHeading: 'इंस्टॉल करें',
  retryDownload: 'डाउनलोड पुनः प्रयास',
  otherBuilds: 'अन्य प्लेटफ़ॉर्म और बिल्ड',
  backToDownload: 'डाउनलोड पर वापस',
  openGuide: 'इंस्टॉल नोट्स',
  requirement: {
    windows: 'Windows 10 या 11 (64-बिट) आवश्यक',
    macos: 'macOS 10.15 या नया आवश्यक',
    linux: 'AppImage · .deb · .rpm · पोर्टेबल .tar.gz',
    android: 'Google Play · जरूरत पर APK साइडलोड',
    ios: 'लिस्टिंग के बाद App Store',
  },
  installSteps: hiInstall,
}

const bn: DownloadCopy = {
  ...en,
  detectedLead: 'আপনার ডিভাইসের জন্য সঠিক বিল্ড বেছে নিয়েছি — এক ক্লিকে শুরু করুন।',
  downloadFor: (platformLabel) => `${platformLabel}-এর জন্য ডাউনলোড`,
  otherDownloads: 'অন্যান্য ডাউনলোড',
  allPlatforms: 'সব প্ল্যাটফর্ম',
  yourOs: 'আপনার OS',
  pickBuild: 'ডাউনলোড বেছে নিন…',
  platformsHeading: 'OpenKey ডাউনলোড',
  channelsNote:
    'স্টোর লিস্টিং ও GitHub Releases ধীরে ধীরে আসে। চ্যানেল লাইভ না হওয়া পর্যন্ত নিচের গাইড স্টোর, সাইডলোড ও সোর্স বিল্ড কভার করে।',
  getStarted: 'শুরু করুন',
  unknownCta: 'ডাউনলোড',
  thanksTitle: 'OpenKey ডাউনলোডের জন্য ধন্যবাদ',
  thanksLead: (platformLabel, buildLabel) => `${platformLabel} · ${buildLabel}-এর জন্য প্রস্তুত।`,
  thanksPending:
    'এই বিল্ডের বাইনারি চ্যানেল এখনও সার্বজনীন নয়। রিলিজ লাইভ হলে আবার চেষ্টা করুন, অথবা নিচের গাইড দেখুন।',
  thanksStarted: 'ডাউনলোড স্বয়ংক্রিয়ভাবে শুরু হওয়া উচিত। না হলে আবার চেষ্টা করুন।',
  installHeading: 'ইনস্টল করুন',
  retryDownload: 'ডাউনলোড আবার চেষ্টা',
  otherBuilds: 'অন্যান্য প্ল্যাটফর্ম ও বিল্ড',
  backToDownload: 'ডাউনলোডে ফিরে যান',
  openGuide: 'ইনস্টল নোট',
  requirement: {
    windows: 'Windows 10 বা 11 (64-বিট) প্রয়োজন',
    macos: 'macOS 10.15 বা নতুন প্রয়োজন',
    linux: 'AppImage · .deb · .rpm · পোর্টেবল .tar.gz',
    android: 'Google Play · প্রয়োজনে APK সাইডলোড',
    ios: 'লিস্টিংয়ের পর App Store',
  },
  installSteps: bnInstall,
}

const pt: DownloadCopy = {
  ...en,
  detectedLead: 'Escolhemos o build certo para o seu dispositivo — um clique e pronto.',
  downloadFor: (platformLabel) => `Baixar para ${platformLabel}`,
  otherDownloads: 'Outros downloads',
  allPlatforms: 'Todas as plataformas',
  yourOs: 'Seu SO',
  pickBuild: 'Escolha um download…',
  platformsHeading: 'Baixar OpenKey',
  channelsNote:
    'Listagens nas lojas e GitHub Releases são lançadas por plataforma. Até o canal ficar ativo, o guia abaixo cobre lojas, sideload e build a partir do código.',
  getStarted: 'Começar',
  unknownCta: 'Baixar',
  thanksTitle: 'Obrigado por baixar o OpenKey',
  thanksLead: (platformLabel, buildLabel) => `Pronto para ${platformLabel} · ${buildLabel}.`,
  thanksPending:
    'O canal binário deste build ainda não é público. Tente novamente quando houver release, ou siga o guia abaixo.',
  thanksStarted: 'O download deve iniciar automaticamente. Se não iniciou, tente novamente.',
  installHeading: 'Instalar',
  retryDownload: 'Tentar download novamente',
  otherBuilds: 'Outras plataformas e builds',
  backToDownload: 'Voltar ao download',
  openGuide: 'Notas de instalação',
  installSteps: ptInstall,
}

const ru: DownloadCopy = {
  ...en,
  detectedLead: 'Мы выбрали сборку для вашего устройства — один клик и можно начинать.',
  downloadFor: (platformLabel) => `Скачать для ${platformLabel}`,
  otherDownloads: 'Другие загрузки',
  allPlatforms: 'Все платформы',
  yourOs: 'Ваша ОС',
  pickBuild: 'Выберите загрузку…',
  platformsHeading: 'Скачать OpenKey',
  channelsNote:
    'Листинги в магазинах и GitHub Releases появляются постепенно. Пока канал не активен, ниже — магазины, sideload и сборка из исходников.',
  getStarted: 'Начать',
  unknownCta: 'Скачать',
  thanksTitle: 'Спасибо за загрузку OpenKey',
  thanksLead: (platformLabel, buildLabel) => `Готово для ${platformLabel} · ${buildLabel}.`,
  thanksPending:
    'Бинарный канал для этой сборки ещё не публичен. Повторите, когда выйдет релиз, или следуйте гайду ниже.',
  thanksStarted: 'Загрузка должна начаться автоматически. Если нет — нажмите «Повторить».',
  installHeading: 'Установка',
  retryDownload: 'Повторить загрузку',
  otherBuilds: 'Другие платформы и сборки',
  backToDownload: 'Назад к загрузке',
  openGuide: 'Инструкция по установке',
  installSteps: ruInstall,
}

const ur: DownloadCopy = {
  ...en,
  detectedLead: 'ہم نے آپ کے ڈیوائس کے لیے صحیح بلڈ منتخب کیا — ایک کلک اور شروع کریں۔',
  downloadFor: (platformLabel) => `${platformLabel} کے لیے ڈاؤن لوڈ`,
  otherDownloads: 'دیگر ڈاؤن لوڈ',
  allPlatforms: 'تمام پلیٹ فارمز',
  yourOs: 'آپ کا OS',
  pickBuild: 'ڈاؤن لوڈ منتخب کریں…',
  platformsHeading: 'OpenKey ڈاؤن لوڈ',
  channelsNote:
    'اسٹور لسٹنگز اور GitHub Releases آہستہ آہستہ آتے ہیں۔ جب تک چینل لائیو نہ ہو، نیچے کا گائیڈ اسٹور، سائیڈلوڈ اور سورس بلڈ کا احاطہ کرتا ہے۔',
  getStarted: 'شروع کریں',
  unknownCta: 'ڈاؤن لوڈ',
  thanksTitle: 'OpenKey ڈاؤن لوڈ کا شکریہ',
  thanksLead: (platformLabel, buildLabel) => `${platformLabel} · ${buildLabel} کے لیے تیار۔`,
  thanksPending:
    'اس بلڈ کا بائنری چینل ابھی عوامی نہیں۔ ریلیز لائیو ہونے پر دوبارہ کوشش کریں، یا نیچے کا گائیڈ دیکھیں۔',
  thanksStarted: 'ڈاؤن لوڈ خود بخود شروع ہونا چاہیے۔ نہیں ہوا تو دوبارہ کوشش کریں۔',
  installHeading: 'انسٹال کریں',
  retryDownload: 'ڈاؤن لوڈ دوبارہ',
  otherBuilds: 'دیگر پلیٹ فارمز اور بلڈز',
  backToDownload: 'ڈاؤن لوڈ پر واپس',
  openGuide: 'انسٹال نوٹس',
  installSteps: urInstall,
}

const copyByLang: Record<string, DownloadCopy> = {
  en,
  ar,
  zh,
  es,
  fr,
  hi,
  bn,
  pt,
  ru,
  ur,
}

export function downloadCopy(lang: string): DownloadCopy {
  return copyByLang[lang] || en
}
