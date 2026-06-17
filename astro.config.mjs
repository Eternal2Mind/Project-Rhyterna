// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
    routing: {
      // Both locales are prefixed in the URL (/en/, /tr/).
      prefixDefaultLocale: true,
      // We provide our own navigator.language-based redirect at "/"
      // (see src/pages/index.astro), so disable Astro's flat redirect.
      redirectToDefaultLocale: false,
    },
  },
});
