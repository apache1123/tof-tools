// import { statTypesLookup } from '../../constants/stat-types';
// import { weaponDefinitions } from '../../constants/weapon-definitions';
// import type { AttackDefinition } from '../v4/attack-definition';
// import { CombatSimulator } from '../combat-simulator';
// import { DamageCalculator } from '../damage-calculator';
// import { ElementalAttack } from '../elemental-attack';
// import { GearSet } from '../gear-set';
// import { Loadout } from '../loadout';
// import { RandomStat } from '../random-stat';
// import { Relics } from '../relics';
// import { Team } from '../team';
// import { Weapon } from '../weapon';

// describe('DamageCalculator', () => {
//   it('calculates the damage of a simple single attack correctly', () => {
//     // Arrange
//     const loadout = new Loadout('loadout', 'Frost', new Team(), new GearSet(), {
//       characterLevel: 100,
//     });

//     const { loadoutStats } = loadout;
//     loadoutStats.frostAttack = new ElementalAttack(26777, 0);
//     loadoutStats.critFlat = 12452;

//     const weapon = new Weapon(weaponDefinitions.byId['Tsubasa']);
//     loadout.team.weapon1 = weapon;

//     const combatSimulator = new CombatSimulator(loadout, new Relics());
//     const sut = new DamageCalculator(combatSimulator);

//     // Act
//     const attackDefinition = weaponDefinitions.byId['Tsubasa'].attacks?.find(
//       (attack) => attack.id == 'Tsubasa - Auto chain'
//     ) as AttackDefinition;
//     combatSimulator.attackTimeline.addAttack(weapon, attackDefinition);

//     // Assert
//     const {
//       damageSummary: {
//         totalDamage: { baseDamage, finalDamage, damageMultiplier },
//       },
//     } = sut;
//     expect(baseDamage).toBeCloseTo(121232.76);
//     expect(finalDamage).toBeCloseTo(147986.21);
//     expect(damageMultiplier).toBeCloseTo(1.22);
//   });

//   it('calculates the damage of multiple simple attacks correctly', () => {
//     // Arrange
//     const loadout = new Loadout('loadout', 'Frost', new Team(), new GearSet(), {
//       characterLevel: 100,
//     });

//     const { loadoutStats } = loadout;
//     loadoutStats.frostAttack = new ElementalAttack(26777, 0);
//     loadoutStats.critFlat = 12452;

//     const weapon = new Weapon(weaponDefinitions.byId['Tsubasa']);
//     loadout.team.weapon1 = weapon;

//     const combatSimulator = new CombatSimulator(loadout, new Relics());
//     const sut = new DamageCalculator(combatSimulator);

//     // Act
//     const attackDefinition1 = weaponDefinitions.byId['Tsubasa'].attacks?.find(
//       (attack) => attack.id == 'Tsubasa - Auto chain'
//     ) as AttackDefinition;
//     const attackDefinition2 = weaponDefinitions.byId['Tsubasa'].attacks?.find(
//       (attack) => attack.id == 'Tsubasa - Aerial auto chain'
//     ) as AttackDefinition;
//     combatSimulator.attackTimeline.addAttack(weapon, attackDefinition1);
//     combatSimulator.attackTimeline.addAttack(weapon, attackDefinition2);
//     combatSimulator.attackTimeline.addAttack(weapon, attackDefinition1);

//     // Assert
//     const {
//       damageSummary: {
//         totalDamage: { baseDamage, finalDamage, damageMultiplier },
//       },
//     } = sut;
//     expect(baseDamage).toBeCloseTo(366066.87);
//     expect(finalDamage).toBeCloseTo(446849.93);
//     expect(damageMultiplier).toBeCloseTo(1.22);
//   });

//   it('calculates the damage of attacks correctly, with gear atk% & crit%', () => {
//     // Arrange
//     const loadout = new Loadout('loadout', 'Frost', new Team(), new GearSet(), {
//       characterLevel: 100,
//     });

//     const { loadoutStats, gearSet } = loadout;
//     loadoutStats.frostAttack = new ElementalAttack(26777, 0);
//     loadoutStats.critFlat = 12452;

//     const weapon = new Weapon(weaponDefinitions.byId['Tsubasa']);
//     loadout.team.weapon1 = weapon;

//     const combatSimulator = new CombatSimulator(loadout, new Relics());
//     const sut = new DamageCalculator(combatSimulator);

//     const attackDefinition1 = weaponDefinitions.byId['Tsubasa'].attacks?.find(
//       (attack) => attack.id == 'Tsubasa - Auto chain'
//     ) as AttackDefinition;
//     const attackDefinition2 = weaponDefinitions.byId['Tsubasa'].attacks?.find(
//       (attack) => attack.id == 'Tsubasa - Aerial auto chain'
//     ) as AttackDefinition;
//     combatSimulator.attackTimeline.addAttack(weapon, attackDefinition1);
//     combatSimulator.attackTimeline.addAttack(weapon, attackDefinition2);
//     combatSimulator.attackTimeline.addAttack(weapon, attackDefinition1);

//     // Act
//     const attackPercentStat = new RandomStat(
//       statTypesLookup.byId['Frost Attack %']
//     );
//     attackPercentStat.value = 0.0126;
//     // This one shouldn't count, as it is not frost
//     const otherAttackPercentStat = new RandomStat(
//       statTypesLookup.byId['Flame Attack %']
//     );
//     otherAttackPercentStat.value = 0.0126;
//     gearSet.getGearByType('Exoskeleton').randomStats[0] = attackPercentStat;
//     gearSet.getGearByType('Exoskeleton').randomStats[1] =
//       otherAttackPercentStat;

//     const critPercentStat = new RandomStat(statTypesLookup.byId['Crit Rate %']);
//     critPercentStat.value = 0.0224;
//     gearSet.getGearByType('Eyepiece').randomStats[0] = critPercentStat;

//     // Assert
//     const {
//       damageSummary: {
//         totalDamage: { baseDamage, finalDamage, damageMultiplier },
//       },
//     } = sut;
//     expect(baseDamage).toBeCloseTo(370604.43);
//     expect(finalDamage).toBeCloseTo(456539.6);
//     expect(damageMultiplier).toBeCloseTo(1.23);
//   });

//   it('calculates the damage of attacks correctly, with weapon resonance buff (attack)', () => {
//     // Arrange
//     const loadout = new Loadout('loadout', 'Frost', new Team(), new GearSet(), {
//       characterLevel: 100,
//     });

//     const { loadoutStats } = loadout;
//     loadoutStats.frostAttack = new ElementalAttack(26777, 0);
//     loadoutStats.critFlat = 12452;

//     const combatSimulator = new CombatSimulator(loadout, new Relics());
//     const sut = new DamageCalculator(combatSimulator);

//     const attackDefinition = weaponDefinitions.byId['Tsubasa'].attacks?.find(
//       (attack) => attack.id == 'Tsubasa - Auto chain'
//     ) as AttackDefinition;

//     // Act
//     const attackWeapon = new Weapon(weaponDefinitions.byId['Tsubasa']);
//     loadout.team.weapon1 = attackWeapon;

//     const anotherAttackWeapon = new Weapon(weaponDefinitions.byId['Samir']);
//     loadout.team.weapon2 = anotherAttackWeapon;
//     combatSimulator.attackTimeline.addAttack(attackWeapon, attackDefinition);

//     // Assert
//     const {
//       damageSummary: {
//         totalDamage: { baseDamage, finalDamage },
//       },
//     } = sut;
//     expect(baseDamage).toBeCloseTo(121232.76);
//     expect(finalDamage).toBeCloseTo(162784.83);
//   });

//   it('calculates the damage of attacks correctly, with relic passive buffs', () => {
//     // Arrange
//     const loadout = new Loadout('loadout', 'Frost', new Team(), new GearSet(), {
//       characterLevel: 100,
//     });

//     const { loadoutStats } = loadout;
//     loadoutStats.frostAttack = new ElementalAttack(26777, 0);
//     loadoutStats.critFlat = 12452;

//     const weapon = new Weapon(weaponDefinitions.byId['Tsubasa']);
//     loadout.team.weapon1 = weapon;

//     const relics = new Relics();
//     const combatSimulator = new CombatSimulator(loadout, relics);
//     const sut = new DamageCalculator(combatSimulator);

//     const attackDefinition = weaponDefinitions.byId['Tsubasa'].attacks?.find(
//       (attack) => attack.id == 'Tsubasa - Auto chain'
//     ) as AttackDefinition;
//     combatSimulator.attackTimeline.addAttack(weapon, attackDefinition);

//     // Act
//     relics.setRelicStars('Cybernetic Arm', 4);
//     relics.setRelicStars('Hovering Cannon', 5);
//     relics.setRelicStars('Alternate Destiny', 4);

//     // Assert
//     const {
//       damageSummary: {
//         totalDamage: { baseDamage, finalDamage },
//       },
//     } = sut;
//     expect(baseDamage).toBeCloseTo(121232.76);
//     expect(finalDamage).toBeCloseTo(155385.52);
//   });

//   it('calculates the damage of attacks correctly, with gear dmg buffs', () => {
//     // Arrange
//     const loadout = new Loadout('loadout', 'Frost', new Team(), new GearSet(), {
//       characterLevel: 100,
//     });

//     const { loadoutStats } = loadout;
//     loadoutStats.frostAttack = new ElementalAttack(26777, 0);
//     loadoutStats.critFlat = 12452;

//     const weapon = new Weapon(weaponDefinitions.byId['Tsubasa']);
//     loadout.team.weapon1 = weapon;

//     const combatSimulator = new CombatSimulator(loadout, new Relics());
//     const sut = new DamageCalculator(combatSimulator);

//     const attackDefinition = weaponDefinitions.byId['Tsubasa'].attacks?.find(
//       (attack) => attack.id == 'Tsubasa - Auto chain'
//     ) as AttackDefinition;
//     combatSimulator.attackTimeline.addAttack(weapon, attackDefinition);

//     // Act
//     const damageStat = new RandomStat(statTypesLookup.byId['Frost Damage %']);
//     damageStat.value = 0.02867;
//     // This one shouldn't count, as it is not frost
//     const otherDamageStat = new RandomStat(
//       statTypesLookup.byId['Flame Damage %']
//     );
//     otherDamageStat.value = 0.0126;

//     loadout.gearSet.getGearByType('Microreactor').randomStats[0] = damageStat;
//     loadout.gearSet.getGearByType('Microreactor').randomStats[1] =
//       otherDamageStat;

//     // Assert
//     const {
//       damageSummary: {
//         totalDamage: { baseDamage, finalDamage },
//       },
//     } = sut;
//     expect(baseDamage).toBeCloseTo(121232.76);
//     expect(finalDamage).toBeCloseTo(152228.98);
//   });
// });
