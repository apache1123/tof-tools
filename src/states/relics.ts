import type { RelicName } from '../constants/relics';
import { maxRelicStars, relicsLookup } from '../constants/relics';
import type { DataById } from '../models/data';
import type { Dto } from '../models/dto';
import type { Persistable } from '../models/persistable';
import { keysOf } from '../utils/object-utils';

export class RelicsState implements Persistable<RelicsStateDto> {
  private readonly _relicStars: DataById<RelicName, number>;

  public constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore all keys set below
    this._relicStars = {};
    keysOf(relicsLookup).forEach((relicName) => {
      this._relicStars[relicName] = maxRelicStars;
    });
  }

  public get relicStars(): Readonly<DataById<RelicName, number>> {
    return this._relicStars;
  }
  public setRelicStars(relicName: RelicName, stars: number) {
    this._relicStars[relicName] = Math.min(
      Math.max(Math.floor(stars), 0),
      maxRelicStars
    );
  }

  public copyFromDto(dto: RelicsStateDto): void {
    const { relicStars } = dto;
    // Need to assign each relic individually as the relics in the user's data may not match what is available, e.g. as more relics are added (or removed, unlikely)
    keysOf(relicStars).forEach((relicName) => {
      if (this._relicStars[relicName] !== undefined) {
        this._relicStars[relicName] = relicStars[relicName];
      }
    });
  }

  public toDto(): RelicsStateDto {
    const { _relicStars: _relicStars } = this;
    return {
      relicStars: _relicStars,
      version: 1,
    };
  }
}

export interface RelicsStateDto extends Dto {
  relicStars: DataById<RelicName, number>;
}
