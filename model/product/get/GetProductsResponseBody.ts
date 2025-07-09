import { ProductResponse } from "./GetProductResponseBody";


export interface ProductListResponse {
  
  products: ProductResponse[];
  total: number;
  skip: number;
  limit: number;
}
