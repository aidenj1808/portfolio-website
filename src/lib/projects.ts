import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * Loads all non-draft projects, newest first.
 *
 * @returns Published project entries sorted by start date, most recent first.
 */
export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf());
}

/**
 * Formats a project's date range for display, e.g. "Jan 2024 – Apr 2024".
 *
 * @param startDate - When the project started.
 * @param endDate - When the project ended; omit for ongoing projects.
 * @returns A human-readable month/year range.
 */
export function formatDateRange(startDate: Date, endDate?: Date): string {
  const format = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  return `${format(startDate)} – ${endDate ? format(endDate) : 'Present'}`;
}
