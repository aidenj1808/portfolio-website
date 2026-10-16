import { getCollection, type CollectionEntry } from 'astro:content';

export type Experience = CollectionEntry<'experience'>;

type EmploymentType = NonNullable<Experience['data']['type']>;

export const employmentTypeLabels: Record<EmploymentType, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
  'co-op': 'Co-op',
  volunteer: 'Volunteer',
};

/**
 * Loads all experience entries, most recent first.
 *
 * @returns Experience entries sorted by start date, newest first.
 */
export async function getExperience(): Promise<Experience[]> {
  const entries = await getCollection('experience');
  return entries.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf());
}
