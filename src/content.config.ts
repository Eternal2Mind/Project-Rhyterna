import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Future content for the #devlog and #lex-rhyterna sections lives here as
// Markdown. Entries are locale-scoped via the `lang` field. Nothing is
// rendered yet — the page sections stay as skeletons until real entries are
// added and wired up. Files prefixed with "_" are ignored by the loader.

const devlog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/devlog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['en', 'tr']),
    draft: z.boolean().default(false),
  }),
});

const lexRhyterna = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lex-rhyterna' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    lang: z.enum(['en', 'tr']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { devlog, lexRhyterna };
