import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tooltip,
} from '@mui/material';

import { statTypes } from '../../../configs/stat-types';
import { Gear } from '../../models/gear';
import { GearType } from '../../models/gear-type';
import { StatType } from '../../models/stat-type';
import { GearOCRModal } from '../GearOCRModal/GearOCRModal';
import { GearRandomStatsRollsDetails } from '../GearRandomStatsRollsDetails/GearRandomStatsRollsDetails';
import { GearStarsSelector } from '../GearStarsSelector/GearStarsSelector';
import { GearTypeIcon } from '../GearTypeIcon/GearTypeIcon';
import { GearTypeSelector } from '../GearTypeSelector/GearTypeSelector';
import { StatEditor } from '../StatEditor/StatEditor';

export interface GearPieceProps {
  selectedGear: Gear;
  showGearOCRButton?: boolean;
  onGearChange?(gear: Gear): void;
  onGearTypeChange?(value: GearType | undefined): void;
  onGearStarsChange?(value: number): void;
  onRandomStatTypeChange?(
    gearRandomStatIndex: number,
    value: StatType | undefined
  ): void;
  onRandomStatValueChange?(gearStatIndex: number, value: number): void;
}

export const GearPiece = ({
  selectedGear,
  showGearOCRButton,
  onGearChange,
  onGearTypeChange,
  onGearStarsChange,
  onRandomStatTypeChange,
  onRandomStatValueChange,
}: GearPieceProps) => {
  const possibleStatTypes =
    selectedGear?.type?.possibleRandomStatTypes?.map(
      (statName) => statTypes.byId[statName]
    ) ?? [];

  return (
    <Card>
      <CardHeader
        title={
          <Grid container spacing={2}>
            <Grid maxWidth={90} display="flex" alignItems="center">
              <GearTypeIcon gearName={selectedGear?.type?.name} size={80} />
            </Grid>
            <Grid
              xs
              item
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <GearTypeSelector
                selectedGearType={selectedGear?.type}
                onChange={(value) => {
                  if (onGearTypeChange) {
                    onGearTypeChange(value);
                  }
                }}
              />
              <Box mt={1}>
                <GearStarsSelector
                  stars={selectedGear.stars}
                  onStarsChange={onGearStarsChange}
                />
                {!selectedGear.stars && (
                  <Tooltip title="This is optional and won't affect the calculations if not selected, but will aid the tool in determining the roll details.">
                    <InfoOutlinedIcon sx={{ ml: 1 }} />
                  </Tooltip>
                )}
              </Box>
            </Grid>
          </Grid>
        }
        action={
          showGearOCRButton && <GearOCRModal onFinalizeGear={onGearChange} />
        }
      />
      <CardContent>
        {[...Array(selectedGear?.type?.numberOfRandomStats ?? 0)].map(
          (_, i) => {
            const selectedRandomStat = selectedGear?.randomStats?.at(i);

            return (
              <StatEditor
                key={i}
                selectedStat={selectedRandomStat}
                possibleStatTypes={possibleStatTypes}
                onStatTypeChange={(value) => {
                  if (onRandomStatTypeChange) onRandomStatTypeChange(i, value);
                }}
                onStatValueChange={(value) => {
                  if (onRandomStatValueChange)
                    onRandomStatValueChange(i, value);
                }}
              />
            );
          }
        )}
        {!!selectedGear?.randomStats?.length && (
          <Box mt={2} textAlign="right">
            <GearRandomStatsRollsDetails gear={selectedGear} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
