import { CharactersState } from "./characters-state";

export function createInitialCharactersState() {
  const charactersState = new CharactersState();
  charactersState.addDefaultCharacter();
  charactersState.selectFirstCharacter();
  return charactersState;
}
