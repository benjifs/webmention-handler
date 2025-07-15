import type { HTMLElement } from 'node-html-parser';
import { getHtmlLinks } from './get-html-links.function';
import { MicroformatRoot } from 'src/types/microformats-parser';

export function isMentioned (entry: MicroformatRoot, html: HTMLElement, target: string): boolean {
  const ignoreKeys = ['author', 'url', 'content',
    // experimental for received webmentions
    'comment', 'like', 'bookmark'];
  // Check if `target` isMentioned in the `h-entry`
  for (const key in entry.properties) {
    if (ignoreKeys.includes(key)) continue
    const found = entry.properties[key].find((prop: any) => (
      (typeof prop === 'string' && prop === target) ||
      (prop === target) ||
      (typeof prop.value === 'string' && prop.value === target) ||
      (prop.value === target)
    ))
    if (found) return true
  }
  // Check if `target` is in `*-content` of the `h-entry`
  const content = html.querySelectorAll('[class$=-content]');
  const isLinked = content.filter(c => getHtmlLinks(c).includes(target))
  return isLinked.length > 0
}
