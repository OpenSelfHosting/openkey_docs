import { computed, onMounted, reactive, readonly, ref, watch } from 'vue'

export type ThemeMode = 'auto' | 'light' | 'dark'
export type FontId =
  | 'default'
  | 'arabic'
  | 'developer'
  | 'technical'
  | 'standard'
  | 'figtree'
  | 'robotoFlex'
/** Matches `AppIconPalette` in openkey_app. */
export type PaletteId = 'forest' | 'ocean' | 'ember' | 'violet' | 'slate'

export type SitePrefs = {
  theme: ThemeMode
  font: FontId
  palette: PaletteId
  highContrast: boolean
}

export const THEME_OPTIONS: ThemeMode[] = ['auto', 'light', 'dark']

export const FONT_OPTIONS: { id: FontId; label: string; sample: string }[] = [
  { id: 'default', label: 'Default', sample: 'Aa' },
  { id: 'arabic', label: 'Arabic', sample: 'أب' },
  { id: 'developer', label: 'Developer', sample: '</>' },
  { id: 'technical', label: 'Technical', sample: '01' },
  { id: 'standard', label: 'Standard', sample: 'Aa' },
  { id: 'figtree', label: 'Figtree', sample: 'Aa' },
  { id: 'robotoFlex', label: 'Roboto Flex', sample: 'Aa' },
]

export const PALETTE_OPTIONS: {
  id: PaletteId
  label: string
  swatch: string
  swatchDark: string
}[] = [
  { id: 'forest', label: 'Forest', swatch: '#1B6B4A', swatchDark: '#5ECFB3' },
  { id: 'ocean', label: 'Ocean', swatch: '#2F6FED', swatchDark: '#6BB3F0' },
  { id: 'ember', label: 'Ember', swatch: '#C47A12', swatchDark: '#E6B35C' },
  { id: 'violet', label: 'Violet', swatch: '#7A5AF8', swatchDark: '#B5A4FF' },
  { id: 'slate', label: 'Slate', swatch: '#4B5C6B', swatchDark: '#A8BAC8' },
]

const STORAGE_KEY = 'openkey-site-prefs'
const VP_APPEARANCE_KEY = 'vitepress-theme-appearance'

const defaults: SitePrefs = {
  theme: 'light',
  font: 'default',
  palette: 'forest',
  highContrast: false,
}

function isTheme(v: unknown): v is ThemeMode {
  return v === 'auto' || v === 'light' || v === 'dark'
}

function isFont(v: unknown): v is FontId {
  return FONT_OPTIONS.some((f) => f.id === v)
}

function isPalette(v: unknown): v is PaletteId {
  return PALETTE_OPTIONS.some((p) => p.id === v)
}

/** Migrate older accent ids from the first prefs shape. */
function migratePalette(raw: Record<string, unknown>): PaletteId {
  if (isPalette(raw.palette)) return raw.palette
  const accent = raw.accent
  return (
    (
      {
        green: 'forest',
        blue: 'ocean',
        amber: 'ember',
        rose: 'ember',
        violet: 'violet',
        slate: 'slate',
        forest: 'forest',
        ocean: 'ocean',
        ember: 'ember',
      } as Record<string, PaletteId>
    )[String(accent)] ?? defaults.palette
  )
}

function readStored(): SitePrefs {
  if (typeof localStorage === 'undefined') return { ...defaults }
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Record<
      string,
      unknown
    >
    return {
      theme: isTheme(raw.theme) ? raw.theme : defaults.theme,
      font: isFont(raw.font) ? raw.font : defaults.font,
      palette: migratePalette(raw),
      highContrast: Boolean(raw.highContrast),
    }
  } catch {
    return { ...defaults }
  }
}

export function prefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function resolveDark(theme: ThemeMode, systemDark = prefersDark()): boolean {
  if (theme === 'dark') return true
  if (theme === 'light') return false
  return systemDark
}

/** Day/night icon follows the site theme. */
export function resolveIconNight(
  prefs: Pick<SitePrefs, 'theme'>,
  systemDark = prefersDark(),
): boolean {
  return resolveDark(prefs.theme, systemDark)
}

export function iconPath(
  palette: PaletteId,
  night: boolean,
  size: 'preview' | 'hero' = 'preview',
): string {
  const mode = night ? 'night' : 'day'
  if (size === 'hero') return `/icons/${palette}_${mode}@2x.png`
  return `/icons/${palette}_${mode}.png`
}

export function palettePreviewPath(palette: PaletteId): string {
  return `/icons/${palette}.png`
}

function setFavicon(href: string) {
  const links = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']")
  if (links.length === 0) {
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    link.href = href
    document.head.appendChild(link)
    return
  }
  links.forEach((link) => {
    link.href = href
  })
}

export function applySitePrefs(prefs: SitePrefs, systemDark = prefersDark()) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const dark = resolveDark(prefs.theme, systemDark)
  const night = resolveIconNight(prefs, systemDark)
  const icon = iconPath(prefs.palette, night)

  root.dataset.font = prefs.font
  root.dataset.accent = prefs.palette
  root.dataset.palette = prefs.palette
  root.dataset.contrast = prefs.highContrast ? 'high' : 'normal'
  root.dataset.icon = night ? 'night' : 'day'
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
  setFavicon(icon)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    localStorage.setItem(VP_APPEARANCE_KEY, prefs.theme === 'auto' ? 'auto' : prefs.theme)
  } catch {
    // ignore quota / private mode
  }
}

const state = reactive<SitePrefs>({ ...defaults })
const systemDarkRef = ref(false)
let started = false
let watching = false
let media: MediaQueryList | null = null

function onSystemChange() {
  systemDarkRef.value = prefersDark()
  applySitePrefs(state, systemDarkRef.value)
}

export function useSitePrefs() {
  if (!watching) {
    watch(
      state,
      (value) => {
        applySitePrefs(value, systemDarkRef.value)
      },
      { deep: true },
    )
    watching = true
  }

  onMounted(() => {
    if (!started) {
      systemDarkRef.value = prefersDark()
      Object.assign(state, readStored())
      applySitePrefs(state, systemDarkRef.value)
      media = window.matchMedia('(prefers-color-scheme: dark)')
      media.addEventListener('change', onSystemChange)
      started = true
    }
  })

  const night = computed(() => resolveIconNight(state, systemDarkRef.value))
  const brandIcon = computed(() => iconPath(state.palette, night.value))
  const brandIconHero = computed(() => iconPath(state.palette, night.value, 'hero'))
  const isDark = computed(() => resolveDark(state.theme, systemDarkRef.value))

  function setTheme(theme: ThemeMode) {
    state.theme = theme
  }

  function setFont(font: FontId) {
    state.font = font
  }

  function setPalette(palette: PaletteId) {
    state.palette = palette
  }

  function setHighContrast(value: boolean) {
    state.highContrast = value
  }

  function reset() {
    Object.assign(state, { ...defaults })
  }

  return {
    prefs: readonly(state),
    isDark,
    night,
    brandIcon,
    brandIconHero,
    setTheme,
    setFont,
    setPalette,
    setHighContrast,
    reset,
  }
}
