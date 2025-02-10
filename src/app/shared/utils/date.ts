import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export default class DateUtils {
  static format(date: Date | string, formatString: string, timeZone: string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, formatString);
  }
}