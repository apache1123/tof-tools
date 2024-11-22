// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Box,
//   FormControlLabel,
//   Paper,
//   Stack,
//   Switch,
//   Typography,
// } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
// import Image from "next/image";
// import type { ReactNode } from "react";
//
// import { GearTypeIcon } from "../components/GearTypeIcon/GearTypeIcon";
// import type { CoreElementalType } from "../definitions/elemental-type";
// import type { Gear } from "../models/gear/gear";
// import { getPossibleRandomStatTypes } from "../models/gear-type";
// import { RandomStat } from "../models/random-stat";
// import { GearAttackStatsSummary } from "./GearAttackStatsSummary";
// import { GearRollBreakdown } from "./GearRollBreakdown";
// import { GearStars } from "./GearStars";
// import { EmptyStatEditor, StatEditor } from "./StatEditor";
// import { TitanGearMaxStats } from "./TitanGearMaxStats";
//
// export interface GearPieceProps {
//   gearSnap: Gear;
//   gearState: Gear;
//   // TODO: Explore potentially moving `gearTypeSelector` and `actions` out of this component (need to rethink layout)
//   /** Gear type selector is defined as a slot, as changing a gear instance's gear type is forbidden. Changing the gear type is essentially switching to another gear instance. Kept here for layout purposes */
//   gearTypeSelector?: ReactNode;
//   /** External actions such as `Import gear` & `Save gear` that make no sense to be orchestrated by a `Gear` instance, but can be slotted here (for layout purposes) */
//   actions?: ReactNode;
//   showTitanToggle?: boolean;
//   showStatSummary?: CoreElementalType;
//   showMaxTitanGear?: { maxTitanGear: Gear | undefined };
//   additionalAccordions?: ReactNode;
//   ["data-testid"]?: string;
// }
//
// export const GearPiece = ({
//   gearSnap,
//   gearState,
//   gearTypeSelector,
//   actions,
//   showTitanToggle,
//   showStatSummary,
//   showMaxTitanGear,
//   additionalAccordions,
//   "data-testid": dataTestId,
// }: GearPieceProps) => {
//   const gearType = gearSnap.type;
//   const isTitan = gearSnap.isAugmented;
//   const possibleRandomStatTypes = getPossibleRandomStatTypes(gearType);
//
//   return (
//     <Layout
//       typeIcon={
//         <GearTypeIcon gearName={gearType.id} isTitan={isTitan} size={70} />
//       }
//       typeSelector={gearTypeSelector}
//       starsSelector={<GearStars gearSnap={gearSnap} gearState={gearState} />}
//       randomStats={
//         <Stack spacing={2}>
//           {gearSnap.randomStats.map((randomStatSnap, i) => {
//             return randomStatSnap && gearState.randomStats[i] ? (
//               <StatEditor
//                 key={i}
//                 statSnap={randomStatSnap}
//                 // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//                 statState={gearState.randomStats[i]!}
//                 possibleStatTypes={possibleRandomStatTypes}
//                 isAugmented={gearSnap.isAugmented}
//               />
//             ) : (
//               <EmptyStatEditor
//                 key={i}
//                 possibleStatTypes={possibleRandomStatTypes}
//                 isAugmented={gearSnap.isAugmented}
//                 onStatTypeChange={(statType) => {
//                   gearState.randomStats[i] = new RandomStat(statType);
//                 }}
//               />
//             );
//           })}
//         </Stack>
//       }
//       titanToggle={
//         showTitanToggle && (
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={gearSnap.isAugmented}
//                 onChange={(_, checked) => {
//                   gearState.isAugmented = checked;
//                 }}
//                 color="titan"
//                 size="small"
//               />
//             }
//             label="Titan"
//           />
//         )
//       }
//       actions={actions}
//       summary={
//         <>
//           {showStatSummary && (
//             <GearAttackStatsSummary
//               gearSnap={gearSnap}
//               elementalType={showStatSummary}
//             />
//           )}
//           <Box mt={2}>
//             <Accordion elevation={3}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="roll-breakdown-panel-content"
//                 id="roll-breakdown-panel-header"
//               >
//                 <Typography>Roll breakdown</Typography>
//               </AccordionSummary>
//               <AccordionDetails data-testid="roll-breakdown-panel-content">
//                 <GearRollBreakdown gearSnap={gearSnap} />
//               </AccordionDetails>
//             </Accordion>
//             {showMaxTitanGear && (
//               <Accordion elevation={3}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="max-titan-stats-panel-content"
//                   id="max-titan-stats-panel-header"
//                 >
//                   <Typography>Stat values at max titan</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails data-testid="max-titan-stats-panel-content">
//                   <>
//                     <Typography sx={{ mb: 3 }}>
//                       The max increase amount each stat gets at max potential
//                       titan (120 augmentations)
//                     </Typography>
//                     {gearSnap.stars !== 5 &&
//                     gearSnap.getPossibleStars().length > 1 ? (
//                       <Typography color="info.main" gutterBottom>
//                         Can&apos;t determine the number of stars{" "}
//                         <strong>
//                           (either {gearSnap.getPossibleStars().join(" or ")}{" "}
//                           stars)
//                         </strong>
//                         . Select it above to continue
//                       </Typography>
//                     ) : gearSnap.stars !== 5 &&
//                       gearSnap.getPossibleStars().length === 1 &&
//                       gearSnap.getPossibleStars()[0] !== 5 ? (
//                       <Typography color="info.main" gutterBottom>
//                         Can&apos;t calculate max titan stat values if gear is
//                         not at 5 star
//                       </Typography>
//                     ) : gearSnap && showMaxTitanGear.maxTitanGear ? (
//                       <TitanGearMaxStats
//                         maxTitanGearSnap={showMaxTitanGear.maxTitanGear}
//                         elementalType={showStatSummary}
//                       />
//                     ) : (
//                       <Box>
//                         <Typography color="info.main">
//                           Can&apos;t calculate max titan stat values if gear is
//                           not at 5 star.
//                         </Typography>
//                         <Typography color="info.main" mt={2} gutterBottom>
//                           If the gear is already augmented/at titan, use the
//                           original 5 star values (found on the augment screen)
//                         </Typography>
//                         <Image
//                           src="/stat_original_5_star_value_example.jpg"
//                           alt="stat-original-5-star-value-example"
//                           width={415}
//                           height={230}
//                         />
//                       </Box>
//                     )}
//                   </>
//                 </AccordionDetails>
//               </Accordion>
//             )}
//             {additionalAccordions}
//           </Box>
//         </>
//       }
//       data-testid={dataTestId}
//     />
//   );
// };
//
// function Layout({
//   typeIcon,
//   typeSelector,
//   starsSelector,
//   randomStats,
//   titanToggle,
//   actions,
//   summary,
//   "data-testid": dataTestId,
// }: {
//   typeIcon: ReactNode;
//   typeSelector: ReactNode;
//   starsSelector: ReactNode;
//   randomStats: ReactNode;
//   titanToggle: ReactNode;
//   actions: ReactNode;
//   summary: ReactNode;
//   ["data-testid"]?: string;
// }) {
//   return (
//     <Paper sx={{ p: 2 }} square elevation={2} data-testid={dataTestId}>
//       <Grid container spacing={2}>
//         <Grid maxWidth={90} display="flex" alignItems="center">
//           <Stack alignItems="center" spacing={0.5}>
//             {typeIcon}
//             {titanToggle}
//           </Stack>
//         </Grid>
//         <Grid xs display="flex" flexDirection="column" justifyContent="center">
//           {typeSelector}
//           <Box mt={1}>{starsSelector}</Box>
//         </Grid>
//       </Grid>
//       <Stack direction="row" justifyContent="flex-end" spacing={1} mb={2}>
//         {actions}
//       </Stack>
//       <Box mb={3}>{randomStats}</Box>
//       <Box>{summary}</Box>
//     </Paper>
//   );
// }
