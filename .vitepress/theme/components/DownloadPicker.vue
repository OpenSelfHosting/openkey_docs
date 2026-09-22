<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import {
  DOWNLOAD_PLATFORMS,
  downloadGuidePath,
  variantHref,
  type DownloadPlatform,
  type DownloadVariant,
  type OsId,
} from '../downloads/catalog'
import { downloadCopy } from '../downloads/copy'
import { detectPlatform, detectPlatformSync } from '../downloads/detectPlatform'
import PlatformIcon from './PlatformIcon.vue'

const props = withDefaults(
  defineProps<{
    /** Compact hero strip vs full download page */
    layout?: 'hero' | 'page'
    quickStartLink?: string
    ctaSecondary?: string
    /** Override the default detected-build lead line */
    lead?: string
  }>(),
  {
    layout: 'hero',
    quickStartLink: '/guide/quick-start',
    ctaSecondary: '',
    lead: '',
  },
)

const { lang } = useData()

const detected = ref(detectPlatformSync())
const ready = ref(false)

const copy = computed(() => downloadCopy(lang.value))

/** EN is site root; other langs use /{lang}. */
const localePath = computed(() => {
  if (!lang.value || lang.value === 'en') return ''
  return `/${lang.value}`
})

function resolveHref(href: string) {
  if (/^https?:\/\//i.test(href)) return href
  return withBase(href)
}

const allPlatformsHref = computed(() => resolveHref(downloadGuidePath(localePath.value)))

const platformLabel = computed(() => {
  const p = detected.value.platform
  if (!p) return ''
  return copy.value.platform[p.id]
})

const detectedOs = computed<OsId | 'unknown'>(() => detected.value.os)

const primaryHref = computed(() => {
  const { platform, variant } = detected.value
  if (!platform || !variant) return allPlatformsHref.value
  return resolveHref(variantHref(localePath.value, platform, variant))
})

const primaryLabel = computed(() => {
  if (!detected.value.platform) return copy.value.unknownCta
  return copy.value.downloadFor(platformLabel.value)
})

const secondaryLabel = computed(
  () => props.ctaSecondary || copy.value.getStarted,
)

const otherVariants = computed(() => {
  const platform = detected.value.platform
  if (!platform) return [] as { variant: DownloadVariant; href: string; label: string }[]
  return platform.variants.map((variant) => ({
    variant,
    href: resolveHref(variantHref(localePath.value, platform, variant)),
    label: copy.value.variant[variant.labelKey] || variant.labelKey,
  }))
})

function onOtherChange(event: Event) {
  const select = event.target as HTMLSelectElement
  const href = select.value
  if (!href) return
  window.location.assign(href)
  select.selectedIndex = 0
}

onMounted(async () => {
  detected.value = await detectPlatform()
  ready.value = true
})

watch(lang, async () => {
  detected.value = await detectPlatform()
})

function platformTitle(platform: DownloadPlatform) {
  return copy.value.platform[platform.id]
}

function requirement(platform: DownloadPlatform) {
  return copy.value.requirement[platform.id]
}

function variantLabel(variant: DownloadVariant) {
  return copy.value.variant[variant.labelKey] || variant.labelKey
}

function isDetected(platform: DownloadPlatform) {
  return detected.value.platform?.id === platform.id
}
</script>

<template>
  <!-- Hero: compact detected CTA -->
  <div v-if="layout === 'hero'" class="ok-dl ok-dl--hero">
    <p class="ok-dl__lead" :data-ready="ready ? '1' : '0'">
      {{ props.lead || copy.detectedLead }}
    </p>

    <div class="ok-dl__actions">
      <a class="ok-hero__cta ok-hero__cta--primary" :href="primaryHref">
        <PlatformIcon class="ok-dl__cta-icon" variant="inline" :os="detectedOs" :size="18" />
        {{ primaryLabel }}
      </a>
      <a class="ok-hero__cta ok-hero__cta--ghost" :href="resolveHref(quickStartLink)">
        {{ secondaryLabel }}
      </a>
    </div>
  </div>

  <!-- Download page: featured OS + platform cards (with professional marks) -->
  <div v-else class="ok-dl ok-dl--page">
    <header class="ok-dl__page-head">
      <h1 class="ok-dl__page-title">{{ copy.platformsHeading }}</h1>
      <p class="ok-dl__lead">{{ copy.detectedLead }}</p>
      <p class="ok-dl__note">{{ copy.channelsNote }}</p>
    </header>

    <section
      v-if="detected.platform"
      class="ok-dl__featured"
      :aria-label="copy.yourOs"
    >
      <div class="ok-dl__featured-badge">{{ copy.yourOs }}</div>
      <div class="ok-dl__featured-heading">
        <span class="ok-dl__mark-wrap" aria-hidden="true">
          <PlatformIcon variant="mark" :os="detected.platform.id" :size="88" />
        </span>
        <h2 class="ok-dl__featured-title">{{ platformLabel }}</h2>
      </div>
      <p class="ok-dl__req">{{ requirement(detected.platform) }}</p>
      <div class="ok-dl__featured-actions">
        <a class="ok-hero__cta ok-hero__cta--primary" :href="primaryHref">
          <PlatformIcon
            class="ok-dl__cta-icon"
            variant="inline"
            :os="detected.platform.id"
            :size="18"
          />
          {{ primaryLabel }}
        </a>
        <label class="ok-dl__other ok-dl__other--featured">
          <span class="ok-dl__other-label">{{ copy.otherDownloads }}</span>
          <select
            class="ok-dl__select"
            :aria-label="copy.otherDownloads"
            @change="onOtherChange"
          >
            <option value="" selected disabled>{{ copy.pickBuild }}</option>
            <option
              v-for="item in otherVariants"
              :key="item.variant.id"
              :value="item.href"
            >
              {{ item.label }}
            </option>
          </select>
        </label>
      </div>
    </section>

    <div class="ok-dl__grid">
      <section
        v-for="platform in DOWNLOAD_PLATFORMS"
        :id="platform.anchor"
        :key="platform.id"
        class="ok-dl__card"
        :class="{ 'is-detected': isDetected(platform) }"
      >
        <div class="ok-dl__card-heading">
          <span class="ok-dl__mark-wrap ok-dl__mark-wrap--sm" aria-hidden="true">
            <PlatformIcon variant="mark" :os="platform.id" :size="72" />
          </span>
          <h2 class="ok-dl__card-title">{{ platformTitle(platform) }}</h2>
        </div>
        <p class="ok-dl__req">{{ requirement(platform) }}</p>
        <ul class="ok-dl__variants">
          <li
            v-for="variant in platform.variants"
            :id="variant.href.startsWith('#') ? variant.href.slice(1) : undefined"
            :key="variant.id"
          >
            <a
              class="ok-dl__variant"
              :class="{ 'is-recommended': variant.recommended && isDetected(platform) }"
              :href="resolveHref(variantHref(localePath, platform, variant))"
            >
              <span>{{ variantLabel(variant) }}</span>
              <span v-if="variant.recommended && isDetected(platform)" class="ok-dl__pill">
                {{ copy.yourOs }}
              </span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
