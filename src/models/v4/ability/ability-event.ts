import BigNumber from 'bignumber.js';

import { oneSecondDuration } from '../../../utils/time-utils';
import type { Serializable } from '../../persistable';
import type { CombatContext } from '../combat-context/combat-context';
import type { CombatState } from '../combat-context/combat-state';
import type { EventManager } from '../event/event-manager';
import type { CurrentTick } from '../tick/current-tick';
import type { TimeInterval } from '../time-interval/time-interval';
import { TimelineEvent } from '../timeline/timeline-event';
import type { AbilityId } from './ability-id';
import type { AbilityUpdatesResource } from './ability-updates-resource';
import type { AbilityEventDto } from './dtos/ability-event-dto';

/** An ability event is produced when that ability is performed, spanning over a time interval and has a cooldown etc.  */
export abstract class AbilityEvent
  extends TimelineEvent
  implements Serializable<AbilityEventDto>
{
  public constructor(
    timeInterval: TimeInterval,
    public abilityId: AbilityId,
    public cooldown: number,
    private readonly updatesResources: AbilityUpdatesResource[],
    protected readonly eventManager: EventManager,
    protected readonly context: CombatContext
  ) {
    super(timeInterval);
    this.cooldown = cooldown;
  }

  /** Cooldown ends at a point of time (exclusive) */
  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }

  public isOnCooldown(time: number) {
    return this.startTime <= time && time < this.cooldownEndsAt;
  }

  public process() {
    const { currentTick, currentState } = this.context;
    this.updateResources(currentTick);
    this.publishAbilityEnd(currentTick);
    this.additionalProcessing(currentTick, currentState);
  }

  protected abstract additionalProcessing(
    currentTick: CurrentTick,
    combatState: CombatState
  ): void;

  /** Updates resources for the duration of the current tick */
  private updateResources(currentTick: CurrentTick) {
    for (const updatesResource of this.updatesResources) {
      const {
        resourceId,
        amount,
        amountPerSecond,
        depleteResource,
        hasPriority,
      } = updatesResource;

      if (depleteResource) {
        this.eventManager.publishResourceDepleteRequest({ id: resourceId });
        continue;
      }

      if (!amount && !amountPerSecond) continue;

      const { duration } = currentTick;
      let resolvedAmount!: number;
      // Resource updates over the duration of the tick, so work out how much to add per tick.
      // Assume for a flat amount of resources to add, linearly distribute it over the duration of the event
      if (amount) {
        resolvedAmount = BigNumber(amount)
          .times(duration)
          .div(this.duration)
          .toNumber();
      }
      if (amountPerSecond) {
        resolvedAmount = BigNumber(amountPerSecond)
          .times(duration)
          .div(oneSecondDuration)
          .toNumber();
      }

      this.eventManager.publishResourceUpdateRequest({
        id: resourceId,
        amount: resolvedAmount,
        hasPriority: !!hasPriority,
      });
    }
  }

  /** Notify ability end if the end time of this event is in the current tick */
  private publishAbilityEnd(currentTick: CurrentTick) {
    if (currentTick.includes(this.endTime)) {
      this.eventManager.publishAbilityEnded({ id: this.abilityId });
    }
  }
}
