import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';

import type {
  DamageSnapshot,
  DamageSummarySnapshot,
} from '../../models/v4/combat-simulator-snapshot/damage-summary-snapshot';
import { toShortNumberFormat } from '../../utils/locale-utils';

export interface DamageSummaryBreakdownTableProps {
  weaponDamageSummary: DamageSummarySnapshot['damageByWeapon'][number];
}

interface Row {
  id: string;
  attackTypeLabel: string;
  baseDamage: number;
  finalDamage: number;
  multiplier: number;
}

export function DamageSummaryBreakdownTable({
  weaponDamageSummary,
}: DamageSummaryBreakdownTableProps) {
  const columns: GridColDef<Row>[] = [
    { field: 'attackTypeLabel', headerName: 'Type', flex: 1 },
    {
      field: 'baseDamage',
      headerName: 'Base DMG',
      valueFormatter: (value: number) => toShortNumberFormat(value),
      flex: 1,
    },
    {
      field: 'finalDamage',
      headerName: 'Final DMG',
      valueFormatter: (value: number) => toShortNumberFormat(value),
      flex: 1,
    },
    {
      field: 'multiplier',
      headerName: 'Multiplier',
      valueFormatter: (value: number) => toShortNumberFormat(value),
      flex: 1,
    },
  ];

  const attackTypeDamageSummaryToRow = (
    attackTypeLabel: string,
    damage: DamageSnapshot
  ): Row => ({
    id: attackTypeLabel,
    attackTypeLabel: attackTypeLabel,
    baseDamage: damage.baseDamage,
    finalDamage: damage.finalDamage,
    multiplier: damage.damageMultiplier,
  });

  const rows: Row[] = [
    attackTypeDamageSummaryToRow(
      'Normal attack',
      weaponDamageSummary.normalAttackDamage
    ),
    attackTypeDamageSummaryToRow(
      'Dodge',
      weaponDamageSummary.dodgeAttackDamage
    ),
    attackTypeDamageSummaryToRow(
      'Discharge',
      weaponDamageSummary.dischargeAttackDamage
    ),
    attackTypeDamageSummaryToRow(
      'Passive',
      weaponDamageSummary.passiveAttackDamage
    ),
    attackTypeDamageSummaryToRow(
      'Skill',
      weaponDamageSummary.skillAttackDamage
    ),
    {
      id: 'Total',
      attackTypeLabel: 'Total',
      baseDamage: weaponDamageSummary.totalDamage.baseDamage,
      finalDamage: weaponDamageSummary.totalDamage.finalDamage,
      multiplier: weaponDamageSummary.totalDamage.damageMultiplier,
    },
  ];

  return (
    <DataGrid rows={rows} columns={columns} disableColumnSorting hideFooter />
  );
}
