import { damageCalculatorDefaults } from '../../../constants/damage-calculator-defaults';
import type { CombatSimulatorOptions } from '../combat-simulator/combat-simulator-options';

export function getDefaultCombatSimulatorOptions(): CombatSimulatorOptions {
  const { combatDuration, targetResistance } = damageCalculatorDefaults;
  return { combatDuration, targetResistance };
}
