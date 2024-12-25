import { Card, CardContent, CardHeader } from "@mui/material";

import type { Matrix } from "../../../../models/matrix/matrix";
import type { MatrixType } from "../../../../models/matrix/matrix-type";
import type { HasSxProps } from "../../../helpers/has-sx-props";
import { AddToSlotButton } from "../../common/AddToSlotButton/AddToSlotButton";
import { MatrixCard } from "../MatrixCard/MatrixCard";
import { MatrixTypeIcon } from "../MatrixTypeIcon/MatrixTypeIcon";

export interface MatrixSlotCardProps extends HasSxProps {
  type: MatrixType;
  matrix: Matrix | undefined;
  onClick?(): void;
}

export function MatrixSlotCard({
  type,
  matrix,
  onClick,
  sx,
}: MatrixSlotCardProps) {
  return (
    <Card
      sx={{
        width: 130,
        height: 190,
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {matrix ? (
          <MatrixCard
            matrix={matrix}
            showName={false}
            showTypeIcon={false}
            matrixIconSize={100}
            elevation={1}
            onClick={onClick}
          />
        ) : (
          <AddToSlotButton
            onClick={() => {
              if (onClick) {
                onClick();
              }
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
