<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import type { OsId } from '../downloads/catalog'

/** OS download marks plus landing / docs chrome marks. */
export type PlatformMarkId = OsId | 'chrome' | 'firefox' | 'docker' | 'cli' | 'unknown'

const props = withDefaults(
  defineProps<{
    os: PlatformMarkId
    /** Pixel size for width/height (raster marks keep aspect ratio) */
    size?: number
    /**
     * `mark` — large section logo
     * `inline` — small CTA glyph
     */
    variant?: 'mark' | 'inline'
  }>(),
  {
    size: 20,
    variant: 'inline',
  },
)

/** SVG masks (monochrome). Linux uses VS Code’s official Tux PNG instead. */
const maskFileForOs: Partial<Record<PlatformMarkId, string>> = {
  windows: 'windows.svg',
  macos: 'apple.svg',
  ios: 'ios.svg',
  android: 'android.svg',
  chrome: 'chrome.svg',
  firefox: 'firefox.svg',
  docker: 'docker.svg',
}

/** UI glyphs that live under /icons/ui (not platforms/). */
const uiMaskFileForOs: Partial<Record<PlatformMarkId, string>> = {
  cli: 'terminal.svg',
}

/** Full-color rasters — from VS Code download page assets. */
const rasterFileForOs: Partial<Record<PlatformMarkId, string>> = {
  linux: 'linux.png',
}

const FALLBACK_MASK =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'black\' d=\'M12 3.2a.9.9 0 0 1 .9.9v8.2l2.4-2.4a.9.9 0 1 1 1.3 1.3l-4 4a.9.9 0 0 1-1.3 0l-4-4a.9.9 0 1 1 1.3-1.3l2.4 2.4V4.1a.9.9 0 0 1 .9-.9ZM5.5 17.2c0-.5.4-.9.9-.9h11.2a.9.9 0 0 1 0 1.8H6.4a.9.9 0 0 1-.9-.9Z\'/%3E%3C/svg%3E")'

const rasterSrc = computed(() => {
  if (props.os === 'unknown') return ''
  const file = rasterFileForOs[props.os]
  return file ? withBase(`/icons/platforms/${file}`) : ''
})

const maskUrl = computed(() => {
  if (rasterSrc.value) return ''
  if (props.os === 'unknown') return FALLBACK_MASK
  const uiFile = uiMaskFileForOs[props.os]
  if (uiFile) return `url("${withBase(`/icons/ui/${uiFile}`)}")`
  const file = maskFileForOs[props.os]
  if (!file) return FALLBACK_MASK
  return `url("${withBase(`/icons/platforms/${file}`)}")`
})

const brandClass = computed(() => {
  if (props.os === 'unknown') return 'ok-platform-icon--unknown'
  return `ok-platform-icon--${props.os}`
})

/** VS Code linux-logo.png is 200×240 — keep aspect when sizing by height. */
const rasterStyle = computed(() => {
  if (props.os === 'linux') {
    const h = props.size
    const w = Math.round((h * 200) / 240)
    return { width: `${w}px`, height: `${h}px` }
  }
  return { width: `${props.size}px`, height: `${props.size}px` }
})
</script>

<template>
  <img
    v-if="rasterSrc"
    class="ok-platform-icon ok-platform-icon--raster"
    :class="[brandClass, `ok-platform-icon--${variant}`]"
    :src="rasterSrc"
    alt=""
    decoding="async"
    aria-hidden="true"
    :style="rasterStyle"
  />
  <span
    v-else
    class="ok-platform-icon"
    :class="[brandClass, `ok-platform-icon--${variant}`]"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      WebkitMaskImage: maskUrl,
      maskImage: maskUrl,
    }"
    aria-hidden="true"
  />
</template>
