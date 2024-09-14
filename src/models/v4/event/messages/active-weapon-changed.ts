import type { WeaponState } from '../../weapon/weapon-state';
import type { Message } from '../message';

export interface ActiveWeaponChangedMessage extends WeaponState, Message {}
