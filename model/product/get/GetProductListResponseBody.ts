import { ProductResponse } from "./GetProductResponseBody";

export interface ProductSearchResponse {
  products: ProductResponse[];
  total:    number;
  skip:     number;
  limit:    number;
}
