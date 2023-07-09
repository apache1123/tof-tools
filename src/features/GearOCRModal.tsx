import UploadIcon from '@mui/icons-material/Upload';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { ButtonModal } from '../components/ButtonModal/ButtonModal';
import { ImageOCR } from '../components/ImageOCR/ImageOCR';
import { goldGearNamePrefix, randomStatsSectionTitle } from '../constants/gear';
import { gearTypesLookup } from '../constants/gear-types';
import { statTypesLookup } from '../constants/stat-types';
import { type Gear, newGear } from '../models/gear';
import type { GearType } from '../models/gear-type';
import { newRandomStat, setValue } from '../models/random-stat';
import type { StatType } from '../models/stat-type';
import {
  ocrTempGearStore,
  removeOCRTempGear,
  setOCRTempGear,
} from '../stores/ocr-temp-gear';
import {
  containsString,
  indexOfIgnoringCase,
  splitIntoWords,
} from '../utils/string-utils';
import { GearPiece } from './GearPiece';

export interface GearOCRModalProps {
  onFinalizeGear?(gear: Gear): void;
}

export const GearOCRModal = ({ onFinalizeGear }: GearOCRModalProps) => {
  const { gear } = ocrTempGearStore;
  const { gear: gearSnap } = useSnapshot(ocrTempGearStore);

  const [imageURL, setImageURL] = useState<string>();
  const handleImageURLChange = (imageURL: string) => {
    setImageURL(imageURL);
  };

  const handleOCRTextChange = (text: string) => {
    const ocrGear = getGearFromOCR(text);
    if (ocrGear) setOCRTempGear(ocrGear);
  };

  const handleClose = () => {
    setImageURL(undefined);
    removeOCRTempGear();
  };
  const handleConfirm = () => {
    if (gear && onFinalizeGear) onFinalizeGear(gear);
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
            {imageURL && (
              <Grid xs={12} lg={6}>
                <Image
                  src={imageURL}
                  width={300}
                  height={380}
                  alt="uploaded-image-preview"
                />
              </Grid>
            )}
            {gearSnap && gear && (
              <Grid xs={12} lg={6}>
                <GearPiece gear={gear} showGearOCRButton={false} />
              </Grid>
            )}
          </Grid>
        </>
      }
      iconButtonIcon={<UploadIcon />}
      showConfirm
      showCancel
      isConfirmDisabled={!gearSnap}
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
    if (!hasFoundGearType && containsString(line, goldGearNamePrefix)) {
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
