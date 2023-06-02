import { Card, CardContent, CardHeader } from '@mui/material';
import { Gear } from '../../types';
import { GearTypeIcon } from '../GearTypeIcon/GearTypeIcon';
import { StatEditor } from '../StatEditor/StatEditor';

export interface GearPieceProps {
  gear: Gear;
}

const maxStatEditors = 4;

export const GearPiece = ({ gear }: GearPieceProps) => {
  if (gear) {
    return (
      <Card>
        <CardHeader
          avatar={<GearTypeIcon gearName={gear.type.name} />}
          title={gear.type.name}
        />
        <CardContent>
          {/* {[...Array(maxStatEditors)].map((_, i) => {
            return <StatEditor key={i} selectedStat={null} availableStatDefinitions={gear?.type.} />;
          })} */}
        </CardContent>
      </Card>
    );
  }
};
