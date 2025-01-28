import type { Charge } from "../charge/charge";
import { Registry } from "../registry/registry";
import type { Resource } from "./resource";

export class Resources extends Registry<Resource> {
  public constructor(
    public readonly charge: Charge,
    public readonly dodge: Resource,
    public readonly endurance: Resource,
    ...otherResources: Resource[]
  ) {
    super();
    this.addItems([charge, dodge, endurance, ...otherResources]);
  }
}
