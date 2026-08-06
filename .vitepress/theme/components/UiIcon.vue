<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

export type UiIconName =
  | 'shield'
  | 'radio'
  | 'fingerprint'
  | 'users-round'
  | 'key-round'
  | 'terminal'

const props = withDefaults(
  defineProps<{
    name: UiIconName
    size?: number
  }>(),
  { size: 22 },
)

const maskUrl = computed(
  () => `url("${withBase(`/icons/ui/${props.name}.svg`)}")`,
)
</script>

<template>
  <span
    class="ok-ui-icon"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      WebkitMaskImage: maskUrl,
      maskImage: maskUrl,
    }"
    aria-hidden="true"
  />
</template>
