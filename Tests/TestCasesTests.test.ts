import { MetergramClient } from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';

describe('Test Cases', () => {
    let metergramClient: MetergramClient;
    let token : string;
    const product = {
        title: "Essence Mascara Lash Princess",
        description: "The Essence Mascara Lash Princess is known for volumizing and lengthening effects with a cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        discountPercentage:  10.48,
        rating: 2.56,
        stock: 99,
        brand: "Essence",
        images: [
            "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    };

    beforeAll(async () => {
        metergramClient = new MetergramClient();
        await metergramClient.init();
        
        token = metergramClient.getToken();
    });

    beforeEach(async () => {
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        expect(metergramClient.getAuthHeader()).toEqual(token);
    })

    test("Create User", async () => {
        const firstName = "Leon";
        const lastName = "Saraqini";
        const age = 22;
        
        const user : any  = {
            firstName : firstName,
            lastName : lastName,
            age : age
        } 
        const responseEntity = await metergramClient.createUser(user);
        expect(responseEntity.status).toEqual(201);
        expect(responseEntity.data.firstName).toEqual(firstName);
        expect(responseEntity.data.lastName).toEqual(lastName);

    })

    test('Get products by category', async () => {
        const category : string = "smartphones";

        const responseEntity = await metergramClient.getProductByCategory(category);
        expect(responseEntity.status).toEqual(200);

        const {products} = responseEntity.data;
        expect(Array.isArray(products)).toBe(true);
        expect(products.every(product => product.category === category)).toBeTruthy();
        expect(responseEntity.data).toEqual(expect.objectContaining({
            limit: expect.any(Number),
            skip: expect.any(Number),
            total: expect.any(Number)})
        );
    });

    test('Add a new product', async () => {

        const responseEntity = await metergramClient.createProduct(product);
        
        expect(responseEntity.status).toEqual(201);
        expect(responseEntity.data.title).toEqual(product.title);
        expect(responseEntity.data.description).toEqual(product.description);
        expect(responseEntity.data.category).toEqual(product.category);
        expect(responseEntity.data.price).toEqual(product.price);
        expect(responseEntity.data.discountPercentage).toEqual(product.discountPercentage);
        expect(responseEntity.data.rating).toEqual(product.rating);
        expect(responseEntity.data.stock).toEqual(product.stock);
        expect(responseEntity.data.brand).toEqual(product.brand);
        expect(responseEntity.data.thumbnail).toEqual(product.thumbnail);

        const { images } = responseEntity.data;

        expect(Array.isArray(images)).toBe(true);
        expect(images).toEqual(product.images);

    })

    test('Update a product with PUT', async () => {
        const id : number= 1;
        const responseEntity = await metergramClient.updateProductPut(id, product);
        
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.title).toEqual(product.title);
        expect(responseEntity.data.description).toEqual(product.description);
        expect(responseEntity.data.category).toEqual(product.category);
        expect(responseEntity.data.price).toEqual(product.price);
        expect(responseEntity.data.discountPercentage).toEqual(product.discountPercentage);
        expect(responseEntity.data.rating).toEqual(product.rating);
        expect(responseEntity.data.stock).toEqual(product.stock);
        expect(responseEntity.data.brand).toEqual(product.brand);
        expect(responseEntity.data.thumbnail).toEqual(product.thumbnail);

        const { images } = responseEntity.data;

        expect(Array.isArray(images)).toBe(true);
        expect(images).toEqual(product.images);

    })

    test('Update a product with PATCH', async () => {
        const id : number = 1;
        const title: string = "Essence Mascara Lash Princess";
        const description: string = "The Essence Mascara Lash Princess is known for volumizing and lengthening effects with a cruelty-free formula.";
        const category: string = "Football";
        const price: number = 10;
        
        const product : any = {
            title: title,
            description: description,
            category: category,
            price: price
        };

        const responseEntity = await metergramClient.updateProductPatch(id, product);
        
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.id).toEqual(id);
        expect(responseEntity.data.title).toEqual(title);
        expect(responseEntity.data.description).toEqual(description);
        expect(responseEntity.data.category).toEqual(category);
        expect(responseEntity.data.price).toEqual(price);

    })

    test('Delete a product', async () => {
        const id : number = 1;
        
        const responseEntity = await metergramClient.deleteProduct(id);
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.id).toEqual(id);
        expect(responseEntity.data.deletedOn).toBeTruthy();
        expect(responseEntity.data.isDeleted).toBeTruthy();
    })


    test('Get product through specific fields', async () => {
        const limit = 10;
        const skip = 10;
        const select = ["title", "price"];

        const responseEntity = await metergramClient.getProductBySelect(limit, skip, select);
        
        expect(responseEntity.status).toEqual(200);
        
        const {products} = responseEntity.data;
        expect(Array.isArray(products)).toBe(true);
        expect(products.every(p => select.every(key => key in p))).toBeTruthy();


        expect(responseEntity.data.limit).toBe(limit);
        expect(responseEntity.data.skip).toBe(skip);
        
    })
    
});
