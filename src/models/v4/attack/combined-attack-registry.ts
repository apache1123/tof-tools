import type { TimeTracker } from '../time-tracker';
import type { Attack } from './attack';
import { AttackRegistry } from './attack-registry';

export class CombinedAttackRegistry extends AttackRegistry {
  private readonly playerInputAttackRegistry: AttackRegistry;
  private readonly triggeredAttackRegistry: AttackRegistry;

  public constructor(
    playerInputAttackRegistry: AttackRegistry,
    triggeredAttackRegistry: AttackRegistry
  ) {
    super([
      ...playerInputAttackRegistry.items,
      ...triggeredAttackRegistry.items,
    ]);

    this.playerInputAttackRegistry = playerInputAttackRegistry;
    this.triggeredAttackRegistry = triggeredAttackRegistry;
  }

  public get playerInputAttackItems() {
    return this.playerInputAttackRegistry.items;
  }

  public get triggeredAttackItems() {
    return this.triggeredAttackRegistry.items;
  }

  public getNextPlayerInputAttacksOffCooldown(timeTracker: TimeTracker) {
    return this.playerInputAttackRegistry.getNextAttacksOffCooldown(
      timeTracker
    );
  }

  public get lastPlayerInputAttack(): Attack | undefined {
    return this.playerInputAttackRegistry.lastAttack;
  }
}
