import { getStatType } from "../../../definitions/stat-types";
import { RandomStat } from "../random-stat";

let sut: RandomStat;

describe("Random stat", () => {
  beforeEach(() => {
    sut = new RandomStat(getStatType("Physical Attack"));
    sut.setValue(100);
    sut.setAugmentIncreaseValue(25);
    // Total value is 125
    // Minimum value is 69
  });

  describe("Setting value", () => {
    describe("(default behaviour) can set the value", () => {
      it("works", () => {
        sut.setValue(110);
        expect(sut.value).toBe(110);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(135);
      });

      it("does nothing if the value being set is lower than minValue", () => {
        sut.setValue(50);
        expect(sut.value).toBe(100);
      });
    });

    describe("can set the value, whilst making the best effort to keep the total value the same (adjusts the augment increase value)", () => {
      it("works", () => {
        sut.setValueTryKeepTotalValue(110);
        expect(sut.value).toBe(110);
        expect(sut.augmentIncreaseValue).toBe(15);
        expect(sut.totalValue).toBe(125);
      });

      it("falls back to the default behaviour if the total value cannot be kept the same", () => {
        sut.setValueTryKeepTotalValue(150);
        expect(sut.value).toBe(150);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(175);
      });

      it("does nothing if the value being set is lower than minValue", () => {
        sut.setValueTryKeepTotalValue(50);
        expect(sut.value).toBe(100);
      });
    });
  });

  describe("Setting augment value", () => {
    describe("(default behaviour) can set the augment value", () => {
      it("works", () => {
        sut.setAugmentIncreaseValue(30);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(30);
        expect(sut.totalValue).toBe(130);
      });

      it("does nothing if the value being set is less than 0", () => {
        sut.setAugmentIncreaseValue(-10);
        expect(sut.augmentIncreaseValue).toBe(25);
      });
    });

    describe("can set the augment increase value whilst making the best effort to keep the total value the same (adjusts the value)", () => {
      it("works", () => {
        sut.setAugmentIncreaseValueTryKeepTotalValue(30);
        expect(sut.value).toBe(95);
        expect(sut.augmentIncreaseValue).toBe(30);
        expect(sut.totalValue).toBe(125);
      });

      it("falls back to the default behaviour if the total value cannot be kept the same (the value being set is higher than the total)", () => {
        sut.setAugmentIncreaseValueTryKeepTotalValue(150);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(150);
        expect(sut.totalValue).toBe(250);
      });

      it("falls back to the default behaviour if the total value cannot be kept the same (the resulting (base) value will be less than the minimum allowed value)", () => {
        sut.setAugmentIncreaseValueTryKeepTotalValue(110);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(110);
        expect(sut.totalValue).toBe(210);
      });

      it("does nothing if the augment increase value being set is less than 0", () => {
        sut.setAugmentIncreaseValueTryKeepTotalValue(-10);
        expect(sut.augmentIncreaseValue).toBe(25);
      });
    });
  });

  describe("Setting total value", () => {
    describe("(default behaviour) can set the total value whilst making the best effort to keep the value the same (adjusts the augment increase value)", () => {
      it("works", () => {
        sut.setTotalValueTryKeepValue(140);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(40);
        expect(sut.totalValue).toBe(140);
      });

      it("will fallback to adjusting the value, if in trying to keep the value the same it will cause the augment increase value to fall below 0. The augment increase value in this case will also be set to 0", () => {
        sut.setTotalValueTryKeepValue(80);
        expect(sut.value).toBe(80);
        expect(sut.augmentIncreaseValue).toBe(0);
        expect(sut.totalValue).toBe(80);
      });

      it("does nothing if the total value is lower than the  minimum value", () => {
        sut.setTotalValueTryKeepValue(50);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(125);
      });
    });

    describe("can set the total value whilst making the best effort to keep the augment increase value the same (adjusts the value)", () => {
      it("works", () => {
        sut.setTotalValueTryKeepAugmentIncreaseValue(140);
        expect(sut.value).toBe(115);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(140);
      });

      it("will fallback to try and keep the value the same instead, if in trying to keep the augment increase value the same it will cause the value to fall below the minimum allowed value", () => {
        sut.setAugmentIncreaseValue(150); // 100 + 150 = 250

        sut.setTotalValueTryKeepAugmentIncreaseValue(200); // Trying to keep augmentIncrease at 150, will cause value to be 50 which is below min. Try to keep value the same instead (adjust augmentIncrease)

        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(100);
        expect(sut.totalValue).toBe(200);
      });

      it("will fallback to try and keep the value the same instead, if in trying to keep the augment increase value the same it will cause the value to fall below the minimum allowed value. If then the value also cannot be kept the same, it will also be adjusted.", () => {
        sut.setAugmentIncreaseValue(150); // 100 + 25 = 125

        sut.setTotalValueTryKeepAugmentIncreaseValue(80); // Trying to keep augmentIncrease at 25, will cause value to be 55 which is below min. Try to keep value the same instead, but the value cannot be kept the same either because 80 < 100. Adjust value instead.

        expect(sut.value).toBe(80);
        expect(sut.augmentIncreaseValue).toBe(0);
        expect(sut.totalValue).toBe(80);
      });

      it("does nothing if the total value is lower than the minimum value", () => {
        sut.setTotalValueTryKeepAugmentIncreaseValue(50);
        expect(sut.value).toBe(100);
        expect(sut.augmentIncreaseValue).toBe(25);
        expect(sut.totalValue).toBe(125);
      });
    });
  });
});
