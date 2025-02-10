import { isEqual, uniq, uniqBy } from 'lodash-es';

export default class ArrayUtils {
  static compareDeepUnordered<T>(arr1: T[], arr2: T[]): boolean {
    return isEqual(arr1.sort(), arr2.sort());
  }

  static compareDeepOrdered<T>(arr1: T[], arr2: T[]): boolean {
    return isEqual(arr1, arr2);
  }

  static getUnique<T>(arr: T[]): T[] {
    return uniq(arr);
  }

  static getUniqueBy<T>(arr: T[], id: string): T[] {
    return uniqBy(arr, id);
  }
}