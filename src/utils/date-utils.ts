import { DateTime } from 'luxon';

export class DateUtils {

  static now(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  static toDate(yearMonthDate?: string): Date{
    if(!yearMonthDate) return DateUtils.now();
    const dateTime = DateTime.fromISO(yearMonthDate);
    return new Date(dateTime.year, dateTime.month - 1, dateTime.day);
  }

  static toDateString(date: Date): string{
    return "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  static isBeforeNow(date: Date): boolean {
    date.setHours(0, 0, 0, 0);
    return date < this.now();
  }
  
}