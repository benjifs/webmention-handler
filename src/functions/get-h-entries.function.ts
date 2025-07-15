import { mf2 } from 'microformats-parser';
import { MicroformatRoot } from '../types/microformats-parser';
import { isMentioned } from './is-mentioned.function';
import type { HTMLElement } from 'node-html-parser';

export function getHEntries(dom: HTMLElement, source: string, target: string): MicroformatRoot[] {
  const hEntries = dom.querySelectorAll('.h-entry');
  return hEntries.reduce((entries, entry) => {
    const hEntry = mf2(entry.toString(), { baseUrl: source }).items
    const mentioned = hEntry.filter(e => isMentioned(e, entry, target))
    if (!mentioned || !mentioned.length) return entries
    return [
      ...entries,
      ...hEntry
    ]
  }, [] as MicroformatRoot[]);
}