import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export interface PreviewImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const sitePreviewImage: PreviewImage = {
  src: '/og-image.png',
  width: 2400,
  height: 1254,
  alt: 'AL logo above the name Aiden Lumley, the label Software & Data, and aidenlumley.dev',
};

const coverPreviewWidth = 1200;
const coverPreviewHeight = 627;

/**
 * Crops a project cover to link-preview size (1200×627, from the center) and converts it to PNG,
 * which link-preview services reliably accept.
 *
 * @param cover - The project's imported cover image.
 * @param alt - Alt text describing the cover.
 * @returns The PNG's site-relative path, its size, and the alt text.
 */
export async function getCoverPreviewImage(
  cover: ImageMetadata,
  alt: string,
): Promise<PreviewImage> {
  const image = await getImage({
    src: cover,
    format: 'png',
    width: coverPreviewWidth,
    height: coverPreviewHeight,
    fit: 'cover',
  });
  return { src: image.src, width: coverPreviewWidth, height: coverPreviewHeight, alt };
}
