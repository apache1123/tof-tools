import { proxy } from "valtio";

import type { CharacterId } from "../../models/character/character";

export interface CharacterState {
  selectedId: CharacterId | undefined;
}

export const characterState = proxy<CharacterState>({
  selectedId: undefined,
});

export const characterStateKey = "characters";
