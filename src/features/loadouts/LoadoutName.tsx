// import ClearIcon from "@mui/icons-material/Clear";
// import DoneIcon from "@mui/icons-material/Done";
// import EditIcon from "@mui/icons-material/Edit";
// import { IconButton, Input, Stack, Typography } from "@mui/material";
// import { useState } from "react";
// import { useSnapshot } from "valtio";
//
// import { ElementalStyledText } from "../../components/ElementalStyledText/ElementalStyledText";
// import { loadoutsState } from "../../states/states";
//
// const iconSize = "small";
//
// export function LoadoutName() {
//   const { selectedLoadout: loadout } = useSnapshot(loadoutsState);
//
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingName, setEditingName] = useState("");
//
//   function saveName() {
//     loadoutsState.selectedLoadoutItem.loadout.name = editingName;
//   }
//
//   return (
//     <Stack direction="row" alignItems="center">
//       {!isEditMode && (
//         <>
//           <Typography variant="h5" component="h1">
//             {loadout.elementalType ? (
//               <ElementalStyledText
//                 elementalType={loadout.elementalType}
//                 variant="h5"
//               >
//                 {loadout.name}
//               </ElementalStyledText>
//             ) : (
//               loadout.name
//             )}
//           </Typography>
//           <IconButton
//             onClick={() => {
//               setEditingName(loadout.name);
//               setIsEditMode(true);
//             }}
//             sx={{ ml: 0.5 }}
//             aria-label="edit-loadout-name"
//           >
//             <EditIcon fontSize={iconSize} />
//           </IconButton>
//         </>
//       )}
//       {isEditMode && (
//         <>
//           <Input
//             value={editingName}
//             onChange={(event) => {
//               setEditingName(event.target.value);
//             }}
//             onKeyDown={(event) => {
//               if (event.key === "Enter") {
//                 saveName();
//                 setIsEditMode(false);
//               }
//             }}
//             sx={{ width: 125 }}
//           />
//           <IconButton
//             onClick={() => {
//               saveName();
//               setIsEditMode(false);
//             }}
//           >
//             <DoneIcon color="success" fontSize={iconSize}></DoneIcon>
//           </IconButton>
//           <IconButton
//             onClick={() => {
//               setIsEditMode(false);
//             }}
//           >
//             <ClearIcon color="error" fontSize={iconSize}></ClearIcon>
//           </IconButton>
//         </>
//       )}
//     </Stack>
//   );
// }
