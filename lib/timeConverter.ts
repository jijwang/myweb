import { format, fromUnixTime } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

/**
 * Convert epoch timestamp to various timezone representations
 */
export function epochToTimezonesMap(
  epochSeconds: number,
  timezones: string[]
): Record<string, string> {
  const result: Record<string, string> = {};
  const date = fromUnixTime(epochSeconds);

  timezones.forEach((tz) => {
    try {
      const zonedDate = utcToZonedTime(date, tz);
      result[tz] = format(zonedDate, 'yyyy-MM-dd HH:mm:ss zzz');
    } catch {
      result[tz] = 'Invalid timezone';
    }
  });

  return result;
}

/**
 * Convert epoch timestamp to UTC
 */
export function epochToUTC(epochSeconds: number): string {
  const date = fromUnixTime(epochSeconds);
  return format(date, 'yyyy-MM-dd HH:mm:ss UTC');
}

/**
 * Convert epoch timestamp to local timezone
 */
export function epochToLocal(epochSeconds: number): string {
  const date = fromUnixTime(epochSeconds);
  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = utcToZonedTime(date, localTz);
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ss zzz');
}

/**
 * Convert a date string and timezone to epoch timestamp
 * @param dateString - ISO datetime string from datetime-local input (format: "2026-03-31T14:30")
 * @param timezone - Timezone identifier (e.g., "America/New_York")
 */
export function dateToEpoch(dateString: string, timezone: string): number {
  try {
    if (!dateString) {
      throw new Error('Date string is required');
    }
    
    // Parse the datetime-local input
    // Format is "YYYY-MM-DDTHH:mm" or "YYYY-MM-DDTHH:mm:ss"
    const [datePart, timePart] = dateString.split('T');
    if (!datePart || !timePart) {
      throw new Error('Invalid datetime format');
    }

    const [year, month, day] = datePart.split('-').map(Number);
    const timeParts = timePart.split(':');
    const hour = Number(timeParts[0]);
    const minute = Number(timeParts[1]);
    const second = timeParts[2] ? Number(timeParts[2]) : 0;

    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(second)) {
      throw new Error('Invalid date/time values');
    }

    // Create a date object representing the local time in the selected timezone
    // We create a UTC date and then use zonedTimeToUtc to convert
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    const utcDate = zonedTimeToUtc(date, timezone);
    
    return Math.floor(utcDate.getTime() / 1000);
  } catch (error) {
    throw new Error(`Failed to convert date to epoch: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Get current epoch timestamp
 */
export function getCurrentEpoch(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Validate epoch timestamp
 */
export function isValidEpoch(value: number | string): boolean {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  return !isNaN(num) && num >= 0 && num <= 253402300799; // Until year 9999
}

/**
 * Common timezones list
 */
export const COMMON_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Moscow',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Bangkok',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Australia/Melbourne',
  'Australia/Brisbane',
  'Pacific/Auckland',
];

/**
 * Get all available timezones (for browser environment)
 */
export function getAllTimezones(): string[] {
  if (typeof window === 'undefined') {
    return COMMON_TIMEZONES;
  }

  try {
    // @ts-ignore - supportedValuesOf is available in modern browsers
    return Intl.supportedValuesOf('timeZone');
  } catch {
    return COMMON_TIMEZONES;
  }
}

/**
 * Format epoch for display
 */
export function formatEpoch(epochSeconds: number): string {
  return epochSeconds.toString();
}
