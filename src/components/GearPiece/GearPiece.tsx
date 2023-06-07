import { Card, CardContent, CardHeader } from '@mui/material';

import { Gear } from '../../models/gear';
import { GearType } from '../../models/gear-type';
import { RandomStatType } from '../../models/random-stat-type';
import { GearTypeSelector } from '../GearTypeSelector/GearTypeSelector';
import { RandomStatEditor } from '../StatEditor/StatEditor';

export interface GearPieceProps {
  possibleGearTypes: GearType[];
  selectedGear: Gear;
  onGearTypeChange(value: GearType);
  onRandomStatTypeChange(gearRandomStatIndex: number, value: RandomStatType);
  onRandomStatValueChange(gearStatIndex: number, value: number);
}

export const GearPiece = ({
  possibleGearTypes,
  selectedGear,
  onGearTypeChange,
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
            onChange={onGearTypeChange}
          />
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
      </CardContent>
    </Card>
  );
};
