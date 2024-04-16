import type { TimePeriod } from '../time-period';
import type { Timeline } from '../timeline/timeline';
import { ResourceAction } from './resource-action';
import type { ResourceDefinition } from './resource-definition';

export class Resource {
  private readonly definition: ResourceDefinition;
  private readonly timeline: Timeline<ResourceAction>;

  public constructor(
    definition: ResourceDefinition,
    timeline: Timeline<ResourceAction>
  ) {
    this.definition = definition;
    this.timeline = timeline;
  }

  /** Cumulated amount of resource at the last event */
  public get cumulatedAmount() {
    return this.timeline.lastAction?.cumulatedAmount ?? 0;
  }

  public get maxAmount() {
    return this.definition.maxAmount;
  }

  public get actions() {
    return this.timeline.actions;
  }

  public get lastAction() {
    return this.timeline.lastAction;
  }

  /** Adds a resource action at a point of time.
   * @param amount the amount of resource to add; can be negative
   */
  public addResourceAction(timePeriod: TimePeriod, amount: number) {
    if (!amount) return;

    const cumulatedAmount = Math.max(
      Math.min(this.cumulatedAmount + amount, this.maxAmount),
      0
    );
    const resource = new ResourceAction(
      timePeriod,
      this.definition,
      cumulatedAmount
    );
    this.timeline.addAction(resource);
  }
}
