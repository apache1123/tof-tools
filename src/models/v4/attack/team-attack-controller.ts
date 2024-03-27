import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { Team } from '../../team';
import type { Weapon } from '../../weapon';
import type { ChargeTimeline } from '../charge/charge-timeline';
import type { AttackCommand } from './attack-command';
import type { AttackResult } from './attack-result';
import { WeaponAttackController } from './weapon-attack-controller';

export class TeamAttackController {
  public readonly weaponAttackControllers: Map<Weapon, WeaponAttackController>;

  private _nextAttackTime = 0;
  private _activeWeapon: Weapon | undefined;
  /** The previous weapon before switching to the current active weapon */
  private previousWeapon: Weapon | undefined;

  public constructor(
    public readonly team: Team,
    combatDuration: number,
    private readonly chargeTimeline: ChargeTimeline
  ) {
    this.weaponAttackControllers = new Map(
      team.weapons.map((weapon) => [
        weapon,
        new WeaponAttackController(weapon, combatDuration),
      ])
    );
  }

  public get activeWeapon() {
    return this._activeWeapon;
  }

  public get nextAvailableAttacks(): AttackCommand[] {
    return Array.from(this.weaponAttackControllers).flatMap(
      ([weapon, weaponAttackController]) =>
        weaponAttackController
          .getAvailableAttacks(this.nextAttackTime)
          .map((attackDefinition) => ({ weapon, attackDefinition }))
          // TODO: This should probably be refactored out
          .filter((attackCommand) => {
            if (attackCommand.attackDefinition.type === 'discharge') {
              return (
                this.chargeTimeline.hasFullCharge &&
                attackCommand.weapon !== this.activeWeapon
              );
            }

            return true;
          })
    );
  }

  public get nextAttackTime() {
    return this._nextAttackTime;
  }

  public performAttack(attackCommand: AttackCommand): AttackResult {
    const { weapon, attackDefinition } = attackCommand;
    if (!this.canPerformAttack(attackCommand)) {
      throw new Error(
        `Trying to attack with weapon: ${weapon.id}, definition id: ${attackDefinition.id}, but it is not available to be performed`
      );
    }

    const weaponAttackController = this.weaponAttackControllers.get(weapon);
    if (!weaponAttackController) {
      throw new Error(
        `Cannot find WeaponAttackController for weapon: ${weapon.id}`
      );
    }

    if (this._activeWeapon !== weapon) {
      this.previousWeapon = this._activeWeapon;
      this._activeWeapon = weapon;
    }

    // TODO: This should probably refactored out
    let elementalTypeOverwrite: WeaponElementalType | undefined;
    if (attackDefinition.followLastWeaponElementalType && this.previousWeapon) {
      elementalTypeOverwrite = this.previousWeapon.definition.damageElement;
    }

    const attackResult = weaponAttackController.performAttack(
      attackDefinition,
      this.nextAttackTime,
      elementalTypeOverwrite
    );

    this._nextAttackTime = attackResult.endTime;

    return attackResult;
  }

  public canPerformAttack(attackCommand: AttackCommand) {
    return this.nextAvailableAttacks.some(
      (availableAttack) =>
        availableAttack.weapon === attackCommand.weapon &&
        availableAttack.attackDefinition === attackCommand.attackDefinition
    );
  }
}
