import type { SxProps } from "@mui/material";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import type { WeaponDefinition } from "../../../definitions/types/weapon/weapon-definition";
import { ElementalTypeIcon } from "../ElementalTypeIcon/ElementalTypeIcon";
import { WeaponIcon } from "../WeaponIcon/WeaponIcon";
import { WeaponTypeIcon } from "../WeaponTypeIcon/WeaponTypeIcon";

export interface WeaponDefinitionCardProps {
  definition: WeaponDefinition;
  sx?: SxProps;
  onClick?(definition: WeaponDefinition): void;
}

export function WeaponDefinitionCard({
  definition,
  sx,
  onClick,
}: WeaponDefinitionCardProps) {
  return (
    <Card sx={{ width: "fit-content", ...sx }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick(definition);
        }}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack direction="row" sx={{ gap: 2, alignItems: "center" }}>
            <WeaponIcon weaponName={definition.id} />

            <Stack sx={{ pr: 2 }}>
              <Typography variant="body1">
                {definition.weaponDisplayName}
              </Typography>

              <Typography
                variant="body2"
                gutterBottom
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {definition.simulacrumDisplayName}
              </Typography>

              <Stack direction="row">
                <ElementalTypeIcon elementalType={definition.elementalIcon} />
                <WeaponTypeIcon type={definition.type} />
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
