import postcssRTLCSS from 'postcss-rtlcss'

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    postcssRTLCSS({
      // VitePress docs: keep specificity stable across LTR/RTL
      ltrPrefix: ':where([dir="ltr"])',
      rtlPrefix: ':where([dir="rtl"])',
    }),
  ],
}
