import { onMounted, onUnmounted, ref, type Ref } from 'vue'

function isBandInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const visibleTop = Math.min(rect.bottom, vh * 0.92)
  const visibleBottom = Math.max(rect.top, vh * 0.08)
  return visibleTop - visibleBottom > Math.min(48, rect.height * 0.12)
}

/**
 * Scroll-reveal for home bands. Adds `.is-in` once when the band enters view.
 * Reduced-motion: marks visible immediately (CSS skips transforms).
 */
export function useHomeReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null
  let onScroll: (() => void) | null = null

  onMounted(() => {
    const host = root.value
    if (!host) return

    const bands = Array.from(host.querySelectorAll<HTMLElement>('[data-ok-reveal]'))
    if (!bands.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      bands.forEach((el) => el.classList.add('is-in'))
      return
    }

    const reveal = (el: Element) => {
      el.classList.add('is-in')
      observer?.unobserve(el)
    }

    const revealVisible = () => {
      for (const el of bands) {
        if (el.classList.contains('is-in')) continue
        if (isBandInView(el)) reveal(el)
      }
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            reveal(entry.target)
          }
        }
      },
      {
        threshold: [0, 0.2, 0.45],
        rootMargin: '0px 0px -12% 0px',
      },
    )

    bands.forEach((el) => observer!.observe(el))
    revealVisible()

    onScroll = () => revealVisible()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
    if (onScroll) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      onScroll = null
    }
  })
}

export function useHomeRevealRoot() {
  const root = ref<HTMLElement | null>(null)
  useHomeReveal(root)
  return root
}
