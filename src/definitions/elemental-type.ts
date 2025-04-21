export const allCoreElementalTypes = [
  "Flame",
  "Frost",
  "Physical",
  "Volt",
] as const;
export type CoreElementalType = (typeof allCoreElementalTypes)[number];

export const allElementalTypes = [...allCoreElementalTypes, "Altered"] as const;
export type ElementalType = (typeof allElementalTypes)[number];

// TODO: merge this with `ElementalType` above in the future
export type FusionElementalType =
  | ElementalType
  | "Flame-Physical"
  | "Frost-Volt"
  | "Physical-Flame"
  | "Volt-Frost";

export type StatTypeElementalType = ElementalType | "None" | "All";

export function mapFusionElementToElementArray(
  fusionElement: FusionElementalType,
): ElementalType[] {
  switch (fusionElement) {
    case "Flame-Physical":
      return ["Flame", "Physical"];
    case "Frost-Volt":
      return ["Frost", "Volt"];
    case "Physical-Flame":
      return ["Physical", "Flame"];
    case "Volt-Frost":
      return ["Volt", "Frost"];
    case "Altered":
      return ["Altered"];
    case "Flame":
      return ["Flame"];
    case "Frost":
      return ["Frost"];
    case "Physical":
      return ["Physical"];
    case "Volt":
      return ["Volt"];
    default:
      throw new Error(`Invalid fusion element: ${fusionElement}`);
  }
}

export type GearResonanceElement = CoreElementalType;
export type GearResonanceElements = GearResonanceElement[];
