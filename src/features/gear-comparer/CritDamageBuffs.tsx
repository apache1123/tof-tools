import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { BoxCheckboxWithStars } from '../../components/BoxCheckbox/BoxCheckboxWithStars';
import { PercentageNumericInput } from '../../components/NumericInput/PercentageNumericInput';
import { activeMatrixCritDamageBuffsLookup } from '../../constants/matrix-crit-damage-buffs';
import { toSignedPercentageString1dp } from '../../utils/number-utils';
import {
  addMatrixCritDamageBuff,
  removeMatrixCritDamageBuff,
  selectedElementalBuffsStore,
} from './stores/derived/selected-elemental-buffs';
import {
  selectedElementalUserStatsStore,
  setMiscCritDamage,
} from './stores/derived/selected-elemental-user-stats';

export function CritDamageBuffs() {
  const { selectedElementalUserStats } = useSnapshot(
    selectedElementalUserStatsStore
  );
  const { selectedElementalBuffs } = useSnapshot(selectedElementalBuffsStore);

  if (!selectedElementalUserStats || !selectedElementalBuffs) {
    return null;
  }

  const { miscCritDamage } = selectedElementalUserStats;
  const { matrixCritDamageBuffs } = selectedElementalBuffs;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Crit damage % buffs
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is only needed if you&apos;re comparing gear with crit
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
        {activeMatrixCritDamageBuffsLookup.allIds.map((id) => {
          const { displayName, starValues, description } =
            activeMatrixCritDamageBuffsLookup.byId[id];
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
                isChecked={id in matrixCritDamageBuffs}
                onChange={(isChecked, stars) => {
                  if (isChecked) {
                    addMatrixCritDamageBuff(id, stars);
                  } else {
                    removeMatrixCritDamageBuff(id);
                  }
                }}
                maxNumOfStars={3}
                stars={matrixCritDamageBuffs[id]?.stars ?? 0}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
