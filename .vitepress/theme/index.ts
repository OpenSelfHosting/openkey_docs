import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import HomeHero from './components/HomeHero.vue'
import HomeSections from './components/HomeSections.vue'
import BlogList from './components/BlogList.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeHero', HomeHero)
    app.component('HomeSections', HomeSections)
    app.component('BlogList', BlogList)
  },
} satisfies Theme
