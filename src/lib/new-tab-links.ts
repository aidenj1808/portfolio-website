import type { Element } from 'hast';
import type { HastPluginDefinition } from 'satteri';

export const newTabRel = 'noopener noreferrer';

// Leads with a space so screen readers announce it as a separate phrase after the link text.
export const newTabLabel = ' (opens in a new tab)';

// Chromium can break a line on either side of an inline SVG, stranding the icon. Positioning it in
// a spacer that reserves its width keeps the icon with the link text and any punctuation after it.
export const newTabIconSpacerClass = 'relative pr-[1em]';
export const newTabIconClass = 'absolute top-1/2 right-0 size-[1em] -translate-y-1/2';

/**
 * Checks whether a link in Markdown content should open in a new tab.
 *
 * @param href - The link's destination.
 * @returns True for absolute http(s) URLs and links to PDFs.
 */
function opensInNewTab(href: string): boolean {
  return /^https?:\/\//i.test(href) || /\.pdf(?:[?#]|$)/i.test(href);
}

/**
 * Builds Lucide's arrow-up-right icon in its spacer, matching what `NewTabLink` renders.
 *
 * @returns A span holding a decorative SVG that screen readers skip.
 */
function createArrowIcon(): Element {
  const icon: Element = {
    type: 'element',
    tagName: 'svg',
    properties: {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: ['lucide', 'lucide-arrow-up-right', ...newTabIconClass.split(' ')],
      ariaHidden: 'true',
    },
    children: ['M7 7h10v10', 'M7 17 17 7'].map((d) => ({
      type: 'element',
      tagName: 'path',
      properties: { d },
      children: [],
    })),
  };
  return {
    type: 'element',
    tagName: 'span',
    properties: { className: newTabIconSpacerClass.split(' ') },
    children: [icon],
  };
}

/**
 * Builds the text that tells screen reader users a link opens in a new tab.
 *
 * @returns A span that's visually hidden but read aloud.
 */
function createScreenReaderLabel(): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: { className: ['sr-only'] },
    children: [{ type: 'text', value: newTabLabel }],
  };
}

/**
 * Sätteri hast plugin that opens external links and PDFs in Markdown and MDX content in a new
 * tab, adding an arrow icon and screen-reader text so the new tab isn't a surprise.
 */
export const newTabLinks = {
  name: 'new-tab-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const { href } = node.properties;
      if (typeof href !== 'string' || !opensInNewTab(href)) return;
      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', newTabRel.split(' '));
      ctx.appendChild(node, [createArrowIcon(), createScreenReaderLabel()]);
    },
  },
} satisfies HastPluginDefinition;
