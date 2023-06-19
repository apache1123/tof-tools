import { Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { ElementalTypeSelector } from '../src/components/ElementalTypeSelector/ElementalTypeSelector';
import { GearPiece } from '../src/components/GearPiece/GearPiece';
import { GridBreak } from '../src/components/GridBreak/GridBreak';
import { NumericInput } from '../src/components/NumericInput/NumericInput';
import { PercentageNumericInput } from '../src/components/NumericInput/PercentageNumericInput';
import { useGear } from '../src/hooks/useGear';
import { GearType } from '../src/models/gear-type';
import { ElementalType } from '../src/models/stat-type';
import { gearCalculationService } from '../src/services/gear-calculation-service';
import { gearTypeService } from '../src/services/gear-type-service';
import { statTypeService } from '../src/services/stat-type-service';

interface GearComparerProps {
  gearTypes: GearType[];
}

export default function GearComparer({ gearTypes }: GearComparerProps) {
  const {
    gear: gearA,
    setGear: setGearA,
    setGearType: setGearAGearType,
    setGearStars: setGearAStars,
    setRandomStatType: setGearARandomStatType,
    setRandomStatValue: setGearARandomStatValue,
  } = useGear();
  const {
    gear: gearB,
    setGear: setGearB,
    setGearType: setGearBGearType,
    setGearStars: setGearBStars,
    setRandomStatType: setGearBRandomStatType,
    setRandomStatValue: setGearBRandomStatValue,
  } = useGear();

  const [elementalType, setElementalType] = useState<ElementalType>();
  const [baseAttack, setBaseAttack] = useState<number>(0);
  const [critFlat, setCritFlat] = useState<number>(0);
  const [charLevel, setCharLevel] = useState<number>(90);

  const [otherGearAttackPercent, setOtherGearAttackPercent] =
    useState<number>(0);
  const [otherCritPercent, setOtherCritPercent] = useState<number>(0);

  const gearAValue = gearCalculationService.getGearValue(
    gearA,
    elementalType,
    baseAttack,
    critFlat,
    charLevel,
    otherGearAttackPercent,
    otherCritPercent,
    0,
    0
  );
  const gearBValue = gearCalculationService.getGearValue(
    gearB,
    elementalType,
    baseAttack,
    critFlat,
    charLevel,
    otherGearAttackPercent,
    otherCritPercent,
    0,
    0
  );

  return (
    <>
      <Head>
        <title>ToF Gear Comparer</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Grid container spacing={3} mb={3}>
          <Grid xs={12} md={6}>
            <GearPiece
              possibleGearTypes={gearTypes}
              selectedGear={gearA}
              showGearOCRButton
              onGearChange={setGearA}
              onGearTypeChange={setGearAGearType}
              onGearStarsChange={setGearAStars}
              onRandomStatTypeChange={setGearARandomStatType}
              onRandomStatValueChange={setGearARandomStatValue}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <GearPiece
              possibleGearTypes={gearTypes}
              selectedGear={gearB}
              showGearOCRButton
              onGearChange={setGearB}
              onGearTypeChange={setGearBGearType}
              onGearStarsChange={setGearBStars}
              onRandomStatTypeChange={setGearBRandomStatType}
              onRandomStatValueChange={setGearBRandomStatValue}
            />
          </Grid>

          <GridBreak />

          <Grid xs={12} md={6}>
            <Paper>
              <Typography align="center">Value: </Typography>
              <Typography
                fontSize="1.5rem"
                align="center"
                sx={{
                  color:
                    gearAValue > gearBValue ? 'success.main' : 'error.main',
                }}
              >
                {gearAValue.toLocaleString('en', {
                  style: 'percent',
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper>
              <Typography align="center">Value: </Typography>
              <Typography
                fontSize="1.5rem"
                align="center"
                sx={{
                  color:
                    gearBValue > gearAValue ? 'success.main' : 'error.main',
                }}
              >
                {gearBValue.toLocaleString('en', {
                  style: 'percent',
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid xs={12} sm={6} md={3}>
            <ElementalTypeSelector
              elementalType={elementalType}
              onElementalTypeChange={setElementalType}
              label="Elemental type to compare"
            />
          </Grid>
          <GridBreak />
          <Grid xs={12} sm={4} md={3} lg={2}>
            <NumericInput
              id="base-attack"
              label={
                elementalType ? `${elementalType} base attack` : 'Base attack'
              }
              variant="filled"
              value={baseAttack}
              onChange={setBaseAttack}
            />
          </Grid>
          <Grid xs={12} sm={4} md={3} lg={2}>
            <NumericInput
              id="crit-flat"
              label="Crit"
              variant="filled"
              value={critFlat}
              onChange={setCritFlat}
            />
          </Grid>
          <Grid xs={12} sm={4} md={3} lg={2}>
            <NumericInput
              id="char-level"
              label="Character level"
              variant="filled"
              value={charLevel}
              onChange={setCharLevel}
            />
          </Grid>
          <GridBreak />
          <Grid>
            <PercentageNumericInput
              id="other-gear-atk-percent"
              label={
                elementalType
                  ? `${elementalType} attack % from other gear`
                  : 'Attack % from other gear'
              }
              variant="filled"
              value={otherGearAttackPercent}
              onChange={setOtherGearAttackPercent}
            />
          </Grid>
          <Grid>
            <PercentageNumericInput
              id="other-crit-percent"
              label="Crit % from other sources"
              variant="filled"
              value={otherCritPercent}
              onChange={setOtherCritPercent}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps<GearComparerProps> = async () => {
  const gearTypes = gearTypeService.getAllGearTypes(statTypeService);

  return {
    props: {
      gearTypes,
    },
  };
};
