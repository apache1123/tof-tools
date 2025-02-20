import { addBreadcrumb } from "@sentry/nextjs";

export class DataMigrationError extends Error {
  /** @param message The error message
   @param userData The user data we are attempting to migrate */
  public constructor(
    public override readonly message: string,
    public readonly userData: object,
  ) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DataMigrationError);
    }

    this.name = "DataMigrationError";

    addBreadcrumb({
      message,
      data: userData,
      type: "debug",
      level: "fatal",
    });
  }
}
