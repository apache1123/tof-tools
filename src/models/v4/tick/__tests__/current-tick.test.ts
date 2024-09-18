import { CurrentTick } from '../current-tick';

describe('Current tick', () => {
  it('works', () => {
    const currentTick = new CurrentTick(0, 100);
    expect(currentTick.startTime).toBe(0);
    expect(currentTick.endTime).toBe(100);
    currentTick.advance();
    expect(currentTick.startTime).toBe(100);
    expect(currentTick.endTime).toBe(200);
  });
});
