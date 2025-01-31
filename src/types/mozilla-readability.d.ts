declare module 'mozilla-readability' {
    import { Document } from 'jsdom';

    export class Readability {
        constructor(document: Document);
        parse(): {
            title: string;
            byline: string | null;
            content: string;
            length: number;
            excerpt: string | null;
            siteName: string | null;
        } | null;
    }
}
