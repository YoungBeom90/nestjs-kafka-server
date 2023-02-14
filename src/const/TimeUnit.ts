export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;

export type TimeUnit = 'minute' | 'hour' | 'day' | 'month' | 'year';

export function getSeconds(
  timeUnit: TimeUnit,
  daysInMonth?: number,
  daysInYear?: number,
) {
  switch (timeUnit) {
    case 'minute':
      return SECONDS_IN_MINUTE;
    case 'hour':
      return SECONDS_IN_HOUR;
    case 'day':
      return 60 * 60 * 24;
    case 'month':
      if (!daysInMonth) {
        throw new Error(`No daysInMonth=${daysInMonth} timeUnit=${timeUnit}`);
      }
      return 60 * 60 * 24 * (daysInMonth as number);
    case 'year':
      if (!daysInYear) {
        throw new Error(`No daysInYear=${daysInYear} timeUnit=${timeUnit}`);
      }
      return 60 * 60 * 24 * daysInYear;
    default:
      throw new Error(
        `Invalid timeUnit=${timeUnit}, daysInMonth=${daysInMonth}`,
      );
  }
}
