/// <reference types="rollbar" />

declare namespace globalThis {
  type Rollbar = {
    error: (message: string, error: Error, context: Record<string, any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
    warning: (message: string, error: Error, context: Record<string, any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  };

  interface Window {
    Rollbar: Rollbar;
  }
}
