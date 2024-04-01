/// <reference types="rollbar" />

declare namespace globalThis {
  type Rollbar = {
    error: (message: string, error: Error, context: Record<string, any>) => void;
    warning: (message: string, error: Error, context: Record<string, any>) => void;
  };

  interface Window {
    Rollbar: Rollbar;
  }
}
