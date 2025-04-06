import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import { Button } from "../../../components/common/Button/Button";
import { ImageOcr } from "../../../components/common/ImageOcr/ImageOcr";
import { ButtonModal } from "../../../components/common/Modal/ButtonModal";
import { ErrorText } from "../../../components/common/Text/ErrorText";
import { InfoText } from "../../../components/common/Text/InfoText";
import type { GearTypeId } from "../../../definitions/gear-types";
import { getGearType } from "../../../definitions/gear-types";
import { getStatType } from "../../../definitions/stat-types";
import { Gear } from "../../../models/gear/gear";
import type { GearRarity } from "../../../models/gear/gear-rarity";
import type { GearType } from "../../../models/gear/gear-type";
import { getStatsFromGearCardOcr } from "../../../models/gear/ocr/get-stats-from-gear-card-ocr";
import { RandomStat } from "../../../models/gear/random-stat";
import { ocrTempGearState } from "../../../states/gear/ocr-temp-gear-state";
import { ocrState } from "../../../states/ocr/ocr-state";
import { filterOutUndefined } from "../../../utils/array-utils";
import { EditGearRandomStats } from "../EditGearRandomStats";

export interface RandomStatsOcrProps {
  gearTypeId: GearTypeId;
  rarity: GearRarity;
  isAugmented: boolean;
  onConfirm?(randomStats: RandomStat[]): void;
}

export function RandomStatsOcr({
  gearTypeId,
  rarity,
  isAugmented,
  onConfirm,
}: RandomStatsOcrProps) {
  const { worker } = useSnapshot(ocrState);
  useEffect(() => {
    (async () => {
      await ocrState.initializeWorker();
    })();
  }, []);

  // Use a temp gear to hold the random stats, as the gear has some logic on which random stats are allowed
  const { tempGear } = useSnapshot(ocrTempGearState);

  const [imageUrl, setImageUrl] = useState<string>();

  const reset = () => {
    ocrTempGearState.tempGear = undefined;
    setImageUrl(undefined);
  };

  return (
    <ButtonModal
      buttonContent="Import"
      modalTitle={
        isAugmented ? (
          <Typography variant="inherit">
            Import Random Stats{" "}
            <Typography
              variant="inherit"
              component="span"
              sx={{ color: (theme) => theme.palette.titan.main }}
            >
              (Augmented)
            </Typography>
          </Typography>
        ) : (
          "Import Random Stats"
        )
      }
      modalContent={
        <>
          <Instructions isAugmented={isAugmented} />

          <Divider sx={{ my: 4 }} />

          {/*Hide ImageOcr instead of unmount because it holds the reference to the image (url)*/}
          <Grid container sx={{ display: imageUrl ? "none" : "flex", mb: 2 }}>
            <Grid xs></Grid>
            <Grid
              xs={12}
              md={8}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ImageOcr
                ocrWorker={worker}
                onChange={(imageUrl, text) => {
                  setImageUrl(imageUrl);

                  const gearType = getGearType(gearTypeId);
                  const ocrRandomStats = getRandomStatsFromOcr(
                    text,
                    gearType,
                    isAugmented,
                  );

                  if (ocrRandomStats.length > 0) {
                    const tempGear = new Gear(gearType, "");
                    tempGear.rarity = rarity;
                    ocrRandomStats.forEach((ocrRandomStat, i) => {
                      tempGear.setRandomStat(i, ocrRandomStat);
                    });

                    ocrTempGearState.tempGear = tempGear;
                  }
                }}
              />
            </Grid>
            <Grid xs></Grid>
          </Grid>

          {imageUrl && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                src={imageUrl}
                width={275}
                height={175}
                alt="uploaded-image-preview"
              />

              <Box sx={{ mt: 4 }}>
                {tempGear && ocrTempGearState.tempGear ? (
                  <EditGearRandomStats
                    gearProxy={ocrTempGearState.tempGear}
                    initialFixedTotalValue
                  />
                ) : (
                  // No temp gear created = unable to OCR stats
                  <ErrorText>Unable to read random stats from image</ErrorText>
                )}
              </Box>

              <Button onClick={reset} sx={{ mt: 2 }}>
                Reset
              </Button>
            </Box>
          )}
        </>
      }
      buttonProps={{ size: "small", sx: { height: "fit-content" } }}
      showConfirm
      showCancel
      isConfirmDisabled={!tempGear?.randomStats.length}
      onConfirm={() => {
        onConfirm?.(
          filterOutUndefined(ocrTempGearState.tempGear?.randomStats ?? []),
        );
      }}
      onClose={reset}
      fullWidth
      maxWidth="md"
      aria-label="import-random-stat"
    />
  );
}

function getRandomStatsFromOcr(
  text: string,
  gearType: GearType,
  isAugmented: boolean,
): RandomStat[] {
  const numberOfStats = gearType.numberOfRandomStats;
  const possibleStatTypes = gearType.possibleRandomStatTypeIds.map((id) =>
    getStatType(id),
  );
  const ocrStatResults = getStatsFromGearCardOcr(
    text,
    numberOfStats,
    possibleStatTypes,
  );

  return ocrStatResults.map(({ statType, value }) => {
    const randomStat = new RandomStat(statType);

    if (value !== undefined) {
      if (isAugmented) {
        randomStat.setTotalValueTryKeepBaseValue(value);
      } else {
        randomStat.setBaseValue(value);
      }
    }

    return randomStat;
  });
}

function Instructions({ isAugmented }: { isAugmented: boolean }) {
  return (
    <Box>
      {isAugmented ? (
        <>
          <InfoText sx={{ mb: 2 }}>
            Upload a screenshot of the random stats section, then{" "}
            <Typography
              component="span"
              variant="inherit"
              sx={{ color: (theme) => theme.palette.titan.main }}
            >
              adjust the base/increase values
            </Typography>{" "}
            of each stat according to the Augmentation page
          </InfoText>

          <Typography variant="body2">Example:</Typography>
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="/ocr/random_stats_example_1.png"
              width={275}
              height={175}
              alt="Random stats example 1"
            />
            <KeyboardDoubleArrowRightIcon />
            <Image
              src="/ocr/random_stats_example_2.png"
              width={275}
              height={175}
              alt="Random stats example 2"
            />
          </Stack>
        </>
      ) : (
        <>
          <InfoText sx={{ mb: 2 }}>
            Upload a screenshot of the random stats section
          </InfoText>

          <Typography variant="body2">Example:</Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src="/ocr/random_stats_example_1.png"
              width={275}
              height={175}
              alt="Random stats example 1"
            />
          </Box>
        </>
      )}
    </Box>
  );
}
