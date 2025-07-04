import { MetergramClient } from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';

describe('TestCases', () => {
    let metergramClient: MetergramClient;

    beforeAll(async () => {
        metergramClient = new MetergramClient();
    });


    test('GetProduct1', async () => {
        const id = 1
        const responseEntity = await metergramClient.getProductById(id)
        expect(responseEntity.status).toEqual(200)
        expect(responseEntity.data.id).toEqual(id)
        expect(responseEntity.data.tags[1]).toEqual("mascara")
    });

    test('GetAllRecipes', async () => {
        const id = 9
        const responseEntity = await metergramClient.getRecipes()
        expect(responseEntity.status).toEqual(200)
        expect(responseEntity.data.recipes[id].id).toEqual(id + 1)
    });

    test('GetLimitedProductNumber', async () => {
        const responseEntity = await metergramClient.getProductsWithLimit(10,10,"title")
        expect(responseEntity.status).toEqual(200)
    });
});
