import type { RelicName } from "../../../definitions/relics";
import { maxRelicStars, relicsLookup } from "../../../definitions/relics";
import { keysOf } from "../../../utils/object-utils";
import type { DataById } from "../../data";
import type { Dto } from "../../dto";
import type { Persistable } from "../../persistable";
import type { RelicBuffDefinition } from "./relic-buff-definition";

export class Relics implements Persistable<RelicsDto> {
  private readonly _relicStars: DataById<RelicName, number>;

  public constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore all keys set below
    this._relicStars = {};
    keysOf(relicsLookup).forEach((relicName) => {
      this._relicStars[relicName] = 0;
    });
  }

  public get relicStars(): Readonly<DataById<RelicName, number>> {
    return this._relicStars;
  }
  public setRelicStars(relicName: RelicName, stars: number) {
    this._relicStars[relicName] = Math.min(
      Math.max(Math.floor(stars), 0),
      maxRelicStars,
    );
  }

  /** Activated "passive relic dmg buffs" from all relics  */
  public get passiveRelicBuffs(): RelicBuffDefinition[] {
    return keysOf(this._relicStars).flatMap((relicName) => {
      const stars = this._relicStars[relicName];
      const relicDefinition = relicsLookup[relicName];
      if (relicDefinition) {
        // Find any relic passive buffs that have passed the star requirements to be activated
        const buffs = relicDefinition.buffs.filter(
          ({
            triggeredBy: { combatStart },
            minStarRequirement,
            maxStarRequirement,
          }) =>
            combatStart &&
            stars >= minStarRequirement &&
            stars <= maxStarRequirement,
        );
        return buffs || [];
      }
      return [];
    });
  }

  public setAllRelicsToMaxStars() {
    keysOf(this.relicStars).forEach((relicName) => {
      this.setRelicStars(relicName, maxRelicStars);
    });
  }

  public copyFromDto(dto: RelicsDto): void {
    const { relicStars } = dto;
    // Need to assign each relic individually as the relics in the user's data may not match what is available, e.g. as more relics are added (or removed, unlikely)
    keysOf(relicStars).forEach((relicName) => {
      if (this._relicStars[relicName] !== undefined) {
        this._relicStars[relicName] = relicStars[relicName];
      }
    });
  }

  public toDto(): RelicsDto {
    const { _relicStars: _relicStars } = this;
    return {
      relicStars: _relicStars,
      version: 1,
    };
  }
}

export interface RelicsDto extends Dto {
  relicStars: DataById<RelicName, number>;
}
