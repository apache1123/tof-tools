import type { Buff } from '../models/buff';
import type { Data } from '../models/data';

enum Id {
  ElementalResonance = 'Elemental Resonance',
  AlteredResonance = 'Altered Resonance',
  ElementalBalancing = 'Elemental Balancing',
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

export const weaponAttackBuffsLookup: Data<Id, Buff> = {
  allIds: [
    Id.ElementalResonance,
    Id.AlteredResonance,
    Id.ElementalBalancing,
    Id.Fiona,
    Id.Lin0To5Star,
    Id.Lin6Star,
    Id.LinFrostBonus,
    Id.Frigg0To5Star,
    Id.Frigg6Star,
    Id.Ruby,
    Id.Nemesis5Star,
    Id.Nemesis6Star,
  ],
  byId: {
    [Id.ElementalResonance]: {
      id: Id.ElementalResonance,
      displayName: Id.ElementalResonance,
      value: 0.15,
      description: 'Elemental resonance on most limited weapons',
    },
    [Id.AlteredResonance]: {
      id: Id.AlteredResonance,
      displayName: Id.AlteredResonance,
      value: 0.2,
      description: 'Fiona + another altered (e.g. Lin)',
    },
    [Id.ElementalBalancing]: {
      id: Id.ElementalBalancing,
      displayName: Id.ElementalBalancing,
      value: 0.15,
      description: '(Fenrir) 3 weapons of different elements',
    },
    [Id.Fiona]: {
      id: Id.Fiona,
      displayName: Id.Fiona,
      value: 0.15,
      description: '15% ATK for 30s on discharge',
    },
    [Id.Lin0To5Star]: {
      id: Id.Lin0To5Star,
      displayName: Id.Lin0To5Star,
      value: 0.15,
      description: 'Moonlight Realm gives 15% ATK for its duration',
    },
    [Id.Lin6Star]: {
      id: Id.Lin6Star,
      displayName: Id.Lin6Star,
      value: 0.23,
      description: 'Gives 23% ATK in total.',
    },
    [Id.LinFrostBonus]: {
      id: Id.LinFrostBonus,
      displayName: Id.LinFrostBonus,
      value: 0.1,
      description: 'Frost Moonlight Realm gives 10% additional ATK',
    },
    [Id.Frigg0To5Star]: {
      id: Id.Frigg0To5Star,
      displayName: Id.Frigg0To5Star,
      value: 0.15,
      description: 'Frost Domain is up 25/30 seconds',
    },
    [Id.Frigg6Star]: {
      id: Id.Frigg6Star,
      displayName: Id.Frigg6Star,
      value: 0.4,
      description: 'Gives 40% ATK in total.',
    },
    [Id.Ruby]: {
      id: Id.Ruby,
      displayName: Id.Ruby,
      value: 0.1,
      description: 'Ultimate Heat gives 10% ATK after fully stacked',
    },
    [Id.Nemesis5Star]: {
      id: Id.Nemesis5Star,
      displayName: Id.Nemesis5Star,
      value: 0.1,
      description: '10% ATK for having 1 electrode out',
    },
    [Id.Nemesis6Star]: {
      id: Id.Nemesis6Star,
      displayName: Id.Nemesis6Star,
      value: 0.15,
      description: '15% ATK for having 2 electrodes out',
    },
  },
};
