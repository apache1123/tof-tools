import { weaponDefinitions } from '../../../../definitions/weapons/weapon-definitions';
import { Weapon } from '../../../weapon';
import { EventManager } from '../../event/event-manager';
import { CurrentTick } from '../../tick/current-tick';
import { CurrentWeapon } from '../current-weapon';
import { CurrentWeaponTimeline } from '../current-weapon-timeline';

let timeline: CurrentWeaponTimeline;
let eventManager: EventManager;
let currentTick: CurrentTick;

let sut: CurrentWeapon;

const weapon1 = new Weapon(weaponDefinitions.byId['Fenrir']);
const weapon2 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);

describe('Current weapon', () => {
  beforeEach(() => {
    timeline = new CurrentWeaponTimeline(5000);
    eventManager = new EventManager();
    currentTick = new CurrentTick(0, 1000);
    sut = new CurrentWeapon(timeline, eventManager, currentTick);
  });

  it('can set the current weapon, and can return the current weapon and previous weapon', () => {
    sut.set(weapon1);
    currentTick.advance();
    expect(sut.value).toBe(weapon1);
    currentTick.advance();
    expect(sut.value).toBe(weapon1);
    currentTick.advance();
    sut.set(weapon2);
    currentTick.advance();
    expect(sut.value).toBe(weapon2);
    expect(sut.previous).toBe(weapon1);
  });
});
