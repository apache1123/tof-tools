import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import { ImageOcr } from "../../../components/common/ImageOcr/ImageOcr";
import { ButtonModal } from "../../../components/common/Modal/ButtonModal";
import { InfoText } from "../../../components/common/Text/InfoText";
import type { GearTypeId } from "../../../definitions/gear-types";
import { getGearType } from "../../../definitions/gear-types";
import { getStatType } from "../../../definitions/stat-types";
import { Gear } from "../../../models/gear/gear";
import type { GearRarity } from "../../../models/gear/gear-rarity";
import type { GearType } from "../../../models/gear/gear-type";
import { RandomStat } from "../../../models/gear/random-stat";
import { ocrTempGearState } from "../../../states/gear/ocr-temp-gear-state";
import { ocrState } from "../../../states/ocr/ocr-state";
import { filterOutUndefined } from "../../../utils/array-utils";
import { EditGearRandomStats } from "../EditGearRandomStats";
import { getStatsFromOcr } from "./get-stats-from-ocr";

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
            </Typography>{" "}
            by using screenshot
          </Typography>
        ) : (
          "Import Random Stats by using screenshot"
        )
      }
      modalContent={
        <>
          <Instructions isAugmented={isAugmented} />

          <Divider sx={{ my: 4 }} />

          <Grid container sx={{ mb: 2 }}>
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
                onOcrTextChange={(text) => {
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
                onImageUrlChange={setImageUrl}
              />
            </Grid>
            <Grid xs></Grid>
          </Grid>

          <Stack sx={{ gap: 2, alignItems: "center" }}>
            {imageUrl && (
              <Image
                src={imageUrl}
                width={275}
                height={175}
                alt="uploaded-image-preview"
              />
            )}

            {tempGear && ocrTempGearState.tempGear && (
              <EditGearRandomStats
                gearProxy={ocrTempGearState.tempGear}
                initialFixedTotalValue
              />
            )}
          </Stack>
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
      onClose={() => {
        ocrTempGearState.tempGear = undefined;
        setImageUrl(undefined);
      }}
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
  const ocrStatResults = getStatsFromOcr(
    text,
    numberOfStats,
    possibleStatTypes,
  );

  return ocrStatResults.map(({ statType, value }) => {
    const randomStat = new RandomStat(statType);

    if (isAugmented) {
      randomStat.setTotalValueAndAdjustAugmentIncreaseValue(value);
    } else {
      randomStat.setValueAndAdjustTotalValue(value);
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
            Upload a screenshot of the random stats section, then adjust the
            base/increase values of each stat according to the Augmentation page
          </InfoText>

          <Typography variant="body2">Example:</Typography>
          <Stack
            direction="row"
            sx={{ gap: 2, justifyContent: "center", alignItems: "center" }}
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
