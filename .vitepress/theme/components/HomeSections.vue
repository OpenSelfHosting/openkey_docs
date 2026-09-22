<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useHomeRevealRoot } from '../composables/useHomeReveal'

import saveHome from '/landing_page/Section_2_Save_Your_Passwords/home_android_screen_light.png'
import saveDetail from '/landing_page/Section_2_Save_Your_Passwords/password_details_android_screen_light.png'
import generateShot from '/landing_page/Section_3_Generate_Strong_Passwords/password_generate_screens_group_light.png'
import syncShot from '/landing_page/Section_4_Stay_in_Sync/sync_devices_screen_light.png'
import importPhone from '/landing_page/Section_5_Import_Your_Passwords_with_Ease/import_export_android_light.png'
import icon1password from '/landing_page/Section_5_Import_Your_Passwords_with_Ease/1password_icon.png'
import iconBitwarden from '/landing_page/Section_5_Import_Your_Passwords_with_Ease/bitwarden_icon.png'
import iconGoogle from '/landing_page/Section_5_Import_Your_Passwords_with_Ease/google_passwords_icon.png'
import iconKeepass from '/landing_page/Section_5_Import_Your_Passwords_with_Ease/keepass_icon.png'
import iconLastpass from '/landing_page/Section_5_Import_Your_Passwords_with_Ease/lastpass_icon.png'
import autofillShot from '/landing_page/Section_6_autofill/autofill_devices.png'

import iconApple from '/landing_page/Section_7_Run_where_you_do/basil_apple-solid.svg'
import iconDebian from '/landing_page/Section_7_Run_where_you_do/devicon_debian.svg'
import iconRaspberrypi from '/landing_page/Section_7_Run_where_you_do/devicon_raspberrypi.svg'
import iconLinux from '/landing_page/Section_7_Run_where_you_do/flat-color-icons_linux.svg'
import iconAndroid from '/landing_page/Section_7_Run_where_you_do/logos_android-icon.svg'
import iconChrome from '/landing_page/Section_7_Run_where_you_do/logos_chrome.svg'
import iconDocker from '/landing_page/Section_7_Run_where_you_do/logos_docker-icon.svg'
import iconFirefox from '/landing_page/Section_7_Run_where_you_do/logos_firefox.svg'
import iconMint from '/landing_page/Section_7_Run_where_you_do/logos_linux-mint.svg'
import iconWindows from '/landing_page/Section_7_Run_where_you_do/logos_microsoft-windows-icon.svg'
import iconRedhat from '/landing_page/Section_7_Run_where_you_do/logos_redhat-icon.svg'
import iconNix from '/landing_page/Section_7_Run_where_you_do/material-icon-theme_nix.svg'
import iconArch from '/landing_page/Section_7_Run_where_you_do/selfhst_arch-linux.svg'
import iconBrave from '/landing_page/Section_7_Run_where_you_do/selfhst_brave.svg'
import iconGentoo from '/landing_page/Section_7_Run_where_you_do/selfhst_gentoo.svg'
import iconKali from '/landing_page/Section_7_Run_where_you_do/selfhst_kali-linux.svg'
import iconUbuntu from '/landing_page/Section_7_Run_where_you_do/selfhst_ubuntu.svg'
import iconZorin from '/landing_page/Section_7_Run_where_you_do/selfhst_zorin-os.svg'
import iconArtix from '/landing_page/Section_7_Run_where_you_do/thesvg-color_artix-linux.svg'
import iconPopOs from '/landing_page/Section_7_Run_where_you_do/thesvg-color_pop-os.svg'

type HomeShowcase = {
  id: 'save' | 'generate' | 'sync' | 'import' | 'autofill'
  title: string
  body: string
}

type HomeCopy = {
  showcases: HomeShowcase[]
  platformsTitle: string
  ctaTitle: string
  ctaBody: string
  ctaPrimary: string
  ctaSecondary: string
}

const copyByLocale: Record<string, HomeCopy> = {
  en: {
    showcases: [
      {
        id: 'save',
        title: 'Save Your Passwords',
        body: 'Keep all your accounts, logins and important information in one save place',
      },
      {
        id: 'generate',
        title: 'Generate Strong Passwords',
        body: 'Create secure, unique passwords with just one tap. Customize the length and character types',
      },
      {
        id: 'sync',
        title: 'Stay in Sync',
        body: 'Sync across your devices with self-hosting or connect devices directly using Nearby.',
      },
      {
        id: 'import',
        title: 'Import Your Passwords with Ease',
        body: 'Easily import passwords from Bitwarden, Chrome, LastPass, KeePass, 1Password.',
      },
      {
        id: 'autofill',
        title: 'Autofill Everywhere',
        body: 'Fill in your passwords instantly with OpenKey Autofill and Browser Extension.',
      },
    ],
    platformsTitle: 'Runs where you do',
    ctaTitle: 'Start on your own infrastructure',
    ctaBody: 'Download the app, point at your server, or pair Nearby for LAN-only sync.',
    ctaPrimary: 'Download',
    ctaSecondary: 'Get Started',
  },
  ar: {
    showcases: [
      { id: 'save', title: 'احفظ كلمات مرورك', body: 'احتفظ بكل حساباتك وبيانات تسجيل الدخول ومعلوماتك المهمة في مكان آمن.' },
      { id: 'generate', title: 'أنشئ كلمات مرور قوية', body: 'أنشئ كلمات مرور آمنة وفريدة بلمسة واحدة، مع تخصيص الطول وأنواع الأحرف.' },
      { id: 'sync', title: 'ابقَ متزامنًا', body: 'زامن أجهزتك عبر الاستضافة الذاتية أو صِلها مباشرة باستخدام Nearby.' },
      { id: 'import', title: 'استورد كلمات مرورك بسهولة', body: 'استورد كلمات المرور من Bitwarden وChrome وLastPass وKeePass و1Password بسهولة.' },
      { id: 'autofill', title: 'ملء تلقائي في كل مكان', body: 'املأ كلمات مرورك فورًا باستخدام OpenKey Autofill وامتداد المتصفح.' },
    ],
    platformsTitle: 'يعمل حيث تعمل',
    ctaTitle: 'ابدأ على بنيتك الخاصة',
    ctaBody: 'نزّل التطبيق، اربطه بخادمك، أو استخدم Nearby للمزامنة عبر الشبكة المحلية فقط.',
    ctaPrimary: 'تنزيل',
    ctaSecondary: 'ابدأ الآن',
  },
  zh: {
    showcases: [
      { id: 'save', title: '保存你的密码', body: '将所有账户、登录信息和重要资料安全地集中保存。' },
      { id: 'generate', title: '生成强密码', body: '一键创建安全且独特的密码，并自定义长度和字符类型。' },
      { id: 'sync', title: '保持同步', body: '通过自托管同步设备，或使用 Nearby 直接连接设备。' },
      { id: 'import', title: '轻松导入密码', body: '轻松从 Bitwarden、Chrome、LastPass、KeePass 和 1Password 导入密码。' },
      { id: 'autofill', title: '随处自动填充', body: '使用 OpenKey Autofill 和浏览器扩展即时填充密码。' },
    ],
    platformsTitle: '随处运行',
    ctaTitle: '从自己的基础设施开始',
    ctaBody: '下载应用、连接你的服务器，或使用 Nearby 进行局域网同步。',
    ctaPrimary: '下载',
    ctaSecondary: '开始使用',
  },
  es: {
    showcases: [
      { id: 'save', title: 'Guarda tus contraseñas', body: 'Mantén todas tus cuentas, accesos e información importante en un solo lugar.' },
      { id: 'generate', title: 'Genera contraseñas fuertes', body: 'Crea contraseñas seguras y únicas con un toque. Personaliza su longitud y caracteres.' },
      { id: 'sync', title: 'Mantén todo sincronizado', body: 'Sincroniza tus dispositivos con autoalojamiento o conéctalos directamente mediante Nearby.' },
      { id: 'import', title: 'Importa tus contraseñas fácilmente', body: 'Importa fácilmente desde Bitwarden, Chrome, LastPass, KeePass y 1Password.' },
      { id: 'autofill', title: 'Autocompletado en todas partes', body: 'Completa tus contraseñas al instante con OpenKey Autofill y la extensión del navegador.' },
    ],
    platformsTitle: 'Funciona donde tú quieras',
    ctaTitle: 'Empieza en tu propia infraestructura',
    ctaBody: 'Descarga la aplicación, conecta tu servidor o usa Nearby para sincronizar solo en tu LAN.',
    ctaPrimary: 'Descargar',
    ctaSecondary: 'Empezar',
  },
  fr: {
    showcases: [
      { id: 'save', title: 'Enregistrez vos mots de passe', body: 'Gardez tous vos comptes, identifiants et informations importantes au même endroit.' },
      { id: 'generate', title: 'Générez des mots de passe forts', body: 'Créez des mots de passe sûrs et uniques en un geste, avec longueur et caractères personnalisables.' },
      { id: 'sync', title: 'Restez synchronisé', body: 'Synchronisez vos appareils en auto-hébergement ou connectez-les directement avec Nearby.' },
      { id: 'import', title: 'Importez vos mots de passe facilement', body: 'Importez facilement depuis Bitwarden, Chrome, LastPass, KeePass et 1Password.' },
      { id: 'autofill', title: 'Remplissage automatique partout', body: 'Remplissez instantanément vos mots de passe avec OpenKey Autofill et l’extension navigateur.' },
    ],
    platformsTitle: 'Fonctionne partout où vous êtes',
    ctaTitle: 'Commencez sur votre infrastructure',
    ctaBody: 'Téléchargez l’application, indiquez votre serveur ou utilisez Nearby pour une synchronisation LAN.',
    ctaPrimary: 'Télécharger',
    ctaSecondary: 'Commencer',
  },
  hi: {
    showcases: [
      { id: 'save', title: 'अपने पासवर्ड सुरक्षित रखें', body: 'अपने सभी खाते, लॉगिन और महत्वपूर्ण जानकारी एक सुरक्षित जगह पर रखें।' },
      { id: 'generate', title: 'मज़बूत पासवर्ड बनाएं', body: 'एक टैप में सुरक्षित और अनोखे पासवर्ड बनाएं और लंबाई व अक्षर प्रकार चुनें।' },
      { id: 'sync', title: 'सिंक बनाए रखें', body: 'सेल्फ-होस्टिंग से डिवाइस सिंक करें या Nearby से सीधे कनेक्ट करें।' },
      { id: 'import', title: 'पासवर्ड आसानी से इंपोर्ट करें', body: 'Bitwarden, Chrome, LastPass, KeePass और 1Password से पासवर्ड इंपोर्ट करें।' },
      { id: 'autofill', title: 'हर जगह ऑटोफिल', body: 'OpenKey Autofill और ब्राउज़र एक्सटेंशन से पासवर्ड तुरंत भरें।' },
    ],
    platformsTitle: 'जहाँ आप काम करते हैं',
    ctaTitle: 'अपने इंफ्रास्ट्रक्चर पर शुरू करें',
    ctaBody: 'ऐप डाउनलोड करें, अपने सर्वर से जोड़ें या केवल LAN सिंक के लिए Nearby का उपयोग करें।',
    ctaPrimary: 'डाउनलोड',
    ctaSecondary: 'शुरू करें',
  },
  bn: {
    showcases: [
      { id: 'save', title: 'আপনার পাসওয়ার্ড সংরক্ষণ করুন', body: 'আপনার সব অ্যাকাউন্ট, লগইন এবং গুরুত্বপূর্ণ তথ্য এক নিরাপদ জায়গায় রাখুন।' },
      { id: 'generate', title: 'শক্তিশালী পাসওয়ার্ড তৈরি করুন', body: 'এক ট্যাপে নিরাপদ ও অনন্য পাসওয়ার্ড তৈরি করুন এবং দৈর্ঘ্য ও অক্ষরের ধরন ঠিক করুন।' },
      { id: 'sync', title: 'সিঙ্কে থাকুন', body: 'সেল্ফ-হোস্টিং দিয়ে ডিভাইস সিঙ্ক করুন বা Nearby দিয়ে সরাসরি যুক্ত করুন।' },
      { id: 'import', title: 'সহজে পাসওয়ার্ড ইমপোর্ট করুন', body: 'Bitwarden, Chrome, LastPass, KeePass এবং 1Password থেকে সহজে ইমপোর্ট করুন।' },
      { id: 'autofill', title: 'সব জায়গায় অটোফিল', body: 'OpenKey Autofill ও ব্রাউজার এক্সটেনশন দিয়ে মুহূর্তে পাসওয়ার্ড পূরণ করুন।' },
    ],
    platformsTitle: 'আপনি যেখানে কাজ করেন',
    ctaTitle: 'নিজস্ব অবকাঠামোতে শুরু করুন',
    ctaBody: 'অ্যাপ ডাউনলোড করুন, সার্ভারের সঙ্গে যুক্ত করুন বা শুধু LAN সিঙ্কের জন্য Nearby ব্যবহার করুন।',
    ctaPrimary: 'ডাউনলোড',
    ctaSecondary: 'শুরু করুন',
  },
  pt: {
    showcases: [
      { id: 'save', title: 'Guarde as suas palavras-passe', body: 'Mantenha todas as suas contas, acessos e informações importantes num só lugar.' },
      { id: 'generate', title: 'Crie palavras-passe fortes', body: 'Crie palavras-passe seguras e únicas com um toque, personalizando o tamanho e os caracteres.' },
      { id: 'sync', title: 'Mantenha tudo sincronizado', body: 'Sincronize os seus dispositivos com alojamento próprio ou ligue-os diretamente pelo Nearby.' },
      { id: 'import', title: 'Importe palavras-passe facilmente', body: 'Importe facilmente do Bitwarden, Chrome, LastPass, KeePass e 1Password.' },
      { id: 'autofill', title: 'Preenchimento automático em todo o lado', body: 'Preencha palavras-passe instantaneamente com o OpenKey Autofill e a extensão do navegador.' },
    ],
    platformsTitle: 'Funciona onde estiver',
    ctaTitle: 'Comece na sua própria infraestrutura',
    ctaBody: 'Descarregue a aplicação, ligue o seu servidor ou use o Nearby para sincronização apenas na LAN.',
    ctaPrimary: 'Descarregar',
    ctaSecondary: 'Começar',
  },
  ru: {
    showcases: [
      { id: 'save', title: 'Храните свои пароли', body: 'Держите все аккаунты, данные для входа и важную информацию в одном безопасном месте.' },
      { id: 'generate', title: 'Создавайте надёжные пароли', body: 'Создавайте безопасные уникальные пароли одним касанием и настраивайте длину и символы.' },
      { id: 'sync', title: 'Оставайтесь синхронизированными', body: 'Синхронизируйте устройства через свой сервер или подключайте их напрямую с Nearby.' },
      { id: 'import', title: 'Легко импортируйте пароли', body: 'Импортируйте пароли из Bitwarden, Chrome, LastPass, KeePass и 1Password.' },
      { id: 'autofill', title: 'Автозаполнение повсюду', body: 'Мгновенно заполняйте пароли с OpenKey Autofill и расширением браузера.' },
    ],
    platformsTitle: 'Работает там, где вы работаете',
    ctaTitle: 'Начните со своей инфраструктуры',
    ctaBody: 'Скачайте приложение, подключите свой сервер или используйте Nearby для синхронизации по LAN.',
    ctaPrimary: 'Скачать',
    ctaSecondary: 'Начать',
  },
  ur: {
    showcases: [
      { id: 'save', title: 'اپنے پاس ورڈ محفوظ کریں', body: 'اپنے تمام اکاؤنٹس، لاگ اِن اور اہم معلومات ایک محفوظ جگہ پر رکھیں۔' },
      { id: 'generate', title: 'مضبوط پاس ورڈ بنائیں', body: 'ایک ٹیپ سے محفوظ اور منفرد پاس ورڈ بنائیں اور لمبائی و حروف کی اقسام منتخب کریں۔' },
      { id: 'sync', title: 'ہمیشہ ہم وقت رہیں', body: 'سیلف ہوسٹنگ کے ذریعے ڈیوائسز ہم وقت کریں یا Nearby سے براہِ راست جوڑیں۔' },
      { id: 'import', title: 'پاس ورڈ آسانی سے درآمد کریں', body: 'Bitwarden، Chrome، LastPass، KeePass اور 1Password سے آسانی سے درآمد کریں۔' },
      { id: 'autofill', title: 'ہر جگہ خودکار تکمیل', body: 'OpenKey Autofill اور براؤزر ایکسٹینشن سے پاس ورڈ فوراً پُر کریں۔' },
    ],
    platformsTitle: 'جہاں آپ کام کرتے ہیں',
    ctaTitle: 'اپنے انفراسٹرکچر سے شروع کریں',
    ctaBody: 'ایپ ڈاؤن لوڈ کریں، اپنے سرور سے جوڑیں یا صرف LAN ہم وقت سازی کے لیے Nearby استعمال کریں۔',
    ctaPrimary: 'ڈاؤن لوڈ',
    ctaSecondary: 'شروع کریں',
  },
}

const props = defineProps<{
  showcases?: HomeShowcase[]
  platformsTitle?: string
  ctaTitle?: string
  ctaBody?: string
  ctaPrimary?: string
  ctaSecondary?: string
  downloadLink?: string
  quickStartLink?: string
}>()

const { lang } = useData()
const localized = computed(() => {
  const base = copyByLocale[lang.value] ?? copyByLocale.en
  return {
    showcases: props.showcases ?? base.showcases,
    platformsTitle: props.platformsTitle ?? base.platformsTitle,
    ctaTitle: props.ctaTitle ?? base.ctaTitle,
    ctaBody: props.ctaBody ?? base.ctaBody,
    ctaPrimary: props.ctaPrimary ?? base.ctaPrimary,
    ctaSecondary: props.ctaSecondary ?? base.ctaSecondary,
  }
})

const byId = (id: HomeShowcase['id']) =>
  localized.value.showcases.find((s) => s.id === id) ?? localized.value.showcases[0]!

const save = computed(() => byId('save'))
const generate = computed(() => byId('generate'))
const sync = computed(() => byId('sync'))
const imp = computed(() => byId('import'))
const autofill = computed(() => byId('autofill'))
const platformsTitle = computed(() => localized.value.platformsTitle)
const ctaTitle = computed(() => localized.value.ctaTitle)
const ctaBody = computed(() => localized.value.ctaBody)
const ctaPrimary = computed(() => localized.value.ctaPrimary)
const ctaSecondary = computed(() => localized.value.ctaSecondary)
const localePrefix = computed(() => (lang.value === 'en' ? '' : `/${lang.value}`))
const downloadLink = computed(
  () => props.downloadLink ?? `${localePrefix.value}/guide/download`,
)
const quickStartLink = computed(
  () => props.quickStartLink ?? `${localePrefix.value}/guide/quick-start`,
)

const platformIcons: Array<{ src: string; label: string }> = [
  { src: iconFirefox, label: 'Firefox' },
  { src: iconUbuntu, label: 'Ubuntu' },
  { src: iconDebian, label: 'Debian' },
  { src: iconMint, label: 'Linux Mint' },
  { src: iconArch, label: 'Arch Linux' },
  { src: iconAndroid, label: 'Android' },
  { src: iconChrome, label: 'Chrome' },
  { src: iconLinux, label: 'Linux' },
  { src: iconKali, label: 'Kali Linux' },
  { src: iconGentoo, label: 'Gentoo' },
  { src: iconApple, label: 'Apple' },
  { src: iconWindows, label: 'Windows' },
  { src: iconRedhat, label: 'Red Hat' },
  { src: iconRaspberrypi, label: 'Raspberry Pi' },
  { src: iconZorin, label: 'Zorin OS' },
  { src: iconPopOs, label: 'Pop!_OS' },
  { src: iconArtix, label: 'Artix Linux' },
  { src: iconDocker, label: 'Docker' },
  { src: iconNix, label: 'Nix' },
  { src: iconBrave, label: 'Brave' },
]

const importIcons = [
  { src: icon1password, label: '1Password', pos: 'i1' },
  { src: iconBitwarden, label: 'Bitwarden', pos: 'i2' },
  { src: iconGoogle, label: 'Google Passwords', pos: 'i3' },
  { src: iconKeepass, label: 'KeePass', pos: 'i4' },
  { src: iconLastpass, label: 'LastPass', pos: 'i5' },
]

const root = useHomeRevealRoot()
</script>

<template>
  <div ref="root" class="ok-home-body">
    <!-- Save -->
    <section
      class="ok-showcase ok-showcase--copy-start ok-showcase--save"
      data-ok-reveal
      :aria-labelledby="`ok-sc-${save.id}`"
    >
      <div class="ok-showcase__clouds" aria-hidden="true">
        <div class="ok-cloud ok-cloud--section-left">
          <span class="ok-cloud__rim" />
          <span class="ok-cloud__fill" />
        </div>
      </div>
      <div class="ok-showcase__inner">
        <div class="ok-showcase__copy">
          <h2 :id="`ok-sc-${save.id}`" class="ok-showcase__title">{{ save.title }}</h2>
          <p class="ok-showcase__body">{{ save.body }}</p>
        </div>
        <div class="ok-showcase__media ok-showcase__media--phones">
          <img
            class="ok-shot ok-shot--save-back"
            :src="saveHome"
            alt="OpenKey home screen on Android"
            width="390"
            height="620"
            loading="lazy"
            decoding="async"
          />
          <img
            class="ok-shot ok-shot--save-front"
            :src="saveDetail"
            alt="Password details on Android"
            width="358"
            height="567"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <!-- Generate -->
    <section
      class="ok-showcase ok-showcase--copy-end ok-showcase--generate"
      data-ok-reveal
      :aria-labelledby="`ok-sc-${generate.id}`"
    >
      <div class="ok-showcase__clouds" aria-hidden="true">
        <div class="ok-cloud ok-cloud--section-right">
          <span class="ok-cloud__rim" />
          <span class="ok-cloud__fill" />
        </div>
      </div>
      <div class="ok-showcase__inner">
        <div class="ok-showcase__copy">
          <h2 :id="`ok-sc-${generate.id}`" class="ok-showcase__title">{{ generate.title }}</h2>
          <p class="ok-showcase__body">{{ generate.body }}</p>
        </div>
        <div class="ok-showcase__media">
          <img
            class="ok-shot ok-shot--wide"
            :src="generateShot"
            alt="Password generator screens"
            width="699"
            height="567"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <!-- Sync -->
    <section
      class="ok-showcase ok-showcase--copy-end ok-showcase--sync"
      data-ok-reveal
      :aria-labelledby="`ok-sc-${sync.id}`"
    >
      <div class="ok-showcase__clouds" aria-hidden="true">
        <div class="ok-cloud ok-cloud--section-right">
          <span class="ok-cloud__rim" />
          <span class="ok-cloud__fill" />
        </div>
      </div>
      <div class="ok-showcase__inner">
        <div class="ok-showcase__copy">
          <h2 :id="`ok-sc-${sync.id}`" class="ok-showcase__title">{{ sync.title }}</h2>
          <p class="ok-showcase__body">{{ sync.body }}</p>
        </div>
        <div class="ok-showcase__media">
          <img
            class="ok-shot ok-shot--wide ok-shot--sync"
            :src="syncShot"
            alt="Synced devices"
            width="888"
            height="550"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <!-- Import -->
    <section
      class="ok-showcase ok-showcase--copy-start ok-showcase--import"
      data-ok-reveal
      :aria-labelledby="`ok-sc-${imp.id}`"
    >
      <div class="ok-showcase__clouds" aria-hidden="true">
        <div class="ok-cloud ok-cloud--section-left ok-cloud--import">
          <span class="ok-cloud__rim" />
          <span class="ok-cloud__fill" />
        </div>
      </div>
      <div class="ok-showcase__inner">
        <div class="ok-showcase__copy">
          <h2 :id="`ok-sc-${imp.id}`" class="ok-showcase__title">{{ imp.title }}</h2>
          <p class="ok-showcase__body">{{ imp.body }}</p>
        </div>
        <div class="ok-showcase__media ok-showcase__media--import">
          <div class="ok-import-stage">
            <img
              class="ok-shot ok-shot--import"
              :src="importPhone"
              alt="Import passwords screen"
              width="313"
              height="664"
              loading="lazy"
              decoding="async"
            />
            <img
              v-for="brand in importIcons"
              :key="brand.pos"
              class="ok-import-icon"
              :class="`ok-import-icon--${brand.pos}`"
              :src="brand.src"
              :alt="brand.label"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Autofill -->
    <section
      class="ok-showcase ok-showcase--copy-start ok-showcase--autofill"
      data-ok-reveal
      aria-labelledby="ok-sc-autofill"
    >
      <div class="ok-showcase__clouds" aria-hidden="true">
        <div class="ok-cloud ok-cloud--section-left ok-cloud--autofill">
          <span class="ok-cloud__rim" />
          <span class="ok-cloud__fill" />
        </div>
      </div>
      <div class="ok-showcase__inner">
        <div class="ok-showcase__copy">
          <h2 id="ok-sc-autofill" class="ok-showcase__title">{{ autofill.title }}</h2>
          <p class="ok-showcase__body">{{ autofill.body }}</p>
        </div>
        <div class="ok-showcase__media">
          <img
            class="ok-shot ok-shot--wide ok-shot--autofill"
            :src="autofillShot"
            alt="Autofill across devices and browser"
            width="969"
            height="686"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <!-- Platforms -->
    <section
      class="ok-home-band ok-home-band--platforms "
      data-ok-reveal
      aria-labelledby="ok-platforms-title"
    >
      <div class="ok-cloud ok-cloud--platforms" aria-hidden="true">
        <span class="ok-cloud__rim" />
        <span class="ok-cloud__fill" />
      </div>
      <div class="ok-home-band__inner">
        <h2 id="ok-platforms-title" class="ok-home-section__title ok-home-section__title--center">
          {{ platformsTitle }}
        </h2>
        <ul class="ok-platform-grid">
          <li
            v-for="(platform, i) in platformIcons"
            :key="platform.label"
            class="ok-platform-tile"
            :style="{ '--ok-i': i }"
          >
            <img
              class="ok-platform-tile__icon"
              :src="platform.src"
              :alt="platform.label"
              width="56"
              height="56"
              loading="lazy"
              decoding="async"
            />
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="ok-home-band ok-home-band--cta"
      data-ok-reveal
      aria-labelledby="ok-cta-title"
    >
      <div class="ok-home-band__inner">
        <div class="ok-cta-card">
          <h2 id="ok-cta-title" class="ok-cta-card__title">{{ ctaTitle }}</h2>
          <p class="ok-cta-card__body">{{ ctaBody }}</p>
          <div class="ok-cta-card__actions">
            <a class="ok-hero__cta ok-hero__cta--primary" :href="downloadLink">{{ ctaPrimary }}</a>
            <a class="ok-hero__cta ok-hero__cta--ghost" :href="quickStartLink">{{ ctaSecondary }}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
