import { nanoid } from "nanoid";

import type { BuffAbilityDefinition } from "../../definitions/types/buff/buff-ability-definition";
import { BaseAttacks } from "../base-attacks";
import type { CharacterId } from "../character/character-data";
import type { GearSetPreset } from "../gear/gear-set-preset";
import type { Id } from "../identifiable";
import type { SimulacrumTrait } from "../simulacrum-trait";
import type { TeamPreset } from "../team/team-preset";

export type CharacterPresetId = Id;

/** A character preset is a user-created template of how a character is to be equipped - weapons, matrices, gear, trait etc. */
export class CharacterPreset {
  public constructor(characterId: CharacterId, id?: CharacterPresetId) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.name = "Preset name";
    this.baseAttacks = BaseAttacks.create();
    this._critRateFlat = 0;
    this.customBuffAbilities = [];
  }

  public readonly id: CharacterPresetId;
  public readonly characterId: CharacterId;
  public teamPreset: TeamPreset | undefined;
  public gearSetPreset: GearSetPreset | undefined;
  public name: string;
  public simulacrumTrait: SimulacrumTrait | undefined;
  public baseAttacks: BaseAttacks;
  public customBuffAbilities: BuffAbilityDefinition[];

  private _critRateFlat: number;

  public get critRateFlat(): number {
    return this._critRateFlat;
  }
  public set critRateFlat(value: number) {
    this._critRateFlat = Math.max(value, 0);
  }
}
