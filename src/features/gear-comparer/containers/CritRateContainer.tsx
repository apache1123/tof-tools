import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { BoxCheckbox } from '../../../components/BoxCheckbox/BoxCheckbox';
import { BoxCheckboxWithStars } from '../../../components/BoxCheckbox/BoxCheckboxWithStars';
import { PercentageNumericInput } from '../../../components/NumericInput/PercentageNumericInput';
import { matrixCritRateBuffsLookup } from '../../../constants/matrix-crit-rate-buffs';
import { weaponCritRateBuffsLookup } from '../../../constants/weapon-crit-rate-buffs';
import { toSignedPercentageString1dp } from '../../../utils/number-utils';
import {
  addMatrixCritRateBuff,
  addWeaponCritRateBuff,
  removeMatrixCritRateBuff,
  removeWeaponCritRateBuff,
  selectedElementalBuffsStore,
} from '../stores/derived/selected-elemental-buffs';
import {
  selectedElementalUserStatsStore,
  setMiscCritRate,
} from '../stores/derived/selected-elemental-user-stats';

export function CritRateContainer() {
  const { selectedElementalUserStats } = useSnapshot(
    selectedElementalUserStatsStore
  );
  const { selectedElementalBuffs } = useSnapshot(selectedElementalBuffsStore);

  if (!selectedElementalUserStats || !selectedElementalBuffs) {
    return null;
  }

  const { miscCritRate } = selectedElementalUserStats;
  const { weaponCritRateBuffs, matrixCritRateBuffs } = selectedElementalBuffs;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Crit rate % buffs
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is only needed if you&apos;re comparing gear with crit
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
        {weaponCritRateBuffsLookup.allIds.map((id) => {
          const { displayName, value, description } =
            weaponCritRateBuffsLookup.byId[id];
          return (
            <Grid key={id} xs={6} sm={4} md={3} display="flex">
              <BoxCheckbox
                title={displayName}
                subtitle={toSignedPercentageString1dp(value)}
                info={description}
                isChecked={id in weaponCritRateBuffs}
                onIsCheckedChange={(isChecked) => {
                  if (isChecked) {
                    addWeaponCritRateBuff(id);
                  } else {
                    removeWeaponCritRateBuff(id);
                  }
                }}
              />
            </Grid>
          );
        })}
        {matrixCritRateBuffsLookup.allIds.map((id) => {
          const { displayName, starValues, description } =
            matrixCritRateBuffsLookup.byId[id];
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
                isChecked={id in matrixCritRateBuffs}
                onChange={(isChecked, stars) => {
                  if (isChecked) {
                    addMatrixCritRateBuff(id, stars);
                  } else {
                    removeMatrixCritRateBuff(id);
                  }
                }}
                maxNumOfStars={3}
                stars={matrixCritRateBuffs[id]?.stars ?? 0}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
