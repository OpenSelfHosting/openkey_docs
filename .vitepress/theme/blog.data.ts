import { createContentLoader } from 'vitepress'

export interface BlogPost {
  title: string
  url: string
  date: string
  description: string
  cover: string
  lang: 'en' | 'ar'
}

declare const data: BlogPost[]
export { data }

export default createContentLoader('**/blog/*.md', {
  transform(rawData): BlogPost[] {
    return rawData
      .filter((page) => {
        const path = page.url.replace(/\/$/, '')
        return !path.endsWith('/blog')
      })
      .map((page) => {
        const lang = page.url.startsWith('/ar/') ? 'ar' : 'en'
        const fm = page.frontmatter
        const rawDate = fm.date
        const date =
          rawDate instanceof Date
            ? rawDate.toISOString().slice(0, 10)
            : String(rawDate ?? '').slice(0, 10)
        return {
          title: String(fm.title ?? 'Untitled'),
          url: page.url,
          date,
          description: String(fm.description ?? ''),
          cover: String(fm.cover ?? '/blog/covers/welcome-to-openkey.svg'),
          lang: lang as 'en' | 'ar',
        }
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})
