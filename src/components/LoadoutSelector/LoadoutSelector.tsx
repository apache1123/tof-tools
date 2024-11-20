// import type { FormControlProps, SelectChangeEvent } from "@mui/material";
// import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import type { ReactNode } from "react";
//
// import type { Loadout } from "../../models/loadout/loadout";
// import type { LoadoutListItem } from "../../states/loadouts";
// import { ElementalStyledText } from "../ElementalStyledText/ElementalStyledText";
// import { ElementalTypeIcon } from "../ElementalTypeIcon/ElementalTypeIcon";
//
// export interface LoadoutSelectorProps {
//   loadoutList: LoadoutListItem[];
//   selectedLoadout: Loadout;
//   label?: ReactNode;
//   size?: "small" | "medium";
//   required?: boolean;
//   variant?: FormControlProps["variant"];
//   disabled?: boolean;
//
//   onLoadoutChange?(value: Loadout, index: number): void;
// }
//
// export function LoadoutSelector({
//   loadoutList,
//   selectedLoadout,
//   onLoadoutChange,
//   label = "Choose Loadout",
//   size = "medium",
//   required = false,
//   variant = "standard",
//   disabled,
// }: LoadoutSelectorProps) {
//   const handleChange = (event: SelectChangeEvent) => {
//     if (onLoadoutChange) {
//       const loadoutIndex = loadoutList.findIndex(
//         (loadoutListItem) => loadoutListItem.loadout.id === event.target.value,
//       );
//       if (loadoutIndex === -1) return;
//
//       onLoadoutChange(loadoutList[loadoutIndex].loadout, loadoutIndex);
//     }
//   };
//
//   return (
//     <FormControl
//       variant={variant}
//       fullWidth
//       required={required}
//       error={required && !selectedLoadout}
//       size={size}
//       disabled={disabled}
//     >
//       <InputLabel id="loadout-select-label">{label}</InputLabel>
//       <Select
//         labelId="loadout-select-label"
//         id="loadout-select"
//         value={selectedLoadout.id}
//         label={label}
//         onChange={handleChange}
//       >
//         {loadoutList.map(({ loadout }) => (
//           <MenuItem key={loadout.id} value={loadout.id}>
//             <Box display="flex" alignItems="center">
//               <ElementalTypeIcon elementalType={loadout.elementalType} />
//               <Box ml={1}>
//                 <ElementalStyledText elementalType={loadout.elementalType}>
//                   {loadout.name}
//                 </ElementalStyledText>
//               </Box>
//             </Box>
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }
