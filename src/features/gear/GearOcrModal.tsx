import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import BigNumber from "bignumber.js";
import a from "indefinite";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import { ImageOcr } from "../../components/common/ImageOcr/ImageOcr";
import { ButtonModal } from "../../components/common/Modal/ButtonModal";
import {
  goldGearNamePrefix,
  randomStatsSectionTitle,
  titanGearNamePrefix,
} from "../../definitions/gear";
import type { GearTypeId } from "../../definitions/gear-types";
import { getGearType, getGearTypeOrder } from "../../definitions/gear-types";
import { statTypesLookup } from "../../definitions/stat-types";
import type { CharacterId } from "../../models/character/character-data";
import { Gear } from "../../models/gear/gear";
import type { GearType } from "../../models/gear/gear-type";
import { RandomStat } from "../../models/gear/random-stat";
import type { StatType } from "../../models/gear/stat-type";
import type { OcrTempGearState } from "../../states/gear/ocr-temp-gear-state";
import { ocrTempGearState } from "../../states/gear/ocr-temp-gear-state";
import { ocrState } from "../../states/ocr/ocr-state";
import {
  containsString,
  indexOfIgnoringCase,
  splitIntoWords,
} from "../../utils/string-utils";
import { EditGear } from "./EditGear";

export interface GearOcrModalProps {
  characterId: CharacterId;
  enforceGearType?: GearTypeId;
  iconButton?: boolean;

  onFinalizeGear?(gear: Gear): void;
}

const unableToParseGearTypeError = () => (
  <>
    Unable to get gear type from image. <ExampleScreenshotModal />
  </>
);
const incorrectGearTypeError = (gearTypeId: GearTypeId) =>
  `Please choose ${a(gearTypeId)}`;

export function GearOcrModal({
  characterId,
  onFinalizeGear,
  enforceGearType,
  iconButton,
}: GearOcrModalProps) {
  const { worker } = useSnapshot(ocrState);

  useEffect(() => {
    (async () => {
      await ocrState.initializeWorker();
    })();
  }, []);

  const { tempGear } = useSnapshot(ocrTempGearState) as OcrTempGearState;

  const [imageUrl, setImageUrl] = useState<string>();
  const handleImageUrlChange = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  const [errorMessage, setErrorMessage] = useState<ReactNode>();

  const handleOcrTextChange = (text: string) => {
    ocrTempGearState.removeTempGear();
    setErrorMessage(undefined);

    const ocrGear = getGearFromOcr(text);
    if (ocrGear) {
      if (enforceGearType && ocrGear.type.id !== enforceGearType) {
        setErrorMessage(incorrectGearTypeError(enforceGearType));
        return;
      }
      ocrTempGearState.setTempGear(ocrGear);
    } else {
      setErrorMessage(unableToParseGearTypeError());
    }
  };

  const handleClose = () => {
    setImageUrl(undefined);
    ocrTempGearState.removeTempGear();
    setErrorMessage(undefined);
  };
  const handleConfirm = () => {
    if (ocrTempGearState.tempGear && onFinalizeGear)
      onFinalizeGear(ocrTempGearState.tempGear);
  };

  return (
    <ButtonModal
      buttonContent="Import gear"
      modalTitle="Import gear by using screenshot"
      modalContent={
        <>
          <Grid container>
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
                onOcrTextChange={handleOcrTextChange}
                onImageUrlChange={handleImageUrlChange}
              />
            </Grid>
            <Grid xs></Grid>
          </Grid>
          <Box textAlign="center" mb={3}>
            <Typography variant="caption">
              Gear name & random stats should be clearly visible in the
              screenshot. <ExampleScreenshotModal />
            </Typography>
          </Box>

          <Grid container spacing={3} mb={3}>
            <Grid xs={12} sm={6}>
              {imageUrl && (
                // TODO: Fix this sizing
                <Image
                  src={imageUrl}
                  width={260}
                  height={325}
                  alt="uploaded-image-preview"
                />
              )}
            </Grid>
            <Grid
              xs={12}
              sm={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {errorMessage && (
                <Box>
                  <Typography color="error" textAlign="center">
                    {errorMessage}
                  </Typography>
                </Box>
              )}
              {!errorMessage && tempGear && ocrTempGearState.tempGear && (
                <EditGear gearProxy={ocrTempGearState.tempGear} />
              )}
            </Grid>
          </Grid>
        </>
      }
      iconButton={iconButton}
      aria-label="import-gear"
      showConfirm
      showCancel
      isConfirmDisabled={!tempGear}
      onConfirm={handleConfirm}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    />
  );

  function getGearFromOcr(text: string): Gear | undefined {
    let gear: Gear | undefined;

    const lines = text.split(/\r?\n/g);

    let hasFoundGearType = false;
    let foundGearType: GearType;

    let hasFoundRandomStatsSection = false;
    let numOfRandomStatsToFind: number;
    let numOfRandomStatsFound = 0;
    let randomStatTypes: StatType[];

    lines.forEach((line) => {
      if (
        !hasFoundGearType &&
        (containsString(line, goldGearNamePrefix) ||
          containsString(line, titanGearNamePrefix))
      ) {
        const sortedGearTypes = getGearTypeOrder()
          .map((id) => getGearType(id))
          // Sort by inGameName length to aid OCR
          // e.g. 'Super eyepiece' should be matched after 'Eyepiece' to overwrite the 'Eyepiece' match
          .sort((a, b) => a.inGameName.length - b.inGameName.length);

        for (const gearType of sortedGearTypes) {
          if (containsString(line, gearType.inGameName)) {
            gear = new Gear(gearType, characterId);
            hasFoundGearType = true;
            foundGearType = gearType;
          }
        }

        return;
      }

      // If found the random stats section, read up to the max number of random stats of the gear type, if available.
      // If the gear type is not available, read until the end of all the lines (for now, this may need to change in the future)
      if (
        hasFoundGearType &&
        !hasFoundRandomStatsSection &&
        containsString(line, randomStatsSectionTitle)
      ) {
        hasFoundRandomStatsSection = true;

        if (foundGearType) {
          numOfRandomStatsToFind = foundGearType.numberOfRandomStats;
        }

        // Pre-load random stat types for subsequent lines
        randomStatTypes = statTypesLookup.allIds
          .map((id) => statTypesLookup.byId[id])
          // Sort by inGameName length to aid OCR
          // e.g. 'Altered Attack' should be matched after 'Attack' to overwrite the 'Attack' match
          .sort((a, b) => a.inGameName.length - b.inGameName.length);
        return;
      }

      if (
        hasFoundGearType &&
        hasFoundRandomStatsSection &&
        (numOfRandomStatsToFind || numOfRandomStatsToFind === undefined)
      ) {
        let hasMatch = false;

        // Try to match ALL the random stat types since we can match 'Attack' then match 'Altered Attack' for example
        // The last match should be the correct one
        for (const randomStatType of randomStatTypes) {
          const indexOfRandomStatName = indexOfIgnoringCase(
            line,
            randomStatType.inGameName,
          );

          if (indexOfRandomStatName === -1) continue;

          // Matched random stat name, assume the word after the name is the value and try to match it
          const stringAfterRandomStatName = line.slice(
            indexOfRandomStatName + randomStatType.inGameName.length,
          );
          const firstWordAfterRandomStatName = splitIntoWords(
            stringAfterRandomStatName,
          )[0];

          if (!firstWordAfterRandomStatName) continue;

          const hasPercentage = firstWordAfterRandomStatName.includes("%");

          // e.g. 'Physical Resistance +7.87%' has to be matched to 'Physical Resistance %', not 'Physical Resistance'
          if (hasPercentage !== randomStatType.isPercentageBased) continue;

          // Percentage values are in the format '+7.8%' (string)
          // Non-percentage values are in the format '+4,125'
          // Assume the in-game locale is always ',' thousand separator and '.' decimal separator
          const value = hasPercentage
            ? BigNumber(
                firstWordAfterRandomStatName.replace("%", "").replace(",", ""),
              )
                .dividedBy(100)
                .toNumber()
            : +firstWordAfterRandomStatName.replace(",", "");

          if (Number.isNaN(value)) continue;

          if (gear) {
            const randomStat = new RandomStat(randomStatType);
            gear.setRandomStat(numOfRandomStatsFound, randomStat);
            randomStat.value = value;
            hasMatch = true;
          }
        }

        if (hasMatch) {
          numOfRandomStatsFound++;
        }
      }
    });

    return gear;
  }
}

function ExampleScreenshotModal() {
  return (
    <ButtonModal
      buttonContent="Example"
      buttonProps={{ sx: { textTransform: "initial", p: 0 } }}
      modalContent={
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            src="/ocr_screenshot_example.png"
            alt="screenshot-example"
            width={260}
            height={325}
          />
        </Box>
      }
    />
  );
}
