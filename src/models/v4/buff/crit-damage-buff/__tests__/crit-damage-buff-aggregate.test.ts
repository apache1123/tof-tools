import { CritDamageBuff } from '../crit-damage-buff';
import { CritDamageBuffAggregate } from '../crit-damage-buff-aggregate';

let critDamageBuffs: CritDamageBuff[];

let sut: CritDamageBuffAggregate;

describe('Crit damage buff aggregate', () => {
  beforeEach(() => {
    critDamageBuffs = [
      new CritDamageBuff('test', 0.1),
      new CritDamageBuff('test', 0.21),
      new CritDamageBuff('test', 0.3),
    ];

    resetSut();
  });

  function resetSut() {
    sut = new CritDamageBuffAggregate(critDamageBuffs);
  }

  it('should sum buff values', () => {
    expect(sut.getAggregatedResult()).toMatchObject({
      critDamagePercent: 0.61,
    });
  });
});
