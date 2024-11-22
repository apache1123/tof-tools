// import { Box, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { useSnapshot } from "valtio";
//
// import { gearComparerState } from "../../states/states";
// import { LoadoutGear } from "./LoadoutGear";
// import { LoadoutGearValue } from "./LoadoutGearValue";
// import { ReplacementGear } from "./ReplacementGear";
// import { ReplacementGearValue } from "./ReplacementGearValue";
//
// export function GearsSideBySide() {
//   const {
//     selectedLoadoutGear,
//     replacementGear,
//     loadoutsState: { selectedLoadout },
//   } = useSnapshot(gearComparerState);
//
//   const { elementalType } = selectedLoadout;
//
//   const selectedLoadoutGearMaxTitan =
//     selectedLoadoutGear.getMaxTitanGear(elementalType);
//   const replacementGearMaxTitan =
//     replacementGear.getMaxTitanGear(elementalType);
//
//   const selectedLoadoutGearMaxTitanValue = selectedLoadoutGearMaxTitan
//     ? selectedLoadout.getSubstituteGearValue(selectedLoadoutGearMaxTitan)
//     : undefined;
//   const replacementGearMaxTitanValue = replacementGearMaxTitan
//     ? selectedLoadout.getSubstituteGearValue(replacementGearMaxTitan)
//     : undefined;
//
//   return (
//     <Grid container spacing={3}>
//       <Grid size={{ xs: 12, md: 6 }}>
//         <Typography variant="h5" mb={1}>
//           Current gear in loadout
//         </Typography>
//         <LoadoutGear maxTitanGear={selectedLoadoutGearMaxTitan} />
//         <LoadoutGearValue
//           maxTitanGearValue={selectedLoadoutGearMaxTitanValue}
//           isMaxTitanGearValueHigher={
//             selectedLoadoutGearMaxTitanValue !== undefined
//               ? selectedLoadoutGearMaxTitanValue >=
//                 (replacementGearMaxTitanValue ?? 0)
//               : undefined
//           }
//         />
//       </Grid>
//       <Grid size={{ xs: 12, md: 6 }}>
//         <Box display="flex" justifyContent="space-between">
//           <Typography variant="h5" mb={1}>
//             New gear
//           </Typography>
//         </Box>
//         <ReplacementGear maxTitanGear={replacementGearMaxTitan} />
//         <ReplacementGearValue
//           maxTitanGearValue={replacementGearMaxTitanValue}
//           isMaxTitanGearValueHigher={
//             replacementGearMaxTitanValue !== undefined
//               ? replacementGearMaxTitanValue >=
//                 (selectedLoadoutGearMaxTitanValue ?? 0)
//               : undefined
//           }
//         />
//       </Grid>
//     </Grid>
//   );
// }
