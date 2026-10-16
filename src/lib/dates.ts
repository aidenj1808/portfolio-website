/**
 * Formats a date as a short month and year, e.g. "Jan 2024".
 *
 * @param date - The date to format. It's read in UTC so dates without a time don't shift.
 * @returns The abbreviated month and four-digit year.
 */
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/**
 * Formats a date range for display, e.g. "Jan 2024 – Apr 2024".
 *
 * @param startDate - When the range starts.
 * @param endDate - When the range ends; omit for something ongoing.
 * @returns A human-readable month/year range that ends in "Present" when there's no end date.
 */
export function formatDateRange(startDate: Date, endDate?: Date): string {
  return `${formatMonthYear(startDate)} – ${endDate ? formatMonthYear(endDate) : 'Present'}`;
}
