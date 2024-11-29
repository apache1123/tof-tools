import type { RelicName } from "../../definitions/relics";
import type { RelicBuffDefinition } from "./relic-buff-definition";

export interface Relic {
  id: RelicName;
  displayName: string;
  rarity: "SR" | "SSR";
  buffs: RelicBuffDefinition[];
  // TODO:
  attacks: unknown[];
  remarks?: string;
}
