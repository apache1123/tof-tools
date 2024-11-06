export type CoreElementalType = "Flame" | "Frost" | "Physical" | "Volt";

export type WeaponElementalType = CoreElementalType | "Altered";

// TODO: merge this with `WeaponElementalType` above in the future
export type FusionWeaponElementalType =
  | WeaponElementalType
  | "Flame-Physical"
  | "Frost-Volt"
  | "Physical-Flame"
  | "Volt-Frost";

export type StatTypeElementalType = WeaponElementalType | "None" | "All";
