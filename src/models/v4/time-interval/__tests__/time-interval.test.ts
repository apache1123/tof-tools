import { TimeInterval } from '../time-interval';

describe('Time interval', () => {
  it('has the end time always later than the start time', () => {
    expect(() => {
      new TimeInterval(10, 5);
    }).toThrow();
    expect(() => {
      new TimeInterval(10, 10);
    }).toThrow();

    const sut = new TimeInterval(10, 15);
    expect(() => {
      sut.endTime = 5;
    }).toThrow();
    expect(() => {
      sut.endTime = 10;
    }).toThrow();
  });

  describe('includes', () => {
    it('returns true if a time is between the start and end time', () => {
      const sut = new TimeInterval(5, 10);
      expect(sut.includes(5)).toBe(true);
      expect(sut.includes(7)).toBe(true);
      expect(sut.includes(9)).toBe(true);
    });

    it('returns false if a time is before the start time', () => {
      const sut = new TimeInterval(5, 10);
      expect(sut.includes(4)).toBe(false);
    });

    it('returns false if a time is after the end time', () => {
      const sut = new TimeInterval(5, 10);
      expect(sut.includes(10)).toBe(false);
      expect(sut.includes(11)).toBe(false);
    });
  });
});
