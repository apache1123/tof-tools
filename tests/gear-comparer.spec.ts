import { expect, test } from '@playwright/test';

const baseAttack = '25,000';
const crit = '13,000';
const characterLevel = '90';
const buffValue = '12%';

const exampleGearDirectory = './example-images/gear';

test('persists user stat values without element being chosen, then copies over and persists elemental specific user stat values when element is chosen', async ({
  page,
}) => {
  await page.goto('/gear-comparer');

  // Fill values, without element
  await page.getByLabel('Base attack *').click();
  await page.getByLabel('Base attack *').fill(baseAttack);
  await page.getByLabel('Crit *').click();
  await page.getByLabel('Crit *').fill(crit);
  await page.getByLabel('Character level').click();
  await page.getByLabel('Character level').fill(characterLevel);
  await page.getByLabel('Attack % from all other gear pieces').click();
  await page.getByLabel('Attack % from all other gear pieces').fill(buffValue);
  await page.getByLabel('Misc. attack % buffs').click();
  await page.getByLabel('Misc. attack % buffs').fill(buffValue);
  await page.getByLabel('Damage % from all other gear pieces').click();
  await page.getByLabel('Damage % from all other gear pieces').fill(buffValue);
  await page.getByLabel('Misc. crit rate % buffs').click();
  await page.getByLabel('Misc. crit rate % buffs').fill(buffValue);
  await page.getByLabel('Misc. crit damage % buffs').click();
  await page.getByLabel('Misc. crit damage % buffs').fill(buffValue);

  // Check persisted fill values, without element
  await page.reload();
  await expect(page.getByLabel('Base attack *')).toHaveValue(baseAttack);
  await expect(page.getByLabel('Crit *')).toHaveValue(crit);
  await expect(page.getByLabel('Character level')).toHaveValue(characterLevel);
  await expect(
    page.getByLabel('Attack % from all other gear pieces')
  ).toHaveValue(buffValue);
  await expect(page.getByLabel('Misc. attack % buffs')).toHaveValue(buffValue);
  await expect(
    page.getByLabel('Damage % from all other gear pieces')
  ).toHaveValue(buffValue);
  await expect(page.getByLabel('Misc. crit rate % buffs')).toHaveValue(
    buffValue
  );
  await expect(page.getByLabel('Misc. crit damage % buffs')).toHaveValue(
    buffValue
  );

  // Choose element, check persisted values still same
  await page.getByLabel('Elemental type to compare *').click();
  await page.getByRole('option', { name: 'Frost' }).click();
  await page.reload();
  await expect(
    page
      .locator('[id="__next"] div')
      .filter({ hasText: 'Elemental type to compare *Frost' })
      .nth(3)
  ).toBeVisible();
  await expect(page.getByLabel('Base attack (Frost) *')).toHaveValue(
    baseAttack
  );
  await expect(page.getByLabel('Crit *')).toHaveValue(crit);
  await expect(page.getByLabel('Character level')).toHaveValue(characterLevel);
  await expect(
    page.getByLabel('Attack % (Frost) from all other gear pieces')
  ).toHaveValue(buffValue);
  await expect(page.getByLabel('Misc. attack % buffs')).toHaveValue(buffValue);
  await expect(
    page.getByLabel('Damage % (Frost) from all other gear pieces')
  ).toHaveValue(buffValue);
  await expect(page.getByLabel('Misc. crit rate % buffs')).toHaveValue(
    buffValue
  );
  await expect(page.getByLabel('Misc. crit damage % buffs')).toHaveValue(
    buffValue
  );
});

test('upload gear, ocr fills in correct gear', async ({ page }) => {
  await page.goto('/gear-comparer');

  await page.getByLabel('upload-gear').first().click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByLabel('Select image').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(`${exampleGearDirectory}/spaulders_1.png`);
  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(
    page
      .locator(
        '.MuiBox-root > div > div:nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root'
      )
      .first()
      .getByLabel('Stat')
  ).toHaveValue('Physical Resistance');
  await expect(
    page
      .locator('.MuiBox-root > div > div:nth-child(3)')
      .first()
      .getByRole('textbox')
  ).toHaveValue('215');
  await expect(
    page
      .locator(
        'div:nth-child(2) > div:nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root'
      )
      .first()
      .getByLabel('Stat')
  ).toHaveValue('Attack');
  await expect(
    page
      .locator('div:nth-child(2) > div:nth-child(3)')
      .first()
      .getByRole('textbox')
  ).toHaveValue('485');
  await expect(
    page
      .locator(
        'div:nth-child(3) > div:nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root'
      )
      .first()
      .getByLabel('Stat')
  ).toHaveValue('Physical Attack');
  await expect(
    page
      .locator('div:nth-child(3) > div:nth-child(3)')
      .first()
      .getByRole('textbox')
  ).toHaveValue('505');
  await expect(
    page
      .locator(
        'div:nth-child(4) > div:nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root'
      )
      .first()
      .getByLabel('Stat')
  ).toHaveValue('Volt Attack');
  await expect(
    page
      .locator('div:nth-child(4) > div:nth-child(3)')
      .first()
      .getByRole('textbox')
  ).toHaveValue('69');

  await page.getByRole('button', { name: 'Roll details' }).click();
  await expect(
    page.getByText(
      'For a 4 star gear:Physical Resistance: 0 rollsAttack: 2 rolls, strength: 88%Phys'
    )
  ).toHaveScreenshot();
});
