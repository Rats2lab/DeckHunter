import { v4 } from 'uuid';

export class UtilsMother {
  static getRandomUuid(): string {
    return v4();
  }
  static getRandomDate(start = new Date(), end = new Date()): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  static getRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  static getRandomNumber(min = 0, max = 10000): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static getRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  static getRandomArrayElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
