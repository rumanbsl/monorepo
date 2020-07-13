

declare module "chalk-console" {
  function log(...arg): void
  function warn(...arg): void
  function error(...arg): void
  function info(...arg): void
}

declare module "bson" {
  interface ObjectId {
    toString:()=>string
  }
}
