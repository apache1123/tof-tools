import { expect, test } from '@playwright/test';

test('add, rename, delete gear set', async ({ page }) => {
  await page.goto('/gear-sets');
  await page.getByRole('tab', { name: 'Add' }).click();
  await expect(page.getByLabel('Name')).toHaveValue('Set 2');
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('New set');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('tab', { name: 'New set' }).click();
  await expect(page.getByRole('heading', { name: 'New set' })).toBeVisible();
  await page.locator('.MuiStack-root > .MuiButtonBase-root').click();
  await page.locator('.MuiInputBase-input').first().click();
  await page.locator('.MuiInputBase-input').first().fill('New set edited');
  await page.locator('.MuiStack-root > button').first().click();
  await expect(
    page.getByRole('heading', { name: 'New set edited' })
  ).toBeVisible();
  await page
    .locator('.MuiStack-root > .MuiBox-root > .MuiButtonBase-root')
    .click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Set 1Add')).toBeVisible();
});
