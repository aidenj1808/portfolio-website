import { getCollection, type CollectionEntry } from 'astro:content';
import { formatDateRange, formatMonthYear } from './dates';

export type Education = CollectionEntry<'education'>;

const typeOrder: Record<Education['data']['type'], number> = { degree: 0, certificate: 1 };

/**
 * Loads all education entries in display order: degrees before certificates, each newest first.
 *
 * @returns Education entries sorted by type, then by end date with the most recent first.
 */
export async function getEducation(): Promise<Education[]> {
  const entries = await getCollection('education');
  return entries.sort(
    (a, b) =>
      typeOrder[a.data.type] - typeOrder[b.data.type] ||
      b.data.endDate.valueOf() - a.data.endDate.valueOf(),
  );
}

/**
 * Formats when an education entry ran, or just when it ended if it has no start date.
 *
 * @param data - The entry's frontmatter.
 * @returns A month/year range such as "May 2021 – Apr 2025", or a single month such as "Jun 2025".
 */
export function formatEducationDates({ startDate, endDate }: Education['data']): string {
  return startDate ? formatDateRange(startDate, endDate) : formatMonthYear(endDate);
}
