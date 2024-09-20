/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

export function consoleLogDev(message: any, ...args: any[]) {
  if (isDev()) {
    console.log(...args);
  }
}

export function consoleWarnDev(message: any, ...args: any[]) {
  if (isDev()) {
    console.warn(...args);
  }
}

export function consoleErrorDev(message: any, ...args: any[]) {
  if (isDev()) {
    console.error(...args);
  }
}

function isDev() {
  return process.env.NODE_ENV === 'development';
}
