export class ArrayUtils {
  
  static distinct<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  }

  static contain<T>(array: T[], possibleItem: T, predicate: (t1: T, t2: T) => boolean): boolean {
    return ArrayUtils.contains(array, [possibleItem], predicate);
  }

  static contains<T>(array: T[], possibleContentArray: T[], predicate: (t1: T, t2: T) => boolean): boolean {
    let yesContains = true;

    possibleContentArray.forEach(element => {
      var elementsFounded = array.filter(i => predicate(i, element));
      if (!elementsFounded.length) {
        yesContains = false;
        return;
      }
    });
    
    return yesContains;
  }

  static isNullOrEmpty<T>(list: T[]): boolean {
    return list == null || list.length == 0;
  }

}
