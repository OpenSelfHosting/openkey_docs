# Brand assets

Third-party marks that ship in `public/icons/`.

## Store marks (`.vitepress/theme/assets/stores/`)

Trademarks of their respective owners, used here only to identify the store a
download link leads to. They are **not** covered by this repository's MIT licence.

These are the vendors' own artwork, taken verbatim from Wikimedia Commons — no
recolouring, no knockout, no simplification. Unlike every other mark on the site
they are full-colour, so `PlatformIcon.vue` renders them as `<img>` rather than
as a CSS mask: the App Store and Google Play marks are multitone and have no
single colour to inherit from the surrounding button text.

| File | Mark | Source |
| --- | --- | --- |
| `google-play.svg` | Google Play | [`Google_Play_2022_icon.svg`](https://commons.wikimedia.org/wiki/File:Google_Play_2022_icon.svg) on Wikimedia Commons (CC BY 4.0) |
| `apple-app-store.svg` | App Store | [`App_Store_(iOS).svg`](https://commons.wikimedia.org/wiki/File:App_Store_(iOS).svg) on Wikimedia Commons (CC BY 4.0) |
| `microsoft-store.svg` | Microsoft Store | [`Microsoft_Store_logo_dark.svg`](https://commons.wikimedia.org/wiki/File:Microsoft_Store_logo_dark.svg) on Wikimedia Commons (PD-textlogo, sourced from microsoft.com) |

Each file keeps the upstream geometry and paint servers. The only edits are
cosmetic: redundant Illustrator namespaces and generator preambles were dropped,
and the gradient ids were prefixed (`okAppStoreTile`, `okMsStoreBag`, …) so they
cannot collide when several marks are inlined on one page.

Source comments were stripped as well. Vite inlines assets under 4KB, so each of
these is embedded as a `data:` URI in the HTML of every page that shows a store
badge — a licence header in the file would be re-sent on each of them. **This
page is the attribution record** for all three marks, and it is published at
`/BRAND_ASSETS`.

## Why these are full-colour while other marks are not

The OS marks (Windows, Apple, Linux, Chrome, Firefox, Docker) are monochrome masks
that take the colour of the text beside them, which keeps the platform cards calm.
Store marks are the exception: they are what the visitor will recognise from the
button they are about to press, and a recoloured approximation is less useful than
the real thing. `google-play.svg` is also non-square, so `PlatformIcon.vue` sizes
it by height and derives the width from the artwork's aspect ratio.

Because a mark's colour can no longer be assumed, `.ok-platform-icon--store`
carries a `drop-shadow` hairline in `custom.css` — the Microsoft Store bag is dark
navy and would otherwise sink into a dark background. The hairline traces the
artwork's alpha rather than its box, so the Google Play triangle keeps its shape.

## Why they are not in `public/`

nginx serves static assets with `Cache-Control: public, max-age=604800,
immutable`. `immutable` is only correct for content-hashed URLs — `/assets/`,
which VitePress names with a content hash, and which `scripts/deploy.sh` clears
before each publish. A stable filename under `public/` breaks that assumption: when
these icons were replaced in place, Cloudflare kept serving the previous artwork
for the whole seven days, so the new `<img>` markup fetched an old monochrome
`fill="currentColor"` Google Play mark. Rendered inside an `<img>` that resolves to
black, which put a solid black triangle on the landing page.

Importing them in `PlatformIcon.vue` instead lets Vite emit them under
content-hashed names — or, since each is under the 4KB inline limit, straight into
the HTML as a `data:` URI. Either way a replaced artwork cannot be served from a
stale cache entry.