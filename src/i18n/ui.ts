import { en } from './en';
import { tr } from './tr';

/** Shape of every locale dictionary. Both en/tr must satisfy this. */
export interface UIStrings {
  nav: { home: string; lex: string; devlog: string; contact: string };
  topbar: { home: string; lex: string; devlog: string; contact: string };
  sections: { lex: string; devlog: string };
  feedback: {
    tabs: { general: string; suggest: string; bug: string };
    placeholders: { general: string; suggest: string; bug: string; name: string };
    send: string;
    successMsg: string;
  };
  captcha: {
    label: string;
    verified: string;
    verificationError: string;
    verification: string;
    sending: string;
    sent: string;
    error: string;
    connectionError: string;
  };
  socials: { github: string; discord: string; x: string; tiktok: string };
}

export const languages = ['en', 'tr'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'en';

const dictionaries: Record<Lang, UIStrings> = { en, tr };

/** Returns the dictionary for a locale, falling back to the default. */
export function getStrings(lang: string): UIStrings {
  return dictionaries[lang as Lang] ?? dictionaries[defaultLang];
}
