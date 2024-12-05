import type { Dto } from "../../repository/dto";

export interface CharacterDto extends Dto {
  id: string;
  name: string;
  level: number;
  version: 1;
}
