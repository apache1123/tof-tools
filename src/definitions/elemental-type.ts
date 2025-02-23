export const coreElementalTypes = [
  "Flame",
  "Frost",
  "Physical",
  "Volt",
] as const;
export type CoreElementalType = (typeof coreElementalTypes)[number];

export const weaponElementalTypes = [...coreElementalTypes, "Altered"] as const;
export type WeaponElementalType = (typeof weaponElementalTypes)[number];

// TODO: merge this with `WeaponElementalType` above in the future
export type FusionWeaponElementalType =
  | WeaponElementalType
  | "Flame-Physical"
  | "Frost-Volt"
  | "Physical-Flame"
  | "Volt-Frost";

export type StatTypeElementalType = WeaponElementalType | "None" | "All";

export function mapFusionElementToElementArray(
  fusionElement: FusionWeaponElementalType,
): WeaponElementalType[] {
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
