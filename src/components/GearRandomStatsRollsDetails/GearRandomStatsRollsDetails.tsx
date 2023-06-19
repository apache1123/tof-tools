import { Button, Modal, Paper, Typography } from '@mui/material';
import pluralize from 'pluralize';
import { Fragment, useState } from 'react';

import { Gear } from '../../models/gear';
import { gearCalculationService } from '../../services/gear-calculation-service';
import { modalStyle } from '../Modal/Modal';

export interface GearRandomStatsRollsDetailsProps {
  gear: Gear;
}

export const GearRandomStatsRollsDetails = ({
  gear,
}: GearRandomStatsRollsDetailsProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const randomStatRollCombinations =
    gearCalculationService.getRandomStatRollCombinations(gear);

  return (
    <div>
      <Button onClick={handleOpen}>Random stats rolls details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={modalStyle} elevation={0}>
          {randomStatRollCombinations.map((x) => (
            <Fragment key={x.stars}>
              <Typography variant="h6">For a {x.stars} star gear:</Typography>
              <ul>
                {x.randomStatRollCombinations.map((y) => (
                  <li key={y.randomStatName}>
                    <Typography>
                      <b>{`${y.randomStatName}: `}</b>
                      {pluralize('roll', y.rollCombination.numberOfRolls, true)}
                      {!!y.rollCombination.rollStrength &&
                        `, strength: ${y.rollCombination.rollStrength.toLocaleString(
                          'en',
                          { style: 'percent' }
                        )}`}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Fragment>
          ))}
        </Paper>
      </Modal>
    </div>
  );
};
