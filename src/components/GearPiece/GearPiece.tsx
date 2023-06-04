import { Card, CardContent, CardHeader } from '@mui/material';
import { Gear, GearType, Stat, StatType } from '../../types';
import { StatEditor } from '../StatEditor/StatEditor';
import { GearTypeSelector } from '../GearTypeSelector/GearTypeSelector';

export interface GearPieceProps {
  possibleGearTypes: GearType[];
  gear: Gear;
  onGearTypeChange(value: GearType);
  onStatTypeChange(value: StatType);
  onStatValueChange(stat: Stat, value: number);
}

export const GearPiece = ({
  possibleGearTypes,
  gear,
  onGearTypeChange,
  onStatTypeChange,
  onStatValueChange,
}: GearPieceProps) => {
  return (
    <Card>
      <CardHeader
        title={
          <GearTypeSelector
            possibleGearTypes={possibleGearTypes}
            selectedGearType={gear?.type}
            onChange={onGearTypeChange}
          />
        }
      />
      <CardContent>
        {[...Array(gear?.type?.numberOfRandomStats ?? 0)].map((_, i) => {
          const selectedRandomStat = gear?.randomStats?.at(i);

          return (
            <StatEditor
              key={i}
              selectedStat={selectedRandomStat}
              possibleStatTypes={gear?.type?.possibleRandomStatTypes}
              onStatTypeChange={onStatTypeChange}
              onStatValueChange={(value) =>
                onStatValueChange(selectedRandomStat, value)
              }
            />
          );
        })}
      </CardContent>
    </Card>
  );
};
