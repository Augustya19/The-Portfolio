// A synthesised office-chair roll: caster rumble, wheel ticks that slow down,
// then a soft thunk and a little creak as the chair settles. No audio files.

let ctx: AudioContext | null = null

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  return ctx
}

/** True when the browser will let us make sound right now (no user gesture needed). */
export function soundAllowed() {
  const c = getCtx()
  return !!c && c.state === 'running'
}

/** Call from a click/tap handler to unlock audio. */
export async function unlockSound() {
  const c = getCtx()
  if (c && c.state !== 'running') {
    try { await c.resume() } catch { /* ignore */ }
  }
  return !!c && c.state === 'running'
}

function noiseBuffer(c: AudioContext, seconds: number) {
  const len = Math.floor(c.sampleRate * seconds)
  const buf = c.createBuffer(1, len, c.sampleRate)
  const d = buf.getChannelData(0)
  // brown noise: warmer than white, sounds like wheels on a floor
  let last = 0
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1
    last = (last + 0.02 * w) / 1.02
    d[i] = last * 3.5
  }
  return buf
}

/**
 * Plays the roll. `rollSec` is how long the chair travels, `settleAt` is when
 * it comes to rest (thunk + creak), both relative to now.
 */
export function playChairRoll(rollSec = 1.1, settleAt = 1.15, volume = 0.5) {
  const c = getCtx()
  if (!c || c.state !== 'running') return
  const t0 = c.currentTime + 0.02
  const out = c.createGain()
  out.gain.value = volume
  out.connect(c.destination)

  // 1. rumble: brown noise through a bandpass, loud at first, fading as it slows
  const rumble = c.createBufferSource()
  rumble.buffer = noiseBuffer(c, rollSec + 0.3)
  const bp = c.createBiquadFilter()
  bp.type = 'bandpass'
  bp.Q.value = 0.9
  bp.frequency.setValueAtTime(520, t0)
  bp.frequency.exponentialRampToValueAtTime(220, t0 + rollSec)
  const rg = c.createGain()
  rg.gain.setValueAtTime(0.0001, t0)
  rg.gain.exponentialRampToValueAtTime(0.9, t0 + 0.08)
  rg.gain.exponentialRampToValueAtTime(0.25, t0 + rollSec * 0.7)
  rg.gain.exponentialRampToValueAtTime(0.0001, t0 + rollSec + 0.15)
  rumble.connect(bp).connect(rg).connect(out)
  rumble.start(t0)
  rumble.stop(t0 + rollSec + 0.3)

  // 2. caster ticks: little clicks that get further apart as the chair slows
  const tick = noiseBuffer(c, 0.03)
  let t = 0.04
  let gap = 0.045
  while (t < rollSec) {
    const s = c.createBufferSource()
    s.buffer = tick
    const hp = c.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 1800
    const g = c.createGain()
    const amp = 0.35 * (1 - t / rollSec) + 0.05
    g.gain.setValueAtTime(amp * (0.6 + Math.random() * 0.4), t0 + t)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + t + 0.025)
    s.connect(hp).connect(g).connect(out)
    s.start(t0 + t)
    t += gap * (0.8 + Math.random() * 0.4)
    gap *= 1.09
  }

  // 3. thunk when it stops
  const ts = t0 + settleAt
  const thud = c.createOscillator()
  thud.type = 'sine'
  thud.frequency.setValueAtTime(110, ts)
  thud.frequency.exponentialRampToValueAtTime(55, ts + 0.18)
  const tg = c.createGain()
  tg.gain.setValueAtTime(0.0001, ts)
  tg.gain.exponentialRampToValueAtTime(0.55, ts + 0.01)
  tg.gain.exponentialRampToValueAtTime(0.0001, ts + 0.22)
  thud.connect(tg).connect(out)
  thud.start(ts)
  thud.stop(ts + 0.25)

  // 4. a small creak from the seat as she settles
  const cs = ts + 0.06
  const creak = c.createOscillator()
  creak.type = 'sawtooth'
  creak.frequency.setValueAtTime(380, cs)
  creak.frequency.linearRampToValueAtTime(300, cs + 0.16)
  creak.frequency.linearRampToValueAtTime(340, cs + 0.26)
  const cf = c.createBiquadFilter()
  cf.type = 'bandpass'
  cf.frequency.value = 900
  cf.Q.value = 6
  const cg = c.createGain()
  cg.gain.setValueAtTime(0.0001, cs)
  cg.gain.exponentialRampToValueAtTime(0.08, cs + 0.04)
  cg.gain.exponentialRampToValueAtTime(0.0001, cs + 0.3)
  creak.connect(cf).connect(cg).connect(out)
  creak.start(cs)
  creak.stop(cs + 0.32)
}
