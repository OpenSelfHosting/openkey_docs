<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import type { OsId } from '../downloads/catalog'
import appleAppStore from '../assets/stores/apple-app-store.svg'
import googlePlay from '../assets/stores/google-play.svg'
import microsoftStore from '../assets/stores/microsoft-store.svg'

/** OS download marks plus landing / docs chrome marks. */
export type PlatformMarkId = OsId | 'chrome' | 'firefox' | 'docker' | 'cli' | 'unknown'

const props = withDefaults(
  defineProps<{
    os: PlatformMarkId
    /**
     * Store variant id (`windows-store`, `android-play`, `ios-appstore`, …).
     * When it has artwork of its own the store mark wins over the OS mark, so a
     * "Download from Store" button is named by the store the visitor is sent to.
     * Falls back to the OS mark for a listing we have no artwork for.
     */
    store?: string
    /** Pixel height for raster marks (width follows the artwork's aspect ratio) */
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

/**
 * App-store marks, keyed by store variant id.
 *
 * These are the vendors' own full-colour artwork, so they render as <img> rather
 * than as a mask — the multitone App Store and Google Play marks have no single
 * colour to flatten to. `ratio` is the artwork's width/height, kept so the marks
 * are sized by height and never stretched.
 *
 * Imported rather than read from `public/`: nginx serves static assets with
 * `Cache-Control: immutable`, which is only safe for content-hashed URLs. Under
 * `public/` these filenames are stable, so replacing an icon left Cloudflare and
 * browsers serving the old artwork for the full max-age. Importing them lets Vite
 * give them fresh URLs, which closes that window.
 *
 * iOS and macOS share the App Store artwork, since both resolve to one listing.
 * A store we have no artwork for simply falls through to the OS mark.
 */
const storeMarkForId: Record<string, { src: string; ratio: number }> = {
  'windows-store': { src: microsoftStore, ratio: 1 },
  'android-play': { src: googlePlay, ratio: 28.99 / 31.99 },
  'ios-appstore': { src: appleAppStore, ratio: 1 },
  'macos-appstore': { src: appleAppStore, ratio: 1 },
}

const storeMark = computed(() => storeMarkForId[props.store ?? ''])

const FALLBACK_MASK =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'black\' d=\'M12 3.2a.9.9 0 0 1 .9.9v8.2l2.4-2.4a.9.9 0 1 1 1.3 1.3l-4 4a.9.9 0 0 1-1.3 0l-4-4a.9.9 0 1 1 1.3-1.3l2.4 2.4V4.1a.9.9 0 0 1 .9-.9ZM5.5 17.2c0-.5.4-.9.9-.9h11.2a.9.9 0 0 1 0 1.8H6.4a.9.9 0 0 1-.9-.9Z\'/%3E%3C/svg%3E")'

const rasterSrc = computed(() => {
  if (props.os === 'unknown') return ''
  // A store mark is always full-colour artwork, so it wins over any OS mark.
  const store = storeMark.value
  if (store) return withBase(store.src)
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
  if (storeMark.value) return 'ok-platform-icon--store'
  if (props.os === 'unknown') return 'ok-platform-icon--unknown'
  return `ok-platform-icon--${props.os}`
})

/** Rasters are sized by height, so non-square artwork keeps its aspect ratio. */
const rasterAspect = computed(() => {
  const store = storeMark.value
  if (store) return store.ratio
  // VS Code linux-logo.png is 200×240.
  if (props.os === 'linux') return 200 / 240
  return 1
})

const rasterStyle = computed(() => {
  const h = props.size
  const w = Math.round(h * rasterAspect.value)
  return { width: `${w}px`, height: `${h}px` }
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
