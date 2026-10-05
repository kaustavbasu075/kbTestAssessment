import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
    readonly page: Page;
    readonly contactPageHeaderText: Locator;
    readonly submitButton: Locator;
    readonly errorMessages: Locator;
    readonly name: Locator;
    readonly email: Locator;
    readonly message: Locator;
    readonly successfulText: Locator;
    readonly goBackButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.contactPageHeaderText = page.locator('#header-message');
        this.submitButton = page.locator('a[class*="btn-contact"]');
        this.errorMessages = page.locator('[id*="err"]');
        this.name = page.locator('#forename');
        this.email = page.locator('#email');
        this.message = page.locator('#message');
        this.successfulText = page.locator('.alert-success');
        this.goBackButton = page.locator('a[class="btn"]');

    }
    async fillDetails(name: string, email: string, message: string) {
        await this.name.fill(name);
        await this.email.fill(email);
        await this.message.fill(message);
    }

    async waitForSuccessMessage() {
        await this.successfulText.waitFor({ state: 'visible' });
    }


}