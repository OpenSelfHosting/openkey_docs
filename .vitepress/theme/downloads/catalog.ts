/**
 * Download catalog for landing + /guide/download.
 * Prefer live store / release URLs when set; otherwise deep-link the download page.
 */

import { RELEASE_ARTIFACT_URLS } from './releaseUrls.generated'

export type OsId = 'windows' | 'macos' | 'linux' | 'android' | 'ios'
export type ArchId = 'x64' | 'arm64' | 'arm32' | 'universal'

export type DownloadVariant = {
  id: string
  /** Stable key for i18n labels */
  labelKey: string
  arch: ArchId
  /**
   * Live artifact or store URL when available.
   * Hash-only values mean “documented on the download guide” until Releases ship.
   */
  href: string
  external?: boolean
  /** Preferred pick when OS matches and arch aligns */
  recommended?: boolean
}

export type DownloadPlatform = {
  id: OsId
  labelKey: string
  requirementKey: string
  /** Anchor on the download guide */
  anchor: string
  variants: DownloadVariant[]
}

/** Locale-relative download guide path (no trailing slash). */
export function downloadGuidePath(localePath: string): string {
  const base = localePath.replace(/\/$/, '')
  return `${base}/guide/download`
}

export function thanksPath(localePath: string): string {
  return `${downloadGuidePath(localePath)}/thanks`
}

export function platformHref(localePath: string, platform: DownloadPlatform): string {
  return `${downloadGuidePath(localePath)}#${platform.anchor}`
}

/** True when href is a real download/store target (not an in-page hash). */
export function isLiveArtifact(variant: DownloadVariant): boolean {
  return Boolean(variant.external || /^https?:\/\//i.test(variant.href))
}

export function artifactUrl(variant: DownloadVariant): string | null {
  if (isLiveArtifact(variant)) return variant.href
  return null
}

/** Navigate here after the user chooses a build — thank-you + install steps. */
export function thanksHref(
  localePath: string,
  platform: DownloadPlatform,
  variant: DownloadVariant,
): string {
  const q = new URLSearchParams({ os: platform.id, v: variant.id })
  return `${thanksPath(localePath)}?${q.toString()}`
}

/**
 * Primary CTA / picker links: always the thank-you flow for in-app downloads.
 * Live external stores still go through thanks (opens store from that page).
 */
export function variantHref(
  localePath: string,
  platform: DownloadPlatform,
  variant: DownloadVariant,
): string {
  return thanksHref(localePath, platform, variant)
}

/** Deep-link into the long-form guide section for a variant. */
export function guideSectionHref(
  localePath: string,
  platform: DownloadPlatform,
  variant: DownloadVariant,
): string {
  if (variant.href.startsWith('#')) {
    return `${downloadGuidePath(localePath)}${variant.href}`
  }
  if (isLiveArtifact(variant)) {
    return platformHref(localePath, platform)
  }
  if (variant.href.startsWith('/')) return variant.href
  return platformHref(localePath, platform)
}

export function findPlatform(os: string): DownloadPlatform | undefined {
  return DOWNLOAD_PLATFORMS.find((p) => p.id === os)
}

export function findVariant(
  platform: DownloadPlatform,
  variantId: string,
): DownloadVariant | undefined {
  return platform.variants.find((v) => v.id === variantId)
}

/**
 * Desktop / mobile artifacts default to the latest GitHub Release on openkey_app.
 * `npm run sync:releases` (also runs before build) refreshes releaseUrls.generated.ts.
 * Hash anchors remain the fallback when a variant has no matching release asset yet.
 */
function applyReleaseUrls(platforms: DownloadPlatform[]): DownloadPlatform[] {
  return platforms.map((platform) => ({
    ...platform,
    variants: platform.variants.map((variant) => {
      const url = RELEASE_ARTIFACT_URLS[variant.id]
      if (!url) return variant
      return { ...variant, href: url, external: true }
    }),
  }))
}

const DOWNLOAD_PLATFORMS_BASE: DownloadPlatform[] = [
  {
    id: 'windows',
    labelKey: 'windows',
    requirementKey: 'windowsReq',
    anchor: 'windows',
    variants: [
      {
        id: 'windows-x64',
        labelKey: 'windowsX64',
        arch: 'x64',
        href: '#windows-x64',
        recommended: true,
      },
      {
        id: 'windows-arm64',
        labelKey: 'windowsArm64',
        arch: 'arm64',
        href: '#windows-arm64',
      },
    ],
  },
  {
    id: 'macos',
    labelKey: 'macos',
    requirementKey: 'macosReq',
    anchor: 'macos',
    variants: [
      {
        id: 'macos-arm64',
        labelKey: 'macosArm64',
        arch: 'arm64',
        href: '#macos-arm64',
        recommended: true,
      },
      {
        id: 'macos-x64',
        labelKey: 'macosX64',
        arch: 'x64',
        href: '#macos-x64',
      },
      {
        id: 'macos-universal',
        labelKey: 'macosUniversal',
        arch: 'universal',
        href: '#macos-universal',
      },
    ],
  },
  {
    id: 'linux',
    labelKey: 'linux',
    requirementKey: 'linuxReq',
    anchor: 'linux',
    variants: [
      {
        id: 'linux-deb-x64',
        labelKey: 'linuxDebX64',
        arch: 'x64',
        href: '#linux-deb-x64',
        recommended: true,
      },
      {
        id: 'linux-deb-arm64',
        labelKey: 'linuxDebArm64',
        arch: 'arm64',
        href: '#linux-deb-arm64',
      },
      {
        id: 'linux-tar-x64',
        labelKey: 'linuxTarX64',
        arch: 'x64',
        href: '#linux-tar-x64',
      },
      {
        id: 'linux-tar-arm64',
        labelKey: 'linuxTarArm64',
        arch: 'arm64',
        href: '#linux-tar-arm64',
      },
    ],
  },
  {
    id: 'android',
    labelKey: 'android',
    requirementKey: 'androidReq',
    anchor: 'android',
    variants: [
      {
        id: 'android-play',
        labelKey: 'androidPlay',
        arch: 'universal',
        href: 'https://play.google.com/store/apps/details?id=com.openselfhosting.openkey',
        external: true,
        recommended: true,
      },
      {
        id: 'android-apk',
        labelKey: 'androidApk',
        arch: 'universal',
        href: '#android-apk',
      },
    ],
  },
  {
    id: 'ios',
    labelKey: 'ios',
    requirementKey: 'iosReq',
    anchor: 'ios',
    variants: [
      {
        id: 'ios-appstore',
        labelKey: 'iosAppStore',
        arch: 'universal',
        href: '#ios',
        recommended: true,
      },
    ],
  },
]

export const DOWNLOAD_PLATFORMS = applyReleaseUrls(DOWNLOAD_PLATFORMS_BASE)
