import { EventManager } from "../../event/event-manager";
import { ResourceTimeline } from "../../resource-timeline/resource-timeline";
import { CurrentTick } from "../../tick/current-tick";
import { Resource } from "../resource";

const id = "id";
const displayName = "displayName";
const maxAmount = 100;
const startingAmount = 0;
const regenerate = { amountPerSecond: 20 };
const endTime = 10000;
let timeline: ResourceTimeline;
let eventManager: EventManager;
let currentTick: CurrentTick;
let sut: Resource;

describe("Resource", () => {
  beforeEach(() => {
    timeline = new ResourceTimeline(endTime);
    eventManager = new EventManager();
    currentTick = new CurrentTick(0, 1000, eventManager);

    resetSut();
  });

  function resetSut() {
    sut = new Resource(
      id,
      displayName,
      maxAmount,
      startingAmount,
      regenerate,
      timeline,
      eventManager,
      currentTick,
    );
    sut.subscribeToEvents();
  }

  describe("adding resource amount", () => {
    it("should add the correct amount", () => {
      sut.add(10);
      expect(sut.getCumulatedAmount()).toBe(0);

      sut.add(10);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(20);
    });

    it("should not add more than max amount, in one add", () => {
      sut.add(150);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(maxAmount);
    });

    it("should not add more than max amount, in multiple adds over the same tick", () => {
      sut.add(50);
      sut.add(100);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(maxAmount);
    });

    it("should not add more than max amount, in multiple adds over multiple ticks", () => {
      sut.add(50);
      currentTick.advance();
      sut.add(100);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(maxAmount);
    });

    it("should add only the prioritized amount, ignoring all others in the same tick", () => {
      sut.add(50);
      sut.add(20);
      sut.add(10, true);
      sut.add(40, true);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(40);
    });

    it("can add negative amounts, but not below 0", () => {
      sut.add(50);
      currentTick.advance();
      sut.add(-5);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(45);
      sut.add(-50);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(0);
    });
  });

  describe("depleting resource", () => {
    it("should deplete the correct amount", () => {
      sut.add(50);
      currentTick.advance();
      sut.deplete();
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(0);
    });

    it("should prioritize deplete over other resource events", () => {
      sut.add(50);
      currentTick.advance();
      sut.add(10, true);
      sut.deplete();
      sut.add(40, true);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(0);
    });
  });

  describe("On tick advancing", () => {
    it("should passive regenerate resource amount only when there are no other resource events", () => {
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(20);

      sut.add(10);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(30);

      sut.deplete();
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(0);

      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(20);
    });

    it("should public resource updated event when the resource amount changes", () => {
      const spy = jest.spyOn(eventManager, "publishResourceUpdated");
      const sut = new Resource(
        id,
        displayName,
        maxAmount,
        startingAmount,
        regenerate,
        timeline,
        eventManager,
        currentTick,
      );
      sut.add(10);
      currentTick.advance();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("subscribing to events", () => {
    // We always need to advance two ticks for request events to take effect because - the resource request is requested at tick 1, acted upon in tick 2 (in which the resource amount is updated), then the result will be visible at the start of tick 3

    it("should handle resource update requests", () => {
      regenerate.amountPerSecond = 0;
      eventManager.publishResourceUpdateRequest({
        id,
        amount: 10,
        hasPriority: false,
      });
      eventManager.publishResourceUpdateRequest({
        id: "some-other-id",
        amount: 20,
        hasPriority: false,
      });

      currentTick.advance(); // -> 1000-2000
      currentTick.advance(); // -> 2000-3000
      expect(sut.getCumulatedAmount()).toBe(10);
    });

    it("should handle resource deplete requests", () => {
      sut.add(10);
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(10);

      eventManager.publishResourceDepleteRequest({ id: "some-other-id" });
      currentTick.advance();
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(10);

      eventManager.publishResourceDepleteRequest({ id });
      currentTick.advance();
      currentTick.advance();
      expect(sut.getCumulatedAmount()).toBe(0);
    });
  });
});
