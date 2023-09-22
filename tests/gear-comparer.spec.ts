import { expect, test } from '@playwright/test';

const totalAttack = '32,000';
const baseAttack = '25,000';
const crit = '13,000';
const critPercent = '18%';
const critDamage = '55%';
const characterLevel = '95';
const buffValue = '12%';

const exampleGearDirectory = './example-images/gear';

test('persists element specific user stat values', async ({ page }) => {
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

  await page.getByLabel('Elemental type to compare *').click();
  await page.getByRole('option', { name: 'flame-icon Flame' }).click();
  await page.getByLabel('Total attack (Flame) *').click();
  await page.getByLabel('Total attack (Flame) *').fill(totalAttack);
  await page.getByLabel('Base attack (Flame) *').click();
  await page.getByLabel('Base attack (Flame) *').fill(baseAttack);
  await page.getByLabel('Crit *').click();
  await page.getByLabel('Crit *').fill(crit);
  await page.getByLabel('Character level').click();
  await page.getByLabel('Character level').fill(characterLevel);

  // Test atk%, crit rate%, crit dmg% related buffs
  await page.getByTestId('weapon1').getByLabel('Select weapon').click();
  await page.getByRole('option', { name: 'Ruby' }).click();
  await page
    .getByTestId('weapon1')
    .getByLabel('Select matrices')
    .first()
    .click();
  await page.getByRole('option', { name: 'Ruby 2pc' }).click();

  await page.getByTestId('weapon2').getByLabel('Select weapon').click();
  await page.getByRole('option', { name: 'Annabella' }).click();
  await page
    .getByTestId('weapon2')
    .locator('label')
    .filter({ hasText: '6 Stars' })
    .click();
  await page.getByTestId('weapon2').getByLabel('4pc').click();
  await page.getByTestId('weapon2').getByLabel('Select matrices').click();
  await page.getByRole('option', { name: 'Annabella 4pc' }).click();
  await page
    .getByTestId('weapon2')
    .locator('label')
    .filter({ hasText: '3 Stars' })
    .nth(1)
    .click();

  await page.getByTestId('weapon3').getByLabel('Select weapon').click();
  await page.getByRole('option', { name: 'Fiona' }).click();
  await page
    .getByTestId('weapon3')
    .locator('label')
    .filter({ hasText: '6 Stars' })
    .click();
  await page.getByLabel('Select matrices').nth(3).click();
  await page.getByRole('option', { name: 'Fiona 2pc' }).click();
  await page
    .getByTestId('weapon3')
    .locator('label')
    .filter({ hasText: '3 Stars' })
    .nth(1)
    .click();

  // Test ele atk, crit gear
  await page.getByTestId('GearA').getByLabel('Select gear type').click();
  await page.getByRole('option', { name: 'Gloves' }).click();

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page.getByRole('option', { name: 'Crit', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('3493');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Physical Attack', exact: true })
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('593');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'Frost Attack', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('69');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'HP', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('4125');

  await expect(page.getByTestId('gear-value-GearA')).toHaveText('6.22%');
  await expect(page.getByTestId('gear-max-titan-value-GearA')).toHaveText(
    '9.02%'
  );

  // Test persistence and recalculation
  await page.reload();
  await expect(page.getByTestId('gear-value-GearA')).toHaveText('6.22%');
  await expect(page.getByTestId('gear-max-titan-value-GearA')).toHaveText(
    '9.02%'
  );

  // Test swap elements
  await page.getByLabel('Elemental type to compare *').click();
  await page.getByRole('option', { name: 'frost-icon Frost' }).click();
  await page.getByLabel('Total attack (Frost) *').click();
  await page.getByLabel('Total attack (Frost) *').fill(totalAttack);
  await page.getByLabel('Base attack (Frost) *').click();
  await page.getByLabel('Base attack (Frost) *').fill(baseAttack);
  await page.getByLabel('Crit *').click();
  await page.getByLabel('Crit *').fill(crit);

  // Test ele atk%, atk gear on GearB
  await page.getByTestId('GearB').getByLabel('Select gear type').click();
  await page.getByRole('option', { name: 'Combat Engine' }).click();

  await page
    .getByTestId('GearB')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page
    .getByRole('option', { name: 'Frost Attack %', exact: true })
    .click();
  await page
    .getByTestId('GearB')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('GearB')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('4.14%');

  await page
    .getByTestId('GearB')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page.getByRole('option', { name: 'Attack', exact: true }).click();
  await page
    .getByTestId('GearB')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('GearB')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('460');

  await page
    .getByTestId('GearB')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'HP', exact: true }).click();
  await page
    .getByTestId('GearB')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('GearB')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('4125');

  await page
    .getByTestId('GearB')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'Resistance', exact: true }).click();
  await page
    .getByTestId('GearB')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('GearB')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('270');

  // Assert value without buffs
  await expect(page.getByTestId('gear-value-GearA')).toHaveText('5.96%');
  await expect(page.getByTestId('gear-max-titan-value-GearA')).toHaveText(
    '12.24%'
  );
  await expect(page.getByTestId('gear-value-GearB')).toHaveText('5.14%');
  await expect(page.getByTestId('gear-max-titan-value-GearB')).toHaveText(
    '7.19%'
  );

  // Test frost buffs (atk%)
  await page.getByTestId('weapon1').getByLabel('Select weapon').click();
  await page.getByRole('option', { name: 'Lin' }).click();
  await page
    .getByTestId('weapon1')
    .locator('label')
    .filter({ hasText: '6 Stars' })
    .click();
  await page
    .getByTestId('weapon1')
    .getByLabel('Select matrices')
    .first()
    .click();
  await page.getByRole('option', { name: 'Lin 2pc' }).click();
  await page
    .getByTestId('weapon1')
    .locator('label')
    .filter({ hasText: '3 Stars' })
    .nth(1)
    .click();

  await page.getByTestId('weapon2').getByLabel('Select weapon').click();
  await page.getByRole('option', { name: 'Frigg' }).click();
  await page
    .getByTestId('weapon2')
    .locator('label')
    .filter({ hasText: '6 Stars' })
    .click();
  await page
    .getByTestId('weapon2')
    .getByLabel('Select matrices')
    .first()
    .click();
  await page.getByRole('option', { name: 'Frigg 2pc' }).click();
  await page
    .getByTestId('weapon2')
    .locator('label')
    .filter({ hasText: '2 Stars' })
    .nth(1)
    .click();

  await page.getByTestId('weapon3').getByLabel('Select weapon').click();
  await page.getByRole('option', { name: 'Fiona' }).click();
  await page
    .getByTestId('weapon3')
    .getByLabel('Select matrices')
    .first()
    .click();
  await page.getByRole('option', { name: 'Fiona 2pc' }).click();
  await page
    .getByTestId('weapon3')
    .locator('label')
    .filter({ hasText: '1 Star' })
    .nth(1)
    .click();

  // Assert value with buffs
  await expect(page.getByTestId('gear-value-GearA')).toHaveText('5.96%');
  await expect(page.getByTestId('gear-max-titan-value-GearA')).toHaveText(
    '12.24%'
  );
  await expect(page.getByTestId('gear-value-GearB')).toHaveText('3.59%');
  await expect(page.getByTestId('gear-max-titan-value-GearB')).toHaveText(
    '5.22%'
  );
});

test('stat values at max titan is calculated correctly', async ({ page }) => {
  await page.goto('/gear-comparer');

  // Test ele atk pull-up with 2 random ele atk stats
  await page.getByTestId('GearA').getByLabel('Select gear type').click();
  await page.getByRole('option', { name: 'Gloves' }).click();

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page.getByRole('option', { name: 'Crit', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('3493');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Physical Attack', exact: true })
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('593');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'Frost Attack', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('69');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'HP', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('4125');

  await page
    .getByTestId('GearA')
    .getByRole('button', { name: 'Stat values at max titan' })
    .click();
  await expect(
    page.getByTestId('GearA').getByTestId('max-titan-stats-panel-content')
  ).toHaveScreenshot();

  // Test ele atk pull-up with 3 random ele atk stats
  await page.getByTestId('GearA').getByLabel('Select gear type').click();
  await page.getByRole('option', { name: 'Gloves' }).click();

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page.getByRole('option', { name: 'Flame Attack', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('562');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Physical Attack', exact: true })
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('69');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'Crit', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('2356');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'Volt Attack', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('247');

  await expect(
    page.getByTestId('GearA').getByTestId('max-titan-stats-panel-content')
  ).toHaveScreenshot();

  // Test random resistance stats do not get pulled-up
  await page.getByTestId('GearA').getByLabel('Select gear type').click();
  await page.getByRole('option', { name: 'Gloves' }).click();

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page
    .getByRole('option', { name: 'Volt Resistance', exact: true })
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('1178');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Flame Resistance', exact: true })
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('2516');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'HP', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('16759');

  await page
    .getByTestId('GearA')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'Attack', exact: true }).click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('GearA')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('52');

  await expect(
    page.getByTestId('GearA').getByTestId('max-titan-stats-panel-content')
  ).toHaveScreenshot();
});
