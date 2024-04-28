import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { Resource } from '../resource/resource';
import type { ResourceRegenerator } from '../resource/resource-regenerator';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { ResourceAction } from '../resource-timeline/resource-action';
import type { TickTracker } from '../tick-tracker';

export class ResourceSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly resourceRegistry: ResourceRegistry,
    private readonly resourceRegenerator: ResourceRegenerator,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const resourceAction of this.resourceRegistry.getResourceActions(
      this.tickTracker.currentTickInterval
    )) {
      const resource = this.resourceRegistry.getResource(
        resourceAction.resourceId
      );
      if (!resource) {
        throw new Error(`Cannot find resource: ${resourceAction.resourceId}`);
      }

      this.simulateAction(resourceAction, resource);
    }

    this.regenerateResources();
  }

  private simulateAction(resourceAction: ResourceAction, resource: Resource) {
    const tickInterval = this.tickTracker.currentTickInterval;

    this.combatEventNotifier.notifyResourceUpdate(resourceAction);

    const isDepleted = resource.isDepleted(tickInterval.endTime);
    if (isDepleted)
      this.combatEventNotifier.notifyResourceDepleted(resourceAction);
  }

  /** For resources, regenerate the resource amount for a tick interval, if there are no other actions in that tick interval */
  private regenerateResources() {
    const tickInterval = this.tickTracker.currentTickInterval;

    for (const resource of this.resourceRegistry.resources) {
      this.resourceRegenerator.regenerateResource(resource, tickInterval);
    }
  }
}
