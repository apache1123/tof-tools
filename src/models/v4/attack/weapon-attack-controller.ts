import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { Weapon } from '../../weapon';
import { AttackController } from './attack-controller';
import type { AttackDefinition } from './attack-definition';
import type { AttackResult } from './attack-result';
import { AttackTimeline } from './attack-timeline';

export class WeaponAttackController {
  public readonly combinedAttackTimeline: AttackTimeline;

  private readonly attackControllers: Map<AttackDefinition, AttackController>;

  public constructor(public readonly weapon: Weapon, combatDuration: number) {
    this.attackControllers = new Map(
      weapon.allAttackDefinitions.map((attackDefinition) => {
        const timeline = new AttackTimeline(combatDuration);
        return [
          attackDefinition,
          new AttackController(attackDefinition, timeline),
        ];
      })
    );

    this.combinedAttackTimeline = new AttackTimeline(combatDuration);
  }

  public performAttack(
    attackDefinition: AttackDefinition,
    time: number,
    elementalTypeOverwrite?: WeaponElementalType
  ): AttackResult {
    if (!this.canPerformAttack(attackDefinition, time)) {
      throw new Error(
        `Trying to attack with definition id: ${attackDefinition.id}, but it is not available to be performed`
      );
    }

    const attackController = this.attackControllers.get(attackDefinition);
    if (!attackController) {
      throw new Error(
        `AttackController for attackDefinition with id: ${attackDefinition.id} not found for weapon: ${this.weapon.id}`
      );
    }

    const attack = attackController.performAttack(time, elementalTypeOverwrite);

    this.combinedAttackTimeline.addAttack(attack);

    const attackResult: AttackResult = {
      ...attack,
      endTime: attack.endTime,
      cooldownEndsAt: attack.cooldownEndsAt,
      weapon: this.weapon,
      attackDefinition,
    };

    return attackResult;
  }

  public canPerformAttack(attackDefinition: AttackDefinition, time: number) {
    return this.getAvailableAttacks(time).some(
      (availableAttack) => availableAttack === attackDefinition
    );
  }

  public getAvailableAttacks(time: number): AttackDefinition[] {
    return Array.from(this.attackControllers)
      .filter(
        ([, attackController]) => !attackController.isAttackOnCooldownAt(time)
      )
      .map(([attackDefinition]) => attackDefinition);
  }
}
