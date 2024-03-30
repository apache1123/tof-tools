import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';

import type { ElementalDamageSummary } from '../../models/v4/damage-summary/elemental-damage-summary';
import type { WeaponDamageSummary } from '../../models/v4/damage-summary/weapon-damage-summary';
import { toShortNumberFormat } from '../../utils/locale-utils';

export interface DamageSummaryBreakdownTableProps {
  weaponDamageSummary: WeaponDamageSummary;
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
    elementalDamageSummary: ElementalDamageSummary
  ): Row => ({
    id: attackTypeLabel,
    attackTypeLabel: attackTypeLabel,
    baseDamage: elementalDamageSummary.totalDamage.baseDamage,
    finalDamage: elementalDamageSummary.totalDamage.finalDamage,
    multiplier: elementalDamageSummary.totalDamage.damageMultiplier,
  });

  const rows: Row[] = [
    attackTypeDamageSummaryToRow(
      'Normal attack',
      weaponDamageSummary.attackTypeDamageSummaries.normal
    ),
    attackTypeDamageSummaryToRow(
      'Dodge',
      weaponDamageSummary.attackTypeDamageSummaries.dodge
    ),
    attackTypeDamageSummaryToRow(
      'Discharge',
      weaponDamageSummary.attackTypeDamageSummaries.discharge
    ),
    attackTypeDamageSummaryToRow(
      'Passive',
      weaponDamageSummary.attackTypeDamageSummaries.passive
    ),
    attackTypeDamageSummaryToRow(
      'Skill',
      weaponDamageSummary.attackTypeDamageSummaries.skill
    ),
    {
      id: 'Total',
      attackTypeLabel: 'Total',
      baseDamage: weaponDamageSummary.totalDamage.baseDamage,
      finalDamage: weaponDamageSummary.totalDamage.finalDamage,
      multiplier: weaponDamageSummary.totalDamage.damageMultiplier,
    },
  ];

  return <DataGrid rows={rows} columns={columns} hideFooter />;
}
