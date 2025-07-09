import { z } from "zod";


export const ProductRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  images: z.array(z.string()),
  thumbnail: z.string(),
});


export type ProductCreateRequest = z.infer<typeof ProductRequestSchema>;