import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';

import {
  matrixSet2pcIdSuffix,
  matrixSet4pcIdSuffix,
  type MatrixSetName,
} from '../../models/matrix-set-definition';

export interface MatrixIconProps {
  matrixNames: MatrixSetName[];
  size?: number;
}

export const MatrixIcon = ({ matrixNames, size = 100 }: MatrixIconProps) => {
  if (!matrixNames.length)
    return (
      <Box minHeight={size} display="flex" alignItems="center">
        <QuestionMarkIcon width={size} height={size} />
      </Box>
    );

  const suffixRegex = new RegExp(
    `(${matrixSet2pcIdSuffix}|${matrixSet4pcIdSuffix})`,
    'g'
  );
  const matrixNameAndPaths = matrixNames.map((matrixName) => {
    const imageName = matrixName
      .toLowerCase()
      .replaceAll(suffixRegex, '')
      .trimEnd()
      .replaceAll(' ', '-');
    return { matrixName, path: `/icons/matrices/${imageName}.webp` };
  });

  return (
    <Stack direction="row" spacing={-5}>
      {matrixNameAndPaths.map(({ matrixName, path }, index) => (
        <Image
          src={path}
          alt={matrixName}
          width={size}
          height={size}
          key={index}
        />
      ))}
    </Stack>
  );
};
