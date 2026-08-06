<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { inBrowser, useData, withBase } from 'vitepress'
import {
  artifactUrl,
  downloadGuidePath,
  findPlatform,
  findVariant,
  guideSectionHref,
  isLiveArtifact,
  type DownloadPlatform,
  type DownloadVariant,
  type OsId,
} from '../downloads/catalog'
import { downloadCopy } from '../downloads/copy'
import PlatformIcon from './PlatformIcon.vue'

const { lang } = useData()

const copy = computed(() => downloadCopy(lang.value))

const localePath = computed(() => {
  if (!lang.value || lang.value === 'en') return ''
  return `/${lang.value}`
})

function resolveHref(href: string) {
  if (/^https?:\/\//i.test(href)) return href
  return withBase(href)
}

const osParam = ref('')
const variantParam = ref('')
const started = ref(false)
const pending = ref(false)

function readQuery() {
  if (!inBrowser) return
  const q = new URLSearchParams(window.location.search)
  osParam.value = q.get('os') || ''
  variantParam.value = q.get('v') || ''
}

const platform = computed<DownloadPlatform | undefined>(() => findPlatform(osParam.value))

const variant = computed<DownloadVariant | undefined>(() => {
  if (!platform.value) return undefined
  return (
    findVariant(platform.value, variantParam.value) ||
    platform.value.variants.find((v) => v.recommended) ||
    platform.value.variants[0]
  )
})

const osId = computed<OsId | 'unknown'>(() => platform.value?.id || 'unknown')

const platformLabel = computed(() =>
  platform.value ? copy.value.platform[platform.value.id] : copy.value.unknownCta,
)

const buildLabel = computed(() => {
  if (!variant.value) return ''
  return copy.value.variant[variant.value.labelKey] || variant.value.id
})

const steps = computed(() => {
  if (!platform.value) return copy.value.installSteps.windows
  return copy.value.installSteps[platform.value.id]
})

const guideHref = computed(() => {
  if (!platform.value || !variant.value) {
    return resolveHref(downloadGuidePath(localePath.value))
  }
  return resolveHref(guideSectionHref(localePath.value, platform.value, variant.value))
})

const downloadPageHref = computed(() => resolveHref(downloadGuidePath(localePath.value)))

function triggerDownload() {
  if (!variant.value) {
    pending.value = true
    return
  }
  const url = artifactUrl(variant.value)
  if (!url) {
    pending.value = true
    started.value = false
    return
  }
  pending.value = false
  started.value = true
  if (variant.value.external || isLiveArtifact(variant.value)) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    window.location.assign(url)
  }
}

function retry() {
  if (!variant.value) {
    window.location.assign(downloadPageHref.value)
    return
  }
  const url = artifactUrl(variant.value)
  if (!url) {
    pending.value = true
    window.location.assign(guideHref.value)
    return
  }
  triggerDownload()
}

onMounted(() => {
  readQuery()
  triggerDownload()
})

watch(
  () => [osParam.value, variantParam.value],
  () => {
    /* query is fixed after mount; kept for HMR */
  },
)
</script>

<template>
  <div class="ok-thanks">
    <div class="ok-thanks__hero">
      <span class="ok-dl__mark-wrap ok-thanks__mark" aria-hidden="true">
        <PlatformIcon variant="mark" :os="osId" :size="96" />
      </span>
      <h1 class="ok-thanks__title">{{ copy.thanksTitle }}</h1>
      <p class="ok-thanks__lead">
        {{ copy.thanksLead(platformLabel, buildLabel || '—') }}
      </p>
      <p class="ok-thanks__status" :data-pending="pending ? '1' : '0'">
        {{ pending ? copy.thanksPending : copy.thanksStarted }}
      </p>
    </div>

    <div class="ok-thanks__actions">
      <button type="button" class="ok-hero__cta ok-hero__cta--primary" @click="retry">
        <PlatformIcon class="ok-dl__cta-icon" variant="inline" :os="osId" :size="18" />
        {{ copy.retryDownload }}
      </button>
      <a class="ok-hero__cta ok-hero__cta--ghost" :href="guideHref">
        {{ copy.openGuide }}
      </a>
      <a class="ok-home-cta__text-link" :href="downloadPageHref">
        {{ copy.otherBuilds }}
      </a>
    </div>

    <section class="ok-thanks__install" aria-labelledby="ok-thanks-install">
      <h2 id="ok-thanks-install" class="ok-thanks__install-title">
        {{ copy.installHeading }}
      </h2>
      <ol class="ok-thanks__steps">
        <li v-for="(step, i) in steps" :key="i">{{ step }}</li>
      </ol>
    </section>

    <p class="ok-thanks__foot">
      <a class="ok-dl__all" :href="downloadPageHref">{{ copy.backToDownload }}</a>
    </p>
  </div>
</template>
