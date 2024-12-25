import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Card, CardContent, CardHeader } from "@mui/material";

import type { Matrix } from "../../../../models/matrix/matrix";
import type { MatrixType } from "../../../../models/matrix/matrix-type";
import type { HasSxProps } from "../../../helpers/has-sx-props";
import { AddToSlotButton } from "../../common/AddToSlotButton/AddToSlotButton";
import { Button } from "../../common/Button/Button";
import { MatrixCard } from "../MatrixCard/MatrixCard";
import { MatrixTypeIcon } from "../MatrixTypeIcon/MatrixTypeIcon";

export interface MatrixSlotCardProps extends HasSxProps {
  type: MatrixType;
  matrix: Matrix | undefined;
  onClick(): void;
  onRemove(): void;
}

export function MatrixSlotCard({
  type,
  matrix,
  onClick,
  onRemove,
  sx,
}: MatrixSlotCardProps) {
  return (
    <Card
      sx={{
        width: 130,
        height: 230,
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <CardHeader
        avatar={
          <MatrixTypeIcon
            id={type.id}
            displayName={type.displayName}
            size={30}
          />
        }
        sx={{ p: 0, pt: 0.5, pl: 0.5 }}
      />
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          pt: 0,
          px: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          {matrix ? (
            <>
              <MatrixCard
                matrix={matrix}
                showName={false}
                showTypeIcon={false}
                matrixIconSize={100}
                elevation={1}
                onClick={onClick}
              />
              <Button
                icon={<RemoveCircleIcon />}
                buttonProps={{ variant: "text" }}
                onClick={onRemove}
                sx={{ mt: 0.5 }}
              >
                Remove
              </Button>
            </>
          ) : (
            <AddToSlotButton onClick={onClick} />
          )}
        </>
      </CardContent>
    </Card>
  );
}
