import type { Data } from "../../models/data";
import type {
  SimulacrumTrait,
  SimulacrumTraitId,
} from "../../models/simulacrum-trait";
import { keysOf } from "../../utils/object-utils";
import type { BuffAbilityDefinition } from "../types/buff/buff-ability-definition";
import { mapToFullBuffAbilityDefinition } from "../types/buff/partial-buff-ability-definition";
import type { PartialSimulacrumTrait } from "../types/simulacrum/partial-simulacrum-trait";
import { alyss } from "./definitions/alyss";
import { anka } from "./definitions/anka";
import { annabella } from "./definitions/annabella";
import { antoria } from "./definitions/antoria";
import { asuka } from "./definitions/asuka";
import { asurada } from "./definitions/asurada";
import { brevey } from "./definitions/brevey";
import { carrot } from "./definitions/carrot";
import { claudia } from "./definitions/claudia";
import { claudiaStormEye } from "./definitions/claudia-storm-eye";
import { cobaltB } from "./definitions/cobalt-b";
import { cocoritter } from "./definitions/cocoritter";
import { crow } from "./definitions/crow";
import { feiSe } from "./definitions/fei-se";
import { fenrir } from "./definitions/fenrir";
import { fiona } from "./definitions/fiona";
import { frigg } from "./definitions/frigg";
import { gnonno } from "./definitions/gnonno";
import { grayFox } from "./definitions/gray-fox";
import { huma } from "./definitions/huma";
import { icarus } from "./definitions/icarus";
import { jiYu } from "./definitions/ji-yu";
import { king } from "./definitions/king";
import { lan } from "./definitions/lan";
import { lin } from "./definitions/lin";
import { lingHan } from "./definitions/ling-han";
import { liuHuo } from "./definitions/liu-huo";
import { lyncis } from "./definitions/lyncis";
import { lyra } from "./definitions/lyra";
import { meryl } from "./definitions/meryl";
import { merylIronheart } from "./definitions/meryl-ironheart";
import { mimi } from "./definitions/mimi";
import { mingJing } from "./definitions/ming-jing";
import { nanYin } from "./definitions/nan-yin";
import { nemesis } from "./definitions/nemesis";
import { nemesisVoidpiercer } from "./definitions/nemesis-voidpiercer";
import { nola } from "./definitions/nola";
import { plotti } from "./definitions/plotti";
import { rei } from "./definitions/rei";
import { roslyn } from "./definitions/roslyn";
import { rubilia } from "./definitions/rubilia";
import { ruby } from "./definitions/ruby";
import { sakiFuwa } from "./definitions/saki-fuwa";
import { samir } from "./definitions/samir";
import { shiro } from "./definitions/shiro";
import { tianLang } from "./definitions/tian-lang";
import { tsubasa } from "./definitions/tsubasa";
import { umi } from "./definitions/umi";
import { yanMiao } from "./definitions/yan-miao";
import { yanuo } from "./definitions/yanuo";
import { yuLan } from "./definitions/yu-lan";
import { zero } from "./definitions/zero";

// Hard-coded defined simulacrum trait definitions. Partial for ease-of-input
const partialSimulacrumTraits: Data<SimulacrumTraitId, PartialSimulacrumTrait> =
  {
    allIds: [
      "Alyss",
      "Anka",
      "Annabella",
      "Asuka",
      "Asurada",
      "Brevey",
      "Carrot",
      "Claudia",
      "Claudia Storm Eye",
      "Cobalt-B",
      "Cocoritter",
      "Crow",
      "Fei Se",
      "Fenrir",
      "Fiona",
      "Frigg",
      "Gnonno",
      "Gray Fox",
      "Huang (Mimi)",
      "Huma",
      "Icarus",
      "King",
      "Lan",
      "Lin",
      "Ling Han",
      "Liu Huo",
      "Lyncis",
      "Lyra",
      "Meryl",
      "Meryl Ironheart",
      "Ming Jing",
      "Nan Yin",
      "Nemesis",
      "Nemesis Voidpiercer",
      "Nola",
      "Plotti",
      "Rei",
      "Roslyn",
      "Rubilia",
      "Ruby",
      "Saki Fuwa",
      "Samir",
      "Shiro",
      "Tian Lang",
      "Tsubasa",
      "Umi",
      "Yan Miao",
      "Yanuo",
      "Yu Lan",
      "Zero",
    ],
    byId: {
      Alyss: alyss,
      Anka: anka,
      Annabella: annabella,
      Antoria: antoria,
      Asuka: asuka,
      Asurada: asurada,
      Brevey: brevey,
      Carrot: carrot,
      Claudia: claudia,
      "Claudia Storm Eye": claudiaStormEye,
      "Cobalt-B": cobaltB,
      Cocoritter: cocoritter,
      Crow: crow,
      "Fei Se": feiSe,
      Fenrir: fenrir,
      Fiona: fiona,
      Frigg: frigg,
      Gnonno: gnonno,
      "Gray Fox": grayFox,
      "Huang (Mimi)": mimi,
      Huma: huma,
      Icarus: icarus,
      "Ji Yu": jiYu,
      King: king,
      Lan: lan,
      Lin: lin,
      "Ling Han": lingHan,
      "Liu Huo": liuHuo,
      Lyncis: lyncis,
      Lyra: lyra,
      Meryl: meryl,
      "Meryl Ironheart": merylIronheart,
      "Ming Jing": mingJing,
      "Nan Yin": nanYin,
      Nemesis: nemesis,
      "Nemesis Voidpiercer": nemesisVoidpiercer,
      Nola: nola,
      Plotti: plotti,
      Rei: rei,
      Roslyn: roslyn,
      Rubilia: rubilia,
      Ruby: ruby,
      "Saki Fuwa": sakiFuwa,
      Samir: samir,
      Shiro: shiro,
      "Tian Lang": tianLang,
      Tsubasa: tsubasa,
      Umi: umi,
      "Yan Miao": yanMiao,
      Yanuo: yanuo,
      "Yu Lan": yuLan,
      Zero: zero,
    },
  };

// Map full simulacrum traits by using the partial definitions and defaults
const fullSimulacrumTraits: Partial<
  Record<SimulacrumTraitId, SimulacrumTrait>
> = {};
keysOf(partialSimulacrumTraits.byId).forEach((id) => {
  const partialDefinition = partialSimulacrumTraits.byId[id];

  fullSimulacrumTraits[id] = {
    ...partialDefinition,
    buffs: partialDefinition.buffs.map(
      (ability): BuffAbilityDefinition =>
        mapToFullBuffAbilityDefinition(ability, "simulacrum-trait"),
    ),
  };
});

export function getSimulacrumTrait(id: SimulacrumTraitId): SimulacrumTrait {
  const simulacrumTrait = fullSimulacrumTraits[id];
  if (!simulacrumTrait) throw new Error(`Cannot find simulacrum trait ${id}`);
  return simulacrumTrait;
}

export function getAllSimulacrumTraits() {
  return partialSimulacrumTraits.allIds.map((id) => getSimulacrumTrait(id));
}
