import { sortAlphabetically } from "../../utils/locale-utils";
import { keysOf } from "../../utils/object-utils";
import { simulacrumIds } from "../simulacra/simulacrum-id";
import { mapToFullBuffAbilityDefinition } from "../types/buff/partial-buff-ability-definition";
import type { PartialWeaponDefinition } from "../types/weapon/partial-weapon-definition";
import type { WeaponBuffAbilityDefinition } from "../types/weapon/weapon-buff-ability-definition";
import type { WeaponDefinition } from "../types/weapon/weapon-definition";
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
import { helene } from "./definitions/helene";
import { hipper } from "./definitions/hipper";
import { huma } from "./definitions/huma";
import { icarus } from "./definitions/icarus";
import { jiYu } from "./definitions/ji-yu";
import { king } from "./definitions/king";
import { lan } from "./definitions/lan";
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
import { nemesisVoidpiercerAltered } from "./definitions/nemesis-voidpiercer-altered";
import { nemesisVoidpiercerBase } from "./definitions/nemesis-voidpiercer-base";
import { nemesisVoidpiercerFlamePhysical } from "./definitions/nemesis-voidpiercer-flame-physical";
import { nemesisVoidpiercerFrostVolt } from "./definitions/nemesis-voidpiercer-frost-volt";
import { nemesisVoidpiercerPhysicalFlame } from "./definitions/nemesis-voidpiercer-physical-flame";
import { nemesisVoidpiercerVoltFrost } from "./definitions/nemesis-voidpiercer-volt-frost";
import { nolaAltered } from "./definitions/nola-altered";
import { nolaBase } from "./definitions/nola-base";
import { nolaFlamePhysical } from "./definitions/nola-flame-physical";
import { nolaFrostVolt } from "./definitions/nola-frost-volt";
import { nolaPhysicalFlame } from "./definitions/nola-physical-flame";
import { nolaVoltFrost } from "./definitions/nola-volt-frost";
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
import { veronika } from "./definitions/veronika";
import { yanMiao } from "./definitions/yan-miao";
import { yanuo } from "./definitions/yanuo";
import { yuLan } from "./definitions/yu-lan";
import { zero } from "./definitions/zero";

const weaponDefinitionIds = [
  ...simulacrumIds,
  "Nemesis Voidpiercer (Altered)",
  "Nemesis Voidpiercer (Flame-Physical)",
  "Nemesis Voidpiercer (Frost-Volt)",
  "Nemesis Voidpiercer (Physical-Flame)",
  "Nemesis Voidpiercer (Volt-Frost)",
  "Nola (Altered)",
  "Nola (Flame-Physical)",
  "Nola (Frost-Volt)",
  "Nola (Physical-Flame)",
  "Nola (Volt-Frost)",
] as const;

export type WeaponDefinitionId = (typeof weaponDefinitionIds)[number];

// Hard-coded defined weapon definitions. Partial for ease-of-input
const partialWeaponDefinitions: Record<
  WeaponDefinitionId,
  PartialWeaponDefinition
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
  Helene: helene,
  Hipper: hipper,
  "Huang (Mimi)": mimi,
  Huma: huma,
  Icarus: icarus,
  "Ji Yu": jiYu,
  King: king,
  Lan: lan,
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
  "Nemesis Voidpiercer": nemesisVoidpiercerBase,
  "Nemesis Voidpiercer (Altered)": nemesisVoidpiercerAltered,
  "Nemesis Voidpiercer (Flame-Physical)": nemesisVoidpiercerFlamePhysical,
  "Nemesis Voidpiercer (Frost-Volt)": nemesisVoidpiercerFrostVolt,
  "Nemesis Voidpiercer (Physical-Flame)": nemesisVoidpiercerPhysicalFlame,
  "Nemesis Voidpiercer (Volt-Frost)": nemesisVoidpiercerVoltFrost,
  Nola: nolaBase,
  "Nola (Altered)": nolaAltered,
  "Nola (Flame-Physical)": nolaFlamePhysical,
  "Nola (Frost-Volt)": nolaFrostVolt,
  "Nola (Physical-Flame)": nolaPhysicalFlame,
  "Nola (Volt-Frost)": nolaVoltFrost,
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
  Veronika: veronika,
  "Yan Miao": yanMiao,
  Yanuo: yanuo,
  "Yu Lan": yuLan,
  Zero: zero,
};

// Map full weapon definitions by using the partial definitions and defaults
const fullWeaponDefinitions: Partial<
  Record<WeaponDefinitionId, WeaponDefinition>
> = {};
keysOf(partialWeaponDefinitions).forEach((id) => {
  const partialDefinition = partialWeaponDefinitions[id];

  fullWeaponDefinitions[id] = {
    ...partialDefinition,
    buffs: partialDefinition.buffs.map(
      (ability): WeaponBuffAbilityDefinition => ({
        ...mapToFullBuffAbilityDefinition(ability, "weapon"),
        starRequirement: ability.starRequirement,
      }),
    ),
  };
});

export function getWeaponDefinition(id: WeaponDefinitionId): WeaponDefinition {
  const weaponDefinition = fullWeaponDefinitions[id];
  if (!weaponDefinition) throw new Error(`Cannot find weapon definition ${id}`);
  return weaponDefinition;
}

export function getAllWeaponDefinitions() {
  return weaponDefinitionIds
    .toSorted(sortAlphabetically) // This may need to sort by displayName instead if localization is ever added
    .map((id) => getWeaponDefinition(id));
}
