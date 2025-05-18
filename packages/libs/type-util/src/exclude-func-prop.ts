import { AnyFunc } from "./any-func";

export type ExcludeFuncProp<T, K extends keyof T> = T[K] extends AnyFunc
  ? never
  : K;
