import test, { expect } from '@playwright/test';

import { tempTestFolderPath } from './constants';

test('Export/Import app data works', async ({ page, browser }) => {
  await page.goto('/gear-comparer');

  await page.getByLabel('Elemental type to compare *').click();
  await page.getByRole('option', { name: 'Frost' }).click();

  await page.getByLabel('Total attack (Frost) *').click();
  await page.getByLabel('Total attack (Frost) *').fill('10');

  await expect(page.getByLabel('Total attack (Frost) *')).toBeVisible();
  await expect(page.getByLabel('Total attack (Frost) *')).toHaveValue('10');

  await page.goto('/settings');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export' }).click();
  const download = await downloadPromise;
  const downloadPath = `${tempTestFolderPath}/${download.suggestedFilename()}`;
  await download.saveAs(downloadPath);

  const secondContext = await browser.newContext();
  const secondPage = await secondContext.newPage();
  await secondPage.goto('/gear-comparer');

  await expect(page.getByLabel('Total attack (Frost) *')).not.toBeVisible();

  await secondPage.goto('/settings');

  const fileChooserPromise = secondPage.waitForEvent('filechooser');
  await secondPage.getByRole('button', { name: 'Import' }).click();
  const fileChooser = await fileChooserPromise;

  await fileChooser.setFiles(downloadPath);

  await secondPage.goto('/gear-comparer');

  await expect(secondPage.getByLabel('Total attack (Frost) *')).toBeVisible();
  await expect(secondPage.getByLabel('Total attack (Frost) *')).toHaveValue(
    '10'
  );
});
