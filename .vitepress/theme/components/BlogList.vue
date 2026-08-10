<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as posts } from '../blog.data'
import type { BlogLang } from '../blog.data'

const { lang } = useData()

const localePosts = computed(() => {
  const want = (lang.value || 'en') as BlogLang
  return posts.filter((post) => post.lang === want)
})

function formatDate(value: string, locale: string) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  const dateLocale = locale === 'en' ? 'en' : locale
  return new Intl.DateTimeFormat(dateLocale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
</script>

<template>
  <div class="ok-blog-list" role="list">
    <a
      v-for="post in localePosts"
      :key="post.url"
      class="ok-blog-card"
      role="listitem"
      :href="withBase(post.url)"
    >
      <div class="ok-blog-card__media">
        <img
          class="ok-blog-card__cover"
          :src="withBase(post.cover)"
          :alt="post.title"
          width="1200"
          height="630"
          loading="lazy"
        />
      </div>
      <div class="ok-blog-card__body">
        <time v-if="post.date" class="ok-blog-card__date" :datetime="post.date">
          {{ formatDate(post.date, lang) }}
        </time>
        <h2 class="ok-blog-card__title">{{ post.title }}</h2>
        <p v-if="post.description" class="ok-blog-card__excerpt">
          {{ post.description }}
        </p>
      </div>
    </a>
  </div>
</template>
