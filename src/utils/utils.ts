import { FrontMatterCache } from 'obsidian';
import { Book, BookModel, FrontMatter } from 'src/models/book.model';

export function replaceIllegalFileNameCharactersInString(string: string) {
  return string.replace(/[\\,#%&{}/*<>$":@.]*/g, '');
}

export function isISBN(str: string) {
  return /^(97(8|9))?\d{9}(\d|X)$/.test(str);
}

export function makeFileName(book: Book) {
  const titleForFileName = replaceIllegalFileNameCharactersInString(book.title);
  if (!book.author) {
    return titleForFileName;
  }
  const authorForFileName = replaceIllegalFileNameCharactersInString(book.author);
  return `${titleForFileName} - ${authorForFileName}`;
}

export function makeFrontMater(book: Book, frontmatter: FrontMatter): string {
  return new BookModel(book).toFrontMatter(frontmatter);
}

export function makeContent(book: Book, content: string): string {
  const entries = Object.entries(book);
  return entries
    .reduce((text, [key, val = '']) => text.replace(new RegExp(`{{${key}}}`, 'ig'), val), `${content}`)
    .replace(/{{.+}}/gi, '');
}

export function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter?.toLowerCase()}`);
}

export function parseFrontMatter(frontMatterString: string) {
  if (!frontMatterString) return {};
  return frontMatterString
    .split('\n')
    .map(item => item.split(':'))
    .reduce((acc, [key, value]) => ((acc[key] = value?.trim() ?? ''), acc), {});
}
