import { Typography } from '@mui/material';

import type { Changelog } from '../models/changelog';

export const changelog: Changelog = [
  {
    semver: '2.0.0',
    date: new Date(Date.UTC(2023, 8, 7)),
    title: 'Gear comparer v2',
    description:
      'Add weapon and matrix selection to the gear comparer. When weapons and matrices are selected, the comparer will take into account applicable buffs (atk%, crit%, ele dmg% etc.) from these when calculating the value of a piece of gear',
    isImportant: true,
  },
  {
    semver: '2.1.0',
    date: new Date(Date.UTC(2023, 8, 17)),
    title: 'Add Ming Jing (Zeke)',
  },
  {
    semver: '2.2.0',
    date: new Date(Date.UTC(2023, 8, 23)),
    title: 'Add import/export data functionality in the Settings page',
  },
  {
    semver: '2.3.0',
    date: new Date(Date.UTC(2023, 8, 27)),
    title: 'Add Fei Se',
  },
  {
    semver: '2.4.0',
    date: new Date(Date.UTC(2023, 8, 29)),
    title: 'Localized numbers support',
  },
  {
    semver: '2.5.0',
    date: new Date(Date.UTC(2023, 9, 25)),
    title: 'Add Ling Han',
    description: 'Also increase the default max character level to 100',
  },
  {
    semver: '2.5.1',
    date: new Date(Date.UTC(2023, 10, 20)),
    title: 'Fix altered attack stat values',
  },
  {
    semver: '2.6.0',
    date: new Date(Date.UTC(2023, 10, 22)),
    title: 'Add Nan Yin',
  },
  {
    semver: '3.0.0',
    date: new Date(Date.UTC(2023, 10, 23)),
    title: 'Introduce "Loadouts", replacing "Gear sets"',
    description: (
      <>
        <Typography gutterBottom>
          This is similar to the newly introduced feature in-game where you can
          save your weapon preset + equipment (gear) preset etc. together and
          change them all at once. There is no in-game name for this so I will
          be calling it &quot;Loadouts&quot;. The previous &quot;Gear sets&quot;
          page has now been replaced by &quot;Loadouts&quot; page, where you can
          set weapons/matrices, equipment (gear), the main element type for that
          loadout, and the stats for that element type altogether.
        </Typography>
        <Typography gutterBottom>
          There is a default loadout for each element (Flame, Frost, Physical,
          Volt). In the Gear Comparer page, you now choose a loadout as the
          basis for comparison.{' '}
          <b>
            Any changes you do in the Gear Comparer page (to the weapons, gear
            etc.) will be saved to that loadout.
          </b>
        </Typography>
        <Typography gutterBottom>
          I am planning to work on an easier way to import a loadout from the
          game in the future, maybe as a separate &quot;scanner&quot;
          application that exports your inventory from the game
        </Typography>
      </>
    ),
    isImportant: true,
  },
];
