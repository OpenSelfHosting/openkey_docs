<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    deviceLabel?: string
    encryptLabel?: string
    onDeviceLabel?: string
    ciphertextLabel?: string
    storeLabel?: string
    opaqueLabel?: string
    serverLabel?: string
    nearbyHint?: string
  }>(),
  {
    label:
      'Zero-knowledge sync: devices hold keys; the server only stores opaque ciphertext',
    deviceLabel: 'Device',
    encryptLabel: 'Encrypt',
    onDeviceLabel: 'on device',
    ciphertextLabel: 'Ciphertext',
    storeLabel: 'Store',
    opaqueLabel: 'opaque',
    serverLabel: 'Server',
    nearbyHint: 'Or sync Nearby on LAN — no server',
  },
)
</script>

<template>
  <figure class="ok-home-illus">
    <svg
      class="ok-home-illus__svg"
      viewBox="0 0 720 260"
      role="img"
      :aria-label="label"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{{ label }}</title>

      <rect
        class="ok-home-illus__frame"
        x="1"
        y="1"
        width="718"
        height="258"
        rx="18"
        fill="none"
      />

      <g transform="translate(48 48)">
        <rect class="ok-home-illus__panel" width="150" height="164" rx="18" />
        <rect class="ok-home-illus__screen" x="16" y="22" width="118" height="98" rx="10" />
        <path
          class="ok-home-illus__accent-stroke"
          d="M67 58v-10a13 13 0 0 1 26 0v10"
          fill="none"
          stroke-width="4"
          stroke-linecap="round"
        />
        <rect class="ok-home-illus__accent" x="58" y="58" width="44" height="36" rx="8" />
        <circle class="ok-home-illus__dot" cx="75" cy="142" r="6" />
        <text class="ok-home-illus__caption" x="75" y="168" text-anchor="middle">{{ deviceLabel }}</text>
      </g>

      <g transform="translate(230 78)">
        <path
          class="ok-home-illus__flow"
          d="M0 42 H78"
          fill="none"
          stroke-width="2.5"
          stroke-linecap="round"
          marker-end="url(#ok-home-arrow)"
        />
        <text class="ok-home-illus__label" x="39" y="28" text-anchor="middle">{{ encryptLabel }}</text>
        <text class="ok-home-illus__label ok-home-illus__label--soft" x="39" y="72" text-anchor="middle">
          {{ onDeviceLabel }}
        </text>
      </g>

      <g transform="translate(330 70)">
        <rect class="ok-home-illus__packet" width="120" height="100" rx="14" />
        <text class="ok-home-illus__mono" x="60" y="42" text-anchor="middle">••••••••</text>
        <text class="ok-home-illus__mono" x="60" y="62" text-anchor="middle">a8f3…c91</text>
        <text class="ok-home-illus__caption" x="60" y="88" text-anchor="middle">{{ ciphertextLabel }}</text>
      </g>

      <g transform="translate(472 78)">
        <path
          class="ok-home-illus__flow"
          d="M0 42 H70"
          fill="none"
          stroke-width="2.5"
          stroke-linecap="round"
          marker-end="url(#ok-home-arrow)"
        />
        <text class="ok-home-illus__label" x="35" y="28" text-anchor="middle">{{ storeLabel }}</text>
        <text class="ok-home-illus__label ok-home-illus__label--soft" x="35" y="72" text-anchor="middle">
          {{ opaqueLabel }}
        </text>
      </g>

      <g transform="translate(560 52)">
        <rect class="ok-home-illus__panel ok-home-illus__panel--server" width="116" height="156" rx="16" />
        <rect class="ok-home-illus__server-slot" x="18" y="28" width="80" height="14" rx="4" />
        <rect class="ok-home-illus__server-slot" x="18" y="54" width="80" height="14" rx="4" />
        <rect class="ok-home-illus__server-slot" x="18" y="80" width="80" height="14" rx="4" />
        <circle class="ok-home-illus__accent" cx="58" cy="122" r="8" />
        <text class="ok-home-illus__caption" x="58" y="148" text-anchor="middle">{{ serverLabel }}</text>
      </g>

      <g transform="translate(48 220)">
        <circle class="ok-home-illus__accent" cx="10" cy="8" r="5" />
        <circle
          class="ok-home-illus__ring"
          cx="10"
          cy="8"
          r="12"
          fill="none"
          stroke-width="1.5"
        />
        <text class="ok-home-illus__label ok-home-illus__label--soft" x="30" y="12">{{ nearbyHint }}</text>
      </g>

      <defs>
        <marker
          id="ok-home-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path class="ok-home-illus__arrow-head" d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
    </svg>
  </figure>
</template>
