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

test('gear set stat summary', async ({ page }) => {
  await page.goto('/gear-sets');

  await page.getByLabel('Element type *').click();
  await page.getByRole('option', { name: 'flame-icon Flame' }).click();

  await page
    .getByTestId('Eyepiece')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page.getByRole('option', { name: 'HP', exact: true }).click();
  await page
    .getByTestId('Eyepiece')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('Eyepiece')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('4125');

  await page
    .getByTestId('Eyepiece')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Volt Resistance %', exact: true })
    .click();
  await page
    .getByTestId('Eyepiece')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('Eyepiece')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('16.87%');

  await page
    .getByTestId('Eyepiece')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'Crit Rate %', exact: true }).click();
  await page
    .getByTestId('Eyepiece')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('Eyepiece')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('5.81%');

  await page
    .getByTestId('Eyepiece')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page
    .getByRole('option', { name: 'Physical Attack', exact: true })
    .click();
  await page
    .getByTestId('Eyepiece')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('Eyepiece')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('69');

  await page
    .getByTestId('Gloves')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page.getByRole('option', { name: 'Crit', exact: true }).click();
  await page
    .getByTestId('Gloves')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('Gloves')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('3269');

  await page
    .getByTestId('Gloves')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Frost Resistance', exact: true })
    .click();
  await page
    .getByTestId('Gloves')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('Gloves')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('1112');

  await page
    .getByTestId('Gloves')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'Flame Attack', exact: true }).click();
  await page
    .getByTestId('Gloves')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('Gloves')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('1090');

  await page
    .getByTestId('Gloves')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'Frost Attack', exact: true }).click();
  await page
    .getByTestId('Gloves')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('Gloves')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('1011');

  await page
    .getByTestId('Combat Engine')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page
    .getByRole('option', { name: 'Flame Damage %', exact: true })
    .click();
  await page
    .getByTestId('Combat Engine')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('Combat Engine')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('3.53%');

  await page
    .getByTestId('Combat Engine')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Flame Attack %', exact: true })
    .click();
  await page
    .getByTestId('Combat Engine')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('Combat Engine')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('1.26%');

  await page
    .getByTestId('Combat Engine')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page
    .getByRole('option', { name: 'Frost Resistance %', exact: true })
    .click();
  await page
    .getByTestId('Combat Engine')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('Combat Engine')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('16.87%');

  await page
    .getByTestId('Combat Engine')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page
    .getByRole('option', { name: 'Physical Resistance', exact: true })
    .click();
  await page
    .getByTestId('Combat Engine')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('Combat Engine')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('215');

  await expect(
    page.getByTestId('current-gear-set-stat-summary')
  ).toHaveScreenshot();
});
