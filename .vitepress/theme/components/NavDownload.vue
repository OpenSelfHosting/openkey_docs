<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { downloadGuidePath } from '../downloads/catalog'
import { downloadCopy } from '../downloads/copy'

const { lang } = useData()

const copy = computed(() => downloadCopy(lang.value))

const href = computed(() => {
  const localePath = !lang.value || lang.value === 'en' ? '' : `/${lang.value}`
  return withBase(downloadGuidePath(localePath))
})
</script>

<template>
  <a class="ok-nav-download" :href="href">
    {{ copy.unknownCta }}
  </a>
</template>
