import { expect, test } from '@playwright/test';

const totalAttack = '31,000';
const baseAttack = '25,000';
const crit = '13,000';
const critPercent = '18%';
const critDamage = '55%';
const characterLevel = '90';
const buffValue = '12%';

const exampleGearDirectory = './example-images/gear';

test('persists user stat values without element being chosen, then copies over and persists elemental specific user stat values when element is chosen', async ({
  page,
}) => {
  await page.goto('/gear-comparer');

  // Choose element, fill values
  await page.getByLabel('Elemental type to compare *').click();
  await page.getByRole('option', { name: 'Frost' }).click();
  await page.getByLabel('Total attack (Frost) *').click();
  await page.getByLabel('Total attack (Frost) *').fill(totalAttack);
  await page.getByLabel('Base attack (Frost) *').click();
  await page.getByLabel('Base attack (Frost) *').fill(baseAttack);
  await page.getByLabel('Crit *').click();
  await page.getByLabel('Crit *').fill(crit);
  await page.getByLabel('Crit % *').click();
  await page.getByLabel('Crit % *').fill(critPercent);
  await page.getByLabel('Crit Damage % *').click();
  await page.getByLabel('Crit Damage % *').fill(critDamage);
  await page.getByLabel('Character level').click();
  await page.getByLabel('Character level').fill(characterLevel);
  await page.getByLabel('Misc. attack % buffs').click();
  await page.getByLabel('Misc. attack % buffs').fill(buffValue);
  await page.getByLabel('Damage % (Frost) from all other gear pieces').click();
  await page
    .getByLabel('Damage % (Frost) from all other gear pieces')
    .fill(buffValue);
  await page.getByLabel('Misc. crit rate % buffs').click();
  await page.getByLabel('Misc. crit rate % buffs').fill(buffValue);
  await page.getByLabel('Misc. crit damage % buffs').click();
  await page.getByLabel('Misc. crit damage % buffs').fill(buffValue);

  // Check persisted fill values
  await page.reload();
  await expect(page.getByLabel('Total attack (Frost) *')).toHaveValue(
    totalAttack
  );
  await expect(page.getByLabel('Base attack (Frost) *')).toHaveValue(
    baseAttack
  );
  await expect(page.getByLabel('Crit *')).toHaveValue(crit);
  await expect(page.getByLabel('Crit % *')).toHaveValue(critPercent);
  await expect(page.getByLabel('Crit Damage % *')).toHaveValue(critDamage);
  await expect(page.getByLabel('Character level')).toHaveValue(characterLevel);
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

  // Choose another element, check values reset
  await page.getByLabel('Elemental type to compare *').click();
  await page.getByRole('option', { name: 'Physical' }).click();
  await expect(page.getByLabel('Total attack (Physical) *')).toHaveValue('0');
  await expect(page.getByLabel('Base attack (Physical) *')).toHaveValue('0');
  await expect(page.getByLabel('Crit *')).toHaveValue('0');
  await expect(page.getByLabel('Crit % *')).toHaveValue('0%');
  await expect(page.getByLabel('Crit Damage % *')).toHaveValue('50%');
  await expect(page.getByLabel('Character level')).toHaveValue(characterLevel);
  await expect(page.getByLabel('Misc. attack % buffs')).toHaveValue('0%');
  await expect(
    page.getByLabel('Damage % (Physical) from all other gear pieces')
  ).toHaveValue('0%');
  await expect(page.getByLabel('Misc. crit rate % buffs')).toHaveValue('0%');
  await expect(page.getByLabel('Misc. crit damage % buffs')).toHaveValue('0%');
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

  await page.getByRole('button', { name: 'Roll breakdown' }).click();
  await expect(
    page.getByTestId('roll-breakdown-panel-content')
  ).toHaveScreenshot();
});

test('gear value is calculated correctly', async ({ page }) => {
  await page.goto('/gear-comparer');

  // Test atk, ele atk, atk%
  await page.getByLabel('Select gear type').first().click();
  await page.getByRole('option', { name: 'Eyepiece' }).click();

  await page.getByLabel('Stat').getByRole('combobox').first().click();
  await page.getByRole('option', { name: 'Attack', exact: true }).click();
  await page.getByLabel('stat-value-input').getByRole('textbox').click();
  await page.getByLabel('stat-value-input').getByRole('textbox').fill('252');

  await page.getByLabel('Stat').getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: 'Frost Attack', exact: true }).click();
  await page.getByLabel('stat-value-input').getByRole('textbox').nth(1).click();
  await page
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('343');

  await page.getByLabel('Stat').getByRole('combobox').nth(2).click();
  await page
    .getByRole('option', { name: 'Physical Attack', exact: true })
    .click();
  await page.getByLabel('stat-value-input').getByRole('textbox').nth(2).click();
  await page
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('464');

  await page.getByLabel('Stat').getByRole('combobox').nth(3).click();
  await page
    .getByRole('option', { name: 'Physical Attack %', exact: true })
    .click();
  await page.getByLabel('stat-value-input').getByRole('textbox').nth(3).click();
  await page
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('11.3%');

  await page.getByLabel('Elemental type to compare *').click();
  await page.getByRole('option', { name: 'frost-icon Frost' }).click();
  await page.getByLabel('Total attack (Frost) *').click();
  await page.getByLabel('Total attack (Frost) *').fill(totalAttack);
  await page.getByLabel('Base attack (Frost) *').click();
  await page.getByLabel('Base attack (Frost) *').fill(baseAttack);
  await page.getByLabel('Crit *').click();
  await page.getByLabel('Crit *').fill(crit);
  await page.getByLabel('Crit % *').click();
  await page.getByLabel('Crit % *').fill(critPercent);
  await page.getByLabel('Crit Damage % *').click();
  await page.getByLabel('Crit Damage % *').fill(critDamage);
  await page.getByLabel('Character level').click();
  await page.getByLabel('Character level').fill(characterLevel);

  await expect(page.getByTestId('gear-value-GearA')).toHaveText('2.44%');

  // Test persistence and recalculation
  await page.reload();
  await expect(page.getByTestId('gear-value-GearA')).toHaveText('2.44%');

  // Test swap elements
  await page.getByLabel('Elemental type to compare *').click();
  await page.getByRole('option', { name: 'physical-icon Physical' }).click();
  await page.getByLabel('Total attack (Physical) *').click();
  await page.getByLabel('Total attack (Physical) *').fill(totalAttack);
  await page.getByLabel('Base attack (Physical) *').click();
  await page.getByLabel('Base attack (Physical) *').fill(baseAttack);
  await page.getByLabel('Crit *').click();
  await page.getByLabel('Crit *').fill(crit);
  await page.getByLabel('Crit % *').click();
  await page.getByLabel('Crit % *').fill(critPercent);
  await page.getByLabel('Crit Damage % *').click();
  await page.getByLabel('Crit Damage % *').fill(critDamage);
  await expect(page.getByTestId('gear-value-GearA')).toHaveText('13.27%');

  // Test crit % & changing gear stat
  await page.reload();
  await page.getByLabel('Stat').getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: 'Crit Rate %', exact: true }).click();
  await page.getByLabel('stat-value-input').getByRole('textbox').nth(1).click();
  await page
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('12%');
  await expect(page.getByTestId('gear-value-GearA')).toHaveText('18.87%');

  // Test dmg%
  await page.getByLabel('Select gear type').nth(1).click();
  await page.getByRole('option', { name: 'Microreactor' }).click();

  await page.getByLabel('Stat').getByRole('combobox').nth(4).click();
  await page
    .getByRole('option', { name: 'Physical Damage %', exact: true })
    .click();
  await page.getByLabel('stat-value-input').getByRole('textbox').nth(4).click();
  await page
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(4)
    .fill('23%');
  await expect(page.getByTestId('gear-value-GearB')).toHaveText('23%');

  // Test atk% buffs
  await page.getByLabel('Misc. attack % buffs').click();
  await page.getByLabel('Misc. attack % buffs').fill('7');
  await page
    .locator('label')
    .filter({ hasText: 'Fiona 2pc+16%/+18%/+20%/+22%' })
    .getByLabel('controlled')
    .check();
  // TODO: Fix this flaky selector
  await page
    .locator('.MuiPaper-root > .MuiRating-root > label:nth-child(5)')
    .nth(1) // Fiona 3*
    .click();
  await expect(page.getByTestId('gear-value-GearA')).toHaveText('16.66%');

  // Test dmg% buffs
  await page
    .getByLabel('Damage % (Physical) from all other gear pieces')
    .click();
  await page
    .getByLabel('Damage % (Physical) from all other gear pieces')
    .fill('7');
  await expect(page.getByTestId('gear-value-GearB')).toHaveText('21.5%');

  // Test crit rate %
  await page.getByLabel('Misc. crit rate % buffs').click();
  await page.getByLabel('Misc. crit rate % buffs').fill('9');
  await page
    .locator('label')
    .filter({ hasText: 'Annabella+10.5%' })
    .getByLabel('controlled')
    .check();
  await expect(page.getByTestId('gear-value-GearA')).toHaveText('16.25%');

  // Test crit dmg %
  await page.getByLabel('Misc. crit damage % buffs').click();
  await page.getByLabel('Misc. crit damage % buffs').fill('3.7%');
  await page
    .locator('label')
    .filter({ hasText: 'Crow 2pc+14.4%/+18%/+21.6%/+25.2%' })
    .getByLabel('controlled')
    .check();
  await expect(page.getByTestId('gear-value-GearA')).toHaveText('17.3%');
});
