import { addBreadcrumb } from "@sentry/nextjs";

export class DeserializationError extends Error {
  /** @param message
   @param dto The dto object being deserialized
   */
  public constructor(
    public override readonly message: string,
    public readonly dto: object,
  ) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DeserializationError);
    }

    this.name = "DeserializationError";

    addBreadcrumb({
      message,
      data: dto,
      type: "debug",
      level: "error",
    });
  }
}
