<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import BrandIcon from './BrandIcon.vue'
import {
  FONT_OPTIONS,
  PALETTE_OPTIONS,
  THEME_OPTIONS,
  iconPath,
  resolveIconNight,
  useSitePrefs,
} from '../composables/useSitePrefs'
import { appearanceCopy } from '../composables/appearanceCopy'

const { lang } = useData()
const open = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const {
  prefs,
  isDark,
  setTheme,
  setFont,
  setPalette,
  setHighContrast,
  reset,
} = useSitePrefs()

const copy = computed(() => appearanceCopy(lang.value))

function tileSrc(palette: PaletteId) {
  const night = resolveIconNight(prefs)
  return withBase(iconPath(palette, night))
}

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onDocClick(event: MouseEvent) {
  if (!open.value || !rootEl.value) return
  if (!rootEl.value.contains(event.target as Node)) close()
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div
    ref="rootEl"
    class="ok-appearance"
    :data-palette="prefs.palette"
    :data-dark="isDark ? '1' : '0'"
  >
    <button
      type="button"
      class="ok-appearance__trigger"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :aria-label="copy.title"
      :title="copy.title"
      @click.stop="toggle"
    >
      <svg
        class="ok-appearance__trigger-glyph"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9c.55 0 1-.45 1-1v-.5a1.75 1.75 0 0 1 1.75-1.75h1.6A3.65 3.65 0 0 0 21 13.1V12a9 9 0 0 0-9-9Zm-4.6 10.15a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Zm2.55-3.55a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Zm4.1 0a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Zm2.55 3.55a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Z"
        />
      </svg>
    </button>

    <div
      v-if="open"
      class="ok-appearance__panel"
      role="dialog"
      :aria-label="copy.title"
      @click.stop
    >
      <div class="ok-appearance__head">
        <div class="ok-appearance__head-main">
          <BrandIcon size="preview" />
          <div>
            <strong>{{ copy.title }}</strong>
            <p>{{ copy.subtitle }}</p>
          </div>
        </div>
        <button type="button" class="ok-appearance__reset" @click="reset">
          {{ copy.reset }}
        </button>
      </div>

      <section class="ok-appearance__section">
        <h3>{{ copy.palette }}</h3>
        <div class="ok-appearance__palettes">
          <button
            v-for="palette in PALETTE_OPTIONS"
            :key="palette.id"
            type="button"
            class="ok-appearance__palette"
            :class="{ 'is-active': prefs.palette === palette.id }"
            :title="copy.palettes[palette.id]"
            :aria-label="copy.palettes[palette.id]"
            @click="setPalette(palette.id)"
          >
            <img
              class="ok-appearance__palette-img"
              :src="tileSrc(palette.id)"
              width="56"
              height="56"
              :alt="copy.palettes[palette.id]"
            />
            <span>{{ copy.palettes[palette.id] }}</span>
          </button>
        </div>
      </section>

      <section class="ok-appearance__section">
        <h3>{{ copy.theme }}</h3>
        <div class="ok-appearance__themes">
          <button
            v-for="mode in THEME_OPTIONS"
            :key="mode"
            type="button"
            class="ok-appearance__theme"
            :class="{ 'is-active': prefs.theme === mode }"
            @click="setTheme(mode)"
          >
            <span class="ok-appearance__theme-title">{{ copy.themes[mode].title }}</span>
            <span class="ok-appearance__theme-hint">{{ copy.themes[mode].hint }}</span>
          </button>
        </div>
      </section>

      <section class="ok-appearance__section">
        <h3>{{ copy.font }}</h3>
        <div class="ok-appearance__fonts">
          <button
            v-for="font in FONT_OPTIONS"
            :key="font.id"
            type="button"
            class="ok-appearance__font"
            :class="{ 'is-active': prefs.font === font.id }"
            :data-font-preview="font.id"
            @click="setFont(font.id)"
          >
            <span class="ok-appearance__font-sample">{{ font.sample }}</span>
            <span class="ok-appearance__font-name">{{ copy.fonts[font.id] }}</span>
          </button>
        </div>
      </section>

      <label class="ok-appearance__toggle">
        <span class="ok-appearance__toggle-copy">
          <span class="ok-appearance__toggle-title">{{ copy.contrast }}</span>
          <span class="ok-appearance__toggle-hint">{{ copy.contrastHint }}</span>
        </span>
        <span class="ok-appearance__switch" :class="{ 'is-on': prefs.highContrast }">
          <input
            type="checkbox"
            :checked="prefs.highContrast"
            @change="setHighContrast(($event.target as HTMLInputElement).checked)"
          />
          <span class="ok-appearance__switch-thumb" aria-hidden="true" />
        </span>
      </label>
    </div>
  </div>
</template>
