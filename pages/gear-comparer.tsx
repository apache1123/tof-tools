import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useImmer } from 'use-immer';

import { matrixAttackBuffs } from '../configs/matrix-attack-buffs';
import { matrixCritDamageBuffs } from '../configs/matrix-crit-damage-buffs';
import { matrixCritRateBuffs } from '../configs/matrix-crit-rate-buffs';
import { weaponAttackBuffs } from '../configs/weapon-attack-buffs';
import { weaponCritRateBuffs } from '../configs/weapon-crit-rate-buffs';
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

  const [otherGearElementalDamage, setOtherGearElementalDamage] =
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

  const [miscCritRate, setMiscCritRate] = useState<number>(0);

  const [selectedWeaponCritRateBuffs, setSelectedWeaponCritRateBuffs] =
    useImmer<{
      [buffName: string]: NonNullable<unknown>;
    }>({});
  const handleWeaponCritRateBuffSelectedChange = (
    buffName: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      setSelectedWeaponCritRateBuffs((draft) => {
        draft[buffName] = {};
      });
    } else {
      setSelectedWeaponCritRateBuffs((draft) => {
        delete draft[buffName];
      });
    }
  };

  const [selectedMatrixCritRateBuffs, setSelectedMatrixCritRateBuffs] =
    useImmer<{
      [buffName: string]: { stars: number };
    }>({});
  const handleMatrixCritRateBuffSelectedChange = (
    buffName: string,
    isSelected: boolean,
    stars: number
  ) => {
    if (isSelected) {
      setSelectedMatrixCritRateBuffs((draft) => {
        draft[buffName] = { stars };
      });
    } else {
      setSelectedMatrixCritRateBuffs((draft) => {
        delete draft[buffName];
      });
    }
  };

  const [miscCritDamage, setMiscCritDamage] = useState<number>(0);

  const [selectedMatrixCritDamageBuffs, setSelectedMatrixCritDamageBuffs] =
    useImmer<{
      [buffName: string]: { stars: number };
    }>({});
  const handleMatrixCritDamageBuffSelectedChange = (
    buffName: string,
    isSelected: boolean,
    stars: number
  ) => {
    if (isSelected) {
      setSelectedMatrixCritDamageBuffs((draft) => {
        draft[buffName] = { stars };
      });
    } else {
      setSelectedMatrixCritDamageBuffs((draft) => {
        delete draft[buffName];
      });
    }
  };

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

  const allOtherCritRates = [miscCritRate]
    .concat(
      Object.keys(selectedWeaponCritRateBuffs).map(
        (buffName) =>
          weaponCritRateBuffs.find((buff) => buff.name === buffName)?.value ?? 0
      )
    )
    .concat(
      Object.keys(selectedMatrixCritRateBuffs).map(
        (buffName) =>
          matrixCritRateBuffs
            .find((buff) => buff.name === buffName)
            ?.starValues?.find(
              (starValue) =>
                starValue.star === selectedMatrixCritRateBuffs[buffName].stars
            )?.value ?? 0
      )
    );

  const allOtherCritDamages = [miscCritDamage].concat(
    Object.keys(selectedMatrixCritDamageBuffs).map(
      (buffName) =>
        matrixCritDamageBuffs
          .find((buff) => buff.name === buffName)
          ?.starValues?.find(
            (starValue) =>
              starValue.star === selectedMatrixCritDamageBuffs[buffName].stars
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
    allOtherCritRates,
    allOtherCritDamages
  );
  const gearBValue = gearCalculationService.getGearValue(
    gearB,
    elementalType,
    charLevel,
    [otherAttackFlat],
    allOtherAttackPercents,
    [critFlat],
    allOtherCritRates,
    allOtherCritDamages
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

        <Grid container spacing={2} mb={3}>
          <Grid xs={12} sm={6} md={4}>
            <ElementalTypeSelector
              elementalType={elementalType}
              onElementalTypeChange={setElementalType}
              label="Elemental type to compare"
            />
          </Grid>
        </Grid>

        <Box mb={5}>
          <Typography variant="h5" component="h2" gutterBottom>
            Your stats
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: 'warning.main' }}
            gutterBottom
          >
            Take off the piece of gear you&apos;re currently comparing for the
            following:
          </Typography>

          <Grid container spacing={2}>
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
                    <span>Found on character sheet. Example</span>
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
                helperText="Found on character sheet"
              />
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
          </Grid>
        </Box>

        <Box mb={5}>
          <Typography variant="h5" component="h2" gutterBottom>
            {elementalType ? `${elementalType} attack` : 'Attack'} % buffs
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            This section is needed if you&apos;re comparing gear with attack %
            stats and want to be accurate, otherwise don&apos;t bother
          </Typography>

          <Grid container spacing={2} mb={2}>
            <Grid xs={12} sm={6} md={4} lg={3}>
              <PercentageNumericInput
                id="other-gear-atk-percent"
                label={
                  'Attack %' +
                  (elementalType ? ` (${elementalType})` : '') +
                  ' from all other gear pieces'
                }
                variant="filled"
                value={otherGearAttackPercent}
                onChange={setOtherGearAttackPercent}
                helperText="Add up values from all other gear pieces"
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
              <PercentageNumericInput
                id="misc-atk-percent"
                label="Misc. attack % buffs"
                variant="filled"
                value={miscAttackPercent}
                onChange={setMiscAttackPercent}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {weaponAttackBuffs.map((buff) => (
              <Grid key={buff.name} xs={6} sm={4} md={3} display="flex">
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

          <Divider variant="middle" sx={{ marginY: 3 }}>
            <Chip label="Matrices" />
          </Divider>

          <Grid container spacing={2}>
            {matrixAttackBuffs.map((buff) => (
              <Grid key={buff.name} xs={6} sm={4} md={3} display="flex">
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
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {elementalType ? `${elementalType} damage` : 'Damage'} %
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            This section is needed if you&apos;re comparing gear with dmg %
            related stats and want to be accurate, otherwise don&apos;t bother
          </Typography>

          <Grid container spacing={2} mb={2}>
            <Grid xs={12} sm={6} md={4} lg={3}>
              <PercentageNumericInput
                id="other-gear-elemental-damage"
                label={
                  'Damage %' +
                  (elementalType ? ` (${elementalType})` : '') +
                  ' from all other gear pieces'
                }
                variant="filled"
                value={otherGearElementalDamage}
                onChange={setOtherGearElementalDamage}
                helperText="Add up values from all other gear pieces"
              />
            </Grid>
          </Grid>
        </Box>

        <Box mb={5}>
          <Typography variant="h5" component="h2" gutterBottom>
            Crit rate % buffs
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            This section is needed if you&apos;re comparing gear with crit
            related stats and want to be accurate, otherwise don&apos;t bother
          </Typography>

          <Grid container spacing={2} mb={2}>
            <Grid xs={12} sm={6} md={4} lg={3}>
              <PercentageNumericInput
                id="misc-crit-rate"
                label="Misc. crit rate % buffs"
                variant="filled"
                value={miscCritRate}
                onChange={setMiscCritRate}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {weaponCritRateBuffs.map((buff) => (
              <Grid key={buff.name} xs={6} sm={4} md={3} display="flex">
                <BoxCheckbox
                  title={buff.name}
                  subtitle={buff.value.toLocaleString('en', {
                    style: 'percent',
                    maximumFractionDigits: 1,
                    signDisplay: 'always',
                  })}
                  isChecked={buff.name in selectedWeaponCritRateBuffs}
                  onIsCheckedChange={(checked) =>
                    handleWeaponCritRateBuffSelectedChange(buff.name, checked)
                  }
                />
              </Grid>
            ))}
            {matrixCritRateBuffs.map((buff) => (
              <Grid key={buff.name} xs={6} sm={4} md={3} display="flex">
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
                  isChecked={buff.name in selectedMatrixCritRateBuffs}
                  onChange={(isChecked, stars) =>
                    handleMatrixCritRateBuffSelectedChange(
                      buff.name,
                      isChecked,
                      stars
                    )
                  }
                  maxNumOfStars={3}
                  stars={selectedMatrixCritRateBuffs[buff.name]?.stars ?? 0}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Crit damage %
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            This section is needed if you&apos;re comparing gear with crit
            related stats and want to be accurate, otherwise don&apos;t bother
          </Typography>

          <Grid container spacing={2} mb={2}>
            <Grid xs={12} sm={6} md={4} lg={3}>
              <PercentageNumericInput
                id="misc-crit-damage"
                label="Misc. crit damage % buffs"
                variant="filled"
                value={miscCritDamage}
                onChange={setMiscCritDamage}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {matrixCritDamageBuffs.map((buff) => (
              <Grid key={buff.name} xs={6} sm={4} md={3} display="flex">
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
                  isChecked={buff.name in selectedMatrixCritDamageBuffs}
                  onChange={(isChecked, stars) =>
                    handleMatrixCritDamageBuffSelectedChange(
                      buff.name,
                      isChecked,
                      stars
                    )
                  }
                  maxNumOfStars={3}
                  stars={selectedMatrixCritDamageBuffs[buff.name]?.stars ?? 0}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
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
