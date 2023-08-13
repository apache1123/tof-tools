import UploadIcon from '@mui/icons-material/Upload';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BigNumber from 'bignumber.js';
import a from 'indefinite';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { ImageOCR } from '../components/ImageOCR/ImageOCR';
import { ButtonModal } from '../components/Modal/ButtonModal';
import {
  goldGearNamePrefix,
  randomStatsSectionTitle,
  titanGearNamePrefix,
} from '../constants/gear';
import { gearTypesLookup } from '../constants/gear-types';
import { statTypesLookup } from '../constants/stat-types';
import { type Gear, newGear } from '../models/gear';
import type { GearName, GearType } from '../models/gear-type';
import { newRandomStat, setValue } from '../models/random-stat';
import type { StatType } from '../models/stat-type';
import {
  ocrState,
  removeOCRTempGear,
  setOCRTempGear,
} from '../states/ocr-temp-gear';
import {
  containsString,
  indexOfIgnoringCase,
  splitIntoWords,
} from '../utils/string-utils';
import { GearPiece } from './GearPiece';

export interface GearOCRModalProps {
  onFinalizeGear?(gear: Gear): void;
  enforceGearType?: GearName;
  iconButton?: boolean;
}

const unableToParseGearTypeError = () => (
  <>
    Unable to get gear type from image. <ExampleScreenshotModal />
  </>
);
const incorrectGearTypeError = (gearTypeId: GearName) =>
  `Please choose ${a(gearTypeId)}`;

export const GearOCRModal = ({
  onFinalizeGear,
  enforceGearType,
  iconButton,
}: GearOCRModalProps) => {
  const { tempGear: tempGearState } = ocrState;
  const { tempGear: tempGearSnap } = useSnapshot(ocrState);

  const [imageURL, setImageURL] = useState<string>();
  const handleImageURLChange = (imageURL: string) => {
    setImageURL(imageURL);
  };

  const [errorMessage, setErrorMessage] = useState<ReactNode>();

  const handleOCRTextChange = (text: string) => {
    removeOCRTempGear();
    setErrorMessage(undefined);

    const ocrGear = getGearFromOCR(text);
    if (ocrGear) {
      if (enforceGearType && ocrGear.typeId !== enforceGearType) {
        setErrorMessage(incorrectGearTypeError(enforceGearType));
        return;
      }
      setOCRTempGear(ocrGear);
    } else {
      setErrorMessage(unableToParseGearTypeError());
    }
  };

  const handleClose = () => {
    setImageURL(undefined);
    removeOCRTempGear();
    setErrorMessage(undefined);
  };
  const handleConfirm = () => {
    if (tempGearState && onFinalizeGear) onFinalizeGear(tempGearState);
  };

  return (
    <ButtonModal
      buttonText="Upload gear"
      modalContent={
        <>
          <Grid container>
            <Grid xs></Grid>
            <Grid
              xs={12}
              md={8}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <ImageOCR
                onOCRTextChange={handleOCRTextChange}
                onImageURLChange={handleImageURLChange}
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
            <Grid xs={12} lg={6}>
              {imageURL && (
                // TODO: Fix this sizing
                <Image
                  src={imageURL}
                  width={240}
                  height={300}
                  alt="uploaded-image-preview"
                />
              )}
            </Grid>
            <Grid
              xs={12}
              lg={6}
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
              {!errorMessage && tempGearSnap && tempGearState && (
                <GearPiece
                  gearState={tempGearState}
                  showGearOCRButton={false}
                />
              )}
            </Grid>
          </Grid>
        </>
      }
      icon={<UploadIcon />}
      iconButton={iconButton}
      aria-label="upload-gear"
      showConfirm
      showCancel
      isConfirmDisabled={!tempGearSnap}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
};

function ExampleScreenshotModal() {
  return (
    <ButtonModal
      buttonText="Example"
      buttonSx={{ textTransform: 'initial', p: 0 }}
      modalContent={
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            src="/ocr_screenshot_example.png"
            alt="screenshot-example"
            width={350}
            height={450}
          />
        </Box>
      }
    />
  );
}

function getGearFromOCR(text: string): Gear | undefined {
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
      const sortedGearTypes = gearTypesLookup.allIds
        .map((id) => gearTypesLookup.byId[id])
        // Sort by inGameName length to aid OCR
        // e.g. 'Super eyepiece' should be matched after 'Eyepiece' to overwrite the 'Eyepiece' match
        .sort((a, b) => a.inGameName.length - b.inGameName.length);

      for (const gearType of sortedGearTypes) {
        if (containsString(line, gearType.inGameName)) {
          gear = newGear(gearType);
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
          randomStatType.inGameName
        );

        if (indexOfRandomStatName === -1) continue;

        // Matched random stat name, assume the word after the name is the value and try to match it
        const stringAfterRandomStatName = line.slice(
          indexOfRandomStatName + randomStatType.inGameName.length
        );
        const firstWordAfterRandomStatName = splitIntoWords(
          stringAfterRandomStatName
        )[0];

        if (!firstWordAfterRandomStatName) continue;

        const hasPercentage = firstWordAfterRandomStatName.includes('%');

        // e.g. 'Physical Resistance +7.87%' has to be matched to 'Physical Resistance %', not 'Physical Resistance'
        if (hasPercentage !== !!randomStatType.isPercentageBased) continue;

        // Percentage values are in the format '+7.8%' (string)
        // Non-percentage values are in the format '+4,125'
        // Assume the in-game locale is always ',' thousand separator and '.' decimal separator
        const value = hasPercentage
          ? BigNumber(
              firstWordAfterRandomStatName.replace('%', '').replace(',', '')
            )
              .dividedBy(100)
              .toNumber()
          : +firstWordAfterRandomStatName.replace(',', '');

        if (Number.isNaN(value)) continue;

        if (gear) {
          const randomStat = newRandomStat(randomStatType);
          gear.randomStats[numOfRandomStatsFound] = randomStat;
          setValue(randomStat, value);
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
