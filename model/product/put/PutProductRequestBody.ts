import { z } from "zod";
import { ProductRequestSchema } from "../post/PostProductRequestBody";

export type ProductPutRequest = z.infer<typeof ProductRequestSchema>;