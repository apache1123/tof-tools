import type { AbilityTrigger } from './ability-trigger';

export class AbilityTriggerRegistry {
  public readonly items: AbilityTrigger[] = [];

  public constructor(items: AbilityTrigger[]) {
    this.items = items;
  }

  public get availablePlayerInputTriggers() {
    return this.items.filter(
      (item) => item.isPlayerInputTrigger && item.canTrigger()
    );
  }
}
