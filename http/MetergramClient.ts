import BaseClient from "./BaseClient";
import { ResponseEntity } from "express";
import { getConfig } from "../util/Config";
import {PostAuthRequestBody} from "../model/auth/PostAuthRequestBody";
import {PostAuthResponseBody} from "../model/auth/PostAuthResponseBody";
import { UserProfileResponse } from "../model/user/PostUserResponseBody";
import { UserProfileRequest, UserProfileSchema } from "../model/user/PostUserRequestBody";
import { ProductResponse } from "../model/product/get/GetProductResponseBody";
import { ProductListResponse } from "../model/product/get/GetProductsResponseBody";
import { ProductCreateRequest, ProductRequestSchema } from "../model/product/post/PostProductRequestBody";
import { ProductPutResponse } from "../model/product/put/PutProductResponseBody";
import { ProductPatchResponse } from "../model/product/patch/PatchProductResponseBody";
import { ProductPutRequest } from "../model/product/put/PutProductRequestBody";
import { ProductPatchRequest, ProductPatchSchema } from "../model/product/patch/PatchProductRequestBody";
import { ProductDeleteRespone } from "../model/product/delete/DeleteProductResponseBody";
/**
 * Extends BaseClient to provide additional functionality for interacting with the Metergram API.
 */
export class MetergramClient extends BaseClient {
    private static readonly authenticate = "auth/login";
    private Token: string;

    private postAuthRequestBody: PostAuthRequestBody = {
        username: process.env.TESTUSERNAME,
        password: process.env.PASSWORD
    };

    /**
     * Creates an instance of the MetergramClient.
     * Initializes headers and base URL for API requests.
     */
     constructor() {
        super();
        const config = getConfig();
    }

    public createUser(userInput: unknown): ResponseEntity<UserProfileResponse>{
        const user : UserProfileRequest = UserProfileSchema.parse(userInput);

        return this.post(`user/add`, user);
    }

    public getProductById(id: number): ResponseEntity<ProductResponse> {
        return this.get("products/" + id);
    }

    public getProductByCategory(category: string): ResponseEntity<ProductListResponse>{
        return this.get(`products/category/${category}`);
    }

    public getProductBySelect(limit: number, skip: number, selectArray: Array<String>): ResponseEntity<ProductListResponse>{
        const select = selectArray.join(',');

        return this.get(`products?limit=${limit}&skip=${skip}&select=${select}`);
    }

    public createProduct(productInput: unknown): ResponseEntity<ProductResponse>{
        const product : ProductCreateRequest = ProductRequestSchema.parse(productInput);

        return this.post(`products/add`, product);
    }

    public updateProductPut(id : number, productInput: unknown): ResponseEntity<ProductPutResponse>{
        const product : ProductPutRequest = ProductRequestSchema.parse(productInput);
        
        return this.put(`products/${id}`, product);
    }

    public updateProductPatch(id : number, productInput: unknown): ResponseEntity<ProductPatchResponse>{
        const product : ProductPatchRequest = ProductPatchSchema.parse(productInput);
        
        return this.patch(`products/${id}`, product);
    }

    public deleteProduct(id: number): ResponseEntity<ProductDeleteRespone>{
        return this.delete(`products/${id}`);
    }

    public getToken() : string{
        return this.Token;
    }

    public async init(): Promise<void> {
        try {
            const responseEntity = await this.authenticateOnTheSite(this.postAuthRequestBody);

            const ticket = responseEntity?.data?.accessToken;

            if (ticket) {
                this.Token = ticket;
                this.addHeader("Content-Type", "application/json");
                this.addHeader("Authorization", `Bearer ${this.Token}`);
            } else {
                console.error("Failed to authenticate or obtain token.");
            }
        } catch (error: any) {
            console.error("Error while authenticating:", error.message || error);
        }
    }

    /**
     * Authenticates on the site using provided credentials.
     * @param {PostAuthRequestBody} postAuthRequestBody - The request body containing email and password.
     * @returns {ResponseEntity<PostAuthResponseBody>} The response entity containing the authentication token.
     */
    public async authenticateOnTheSite(postAuthRequestBody: PostAuthRequestBody): ResponseEntity<PostAuthResponseBody> {
        return await this.post(MetergramClient.authenticate, postAuthRequestBody);
    }
}
