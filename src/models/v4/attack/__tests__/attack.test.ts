import { mock } from 'jest-mock-extended';

import type { Weapon } from '../../../weapon';
import type { Charge } from '../../charge/charge';
import { TickTracker } from '../../tick/tick-tracker';
import { TimeInterval } from '../../time-interval/time-interval';
import { Timeline } from '../../timeline/timeline';
import type { WeaponTracker } from '../../weapon-tracker/weapon-tracker';
import { Attack } from '../attack';
import type { AttackDefinition } from '../attack-definition';
import type { AttackEvent } from '../attack-event';

describe('Attack', () => {
  describe('adding attack event', () => {
    it('cuts the previous attack event short if a new one is added before it has ended', () => {
      const timeline = new Timeline<AttackEvent>(100);
      const definition = mock<AttackDefinition>({
        endedBy: { duration: 20 },
      });
      const tickTracker = new TickTracker(new TimeInterval(0, 10), 10);

      const sut = new Attack(
        mock<Weapon>(),
        definition,
        timeline,
        tickTracker,
        mock<WeaponTracker>(),
        mock<Charge>()
      );
      sut.trigger();
      tickTracker.advanceTickInterval();
      sut.trigger();

      expect(timeline.events[0].startTime).toBe(0);
      expect(timeline.events[0].endTime).toBe(10);
      expect(timeline.events[1].startTime).toBe(10);
      expect(timeline.events[1].endTime).toBe(30);
    });
  });
  describe('resolving elemental type', () => {
    it('returns the correct elemental type, when there are no special conditions', () => {
      const sut = newAttack({ defaultElementalType: 'Altered' });
      const event = sut.trigger();
      expect(event?.elementalType).toBe('Altered');
    });

    it("returns the correct elemental type, when the attack's elemental type follows the active weapon", () => {
      const sut = newAttack({
        followCurrentWeaponElementalType: true,
        defaultElementalType: 'Flame',
      });
      const event = sut.trigger();
      expect(event?.elementalType).toBe('Altered');
    });

    it("returns the correct elemental type, when the attack's elemental type follows the previous weapon", () => {
      const sut = newAttack({
        followLastWeaponElementalType: true,
        defaultElementalType: 'Altered',
      });
      const event = sut.trigger();
      expect(event?.elementalType).toBe('Frost');
    });

    function newAttack(elementalType: AttackDefinition['elementalType']) {
      const timeline = new Timeline<AttackEvent>(100);
      const definition = mock<AttackDefinition>({
        elementalType,
        triggeredBy: { playerInput: true },
        endedBy: { duration: 100 },
      });

      return new Attack(
        mock<Attack['weapon']>(),
        definition,
        timeline,
        mock<Attack['tickTracker']>(),
        mock<Attack['weaponTracker']>({
          activeWeapon: { damageElement: 'Altered' },
          previousWeapon: { damageElement: 'Frost' },
        }),
        mock<Attack['charge']>()
      );
    }
  });
});
