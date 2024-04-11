import { maxRelicStars } from '../constants/relics';
import { Relics } from '../models/v4/relics/relics';
import { keysOf } from '../utils/object-utils';

export class RelicsState extends Relics {
  public constructor() {
    super();

    // Default to full stars for all relics
    keysOf(this.relicStars).forEach((relicName) => {
      this.setRelicStars(relicName, maxRelicStars);
    });
  }
}
