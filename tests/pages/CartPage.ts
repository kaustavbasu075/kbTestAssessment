import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartNavigation: Locator;
  readonly cartTableRow: Locator;
  readonly cartTableHeaders: Locator;
  readonly cartCount: Locator;
  readonly totalValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartCount = page.locator('#nav-cart .cart-count');
    this.cartNavigation = page.locator('#nav-cart');
    this.cartTableRow = page.locator('table.cart-items tbody tr');
    this.cartTableHeaders = page.locator('table.cart-items thead th');
    this.totalValue = page.locator('[class*="total"]');
  }

  async verifyCartItem(itemName: string) {
    await this.cartTableHeaders.first().waitFor({ state: 'attached' });
    const headers = await this.cartTableHeaders.allTextContents();

    const row = this.cartTableRow.filter({ hasText: itemName });
    await expect(row).toBeVisible();

    const tdLocators = row.locator('td');
    const tdCount = await tdLocators.count();

    const itemData: any = {};

    for (let i:number = 0; i < tdCount; i++) {
      const header: any = headers[i].trim();
      const cell = tdLocators.nth(i);

      const input = cell.locator('input');

      if (await input.first().isVisible()) {
        itemData[header] = await input.inputValue();
      } else {
        itemData[header] = (await cell.innerText()).trim();
      }
    }
    return itemData;
  }

   async verifySubTotal(expectedPrice: string ,expectedQty: string) {
     let expectedSubtotal;
     const price = parseFloat(expectedPrice.replace('$', ''));
     const qty = parseInt(expectedQty);
     expectedSubtotal = `$${(price * qty).toFixed(2)}`;
     return expectedSubtotal;

   }

  async verifySumTotal(subtotals: string[]) {
    const sum = subtotals
        .map(s => parseFloat(s.replace('$', '')))
        .reduce((total, current) => total + current, 0);

    return `${sum.toFixed(2)}`;
  }

  async extractUIText() {
    let extractedValue;
    const uiTotal = await this.totalValue.innerText();
    extractedValue = parseFloat(uiTotal.replace('Total:', '').trim());
    return extractedValue;

  }
}
