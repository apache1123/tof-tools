import { maxCharge } from '../../../../constants/combat';
import { ChargeTimeline } from '../charge-timeline';

describe('Charge timeline', () => {
  describe('adding charge', () => {
    it('adds the charge amount to the cumulated charge amount', () => {
      const sut = new ChargeTimeline();
      sut.addCharge(100, 1000);
      sut.addCharge(200, 2000);
      expect(sut.cumulatedCharge).toBe(300);
    });

    it('cumulated charge cannot be over the max amount', () => {
      const sut = new ChargeTimeline();
      sut.addCharge(1800, 1000);
      sut.addCharge(500, 2000);
      expect(sut.cumulatedCharge).toBe(maxCharge);
    });
  });

  it('returns whether there is at least one full charge', () => {
    const sut = new ChargeTimeline();
    sut.addCharge(500, 1000);
    expect(sut.hasFullCharge).toBe(false);

    sut.addCharge(700, 2000);
    expect(sut.hasFullCharge).toBe(true);

    sut.addCharge(1000, 3000);
    expect(sut.hasFullCharge).toBe(true);
  });
});
