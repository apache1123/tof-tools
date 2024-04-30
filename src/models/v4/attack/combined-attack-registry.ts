import type { Serializable } from '../../persistable';
import type { AttackEvent } from '../attack-timeline/attack-event';
import { AttackRegistry } from './attack-registry';
import type { CombinedAttackRegistryDto } from './dtos/combined-attack-registry-dto';

export class CombinedAttackRegistry
  extends AttackRegistry
  implements Serializable<CombinedAttackRegistryDto>
{
  private readonly playerInputAttackRegistry: AttackRegistry;
  private readonly triggeredAttackRegistry: AttackRegistry;

  public constructor(
    playerInputAttackRegistry: AttackRegistry,
    triggeredAttackRegistry: AttackRegistry
  ) {
    super([
      ...playerInputAttackRegistry.attacks,
      ...triggeredAttackRegistry.attacks,
    ]);

    this.playerInputAttackRegistry = playerInputAttackRegistry;
    this.triggeredAttackRegistry = triggeredAttackRegistry;
  }

  public get playerInputAttacks() {
    return this.playerInputAttackRegistry.attacks;
  }

  public get triggeredAttacks() {
    return this.triggeredAttackRegistry.attacks;
  }

  public getAvailablePlayerInputAttacks(time: number) {
    return this.playerInputAttackRegistry.getAvailableAttacks(time);
  }

  public get lastPlayerInputAttackEvent(): AttackEvent | undefined {
    return this.playerInputAttackRegistry.lastAttackEvent;
  }

  public toDto(): CombinedAttackRegistryDto {
    const { playerInputAttacks, triggeredAttacks } = this;
    return {
      ...super.toDto(),
      playerInputAttacks: playerInputAttacks.map((attack) => attack.toDto()),
      triggeredAttacks: triggeredAttacks.map((attack) => attack.toDto()),
    };
  }
}
