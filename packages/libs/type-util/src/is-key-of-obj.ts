export function isKeyOfObj<T extends object>(key: string | number | symbol, obj: T): key is keyof T {
  return key in obj;
}
