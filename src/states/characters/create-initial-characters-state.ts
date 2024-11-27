import { CharactersState } from "./characters";

export function createInitialCharactersState() {
  const charactersState = new CharactersState();
  charactersState.addDefaultCharacter();
  charactersState.selectFirstCharacter();
  return charactersState;
}
