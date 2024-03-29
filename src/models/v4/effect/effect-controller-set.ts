import type { EffectController } from './effect-controller';
import type { EffectDefinition } from './effect-definition';

// TODO: Review. This class feels unnecessary
export class EffectControllerSet<T extends EffectDefinition> {
  public constructor(
    public label: string,
    public readonly controllers: Map<string, EffectController<T>>
  ) {}

  public getEffectController(effectId: string) {
    return this.controllers.get(effectId);
  }
}
