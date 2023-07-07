import { Chip, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { BoxCheckbox } from '../../../components/BoxCheckbox/BoxCheckbox';
import { BoxCheckboxWithStars } from '../../../components/BoxCheckbox/BoxCheckboxWithStars';
import { PercentageNumericInput } from '../../../components/NumericInput/PercentageNumericInput';
import { matrixAttackBuffsLookup } from '../../../constants/matrix-attack-buffs';
import { weaponAttackBuffsLookup } from '../../../constants/weapon-attack-buffs';
import {
  addMatrixAttackBuff,
  addWeaponAttackBuff,
  removeMatrixAttackBuff,
  removeWeaponAttackBuff,
  selectedBuffsStore,
} from '../stores/selected-buffs';
import {
  setMiscAttackPercent,
  setOtherGearAttackPercent,
  userStatsStore,
} from '../stores/user-stats';

export function AttackPercentContainer() {
  const { elementalType, otherGearAttackPercent, miscAttackPercent } =
    useSnapshot(userStatsStore);
  const { weaponAttackBuffs, matrixAttackBuffs } =
    useSnapshot(selectedBuffsStore);

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {elementalType ? `${elementalType} attack` : 'Attack'} % buffs
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is needed if you&apos;re comparing gear with attack % stats
        and want to be accurate, otherwise don&apos;t bother
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
        {weaponAttackBuffsLookup.allIds.map((id) => {
          const { displayName, value } = weaponAttackBuffsLookup.byId[id];
          return (
            <Grid key={id} xs={6} sm={4} md={3} display="flex">
              <BoxCheckbox
                title={displayName}
                subtitle={value.toLocaleString('en', {
                  style: 'percent',
                  maximumFractionDigits: 1,
                  signDisplay: 'always',
                })}
                isChecked={id in weaponAttackBuffs}
                onIsCheckedChange={(checked) => {
                  if (checked) {
                    addWeaponAttackBuff(id);
                  } else {
                    removeWeaponAttackBuff(id);
                  }
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      <Divider variant="middle" sx={{ marginY: 3 }}>
        <Chip label="Matrices" />
      </Divider>

      <Grid container spacing={2}>
        {matrixAttackBuffsLookup.allIds.map((id) => {
          const { displayName, starValues } = matrixAttackBuffsLookup.byId[id];
          return (
            <Grid key={id} xs={6} sm={4} md={3} display="flex">
              <BoxCheckboxWithStars
                title={displayName}
                subtitle={starValues
                  .map((starValue) =>
                    starValue.value.toLocaleString('en', {
                      style: 'percent',
                      maximumFractionDigits: 1,
                      signDisplay: 'always',
                    })
                  )
                  .join('/')}
                isChecked={id in matrixAttackBuffs}
                onChange={(isChecked, stars) => {
                  if (isChecked) {
                    addMatrixAttackBuff(id, stars);
                  } else {
                    removeMatrixAttackBuff(id);
                  }
                }}
                maxNumOfStars={3}
                stars={matrixAttackBuffs[id]?.stars ?? 0}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
