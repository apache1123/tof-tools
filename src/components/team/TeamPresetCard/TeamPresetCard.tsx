import { Card, CardActionArea, CardContent, CardHeader } from "@mui/material";

import type { TeamPreset } from "../../../models/team/team-preset";
import { CardList } from "../../common/CardList/CardList";
import { WeaponPresetCard } from "../../weapon/WeaponPresetCard/WeaponPresetCard";

export interface TeamPresetCardProps {
  teamPreset: TeamPreset;
  onClick?(): void;
}

export function TeamPresetCard({ teamPreset, onClick }: TeamPresetCardProps) {
  const { name } = teamPreset;

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          onClick?.();
        }}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <CardHeader title={name || "Unnamed team"} />
        <CardContent>
          <CardList direction="row" gap={1}>
            {teamPreset
              .getWeaponPresets()
              .map(
                (weaponPreset, i) =>
                  weaponPreset && (
                    <WeaponPresetCard
                      key={i}
                      weapon={weaponPreset.weapon}
                      matrixSlots={weaponPreset.matrixSlots.getSlots()}
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
