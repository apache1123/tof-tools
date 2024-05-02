import type { Data } from '../../models/data';
import type { WeaponDefinition } from '../../models/weapon-definition';
import { alyss } from './definitions/alyss';
import { annabella } from './definitions/annabella';
import { asuka } from './definitions/asuka';
import { brevey } from './definitions/brevey';
import { claudia } from './definitions/claudia';
import { cobaltB } from './definitions/cobalt-b';
import { cocoritter } from './definitions/cocoritter';
import { crow } from './definitions/crow';
import { feiSe } from './definitions/fei-se';
import { fenrir } from './definitions/fenrir';
import { fiona } from './definitions/fiona';
import { frigg } from './definitions/frigg';
import { gnonno } from './definitions/gnonno';
import { huma } from './definitions/huma';
import { icarus } from './definitions/icarus';
import { king } from './definitions/king';
import { lan } from './definitions/lan';
import { lin } from './definitions/lin';
import { lingHan } from './definitions/ling-han';
import { liuHuo } from './definitions/liu-huo';
import { lyra } from './definitions/lyra';
import { meryl } from './definitions/meryl';
import { mimi } from './definitions/mimi';
import { mingJing } from './definitions/ming-jing';
import { nanYin } from './definitions/nan-yin';
import { nemesis } from './definitions/nemesis';
import { plotti } from './definitions/plotti';
import { rei } from './definitions/rei';
import { rubilia } from './definitions/rubilia';
import { ruby } from './definitions/ruby';
import { sakiFuwa } from './definitions/saki-fuwa';
import { samir } from './definitions/samir';
import { shiro } from './definitions/shiro';
import { tianLang } from './definitions/tian-lang';
import { tsubasa } from './definitions/tsubasa';
import { umi } from './definitions/umi';
import { yanMiao } from './definitions/yan-miao';
import { yanuo } from './definitions/yanuo';
import { yuLan } from './definitions/yu-lan';
import { zero } from './definitions/zero';

export type WeaponName =
  | 'Alyss'
  | 'Annabella'
  | 'Asuka'
  | 'Brevey'
  | 'Claudia'
  | 'Cobalt-B'
  | 'Cocoritter'
  | 'Crow'
  | 'Fei Se'
  | 'Fenrir'
  | 'Fiona'
  | 'Frigg'
  | 'Gnonno'
  | 'Huang (Mimi)'
  | 'Huma'
  | 'Icarus'
  | 'King'
  | 'Lan'
  | 'Lin'
  | 'Ling Han'
  | 'Liu Huo'
  | 'Lyra'
  | 'Meryl'
  | 'Ming Jing'
  | 'Nan Yin'
  | 'Nemesis'
  | 'Plotti'
  | 'Rei'
  | 'Rubilia'
  | 'Ruby'
  | 'Saki Fuwa'
  | 'Samir'
  | 'Shiro'
  | 'Tian Lang'
  | 'Tsubasa'
  | 'Umi'
  | 'Yan Miao'
  | 'Yanuo'
  | 'Yu Lan'
  | 'Zero';

export const weaponDefinitions: Data<WeaponName, WeaponDefinition> = {
  allIds: [
    'Alyss',
    'Annabella',
    'Asuka',
    'Brevey',
    'Claudia',
    'Cobalt-B',
    'Cocoritter',
    'Crow',
    'Fei Se',
    'Fenrir',
    'Fiona',
    'Frigg',
    'Gnonno',
    'Huang (Mimi)',
    'Huma',
    'Icarus',
    'King',
    'Lan',
    'Lin',
    'Ling Han',
    'Liu Huo',
    'Lyra',
    'Meryl',
    'Ming Jing',
    'Nan Yin',
    'Nemesis',
    'Plotti',
    'Rei',
    'Rubilia',
    'Ruby',
    'Saki Fuwa',
    'Samir',
    'Shiro',
    'Tian Lang',
    'Tsubasa',
    'Umi',
    'Yan Miao',
    'Yanuo',
    'Yu Lan',
    'Zero',
  ],
  byId: {
    Alyss: alyss,
    Annabella: annabella,
    Asuka: asuka,
    Brevey: brevey,
    Claudia: claudia,
    'Cobalt-B': cobaltB,
    Cocoritter: cocoritter,
    Crow: crow,
    'Fei Se': feiSe,
    Fenrir: fenrir,
    Fiona: fiona,
    Frigg: frigg,
    Gnonno: gnonno,
    'Huang (Mimi)': mimi,
    Huma: huma,
    Icarus: icarus,
    King: king,
    Lan: lan,
    Lin: lin,
    'Ling Han': lingHan,
    'Liu Huo': liuHuo,
    Lyra: lyra,
    Meryl: meryl,
    'Ming Jing': mingJing,
    'Nan Yin': nanYin,
    Nemesis: nemesis,
    Plotti: plotti,
    Rei: rei,
    Rubilia: rubilia,
    Ruby: ruby,
    'Saki Fuwa': sakiFuwa,
    Samir: samir,
    Shiro: shiro,
    'Tian Lang': tianLang,
    Tsubasa: tsubasa,
    Umi: umi,
    'Yan Miao': yanMiao,
    Yanuo: yanuo,
    'Yu Lan': yuLan,
    Zero: zero,
  },
};
