import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { LandingPage } from '../pages/LandingPage';
import { ContactPage } from '../pages/ContactPage';
import { ShopPage } from '../pages/ShopPage';

type AppFixtures = {
    cartPage: CartPage;
    landingPage: LandingPage;
    contactPage: ContactPage;
    shopPage: ShopPage;
};

export const test = base.extend<AppFixtures>({
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    landingPage: async ({ page }, use) => {
        await use(new LandingPage(page));
    },

    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page));
    },
});

export const expect = test.expect;
