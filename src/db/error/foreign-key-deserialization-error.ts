import { addBreadcrumb } from "@sentry/nextjs";

import type { Identifiable } from "../../models/identifiable";
import type { Repository } from "../repository/types/repository";
import { DeserializationError } from "./deserialization-error";

export class ForeignKeyDeserializationError extends DeserializationError {
  /** @param message
   @param dto The dto object referencing the foreign key
   * @param referencingRepository The repository that contains the foreign key object
   */
  public constructor(
    public override readonly message: string,
    dto: object,
    public readonly referencingRepository: Repository<Identifiable>,
  ) {
    super(message, dto);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForeignKeyDeserializationError);
    }

    this.name = "ForeignKeyDeserializationError";

    const repoItems = referencingRepository.items;
    addBreadcrumb({
      message,
      data: { dto, repoItems },
      type: "debug",
      level: "error",
    });
  }
}
