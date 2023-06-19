import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';

import { GearPiece } from '../src/components/GearPiece/GearPiece';
import { useGear } from '../src/hooks/useGear';
import { GearType } from '../src/models/gear-type';
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

  return (
    <Fragment>
      <Head>
        <title>ToF Gear Comparer</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Grid container spacing={3}>
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
        </Grid>
      </Container>
    </Fragment>
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
