import { CritRateBuff } from '../crit-rate-buff';
import { CritRateBuffAggregate } from '../crit-rate-buff-aggregate';

let critRateBuffs: CritRateBuff[];

let sut: CritRateBuffAggregate;

describe('Crit rate buff aggregate', () => {
  beforeEach(() => {
    critRateBuffs = [
      new CritRateBuff('test', 0.1),
      new CritRateBuff('test', 0.21),
      new CritRateBuff('test', 0.3),
    ];

    resetSut();
  });

  function resetSut() {
    sut = new CritRateBuffAggregate(critRateBuffs);
  }

  it('should sum buff values', () => {
    expect(sut.getAggregatedResult()).toMatchObject({
      critRatePercent: 0.61,
    });
  });
});
