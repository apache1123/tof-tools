import { Alert, Box, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import type { WeaponElementalType } from "../../../definitions/elemental-type";
import type { BuffSummary as BuffSummaryModel } from "../../../models/buff-summary/buff-summary";
import type { BuffSummaryItemGroup } from "../../../models/buff-summary/buff-summary-item-group";
import type { ElementalAttack } from "../../../models/elemental-attack/elemental-attack";
import type { DamageBreakdownGroupProps } from "./DamageBreakdownGroup";
import { DamageBreakdownGroup } from "./DamageBreakdownGroup";
import type { DamageBreakdownLineProps } from "./DamageBreakdownLine";
import { DamageBreakdownLine } from "./DamageBreakdownLine";

export interface DamageBreakdownProps {
  element: WeaponElementalType;
  attack: ElementalAttack;
  buffSummary: BuffSummaryModel;
  finalDamage: number;
}

export function DamageBreakdown({
  element,
  attack,
  buffSummary,
  finalDamage,
}: DamageBreakdownProps) {
  const mapGroup = (
    buffSummaryGroup: BuffSummaryItemGroup,
    title: string,
    isPercentageValue: boolean,
  ): {
    lines: DamageBreakdownLineProps[];
  } & DamageBreakdownGroupProps => ({
    title,
    element: buffSummary.element,
    totalValue: buffSummaryGroup.totalValue,
    isPercentageValue,
    lines: buffSummaryGroup.items.map(({ displayName, totalValue }) => ({
      displayName,
      element: buffSummary.element,
      totalValue,
      isPercentageValue,
    })),
  });

  const groups: ({
    lines: DamageBreakdownLineProps[];
  } & DamageBreakdownGroupProps)[] = [
    {
      ...mapGroup(buffSummary.baseAttackBuffs, "Base Attack", false),
      element,
      totalValue: attack.baseAttack,
    },
    mapGroup(buffSummary.attackPercentBuffs, "Attack %", true),
    mapGroup(buffSummary.elementalDamageBuffs, "Elemental Damage %", true),
    mapGroup(buffSummary.finalDamageBuffs, "Final Damage %", true),
    mapGroup(buffSummary.critRateBuffs, "Crits Rate %", true),
    mapGroup(buffSummary.critDamageBuffs, "Crits Damage %", true),
  ];

  return (
    <Stack sx={{ gap: 2 }}>
      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid key={group.title} xs={12} sm={6} lg={4}>
            <Card elevation={1} sx={{ px: 2, py: 2 }}>
              <DamageBreakdownGroup
                title={group.title}
                element={group.element}
                totalValue={group.totalValue}
                isPercentageValue={group.isPercentageValue}
              >
                {group.lines.map((line, i) => (
                  <DamageBreakdownLine
                    key={i}
                    displayName={line.displayName}
                    element={line.element}
                    totalValue={line.totalValue}
                    isPercentageValue={line.isPercentageValue}
                  />
                ))}
              </DamageBreakdownGroup>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Alert severity="info">
        You may find that there are elemental damage buffs or final damage buffs
        missing for some older weapons and matrices. This is because I
        haven&apos;t gone back to add them yet. However, this will not affect
        the result of your gear comparison since these buffs remain constant
        between the two gears.
      </Alert>

      <Box>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          Final Damage
          <br />= Base Attack &times; (1 + Attack %) &times; (1 + Elemental
          Damage %) &times; (1 + Final Damage %) &times; (1 + Crit Rate %
          &times; Crit Damage %)
        </Typography>
        <Typography variant="body2">
          = {attack.baseAttack} &times; (1 +{" "}
          {buffSummary.attackPercentBuffs.totalValue}) &times; (1 +{" "}
          {buffSummary.elementalDamageBuffs.totalValue}) &times; (1 +{" "}
          {buffSummary.finalDamageBuffs.totalValue}) &times; (1 +{" "}
          {buffSummary.critRateBuffs.totalValue} &times;{" "}
          {buffSummary.critDamageBuffs.totalValue})<br />= {finalDamage}
        </Typography>
      </Box>
    </Stack>
  );
}
