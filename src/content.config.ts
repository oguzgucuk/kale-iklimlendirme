import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Services Collection (Hizmetler)
const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      icon: z.string().default('fan'),
      order: z.number().default(1),
      featuredImage: image().optional(),
    }),
});

// 2. Projects Collection (Referans Projeler)
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      location: z.string(),
      systemType: z.string(),
      summary: z.string(),
      images: z.array(image()).optional(),
      completedDate: z.coerce.date(),
      featured: z.boolean().default(false),
    }),
});

// 3. Testimonials Collection (Müşteri Değerlendirmeleri)
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testimonials' }),
  schema: z.object({
    authorName: z.string(),
    authorRole: z.string(),
    quote: z.string(),
    rating: z.number().min(1).max(5).default(5),
  }),
});

export const collections = {
  services,
  projects,
  testimonials,
};
