import { getHighestNumber, getItemWithHighestNumber } from "../number-utils";

describe("Number utils", () => {
  describe("getHighestNumber", () => {
    it("should return the highest number", () => {
      expect(getHighestNumber([1, 2, 3])).toBe(3);
      expect(getHighestNumber([3, 2, 1])).toBe(3);
      expect(getHighestNumber([1, 3, 2])).toBe(3);
      expect(getHighestNumber([2, 1, 3])).toBe(3);
      expect(getHighestNumber([2, 3, 1])).toBe(3);
      expect(getHighestNumber([3, 1, 2])).toBe(3);
    });
  });

  describe("getItemWithHighestNumber", () => {
    it("should return the item with the highest number", () => {
      const items = [
        { id: 1, name: "Item 1", value: 10 },
        { id: 2, name: "Item 2", value: 30 },
        { id: 3, name: "Item 3", value: 20 },
      ];

      expect(getItemWithHighestNumber(items, (item) => item.value)).toEqual({
        id: 2,
        name: "Item 2",
        value: 30,
      });
    });

    it("should return the last item with the highest number if there are multiple items with the highest number", () => {
      const items = [
        { id: 1, name: "Item 1", value: 10 },
        { id: 2, name: "Item 2", value: 30 },
        { id: 3, name: "Item 3", value: 30 },
      ];

      expect(getItemWithHighestNumber(items, (item) => item.value)).toEqual({
        id: 3,
        name: "Item 3",
        value: 30,
      });
    });

    it("should throw an error if the array is empty", () => {
      const items: { value: number }[] = [];

      expect(() =>
        getItemWithHighestNumber(items, (item) => item.value),
      ).toThrowError();
    });

    it("should return the only item if there is only one item in the array", () => {
      const items = [{ id: 1, name: "Item 1", value: 10 }];

      expect(getItemWithHighestNumber(items, (item) => item.value)).toEqual({
        id: 1,
        name: "Item 1",
        value: 10,
      });
    });
  });
});
