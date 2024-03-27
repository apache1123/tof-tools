import { Effect } from '../effect';
import { EffectTimeline } from '../effect-timeline';

describe('Effect timeline', () => {
  const timelineDuration = 100;

  describe('adding an effect that overlaps with an existing one', () => {
    it('splits the effects into smaller effects with the correct stacks', () => {
      const sut = new EffectTimeline(timelineDuration);
      sut.addEffect(new Effect(0, 10, 0, 2));
      sut.addEffect(new Effect(5, 10, 0, 2));

      expect(sut.effects.length).toBe(3);

      const firstEvent = sut.effects[0];
      expect(firstEvent.startTime).toBe(0);
      expect(firstEvent.endTime).toBe(5);
      expect(firstEvent.stacks).toBe(1);

      const secondEvent = sut.effects[1];
      expect(secondEvent.startTime).toBe(5);
      expect(secondEvent.endTime).toBe(10);
      expect(secondEvent.stacks).toBe(2);

      const thirdEvent = sut.effects[2];
      expect(thirdEvent.startTime).toBe(10);
      expect(thirdEvent.endTime).toBe(15);
      expect(thirdEvent.stacks).toBe(1);
    });

    it('merges the two effects by increasing the existing the duration of the existing effect, if the resulting stacks of the two effects are the same', () => {
      const sut = new EffectTimeline(timelineDuration);
      sut.addEffect(new Effect(0, 10, 0, 1));
      sut.addEffect(new Effect(5, 10, 0, 1));

      expect(sut.effects.length).toBe(1);
      expect(sut.effects[0].endTime).toBe(15);
    });

    it("doesn't add a new effect if the two effects are of the exact same time period and the stack count cannot be increased further", () => {
      const sut = new EffectTimeline(timelineDuration);
      sut.addEffect(new Effect(0, 10, 0, 1));
      sut.addEffect(new Effect(0, 10, 0, 1));

      expect(sut.effects.length).toBe(1);
      expect(sut.effects[0].startTime).toBe(0);
      expect(sut.effects[0].endTime).toBe(10);
      expect(sut.effects[0].stacks).toBe(1);
    });

    it("doesn't add a new effect if the two effects are of the exact same time period, but increase the stack count of the existing effect if it can be increased further", () => {
      const sut = new EffectTimeline(timelineDuration);
      sut.addEffect(new Effect(0, 10, 0, 3, 1));
      sut.addEffect(new Effect(0, 10, 0, 3, 2));

      expect(sut.effects.length).toBe(1);
      expect(sut.effects[0].startTime).toBe(0);
      expect(sut.effects[0].endTime).toBe(10);
      expect(sut.effects[0].stacks).toBe(3);
    });
  });

  it('adds a new effect when there are no previous effects', () => {
    const sut = new EffectTimeline(timelineDuration);
    sut.addEffect(new Effect(0, 10, 0));

    expect(sut.effects.length).toBe(1);
    expect(sut.effects[0].startTime).toBe(0);
    expect(sut.effects[0].endTime).toBe(10);
  });

  it('adds a new effect onto the previous effect (merges them) when the new effect starts when the previous effect ends and the two have the same number of stacks', () => {
    const sut = new EffectTimeline(timelineDuration);
    sut.addEffect(new Effect(0, 10, 0, 2, 1));
    sut.addEffect(new Effect(10, 10, 0, 2, 1));

    expect(sut.effects.length).toBe(1);
    expect(sut.effects[0].startTime).toBe(0);
    expect(sut.effects[0].endTime).toBe(20);
  });

  it('adds a new effect when the new effect starts when the previous effect ends but the two do not have the same number of stacks', () => {
    const sut = new EffectTimeline(timelineDuration);
    sut.addEffect(new Effect(0, 10, 0, 2, 1));
    sut.addEffect(new Effect(10, 10, 0, 2, 2));

    expect(sut.effects.length).toBe(2);
    expect(sut.effects[1].startTime).toBe(10);
    expect(sut.effects[1].endTime).toBe(20);
  });

  it('returns whether or not the effect is active at the given time', () => {
    const sut = new EffectTimeline(timelineDuration);
    sut.addEffect(new Effect(0, 10, 0));

    expect(sut.isEffectActiveAt(0)).toBe(true);
    expect(sut.isEffectActiveAt(7)).toBe(true);
    expect(sut.isEffectActiveAt(10)).toBe(false);
    expect(sut.isEffectActiveAt(12)).toBe(false);
  });

  it('returns whether or not the effect is on cooldown at the given time', () => {
    const sut = new EffectTimeline(timelineDuration);
    const cooldown = 5;
    const effectWithCooldown = new Effect(0, 10, cooldown);
    sut.addEffect(effectWithCooldown);

    expect(sut.isEffectOnCooldownAt(0)).toBe(true);
    expect(sut.isEffectOnCooldownAt(3)).toBe(true);
    expect(sut.isEffectOnCooldownAt(5)).toBe(false);
    expect(sut.isEffectOnCooldownAt(7)).toBe(false);
    expect(sut.isEffectOnCooldownAt(10)).toBe(false);
    expect(sut.isEffectOnCooldownAt(12)).toBe(false);
  });
});
