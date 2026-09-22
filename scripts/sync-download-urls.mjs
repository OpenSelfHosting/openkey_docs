#!/usr/bin/env node
/**
 * Sync download URLs: GitHub Release artifacts + app store listings.
 * Run before build via `npm run sync:downloads`.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, '.vitepress/theme/downloads/downloadUrls.generated.ts')
const STORE_CONFIG = join(__dirname, 'store-urls.config.json')

export const DEFAULT_REPO = 'OpenSelfHosting/OpenKey'

const REPO = process.env.OPENKEY_RELEASE_REPO || DEFAULT_REPO
const RELEASE_API = `https://api.github.com/repos/${REPO}/releases/latest`

const RELEASE_RULES = [
  {
    id: 'windows-x64',
    match: (name) =>
      /windows-x64-setup\.exe$/i.test(name) ||
      (/windows/i.test(name) && /x64/i.test(name) && /\.(exe|zip|msix)$/i.test(name)),
  },
  {
    id: 'windows-arm64',
    match: (name) =>
      /windows-arm64/i.test(name) && /\.(exe|zip|msix)$/i.test(name),
  },
  { id: 'macos-arm64', match: (name) => /macos-arm64.*\.dmg$/i.test(name) },
  { id: 'macos-x64', match: (name) => /macos-x64.*\.dmg$/i.test(name) },
  {
    id: 'macos-universal',
    match: (name) =>
      /macos-universal.*\.(dmg|pkg)$/i.test(name) ||
      /-macos\.pkg$/i.test(name),
  },
  { id: 'linux-deb-x64', match: (name) => /linux-x64\.deb$/i.test(name) },
  { id: 'linux-deb-arm64', match: (name) => /linux-arm64\.deb$/i.test(name) },
  { id: 'linux-rpm-x64', match: (name) => /linux-x64\.rpm$/i.test(name) },
  { id: 'linux-rpm-arm64', match: (name) => /linux-arm64\.rpm$/i.test(name) },
  { id: 'linux-appimage-x64', match: (name) => /linux-x64\.AppImage$/i.test(name) },
  { id: 'linux-appimage-arm64', match: (name) => /linux-arm64\.AppImage$/i.test(name) },
  { id: 'linux-tar-x64', match: (name) => /linux-x64\.tar\.gz$/i.test(name) },
  { id: 'linux-tar-arm64', match: (name) => /linux-arm64\.tar\.gz$/i.test(name) },
  {
    id: 'android-apk',
    match: (name) =>
      /-android\.apk$/i.test(name) ||
      (/android.*\.apk$/i.test(name) &&
        !/(arm64|armeabi|x86_64)/i.test(name) &&
        !/\.apk\./i.test(name)),
  },
]

function isSkippableAsset(name) {
  return (
    /\.(asc|sha256|sha512|sig|checksums?|blockmap)$/i.test(name) ||
    /\.SHA256/i.test(name) ||
    /checksum/i.test(name)
  )
}

function mapReleaseAssets(assets) {
  const urls = {}
  const usable = assets.filter((a) => a.name && !isSkippableAsset(a.name))
  for (const rule of RELEASE_RULES) {
    const hit = usable.find((a) => rule.match(a.name))
    if (hit) urls[rule.id] = hit.browser_download_url
  }
  return urls
}

async function fetchLatestRelease() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'openkey-docs-sync-downloads',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(RELEASE_API, { headers })
  if (res.status === 404) {
    return { tag: null, urls: {}, publishedAt: null }
  }
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`)
  }

  const data = await res.json()
  const assets = Array.isArray(data.assets) ? data.assets : []
  return {
    tag: data.tag_name ?? null,
    publishedAt: data.published_at ?? null,
    urls: mapReleaseAssets(assets),
  }
}

function loadStoreConfig() {
  const raw = readFileSync(STORE_CONFIG, 'utf8')
  return JSON.parse(raw)
}

/**
 * Resolve store URLs from scripts/store-urls.config.json.
 * Only entries with live:true, explicit url, or required ids are emitted.
 */
function resolveStoreUrls(config) {
  const appId = config.appId || 'com.openselfhosting.openkey'
  const stores = config.stores || {}
  /** @type {Record<string, string>} */
  const urls = {}

  const android = stores['android-play']
  if (android?.url) {
    urls['android-play'] = android.url
  } else if (android?.live) {
    urls['android-play'] = `https://play.google.com/store/apps/details?id=${appId}`
  }

  const ios = stores['ios-appstore']
  if (ios?.url) {
    urls['ios-appstore'] = ios.url
  } else if (ios?.appleId) {
    urls['ios-appstore'] = `https://apps.apple.com/app/id${ios.appleId}`
  }

  const macStore = stores['macos-appstore']
  if (macStore?.url) {
    urls['macos-appstore'] = macStore.url
  } else if (macStore?.appleId) {
    urls['macos-appstore'] = `https://apps.apple.com/app/id${macStore.appleId}`
  }

  const winStore = stores['windows-store']
  if (winStore?.url) {
    urls['windows-store'] = winStore.url
  } else if (winStore?.productId) {
    urls['windows-store'] = `https://apps.microsoft.com/detail/${winStore.productId}`
  }

  const flathub = stores['linux-flathub']
  if (flathub?.url) {
    urls['linux-flathub'] = flathub.url
  } else if (flathub?.live) {
    urls['linux-flathub'] = `https://flathub.org/apps/${appId}`
  }

  const snap = stores['linux-snap']
  const snapName = snap?.snapName || 'openkey'
  if (snap?.url) {
    urls['linux-snap'] = snap.url
  } else if (snap?.live) {
    urls['linux-snap'] = `https://snapcraft.io/${snapName}`
  }

  return urls
}

function emitTs(release, storeUrls) {
  const body = `// Generated by scripts/sync-download-urls.mjs — do not edit by hand.
// Re-run: npm run sync:downloads
// Store config: scripts/store-urls.config.json

export const RELEASE_SOURCE_REPO = ${JSON.stringify(REPO)} as const

export const RELEASE_SYNC = {
  tag: ${release.tag ? JSON.stringify(release.tag) : 'null'},
  publishedAt: ${release.publishedAt ? JSON.stringify(release.publishedAt) : 'null'},
  syncedAt: ${JSON.stringify(new Date().toISOString())},
} as const

/** Variant id → browser_download_url from the latest GitHub Release on OpenKey. */
export const RELEASE_ARTIFACT_URLS: Record<string, string> = ${JSON.stringify(release.urls, null, 2)}

/** Variant id → store listing URL (from scripts/store-urls.config.json). */
export const STORE_URLS: Record<string, string> = ${JSON.stringify(storeUrls, null, 2)}
`
  writeFileSync(OUT, body, 'utf8')
}

async function main() {
  try {
    const storeConfig = loadStoreConfig()
    const storeUrls = resolveStoreUrls(storeConfig)
    const release = await fetchLatestRelease()
    emitTs(release, storeUrls)

    const releaseCount = Object.keys(release.urls).length
    const storeCount = Object.keys(storeUrls).length
    console.log(
      `sync-download-urls: release ${release.tag ?? 'none'} (${releaseCount} artifact(s)), stores (${storeCount} live) → ${OUT}`,
    )
  } catch (err) {
    console.error('sync-download-urls failed:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

main()
