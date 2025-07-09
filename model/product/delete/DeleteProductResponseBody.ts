import { ProductResponse } from "../get/GetProductResponseBody";

export interface ProductDeleteRespone extends ProductResponse{
    isDeleted:              boolean;
    deletedOn:              string; 
}