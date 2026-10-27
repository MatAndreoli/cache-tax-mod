// The main conversation's cache lifetime, with the ping period, default window and cold-write hold that suit it. A five-minute
// cache is pinged every four minutes, so a window an hour long is already fifteen reads: the defaults are shorter than the hour's.
export type Ttl = '5m' | '1h'

export type PingRecord = { at: number; read: number; write: number; usd: number | null; warm: boolean }
export type Miss = { at: number; tokens: number; usd: number | null }
/** How a fork ended. Only 'ok' answered; the others are billed when the engine reports a nonzero usage with them. */
export type PingStatus = 'ok' | 'empty' | 'aborted' | 'api-error'
export type PingCost = { at: number; status: PingStatus; input: number; read: number; write: number; output: number; usd: number | null }
export type PingTally = { count: number; failed: number; input: number; read: number; write: number; output: number; usd: number; priced: boolean }
export type ForkUsage = { input_tokens: number; output_tokens: number; cache_read_input_tokens: number; cache_creation_input_tokens: number }
export type GuardMode = 'refuse' | 'warn'

/** What this turn's main requests wrote before any compaction it saw, priced per request where the steps reported usage. */
export type StepWrites = { tokens: number; usd: number; priced: boolean }

/** [cache read, cache write at the TTL given, output, uncached input], $ per million tokens. */
export type Price = [number, number, number, number]

export type State = {
  hasBand: boolean
  sid: string
  deadline: number
  every: number
  always: boolean
  lastRequestAt: number
  lastModel: string | null
  ctx: number
  compacted: boolean
  resumedAt: number
  transcript: number
  guard: GuardMode
  ackedAt: number
  coldWritePending: boolean
  misses: Miss[]
  pending: { cancel: () => void } | null
  last: PingRecord | null
  pings: PingCost[]
  pingTally: PingTally
  stopped: string | null
  waitForTurn: boolean
  retries: number
  retryReason: string
  gen: number
  tick: number
  offs: number
  turnOffs: number | null
  inFlight: boolean
  stepWrites: StepWrites | null
  steps: number
  endingSid: string
  ttl: Ttl
  refresh: { cancel: () => void } | null
  ttlPinned: boolean
  ttlFound: boolean
}

export type ResumeFields = {
  source: string
  model?: string
  context_tokens?: number
  seconds_since_last_response?: number
  prompt_cache_likely_expired?: boolean
  estimated_cache_write_usd?: number
}
