import BaseClient from "./BaseClient";
import { ResponseEntity } from "express";
import { getConfig } from "../util/Config";
import {PostAuthRequestBody} from "../model/auth/PostAuthRequestBody";
import {PostAuthResponseBody} from "../model/auth/PostAuthResponseBody";
import {ProductModel} from "../model/get/GetProductResponseBody";
import {RecipeResponse} from "../model/get/GetRecipie";

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
        this.baseUrl = config.HOSTNAMEAPI;
    }

    /**
     * Fetches user details by user ID.
     * @param {number} id - The ID of the user to fetch.
     * @returns {ResponseEntity<GetUserResponseBody>} The response entity containing the user details.
     */
    public getProductById(id: number): ResponseEntity<ProductModel> {
        return this.get("products/" + id);
    }

    public getRecipes(): ResponseEntity<RecipeResponse> {
        return this.get("recipes");
    }

    public getProductsWithLimit(limit: number, skip: number, title: string): ResponseEntity<RecipeResponse> {
        return this.get(`products?limit=${limit}&skip=${skip}&select=${title}`);
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
