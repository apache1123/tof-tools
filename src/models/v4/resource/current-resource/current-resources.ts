import type { CurrentCharge } from "../../charge/current-charge";
import type { ResourceId } from "../resource-definition";
import type { ResourceRegistry } from "../resource-registry";
import type { CurrentResource } from "./current-resource";

export class CurrentResources {
  public constructor(private readonly resources: ResourceRegistry) {}

  public get all(): CurrentResource[] {
    return this.resources.items.map((resource) => ({
      id: resource.id,
      amount: resource.getCumulatedAmount(),
    }));
  }

  public find(id: ResourceId): CurrentResource | undefined {
    const resource = this.resources.find(id);
    return resource
      ? { id: resource.id, amount: resource.getCumulatedAmount() }
      : undefined;
  }

  public get currentCharge(): CurrentCharge {
    const charge = this.resources.charge;
    return {
      id: charge.id,
      amount: charge.getCumulatedAmount(),
      hasFullCharge: charge.hasFullCharge(),
    };
  }
}
