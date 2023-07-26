import type { Buff } from '../models/buff';
import type { Data } from '../models/data';

// Weapon buffs that aren't always active and require some sort of action to trigger i.e. are not included in the character sheet atk stat naturally
enum ActiveWeaponAttackBuffId {
  Fiona = 'Fiona',
  Lin0To5Star = 'Lin 0* - 5*',
  Lin6Star = 'Lin 6*',
  LinFrostBonus = 'Lin Frost Bonus',
  Frigg0To5Star = 'Frigg 0* - 5*',
  Frigg6Star = 'Frigg 6*',
  Ruby = 'Ruby',
  Nemesis5Star = 'Nemesis 5*',
  Nemesis6Star = 'Nemesis 6*',
}

export const activeWeaponAttackBuffsLookup: Data<
  ActiveWeaponAttackBuffId,
  Buff
> = {
  allIds: [
    ActiveWeaponAttackBuffId.Fiona,
    ActiveWeaponAttackBuffId.Lin0To5Star,
    ActiveWeaponAttackBuffId.Lin6Star,
    ActiveWeaponAttackBuffId.LinFrostBonus,
    ActiveWeaponAttackBuffId.Frigg0To5Star,
    ActiveWeaponAttackBuffId.Frigg6Star,
    ActiveWeaponAttackBuffId.Ruby,
    ActiveWeaponAttackBuffId.Nemesis5Star,
    ActiveWeaponAttackBuffId.Nemesis6Star,
  ],
  byId: {
    [ActiveWeaponAttackBuffId.Fiona]: {
      id: ActiveWeaponAttackBuffId.Fiona,
      displayName: ActiveWeaponAttackBuffId.Fiona,
      value: 0.15,
      description: '15% ATK for 30s on discharge',
    },
    [ActiveWeaponAttackBuffId.Lin0To5Star]: {
      id: ActiveWeaponAttackBuffId.Lin0To5Star,
      displayName: ActiveWeaponAttackBuffId.Lin0To5Star,
      value: 0.15,
      description: 'Moonlight Realm gives 15% ATK for its duration',
    },
    [ActiveWeaponAttackBuffId.Lin6Star]: {
      id: ActiveWeaponAttackBuffId.Lin6Star,
      displayName: ActiveWeaponAttackBuffId.Lin6Star,
      value: 0.23,
      description: 'Moonlight Realm gives 23% ATK for its duration',
    },
    [ActiveWeaponAttackBuffId.LinFrostBonus]: {
      id: ActiveWeaponAttackBuffId.LinFrostBonus,
      displayName: ActiveWeaponAttackBuffId.LinFrostBonus,
      value: 0.1,
      description: 'Frost Moonlight Realm gives 10% additional ATK',
    },
    [ActiveWeaponAttackBuffId.Frigg0To5Star]: {
      id: ActiveWeaponAttackBuffId.Frigg0To5Star,
      displayName: ActiveWeaponAttackBuffId.Frigg0To5Star,
      value: 0.15,
      description: 'Frost Domain is up 25/30 seconds',
    },
    [ActiveWeaponAttackBuffId.Frigg6Star]: {
      id: ActiveWeaponAttackBuffId.Frigg6Star,
      displayName: ActiveWeaponAttackBuffId.Frigg6Star,
      value: 0.4,
      description: 'Frost Domain gives 40% ATK total',
    },
    [ActiveWeaponAttackBuffId.Ruby]: {
      id: ActiveWeaponAttackBuffId.Ruby,
      displayName: ActiveWeaponAttackBuffId.Ruby,
      value: 0.1,
      description: 'Ultimate Heat gives 10% ATK after fully stacked',
    },
    [ActiveWeaponAttackBuffId.Nemesis5Star]: {
      id: ActiveWeaponAttackBuffId.Nemesis5Star,
      displayName: ActiveWeaponAttackBuffId.Nemesis5Star,
      value: 0.1,
      description: '10% ATK for having 1 electrode out',
    },
    [ActiveWeaponAttackBuffId.Nemesis6Star]: {
      id: ActiveWeaponAttackBuffId.Nemesis6Star,
      displayName: ActiveWeaponAttackBuffId.Nemesis6Star,
      value: 0.15,
      description: '15% ATK for having 2 electrodes out',
    },
  },
};

// Weapon buffs that are always active in the background or current weapon i.e. are included on the character sheet atk stat
enum PassiveWeaponAttackBuffId {
  ElementalResonance = 'Elemental Resonance',
  AlteredResonance = 'Altered Resonance',
  ElementalBalancing = 'Elemental Balancing',
}

export const passiveWeaponAttackBuffsLookup: Data<
  PassiveWeaponAttackBuffId,
  Buff
> = {
  allIds: [
    PassiveWeaponAttackBuffId.ElementalResonance,
    PassiveWeaponAttackBuffId.AlteredResonance,
    PassiveWeaponAttackBuffId.ElementalBalancing,
  ],
  byId: {
    [PassiveWeaponAttackBuffId.ElementalResonance]: {
      id: PassiveWeaponAttackBuffId.ElementalResonance,
      displayName: PassiveWeaponAttackBuffId.ElementalResonance,
      value: 0.15,
      description: 'Elemental resonance on most limited weapons',
    },
    [PassiveWeaponAttackBuffId.AlteredResonance]: {
      id: PassiveWeaponAttackBuffId.AlteredResonance,
      displayName: PassiveWeaponAttackBuffId.AlteredResonance,
      value: 0.2,
      description: 'Fiona + another altered (e.g. Lin)',
    },
    [PassiveWeaponAttackBuffId.ElementalBalancing]: {
      id: PassiveWeaponAttackBuffId.ElementalBalancing,
      displayName: PassiveWeaponAttackBuffId.ElementalBalancing,
      value: 0.15,
      description: '(Fenrir) 3 weapons of different elements',
    },
  },
};
