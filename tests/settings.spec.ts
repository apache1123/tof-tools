import test, { expect } from '@playwright/test';

import { tempTestFolderPath } from './constants';
import { dismissChangelog } from './helpers/dismiss-changelog';

test('Export/Import app data works', async ({ page, browser }) => {
  await page.goto('/gear-comparer');
  await dismissChangelog(page);

  await page.getByLabel('Base attack (Flame) *').click();
  await page.getByLabel('Base attack (Flame) *').fill('10');

  await expect(page.getByLabel('Base attack (Flame) *')).toHaveValue('10');

  await page.goto('/settings');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export' }).click();
  const download = await downloadPromise;
  const downloadPath = `${tempTestFolderPath}/${download.suggestedFilename()}`;
  await download.saveAs(downloadPath);

  const secondContext = await browser.newContext();
  const secondPage = await secondContext.newPage();
  await secondPage.goto('/gear-comparer');
  await dismissChangelog(secondPage);

  await expect(secondPage.getByLabel('Base attack (Flame) *')).toHaveValue('0');

  await secondPage.goto('/settings');

  const fileChooserPromise = secondPage.waitForEvent('filechooser');
  await secondPage.getByRole('button', { name: 'Import' }).click();
  const fileChooser = await fileChooserPromise;

  await fileChooser.setFiles(downloadPath);

  await secondPage.goto('/gear-comparer');

  await expect(secondPage.getByLabel('Base attack (Flame) *')).toHaveValue(
    '10'
  );
});
