import type { WeaponElementalType } from '../../../constants/elemental-type';
import { Attack } from './attack';
import type { AttackDefinition } from './attack-definition';
import type { AttackTimeline } from './attack-timeline';

export class AttackController {
  public constructor(
    public readonly definition: AttackDefinition,
    public readonly timeline: AttackTimeline
  ) {}

  public get id() {
    return this.definition.id;
  }

  public performAttack(
    time: number,
    elementalTypeOverwrite?: WeaponElementalType
  ): Attack {
    const { duration, cooldown, displayName, damageModifiers, type } =
      this.definition;

    const elementalType =
      elementalTypeOverwrite ?? this.definition.elementalType;
    const damageModifiersCopy = { ...damageModifiers };

    const attack = new Attack(
      time,
      duration,
      cooldown,
      elementalType,
      damageModifiersCopy,
      type
    );
    attack.displayName = displayName;

    this.timeline.addAttack(attack);

    return attack;
  }

  public isAttackOnCooldownAt(time: number) {
    return this.timeline.isAttackOnCooldownAt(time);
  }
}
