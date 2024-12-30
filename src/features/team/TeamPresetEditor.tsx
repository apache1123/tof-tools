import { Stack, TextField } from "@mui/material";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import type { TeamPreset } from "../../models/team/team-preset";
import { WeaponPresetSlotEditor } from "../weapon/WeaponPresetSlotEditor";

export interface TeamPresetEditorProps {
  teamPresetProxy: TeamPreset;
}

export function TeamPresetEditor({ teamPresetProxy }: TeamPresetEditorProps) {
  const { characterId, name, weaponPresetSlots } = useSnapshot(
    teamPresetProxy,
  ) as TeamPreset;

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        label="Team name"
        value={name}
        onChange={(e) => {
          teamPresetProxy.name = e.target.value;
        }}
      />

      <CardList direction="column" gap={1}>
        {weaponPresetSlots.map((weaponPresetSlot, i) => (
          <WeaponPresetSlotEditor
            key={i}
            weaponPresetSlotProxy={teamPresetProxy.weaponPresetSlots[i]}
            characterId={characterId}
          />
        ))}
      </CardList>
    </Stack>
  );
}
