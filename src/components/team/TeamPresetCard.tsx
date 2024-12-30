import { Card, CardActionArea, CardContent, CardHeader } from "@mui/material";

import type { TeamPreset } from "../../models/team/team-preset";
import { CardList } from "../common/CardList/CardList";
import { WeaponPresetCard } from "../weapon/WeaponPresetCard/WeaponPresetCard";

export interface TeamPresetCardProps {
  teamPreset: TeamPreset;
  onClick?(): void;
}

export function TeamPresetCard({ teamPreset, onClick }: TeamPresetCardProps) {
  const { name, weaponPresetSlots } = teamPreset;

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          onClick?.();
        }}
      >
        <CardHeader title={name} />
        <CardContent>
          <CardList direction="column" gap={0.5}>
            {weaponPresetSlots.map(
              (weaponPresetSlot, i) =>
                weaponPresetSlot.weaponPreset && (
                  <WeaponPresetCard
                    key={i}
                    weapon={weaponPresetSlot.weaponPreset.weapon}
                    matrixSlots={weaponPresetSlot.weaponPreset.matrixSlots.getSlots()}
                    elevation={1}
                  />
                ),
            )}
          </CardList>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
