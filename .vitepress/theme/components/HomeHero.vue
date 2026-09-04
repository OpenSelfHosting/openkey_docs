<script setup lang="ts">
import { useData } from 'vitepress'
import BrandIcon from './BrandIcon.vue'
import DownloadPicker from './DownloadPicker.vue'
import { useSitePrefs } from '../composables/useSitePrefs'

const props = withDefaults(
  defineProps<{
    tagline?: string
    ctaPrimary?: string
    ctaSecondary?: string
    downloadLink?: string
    quickStartLink?: string
  }>(),
  {
    tagline: 'Self-hosted password manager. Ciphertext only on the server.',
    ctaPrimary: 'Download',
    ctaSecondary: 'Get started',
    downloadLink: '/guide/download',
    quickStartLink: '/guide/quick-start',
  },
)

const { isDark: vpDark } = useData()
const { isDark, prefs } = useSitePrefs()
</script>

<template>
  <section
    class="ok-hero"
    :data-theme="(isDark || vpDark) ? 'dark' : 'light'"
    :data-palette="prefs.palette"
  >
    <div class="ok-hero__atmosphere" aria-hidden="true">
      <div class="ok-hero__grid" />
      <div class="ok-hero__glow" />
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
          :quick-start-link="props.quickStartLink"
          :cta-secondary="props.ctaSecondary"
        />
      </div>
    </div>
  </section>
</template>
