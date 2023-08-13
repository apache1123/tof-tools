import { Chip, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { BoxCheckbox } from '../../components/BoxCheckbox/BoxCheckbox';
import { BoxCheckboxWithStars } from '../../components/BoxCheckbox/BoxCheckboxWithStars';
import { PercentageNumericInput } from '../../components/NumericInput/PercentageNumericInput';
import { activeMatrixAttackBuffsLookup } from '../../constants/matrix-attack-buffs';
import { activeWeaponAttackBuffsLookup } from '../../constants/weapon-attack-buffs';
import { toSignedPercentageString1dp } from '../../utils/number-utils';
import {
  addMatrixAttackBuff,
  addWeaponAttackBuff,
  removeMatrixAttackBuff,
  removeWeaponAttackBuff,
  selectedElementalBuffsState,
} from './states/derived/selected-elemental-buffs';
import {
  selectedElementalUserStatsState,
  setMiscAttackPercent,
} from './states/derived/selected-elemental-user-stats';
import { gearComparerOptionsState } from './states/gear-comparer-options';

export function AttackPercentBuffs() {
  const { selectedElementalType } = useSnapshot(gearComparerOptionsState);
  const { selectedElementalUserStats } = useSnapshot(
    selectedElementalUserStatsState
  );
  const { selectedElementalBuffs } = useSnapshot(selectedElementalBuffsState);

  if (
    !selectedElementalType ||
    !selectedElementalUserStats ||
    !selectedElementalBuffs
  ) {
    return null;
  }

  const { miscAttackPercent } = selectedElementalUserStats;
  const { weaponAttackBuffs, matrixAttackBuffs } = selectedElementalBuffs;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {selectedElementalType ? `${selectedElementalType} attack` : 'Attack'} %
        buffs
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is only needed if you&apos;re comparing gear with attack %
        stats and want to be accurate, otherwise don&apos;t bother
      </Typography>

      <Grid container spacing={2} mt={1}>
        {activeWeaponAttackBuffsLookup.allIds.map((id) => {
          const { displayName, value, description } =
            activeWeaponAttackBuffsLookup.byId[id];
          return (
            <Grid key={id} xs={6} sm={4} md={3} display="flex">
              <BoxCheckbox
                title={displayName}
                subtitle={toSignedPercentageString1dp(value)}
                info={description}
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

      <Divider variant="middle" sx={{ marginY: 2 }}>
        <Chip label="Matrices" />
      </Divider>

      <Grid container spacing={2}>
        {activeMatrixAttackBuffsLookup.allIds.map((id) => {
          const { displayName, starValues, description } =
            activeMatrixAttackBuffsLookup.byId[id];
          return (
            <Grid key={id} xs={6} sm={4} md={3} display="flex">
              <BoxCheckboxWithStars
                title={displayName}
                subtitle={starValues
                  .map((starValue) =>
                    toSignedPercentageString1dp(starValue.value)
                  )
                  .join('/')}
                info={description}
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

      <Grid container spacing={2} mt={2}>
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
    </>
  );
}
