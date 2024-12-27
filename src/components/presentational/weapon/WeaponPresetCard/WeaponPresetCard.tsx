import SaveIcon from "@mui/icons-material/Save";
import { Card, Stack } from "@mui/material";

import type { MatrixSlot } from "../../../../models/matrix/matrix-slot";
import type { HasSxProps } from "../../../helpers/has-sx-props";
import { Button } from "../../common/Button/Button";
import { MatrixSlotIconList } from "../../matrix/MatrixSlotIconList/MatrixSlotIconList";

export interface WeaponPresetCardProps extends HasSxProps {
  matrixSlots: MatrixSlot[];
  onSave?(): void;
  onUse?(): void;
}

export function WeaponPresetCard({
  matrixSlots,
  onSave,
  onUse,
  sx,
}: WeaponPresetCardProps) {
  return (
    <Card sx={{ width: "fit-content", p: 2, ...sx }}>
      <Stack sx={{ gap: 1 }}>
        <MatrixSlotIconList matrixSlots={matrixSlots} size={70} />

        <Stack direction="row" sx={{ justifyContent: "end", gap: 0.5 }}>
          {onSave && (
            <Button icon={<SaveIcon />} onClick={onSave}>
              Save
            </Button>
          )}
          {onUse && (
            <Button onClick={onUse} buttonProps={{ variant: "contained" }}>
              Use
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
