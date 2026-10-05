import { Page, Locator, expect } from '@playwright/test';

export class ShopPage {

    readonly page: Page;
    readonly productSKU: (skuNumber: number) => Locator;
    readonly addToCartButton: (productNumber: number) => Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productSKU = (skuNumber: number): Locator =>
            this.page.locator(`#product-${skuNumber}`);
        this.addToCartButton = (productNumber: number): Locator =>
            this.page.locator(`#product-${productNumber} a.btn-success`);
        this.submitButton = page.locator('a[class*="btn-contact"]');
    }

    async getProducts(productNumbers: number[]) {
            const results: any = [];

            for (const num of productNumbers) {
                const product: Locator = this.page.locator(`#product-${num}`);

                results.push({
                    title: await product.locator('.product-title').innerText(),
                    price: await product.locator('.product-price').innerText(),
                    isVisible: await product.isVisible()
                });
            }

            return results;
        }
    async addToCart(productNumber: number, value: number) {
        const addToCartProductButton: Locator = this.addToCartButton(productNumber);
        for (let i = 0; i < value; i++) {
            await expect(addToCartProductButton).toBeEnabled();
            await addToCartProductButton.click({ force: true });
        }
    }
}