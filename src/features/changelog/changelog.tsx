import { Alert, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";

import type { Changelog } from "../../models/changelog";

export const changelog: Changelog = [
  {
    semver: "2.0.0",
    date: new Date(Date.UTC(2023, 8, 7)),
    title: "Gear comparer v2",
    description:
      "Add weapon and matrix selection to the gear comparer. When weapons and matrices are selected, the comparer will take into account applicable buffs (atk%, crit%, ele dmg% etc.) from these when calculating the value of a piece of gear",
    isImportant: true,
  },
  {
    semver: "2.1.0",
    date: new Date(Date.UTC(2023, 8, 17)),
    title: "Add Ming Jing (Zeke)",
  },
  {
    semver: "2.2.0",
    date: new Date(Date.UTC(2023, 8, 23)),
    title: "Add import/export data functionality in the Settings page",
  },
  {
    semver: "2.3.0",
    date: new Date(Date.UTC(2023, 8, 27)),
    title: "Add Fei Se",
  },
  {
    semver: "2.4.0",
    date: new Date(Date.UTC(2023, 8, 29)),
    title: "Localized numbers support",
  },
  {
    semver: "2.5.0",
    date: new Date(Date.UTC(2023, 9, 25)),
    title: "Add Ling Han",
    description: "Also increase the default max character level to 100",
  },
  {
    semver: "2.5.1",
    date: new Date(Date.UTC(2023, 10, 20)),
    title: "Fix altered attack stat values",
  },
  {
    semver: "2.6.0",
    date: new Date(Date.UTC(2023, 10, 22)),
    title: "Add Nan Yin",
  },
  {
    semver: "3.0.0",
    date: new Date(Date.UTC(2023, 10, 27)),
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
          basis for comparison.{" "}
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
  {
    semver: "3.1.0",
    date: new Date(Date.UTC(2023, 11, 2)),
    title: 'Show the "gear value" of each piece of gear in a loadout',
    description:
      'The "value" of a piece of gear is the damage increase you would get with it equipped versus unequipped',
  },
  {
    semver: "3.2.0",
    date: new Date(Date.UTC(2023, 11, 22)),
    title: "Add Yan Miao",
  },
  {
    semver: "3.3.0",
    date: new Date(Date.UTC(2024, 0, 6)),
    title:
      "Support changing a gear to titan/augmented gear & entering augment values",
    description: (
      <>
        <Typography gutterBottom>
          Can now change a piece of gear into the titan type of that gear. After
          that, for each random stat, you can then adjust the value increase you
          get from augmenting and the total value{" "}
          <i>(Base value (at 5-star) + increase = total value)</i>. The
          gear&apos;s value% is then calculated from the total value for each
          stat.
        </Typography>
        <Typography gutterBottom>
          If your gear is only &quot;augmented&quot; and not a &quot;titan&quot;
          gear yet, you can still use this also. Augmented gear and Titan gear
          are treated the same here.
        </Typography>
        <Grid container spacing={1}>
          <Grid xs="auto">
            <Image
              src="/changelog/titan-1.png"
              alt="titan-example-1"
              width={300}
              height={190}
            />
          </Grid>
          <Grid xs="auto">
            <Image
              src="/changelog/titan-2.png"
              alt="titan-example-2"
              width={390}
              height={300}
            />
          </Grid>
        </Grid>
      </>
    ),
  },
  {
    semver: "3.4.0",
    date: new Date(Date.UTC(2024, 0, 8)),
    title:
      "Show max potential titan value for every piece of gear in a loadout",
    description:
      "This may help you decide which piece of gear in your loadout is the weakest, so that you can farm that piece in Joint Operation",
  },
  {
    semver: "3.5.0",
    date: new Date(Date.UTC(2024, 0, 8)),
    title:
      "Allow selecting 2pc+2pc of the same type of matrices but with different stars",
    description:
      "e.g. can now select Mimi 4pcs but with 2pcs 1 star & 2pcs 0 star",
  },
  {
    semver: "3.5.1",
    date: new Date(Date.UTC(2024, 0, 9)),
    title: "Fix import/export app data feature",
  },
  {
    semver: "3.6.0",
    date: new Date(Date.UTC(2024, 0, 10)),
    title: "Add Brevey",
  },
  {
    semver: "3.7.0",
    date: new Date(Date.UTC(2024, 0, 14)),
    title:
      "To make a piece of gear into a titan gear (and vice versa) - use the toggle instead of using the gear type selector",
    description: (
      <Image
        src="/changelog/titan-3.png"
        alt="titan-example-3"
        width={645}
        height={190}
      />
    ),
  },
  {
    semver: "3.8.0",
    date: new Date(Date.UTC(2024, 0, 26)),
    title:
      "Add back the Compare button for a piece of gear in the Loadouts page",
  },
  {
    semver: "3.9.0",
    date: new Date(Date.UTC(2024, 1, 5)),
    title: "Add Plotti",
  },
  {
    semver: "3.10.0",
    date: new Date(Date.UTC(2024, 1, 21)),
    title: "Add Yanuo",
  },
  {
    semver: "3.11.0",
    date: new Date(Date.UTC(2024, 2, 13)),
    title: "Add Asuka",
  },
  {
    semver: "3.12.0",
    date: new Date(Date.UTC(2024, 2, 15)),
    title: "Add a page containing useful links",
  },
  {
    semver: "3.13.0",
    date: new Date(Date.UTC(2024, 2, 29)),
    title: "Add Rei",
  },
  {
    semver: "3.14.0",
    date: new Date(Date.UTC(2024, 4, 4)),
    title: "Add Ji Yu",
  },
  {
    semver: "3.15.0",
    date: new Date(Date.UTC(2024, 5, 1)),
    title: "Add Roslyn",
    description:
      "Since simulacra trait selection has not been added to the gear comparer yet, the calculator assumes you will also equip her trait when using Roslyn's weapon. (Roslyn trait buffs crit damage)",
  },
  {
    semver: "3.16.0",
    date: new Date(Date.UTC(2024, 6, 6)),
    title: "Add Anka",
  },
  {
    semver: "3.17.0",
    date: new Date(Date.UTC(2024, 7, 20)),
    title: "Add Nola",
    description:
      "Since simulacra trait selection has not been added to the gear comparer yet, the calculator assumes you might also equip her trait when using Nola. (Nola trait buffs all ATK for every altered weapon equipped)",
  },
  {
    semver: "3.18.0",
    date: new Date(Date.UTC(2024, 10, 4)),
    title: "Add Meryl Ironheart",
  },
  {
    semver: "3.19.0",
    date: new Date(Date.UTC(2024, 10, 4)),
    title: "Add Asurada",
  },
  {
    semver: "3.20.0",
    date: new Date(Date.UTC(2025, 1, 8)),
    title: "Add Gray Fox",
  },
  {
    semver: "3.21.0",
    date: new Date(Date.UTC(2025, 1, 8)),
    title: "Add Claudia Storm Eye",
  },
  {
    semver: "4.0.0",
    date: new Date(Date.UTC(2025, 1, 23)),
    title: "Big new version redesign!",
    description: (
      <>
        <ul>
          <li>
            &quot;Loadouts&quot; are now renamed to &quot;Presets&quot; to keep
            it consistent to what they are called in-game
          </li>
          <li>
            Added an inventory-like system. Everything is saved individually
            (weapons, matrices, gear, teams, etc.) and you can share these
            across different presets.
            <Stack sx={{ my: 1, gap: 0.5 }}>
              <Alert severity="warning">
                This required some big changes on the structure of the data
                being saved. Please check if anything is missing.
              </Alert>
              <Alert severity="warning">
                If you had 2pc matrices on your weapons, unfortunately you will
                need to create and add these again.
              </Alert>
            </Stack>
          </li>
          <li>Augmentation stats can now be added on a gear.</li>
          <li>
            You no longer assign an element to a preset/loadout. Instead, the
            gear compare will use the main weapon&apos;s element
          </li>
          <li>
            Gear compare can now take into account dual-elements (of the main
            weapon) when calculating
          </li>
        </ul>
      </>
    ),
  },
  {
    semver: "4.1.0",
    date: new Date(Date.UTC(2025, 1, 26)),
    title: "Add Nemesis Voidpiercer",
    description:
      "Choose the right elemental variant of Nemesis Voidpiercer for your team. The calculator is not able to automatically detect what element Nemesis Voidpiercer should be based on the other 2 weapons like in-game",
  },
  {
    semver: "4.2.0",
    date: new Date(Date.UTC(2025, 2, 3)),
    title: "Updated damage breakdown in gear compare",
    description:
      "This section is now clearer, and shows everything used to calculate damage. This includes attack %, damage %, crit and crit rate % from gear that wasn't shown before. (The calculation remains the same, they just weren't shown before)",
  },
];
