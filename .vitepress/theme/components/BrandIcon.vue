<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { useSitePrefs } from '../composables/useSitePrefs'

const props = withDefaults(
  defineProps<{
    size?: 'nav' | 'hero' | 'preview' | 'tile'
    alt?: string
  }>(),
  {
    size: 'nav',
    alt: 'OpenKey',
  },
)

const { brandIcon, brandIconHero } = useSitePrefs()

const src = computed(() =>
  withBase(props.size === 'hero' ? brandIconHero.value : brandIcon.value),
)

const dims = computed(() => {
  switch (props.size) {
    case 'hero':
      return { width: 300, height: 300 }
    case 'preview':
      return { width: 96, height: 96 }
    case 'tile':
      return { width: 56, height: 56 }
    default:
      return { width: 30, height: 30 }
  }
})
</script>

<template>
  <img
    class="ok-brand-icon"
    :class="`ok-brand-icon--${props.size}`"
    :src="src"
    :width="dims.width"
    :height="dims.height"
    :alt="props.alt"
    decoding="async"
  />
</template>
