<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, useRouter, withBase, inBrowser } from 'vitepress'
import { watch } from 'vue'
import AppearanceMenu from './components/AppearanceMenu.vue'
import BrandIcon from './components/BrandIcon.vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()
const router = useRouter()

/** Locales with their own translated blog posts. */
const translatedBlogLocales = new Set(['en', 'ar'])

watch(
  () => [page.value.isNotFound, router.route.path] as const,
  ([isNotFound, path]) => {
    if (!inBrowser || !isNotFound) return
    const match = path.match(/^\/([a-z]{2})\/blog(\/.*)?\/?$/)
    if (!match) return
    const [, locale, rest = '/'] = match
    if (translatedBlogLocales.has(locale)) return
    const target = `/blog${rest === '/' ? '/' : rest}`
    if (target !== path) router.go(target)
  },
  { immediate: true },
)
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <BrandIcon size="nav" class="ok-nav-brand" />
    </template>
    <template #nav-bar-content-after>
      <AppearanceMenu />
    </template>
    <template #doc-before>
      <div v-if="frontmatter.cover" class="ok-post-cover">
        <img
          class="ok-post-cover__img"
          :src="withBase(String(frontmatter.cover))"
          :alt="String(frontmatter.title ?? '')"
          width="1200"
          height="630"
        />
      </div>
    </template>
  </Layout>
</template>
