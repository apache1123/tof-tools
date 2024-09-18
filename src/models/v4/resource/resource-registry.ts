import type { Charge } from '../charge/charge';
import { Registry } from '../registry/registry';
import type { Resource } from './resource';

export class ResourceRegistry extends Registry<Resource> {
  public constructor(
    public readonly charge: Charge,
    otherResources: Resource[]
  ) {
    super([charge, ...otherResources]);
  }
}
