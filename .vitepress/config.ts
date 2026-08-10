import { defineConfig, type DefaultTheme, type LocaleSpecificConfig } from 'vitepress'

type GuideLabels = {
  guide: string
  overview: string
  security: string
  quickStart: string
  download: string
  server: string
  app: string
  nearby: string
  extension: string
  cli: string
  sharing: string
  importExport: string
  faq: string
  changelog: string
  packages: string
  pricing: string
  legal: string
  privacy: string
  terms: string
  blog: string
  blogIndex: string
  github: string
}

type LocaleUi = {
  label: string
  lang: string
  dir?: 'rtl' | 'ltr'
  description: string
  labels: GuideLabels
  outlineLabel: string
  returnToTopLabel: string
  darkModeSwitchLabel: string
  sidebarMenuLabel: string
  docFooterPrev: string
  docFooterNext: string
}

const github = 'https://github.com/OpenSelfHosting'

const blogPosts = {
  en: [
    { text: 'Welcome to OpenKey', link: '/blog/welcome-to-openkey' },
    { text: 'Zero-knowledge sync explained', link: '/blog/zero-knowledge-sync' },
    { text: 'Why self-host your password vault', link: '/blog/self-host-your-vault' },
    { text: 'Nearby without a server', link: '/blog/nearby-without-a-server' },
    { text: 'OpenKey Pro — what unlocks', link: '/blog/openkey-pro' },
    { text: 'Passkeys and autofill in the browser', link: '/blog/passkeys-and-autofill' },
    { text: 'A CLI for developer secrets', link: '/blog/cli-for-developers' },
  ],
  ar: [
    { text: 'مرحباً بـ OpenKey', link: '/ar/blog/welcome-to-openkey' },
    { text: 'مزامنة بلا معرفة — كيف تعمل', link: '/ar/blog/zero-knowledge-sync' },
    { text: 'لماذا تستضيف خزنة كلمات المرور بنفسك', link: '/ar/blog/self-host-your-vault' },
    { text: 'Nearby بلا خادم', link: '/ar/blog/nearby-without-a-server' },
    { text: 'OpenKey Pro — ماذا يُفتح', link: '/ar/blog/openkey-pro' },
    { text: 'Passkeys والتعبئة التلقائية في المتصفح', link: '/ar/blog/passkeys-and-autofill' },
    { text: 'واجهة سطر أوامر لأسرار المطورين', link: '/ar/blog/cli-for-developers' },
  ],
} as const

function guideSidebar(prefix: string, labels: GuideLabels): DefaultTheme.SidebarItem[] {
  const p = prefix === '/' ? '' : prefix
  return [
    {
      text: labels.guide,
      items: [
        { text: labels.overview, link: `${p}/guide/overview` },
        { text: labels.security, link: `${p}/guide/security` },
        { text: labels.quickStart, link: `${p}/guide/quick-start` },
        { text: labels.download, link: `${p}/guide/download` },
        { text: labels.server, link: `${p}/guide/server` },
        { text: labels.app, link: `${p}/guide/app` },
        { text: labels.nearby, link: `${p}/guide/nearby` },
        { text: labels.extension, link: `${p}/guide/extension` },
        { text: labels.cli, link: `${p}/guide/cli` },
        { text: labels.sharing, link: `${p}/guide/sharing` },
        { text: labels.importExport, link: `${p}/guide/import-export` },
        { text: labels.faq, link: `${p}/guide/faq` },
        { text: labels.changelog, link: `${p}/guide/changelog` },
        { text: labels.packages, link: `${p}/guide/packages` },
        { text: labels.pricing, link: `${p}/pricing` },
        { text: labels.privacy, link: `${p}/privacy` },
        { text: labels.terms, link: `${p}/terms` },
      ],
    },
  ]
}

function blogSidebar(lang: string, labels: GuideLabels): DefaultTheme.SidebarItem[] {
  const prefix = lang === 'en' ? '' : `/${lang}`
  // Untranslated locales keep an index page, then link into the English posts.
  const posts = lang === 'ar' ? blogPosts.ar : blogPosts.en
  return [
    {
      text: labels.blog,
      items: [{ text: labels.blogIndex, link: `${prefix}/blog/` }, ...posts],
    },
  ]
}

function nav(prefix: string, labels: GuideLabels): DefaultTheme.NavItem[] {
  const p = prefix === '/' ? '' : prefix
  return [
    {
      text: labels.guide,
      items: [
        { text: labels.overview, link: `${p}/guide/overview` },
        { text: labels.security, link: `${p}/guide/security` },
        { text: labels.quickStart, link: `${p}/guide/quick-start` },
        { text: labels.download, link: `${p}/guide/download` },
        { text: labels.server, link: `${p}/guide/server` },
        { text: labels.app, link: `${p}/guide/app` },
        { text: labels.nearby, link: `${p}/guide/nearby` },
        { text: labels.extension, link: `${p}/guide/extension` },
        { text: labels.cli, link: `${p}/guide/cli` },
        { text: labels.sharing, link: `${p}/guide/sharing` },
        { text: labels.importExport, link: `${p}/guide/import-export` },
        { text: labels.faq, link: `${p}/guide/faq` },
        { text: labels.changelog, link: `${p}/guide/changelog` },
        { text: labels.packages, link: `${p}/guide/packages` },
      ],
    },
    { text: labels.pricing, link: `${p}/pricing` },
    {
      text: labels.legal,
      items: [
        { text: labels.privacy, link: `${p}/privacy` },
        { text: labels.terms, link: `${p}/terms` },
      ],
    },
    { text: labels.blog, link: `${p}/blog/` },
    { text: labels.github, link: github },
  ]
}

function footer(prefix: string, labels: GuideLabels): DefaultTheme.Footer {
  const p = prefix === '/' ? '' : prefix
  return {
    message:
      `MIT License · Ciphertext only on the server · <a href="${p}/pricing">${labels.pricing}</a> · <a href="${p}/privacy">${labels.privacy}</a> · <a href="${p}/terms">${labels.terms}</a>`,
    copyright:
      'Copyright © 2026 <a href="https://openselfhosting.com">OpenSelfHosting</a> · <a href="https://openkey.openselfhosting.com">openkey.openselfhosting.com</a> · Report security issues to security@openselfhosting.com',
  }
}

function localeConfig(ui: LocaleUi): LocaleSpecificConfig<DefaultTheme.Config> & {
  label: string
  link?: string
} {
  const prefix = ui.lang === 'en' ? '/' : `/${ui.lang}`
  const p = prefix === '/' ? '' : prefix
  const legalItems: DefaultTheme.SidebarItem[] = [
    {
      text: ui.labels.legal,
      items: [
        { text: ui.labels.pricing, link: `${p}/pricing` },
        { text: ui.labels.privacy, link: `${p}/privacy` },
        { text: ui.labels.terms, link: `${p}/terms` },
      ],
    },
  ]
  const sidebar: DefaultTheme.SidebarMulti = {
    [`${p}/guide/`]: guideSidebar(prefix, ui.labels),
    [`${p}/blog/`]: blogSidebar(ui.lang, ui.labels),
    [`${p}/pricing`]: legalItems,
    [`${p}/privacy`]: legalItems,
    [`${p}/terms`]: legalItems,
  }
  return {
    label: ui.label,
    lang: ui.lang,
    dir: ui.dir,
    description: ui.description,
    themeConfig: {
      nav: nav(prefix, ui.labels),
      sidebar,
      footer: footer(prefix, ui.labels),
      outline: { label: ui.outlineLabel },
      returnToTopLabel: ui.returnToTopLabel,
      darkModeSwitchLabel: ui.darkModeSwitchLabel,
      sidebarMenuLabel: ui.sidebarMenuLabel,
      docFooter: {
        prev: ui.docFooterPrev,
        next: ui.docFooterNext,
      },
    },
  }
}

const locales: Record<string, LocaleUi> = {
  root: {
    label: 'English',
    lang: 'en',
    description:
      'Self-hosted, end-to-end encrypted password manager. The server stores ciphertext only.',
    outlineLabel: 'On this page',
    returnToTopLabel: 'Return to top',
    darkModeSwitchLabel: 'Appearance',
    sidebarMenuLabel: 'Menu',
    docFooterPrev: 'Previous',
    docFooterNext: 'Next',
    labels: {
      guide: 'Guide',
      overview: 'Overview',
      security: 'Security',
      quickStart: 'Quick start',
      download: 'Download',
      server: 'Server setup',
      app: 'Using the app',
      nearby: 'Nearby',
      extension: 'Browser extension',
      cli: 'CLI',
      sharing: 'Sharing & orgs',
      importExport: 'Import & export',
      faq: 'FAQ',
      changelog: 'Changelog',
      packages: 'Packages',
      pricing: 'Pricing',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      blog: 'Blog',
      blogIndex: 'All posts',
      github: 'GitHub',
    },
  },
  zh: {
    label: '中文',
    lang: 'zh',
    description: '自托管、端到端加密的密码管理器。服务器只存储密文。',
    outlineLabel: '本页目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    docFooterPrev: '上一页',
    docFooterNext: '下一页',
    labels: {
      guide: '指南',
      overview: '概览',
      security: '安全',
      quickStart: '快速开始',
      download: '下载',
      server: '服务器安装',
      app: '使用应用',
      nearby: 'Nearby',
      extension: '浏览器扩展',
      cli: 'CLI',
      sharing: '共享与组织',
      importExport: '导入与导出',
      faq: '常见问题',
      changelog: '更新日志',
      packages: '软件包',
      pricing: '定价',
      legal: '法律',
      privacy: '隐私政策',
      terms: '服务条款',
      blog: '博客',
      blogIndex: '全部文章',
      github: 'GitHub',
    },
  },
  hi: {
    label: 'हिन्दी',
    lang: 'hi',
    description:
      'सेल्फ-होस्टेड, एंड-टू-एंड एन्क्रिप्टेड पासवर्ड मैनेजर। सर्वर केवल सिफरटेक्स्ट रखता है।',
    outlineLabel: 'इस पृष्ठ पर',
    returnToTopLabel: 'ऊपर जाएँ',
    darkModeSwitchLabel: 'दिखावट',
    sidebarMenuLabel: 'मेनू',
    docFooterPrev: 'पिछला',
    docFooterNext: 'अगला',
    labels: {
      guide: 'गाइड',
      overview: 'परिचय',
      security: 'सुरक्षा',
      quickStart: 'त्वरित शुरुआत',
      download: 'डाउनलोड',
      server: 'सर्वर सेटअप',
      app: 'ऐप का उपयोग',
      nearby: 'Nearby',
      extension: 'ब्राउज़र एक्सटेंशन',
      cli: 'CLI',
      sharing: 'शेयरिंग',
      importExport: 'इंपोर्ट/एक्सपोर्ट',
      faq: 'FAQ',
      changelog: 'Changelog',
      packages: 'पैकेज',
      pricing: 'मूल्य',
      legal: 'कानूनी',
      privacy: 'गोपनीयता',
      terms: 'शर्तें',
      blog: 'ब्लॉग',
      blogIndex: 'सभी पोस्ट',
      github: 'GitHub',
    },
  },
  es: {
    label: 'Español',
    lang: 'es',
    description:
      'Gestor de contraseñas autoalojado y cifrado de extremo a extremo. El servidor solo guarda cifrado.',
    outlineLabel: 'En esta página',
    returnToTopLabel: 'Volver arriba',
    darkModeSwitchLabel: 'Apariencia',
    sidebarMenuLabel: 'Menú',
    docFooterPrev: 'Anterior',
    docFooterNext: 'Siguiente',
    labels: {
      guide: 'Guía',
      overview: 'Resumen',
      security: 'Seguridad',
      quickStart: 'Inicio rápido',
      download: 'Descargar',
      server: 'Instalar el servidor',
      app: 'Usar la app',
      nearby: 'Nearby',
      extension: 'Extensión del navegador',
      cli: 'CLI',
      sharing: 'Compartir',
      importExport: 'Importar y exportar',
      faq: 'FAQ',
      changelog: 'Registro de cambios',
      packages: 'Paquetes',
      pricing: 'Precios',
      legal: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      blog: 'Blog',
      blogIndex: 'Todas las entradas',
      github: 'GitHub',
    },
  },
  fr: {
    label: 'Français',
    lang: 'fr',
    description:
      'Gestionnaire de mots de passe auto-hébergé et chiffré de bout en bout. Le serveur ne stocke que du chiffrement.',
    outlineLabel: 'Sur cette page',
    returnToTopLabel: 'Retour en haut',
    darkModeSwitchLabel: 'Apparence',
    sidebarMenuLabel: 'Menu',
    docFooterPrev: 'Précédent',
    docFooterNext: 'Suivant',
    labels: {
      guide: 'Guide',
      overview: 'Aperçu',
      security: 'Sécurité',
      quickStart: 'Démarrage rapide',
      download: 'Télécharger',
      server: 'Installer le serveur',
      app: 'Utiliser l’app',
      nearby: 'Nearby',
      extension: 'Extension navigateur',
      cli: 'CLI',
      sharing: 'Partage',
      importExport: 'Import / export',
      faq: 'FAQ',
      changelog: 'Journal des changements',
      packages: 'Paquets',
      pricing: 'Tarifs',
      legal: 'Mentions légales',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      blog: 'Blog',
      blogIndex: 'Tous les articles',
      github: 'GitHub',
    },
  },
  ar: {
    label: 'العربية',
    lang: 'ar',
    dir: 'rtl',
    description:
      'مدير كلمات مرور مستضاف ذاتياً ومشفّر من طرف إلى طرف. الخادم يخزّن النص المشفّر فقط.',
    outlineLabel: 'في هذه الصفحة',
    returnToTopLabel: 'العودة للأعلى',
    darkModeSwitchLabel: 'المظهر',
    sidebarMenuLabel: 'القائمة',
    docFooterPrev: 'السابق',
    docFooterNext: 'التالي',
    labels: {
      guide: 'الدليل',
      overview: 'نظرة عامة',
      security: 'الأمان',
      quickStart: 'بداية سريعة',
      download: 'التنزيل',
      server: 'تثبيت الخادم',
      app: 'استخدام التطبيق',
      nearby: 'Nearby',
      extension: 'امتداد المتصفح',
      cli: 'CLI',
      sharing: 'المشاركة والمنظمات',
      importExport: 'الاستيراد والتصدير',
      faq: 'الأسئلة الشائعة',
      changelog: 'سجل التغييرات',
      packages: 'الحزم',
      pricing: 'التسعير',
      legal: 'قانوني',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      blog: 'المدونة',
      blogIndex: 'كل المقالات',
      github: 'GitHub',
    },
  },
  bn: {
    label: 'বাংলা',
    lang: 'bn',
    description:
      'সেল্ফ-হোস্টেড, এন্ড-টু-এন্ড এনক্রিপ্টেড পাসওয়ার্ড ম্যানেজার। সার্ভার শুধু সিফারটেক্সট রাখে।',
    outlineLabel: 'এই পৃষ্ঠায়',
    returnToTopLabel: 'উপরে ফিরুন',
    darkModeSwitchLabel: 'চেহারা',
    sidebarMenuLabel: 'মেনু',
    docFooterPrev: 'পূর্ববর্তী',
    docFooterNext: 'পরবর্তী',
    labels: {
      guide: 'গাইড',
      overview: 'ওভারভিউ',
      security: 'নিরাপত্তা',
      quickStart: 'দ্রুত শুরু',
      download: 'ডাউনলোড',
      server: 'সার্ভার সেটআপ',
      app: 'অ্যাপ ব্যবহার',
      nearby: 'Nearby',
      extension: 'ব্রাউজার এক্সটেনশন',
      cli: 'CLI',
      sharing: 'শেয়ারিং',
      importExport: 'ইমপোর্ট/এক্সপোর্ট',
      faq: 'FAQ',
      changelog: 'Changelog',
      packages: 'প্যাকেজ',
      pricing: 'মূল্য',
      legal: 'আইনি',
      privacy: 'গোপনীয়তা',
      terms: 'শর্তাবলী',
      blog: 'ব্লগ',
      blogIndex: 'সব পোস্ট',
      github: 'GitHub',
    },
  },
  pt: {
    label: 'Português',
    lang: 'pt',
    description:
      'Gerenciador de senhas auto-hospedado e criptografado de ponta a ponta. O servidor guarda apenas texto cifrado.',
    outlineLabel: 'Nesta página',
    returnToTopLabel: 'Voltar ao topo',
    darkModeSwitchLabel: 'Aparência',
    sidebarMenuLabel: 'Menu',
    docFooterPrev: 'Anterior',
    docFooterNext: 'Próximo',
    labels: {
      guide: 'Guia',
      overview: 'Visão geral',
      security: 'Segurança',
      quickStart: 'Início rápido',
      download: 'Baixar',
      server: 'Instalar o servidor',
      app: 'Usar o app',
      nearby: 'Nearby',
      extension: 'Extensão do navegador',
      cli: 'CLI',
      sharing: 'Compartilhamento',
      importExport: 'Importar e exportar',
      faq: 'FAQ',
      changelog: 'Changelog',
      packages: 'Pacotes',
      pricing: 'Preços',
      legal: 'Legal',
      privacy: 'Privacidade',
      terms: 'Termos',
      blog: 'Blog',
      blogIndex: 'Todas as publicações',
      github: 'GitHub',
    },
  },
  ru: {
    label: 'Русский',
    lang: 'ru',
    description:
      'Самостоятельно размещаемый менеджер паролей с сквозным шифрованием. Сервер хранит только шифротекст.',
    outlineLabel: 'На этой странице',
    returnToTopLabel: 'Наверх',
    darkModeSwitchLabel: 'Оформление',
    sidebarMenuLabel: 'Меню',
    docFooterPrev: 'Назад',
    docFooterNext: 'Далее',
    labels: {
      guide: 'Руководство',
      overview: 'Обзор',
      security: 'Безопасность',
      quickStart: 'Быстрый старт',
      download: 'Скачать',
      server: 'Установка сервера',
      app: 'Использование приложения',
      nearby: 'Nearby',
      extension: 'Расширение браузера',
      cli: 'CLI',
      sharing: 'Шаринг',
      importExport: 'Импорт и экспорт',
      faq: 'FAQ',
      changelog: 'Changelog',
      packages: 'Пакеты',
      pricing: 'Цены',
      legal: 'Правовое',
      privacy: 'Конфиденциальность',
      terms: 'Условия',
      blog: 'Блог',
      blogIndex: 'Все записи',
      github: 'GitHub',
    },
  },
  ur: {
    label: 'اردو',
    lang: 'ur',
    dir: 'rtl',
    description:
      'خود میزبان، سرے سے سرے تک مرموز پاس ورڈ مینیجر۔ سرور صرف سائفر ٹیکسٹ محفوظ رکھتا ہے۔',
    outlineLabel: 'اس صفحے پر',
    returnToTopLabel: 'اوپر جائیں',
    darkModeSwitchLabel: 'ظاہری شکل',
    sidebarMenuLabel: 'مینو',
    docFooterPrev: 'پچھلا',
    docFooterNext: 'اگلا',
    labels: {
      guide: 'رہنما',
      overview: 'جائزہ',
      security: 'سیکیورٹی',
      quickStart: 'فوری آغاز',
      download: 'ڈاؤن لوڈ',
      server: 'سرور سیٹ اپ',
      app: 'ایپ کا استعمال',
      nearby: 'Nearby',
      extension: 'براؤزر ایکسٹینشن',
      cli: 'CLI',
      sharing: 'شیئرنگ',
      importExport: 'امپورٹ/ایکسپورٹ',
      faq: 'عمومی سوالات',
      changelog: 'چینج لاگ',
      packages: 'پیکجز',
      pricing: 'قیمتیں',
      legal: 'قانونی',
      privacy: 'پرائیویسی',
      terms: 'شرائط',
      blog: 'بلاگ',
      blogIndex: 'تمام مضامین',
      github: 'GitHub',
    },
  },
}

export default defineConfig({
  title: 'OpenKey',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://openkey.openselfhosting.com',
  },
  ignoreDeadLinks: [
    /^https?:\/\/localhost/,
  ],
  srcExclude: ['README.md', 'SECURITY.md'],

  head: [
    ['meta', { property: 'og:title', content: 'OpenKey' }],
    ['meta', { property: 'og:description', content: 'Self-hosted, end-to-end encrypted password manager. Ciphertext only on the server.' }],
    ['meta', { property: 'og:url', content: 'https://openkey.openselfhosting.com' }],
    ['meta', { property: 'og:image', content: '/app_icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/icons/forest_day.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/forest_day.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+Arabic:wght@400;600;700&family=Noto+Kufi+Arabic:wght@400;600;700&family=Inconsolata:wght@400;600;700&family=Roboto+Mono:wght@400;500;600&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Figtree:ital,wght@0,400;0,600;0,700;1,400&family=Roboto+Flex:opsz,wght@8..144,400;8..144,600;8..144,700&display=swap',
      },
    ],
    [
      'script',
      {},
      `(function(){try{var p=JSON.parse(localStorage.getItem('openkey-site-prefs')||'{}');var r=document.documentElement;var map={green:'forest',blue:'ocean',amber:'ember',rose:'ember'};var palette=p.palette||map[p.accent]||'forest';var font=p.font||'default';var theme=p.theme||'auto';var systemDark=matchMedia('(prefers-color-scheme: dark)').matches;var dark=theme==='dark'||(theme==='auto'&&systemDark);var icon='/icons/'+palette+'_'+(dark?'night':'day')+'.png';r.dataset.font=font;r.dataset.accent=palette;r.dataset.palette=palette;r.dataset.icon=dark?'night':'day';r.dataset.contrast=p.highContrast?'high':'normal';r.classList.toggle('dark',dark);r.style.colorScheme=dark?'dark':'light';localStorage.setItem('vitepress-theme-appearance',theme==='auto'?'auto':theme);document.querySelectorAll("link[rel*='icon']").forEach(function(l){l.href=icon});}catch(e){}})();`,
    ],
  ],

  themeConfig: {
    siteTitle: 'OpenKey',
    socialLinks: [{ icon: 'github', link: github }],
    footer: footer('/', locales.root.labels),
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: { translations: { button: { buttonText: '搜索', buttonAriaLabel: '搜索' } } },
          ar: { translations: { button: { buttonText: 'بحث', buttonAriaLabel: 'بحث' } } },
          ur: { translations: { button: { buttonText: 'تلاش', buttonAriaLabel: 'تلاش' } } },
          hi: { translations: { button: { buttonText: 'खोजें', buttonAriaLabel: 'खोजें' } } },
          es: { translations: { button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar' } } },
          fr: { translations: { button: { buttonText: 'Rechercher', buttonAriaLabel: 'Rechercher' } } },
          bn: { translations: { button: { buttonText: 'খুঁজুন', buttonAriaLabel: 'খুঁজুন' } } },
          pt: { translations: { button: { buttonText: 'Pesquisar', buttonAriaLabel: 'Pesquisar' } } },
          ru: { translations: { button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' } } },
        },
      },
    },
  },

  locales: Object.fromEntries(
    Object.entries(locales).map(([key, ui]) => [
      key,
      {
        ...localeConfig(ui),
        link: key === 'root' ? '/' : `/${key}/`,
      },
    ]),
  ),
})
