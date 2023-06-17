import { Card, CardContent, CardHeader } from '@mui/material';

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
  onGearChange?(gear: Gear);
  onGearTypeChange?(value: GearType);
  onGearStarsChange?(value: number);
  onRandomStatTypeChange?(gearRandomStatIndex: number, value: RandomStatType);
  onRandomStatValueChange?(gearStatIndex: number, value: number);
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
            gear={selectedGear}
            onChange={onGearTypeChange}
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
                possibleStatTypes={selectedGear?.type?.possibleRandomStatTypes}
                onStatTypeChange={(value) => onRandomStatTypeChange(i, value)}
                onStatValueChange={(value) => onRandomStatValueChange(i, value)}
              />
            );
          }
        )}
        {!!selectedGear?.randomStats?.length && (
          <GearRandomStatsRollsDetails gear={selectedGear} />
        )}
      </CardContent>
    </Card>
  );
};
