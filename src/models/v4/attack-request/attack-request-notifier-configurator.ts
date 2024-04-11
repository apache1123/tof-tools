import type { Team } from '../../team';
import type { AttackRegistry } from '../attack/attack-registry';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { AttackNotifier } from '../attack-event/attack-notifier';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ChargeTimeline } from '../charge/charge-timeline';
import { eventIdProvider } from '../event/event-id-provider';
import type { TimeTracker } from '../time-tracker';
import { AttackRequestHandlerFactory } from './attack-request-handler-factory';
import type { AttackRequestNotifier } from './attack-request-notifier';

export class AttackRequestNotifierConfigurator {
  public static configure(
    attackRequestNotifier: AttackRequestNotifier,
    team: Team,
    weaponTracker: WeaponTracker,
    timeTracker: TimeTracker,
    chargeTimeline: ChargeTimeline,
    attackRegistry: AttackRegistry,
    buffRegistry: BuffRegistry,
    attackNotifier: AttackNotifier
  ) {
    for (const { attackDefinition, attackTimeline } of attackRegistry.items) {
      const { id } = attackDefinition;
      attackRequestNotifier.subscribe(
        eventIdProvider.getAttackRequestEventId(id),
        AttackRequestHandlerFactory.createHandlerToTriggerAttack(
          attackDefinition,
          attackTimeline,
          team,
          weaponTracker,
          timeTracker,
          chargeTimeline,
          attackRegistry,
          buffRegistry,
          attackNotifier
        )
      );
    }
  }
}
