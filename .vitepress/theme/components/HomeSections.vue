<script setup lang="ts">
export type HomeFeature = {
  title: string
  body: string
  href: string
  linkLabel: string
}

withDefaults(
  defineProps<{
    featuresTitle?: string
    features?: HomeFeature[]
    platformsTitle?: string
    platforms?: string[]
    howTitle?: string
    howSteps?: string[]
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
      },
      {
        title: 'Self-host or Nearby',
        body: 'Sync through your Docker API — or pair devices on LAN with QR, no server required.',
        href: '/guide/nearby',
        linkLabel: 'Nearby guide',
      },
      {
        title: 'Autofill & passkeys',
        body: 'System Autofill plus a browser extension with fill shortcut and WebAuthn.',
        href: '/guide/extension',
        linkLabel: 'Browser extension',
      },
      {
        title: 'Teams still zero-knowledge',
        body: 'Orgs and shares encrypt with keys the server cannot unwrap.',
        href: '/guide/sharing',
        linkLabel: 'Sharing & orgs',
      },
    ],
    platformsTitle: 'Runs where you do',
    platforms: () => [
      'Android',
      'iOS',
      'macOS',
      'Windows',
      'Linux',
      'Chrome / Firefox',
      'Docker server',
      'CLI',
    ],
    howTitle: 'How sync stays zero-knowledge',
    howSteps: () => [
      'Derive keys from email + master password with Argon2id',
      'Send only an auth hash to log in',
      'Encrypt names, entries, and attachments before upload',
      'Server stores opaque ciphertext — never the vault key',
    ],
    ctaTitle: 'Start on your own infrastructure',
    ctaBody: 'Download the app, point it at your server, or pair Nearby for LAN-only sync.',
    ctaPrimary: 'Download',
    ctaSecondary: 'Quick start',
    ctaSecurity: 'Read the threat model',
    downloadLink: '/guide/download',
    quickStartLink: '/guide/quick-start',
    securityLink: '/guide/security',
  },
)
</script>

<template>
  <div class="ok-home-body">
    <section class="ok-home-section" aria-labelledby="ok-features-title">
      <h2 id="ok-features-title" class="ok-home-section__title">{{ featuresTitle }}</h2>
      <ul class="ok-feature-list">
        <li v-for="(feature, i) in features" :key="i" class="ok-feature">
          <h3 class="ok-feature__title">{{ feature.title }}</h3>
          <p class="ok-feature__body">{{ feature.body }}</p>
          <a class="ok-feature__link" :href="feature.href">{{ feature.linkLabel }}</a>
        </li>
      </ul>
    </section>

    <section class="ok-home-section ok-home-section--platforms" aria-labelledby="ok-platforms-title">
      <h2 id="ok-platforms-title" class="ok-home-section__title">{{ platformsTitle }}</h2>
      <p class="ok-platform-row">
        <span v-for="(platform, i) in platforms" :key="i" class="ok-platform">{{ platform }}</span>
      </p>
    </section>

    <section class="ok-home-section" aria-labelledby="ok-how-title">
      <h2 id="ok-how-title" class="ok-home-section__title">{{ howTitle }}</h2>
      <ol class="ok-how-list">
        <li v-for="(step, i) in howSteps" :key="i" class="ok-how-step">
          <span class="ok-how-step__n" aria-hidden="true">{{ i + 1 }}</span>
          <span class="ok-how-step__text">{{ step }}</span>
        </li>
      </ol>
    </section>

    <section class="ok-home-cta" aria-labelledby="ok-cta-title">
      <h2 id="ok-cta-title" class="ok-home-cta__title">{{ ctaTitle }}</h2>
      <p class="ok-home-cta__body">{{ ctaBody }}</p>
      <div class="ok-home-cta__actions">
        <a class="ok-hero__cta ok-hero__cta--primary" :href="downloadLink">{{ ctaPrimary }}</a>
        <a class="ok-hero__cta ok-hero__cta--ghost" :href="quickStartLink">{{ ctaSecondary }}</a>
        <a class="ok-home-cta__text-link" :href="securityLink">{{ ctaSecurity }}</a>
      </div>
    </section>
  </div>
</template>
