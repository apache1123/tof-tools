import Image from "next/image";

import {
  matrixSet2pcIdSuffix,
  matrixSet4pcIdSuffix,
  type MatrixSetName,
} from "../../../models/matrix-set-definition";

export interface MatrixIconProps {
  matrixName: MatrixSetName;
  displayName: string;
  size?: number;
}

export const MatrixIcon = ({
  matrixName,
  displayName,
  size = 100,
}: MatrixIconProps) => {
  const suffixRegex = new RegExp(
    `(${matrixSet2pcIdSuffix}|${matrixSet4pcIdSuffix})`,
    "g",
  );
  const imageName = matrixName
    .toLowerCase()
    .replaceAll(suffixRegex, "")
    .trimEnd()
    .replaceAll(" ", "-");
  const imagePath = `/icons/matrices/${imageName}.webp`;

  return (
    <Image
      src={imagePath}
      alt={matrixName}
      title={displayName}
      width={size}
      height={size}
    />
  );
};
