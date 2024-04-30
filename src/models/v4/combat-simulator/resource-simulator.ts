import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { Resource } from '../resource/resource';
import type { ResourceRegenerator } from '../resource/resource-regenerator';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { ResourceEvent } from '../resource-timeline/resource-event';
import type { TickTracker } from '../tick-tracker';

export class ResourceSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly resourceRegistry: ResourceRegistry,
    private readonly resourceRegenerator: ResourceRegenerator,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const resourceEvent of this.resourceRegistry.getResourceEvents(
      this.tickTracker.currentTickInterval
    )) {
      const resource = this.resourceRegistry.getResource(
        resourceEvent.resourceId
      );
      if (!resource) {
        throw new Error(`Cannot find resource: ${resourceEvent.resourceId}`);
      }

      this.simulateEvent(resourceEvent, resource);
    }

    this.regenerateResources();
  }

  private simulateEvent(resourceEvent: ResourceEvent, resource: Resource) {
    const tickInterval = this.tickTracker.currentTickInterval;

    this.combatEventNotifier.notifyResourceUpdate(resourceEvent);

    const isDepleted = resource.isDepleted(tickInterval.endTime);
    if (isDepleted)
      this.combatEventNotifier.notifyResourceDepleted(resourceEvent);
  }

  /** For resources, regenerate the resource amount for a tick interval, if there are no other events in that tick interval */
  private regenerateResources() {
    const tickInterval = this.tickTracker.currentTickInterval;

    for (const resource of this.resourceRegistry.resources) {
      this.resourceRegenerator.regenerateResource(resource, tickInterval);
    }
  }
}
