export interface CanConstruct<TInstance> {
  new (...args: any[]): TInstance;
}
