<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import AppearanceMenu from './components/AppearanceMenu.vue'
import BrandIcon from './components/BrandIcon.vue'
import NavDownload from './components/NavDownload.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <BrandIcon size="nav" class="ok-nav-brand" />
    </template>
    <template #nav-bar-content-after>
      <NavDownload />
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
