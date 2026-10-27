import type { Ttl } from './types'

export const MIN_PING_MS = 60 * 1000
export const REFRESH_MS = 15 * 1000
export const MAX_RETRIES = 3
export const TTLS: Record<Ttl, { ms: number; pingAfter: number; defaultWindow: number; autoWarm: number }> = {
  '1h': { ms: 60 * 60 * 1000, pingAfter: 50 * 60 * 1000, defaultWindow: 6 * 60 * 60 * 1000, autoWarm: 3 * 60 * 60 * 1000 },
  '5m': { ms: 5 * 60 * 1000, pingAfter: 4 * 60 * 1000, defaultWindow: 60 * 60 * 1000, autoWarm: 30 * 60 * 1000 },
}
export const BIG_TOKENS = 50000
export const PING_PROMPT = 'Reply with the single word: warm'
export const KEY_DEADLINE = 'deadline'
export const KEY_EVERY = 'every'
export const KEY_GUARD = 'guard'
export const KEY_ALWAYS = 'always'
export const KEY_TTL = 'ttl'

// Prompts no person sent, so nobody could send them again after a refusal. Every
// other origin, including sdk, unclassified and the owner's own Slack or channel
// messages, may carry a person's words and keeps the guard.
export const UNATTENDED = new Set(['task-notification', 'scheduled-trigger', 'peer', 'peer-send-message', 'projects-relay', 'coordinator', 'observer', 'observer-activity'])

// $ per million tokens at the provider: [input, cache write for five minutes, cache read, output]. The write is null for a model that
// cannot write a cache (its prompt caching is automatic), which then bills a cold send as plain input. A one-hour write is twice the input.
// More specific families first: a model id takes the first row it matches, after the lowercasing and the dot-to-dash rewrite in priceOf.
export const PRICES: Array<[string | RegExp, number, number | null, number, number]> = [
  ['haiku-5-5', 0.5, 0.63, 0.05, 2.5],
  ['sonnet-5-5', 2, 2.5, 0.2, 10],
  ['deepseek-v4-1-flash', 0.3, null, 0.01, 1.2],
  ['deepseek-v4-flash', 0.19, null, 0.21, 0.51],
  ['fw-glm-5-3-flash', 0.19, null, 0.04, 0.63],
  ['gpt-6-luna', 0.1, 0.13, 0.01, 0.5],
]

/** The most recent pings kept for /keepwarm status; the tally covers all of them. */
export const PING_LOG = 5
