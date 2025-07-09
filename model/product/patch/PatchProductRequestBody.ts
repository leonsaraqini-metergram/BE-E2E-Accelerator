import { z } from "zod";


export const ProductPatchSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.number().optional(),
  discountPercentage: z.number().optional(),
  rating: z.number().optional(),
  stock: z.number().optional(),
  brand: z.string().optional(),
  images: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
});


export type ProductPatchRequest = z.infer<typeof ProductPatchSchema>;