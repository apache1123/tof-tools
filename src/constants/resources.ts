import type { ResourceDefinition } from '../models/v4/resource/resource-definition';

export const chargeResourceId = 'weapon-charge';
/** The amount of charge units of 2 full charges */
const maxCharge = 2000;
/** The amount of charge units for a full charge. A full charge = discharge available */
export const fullCharge = 1000;
export const chargeDefinition: ResourceDefinition = {
  id: chargeResourceId,
  displayName: 'Weapon charge',
  maxAmount: maxCharge,
  startingAmount: maxCharge, // TODO: move this later as an option passed to combat simulator
};

export const enduranceResourceId = 'endurance';
const maxEndurance = 1300; // TODO: should this be dynamic
export const enduranceDefinition: ResourceDefinition = {
  id: enduranceResourceId,
  displayName: 'Endurance',
  maxAmount: maxEndurance,
  startingAmount: maxEndurance,
  regenerate: {
    amountPerSecond: 105,
  },
};

export const dodgeResourceId = 'dodge';
const maxDodges = 3;
export const dodgeResourceDefinition: ResourceDefinition = {
  id: dodgeResourceId,
  displayName: 'Dodges',
  maxAmount: maxDodges,
  startingAmount: maxDodges,
  regenerate: {
    amountPerSecond: 0.25,
  },
};
