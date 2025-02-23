import { addBreadcrumb } from "@sentry/nextjs";

import { DeserializationError } from "./deserialization-error";

export class ForeignKeyDeserializationError extends DeserializationError {
  /** @param message
   @param dto The dto object referencing the foreign key
   * @param referencingRepository The repository that contains the foreign key object
   */
  public constructor(
    public override readonly message: string,
    dto: object,
    public readonly referencingRepository: object,
  ) {
    super(message, dto);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForeignKeyDeserializationError);
    }

    this.name = "ForeignKeyDeserializationError";

    addBreadcrumb({
      message,
      data: { dto, referencingRepository },
      type: "debug",
      level: "error",
    });
  }
}
