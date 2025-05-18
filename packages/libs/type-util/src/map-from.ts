/**
 * @description
 * A utility custom type to convert object type into Map type
 */
export type MapFrom<TObject extends object> = Map<keyof TObject, TObject[keyof TObject]>;
