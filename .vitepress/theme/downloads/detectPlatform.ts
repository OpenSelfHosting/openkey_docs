import type { ArchId, DownloadPlatform, DownloadVariant, OsId } from './catalog'
import { DOWNLOAD_PLATFORMS } from './catalog'

export type DetectedPlatform = {
  os: OsId | 'unknown'
  arch: ArchId
  platform: DownloadPlatform | null
  variant: DownloadVariant | null
}

type NavigatorUaData = Navigator & {
  userAgentData?: {
    platform?: string
    mobile?: boolean
    getHighEntropyValues?: (hints: string[]) => Promise<{
      architecture?: string
      bitness?: string
      platform?: string
      model?: string
    }>
  }
}

function matchOs(ua: string, platformHint = ''): OsId | 'unknown' {
  const p = platformHint.toLowerCase()
  if (p.includes('android') || /android/i.test(ua)) return 'android'
  if (p.includes('ios') || /iphone|ipad|ipod/i.test(ua)) return 'ios'
  // iPadOS 13+ may report as Mac
  if (/macintosh/i.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document) {
    return 'ios'
  }
  if (p.includes('win') || /windows|win32|win64/i.test(ua)) return 'windows'
  if (p.includes('mac') || /macintosh|mac os x/i.test(ua)) return 'macos'
  if (p.includes('linux') || /linux/i.test(ua)) return 'linux'
  return 'unknown'
}

function archFromHints(architecture?: string, bitness?: string): ArchId | null {
  const a = (architecture || '').toLowerCase()
  if (a.includes('arm')) return 'arm64'
  if (a.includes('x86') || a.includes('x64') || a === 'amd64') {
    return bitness === '32' ? 'x64' : 'x64'
  }
  return null
}

function defaultArch(os: OsId | 'unknown'): ArchId {
  if (os === 'macos' || os === 'ios' || os === 'android') return 'arm64'
  return 'x64'
}

function pickVariant(
  platform: DownloadPlatform,
  arch: ArchId,
): DownloadVariant {
  const byArch = platform.variants.filter((v) => v.arch === arch || v.arch === 'universal')
  const recommended = byArch.find((v) => v.recommended) || byArch[0]
  if (recommended) return recommended
  return platform.variants.find((v) => v.recommended) || platform.variants[0]
}

/** Sync best-effort detect (no high-entropy UA Client Hints). */
export function detectPlatformSync(): DetectedPlatform {
  if (typeof navigator === 'undefined') {
    return { os: 'unknown', arch: 'x64', platform: null, variant: null }
  }
  const nav = navigator as NavigatorUaData
  const ua = nav.userAgent || ''
  const hint = nav.userAgentData?.platform || nav.platform || ''
  const os = matchOs(ua, hint)
  const arch = defaultArch(os)
  const platform = DOWNLOAD_PLATFORMS.find((p) => p.id === os) || null
  const variant = platform ? pickVariant(platform, arch) : null
  return { os, arch, platform, variant }
}

/** Refine arch via User-Agent Client Hints when available. */
export async function detectPlatform(): Promise<DetectedPlatform> {
  const base = detectPlatformSync()
  if (typeof navigator === 'undefined') return base

  const nav = navigator as NavigatorUaData
  const getHints = nav.userAgentData?.getHighEntropyValues
  if (!getHints) return base

  try {
    const hints = await getHints.call(nav.userAgentData, [
      'architecture',
      'bitness',
      'platform',
      'model',
    ])
    const os = matchOs(nav.userAgent || '', hints.platform || nav.userAgentData?.platform || '')
    const arch = archFromHints(hints.architecture, hints.bitness) || defaultArch(os)
    const platform = DOWNLOAD_PLATFORMS.find((p) => p.id === os) || null
    const variant = platform ? pickVariant(platform, arch) : null
    return { os, arch, platform, variant }
  } catch {
    return base
  }
}
