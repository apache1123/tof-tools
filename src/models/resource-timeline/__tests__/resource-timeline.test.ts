import { TimeInterval } from "../../time-interval/time-interval";
import { ResourceEvent } from "../resource-event";
import { ResourceTimeline } from "../resource-timeline";

describe("Resource timeline", () => {
  describe("cumulated amount", () => {
    it("should return 0 for an empty timeline", () => {
      const timeline = new ResourceTimeline(100);
      expect(timeline.getCumulatedAmount(0)).toBe(0);
    });

    it("should return the correct amount", () => {
      const timeline = new ResourceTimeline(100);

      timeline.addEvent(new ResourceEvent(new TimeInterval(0, 10), 10));
      expect(timeline.getCumulatedAmount(9)).toBe(0);
      expect(timeline.getCumulatedAmount(10)).toBe(10);

      timeline.addEvent(new ResourceEvent(new TimeInterval(10, 20), 5));
      expect(timeline.getCumulatedAmount(19)).toBe(10);
      expect(timeline.getCumulatedAmount(20)).toBe(15);
    });
  });
});
