<script setup lang="ts">
import { useData } from 'vitepress'
import BrandIcon from './BrandIcon.vue'
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
        <div class="ok-hero__actions">
          <a
            class="ok-hero__cta ok-hero__cta--primary"
            :href="props.downloadLink"
          >
            {{ props.ctaPrimary }}
          </a>
          <a
            class="ok-hero__cta ok-hero__cta--ghost"
            :href="props.quickStartLink"
          >
            {{ props.ctaSecondary }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
