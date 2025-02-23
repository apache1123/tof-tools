import type { Target } from "../target/target";

export interface CombatSimulatorOptions {
  combatDuration: number;
  targetResistance: Target["resistance"];
}
