# OpenKey Docs

Product site and documentation for [OpenKey](https://github.com/OpenSelfHosting) — a self-hosted, end-to-end encrypted password manager.

Supports the same locales as the Flutter app: English, Chinese, Hindi, Spanish, French, Arabic, Bengali, Portuguese, Russian, and Urdu (RTL for Arabic and Urdu).

## Develop

```bash
npm install
npm run dev
```

Guide pages cover overview, security, quick start, **download & install**, **server install + client linking**, **using the app**, **Nearby LAN sync**, **browser extension**, **CLI**, **sharing & orgs**, **import & export**, **FAQ & troubleshooting**, **changelog**, and open packages.

**Translation policy:** English and Arabic are the full references. **Chinese (zh), Spanish (es), and French (fr)** have full major guides (Nearby, extension, FAQ, sharing, import/export, download, security, changelog, server API). Other locales keep full overview / quick-start / packages / CLI / app / server, with richer stubs that link to EN/AR for the longest pages.

Blog posts live under `blog/` (English) and `ar/blog/` (Arabic). Every other locale has a `blog/index.md` that lists the English posts (and missing translated post URLs fall back to `/blog/...`). Add a Markdown file with `date`, `description`, and `cover` frontmatter, put the image in `public/blog/covers/`, and register the sidebar entry in `blogPosts` inside `.vitepress/config.ts`.

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
