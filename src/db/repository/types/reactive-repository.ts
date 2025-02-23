import type { Identifiable } from "../../../models/identifiable";
import type { Repository } from "./repository";

export interface ReactiveRepository<T extends Identifiable>
  extends Repository<T> {
  /** Subscribe to reactively persist changes in the repository. */
  subscribeToChanges(): void;
  /** Unsubscribe from reactively persist changes in the repository. */
  unsubscribeToChanges(): void;
}
