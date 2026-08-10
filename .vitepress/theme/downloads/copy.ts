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
    'Optional: enable Autofill in Settings so the browser extension can fill passwords.',
  ],
  macos: [
    'Open the .dmg and drag OpenKey into Applications.',
    'On first launch, right-click → Open if Gatekeeper asks to confirm.',
    'Create or unlock your vault with a strong master password.',
    'Optional: enable Autofill in System Settings / OpenKey Settings.',
  ],
  linux: [
    'Install the .deb with your package manager, or extract the .tar.gz to a folder you own.',
    'Launch openkey_app from the app menu or the extracted binary.',
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
    'اختياري: فعّل الملء التلقائي في الإعدادات ليعمل امتداد المتصفح.',
  ],
  macos: [
    'افتح ملف .dmg واسحب OpenKey إلى التطبيقات.',
    'عند أول تشغيل: زر أيمن ← فتح إذا طلب Gatekeeper التأكيد.',
    'أنشئ خزنة أو افتح قفلها بكلمة مرور رئيسية قوية.',
    'اختياري: فعّل الملء التلقائي من إعدادات النظام / OpenKey.',
  ],
  linux: [
    'ثبّت .deb عبر مدير الحزم، أو فك ضغط .tar.gz في مجلد تملكه.',
    'شغّل openkey_app من قائمة التطبيقات أو الملف التنفيذي.',
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
    linux: 'Debian/Ubuntu · Fedora/RHEL · portable .tar.gz',
    android: 'Google Play · sideload APK when needed',
    ios: 'App Store when listed',
  },
  variant: {
    windowsX64: 'Installer (x64)',
    windowsArm64: 'Installer (Arm64)',
    macosArm64: '.dmg Apple Silicon',
    macosX64: '.dmg Intel Chip',
    macosUniversal: '.dmg Universal',
    linuxDebX64: '.deb x64',
    linuxDebArm64: '.deb Arm64',
    linuxTarX64: '.tar.gz x64',
    linuxTarArm64: '.tar.gz Arm64',
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
    linux: 'Debian/Ubuntu · Fedora/RHEL · أرشيف .tar.gz',
    android: 'Google Play · APK جانبي عند الحاجة',
    ios: 'App Store عند الإدراج',
  },
  variant: {
    windowsX64: 'المثبّت (x64)',
    windowsArm64: 'المثبّت (Arm64)',
    macosArm64: '.dmg Apple Silicon',
    macosX64: '.dmg Intel',
    macosUniversal: '.dmg Universal',
    linuxDebX64: '.deb x64',
    linuxDebArm64: '.deb Arm64',
    linuxTarX64: '.tar.gz x64',
    linuxTarArm64: '.tar.gz Arm64',
    androidPlay: 'Google Play',
    androidApk: 'APK (تثبيت جانبي)',
    iosAppStore: 'App Store',
  },
  installSteps: arInstall,
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
    linux: 'Debian/Ubuntu · Fedora/RHEL · 便携 .tar.gz',
    android: 'Google Play · 需要时可侧载 APK',
    ios: '上架后的 App Store',
  },
  variant: {
    ...en.variant,
    windowsX64: '安装包 (x64)',
    windowsArm64: '安装包 (Arm64)',
    androidPlay: 'Google Play',
    androidApk: 'APK（侧载）',
  },
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
    linux: 'Debian/Ubuntu · Fedora/RHEL · पोर्टेबल .tar.gz',
    android: 'Google Play · जरूरत पर APK साइडलोड',
    ios: 'लिस्टिंग के बाद App Store',
  },
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
    linux: 'Debian/Ubuntu · Fedora/RHEL · পোর্টেবল .tar.gz',
    android: 'Google Play · প্রয়োজনে APK সাইডলোড',
    ios: 'লিস্টিংয়ের পর App Store',
  },
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
