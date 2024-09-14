import type { Requirements } from '../requirements/requirements';
import type { ActiveResource } from './active-resource';
import type { ResourceId } from './resource-definition';

export class ResourceRequirements implements Requirements {
  public constructor(
    private readonly hasResource?: {
      id: ResourceId;
      minAmount: number;
    }
  ) {}

  public haveBeenMet(activeResources: ActiveResource[]): boolean {
    const { hasResource } = this;
    if (
      hasResource &&
      !activeResources.some(
        ({ id, amount }) =>
          id === hasResource.id && amount >= hasResource.minAmount
      )
    )
      return false;

    return true;
  }
}
