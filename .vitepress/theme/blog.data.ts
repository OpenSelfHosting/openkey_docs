import { createContentLoader } from 'vitepress'

export const BLOG_LOCALES = [
  'en',
  'ar',
  'zh',
  'es',
  'fr',
  'hi',
  'bn',
  'pt',
  'ru',
  'ur',
] as const

export type BlogLang = (typeof BLOG_LOCALES)[number]

export interface BlogPost {
  title: string
  url: string
  date: string
  description: string
  cover: string
  lang: BlogLang
}

declare const data: BlogPost[]
export { data }

function detectBlogLang(url: string): BlogLang {
  const match = url.match(/^\/([a-z]{2})\/blog\//)
  if (match && (BLOG_LOCALES as readonly string[]).includes(match[1])) {
    return match[1] as BlogLang
  }
  return 'en'
}

export default createContentLoader('**/blog/*.md', {
  transform(rawData): BlogPost[] {
    return rawData
      .filter((page) => {
        const path = page.url.replace(/\/$/, '')
        return !path.endsWith('/blog')
      })
      .map((page) => {
        const lang = detectBlogLang(page.url)
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
          cover: String(fm.cover ?? '/blog/covers/welcome-to-openkey.png'),
          lang,
        }
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})
