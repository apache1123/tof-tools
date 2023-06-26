import { Container, Paper, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useImmer } from 'use-immer';

import { matrixAttackBuffs } from '../configs/matrix-attack-buffs';
import { weaponAttackBuffs } from '../configs/weapon-attack-buffs';
import { BoxCheckbox } from '../src/components/BoxCheckbox/BoxCheckbox';
import { BoxCheckboxWithStars } from '../src/components/BoxCheckbox/BoxCheckboxWithStars';
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
  const [otherAttackFlat, setOtherAttackFlat] = useState<number>(0);
  const [critFlat, setCritFlat] = useState<number>(0);
  const [charLevel, setCharLevel] = useState<number>(90);

  const [otherGearAttackPercent, setOtherGearAttackPercent] =
    useState<number>(0);
  const [miscAttackPercent, setMiscAttackPercent] = useState<number>(0);

  const [selectedWeaponAttackBuffs, setSelectedWeaponAttackBuffs] = useImmer<{
    [buffName: string]: NonNullable<unknown>;
  }>({});
  const handleWeaponAttackBuffSelectedChange = (
    buffName: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      setSelectedWeaponAttackBuffs((draft) => {
        draft[buffName] = {};
      });
    } else {
      setSelectedWeaponAttackBuffs((draft) => {
        delete draft[buffName];
      });
    }
  };

  const [selectedMatrixAttackBuffs, setSelectedMatrixAttackBuffs] = useImmer<{
    [buffName: string]: { stars: number };
  }>({});
  const handleMatrixAttackBuffSelectedChange = (
    buffName: string,
    isSelected: boolean,
    stars: number
  ) => {
    if (isSelected) {
      setSelectedMatrixAttackBuffs((draft) => {
        draft[buffName] = { stars };
      });
    } else {
      setSelectedMatrixAttackBuffs((draft) => {
        delete draft[buffName];
      });
    }
  };

  const [otherCritPercent, setOtherCritPercent] = useState<number>(0);

  const allOtherAttackPercents = [otherGearAttackPercent, miscAttackPercent]
    .concat(
      Object.keys(selectedWeaponAttackBuffs).map(
        (buffName) =>
          weaponAttackBuffs.find((buff) => buff.name === buffName)?.value ?? 0
      )
    )
    .concat(
      Object.keys(selectedMatrixAttackBuffs).map(
        (buffName) =>
          matrixAttackBuffs
            .find((buff) => buff.name === buffName)
            ?.starValues?.find(
              (starValue) =>
                starValue.star === selectedMatrixAttackBuffs[buffName].stars
            )?.value ?? 0
      )
    );

  const gearAValue = gearCalculationService.getGearValue(
    gearA,
    elementalType,
    charLevel,
    [otherAttackFlat],
    allOtherAttackPercents,
    [critFlat],
    [otherCritPercent]
  );
  const gearBValue = gearCalculationService.getGearValue(
    gearB,
    elementalType,
    charLevel,
    [otherAttackFlat],
    allOtherAttackPercents,
    [critFlat],
    [otherCritPercent]
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

        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={4}>
            <ElementalTypeSelector
              elementalType={elementalType}
              onElementalTypeChange={setElementalType}
              label="Elemental type to compare"
            />
          </Grid>
          <GridBreak />
          <Grid xs={12} sm={6} md={4} lg={3}>
            <NumericInput
              id="base-attack"
              label={
                'Base attack' + (elementalType ? ` (${elementalType})` : '')
              }
              variant="filled"
              required
              error={!otherAttackFlat}
              value={otherAttackFlat}
              onChange={setOtherAttackFlat}
              helperText={
                <Tooltip
                  title={
                    <Image
                      src="/base_attack_example.png"
                      alt="base-attack-example"
                      width={230}
                      height={90}
                    />
                  }
                >
                  <span>
                    <b>
                      Take off the piece of gear you&apos;re currently
                      comparing.
                    </b>{' '}
                    Found on character sheet
                  </span>
                </Tooltip>
              }
            />
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3}>
            <NumericInput
              id="crit-flat"
              label="Crit"
              variant="filled"
              required
              error={!critFlat}
              value={critFlat}
              onChange={setCritFlat}
            />
          </Grid>
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <NumericInput
            id="char-level"
            label="Character level"
            variant="filled"
            value={charLevel}
            onChange={setCharLevel}
          />
        </Grid>
        <Grid xs={12}>
          <Typography>Attack %</Typography>
        </Grid>
        <Grid container spacing={1}>
          <Grid xs={12} sm={6}>
            <PercentageNumericInput
              id="other-gear-atk-percent"
              label={
                'Attack %' +
                (elementalType ? ` (${elementalType})` : '') +
                ' from other gear pieces'
              }
              variant="filled"
              value={otherGearAttackPercent}
              onChange={setOtherGearAttackPercent}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <PercentageNumericInput
              id="misc-atk-percent"
              label="Misc. attack % buffs"
              variant="filled"
              value={miscAttackPercent}
              onChange={setMiscAttackPercent}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Typography>Weapon attack % buffs</Typography>
          </Grid>
          {weaponAttackBuffs.map((buff) => (
            <Grid key={buff.name} xs={6} sm={4} display="flex">
              <BoxCheckbox
                title={buff.name}
                subtitle={buff.value.toLocaleString('en', {
                  style: 'percent',
                  maximumFractionDigits: 1,
                  signDisplay: 'always',
                })}
                isChecked={buff.name in selectedWeaponAttackBuffs}
                onIsCheckedChange={(checked) =>
                  handleWeaponAttackBuffSelectedChange(buff.name, checked)
                }
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Typography>Matrix attack % buffs</Typography>
          </Grid>
          {matrixAttackBuffs.map((buff) => (
            <Grid key={buff.name} xs={6} sm={4} display="flex">
              <BoxCheckboxWithStars
                title={buff.name}
                subtitle={buff.starValues
                  .map((starValue) =>
                    starValue.value.toLocaleString('en', {
                      style: 'percent',
                      maximumFractionDigits: 1,
                      signDisplay: 'always',
                    })
                  )
                  .join('/')}
                isChecked={buff.name in selectedMatrixAttackBuffs}
                onChange={(isChecked, stars) =>
                  handleMatrixAttackBuffSelectedChange(
                    buff.name,
                    isChecked,
                    stars
                  )
                }
                maxNumOfStars={3}
                stars={selectedMatrixAttackBuffs[buff.name]?.stars ?? 0}
              />
            </Grid>
          ))}
        </Grid>
        <Grid xs={12}>
          <Typography>Crit %</Typography>
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
        <Grid xs={12}>
          <Typography>Crit Damage %</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography>
            {elementalType ? elementalType : 'Elemental'} Damage %
          </Typography>
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
