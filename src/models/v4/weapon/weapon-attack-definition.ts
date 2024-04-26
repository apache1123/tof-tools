import type {
  chargeResourceId,
  dodgeResourceId,
  fullCharge,
} from '../../../constants/resources';
import type { WeaponName } from '../../../constants/weapon-definitions';
import type { AttackDefinition } from '../attack/attack-definition';
import type { WeaponStarRequirement } from './weapon-star-requirement';

export interface WeaponAttackDefinition extends AttackDefinition {
  starRequirement: WeaponStarRequirement;
}

export interface PlayerInputAttackDefinition extends WeaponAttackDefinition {
  triggeredBy: {
    playerInput: true;
  };
}

export interface NormalAttackDefinition extends PlayerInputAttackDefinition {
  type: 'normal';
}

export interface DodgeAttackDefinition extends PlayerInputAttackDefinition {
  type: 'dodge';

  requirements: {
    hasResource: {
      resourceId: typeof dodgeResourceId;
      minAmount: 1;
    };
  };
}

export interface SkillAttackDefinition extends PlayerInputAttackDefinition {
  type: 'skill';
}

export interface DischargeAttackDefinition extends PlayerInputAttackDefinition {
  type: 'discharge';

  requirements: {
    hasResource: {
      resourceId: typeof chargeResourceId;
      minAmount: typeof fullCharge;
    };
    notActiveWeapon: WeaponName;
  };
}
