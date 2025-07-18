export interface ProductCreateResponse {
  id:                     number;
  title:                  string;
  description:            string;
  category:               string;
  price:                  number;
  discountPercentage:     number;
  rating:                 number;
  stock:                  number;
  brand:                  string;
  images:                 string[];
  thumbnail:              string;
} 
