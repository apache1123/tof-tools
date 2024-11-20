import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import type { EventManager } from "../event/event-manager";
import type { EventSubscriber } from "../event/event-subscriber";
import type { AbilityEndedMessage } from "../event/messages/ability-ended";
import type { AbilityStartedMessage } from "../event/messages/ability-started";
import type { AbilityTriggerRequest } from "../event/messages/ability-trigger-request";
import type { AttackHit } from "../event/messages/attack-hit";
import type { ResourceUpdated } from "../event/messages/resource-updated";
import type { ResourceId } from "../resource/resource-definition";
import type { Ability } from "./ability";
import type { AbilityId } from "./ability-id";
import type { AbilityTriggerOptions } from "./ability-trigger-options";

export class AbilityTrigger implements EventSubscriber {
  public constructor(
    private readonly ability: Ability,
    private readonly eventManager: EventManager,
    private readonly triggerOnCombatStart?: boolean,
    private readonly triggerOnActiveWeaponChange?: boolean,
    private readonly triggerOnAbilityStart?: AbilityId[],
    private readonly triggerOnAbilityEnd?: AbilityId[],
    private readonly triggerOnAttackHit?: {
      any?: boolean;
      ofWeapon?: WeaponName;
    },
    private readonly triggerOnResourceUpdate?: ResourceId,
  ) {}

  public get id() {
    return this.ability.id;
  }

  public subscribeToEvents() {
    this.eventManager.onAbilityTriggerRequest((message) => {
      this.handleAbilityRequest(message);
    });

    if (this.triggerOnCombatStart) {
      this.eventManager.onCombatStarted(() => {
        this.handleCombatStarted();
      });
    }

    if (this.triggerOnActiveWeaponChange) {
      this.eventManager.onActiveWeaponChanged(() => {
        this.handleActiveWeaponChanged();
      });
    }

    if (this.triggerOnAbilityStart) {
      this.eventManager.onAbilityStarted((message) => {
        this.handleAbilityStarted(message);
      });
    }

    if (this.triggerOnAbilityEnd) {
      this.eventManager.onAbilityEnded((message) => {
        this.handleAbilityEnded(message);
      });
    }

    if (this.triggerOnAttackHit) {
      this.eventManager.onAttackHit((message) => {
        this.handleAttackHit(message);
      });
    }

    if (this.triggerOnResourceUpdate) {
      this.eventManager.onResourceUpdated((message) => {
        this.handleResourceUpdated(message);
      });
    }
  }

  private triggerAbility(options?: AbilityTriggerOptions) {
    this.ability.trigger(options);
  }

  private handleAbilityRequest(abilityRequest: AbilityTriggerRequest): void {
    if (abilityRequest.id === this.id)
      this.triggerAbility(abilityRequest.options);
  }

  private handleCombatStarted(): void {
    if (this.triggerOnCombatStart) this.triggerAbility();
  }

  private handleActiveWeaponChanged(): void {
    if (this.triggerOnActiveWeaponChange) this.triggerAbility();
  }

  private handleAbilityStarted(startedAbility: AbilityStartedMessage): void {
    if (this.triggerOnAbilityStart?.includes(startedAbility.id))
      this.triggerAbility();
  }

  private handleAbilityEnded(endedAbility: AbilityEndedMessage) {
    if (this.triggerOnAbilityEnd?.includes(endedAbility.id))
      this.triggerAbility();
  }

  private handleAttackHit(attackHit: AttackHit) {
    if (
      this.triggerOnAttackHit &&
      (this.triggerOnAttackHit.any ||
        this.triggerOnAttackHit.ofWeapon === attackHit.weaponId)
    )
      this.triggerAbility();
  }

  private handleResourceUpdated(resourceUpdated: ResourceUpdated) {
    if (this.triggerOnResourceUpdate === resourceUpdated.id)
      this.triggerAbility();
  }
}
