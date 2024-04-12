import { maxCharge } from '../../../../constants/combat';
import { ChargeTimeline } from '../charge-timeline';

const timelineDuration = 10000;

describe('Charge timeline', () => {
  describe('adding charge', () => {
    it('adds the charge amount to the cumulated charge amount', () => {
      const sut = new ChargeTimeline(timelineDuration);
      sut.addCharge(100, 0, 1000);
      sut.addCharge(200, 1000, 2000);
      expect(sut.cumulatedCharge).toBe(300);
    });

    it('cumulated charge cannot be over the max amount', () => {
      const sut = new ChargeTimeline(timelineDuration);
      sut.addCharge(1800, 0, 1000);
      sut.addCharge(500, 1000, 2000);
      expect(sut.cumulatedCharge).toBe(maxCharge);
    });
  });

  describe('deducting a full charge', () => {
    it('deducts the full charge amount from the cumulated charge amount', () => {
      const sut = new ChargeTimeline(timelineDuration);
      sut.addCharge(1300, 0, 1000);
      sut.deductOneFullCharge(1000, 2000);
      expect(sut.cumulatedCharge).toBe(300);
    });

    it('throws an error if there is not enough charge to deduct', () => {
      const sut = new ChargeTimeline(timelineDuration);
      sut.addCharge(300, 0, 1000);
      expect(() => {
        sut.deductOneFullCharge(1000, 2000);
      }).toThrow();
    });
  });

  it('returns whether there is at least one full charge', () => {
    const sut = new ChargeTimeline(timelineDuration);
    sut.addCharge(500, 0, 1000);
    expect(sut.hasFullCharge).toBe(false);

    sut.addCharge(700, 1000, 2000);
    expect(sut.hasFullCharge).toBe(true);

    sut.addCharge(1000, 2000, 3000);
    expect(sut.hasFullCharge).toBe(true);
  });
});
