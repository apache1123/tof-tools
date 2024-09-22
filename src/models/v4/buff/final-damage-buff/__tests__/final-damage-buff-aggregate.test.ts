import { FinalDamageBuff } from '../final-damage-buff';
import { FinalDamageBuffAggregate } from '../final-damage-buff-aggregate';

let finalDamageBuffs: FinalDamageBuff[];

let sut: FinalDamageBuffAggregate;

describe('Final damage buff aggregate', () => {
  beforeEach(() => {
    finalDamageBuffs = [
      new FinalDamageBuff('weapon buff 1', 0.1, 'weapon', {}),
      new FinalDamageBuff('matrix buff 1', 0.21, 'matrix', {}),
      new FinalDamageBuff('matrix buff 2', 0.15, 'matrix', {}),
      new FinalDamageBuff('weapon buff 2', 0.3, 'weapon', {}),
      new FinalDamageBuff('team buff', 0.45, 'team', {}),
    ];

    resetSut();
  });

  function resetSut() {
    sut = new FinalDamageBuffAggregate(finalDamageBuffs);
  }

  it('should sum buffs of the same source, whilst multiplying buffs of different sources', () => {
    expect(sut.getAggregatedResult()).toMatchObject({
      finalDamagePercent: 1.7608,
    });
  });
});
