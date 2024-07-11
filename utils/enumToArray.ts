import { title } from '~/enums/title';

export function enumToArray(enumObj: any) {
  return Object.keys(enumObj).map(key => ({
    value: enumObj[key as keyof typeof enumObj],
    label: key,
  }));
}
