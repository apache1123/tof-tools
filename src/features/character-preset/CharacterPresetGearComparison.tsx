import { Stack } from "@mui/material";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

import { NumericString } from "../../components/common/NumericString/NumericString";
import { ErrorText } from "../../components/common/Text/ErrorText";
import { GearTypeIcon } from "../../components/gear/GearTypeIcon/GearTypeIcon";
import type { GearTypeId } from "../../definitions/gear-types";
import { getGearType, getGearTypeOrder } from "../../definitions/gear-types";
import type { CharacterData } from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character-preset/character-preset";
import type { Gear } from "../../models/gear/gear";
import { GearDamageSimulator } from "../../models/gear-compare/gear-damage-simulator";
import { createTeamFromPreset } from "../../models/team/create-team-from-preset";

export interface CharacterPresetGearComparisonProps {
  characterData: CharacterData;
  characterPreset: CharacterPreset;
}

interface Row {
  id: GearTypeId;
  gearName: string;
  gear: Gear | undefined;
  damageIncrease: number;
  titanDamageIncrease: number | undefined;
}

export function CharacterPresetGearComparison({
  characterData,
  characterPreset,
}: CharacterPresetGearComparisonProps) {
  // TODO: below is repeated in GearCompareResults
  const {
    teamPreset,
    gearSetPreset,
    baseAttacks,
    critRateFlat,
    simulacrumTrait,
    customBuffAbilities,
  } = characterPreset;

  if (!teamPreset) return <ErrorText>No team</ErrorText>;
  if (!gearSetPreset) return <ErrorText>No gear preset</ErrorText>;

  const { team, mainWeapon } = createTeamFromPreset(teamPreset);

  if (!mainWeapon) return <ErrorText>No main weapon</ErrorText>;

  const gearDamageSimulator = new GearDamageSimulator(
    characterData,
    baseAttacks,
    critRateFlat,
    team,
    mainWeapon,
    simulacrumTrait,
    gearSetPreset.gearSet,
    customBuffAbilities,
  );

  const columns: GridColDef<Row>[] = [
    {
      field: "gearName",
      headerName: "Gear",
      renderCell: (params: GridRenderCellParams<Row, string>) => (
        <Stack direction="row" sx={{ gap: 0.5, alignItems: "center" }}>
          <GearTypeIcon
            id={params.row.id}
            rarity={params.row.gear?.rarity}
            size={30}
            sx={{ mr: 0.5 }}
          />
          {params.value}
        </Stack>
      ),
      width: 160,
    },
    {
      field: "damageIncrease",
      headerName: "Damage increase",
      renderCell: (params: GridRenderCellParams<Row, number>) => {
        return (
          <NumericString value={params.value ?? 0} variant="percentage2dp" />
        );
      },
      description:
        "Damage increase: is the increase in damage you get with the piece of gear, compared to without that piece of gear. (This only accounts for the gear's random stats and augmentation stats, not the gear's base stats)",
      width: 160,
    },
    {
      field: "titanDamageIncrease",
      headerName: "Damage increase (max titan)",
      renderCell: (params: GridRenderCellParams<Row, number | undefined>) => {
        return params.value !== undefined ? (
          <NumericString value={params.value} variant="percentage2dp" />
        ) : (
          "-"
        );
      },
      description:
        "Damage increase (max titan): is the theoretical increase in damage you get from the piece of gear if that piece of gear is augmented to max titan stat values, compared to without that piece of gear. (This only accounts for the gear's random stats and augmentation stats, not the gear's base stats)",
      width: 200,
    },
  ];

  const rows: Row[] = getGearTypeOrder().map((gearTypeId) => ({
    id: gearTypeId,
    gearName: getGearType(gearTypeId).displayName,
    gear: gearSetPreset.gearSet.getSlot(gearTypeId).gear,
    damageIncrease:
      gearDamageSimulator.getCurrentGearResult(gearTypeId).damageIncrease,
    titanDamageIncrease:
      gearDamageSimulator.getCurrentGearResult(gearTypeId).maxTitan
        ?.damageIncrease,
  }));

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      initialState={{
        sorting: { sortModel: [{ field: "damageIncrease", sort: "desc" }] },
      }}
      hideFooter
      sx={{ width: "fit-content" }}
    />
  );
}
