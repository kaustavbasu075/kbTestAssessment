import { Page, Locator, expect } from '@playwright/test';

export class LandingPage {
    readonly page: Page;
    readonly landingPageText: Locator;
    readonly clickNavigateToContact: Locator;
    readonly clickNavigateToShop: Locator;


    constructor(page: Page) {
        this.page = page;
        this.landingPageText = page.locator('.hero-unit h1');
        this.clickNavigateToContact = page.locator('li#nav-contact a');
        this.clickNavigateToShop = page.locator('li#nav-shop a');
    }

}