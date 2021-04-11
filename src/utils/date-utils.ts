import { DateTime } from 'luxon';

export class DateUtils {

  static now(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  static parseDate(yearMonthDate?: string): Date{
    if(!yearMonthDate) return DateUtils.now();
    const dateTime = DateTime.fromISO(yearMonthDate);
    return new Date(dateTime.year, dateTime.month - 1, dateTime.day);
  }

  static toDate(date?: Date): string{
    if(!date) date = DateUtils.now();

    const year = DateUtils.formatValue(date.getFullYear());
    const month = DateUtils.formatValue(date.getMonth() + 1);
    const day = DateUtils.formatValue(date.getDate());
    return year + "-" + month + "-" + day;
  }

  static toTime(date: Date): string {
    const hours = DateUtils.formatValue(date.getHours());
    const min = DateUtils.formatValue(date.getMinutes());
    return hours + ":" + min;
  }

  static formatValue(value: number): string {
    return value > 9 ? value.toString() : "0" + value;
  }

  static toDateTime(date?: Date): string{
    if(!date) date = new Date();

    const dateString = this.toDate(date);
    const timeString = this.toTime(date);
    return dateString + "T" + timeString;
  }

  static isBeforeNow(date: Date): boolean {
    date.setHours(0, 0, 0, 0);
    return date < this.now();
  }
  
}