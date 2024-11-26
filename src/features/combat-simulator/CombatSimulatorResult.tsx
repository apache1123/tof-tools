import { Stack } from "@mui/material";

import { DamageSummaryBreakdown } from "../../components/presentational/DamageSummaryBreakdown/DamageSummaryBreakdown";
import { MatrixDisplay } from "../../components/presentational/MatrixDisplay/MatrixDisplay";
import { WeaponDisplay } from "../../components/presentational/WeaponDisplay/WeaponDisplay";
import type { CombatSimulatorSnapshot } from "../../models/v4/combat-simulator/combat-simulator-snapshot";
import { CombatSimulatorTimeline } from "./CombatSimulatorTimeline";

export interface CombatSimulatorResultProps {
  snapshot: CombatSimulatorSnapshot;
}

export function CombatSimulatorResult({
  snapshot,
}: CombatSimulatorResultProps) {
  return (
    <Stack spacing={5}>
      <Stack direction="row" spacing={5} useFlexGap flexWrap="wrap">
        <Stack spacing={3} justifyContent="center">
          {snapshot.loadout.team.weapons.map((weapon, index) => {
            // TODO: fix replace matrix set dto with a proper "view model"
            const { matrixSet4pc, matrixSet2pc1, matrixSet2pc2 } =
              weapon.matrixSets;
            return (
              <Stack direction="row" alignItems="baseline" key={index}>
                <WeaponDisplay
                  weaponName={weapon.definitionId}
                  stars={weapon.stars}
                />
                {matrixSet4pc && (
                  <MatrixDisplay
                    matrixName={matrixSet4pc.definitionId}
                    displayName={matrixSet4pc.definitionId}
                    pieces={4}
                    stars={matrixSet4pc.stars}
                  />
                )}
                {matrixSet2pc1 && (
                  <MatrixDisplay
                    matrixName={matrixSet2pc1.definitionId}
                    displayName={matrixSet2pc1.definitionId}
                    pieces={2}
                    stars={matrixSet2pc1.stars}
                  />
                )}
                {matrixSet2pc2 && (
                  <MatrixDisplay
                    matrixName={matrixSet2pc2.definitionId}
                    displayName={matrixSet2pc2.definitionId}
                    pieces={2}
                    stars={matrixSet2pc2.stars}
                  />
                )}
              </Stack>
            );
          })}
        </Stack>
        {snapshot.damageSummary && (
          <DamageSummaryBreakdown damageSummary={snapshot.damageSummary} />
        )}
      </Stack>
      <CombatSimulatorTimeline combatSimulatorSnapshot={snapshot} />
    </Stack>
  );
}
