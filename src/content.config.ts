import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.enum(['software', 'data']),
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

const database = z.object({
  name: z.string(),
  platform: z.string().optional(),
});

const techStack = z
  .object({
    languages: z.array(z.string()).default([]),
    databases: z.array(database).default([]),
    tools: z.array(z.string()).default([]),
  })
  .default({ languages: [], databases: [], tools: [] });

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    url: z.url().optional(),
    location: z.string().optional(),
    type: z
      .enum(['full-time', 'part-time', 'contract', 'internship', 'co-op', 'volunteer'])
      .optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    tech: techStack,
  }),
});

const course = z.object({
  code: z.string().optional(),
  title: z.string(),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/education' }),
  schema: z.object({
    credential: z.string(),
    institution: z.string(),
    url: z.url().optional(),
    location: z.string().optional(),
    type: z.enum(['degree', 'certificate']).default('degree'),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date(),
    highlights: z.array(z.string()).default([]),
    tech: techStack,
    coursework: z
      .array(z.object({ subject: z.string(), courses: z.array(course).min(1) }))
      .default([]),
  }),
});

const hobbies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/hobbies' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      photo: z.object({ src: image(), alt: z.string() }).optional(),
    }),
});

export const collections = { projects, experience, education, hobbies };
