import path from 'path';
import fs from 'fs';
import { mf2 } from 'microformats-parser';
import { parse as htmlParser } from 'node-html-parser';
import { isMentioned } from './is-mentioned.function';

describe('isMentioned', () => {
  it('should find appropriate things to mention', () => {
    const html = fs.readFileSync(path.join(__dirname, '../test-data/html-mentioned.html'), 'utf8');
    const hEntry = mf2(html, { baseUrl: 'http://example.net' }).items[0];
    const dom = htmlParser(html, { parseNoneClosedTags: true });
    // `isMentioned` does not check content
    expect(isMentioned(hEntry, dom, 'http://example.com/mention')).toEqual(false)
    // There is also a like
    expect(isMentioned(hEntry, dom, 'http://example.com/like')).toEqual(true)
    // This should be excluded because it's a comment
    expect(isMentioned(hEntry, dom, 'http://example.com/comment')).toEqual(false)
    // This is outside the h-entry so it shouldn't count
    expect(isMentioned(hEntry, dom, 'http://example.com/not-a-mention')).toEqual(false)
  });
})