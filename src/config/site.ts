import { version } from '../../package.json';

/** Cloudflare Turnstile public site key (client-side value, safe to expose). */
export const TURNSTILE_SITEKEY = '0x4AAAAAADHIt20VsK-39buy';

/** Feedback submission endpoint (Cloudflare Worker). */
export const FEEDBACK_WORKER_URL = 'https://feedback-worker.emir-sozer007.workers.dev';

/** Version tag shown in the footer. Single source: package.json "version". */
export const SITE_VERSION = `v${version}`;
