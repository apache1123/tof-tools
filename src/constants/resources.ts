import type { ResourceDefinition } from '../models/v4/resource/resource-definition';

/** The amount of charge units of 2 full charges */
const maxCharge = 2000;
/** The amount of charge units for a full charge. A full charge = discharge available */
export const fullCharge = 1000;

export const chargeDefinition: ResourceDefinition = {
  id: 'weapon-charge',
  displayName: 'Weapon charge',
  cooldown: 0,
  maxAmount: maxCharge,
};
