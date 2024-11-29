import { Relics } from "../models/relics/relics";

export class RelicsState extends Relics {
  public constructor() {
    super();

    // Default to full stars for all relics
    this.setAllRelicsToMaxStars();
  }
}
