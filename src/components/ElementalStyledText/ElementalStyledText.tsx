import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';

import type { ElementalType } from '../../models/stat-type';
import { pascalCaseToCamelCase } from '../../utils/string-utils';

export interface ElementalStyledTextProps
  extends TypographyProps<'span', { component?: 'span' }> {
  elementalType: ElementalType;
}

export function ElementalStyledText({
  elementalType,
  component = 'span',
  variant = 'inherit',
  children,
  ...rest
}: ElementalStyledTextProps) {
  return (
    <Typography
      color={`${pascalCaseToCamelCase(elementalType)}.main`}
      component={component}
      variant={variant}
      {...rest}
    >
      {children}
    </Typography>
  );
}
