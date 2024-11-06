import { Relics } from "../models/v4/relics/relics";

export class RelicsState extends Relics {
  public constructor() {
    super();

    // Default to full stars for all relics
    this.setAllRelicsToMaxStars();
  }
}
