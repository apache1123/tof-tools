import InfoIcon from "@mui/icons-material/Info";
import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import { Button } from "../../../components/common/Button/Button";
import { ImageOcr } from "../../../components/common/ImageOcr/ImageOcr";
import { ButtonModal } from "../../../components/common/Modal/ButtonModal";
import { ErrorText } from "../../../components/common/Text/ErrorText";
import { InfoText } from "../../../components/common/Text/InfoText";
import { maxNumOfAugmentStats } from "../../../definitions/gear";
import { getGearType } from "../../../definitions/gear-types";
import { AugmentStat } from "../../../models/gear/augment-stat";
import { Gear } from "../../../models/gear/gear";
import { getStatsFromAugmentScreenOcr } from "../../../models/gear/ocr/get-stats-from-augment-screen-ocr";
import { getStatsFromGearCardOcr } from "../../../models/gear/ocr/get-stats-from-gear-card-ocr";
import { ocrTempGearState } from "../../../states/gear/ocr-temp-gear-state";
import { ocrState } from "../../../states/ocr/ocr-state";
import { filterOutUndefined } from "../../../utils/array-utils";
import { EditGearAugmentStats } from "../EditGearAugmentStats";

export interface AugmentStatsOcrProps {
  gear: Gear;
  onConfirm?(augmentStats: AugmentStat[]): void;
}

type ImageSource = "gearCard" | "augmentScreen";

const gearCardImageWidth = 245;
const gearCardImageHeight = 95;
const augmentScreenImageWidth = 220;
const augmentScreenImageHeight = 160;

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

  const [imageSource, setImageSource] = useState<ImageSource | undefined>(
    undefined,
  );
  // The uploaded image, also used as an indication of whether the OCR has been run
  const [imageUrl, setImageUrl] = useState<string>();

  const reset = () => {
    ocrTempGearState.tempGear = undefined;
    setImageSource(undefined);
    setImageUrl(undefined);
  };

  return (
    <>
      <ButtonModal
        buttonContent="Import"
        modalTitle="Import Augmentation Stats by using screenshot"
        modalContent={
          <>
            <Instructions
              selectedImageSource={imageSource}
              onImageSourceSelect={setImageSource}
            />

            <Divider sx={{ my: 4 }} />

            {imageSource && (
              <Stack
                sx={{
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {/*Hide ImageOcr instead of unmount because it holds the reference to the image (url)*/}
                <Grid
                  container
                  sx={{
                    display: imageUrl ? "none" : "flex",
                    mb: 2,
                    width: "100%",
                  }}
                >
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
                        if (!possibleAugmentStats) return;

                        setImageUrl(imageUrl);

                        const possibleStatTypes = [
                          ...possibleAugmentStats.priority,
                          ...possibleAugmentStats.fallback,
                        ].map((x) => x.type);

                        const ocrStatResults =
                          imageSource === "augmentScreen"
                            ? getStatsFromAugmentScreenOcr(
                                text,
                                maxNumOfAugmentStats,
                                possibleStatTypes,
                              )
                            : getStatsFromGearCardOcr(
                                text,
                                maxNumOfAugmentStats,
                                possibleStatTypes,
                              );

                        if (!ocrStatResults.length) return;

                        const tempGear = new Gear(getGearType(type.id), "");
                        Gear.copy(gear, tempGear);
                        ocrStatResults.forEach(({ statType, value }, i) => {
                          const augmentStat = new AugmentStat(statType);
                          if (value !== undefined) {
                            augmentStat.setTotalValueTryKeepBaseValue(value);
                          }

                          tempGear.setAugmentStat(i, augmentStat);
                        });

                        ocrTempGearState.tempGear = tempGear;
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
                      width={
                        imageSource === "gearCard"
                          ? gearCardImageWidth
                          : augmentScreenImageWidth
                      }
                      height={
                        imageSource === "gearCard"
                          ? gearCardImageHeight
                          : augmentScreenImageHeight
                      }
                      alt="uploaded-image-preview"
                    />

                    <Box sx={{ mt: 4 }}>
                      {tempGear && ocrTempGearState.tempGear ? (
                        <EditGearAugmentStats
                          gearProxy={ocrTempGearState.tempGear}
                        />
                      ) : (
                        // No temp gear created = unable to OCR stats
                        <ErrorText>
                          Unable to read augmentation stats from image
                        </ErrorText>
                      )}
                    </Box>
                  </Box>
                )}

                <Button onClick={reset} sx={{ width: "fit-content" }}>
                  Reset
                </Button>
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
        onClose={reset}
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

function Instructions({
  selectedImageSource,
  onImageSourceSelect,
}: {
  selectedImageSource: ImageSource | undefined;
  onImageSourceSelect: (imageSource: ImageSource) => void;
}) {
  return (
    <Box>
      <InfoText sx={{ mb: 2 }}>
        Upload a screenshot of the augmentation stats section
      </InfoText>

      <Typography>Select screenshot type:</Typography>

      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          alignItems: "end",
        }}
      >
        <ImageSourceSelect
          imageSource="gearCard"
          selectedImageSource={selectedImageSource}
          exampleImage={
            <Image
              src="/ocr/augmentation_stats_example_gear_card.png"
              width={gearCardImageWidth}
              height={gearCardImageHeight}
              alt="Augmentation stats example"
            />
          }
          onSelect={onImageSourceSelect}
        />

        {!selectedImageSource && <Typography>or</Typography>}

        <ImageSourceSelect
          imageSource="augmentScreen"
          selectedImageSource={selectedImageSource}
          exampleImage={
            <Image
              src="/ocr/augmentation_stats_example_augment_screen.png"
              width={augmentScreenImageWidth}
              height={augmentScreenImageHeight}
              alt="Augmentation stats example"
            />
          }
          note="(The numbers don't import well for this screenshot type)"
          onSelect={onImageSourceSelect}
        />
      </Stack>
    </Box>
  );
}

function ImageSourceSelect({
  imageSource,
  selectedImageSource,
  exampleImage,
  note,
  onSelect,
}: {
  imageSource: ImageSource;
  selectedImageSource: ImageSource | undefined;
  exampleImage: ReactNode;
  note?: string;
  onSelect(imageSource: ImageSource): void;
}) {
  // Show when nothing is selected or is the one selected
  return (
    (!selectedImageSource || selectedImageSource === imageSource) && (
      <Stack sx={{ gap: 1, alignItems: "center" }}>
        {exampleImage}

        {note && (
          <Typography
            variant="body2"
            sx={{ color: (theme) => theme.palette.warning.main }}
          >
            {note}
          </Typography>
        )}

        {!selectedImageSource && (
          <Button
            onClick={() => {
              onSelect(imageSource);
            }}
            sx={{ width: "100%" }}
          >
            Select
          </Button>
        )}
      </Stack>
    )
  );
}
