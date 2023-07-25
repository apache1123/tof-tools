import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import BigNumber from 'bignumber.js';

import { statTypesLookup } from '../../constants/stat-types';
import { toPercentageString2dp } from '../../utils/number-utils';

export function StatRanges() {
  return (
    <>
      <Typography variant="h5" mb={1}>
        Stat ranges
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="stat-ranges-table">
          <TableHead>
            <TableRow>
              <TableCell>Stat</TableCell>
              <TableCell align="right">Base value</TableCell>
              <TableCell align="right">Min. roll value</TableCell>
              <TableCell align="right">Max. roll value</TableCell>
              <TableCell align="right">Avg. total value at 5 rolls</TableCell>
              <TableCell align="right">Max. total value at 5 rolls</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statTypesLookup.allIds.map((id) => {
              const {
                displayName,
                randomStatDefaultValue,
                randomStatMinRollValue,
                randomStatMaxRollValue,
                isPercentageBased,
              } = statTypesLookup.byId[id];

              const average5RollsTotalValue = BigNumber(randomStatDefaultValue)
                .plus(
                  BigNumber(randomStatMinRollValue)
                    .plus(randomStatMaxRollValue)
                    .dividedBy(2)
                    .times(5)
                )
                .toNumber();
              const max5RollsTotalValue = BigNumber(randomStatDefaultValue)
                .plus(BigNumber(randomStatMaxRollValue).times(5))
                .toNumber();

              return (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {displayName}
                  </TableCell>
                  <TableCell align="right">
                    {formatStatValue(randomStatDefaultValue, isPercentageBased)}
                  </TableCell>
                  <TableCell align="right">
                    {formatStatValue(randomStatMinRollValue, isPercentageBased)}
                  </TableCell>
                  <TableCell align="right">
                    {formatStatValue(randomStatMaxRollValue, isPercentageBased)}
                  </TableCell>
                  <TableCell align="right">
                    {formatStatValue(
                      average5RollsTotalValue,
                      isPercentageBased
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {formatStatValue(max5RollsTotalValue, isPercentageBased)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function formatStatValue(value: number, isPercentageBased: boolean) {
  return isPercentageBased ? toPercentageString2dp(value) : value;
}
