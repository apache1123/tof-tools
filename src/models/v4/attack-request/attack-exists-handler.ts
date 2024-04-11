import type { AttackRegistry } from '../attack/attack-registry';
import type { AttackRequest } from './attack-request';
import { AttackRequestHandler } from './attack-request-handler';

export class AttackExistsHandler extends AttackRequestHandler {
  public constructor(private readonly attackRegistry: AttackRegistry) {
    super();
  }

  public handle(attackRequest: AttackRequest): boolean {
    if (!this.checkAttackExists(attackRequest)) return false;

    return super.handle(attackRequest);
  }

  private checkAttackExists(attackRequest: AttackRequest) {
    return !!this.attackRegistry.getItem(attackRequest.attackDefinition);
  }
}
