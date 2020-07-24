

declare module "chalk-console" {
  function log(...arg): void
  function warn(...arg): void
  function error(...arg): void
  function info(...arg): void
}

declare module "rand-token" {
  /**
   *
   * @param strength 16 | 32 | 64 | 128
   */
  function uid(strength: number): string
}
