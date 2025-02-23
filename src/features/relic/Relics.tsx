// import { Box, Paper, Stack, Typography } from "@mui/material";
// import { useSnapshot } from "valtio";
//
// import { RelicIcon } from "../../components/presentational/relic/RelicIcon/RelicIcon";
// import { RelicStarsSelector } from "../../components/presentational/relic/RelicStarsSelector/RelicStarsSelector";
// import type { RelicName } from "../../definitions/relics";
// import {
//   metaDamageRelics,
//   passiveBuffRelics,
//   srRelicsOrder,
//   ssrRelicsOrder,
// } from "../../definitions/relics";
// import { relicsState } from "../../states/states";
//
// const otherRelics: RelicName[] = new Array<RelicName>()
//   .concat(ssrRelicsOrder)
//   .concat(srRelicsOrder)
//   .filter(
//     (relicName) =>
//       !metaDamageRelics.includes(relicName) &&
//       !passiveBuffRelics.includes(relicName),
//   );
//
// export function Relics() {
//   const { relicStars } = useSnapshot(relicsState);
//
//   return (
//     <Paper>
//       <Typography>Relics</Typography>
//       <Stack>
//         <Box>
//           <Typography>Meta damage-centric relics</Typography>
//           <Stack>
//             {metaDamageRelics.map((relicName) => {
//               return (
//                 <Relic
//                   key={relicName}
//                   relicName={relicName}
//                   stars={relicStars[relicName]}
//                   onStarsChange={(value) => {
//                     relicsState.setRelicStars(relicName, value);
//                   }}
//                 />
//               );
//             })}
//           </Stack>
//         </Box>
//         <Box>
//           <Typography>Passive buff relics</Typography>
//           <Stack>
//             {passiveBuffRelics.map((relicName) => (
//               <Relic
//                 key={relicName}
//                 relicName={relicName}
//                 stars={relicStars[relicName]}
//                 onStarsChange={(value) => {
//                   relicsState.setRelicStars(relicName, value);
//                 }}
//               />
//             ))}
//           </Stack>
//         </Box>
//         <Box>
//           <Typography>Other relics</Typography>
//           <Stack>
//             {otherRelics.map((relicName) => (
//               <Relic
//                 key={relicName}
//                 relicName={relicName}
//                 stars={relicStars[relicName]}
//                 onStarsChange={(value) => {
//                   relicsState.setRelicStars(relicName, value);
//                 }}
//               />
//             ))}
//           </Stack>
//         </Box>
//       </Stack>
//     </Paper>
//   );
// }
//
// function Relic({
//   relicName,
//   stars,
//   onStarsChange,
// }: {
//   relicName: RelicName;
//   stars: number;
//   onStarsChange: (value: number) => void;
// }) {
//   return (
//     <Box key={relicName}>
//       <RelicIcon relicName={relicName} />
//       <RelicStarsSelector stars={stars} onStarsChange={onStarsChange} />
//     </Box>
//   );
// }
