import { maxNumOfAugmentStats } from "../../../../definitions/gear";
import { getStatType } from "../../../../definitions/stat-types";
import type { StatType } from "../../stat-type";
import { getStatsFromAugmentScreenOcr } from "../get-stats-from-augment-screen-ocr";
import type { OcrStatResult } from "../ocr-stat-result";

// These are the same as the screenshots in example-images/gear/ocr
const cases = [
  {
    text: `-| Augmentation Stats\n. FY Flame Attack\ni $027\n5 BR Frost Attack\n+306\nRare stat locked\n`,
    possibleStatTypes: [
      getStatType("Flame Attack"),
      getStatType("Frost Attack"),
    ],
    result: [
      { statType: getStatType("Flame Attack"), value: 27 },
      { statType: getStatType("Frost Attack"), value: 306 },
    ],
  },
  {
    text: `‘| Augmentation Stats\n. RB Frost Attack\n\n! +1096\n\n5 4 Volt Attack\n\nC +1066\n\nHM Rare stat locked\n`,
    possibleStatTypes: [
      getStatType("Frost Attack"),
      getStatType("Volt Attack"),
    ],
    result: [
      { statType: getStatType("Frost Attack"), value: 1096 },
      { statType: getStatType("Volt Attack"), value: 1066 },
    ],
  },
  {
    text: `| Augmentation Stats\n\n3 Frost Resistance\n\ng 0) Flame Resistance\n\n: Weak Point Damage Boost\n\n| 3k ©)\n`,
    possibleStatTypes: [
      getStatType("Flame Resistance"),
      getStatType("Frost Resistance"),
      getStatType("Volt Resistance"),
    ],
    result: [
      { statType: getStatType("Frost Resistance"), value: undefined },
      { statType: getStatType("Flame Resistance"), value: 3 },
    ],
  },
  {
    text: `Augmentation Stats\n) Pa Physical Attack\n: +7. 172%\nBR Frost Attack\n+7 A411%\npA Normal Attack Damage Boost] ©)\n*\n`,
    possibleStatTypes: [
      getStatType("Physical Attack %"),
      getStatType("Frost Attack %"),
    ],
    result: [
      { statType: getStatType("Physical Attack %"), value: 0.07172 },
      { statType: getStatType("Frost Attack %"), value: 74.11 },
    ],
  },
] as const satisfies {
  text: string;
  possibleStatTypes: StatType[];
  result: OcrStatResult[];
}[];

describe("Get stats from Augment Screen", () => {
  it.each(cases)(
    "returns the correct result. Case $#",
    ({ text, possibleStatTypes, result }) => {
      expect(
        getStatsFromAugmentScreenOcr(
          text,
          maxNumOfAugmentStats,
          possibleStatTypes,
        ),
      ).toEqual(result);
    },
  );
});
