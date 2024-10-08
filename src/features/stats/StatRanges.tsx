import {
  Box,
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

import {
  NumericStringInteger,
  NumericStringPercentage2dp,
} from '../../components/NumericString/NumericString';
import { statTypesLookup } from '../../definitions/stat-types';

export function StatRanges() {
  return (
    <Box>
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
                    <StatValue
                      value={randomStatDefaultValue}
                      isPercentageBased={isPercentageBased}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <StatValue
                      value={randomStatMinRollValue}
                      isPercentageBased={isPercentageBased}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <StatValue
                      value={randomStatMaxRollValue}
                      isPercentageBased={isPercentageBased}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <StatValue
                      value={average5RollsTotalValue}
                      isPercentageBased={isPercentageBased}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <StatValue
                      value={max5RollsTotalValue}
                      isPercentageBased={isPercentageBased}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function StatValue({
  value,
  isPercentageBased,
}: {
  value: number;
  isPercentageBased: boolean;
}) {
  return isPercentageBased ? (
    <NumericStringPercentage2dp value={value} />
  ) : (
    <NumericStringInteger value={value} />
  );
}
