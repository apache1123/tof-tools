import type { CharacterData } from "../models/character/character-data";
import type { CharacterPreset } from "../models/character/character-preset";
import type { Gear } from "../models/gear/gear";
import type { GearSetPreset } from "../models/gear/gear-set-preset";
import type { Matrix } from "../models/matrix/matrix";
import type { TeamPreset } from "../models/team/team-preset";
import type { WeaponPreset } from "../models/weapon/weapon-preset";
import type { Repository } from "./repository/types/repository";

export interface RepositoryMap {
  characters: Repository<CharacterData>;
  gears: Repository<Gear>;
  gearSetPresets: Repository<GearSetPreset>;
  matrices: Repository<Matrix>;
  weaponPresets: Repository<WeaponPreset>;
  teamPresets: Repository<TeamPreset>;
  characterPresets: Repository<CharacterPreset>;
}

export type RepositoryKey = keyof RepositoryMap;

export interface Db {
  init<T extends RepositoryKey>(keys: T[]): void;
  get<T extends RepositoryKey>(key: T): RepositoryMap[T];
}
