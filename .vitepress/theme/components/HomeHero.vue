<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import BrandIcon from './BrandIcon.vue'
import DownloadPicker from './DownloadPicker.vue'
import { useSitePrefs } from '../composables/useSitePrefs'

const props = withDefaults(
  defineProps<{
    tagline?: string
    note?: string
    ctaPrimary?: string
    ctaSecondary?: string
    downloadLink?: string
    quickStartLink?: string
  }>(),
  {
    tagline: 'Self-hosted password manager. Ciphertext only on the server.',
    note: 'No account is needed for your passwords — a server is enough.',
    ctaPrimary: 'Download',
    ctaSecondary: 'Get Started',
    downloadLink: '/guide/download',
    quickStartLink: '/guide/quick-start',
  },
)

const { isDark: vpDark, lang } = useData()
const { isDark, prefs } = useSitePrefs()

const localizedNotes: Record<string, string> = {
  en: 'We picked the build that fits your machine — one click and you’re in.',
  ar: 'اخترنا الإصدار المناسب لجهازك — نقرة واحدة وتبدأ الاستخدام.',
  bn: 'আপনার ডিভাইসের জন্য উপযুক্ত বিল্ড বেছে নেওয়া হয়েছে — এক ক্লিকেই শুরু করুন।',
  es: 'Elegimos la versión adecuada para tu equipo: un clic y estarás dentro.',
  fr: 'Nous avons choisi la version adaptée à votre machine : un clic et vous êtes prêt.',
  hi: 'हमने आपके डिवाइस के लिए सही बिल्ड चुना है — एक क्लिक में शुरू करें।',
  pt: 'Escolhemos a versão ideal para o seu dispositivo — um clique e você começa.',
  ru: 'Мы выбрали сборку для вашего устройства — один клик, и вы готовы.',
  ur: 'ہم نے آپ کے آلے کے لیے موزوں بلڈ منتخب کی ہے — ایک کلک سے شروع کریں۔',
  zh: '我们已为你的设备选择合适的版本——点击一下即可开始。',
}

const localizedNote = computed(() => {
  if (props.note !== 'No account is needed for your passwords — a server is enough.') {
    return props.note
  }
  return localizedNotes[lang.value?.split('-')[0] || 'en'] || localizedNotes.en
})
</script>

<template>
  <section
    class="ok-hero"
    :data-theme="(isDark || vpDark) ? 'dark' : 'light'"
    :data-palette="prefs.palette"
  >
    <div class="ok-hero__clouds" aria-hidden="true">
      <div class="ok-cloud ok-cloud--hero-left">
        <span class="ok-cloud__rim" />
        <span class="ok-cloud__fill" />
      </div>
      <div class="ok-cloud ok-cloud--hero-right">
        <span class="ok-cloud__rim" />
        <span class="ok-cloud__fill" />
      </div>
    </div>

    <div class="ok-hero__stage">
      <div class="ok-hero__icon-wrap">
        <BrandIcon size="hero" class="ok-hero__icon" />
      </div>

      <div class="ok-hero__content">
        <h1 class="ok-hero__brand">OpenKey</h1>
        <p class="ok-hero__tagline">{{ props.tagline }}</p>
        <DownloadPicker
          layout="hero"
          :lead="localizedNote"
          :quick-start-link="props.quickStartLink"
          :cta-secondary="props.ctaSecondary"
        />
      </div>
    </div>
  </section>
</template>
