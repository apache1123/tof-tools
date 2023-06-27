import { Box, Card, CardContent, CardHeader } from '@mui/material';

import { Gear } from '../../models/gear';
import { GearType } from '../../models/gear-type';
import { RandomStatType } from '../../models/random-stat-type';
import { GearOCRModal } from '../GearOCRModal/GearOCRModal';
import { GearRandomStatsRollsDetails } from '../GearRandomStatsRollsDetails/GearRandomStatsRollsDetails';
import { GearTypeSelector } from '../GearTypeSelector/GearTypeSelector';
import { RandomStatEditor } from '../StatEditor/StatEditor';

export interface GearPieceProps {
  possibleGearTypes: GearType[];
  selectedGear: Gear;
  showGearOCRButton?: boolean;
  onGearChange?(gear: Gear): void;
  onGearTypeChange?(value: GearType | undefined): void;
  onGearStarsChange?(value: number): void;
  onRandomStatTypeChange?(
    gearRandomStatIndex: number,
    value: RandomStatType
  ): void;
  onRandomStatValueChange?(gearStatIndex: number, value: number): void;
}

export const GearPiece = ({
  possibleGearTypes,
  selectedGear,
  showGearOCRButton,
  onGearChange,
  onGearTypeChange,
  onGearStarsChange,
  onRandomStatTypeChange,
  onRandomStatValueChange,
}: GearPieceProps) => {
  return (
    <Card>
      <CardHeader
        title={
          <GearTypeSelector
            possibleGearTypes={possibleGearTypes}
            selectedGearType={selectedGear?.type}
            selectedGearStars={selectedGear?.stars}
            onChange={(value) => {
              if (onGearTypeChange) {
                onGearTypeChange(value);
              }
            }}
            onStarsChange={onGearStarsChange}
          />
        }
        action={
          showGearOCRButton && (
            <GearOCRModal
              gearTypes={possibleGearTypes}
              onFinalizeGear={onGearChange}
            />
          )
        }
      />
      <CardContent>
        {[...Array(selectedGear?.type?.numberOfRandomStats ?? 0)].map(
          (_, i) => {
            const selectedRandomStat = selectedGear?.randomStats?.at(i);

            return (
              <RandomStatEditor
                key={i}
                selectedStat={selectedRandomStat}
                possibleStatTypes={
                  selectedGear?.type?.possibleRandomStatTypes ?? []
                }
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
