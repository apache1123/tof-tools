import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

import type { CharacterPreset } from "../../../models/character-preset/character-preset";
import { GearSetPresetSummaryCard } from "../../gear/GearSetPresetSummaryCard/GearSetPresetSummaryCard";
import { TeamPresetCard } from "../../team/TeamPresetCard/TeamPresetCard";

export interface CharacterPresetCardProps {
  characterPreset: CharacterPreset;
  onClick?(): void;
}

export function CharacterPresetCard({
  characterPreset,
  onClick,
}: CharacterPresetCardProps) {
  const { name, teamPreset, gearSetPreset } = characterPreset;

  return (
    <Card>
      <CardActionArea
        component={onClick ? "button" : "div"}
        disabled={!onClick}
        onClick={onClick}
      >
        <CardHeader title={name || "Unnamed preset"} />
        <CardContent>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            <Box>
              <Typography variant="h6">Team:</Typography>
              {teamPreset ? (
                <TeamPresetCard teamPreset={teamPreset} />
              ) : (
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                  No team selected
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="h6">Gear:</Typography>
              {gearSetPreset ? (
                <GearSetPresetSummaryCard preset={gearSetPreset} />
              ) : (
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                  No gear preset selected
                </Typography>
              )}
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
