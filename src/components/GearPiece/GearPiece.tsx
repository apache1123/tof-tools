import { Card, CardContent, CardHeader } from '@mui/material';
import { Gear, Stat, StatType } from '../../types';
import { GearTypeIcon } from '../GearTypeIcon/GearTypeIcon';
import { StatEditor } from '../StatEditor/StatEditor';

export interface GearPieceProps {
  gear: Gear;
  onStatTypeChange(value: StatType);
  onStatValueChange(stat: Stat, value: number);
}

export const GearPiece = ({
  gear,
  onStatTypeChange,
  onStatValueChange,
}: GearPieceProps) => {
  if (gear) {
    return (
      <Card>
        <CardHeader
          avatar={<GearTypeIcon gearName={gear.type.name} />}
          title={gear.type.name}
        />
        <CardContent>
          {[...Array(gear.type.numberOfRandomStats)].map((_, i) => {
            const selectedRandomStat = gear.randomStats?.at(i);

            return (
              <StatEditor
                key={i}
                selectedStat={selectedRandomStat}
                possibleStatTypes={gear.type.possibleRandomStatTypes}
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
  }
};
