// import { Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import { useSnapshot } from 'valtio';

// import { PercentageNumericInput } from '../../components/NumericInput/PercentageNumericInput';
// import {
//   selectedElementalUserStatsState,
//   setMiscAttackPercent,
//   setMiscCritDamage,
//   setMiscCritRate,
//   setOtherGearElementalDamage,
// } from './states/derived/selected-elemental-user-stats';
// import { gearComparerOptionsState } from './states/gear-comparer-options';

// export function MiscellaneousBuffs() {
//   const { selectedElementalType } = useSnapshot(gearComparerOptionsState);
//   const { selectedElementalUserStats } = useSnapshot(
//     selectedElementalUserStatsState
//   );

//   if (!selectedElementalType || !selectedElementalUserStats) {
//     return null;
//   }

//   const {
//     miscAttackPercent,
//     otherGearElementalDamage,
//     miscCritRate,
//     miscCritDamage,
//   } = selectedElementalUserStats;

//   return (
//     <>
//       <Typography variant="subtitle2" gutterBottom>
//         Input any other buffs that aren&apos;t shown above even after putting in
//         your weapons & matrices
//       </Typography>

//       <Grid container spacing={2} mt={2}>
//         <Grid xs={12} sm={6} md={4} lg={3}>
//           <PercentageNumericInput
//             id="other-gear-elemental-damage"
//             label={
//               'Damage %' +
//               (selectedElementalType ? ` (${selectedElementalType})` : '') +
//               ' from all other gear pieces'
//             }
//             variant="filled"
//             value={otherGearElementalDamage}
//             onChange={setOtherGearElementalDamage}
//             helperText="Add up values from all other gear pieces"
//           />
//         </Grid>

//         <Grid xs={12} sm={6} md={4} lg={3}>
//           <PercentageNumericInput
//             id="misc-atk-percent"
//             label="Misc. attack % buffs"
//             variant="filled"
//             value={miscAttackPercent}
//             onChange={setMiscAttackPercent}
//           />
//         </Grid>

//         <Grid xs={12} sm={6} md={4} lg={3}>
//           <PercentageNumericInput
//             id="misc-crit-rate"
//             label="Misc. crit rate % buffs"
//             variant="filled"
//             value={miscCritRate}
//             onChange={setMiscCritRate}
//           />
//         </Grid>

//         <Grid xs={12} sm={6} md={4} lg={3}>
//           <PercentageNumericInput
//             id="misc-crit-damage"
//             label="Misc. crit damage % buffs"
//             variant="filled"
//             value={miscCritDamage}
//             onChange={setMiscCritDamage}
//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// }
