<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import {
  DOWNLOAD_PLATFORMS,
  downloadGuidePath,
  isAvailable,
  isPrimaryVariant,
  variantHref,
  type DownloadPlatform,
  type DownloadVariant,
} from '../downloads/catalog'
import { downloadCopy } from '../downloads/copy'
import { useDetectedPlatform } from '../composables/useDetectedPlatform'
import PlatformIcon from './PlatformIcon.vue'
import StoreBadges from './StoreBadges.vue'

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

const { detected, os: detectedOs, ready } = useDetectedPlatform()

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

const primaryHref = computed(() => {
  const { platform, variant } = detected.value
  if (!platform || !variant) return allPlatformsHref.value
  return resolveHref(variantHref(localePath.value, platform, variant))
})

/** Name of the build the primary button actually delivers, so the visitor is
 *  never surprised by a different package than the one they expected. */
const primaryBuild = computed(() => {
  const variant = detected.value.variant
  if (!variant) return ''
  return copy.value.variant[variant.labelKey] || variant.labelKey
})

/**
 * The primary button is the store listing for the detected system whenever we
 * have published one. Only a platform with no listing of its own (macOS and
 * Linux today) falls back to its direct build, which is why a .exe or .dmg
 * button only ever appears without a store badge above it.
 */
const primaryStore = computed(() => detected.value.variant?.store === true)

const primaryStoreEyebrow = computed(() => {
  const variant = detected.value.variant
  if (!variant) return ''
  return copy.value.storeEyebrow[variant.id] || ''
})

const primaryStoreName = computed(() => primaryBuild.value)

/**
 * Store mark for the primary button, and only then. A macOS or Linux visitor has
 * no listing, so their button hands over a .dmg or .deb — passing a store id
 * unconditionally would put a store bag on it.
 *
 * Taken from the variant the button itself serves rather than from `store`, which
 * is null for a listing we have not published yet — and on iOS that listing is
 * still the primary build, badge and all.
 */
const primaryMarkId = computed(() =>
  primaryStore.value ? (detected.value.variant?.id ?? '') : '',
)

const primaryLabel = computed(() => {
  if (!detected.value.platform) return copy.value.unknownCta
  return copy.value.downloadFor(platformLabel.value)
})

const secondaryLabel = computed(
  () => props.ctaSecondary || copy.value.getStarted,
)

/**
 * Direct build for the detected OS, offered in the second slot once the store
 * listing has taken the primary button: the sideload / installer escape hatch
 * for anyone who prefers the file over the store.
 *
 * Empty when the store is not the primary channel (macOS and Linux, which have
 * no listing) or when the platform ships no direct build of ours (iOS) — the
 * secondary slot then keeps the "Get Started" link to the quick-start guide.
 */
const directHref = computed(() => {
  const { platform, variant, direct } = detected.value
  if (!platform || !variant?.store || !direct) return ''
  return resolveHref(variantHref(localePath.value, platform, direct))
})

const directName = computed(() => {
  const direct = detected.value.direct
  if (!direct) return ''
  return copy.value.variant[direct.labelKey] || direct.labelKey
})

/** Alternative builds for the detected platform, minus whatever the primary
 *  button already hands over — so a Windows visitor picks the .exe from here
 *  instead of being sent to the listing twice. A platform with nothing else
 *  (iOS) keeps its single build listed rather than showing an empty picker. */
const otherVariants = computed(() => {
  const platform = detected.value.platform
  if (!platform) return [] as { variant: DownloadVariant; href: string; label: string }[]
  const variants =
    platform.variants.length > 1
      ? platform.variants.filter((v) => v.id !== detected.value.variant?.id)
      : platform.variants
  return variants.map((variant) => ({
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

/**
 * The row the primary CTA hands over. Derived from the resolved variant rather
 * than `recommended`, so the "your OS" pill always sits on the build the button
 * actually points at.
 */
function isPrimaryRow(platform: DownloadPlatform, variant: DownloadVariant) {
  return (
    isDetected(platform) &&
    isPrimaryVariant(platform, variant, detected.value.arch)
  )
}
</script>

<template>
  <!-- Hero: compact detected CTA -->
  <div v-if="layout === 'hero'" class="ok-dl ok-dl--hero">
    <p class="ok-dl__lead" :data-ready="ready ? '1' : '0'">
      {{ props.lead || copy.detectedLead }}
    </p>

    <div class="ok-dl__actions">
      <a
        class="ok-hero__cta ok-hero__cta--primary"
        :class="{ 'ok-hero__cta--store': primaryStore }"
        :href="primaryHref"
      >
        <PlatformIcon
          class="ok-dl__cta-icon"
          variant="inline"
          :os="detectedOs"
          :store="primaryMarkId"
          :size="primaryStore ? 24 : 18"
        />
        <template v-if="primaryStore">
          <span class="ok-dl__cta-store">
            <span class="ok-dl__cta-store-eyebrow">{{ primaryStoreEyebrow }}</span>
            <span class="ok-dl__cta-store-name">{{ primaryStoreName }}</span>
          </span>
        </template>
        <template v-else>
          {{ primaryLabel }}
          <span v-if="primaryBuild" class="ok-dl__cta-build">{{ primaryBuild }}</span>
        </template>
      </a>
      <a
        v-if="directHref"
        class="ok-hero__cta ok-hero__cta--ghost ok-dl__cta--direct"
        :href="directHref"
      >
        <PlatformIcon
          class="ok-dl__cta-icon"
          variant="inline"
          :os="detectedOs"
          :size="18"
        />
        {{ copy.directCta }}
        <span v-if="directName" class="ok-dl__cta-build">{{ directName }}</span>
      </a>
      <a
        v-else
        class="ok-hero__cta ok-hero__cta--ghost"
        :href="resolveHref(quickStartLink)"
      >
        {{ secondaryLabel }}
      </a>
    </div>

    <StoreBadges />
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
        <a
          class="ok-hero__cta ok-hero__cta--primary"
          :class="{ 'ok-hero__cta--store': primaryStore }"
          :href="primaryHref"
        >
          <PlatformIcon
            class="ok-dl__cta-icon"
            variant="inline"
            :os="detected.platform.id"
            :store="primaryMarkId"
            :size="primaryStore ? 24 : 18"
          />
          <template v-if="primaryStore">
            <span class="ok-dl__cta-store">
              <span class="ok-dl__cta-store-eyebrow">{{ primaryStoreEyebrow }}</span>
              <span class="ok-dl__cta-store-name">{{ primaryStoreName }}</span>
            </span>
          </template>
          <template v-else>
            {{ primaryLabel }}
            <span v-if="primaryBuild" class="ok-dl__cta-build">{{ primaryBuild }}</span>
          </template>
        </a>
        <a
          v-if="directHref"
          class="ok-hero__cta ok-hero__cta--ghost ok-dl__cta--direct"
          :href="directHref"
        >
          <PlatformIcon
            class="ok-dl__cta-icon"
            variant="inline"
            :os="detected.platform.id"
            :size="18"
          />
          {{ copy.directCta }}
          <span v-if="directName" class="ok-dl__cta-build">{{ directName }}</span>
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
              {{ item.label }}{{ isAvailable(item.variant) ? '' : ` — ${copy.notPublishedYet}` }}
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
            :id="variant.id"
            :key="variant.id"
          >
            <a
              class="ok-dl__variant"
              :class="{
                'is-recommended': isPrimaryRow(platform, variant),
                'is-unavailable': !isAvailable(variant),
              }"
              :href="resolveHref(variantHref(localePath, platform, variant))"
            >
              <span>{{ variantLabel(variant) }}</span>
              <span v-if="!isAvailable(variant)" class="ok-dl__pill ok-dl__pill--muted">
                {{ copy.notPublishedYet }}
              </span>
              <span v-else-if="isPrimaryRow(platform, variant)" class="ok-dl__pill">
                {{ copy.yourOs }}
              </span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
