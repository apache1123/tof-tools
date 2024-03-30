import { Stack, Typography } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

import type { WeaponName } from '../../constants/weapon-definitions';
import type { DamageSummary } from '../../models/v4/damage-summary/damage-summary';

export interface DamageSummaryBreakdownSideBarProps {
  damagePercentageByWeapon: DamageSummary['damagePercentageByWeapon'];
  selectedWeaponName: WeaponName;
  onWeaponChange(selectedWeaponName: WeaponName): void;
}

const WeaponButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      borderBottom: '1px solid currentColor',
    },
  },
  backgroundColor: theme.palette.background.paper,
}));

const Weapon = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

export function DamageSummaryBreakdownSideBar({
  damagePercentageByWeapon,
  selectedWeaponName,
  onWeaponChange,
}: DamageSummaryBreakdownSideBarProps) {
  return (
    <Stack
      width={150}
      minWidth={150}
      // justifyContent="space-between"
      spacing={1}
    >
      {damagePercentageByWeapon.map(({ weaponName, percentageString }) => (
        <WeaponButton
          key={weaponName}
          onClick={() => {
            onWeaponChange(weaponName);
          }}
        >
          <Weapon>
            <Typography>
              {weaponName}: {percentageString}
            </Typography>
          </Weapon>
        </WeaponButton>
      ))}
    </Stack>
  );
}
