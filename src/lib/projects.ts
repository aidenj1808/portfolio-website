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
