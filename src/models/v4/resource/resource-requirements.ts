import type { Requirements } from "../requirements/requirements";
import type { CurrentResource } from "./current-resource/current-resource";
import type { ResourceId } from "./resource-definition";

export class ResourceRequirements implements Requirements {
  public constructor(
    private readonly hasResource?: {
      id: ResourceId;
      minAmount: number;
    },
  ) {}

  public haveBeenMet(currentResources: CurrentResource[]): boolean {
    const { hasResource } = this;
    if (
      hasResource &&
      !currentResources.some(
        ({ id, amount }) =>
          id === hasResource.id && amount >= hasResource.minAmount,
      )
    )
      return false;

    return true;
  }
}
