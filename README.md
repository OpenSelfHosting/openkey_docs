# OpenKey Docs

Product site and documentation for [OpenKey](https://github.com/OpenSelfHosting) — a self-hosted, end-to-end encrypted password manager.

Supports the same locales as the Flutter app: English, Chinese, Hindi, Spanish, French, Arabic, Bengali, Portuguese, Russian, and Urdu (RTL for Arabic and Urdu).

## Develop

```bash
npm install
npm run dev
```

Guide pages cover overview, security, quick start, **download & install**, **server install + client linking**, **using the app**, **Nearby LAN sync**, **browser extension**, **CLI**, **sharing & orgs**, **import & export**, **FAQ & troubleshooting**, **changelog**, and open packages.

**Translation policy:** English and Arabic are the full references. **Chinese (zh), Spanish (es), and French (fr)** have full major guides (Nearby, extension, FAQ, sharing, import/export, download, security, changelog, server API). **Hindi, Bengali, Portuguese, Russian, and Urdu** have full overview / quick-start / packages / CLI / app / server / download (with stable install anchors), localized home sections, and blog posts; changelog and security remain partial stubs linking to EN/AR. **Pricing, privacy, and terms** are substantive in all locales (zh legal pages are shorter summaries).

Blog posts live under `blog/` (English) and `ar/blog/` (Arabic), with full translations in every supported locale. Add a Markdown file with `date`, `description`, and `cover` frontmatter, put the image in `public/blog/covers/`, and register the sidebar entry in `.vitepress/blogPosts.ts` (titles are read from frontmatter).

Security reporting: see [guide/security.md](./guide/security.md#reporting-vulnerabilities) and `SECURITY.md` in this package / the monorepo root.

Legal / commercial (app store / About):

- [Pricing](./pricing.md) → `/pricing`
- [Privacy Policy](./privacy.md) → `/privacy`
- [Terms of Service](./terms.md) → `/terms`

Full EN + AR for all three; other locales summarize and link to EN/AR.

## Build

```bash
npm run build
npm run preview
```

Static output lands in `.vitepress/dist`.

## Download URLs (GitHub Releases + stores)

Before each build, `npm run sync:downloads` refreshes `.vitepress/theme/downloads/downloadUrls.generated.ts`:

| Source | Config | When URLs appear |
|--------|--------|------------------|
| **GitHub Releases** | `OpenSelfHosting/openkey_app` (override: `OPENKEY_RELEASE_REPO`) | Matching assets on the latest release (`OpenKey-*-windows-x64-setup.exe`, etc.) |
| **App stores** | `scripts/store-urls.config.json` | Set `live: true`, `appleId`, or `productId` when a listing goes public |

**Store config** (`scripts/store-urls.config.json`):

- `android-play` — set `live: true` when Google Play listing is public (uses `appId`)
- `ios-appstore` / `macos-appstore` — set `appleId` when App Store / Mac App Store is live
- `windows-store` — set `productId` for Microsoft Store
- `linux-flathub` / `linux-snap` — set `live: true` when published

Until a channel is live, the download picker falls back to in-page guide anchors. Private release repo: `GITHUB_TOKEN` with `contents:read`.
