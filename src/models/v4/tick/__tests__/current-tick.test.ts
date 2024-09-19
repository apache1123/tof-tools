import { EventManager } from '../../event/event-manager';
import { CurrentTick } from '../current-tick';

let startingTime: number;
let tickDuration: number;
let eventManager: EventManager;

let sut: CurrentTick;

describe('Current tick', () => {
  beforeEach(() => {
    startingTime = 0;
    tickDuration = 100;
    eventManager = new EventManager();

    resetSut();
  });

  function resetSut() {
    sut = new CurrentTick(startingTime, tickDuration, eventManager);
  }

  it('works', () => {
    expect(sut.startTime).toBe(0);
    expect(sut.endTime).toBe(100);
    sut.advance();
    expect(sut.startTime).toBe(100);
    expect(sut.endTime).toBe(200);
  });

  it('publishes the tick advance event when advancing', () => {
    const spy = jest.spyOn(eventManager, 'publishTickAdvancing');
    sut.advance();
    expect(spy).toHaveBeenCalled();
  });
});
