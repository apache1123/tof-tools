import InfoIcon from "@mui/icons-material/Info";
import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import { ImageOcr } from "../../../components/common/ImageOcr/ImageOcr";
import { ButtonModal } from "../../../components/common/Modal/ButtonModal";
import { ErrorText } from "../../../components/common/Text/ErrorText";
import { InfoText } from "../../../components/common/Text/InfoText";
import { maxNumOfAugmentStats } from "../../../definitions/gear";
import { getGearType } from "../../../definitions/gear-types";
import { AugmentStat } from "../../../models/gear/augment-stat";
import { Gear } from "../../../models/gear/gear";
import { ocrTempGearState } from "../../../states/gear/ocr-temp-gear-state";
import { ocrState } from "../../../states/ocr/ocr-state";
import { filterOutUndefined } from "../../../utils/array-utils";
import { EditGearAugmentStats } from "../EditGearAugmentStats";
import { getStatsFromOcr } from "./get-stats-from-ocr";

export interface AugmentStatsOcrProps {
  gear: Gear;
  onConfirm?(augmentStats: AugmentStat[]): void;
}

export function AugmentStatsOcr({ gear, onConfirm }: AugmentStatsOcrProps) {
  const { worker } = useSnapshot(ocrState);
  useEffect(() => {
    (async () => {
      await ocrState.initializeWorker();
    })();
  }, []);

  const { type } = gear;
  const possibleAugmentStats = gear.getPossibleAugmentStats(true);

  const { tempGear } = useSnapshot(ocrTempGearState);

  // The uploaded image, also used as an indication of whether the OCR has been run
  const [imageUrl, setImageUrl] = useState<string>();

  return (
    <>
      <ButtonModal
        buttonContent="Import"
        modalTitle="Import Augmentation Stats by using screenshot"
        modalContent={
          <>
            <Instructions />

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
                    if (!possibleAugmentStats) return;

                    const possibleStatTypes = [
                      ...possibleAugmentStats.priority,
                      ...possibleAugmentStats.fallback,
                    ].map((x) => x.type);
                    const ocrStatResults = getStatsFromOcr(
                      text,
                      maxNumOfAugmentStats,
                      possibleStatTypes,
                    );

                    if (!ocrStatResults.length) return;

                    const tempGear = new Gear(getGearType(type.id), "");
                    Gear.copy(gear, tempGear);
                    ocrStatResults.forEach(({ statType, value }, i) => {
                      const augmentStat = new AugmentStat(statType);
                      augmentStat.setTotalValueAndAdjustAugmentIncreaseValue(
                        value,
                      );

                      tempGear.setAugmentStat(i, augmentStat);
                    });

                    ocrTempGearState.tempGear = tempGear;
                  }}
                  onImageUrlChange={setImageUrl}
                />
              </Grid>
              <Grid xs></Grid>
            </Grid>

            {imageUrl && (
              <Stack sx={{ gap: 2, alignItems: "center" }}>
                <Image
                  src={imageUrl}
                  width={245}
                  height={95}
                  alt="uploaded-image-preview"
                />

                {tempGear && ocrTempGearState.tempGear ? (
                  <EditGearAugmentStats gearProxy={ocrTempGearState.tempGear} />
                ) : (
                  // No temp gear created = unable to OCR stats
                  <ErrorText>
                    Unable to read augmentation stats from image
                  </ErrorText>
                )}
              </Stack>
            )}
          </>
        }
        buttonProps={{
          disabled: !possibleAugmentStats,
          size: "small",
          sx: { height: "fit-content" },
        }}
        showConfirm
        showCancel
        isConfirmDisabled={!tempGear?.augmentStats.length}
        onConfirm={() => {
          onConfirm?.(
            filterOutUndefined(ocrTempGearState.tempGear?.augmentStats ?? []),
          );
        }}
        onClose={() => {
          ocrTempGearState.tempGear = undefined;
          setImageUrl(undefined);
        }}
        fullWidth
        maxWidth="md"
        aria-label="import-augmentation-stat"
      />

      {(!possibleAugmentStats ||
        (!possibleAugmentStats.priority.length &&
          !possibleAugmentStats.fallback.length)) && (
        <Tooltip title="No possible augmentation stats. Check if random stats are correct.">
          <InfoIcon sx={{ color: (theme) => theme.palette.warning.main }} />
        </Tooltip>
      )}
    </>
  );
}

function Instructions() {
  return (
    <Box>
      <InfoText sx={{ mb: 2 }}>
        Upload a screenshot of the augmentation stats section
      </InfoText>

      <Typography variant="body2">Example:</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src="/ocr/augmentation_stats_example_1.png"
          width={245}
          height={95}
          alt="Augmentation stats example"
        />
      </Box>
    </Box>
  );
}
