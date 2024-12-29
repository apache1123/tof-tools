import type { Character } from "../models/character/character";
import type { Gear } from "../models/gear/gear";
import type { GearSetPreset } from "../models/gear/gear-set-preset";
import type { Matrix } from "../models/matrix/matrix";
import type { TeamPreset } from "../models/team/team-preset";
import type { Weapon } from "../models/weapon/weapon";
import type { WeaponPreset } from "../models/weapon/weapon-preset";
import type { Repository } from "./repository/types/repository";

export interface RepositoryMap {
  characters: Repository<Character>;
  gears: Repository<Gear>;
  gearSetPresets: Repository<GearSetPreset>;
  matrices: Repository<Matrix>;
  weapons: Repository<Weapon>;
  weaponPresets: Repository<WeaponPreset>;
  teamPresets: Repository<TeamPreset>;
}

export type RepositoryKey = keyof RepositoryMap;

export interface Db {
  init<T extends RepositoryKey>(keys: T[]): void;
  get<T extends RepositoryKey>(key: T): RepositoryMap[T];
}
