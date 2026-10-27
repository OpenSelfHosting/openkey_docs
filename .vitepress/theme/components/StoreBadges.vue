<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import {
  DOWNLOAD_PLATFORMS,
  artifactUrl,
  isAvailable,
  type OsId,
} from '../downloads/catalog'
import { downloadCopy } from '../downloads/copy'
import { useDetectedPlatform } from '../composables/useDetectedPlatform'
import PlatformIcon from './PlatformIcon.vue'

/**
 * App stores we are listed in, as a quieter row under the download buttons.
 *
 * Read from the catalog rather than hard-coded, so publishing a listing needs no
 * change here — the badge appears the moment `STORE_URLS` carries its URL. The
 * row is server-rendered, which means a macOS or Linux visitor, a crawler, or
 * anyone without JS still gets the store links instead of a dead end.
 *
 * The detected OS's own listing drops out once detection resolves, because that
 * one is already the button above. Both badges render server-side, so nothing
 * shifts for visitors we cannot detect.
 */
const { lang } = useData()

const copy = computed(() => downloadCopy(lang.value))
const { detected } = useDetectedPlatform()

function resolveHref(href: string) {
  if (/^https?:\/\//i.test(href)) return href
  return withBase(href)
}

type StoreEntry = {
  id: string
  os: OsId
  href: string
  eyebrow: string
  name: string
}

const stores = computed<StoreEntry[]>(() => {
  const detectedStore = detected.value.store?.id
  return DOWNLOAD_PLATFORMS.flatMap((platform) =>
    platform.variants
      .filter((variant) => variant.store && isAvailable(variant))
      .filter((variant) => variant.id !== detectedStore)
      .map((variant) => ({
        id: variant.id,
        os: platform.id,
        href: resolveHref(artifactUrl(variant) || variant.href),
        eyebrow: copy.value.storeEyebrow[variant.id] || '',
        name: copy.value.variant[variant.labelKey] || variant.labelKey,
      })),
  )
})
</script>

<template>
  <div v-if="stores.length > 0" class="ok-store-badges">
    <p class="ok-store-badges__caption">{{ copy.storesCaption }}</p>
    <div class="ok-store-badges__row">
      <a
        v-for="store in stores"
        :key="store.id"
        class="ok-store-badge"
        :href="store.href"
      >
        <PlatformIcon
          class="ok-store-badge__icon"
          variant="inline"
          :os="store.os"
          :store="store.id"
          :size="20"
        />
        <span class="ok-store-badge__text">
          <span class="ok-store-badge__eyebrow">{{ store.eyebrow }}</span>
          <span class="ok-store-badge__name">{{ store.name }}</span>
        </span>
      </a>
    </div>
  </div>
</template>