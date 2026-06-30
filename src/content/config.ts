import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Wrangle Team'),
    tag: z.string().default('Travel'),
    readTime: z.string().default('5 min read'),
    coverEmoji: z.string().default('✈️'),
    coverImage: z.string().optional(),
  }),
});

export const collections = { blog };
