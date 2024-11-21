import type { ActiveBuffs } from "../../buff/active-buff/active-buffs";
import { UtilizedBuffs } from "../../buff/utilized-buffs";
import type { CombatCharacter } from "../../character/combat-character";
import { EventManager } from "../../event/event-manager";
import type { Target } from "../../target/target";
import { CurrentTick } from "../../tick/current-tick";
import type { DamageRecord } from "../damage-record";
import { DamageRecordTimeline } from "../damage-record-timeline";

let timeline: DamageRecordTimeline;
let utilizedBuffs: UtilizedBuffs;
let currentTick: CurrentTick;
let eventManager: EventManager;
let target: Target;
let activeBuffs: ActiveBuffs;
let character: CombatCharacter;

let sut: DamageRecord;

describe("Damage record", () => {
  beforeEach(() => {
    timeline = new DamageRecordTimeline(100000);
    utilizedBuffs = new UtilizedBuffs();
    eventManager = new EventManager();
    currentTick = new CurrentTick(0, 1000, eventManager);
    target = { resistance: 0.4 };
    // activeBuffs = new ActiveBuffs();
    // character = new CombatCharacter();
  });
});
