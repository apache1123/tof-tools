import type { Charge } from "../charge/charge";
import { Repository } from "../repository/repository";
import type { Resource } from "./resource";

export class Resources extends Repository<Resource> {
  public constructor(
    public readonly charge: Charge,
    otherResources: Resource[],
  ) {
    super();
    this.addItems([charge, ...otherResources]);
  }
}
