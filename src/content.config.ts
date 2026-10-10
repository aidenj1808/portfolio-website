import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.enum(['software', 'data-science']),
      tech: z.array(z.string()).min(1),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      repo: z.url().optional(),
      demoUrl: z.url().optional(),
      demoType: z.enum(['embed', 'link', 'video']).optional(),
      cover: image(),
      coverAlt: z.string(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
