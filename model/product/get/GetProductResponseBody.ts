export interface Dimensions {
  width:  number;
  height: number;
  depth:  number;
}

export interface Review {
  rating:       number;
  comment:      string;
  date:         string; // ISO 8601 timestamp
  reviewerName: string;
  reviewerEmail:string;
}

export interface Meta {
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
  barcode:   string;
  qrCode:    string; // URL
}

export interface ProductResponse {
  id:                     number;
  title:                  string;
  description:            string;
  category:               string;
  price:                  number;
  discountPercentage:     number;
  rating:                 number;
  stock:                  number;
  tags:                   string[];
  brand:                  string;
  sku:                    string;
  weight:                 number;
  warrantyInformation:    string;
  shippingInformation:    string;
  availabilityStatus:     string;
  returnPolicy:           string;
  minimumOrderQuantity:   number;
  images:                 string[];
  thumbnail:              string;
}
