import { getStatType } from "../../../definitions/stat-types";
import { RandomStat } from "../random-stat";

let sut: RandomStat;

describe("Random stat", () => {
  beforeEach(() => {
    sut = new RandomStat(getStatType("Physical Attack"));
    sut.setValueAndAdjustTotalValue(5);
    sut.setAugmentIncreaseValueAndAdjustTotalValue(7);
    // Total value is 12
  });

  describe("Setting value", () => {
    describe("(default behaviour) can set the value, whilst adjusting the total value and keeping the augment increase value the same", () => {
      it("works", () => {
        sut.setValueAndAdjustTotalValue(10);
        expect(sut.value).toBe(10);
        expect(sut.augmentIncreaseValue).toBe(7);
        expect(sut.totalValue).toBe(17);
      });
    });

    describe("can set the value, whilst adjusting the augment increase value and keeping the total value the same", () => {
      it("works", () => {
        sut.setValueAndKeepTotalValue(10);
        expect(sut.value).toBe(10);
        expect(sut.augmentIncreaseValue).toBe(2);
        expect(sut.totalValue).toBe(12);
      });

      it("falls back to the default behaviour if the total value cannot be kept the same", () => {
        sut.setValueAndKeepTotalValue(15);
        expect(sut.value).toBe(15);
        expect(sut.augmentIncreaseValue).toBe(7);
        expect(sut.totalValue).toBe(22);
      });
    });
  });

  describe("Setting augment value", () => {
    describe("(default behaviour) can set the augment value, whilst adjusting the total value and keeping the value the same", () => {
      it("works", () => {
        sut.setAugmentIncreaseValueAndAdjustTotalValue(10);
        expect(sut.value).toBe(5);
        expect(sut.augmentIncreaseValue).toBe(10);
        expect(sut.totalValue).toBe(15);
      });
    });

    describe("can set the augment increase value, whilst adjusting the value and keeping the total value the same", () => {
      it("works", () => {
        sut.setAugmentIncreaseValueAndKeepTotalValue(10);
        expect(sut.value).toBe(2);
        expect(sut.augmentIncreaseValue).toBe(10);
        expect(sut.totalValue).toBe(12);
      });

      it("falls back to the default behaviour if the total value cannot be kept the same", () => {
        sut.setAugmentIncreaseValueAndKeepTotalValue(15);
        expect(sut.value).toBe(5);
        expect(sut.augmentIncreaseValue).toBe(15);
        expect(sut.totalValue).toBe(20);
      });
    });
  });

  describe("Setting total value", () => {
    describe("(default behaviour) can set the total value, whilst adjusting the augment increase value and keeping the value the same", () => {
      it("works", () => {
        sut.setTotalValueAndAdjustAugmentIncreaseValue(10);
        expect(sut.value).toBe(5);
        expect(sut.augmentIncreaseValue).toBe(5);
        expect(sut.totalValue).toBe(10);
      });

      it("does nothing if the total value is lower than the value", () => {
        sut.setTotalValueAndAdjustAugmentIncreaseValue(1);
        expect(sut.value).toBe(5);
        expect(sut.augmentIncreaseValue).toBe(7);
        expect(sut.totalValue).toBe(12);
      });
    });

    describe("can set the total value, whilst adjusting the value and keeping the augment increase value the same", () => {
      it("works", () => {
        sut.setTotalValueAndAdjustValue(10);
        expect(sut.value).toBe(3);
        expect(sut.augmentIncreaseValue).toBe(7);
        expect(sut.totalValue).toBe(10);
      });

      it("does nothing if the total value is lower than the augment increase value", () => {
        sut.setTotalValueAndAdjustValue(1);
        expect(sut.value).toBe(5);
        expect(sut.augmentIncreaseValue).toBe(7);
        expect(sut.totalValue).toBe(12);
      });
    });
  });
});
