export const maxNumOfRandomStatRolls = 5;
export const defaultNumOfRandomStats = 4;
export const maxNumOfAugmentStats = 2;

// For random stats when augmenting, when there are multiple stats of the same stat type but of different elemental types, the stat with the highest value is used as a base, and the rest are "pulled-up" to be a factor of that value. The second highest value is pulled up to be 95% of the highest value, the third highest value is pulled up to be 90%, and the fourth highest value is pulled up to be 85% (unconfirmed, this is too rare).
// e.g. A piece of gear with Flame Attack 4.25% (3 rolls) > Frost Attack (2 rolls) > Phys Attack (0 rolls)
// After augmenting - the Flame Attack is x, Frost Attack is 0.95x, and Phys Attack is 0.9x.
// Similar thing happens with augment stats, but each augment stat will always be 95%.
export const augmentStatsPullUpFactor1 = 0.95;
export const augmentStatsPullUpFactor2 = 0.9;
export const augmentStatsPullUpFactor3 = 0.85; // unconfirmed

export const goldGearNamePrefix = 'Fortress';
export const titanGearNamePrefix = 'Titan';
export const randomStatsSectionTitle = 'Random Stats';
