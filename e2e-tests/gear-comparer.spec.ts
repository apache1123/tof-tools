import { expect, test } from '@playwright/test';

import { dismissChangelog } from './helpers/dismiss-changelog';

const baseAttack = '25,000';
const crit = '13,000';
const characterLevel = '95';

const exampleGearDirectory = './example-images/gear';

test('persists element specific user stat values', async ({ page }) => {
  await page.goto('/gear-comparer');
  await dismissChangelog(page);

  // Choose element, fill values
  await page.getByLabel('Base attack (Flame) *').click();
  await page.getByLabel('Base attack (Flame) *').fill(baseAttack);
  await page.getByLabel('Crit *').click();
  await page.getByLabel('Crit *').fill(crit);
  await page.getByLabel('Wanderer level').click();
  await page.getByLabel('Wanderer level').fill(characterLevel);

  // Check persisted fill values
  await page.reload();
  await expect(page.getByLabel('Base attack (FLame) *')).toHaveValue(
    baseAttack
  );
  await expect(page.getByLabel('Crit *')).toHaveValue(crit);
  await expect(page.getByLabel('Wanderer level')).toHaveValue(characterLevel);

  // Choose another element, check values reset
  await page.getByLabel('Choose Loadout').click();
  await page.getByRole('option', { name: 'physical-icon Physical' }).click();
  await expect(page.getByLabel('Base attack (Physical) *')).toHaveValue('0');
  await expect(page.getByLabel('Crit *')).toHaveValue('0');
  await expect(page.getByLabel('Wanderer level')).toHaveValue(characterLevel);
});

test('import gear, ocr fills in correct gear', async ({ page }) => {
  await page.goto('/gear-comparer');
  await dismissChangelog(page);

  await page
    .getByTestId('loadout-gear')
    .getByLabel('import-gear')
    .first()
    .click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByLabel('Select image').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(`${exampleGearDirectory}/spaulders_1.png`);
  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(
    page
      .getByTestId('loadout-gear')
      .getByLabel('Stat')
      .getByRole('combobox')
      .first()
  ).toHaveValue('Physical Resistance');
  await expect(
    page
      .getByTestId('loadout-gear')
      .getByLabel('stat-value-input')
      .getByRole('textbox')
      .first()
  ).toHaveValue('215');
  await expect(
    page
      .getByTestId('loadout-gear')
      .getByLabel('Stat')
      .getByRole('combobox')
      .nth(1)
  ).toHaveValue('Attack');
  await expect(
    page
      .getByTestId('loadout-gear')
      .getByLabel('stat-value-input')
      .getByRole('textbox')
      .nth(1)
  ).toHaveValue('485');
  await expect(
    page
      .getByTestId('loadout-gear')
      .getByLabel('Stat')
      .getByRole('combobox')
      .nth(2)
  ).toHaveValue('Physical Attack');
  await expect(
    page
      .getByTestId('loadout-gear')
      .getByLabel('stat-value-input')
      .getByRole('textbox')
      .nth(2)
  ).toHaveValue('505');
  await expect(
    page
      .getByTestId('loadout-gear')
      .getByLabel('Stat')
      .getByRole('combobox')
      .nth(3)
  ).toHaveValue('Volt Attack');
  await expect(
    page
      .getByTestId('loadout-gear')
      .getByLabel('stat-value-input')
      .getByRole('textbox')
      .nth(3)
  ).toHaveValue('69');

  await page
    .getByTestId('loadout-gear')
    .getByRole('button', { name: 'Roll breakdown' })
    .click();
  await expect(
    await page
      .getByTestId('loadout-gear')
      .getByTestId('roll-breakdown-panel-content')
      .textContent()
  ).toMatchSnapshot();
});

test('gear value is calculated correctly', async ({ page }) => {
  await page.goto('/gear-comparer');
  await dismissChangelog(page);

  await page.getByLabel('Base attack (Flame) *').click();
  await page.getByLabel('Base attack (Flame) *').fill(baseAttack);
  await page.getByLabel('Crit *').click();
  await page.getByLabel('Crit *').fill(crit);
  await page.getByLabel('Wanderer level').click();
  await page.getByLabel('Wanderer level').fill(characterLevel);

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
  await page.getByTestId('loadout-gear').getByLabel('Select gear type').click();
  await page
    .getByRole('option', { name: 'Gloves Gloves', exact: true })
    .click();

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page.getByRole('option', { name: 'Crit', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('3493');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Physical Attack', exact: true })
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('593');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'Frost Attack', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('69');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'HP', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('4125');

  await expect(page.getByTestId('loadout-gear-value')).toHaveText('6.22%');
  await expect(page.getByTestId('loadout-gear-max-titan-value')).toHaveText(
    '9.02%'
  );

  // Test persistence and recalculation
  await page.reload();
  await expect(page.getByTestId('loadout-gear-value')).toHaveText('6.22%');
  await expect(page.getByTestId('loadout-gear-max-titan-value')).toHaveText(
    '9.02%'
  );

  // Test swap loadouts
  await page.getByLabel('Choose Loadout').click();
  await page.getByRole('option', { name: 'frost-icon Frost' }).click();
  await page.getByLabel('Base attack (Frost) *').click();
  await page.getByLabel('Base attack (Frost) *').fill(baseAttack);
  await page.getByLabel('Crit *').click();
  await page.getByLabel('Crit *').fill(crit);

  // Test ele atk%, atk gear on replacement-gear
  await page
    .getByTestId('replacement-gear')
    .getByLabel('Select gear type')
    .click();
  await page
    .getByRole('option', { name: 'Combat Engine Combat Engine', exact: true })
    .click();

  await page
    .getByTestId('replacement-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page
    .getByRole('option', { name: 'Frost Attack %', exact: true })
    .click();
  await page
    .getByTestId('replacement-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('replacement-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('4.14%');

  await page
    .getByTestId('replacement-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page.getByRole('option', { name: 'Attack', exact: true }).click();
  await page
    .getByTestId('replacement-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('replacement-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('460');

  await page
    .getByTestId('replacement-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'HP', exact: true }).click();
  await page
    .getByTestId('replacement-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('replacement-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('4125');

  await page
    .getByTestId('replacement-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'Resistance', exact: true }).click();
  await page
    .getByTestId('replacement-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('replacement-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('270');

  // Assert value without buffs
  await expect(page.getByTestId('replacement-gear-value')).toHaveText('6.06%');
  await expect(page.getByTestId('replacement-gear-max-titan-value')).toHaveText(
    '8.35%'
  );

  // Test frost buffs (atk%)
  await page.getByTestId('weapon1').getByLabel('Select weapon').click();
  await page.getByRole('option', { name: 'Lin', exact: true }).click();
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
  await expect(page.getByTestId('replacement-gear-value')).toHaveText('3.64%');
  await expect(page.getByTestId('replacement-gear-max-titan-value')).toHaveText(
    '5.29%'
  );
});

test('stat values at max titan is calculated correctly', async ({ page }) => {
  await page.goto('/gear-comparer');
  await dismissChangelog(page);

  // Test ele atk pull-up with 2 random ele atk stats
  await page.getByTestId('loadout-gear').getByLabel('Select gear type').click();
  await page
    .getByRole('option', { name: 'Gloves Gloves', exact: true })
    .click();

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page.getByRole('option', { name: 'Crit', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('3493');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Physical Attack', exact: true })
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('593');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'Frost Attack', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('69');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'HP', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('4125');

  await page
    .getByTestId('loadout-gear')
    .getByRole('button', { name: 'Stat values at max titan' })
    .click();
  await expect(
    await page
      .getByTestId('loadout-gear')
      .getByTestId('max-titan-stats-panel-content')
      .textContent()
  ).toMatchSnapshot();

  // Test ele atk pull-up with 3 random ele atk stats
  await page.getByTestId('loadout-gear').getByLabel('Select gear type').click();
  await page
    .getByRole('option', { name: 'Gloves Gloves', exact: true })
    .click();

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page.getByRole('option', { name: 'Flame Attack', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('562');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Physical Attack', exact: true })
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('69');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'Crit', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('2356');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'Volt Attack', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('247');

  await expect(
    await page
      .getByTestId('loadout-gear')
      .getByTestId('max-titan-stats-panel-content')
      .textContent()
  ).toMatchSnapshot();

  // Test random resistance stats do not get pulled-up
  await page.getByTestId('loadout-gear').getByLabel('Select gear type').click();
  await page
    .getByRole('option', { name: 'Gloves Gloves', exact: true })
    .click();

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page
    .getByRole('option', { name: 'Volt Resistance', exact: true })
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('1178');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page
    .getByRole('option', { name: 'Flame Resistance', exact: true })
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('2516');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'HP', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('16759');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page.getByRole('option', { name: 'Attack', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('52');

  await expect(
    await page
      .getByTestId('loadout-gear')
      .getByTestId('max-titan-stats-panel-content')
      .textContent()
  ).toMatchSnapshot();

  // Test ele atk % pull-up
  await page.getByTestId('loadout-gear').getByLabel('Select gear type').click();
  await page
    .getByRole('option', { name: 'Microreactor Microreactor', exact: true })
    .click();

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .first()
    .click();
  await page
    .getByRole('option', { name: 'Flame Attack %', exact: true })
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .first()
    .fill('5.58%');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(1)
    .click();
  await page.getByRole('option', { name: 'Volt Attack', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(1)
    .fill('461');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(2)
    .click();
  await page.getByRole('option', { name: 'HP %', exact: true }).click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(2)
    .fill('0.94%');

  await page
    .getByTestId('loadout-gear')
    .getByLabel('Stat')
    .getByRole('combobox')
    .nth(3)
    .click();
  await page
    .getByRole('option', { name: 'Physical Attack', exact: true })
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .click();
  await page
    .getByTestId('loadout-gear')
    .getByLabel('stat-value-input')
    .getByRole('textbox')
    .nth(3)
    .fill('69');

  await expect(
    await page
      .getByTestId('loadout-gear')
      .getByTestId('max-titan-stats-panel-content')
      .textContent()
  ).toMatchSnapshot();
});
