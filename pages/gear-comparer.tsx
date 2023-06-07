import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';

import { GearPiece } from '../src/components/GearPiece/GearPiece';
import { gearTypeService } from '../src/data-services/gear-type-service';
import { statTypeService } from '../src/data-services/stat-type-service';
import { useGear } from '../src/hooks/useGear';
import { GearType } from '../src/models/gear-type';

interface GearComparerProps {
  gearTypes: GearType[];
}

export default function GearComparer({ gearTypes }: GearComparerProps) {
  const {
    gear: gearA,
    setGearType: setGearAGearType,
    setRandomStatType: setGearARandomStatType,
    setRandomStatValue: setGearARandomStatValue,
  } = useGear();
  const {
    gear: gearB,
    setGearType: setGearBGearType,
    setRandomStatType: setGearBRandomStatType,
    setRandomStatValue: setGearBRandomStatValue,
  } = useGear();

  return (
    <Fragment>
      <Head>
        <title>ToF Gear Comparer</title>
      </Head>

      <GearPiece
        possibleGearTypes={gearTypes}
        selectedGear={gearA}
        onGearTypeChange={setGearAGearType}
        onRandomStatTypeChange={setGearARandomStatType}
        onRandomStatValueChange={setGearARandomStatValue}
      />

      <GearPiece
        possibleGearTypes={gearTypes}
        selectedGear={gearB}
        onGearTypeChange={setGearBGearType}
        onRandomStatTypeChange={setGearBRandomStatType}
        onRandomStatValueChange={setGearBRandomStatValue}
      />
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
