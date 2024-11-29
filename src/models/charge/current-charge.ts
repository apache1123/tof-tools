import type { CurrentResource } from "../resource/current-resource/current-resource";

export interface CurrentCharge extends CurrentResource {
  readonly hasFullCharge: boolean;
}
