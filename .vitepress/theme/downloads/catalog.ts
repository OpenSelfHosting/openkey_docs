/**
 * Download catalog for landing + /guide/download.
 * Prefer live store / release URLs when set; otherwise deep-link the download page.
 */

import { RELEASE_ARTIFACT_URLS, STORE_URLS } from './downloadUrls.generated'

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
  /** Installs from an app store rather than a direct file, so it renders as a
   *  store badge and can win the primary CTA. */
  store?: boolean
  /** Preferred pick when OS matches and arch aligns */
  recommended?: boolean
}

export type DownloadPlatform = {
  id: OsId
  labelKey: string
  requirementKey: string
  /** Anchor on the download guide */
  anchor: string
  /**
   * Extra architectures this platform can run an existing build on, beyond the
   * build's own `arch` and `universal`. Windows on Arm runs the x64 installer
   * under emulation; Linux and macOS have no such story, so they omit this.
   */
  runsOn?: ArchId[]
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

/**
 * True when this build can be handed to the browser right now, so a download
 * button pointing at it actually starts a download.
 */
export function isAvailable(variant: DownloadVariant): boolean {
  return artifactUrl(variant) !== null
}

/** True when `variant` is a build this platform can run on `arch`. */
function runsOnArch(
  platform: DownloadPlatform,
  variant: DownloadVariant,
  arch: ArchId,
): boolean {
  return (
    variant.arch === arch ||
    variant.arch === 'universal' ||
    (platform.runsOn ?? []).includes(arch)
  )
}

/**
 * Best *direct* build — installer, .dmg, .deb, APK — for a detected OS/arch.
 *
 * Store listings are excluded here: they now take the primary button, leaving
 * this build in the second slot. Ranking inside the direct set follows what the
 * visitor expects:
 *
 * 1. The hand-picked `recommended` build we can actually deliver.
 * 2. Any other available direct build.
 * 3. The hand-picked `recommended` build, unpublished — the caller then lands on
 *    the install guide rather than a broken link.
 *
 * Returns undefined when the platform ships no direct build at all (iOS).
 */
export function resolveDirectVariant(
  platform: DownloadPlatform,
  arch: ArchId,
): DownloadVariant | undefined {
  const usable = platform.variants.filter((v) => runsOnArch(platform, v, arch))
  const pool = usable.length > 0 ? usable : platform.variants
  const direct = pool.filter((v) => !v.store)
  if (direct.length === 0) return undefined
  return (
    direct.find((v) => v.recommended && isAvailable(v)) ??
    direct.find((v) => isAvailable(v)) ??
    direct.find((v) => v.recommended) ??
    direct[0]
  )
}

/**
 * Live store listing for a platform — the channel the primary CTA hands over as
 * soon as we have published one. Store builds are universal, so the detected
 * architecture is irrelevant. Undefined when we have no listing for this OS, and
 * the caller then falls back to the direct build.
 */
export function resolveStoreVariant(
  platform: DownloadPlatform,
): DownloadVariant | undefined {
  return platform.variants.find((v) => v.store && isAvailable(v))
}

/**
 * Build the primary download button hands over: the live store listing first,
 * then the direct artifact.
 *
 * Stores win because they are the self-updating, prompt-free channel — the one
 * that never trips SmartScreen or a sideload warning — so the direct build drops
 * to the second button. Platforms with no listing yet (macOS and Linux) keep the
 * direct build as the primary.
 *
 * Falls through to the best non-published build when the platform has nothing
 * live, which keeps the caller on the install-guide path instead of guessing.
 */
export function resolveDownloadVariant(
  platform: DownloadPlatform,
  arch: ArchId,
): DownloadVariant | undefined {
  return (
    resolveStoreVariant(platform) ??
    resolveDirectVariant(platform, arch) ??
    platform.variants.find((v) => v.recommended) ??
    platform.variants[0]
  )
}

/**
 * True when `variant` is the channel the primary CTA hands over, so the
 * "your OS" pill can never sit on a row the button does not point at.
 */
export function isPrimaryVariant(
  platform: DownloadPlatform,
  variant: DownloadVariant,
  arch: ArchId,
): boolean {
  return resolveDownloadVariant(platform, arch)?.id === variant.id
}

/** Thank-you page used when a selected build has no live release asset. */
export function thanksHref(
  localePath: string,
  platform: DownloadPlatform,
  variant: DownloadVariant,
): string {
  const q = new URLSearchParams({ os: platform.id, v: variant.id })
  return `${thanksPath(localePath)}?${q.toString()}`
}

/**
 * Live builds download directly from the exact compatible asset selected from
 * the latest GitHub release. Unpublished builds retain the install-guide flow.
 */
export function variantHref(
  localePath: string,
  platform: DownloadPlatform,
  variant: DownloadVariant,
): string {
  const url = artifactUrl(variant)
  if (url) return url
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
 * Desktop artifacts → latest GitHub Release on OpenSelfHosting/OpenKey.
 * Store listings → scripts/store-urls.config.json (flip live / set ids when published).
 * Hash anchors remain when a URL is not available yet.
 */
function applyDownloadUrls(platforms: DownloadPlatform[]): DownloadPlatform[] {
  return platforms.map((platform) => ({
    ...platform,
    variants: platform.variants.map((variant) => {
      const url = STORE_URLS[variant.id] ?? RELEASE_ARTIFACT_URLS[variant.id]
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
    // Windows on Arm runs the x64 installer under emulation, so Arm64 visitors
    // get a working download instead of a dead end.
    runsOn: ['arm64'],
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
      {
        id: 'windows-store',
        labelKey: 'windowsStore',
        arch: 'universal',
        href: '#windows-store',
        store: true,
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
        recommended: true,
      },
      {
        id: 'macos-appstore',
        labelKey: 'macosAppStore',
        arch: 'universal',
        href: '#macos-appstore',
        store: true,
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
        id: 'linux-appimage-x64',
        labelKey: 'linuxAppImageX64',
        arch: 'x64',
        href: '#linux-appimage-x64',
      },
      {
        id: 'linux-appimage-arm64',
        labelKey: 'linuxAppImageArm64',
        arch: 'arm64',
        href: '#linux-appimage-arm64',
      },
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
        id: 'linux-rpm-x64',
        labelKey: 'linuxRpmX64',
        arch: 'x64',
        href: '#linux-rpm-x64',
      },
      {
        id: 'linux-rpm-arm64',
        labelKey: 'linuxRpmArm64',
        arch: 'arm64',
        href: '#linux-rpm-arm64',
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
        href: '#android-play',
        store: true,
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
        store: true,
        recommended: true,
      },
    ],
  },
]

export const DOWNLOAD_PLATFORMS = applyDownloadUrls(DOWNLOAD_PLATFORMS_BASE)
