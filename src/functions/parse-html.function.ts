import { parse as htmlParser } from 'node-html-parser';
import { getHEntries } from './get-h-entries.function';
import { getHtmlLinks } from './get-html-links.function';
import { normalizeEntry } from './normalize-entry.function';

export function parseHtml(html: string, source: string, target: string): any[] {
  const dom = htmlParser(html, { parseNoneClosedTags: true });
  const urls = getHtmlLinks(dom);
  const entries = getHEntries(dom, source, target);
  const hEntries = dom.querySelectorAll('.h-entry');
  // Only check for links outside h-entry if no h-entries are found
  if (!hEntries.length && urls.find(v => v === target)) {
    entries.push({
      type: ['mention-of'],
      properties: {
        'mention-of': [ target ]
      }
    });
  }
  // Return a more readable format
  return entries.map(normalizeEntry)
}