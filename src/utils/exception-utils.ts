import { captureException } from "@sentry/nextjs";

import { consoleErrorDev, isDev } from "./dev-utils";

export function logException(exception: unknown) {
  if (isDev()) {
    consoleErrorDev(exception);
  } else {
    captureException(exception);
  }
}
