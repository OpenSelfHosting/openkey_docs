<script setup lang="ts">
import { computed } from 'vue'
import type { PlatformMarkId } from './PlatformIcon.vue'
import type { UiIconName } from './UiIcon.vue'
import { useHomeRevealRoot } from '../composables/useHomeReveal'
import HomeZkIllustration from './HomeZkIllustration.vue'
import PlatformIcon from './PlatformIcon.vue'
import UiIcon from './UiIcon.vue'

export type HomeFeature = {
  title: string
  body: string
  href: string
  linkLabel: string
  /** Lucide glyph; falls back by feature index when omitted */
  icon?: UiIconName
}

export type HomePlatform = {
  id: PlatformMarkId | 'browsers'
  label: string
}

const FEATURE_ICONS: UiIconName[] = [
  'shield',
  'radio',
  'fingerprint',
  'users-round',
]

const PLATFORM_IDS: Array<PlatformMarkId | 'browsers'> = [
  'android',
  'ios',
  'macos',
  'windows',
  'linux',
  'browsers',
  'docker',
  'cli',
]

const props = withDefaults(
  defineProps<{
    featuresTitle?: string
    features?: HomeFeature[]
    platformsTitle?: string
    /** Prefer `{ id, label }`; plain strings map to default platform order */
    platforms?: Array<string | HomePlatform>
    howTitle?: string
    howSteps?: string[]
    diagramLabel?: string
    diagramDevice?: string
    diagramEncrypt?: string
    diagramOnDevice?: string
    diagramCiphertext?: string
    diagramStore?: string
    diagramOpaque?: string
    diagramServer?: string
    diagramNearby?: string
    ctaTitle?: string
    ctaBody?: string
    ctaPrimary?: string
    ctaSecondary?: string
    ctaSecurity?: string
    downloadLink?: string
    quickStartLink?: string
    securityLink?: string
  }>(),
  {
    featuresTitle: 'Why OpenKey',
    features: () => [
      {
        title: 'Ciphertext only',
        body: 'Argon2id on device. The server never sees your master password or vault key.',
        href: '/guide/security',
        linkLabel: 'Security model',
        icon: 'shield',
      },
      {
        title: 'Self-host or Nearby',
        body: 'Sync through your Docker API — or pair devices on LAN with QR, no server required.',
        href: '/guide/nearby',
        linkLabel: 'Nearby guide',
        icon: 'radio',
      },
      {
        title: 'Autofill & passkeys',
        body: 'System Autofill plus a browser extension with fill shortcut and WebAuthn.',
        href: '/guide/extension',
        linkLabel: 'Browser extension',
        icon: 'fingerprint',
      },
      {
        title: 'Teams still zero-knowledge',
        body: 'Orgs and shares encrypt with keys the server cannot unwrap.',
        href: '/guide/sharing',
        linkLabel: 'Sharing & orgs',
        icon: 'users-round',
      },
    ],
    platformsTitle: 'Runs where you do',
    platforms: () => [
      { id: 'android', label: 'Android' },
      { id: 'ios', label: 'iOS' },
      { id: 'macos', label: 'macOS' },
      { id: 'windows', label: 'Windows' },
      { id: 'linux', label: 'Linux' },
      { id: 'browsers', label: 'Chrome / Firefox' },
      { id: 'docker', label: 'Docker server' },
      { id: 'cli', label: 'CLI' },
    ],
    howTitle: 'How sync stays zero-knowledge',
    howSteps: () => [
      'Derive keys from email + master password with Argon2id',
      'Send only an auth hash to log in',
      'Encrypt names, entries, and attachments before upload',
      'Server stores opaque ciphertext — never the vault key',
    ],
    diagramLabel:
      'Zero-knowledge sync: devices hold keys; the server only stores opaque ciphertext',
    diagramDevice: 'Device',
    diagramEncrypt: 'Encrypt',
    diagramOnDevice: 'on device',
    diagramCiphertext: 'Ciphertext',
    diagramStore: 'Store',
    diagramOpaque: 'opaque',
    diagramServer: 'Server',
    diagramNearby: 'Or sync Nearby on LAN — no server',
    ctaTitle: 'Start on your own infrastructure',
    ctaBody: 'Download the app, point it at your server, or pair Nearby for LAN-only sync.',
    ctaPrimary: 'Download',
    ctaSecondary: 'Get started',
    ctaSecurity: 'Read the threat model',
    downloadLink: '/guide/download',
    quickStartLink: '/guide/quick-start',
    securityLink: '/guide/security',
  },
)

const root = useHomeRevealRoot()

const resolvedFeatures = computed(() =>
  (props.features ?? []).map((feature, i) => ({
    ...feature,
    icon: feature.icon ?? FEATURE_ICONS[i] ?? 'shield',
  })),
)

const resolvedPlatforms = computed<HomePlatform[]>(() =>
  (props.platforms ?? []).map((platform, i) => {
    if (typeof platform === 'string') {
      return { id: PLATFORM_IDS[i] ?? 'cli', label: platform }
    }
    return platform
  }),
)
</script>

<template>
  <div ref="root" class="ok-home-body">
    <section
      class="ok-home-band ok-home-band--features"
      data-ok-reveal
      aria-labelledby="ok-features-title"
    >
      <div class="ok-home-band__inner">
        <h2 id="ok-features-title" class="ok-home-section__title">{{ featuresTitle }}</h2>
        <ul class="ok-feature-list">
          <li
            v-for="(feature, i) in resolvedFeatures"
            :key="i"
            class="ok-feature"
            :style="{ '--ok-i': i }"
          >
            <div class="ok-feature__icon-wrap" aria-hidden="true">
              <UiIcon :name="feature.icon" :size="22" />
            </div>
            <div class="ok-feature__copy">
              <h3 class="ok-feature__title">{{ feature.title }}</h3>
              <p class="ok-feature__body">{{ feature.body }}</p>
              <a class="ok-feature__link" :href="feature.href">{{ feature.linkLabel }}</a>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section
      class="ok-home-band ok-home-band--platforms"
      data-ok-reveal
      aria-labelledby="ok-platforms-title"
    >
      <div class="ok-home-band__inner">
        <h2 id="ok-platforms-title" class="ok-home-section__title">{{ platformsTitle }}</h2>
        <ul class="ok-platform-row">
          <li
            v-for="(platform, i) in resolvedPlatforms"
            :key="i"
            class="ok-platform"
            :style="{ '--ok-i': i }"
          >
            <span class="ok-platform__marks" aria-hidden="true">
              <template v-if="platform.id === 'browsers'">
                <PlatformIcon os="chrome" :size="18" />
                <PlatformIcon os="firefox" :size="18" />
              </template>
              <PlatformIcon v-else :os="platform.id" :size="18" />
            </span>
            <span class="ok-platform__label">{{ platform.label }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section
      class="ok-home-band ok-home-band--how"
      data-ok-reveal
      aria-labelledby="ok-how-title"
    >
      <div class="ok-home-band__inner">
        <h2 id="ok-how-title" class="ok-home-section__title">{{ howTitle }}</h2>
        <div class="ok-how-layout">
          <HomeZkIllustration
            class="ok-how-illus"
            :label="diagramLabel"
            :device-label="diagramDevice"
            :encrypt-label="diagramEncrypt"
            :on-device-label="diagramOnDevice"
            :ciphertext-label="diagramCiphertext"
            :store-label="diagramStore"
            :opaque-label="diagramOpaque"
            :server-label="diagramServer"
            :nearby-hint="diagramNearby"
          />
          <ol class="ok-how-list">
            <li
              v-for="(step, i) in howSteps"
              :key="i"
              class="ok-how-step"
              :style="{ '--ok-i': i }"
            >
              <span class="ok-how-step__n" aria-hidden="true">{{ i + 1 }}</span>
              <span class="ok-how-step__text">{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section
      class="ok-home-band ok-home-band--cta"
      data-ok-reveal
      aria-labelledby="ok-cta-title"
    >
      <div class="ok-home-band__inner ok-home-cta">
        <h2 id="ok-cta-title" class="ok-home-cta__title">{{ ctaTitle }}</h2>
        <p class="ok-home-cta__body">{{ ctaBody }}</p>
        <div class="ok-home-cta__actions">
          <a class="ok-hero__cta ok-hero__cta--primary" :href="downloadLink">{{ ctaPrimary }}</a>
          <a class="ok-hero__cta ok-hero__cta--ghost" :href="quickStartLink">{{ ctaSecondary }}</a>
          <a class="ok-home-cta__text-link" :href="securityLink">{{ ctaSecurity }}</a>
        </div>
      </div>
    </section>
  </div>
</template>
