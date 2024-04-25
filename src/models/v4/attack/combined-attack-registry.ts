import type { AttackAction } from './attack-action';
import { AttackRegistry } from './attack-registry';

export class CombinedAttackRegistry extends AttackRegistry {
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

  public get lastPlayerInputAttackAction(): AttackAction | undefined {
    return this.playerInputAttackRegistry.lastAttackAction;
  }
}
