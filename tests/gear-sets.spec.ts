import { expect, test } from '@playwright/test';

test('add, rename, delete gear set', async ({ page }) => {
  await page.goto('/gear-sets');

  // Add
  await page.getByRole('tab', { name: 'Add' }).click();
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('Set 2');
  await page.getByLabel('Name', { exact: true }).click();
  await page.getByLabel('Name', { exact: true }).fill('New set');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByRole('heading', { name: 'New set' })).toBeVisible();

  // Rename
  await page.getByLabel('edit-gear-set-name').click();
  await page.locator('.MuiInputBase-input').first().click();
  await page.locator('.MuiInputBase-input').first().fill('New set edited');
  await page.locator('.MuiStack-root > button').first().click();
  await expect(
    page.getByRole('heading', { name: 'New set edited' })
  ).toBeVisible();

  // Delete
  await page.getByLabel('delete-gear-set').click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Set 1Add')).toBeVisible();
});
