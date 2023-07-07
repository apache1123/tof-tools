import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { BoxCheckboxWithStars } from '../../../components/BoxCheckbox/BoxCheckboxWithStars';
import { PercentageNumericInput } from '../../../components/NumericInput/PercentageNumericInput';
import { matrixCritDamageBuffsLookup } from '../../../constants/matrix-crit-damage-buffs';
import {
  addMatrixCritDamageBuff,
  removeMatrixCritDamageBuff,
  selectedBuffsStore,
} from '../stores/selected-buffs';
import { setMiscCritDamage, userStatsStore } from '../stores/user-stats';

export function CritDamageContainer() {
  const { miscCritDamage } = useSnapshot(userStatsStore);
  const { matrixCritDamageBuffs } = useSnapshot(selectedBuffsStore);

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Crit damage %
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is needed if you&apos;re comparing gear with crit related
        stats and want to be accurate, otherwise don&apos;t bother
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
        {matrixCritDamageBuffsLookup.allIds.map((id) => {
          const { displayName, starValues } =
            matrixCritDamageBuffsLookup.byId[id];
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
