import { TickTracker } from '../tick-tracker';

describe('Tick tracker', () => {
  it('works', () => {
    const tickTracker = new TickTracker(0, 100);
    expect(tickTracker.currentTick.startTime).toBe(0);
    expect(tickTracker.currentTick.endTime).toBe(100);
    tickTracker.advanceTick();
    expect(tickTracker.currentTick.startTime).toBe(100);
    expect(tickTracker.currentTick.endTime).toBe(200);
  });
});
