import { computed, onMounted, readonly, ref, watch } from 'vue'
import { useData } from 'vitepress'
import type { OsId } from '../downloads/catalog'
import {
  detectPlatform,
  type DetectedPlatform,
} from '../downloads/detectPlatform'

/**
 * Detected platform shared by every download CTA on a page, so the hero picker
 * and the closing CTA card always agree on the OS icon and the build they link
 * to.
 *
 * SSR has no `navigator`, so the server must render the same `unknown` state
 * the client's first paint sees. Seeding the ref with a real detection instead
 * would make the hydrated vnode differ from the SSR markup, and Vue never
 * reconciles ordinary attributes during hydration — the stale `unknown` class
 * would then survive, because the follow-up render produces an identical class
 * and `patchElement` skips equal props.
 */
const UNKNOWN: DetectedPlatform = {
  os: 'unknown',
  arch: 'x64',
  platform: null,
  variant: null,
}

const detected = ref<DetectedPlatform>(UNKNOWN)
const ready = ref(false)
let started = false

export function useDetectedPlatform() {
  const { lang } = useData()

  onMounted(async () => {
    if (started) return
    started = true
    detected.value = await detectPlatform()
    ready.value = true
  })

  watch(lang, async () => {
    detected.value = await detectPlatform()
  })

  /** Mark id for icons — `unknown` until detection resolves. */
  const os = computed<OsId | 'unknown'>(
    () => detected.value.platform?.id || detected.value.os,
  )

  return {
    detected: readonly(detected),
    os,
    ready: readonly(ready),
  }
}
