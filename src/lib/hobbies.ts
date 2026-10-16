import { getCollection, type CollectionEntry } from 'astro:content';

export type Hobby = CollectionEntry<'hobbies'>;

/**
 * Loads all hobbies in alphabetical order.
 *
 * @returns Hobby entries sorted by name.
 */
export async function getHobbies(): Promise<Hobby[]> {
  const hobbies = await getCollection('hobbies');
  return hobbies.sort((a, b) => a.data.name.localeCompare(b.data.name));
}
