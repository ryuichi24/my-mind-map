export type ExcludeMatchingProperties<T, Pattern extends string> = {
  [K in keyof T as K extends `${Pattern}${string}` | `${string}${Pattern}${string}` | `${string}${Pattern}`
    ? never
    : K]: T[K];
};
