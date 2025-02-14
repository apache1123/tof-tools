import { Card, CardActionArea, CardContent } from "@mui/material";

import type { TeamPreset } from "../../../models/team/team-preset";
import { CardList } from "../../common/CardList/CardList";
import { SectionSubheading } from "../../common/SectionHeading/SectionSubheading";
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
        <CardContent>
          <SectionSubheading>{name || "Unnamed team"}</SectionSubheading>
          <CardList direction="row" gap={1}>
            {teamPreset
              .getWeaponPresets()
              .map(
                (weaponPreset, i) =>
                  weaponPreset && (
                    <WeaponPresetCard
                      key={i}
                      weaponDefinition={weaponPreset.definition}
                      stars={weaponPreset.stars}
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
