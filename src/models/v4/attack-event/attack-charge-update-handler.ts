import type { ChargeTimeline } from '../charge/charge-timeline';
import type { ChargeEvent } from '../charge-event/charge-event';
import { eventIdProvider } from '../event/event-id-provider';
import type { EventNotifier } from '../event/event-notifier';
import type { AttackEvent } from './attack-event';
import { AttackEventHandler } from './attack-event-handler';

export class AttackChargeUpdateHandler extends AttackEventHandler {
  public constructor(
    private readonly chargeTimeline: ChargeTimeline,
    private readonly eventNotifier: EventNotifier
  ) {
    super();
  }

  public handle(attackEvent: AttackEvent): boolean {
    this.adjustCharge(attackEvent);
    return super.handle(attackEvent);
  }

  private adjustCharge(attackEvent: AttackEvent) {
    const {
      attack: { type, startTime, endTime, charge, weapon },
    } = attackEvent;

    if (type === 'discharge') {
      this.chargeTimeline.deductOneFullCharge(startTime, endTime);
    } else {
      const fullChargeGained = this.chargeTimeline.addCharge(
        charge,
        startTime,
        endTime
      );

      if (fullChargeGained && this.chargeTimeline.lastChargeEvent) {
        const chargeEvent: ChargeEvent = {
          time: endTime,
          charge: this.chargeTimeline.lastChargeEvent,
        };
        this.eventNotifier.notify(
          eventIdProvider.getWeaponFullChargeEventId(weapon.id),
          chargeEvent
        );
      }
    }
  }
}
