import type { Message } from "./message";
import { MessageBroker } from "./message-broker";
import type { AbilityEndedMessage } from "./messages/ability-ended";
import type { AbilityStartedMessage } from "./messages/ability-started";
import type { AbilityTriggerRequest } from "./messages/ability-trigger-request";
import type { ActiveWeaponChangedMessage } from "./messages/active-weapon-changed";
import type { AdvancingTick } from "./messages/advancing-tick";
import type { AttackHit } from "./messages/attack-hit";
import type { CombatStartedMessage } from "./messages/combat-started";
import type { ResourceDepleteRequest } from "./messages/resource-deplete-request";
import type { ResourceUpdateRequest } from "./messages/resource-update-request";
import type { ResourceUpdated } from "./messages/resource-updated";

enum EventType {
  TickAdvancing = "tick-advancing",
  CombatStarted = "combat-start",
  ActiveWeaponChanged = "active-weapon-changed",
  AbilityTriggerRequest = "ability-trigger-request",
  AbilityStarted = "ability-started",
  AbilityEnded = "ability-ended",
  AttackHit = "attack-hit",
  ResourceUpdateRequest = "resource-update-request",
  ResourceDepleteRequest = "resource-deplete-request",
  ResourceUpdated = "resource-updated",
}

/** A facade for providing all event driven publishing, subscribing functionality. Most events that are published are queued and are only delivered when instructed to (usually after advancing to the next tick), with the exception to a select few (e.g. the `tickAdvancing` event) that are delivered immediately */
export class EventManager {
  private readonly messageBroker = new MessageBroker();

  public deliverQueuedMessages() {
    this.messageBroker.deliverQueuedMessages();
  }

  /** Publish to subscribers that the current tick is advancing and to perform actions upon the current tick */
  public publishTickAdvancing(message: AdvancingTick) {
    this.messageBroker.pushMessage(EventType.TickAdvancing, message);
  }
  /** Subscribe to when the current tick is advancing and handle something through the callback */
  public onTickAdvancing(callback: (message: AdvancingTick) => void) {
    this.messageBroker.subscribeCallback(EventType.TickAdvancing, callback);
  }
  public unsubscribeToTickAdvancing(
    callback: (message: AdvancingTick) => void,
  ) {
    this.messageBroker.unsubscribeCallback(EventType.TickAdvancing, callback);
  }

  public publishCombatStarted(message: CombatStartedMessage) {
    this.messageBroker.queueMessage(EventType.CombatStarted, message);
  }
  public onCombatStarted(callback: (message: CombatStartedMessage) => void) {
    this.messageBroker.subscribeCallback(EventType.CombatStarted, callback);
  }

  public publishActiveWeaponChanged(
    newActiveWeapon: ActiveWeaponChangedMessage,
  ) {
    this.messageBroker.queueMessage(
      EventType.ActiveWeaponChanged,
      newActiveWeapon,
    );
  }
  public onActiveWeaponChanged(
    callback: (newActiveWeapon: ActiveWeaponChangedMessage) => void,
  ) {
    this.messageBroker.subscribeCallback(
      EventType.ActiveWeaponChanged,
      callback as (message: Message) => void,
    );
  }

  public publishAbilityTriggerRequest(request: AbilityTriggerRequest) {
    this.messageBroker.queueMessage(EventType.AbilityTriggerRequest, request);
  }
  public onAbilityTriggerRequest(
    callback: (request: AbilityTriggerRequest) => void,
  ) {
    this.messageBroker.subscribeCallback(
      EventType.AbilityTriggerRequest,
      callback as (message: Message) => void,
    );
  }

  public publishAbilityStarted(startedAbility: AbilityStartedMessage) {
    this.messageBroker.queueMessage(EventType.AbilityStarted, startedAbility);
  }
  public onAbilityStarted(
    callback: (startedAbility: AbilityStartedMessage) => void,
  ) {
    this.messageBroker.subscribeCallback(
      EventType.AbilityStarted,
      callback as (message: Message) => void,
    );
  }

  public publishAbilityEnded(endedAbility: AbilityEndedMessage) {
    this.messageBroker.queueMessage(EventType.AbilityEnded, endedAbility);
  }
  public onAbilityEnded(callback: (endedAbility: AbilityEndedMessage) => void) {
    this.messageBroker.subscribeCallback(
      EventType.AbilityEnded,
      callback as (message: Message) => void,
    );
  }

  public publishAttackHit(attackHit: AttackHit) {
    this.messageBroker.queueMessage(EventType.AttackHit, attackHit);
  }
  public onAttackHit(callback: (attackHit: AttackHit) => void) {
    this.messageBroker.subscribeCallback(
      EventType.AttackHit,
      callback as (message: Message) => void,
    );
  }

  public publishResourceUpdateRequest(request: ResourceUpdateRequest) {
    this.messageBroker.queueMessage(EventType.ResourceUpdateRequest, request);
  }
  public onResourceUpdateRequest(
    callback: (request: ResourceUpdateRequest) => void,
  ) {
    this.messageBroker.subscribeCallback(
      EventType.ResourceUpdateRequest,
      callback as (message: Message) => void,
    );
  }

  public publishResourceDepleteRequest(request: ResourceDepleteRequest) {
    this.messageBroker.queueMessage(EventType.ResourceDepleteRequest, request);
  }
  public onResourceDepleteRequest(
    callback: (request: ResourceDepleteRequest) => void,
  ) {
    this.messageBroker.subscribeCallback(
      EventType.ResourceDepleteRequest,
      callback as (message: Message) => void,
    );
  }

  public publishResourceUpdated(updatedResource: ResourceUpdated) {
    this.messageBroker.queueMessage(EventType.ResourceUpdated, updatedResource);
  }
  public onResourceUpdated(
    callback: (updatedResource: ResourceUpdated) => void,
  ) {
    this.messageBroker.subscribeCallback(
      EventType.ResourceUpdated,
      callback as (message: Message) => void,
    );
  }
}
