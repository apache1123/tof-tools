// import { Box, Typography } from "@mui/material";
// import { useSnapshot } from "valtio";
//
// import { ElementalStyledText } from "../components/ElementalStyledText/ElementalStyledText";
// import {
//   NumericStringInteger,
//   NumericStringPercentage2dp,
// } from "../components/NumericString/NumericString";
// import type { CoreElementalType } from "../definitions/elemental-type";
// import type { Gear } from "../models/gear/gear";
// import { userStatsState } from "../states/states";
// import { calculateCritRatePercentFromFlat } from "../utils/stat-calculation-utils";
//
// export interface GearAttackStatsSummaryProps {
//   gearSnap: Gear;
//   elementalType: CoreElementalType;
// }
//
// export function GearAttackStatsSummary({
//   gearSnap,
//   elementalType,
// }: GearAttackStatsSummaryProps) {
//   const totalAttackFlat = gearSnap.getTotalAttackFlat(elementalType);
//   const totalAttackPercent = gearSnap.getTotalAttackPercent(elementalType);
//   const totalCritFlat = gearSnap.getTotalCritFlat();
//   const totalCritPercent = gearSnap.getTotalCritPercent();
//   const totalDamagePercent =
//     gearSnap.getTotalElementalDamagePercent(elementalType);
//
//   const { characterLevel } = useSnapshot(userStatsState);
//   const totalCritFlatToPercent = calculateCritRatePercentFromFlat(
//     totalCritFlat,
//     characterLevel,
//   );
//
//   return (
//     <Box>
//       {!!totalAttackFlat && (
//         <Typography>
//           Attack{" "}
//           <ElementalStyledText elementalType={elementalType}>
//             <NumericStringInteger value={totalAttackFlat} />
//           </ElementalStyledText>
//         </Typography>
//       )}
//       {!!totalAttackPercent && (
//         <Typography>
//           Attack{" "}
//           <ElementalStyledText elementalType={elementalType}>
//             <NumericStringPercentage2dp value={totalAttackPercent} />
//           </ElementalStyledText>
//         </Typography>
//       )}
//       {!!totalDamagePercent && (
//         <Typography>
//           Damage{" "}
//           <ElementalStyledText elementalType={elementalType}>
//             <NumericStringPercentage2dp value={totalDamagePercent} />
//           </ElementalStyledText>
//         </Typography>
//       )}
//       {!!totalCritFlat && (
//         <Typography>
//           Crit{" "}
//           <ElementalStyledText elementalType={elementalType}>
//             <NumericStringInteger value={totalCritFlat} /> (
//             <NumericStringPercentage2dp value={totalCritFlatToPercent} />)
//           </ElementalStyledText>
//         </Typography>
//       )}
//       {!!totalCritPercent && (
//         <Typography>
//           Crit{" "}
//           <ElementalStyledText elementalType={elementalType}>
//             <NumericStringPercentage2dp value={totalCritPercent} />
//           </ElementalStyledText>
//         </Typography>
//       )}
//     </Box>
//   );
// }
