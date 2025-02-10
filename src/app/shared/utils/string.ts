export default class StringUtils {
  static trimMultispace(str: string): string {
    return str.replace(/\s+/g, ' ');
  }

  static trimStart(str: string): string {
    return str.replace(/^\s+/g, '');
  }

  static trimEnd(str: string): string {
    return str.replace(/\s+$/g, '');
  }

  static testOnlyAlphabetic(str: string): boolean {
    return /^[a-zA-Z\s]+$/.test(str);
  }

  static removeNonAlphabetic(str: string): string {
    return str.replace(/[^a-zA-Z\s]/g, '');
  }

  static removeDuplicateWords(str: string): string {
    return str
      .replace(/\s{2,}/g, ' ')
      .replace(/^\s/g, '')
      .split(' ')
      .filter((item: string, index: number, self: string[]) => item && self.indexOf(item) === index)
      .join(' ') + ' ';
  }

  static trimAllSpaces(str: string): string {
    return str.replace(/\s{2,}/g, ' ').replace(/^\s/g, '');
  }
}