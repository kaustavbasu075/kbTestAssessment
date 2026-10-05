import { test, expect } from '../fixtures/appFixtures';
import { errorMessages } from '../testData/errorMessages';
import { normalizeCurrency } from '../utils/helper';

test('Test Case: 1', async ({ page, landingPage, contactPage}) => {
  await page.goto('');

  await expect(landingPage.landingPageText).toHaveText('Jupiter Toys');
  await landingPage.clickNavigateToContact.click();
  await expect(contactPage.contactPageHeaderText).toContainText('We welcome your feedback');
  await contactPage.submitButton.click();
  await expect(contactPage.errorMessages).toContainText(errorMessages.contactPageErrorMessages);
  await expect(contactPage.contactPageHeaderText).toContainText(
    "we won't get it unless you complete the form correctly.",
  );
  await contactPage.fillDetails('Test1','Test1@test.com','Testing1');
  await expect(contactPage.errorMessages).not.toBeVisible();
});

test.describe('Repeat my test 5 times', () => {
  for (let i = 0; i < 5; i++) {
    test(`Test Case 2: Iteration ${i + 1}`, async ({page, landingPage, contactPage}) => {
      await page.goto('');

      await expect(landingPage.landingPageText).toHaveText('Jupiter Toys');
      await landingPage.clickNavigateToContact.click();
      await expect(contactPage.contactPageHeaderText).toContainText('We welcome your feedback');

      await contactPage.fillDetails('Test2', 'Test2@test.com', 'Testing2');
      await contactPage.submitButton.click();

      await contactPage.waitForSuccessMessage();
      await expect(contactPage.successfulText).toContainText('Thanks');
      await expect(contactPage.goBackButton).toBeVisible();
    });
  }
});
test('Test Case 3', async ({ page ,landingPage, shopPage, cartPage }) => {
  await page.goto('');

  await expect(landingPage.landingPageText).toHaveText('Jupiter Toys');
  await landingPage.clickNavigateToShop.click();

  const products = await shopPage.getProducts([2, 4, 7]);

  expect(products[0].title).toBe('Stuffed Frog');
  expect(products[0].price).toBe('$10.99');
  expect(products[0].isVisible).toBe(true);

  expect(products[1].title).toBe('Fluffy Bunny');
  expect(products[1].price).toBe('$9.99');
  expect(products[1].isVisible).toBe(true);

  expect(products[2].title).toBe('Valentine Bear');
  expect(products[2].price).toBe('$14.99');
  expect(products[2].isVisible).toBe(true);

  await shopPage.addToCart(2,2);
  await shopPage.addToCart(4,5);
  await shopPage.addToCart(7,3);

  await expect(cartPage.cartCount).toHaveText('10');
  await cartPage.cartNavigation.click();

  const dataItems1 = await cartPage.verifyCartItem('Stuffed Frog')
  expect(dataItems1['Price']).toBe('$10.99');
  expect(dataItems1['Quantity']).toBe('2');
  const subtotalProduct1 =await cartPage.verifySubTotal('$10.99', '2');
  expect(dataItems1['Subtotal']).toBe(subtotalProduct1);

  const dataItems2 = await cartPage.verifyCartItem('Fluffy Bunny')
  expect(dataItems2['Price']).toBe('$9.99');
  expect(dataItems2['Quantity']).toBe('5');
  const subtotalProduct2 =await cartPage.verifySubTotal('$9.99', '5');
  expect(dataItems2['Subtotal']).toBe(subtotalProduct2);

  const dataItems3 = await cartPage.verifyCartItem('Valentine Bear')
  expect(dataItems3['Price']).toBe('$14.99');
  expect(dataItems3['Quantity']).toBe('3');
  const subtotalProduct3 =await cartPage.verifySubTotal('$14.99', '3');
  expect(dataItems3['Subtotal']).toBe(subtotalProduct3);

  const totalSum = await cartPage.verifySumTotal([subtotalProduct1, subtotalProduct2, subtotalProduct3])
  const uiTotalValue = await cartPage.extractUIText();
  expect(normalizeCurrency(uiTotalValue)).toBe(normalizeCurrency(totalSum));



});
