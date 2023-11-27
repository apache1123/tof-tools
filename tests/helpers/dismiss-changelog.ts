import { expect, type Page } from '@playwright/test';

export async function dismissChangelog(page: Page) {
  await expect(page.getByRole('heading', { name: 'Changelog' })).toBeVisible();
  await page.keyboard.press('Escape');
}
