import { sortAlphabetically } from "../../utils/locale-utils";
import { keysOf } from "../../utils/object-utils";
import { simulacrumIds } from "../simulacra/simulacrum-id";
import { mapToFullBuffAbilityDefinition } from "../types/buff/partial-buff-ability-definition";
import type { MatrixBuffAbilityDefinition } from "../types/matrix/matrix-buff-ability-definition";
import type { MatrixDefinition } from "../types/matrix/matrix-definition";
import type { PartialMatrixDefinition } from "../types/matrix/partial-matrix-definition";
import { alyss } from "./definitions/alyss";
import { anka } from "./definitions/anka";
import { annabella } from "./definitions/annabella";
import { antoria } from "./definitions/antoria";
import { aster } from "./definitions/aster";
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
import { haboela } from "./definitions/haboela";
import { helene } from "./definitions/helene";
import { hipper } from "./definitions/hipper";
import { huma } from "./definitions/huma";
import { icarus } from "./definitions/icarus";
import { jiYu } from "./definitions/ji-yu";
import { king } from "./definitions/king";
import { lan } from "./definitions/lan";
import { lana } from "./definitions/lana";
import { lechesis } from "./definitions/lechesis";
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
import { nanto } from "./definitions/nanto";
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
import { scylla } from "./definitions/scylla";
import { shiro } from "./definitions/shiro";
import { tianLang } from "./definitions/tian-lang";
import { tsubasa } from "./definitions/tsubasa";
import { umi } from "./definitions/umi";
import { veronika } from "./definitions/veronika";
import { yanMiao } from "./definitions/yan-miao";
import { yanuo } from "./definitions/yanuo";
import { yuLan } from "./definitions/yu-lan";
import { zero } from "./definitions/zero";

const matrixDefinitionIds = [...simulacrumIds, "Haboela", "Scylla"] as const;

export type MatrixDefinitionId = (typeof matrixDefinitionIds)[number];

// Hard-coded defined matrix definitions. Partial for ease-of-input
const partialMatrixDefinitions: Record<
  MatrixDefinitionId,
  PartialMatrixDefinition
> = {
  Alyss: alyss,
  Anka: anka,
  Annabella: annabella,
  Antoria: antoria,
  Aster: aster,
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
  Haboela: haboela,
  Helene: helene,
  Hipper: hipper,
  "Huang (Mimi)": mimi,
  Huma: huma,
  Icarus: icarus,
  "Ji Yu": jiYu,
  King: king,
  Lan: lan,
  Lana: lana,
  Lechesis: lechesis,
  Lin: lin,
  "Ling Han": lingHan,
  "Liu Huo": liuHuo,
  Lyncis: lyncis,
  Lyra: lyra,
  Meryl: meryl,
  "Meryl Ironheart": merylIronheart,
  "Ming Jing": mingJing,
  "Nan Yin": nanYin,
  Nanto: nanto,
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
  Scylla: scylla,
  Shiro: shiro,
  "Tian Lang": tianLang,
  Tsubasa: tsubasa,
  Umi: umi,
  Veronika: veronika,
  "Yan Miao": yanMiao,
  Yanuo: yanuo,
  "Yu Lan": yuLan,
  Zero: zero,
};

// Map full matrix definitions by using the partial definitions and defaults
const fullMatrixDefinitions: Partial<
  Record<MatrixDefinitionId, MatrixDefinition>
> = {};
keysOf(partialMatrixDefinitions).forEach((id) => {
  const partialDefinition = partialMatrixDefinitions[id];

  fullMatrixDefinitions[id] = {
    ...partialDefinition,
    buffs: partialDefinition.buffs.map(
      (ability): MatrixBuffAbilityDefinition => ({
        ...mapToFullBuffAbilityDefinition(ability, "matrix"),
        starRequirement: ability.starRequirement,
        minMatrixPieces: ability.minMatrixPieces,
      }),
    ),
  };
});

export function getMatrixDefinition(id: MatrixDefinitionId): MatrixDefinition {
  const matrixDefinition = fullMatrixDefinitions[id];
  if (!matrixDefinition) throw new Error(`Cannot find matrix definition ${id}`);
  return matrixDefinition;
}

export function getAllMatrixDefinitions() {
  return matrixDefinitionIds
    .toSorted(sortAlphabetically) // This may need to sort by displayName instead if localization is ever added
    .map((id) => getMatrixDefinition(id));
}
