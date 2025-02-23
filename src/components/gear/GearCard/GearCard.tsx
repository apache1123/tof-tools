import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { Gear } from "../../../models/gear/gear";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { RandomStatDisplay } from "../../stat/RandomStatDisplay/RandomStatDisplay";
import { GearStars } from "../GearStars/GearStars";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

export interface GearCardProps extends PropsWithSx, PropsWithElevation {
  gear: Gear;
  onClick?: () => void;
}

export function GearCard({ gear, onClick, elevation, sx }: GearCardProps) {
  const { type, rarity, isAugmented, randomStats, augmentStats } = gear;

  return (
    <Card elevation={elevation} sx={{ width: 190, ...sx }}>
      <CardActionArea
        component={onClick ? "button" : "div"}
        disabled={!onClick}
        onClick={() => {
          if (onClick) onClick();
        }}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <CardContent sx={{ width: "100%", p: 0 }}>
          <Stack spacing={1}>
            {/* Header - type and stars */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ pr: 1, alignItems: "center" }}
            >
              <GearTypeIcon
                id={type.id}
                rarity={rarity}
                sx={{ flex: "none" }}
              />
              <GearStars
                gear={gear}
                readOnly
                sx={{ justifyContent: "center" }}
              />
            </Stack>

            {/* Random stats */}
            <Box sx={{ p: 1 }}>
              {randomStats.length ? (
                <Stack spacing={1}>
                  <>
                    {randomStats.map(
                      (randomStat, i) =>
                        randomStat && (
                          <RandomStatDisplay key={i} randomStat={randomStat} />
                        ),
                    )}
                  </>
                </Stack>
              ) : (
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                  No random stats
                </Typography>
              )}
            </Box>

            {/* Augment stats */}
            {isAugmented && (
              <>
                <Divider />
                <Box sx={{ p: 1 }}>
                  {augmentStats.length ? (
                    <Stack spacing={1}>
                      <>
                        {augmentStats.map(
                          (augmentStats, i) =>
                            augmentStats && (
                              <RandomStatDisplay
                                key={i}
                                randomStat={augmentStats}
                              />
                            ),
                        )}
                      </>
                    </Stack>
                  ) : (
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                      No augmentation stats
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
