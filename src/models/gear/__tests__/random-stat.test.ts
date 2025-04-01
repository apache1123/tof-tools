import { getStatType } from "../../../definitions/stat-types";
import { RandomStat } from "../random-stat";

let sut: RandomStat;

describe("Random stat", () => {
  beforeEach(() => {
    sut = new RandomStat(getStatType("Physical Attack"));
    sut.setValueAndAdjustTotalValue(100);
    sut.setAugmentIncreaseValueAndAdjustTotalValue(25);
    // Total value is 125
  });

  describe("Setting value", () => {
    describe("(default behaviour) can set the value, whilst adjusting the total value and keeping the augment increase value the same", () => {
      it("works", () => {
        sut.setValueAndAdjustTotalValue(110);
        expect(sut.value).toBe(110);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(135);
      });
    });

    describe("can set the value, whilst adjusting the augment increase value and keeping the total value the same", () => {
      it("works", () => {
        sut.setValueAndKeepTotalValue(110);
        expect(sut.value).toBe(110);
        expect(sut.augmentIncreaseValue).toBe(15);
        expect(sut.totalValue).toBe(125);
      });

      it("falls back to the default behaviour if the total value cannot be kept the same", () => {
        sut.setValueAndKeepTotalValue(150);
        expect(sut.value).toBe(150);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(175);
      });
    });
  });

  describe("Setting augment value", () => {
    describe("(default behaviour) can set the augment value, whilst adjusting the total value and keeping the value the same", () => {
      it("works", () => {
        sut.setAugmentIncreaseValueAndAdjustTotalValue(30);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(30);
        expect(sut.totalValue).toBe(130);
      });
    });

    describe("can set the augment increase value, whilst adjusting the value and keeping the total value the same", () => {
      it("works", () => {
        sut.setAugmentIncreaseValueAndKeepTotalValue(30);
        expect(sut.value).toBe(95);
        expect(sut.augmentIncreaseValue).toBe(30);
        expect(sut.totalValue).toBe(125);
      });

      it("falls back to the default behaviour if the total value cannot be kept the same", () => {
        sut.setAugmentIncreaseValueAndKeepTotalValue(150);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(150);
        expect(sut.totalValue).toBe(250);
      });
    });
  });

  describe("Setting total value", () => {
    describe("(default behaviour) can set the total value, whilst adjusting the augment increase value and keeping the value the same", () => {
      it("works", () => {
        sut.setTotalValueAndAdjustAugmentIncreaseValue(140);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(40);
        expect(sut.totalValue).toBe(140);
      });

      it("does nothing if the total value is lower than the value", () => {
        sut.setTotalValueAndAdjustAugmentIncreaseValue(1);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(125);
      });
    });

    describe("can set the total value, whilst adjusting the value and keeping the augment increase value the same", () => {
      it("works", () => {
        sut.setTotalValueAndAdjustValue(140);
        expect(sut.value).toBe(115);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(140);
      });

      it("does nothing if the total value is lower than the augment increase value", () => {
        sut.setTotalValueAndAdjustValue(1);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(125);
      });
    });
  });
});
