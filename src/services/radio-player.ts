/**
 * Tek örnekli radyo oynatıcı.
 *
 * Uygulamada aynı anda yalnızca bir radyo çalar; ülke paneli kapansa bile yayın
 * sürer ve sağ altta küçük bir "şu an çalıyor" çubuğu görünür. HLS (.m3u8)
 * akışları Safari dışında hls.js ile açılır; mp3/aac doğrudan <audio>'ya verilir.
 */
import type { StateRadioStation } from '@/config/state-radio';
import { t } from '@/services/i18n';

export type RadioStatus = 'idle' | 'loading' | 'playing' | 'error';

export interface RadioState {
  status: RadioStatus;
  station: StateRadioStation | null;
  countryCode: string | null;
}

type Listener = (state: RadioState) => void;

let audio: HTMLAudioElement | null = null;
let hls: import('hls.js').default | null = null;
let state: RadioState = { status: 'idle', station: null, countryCode: null };
const listeners = new Set<Listener>();
let bar: HTMLElement | null = null;

function emit(next: Partial<RadioState>): void {
  state = { ...state, ...next };
  for (const fn of listeners) fn(state);
  renderBar();
}

export function getRadioState(): RadioState {
  return state;
}

export function onRadioChange(fn: Listener): () => void {
  listeners.add(fn);
  fn(state);
  return () => { listeners.delete(fn); };
}

function ensureAudio(): HTMLAudioElement {
  if (audio) return audio;
  audio = new Audio();
  audio.preload = 'none';
  audio.crossOrigin = 'anonymous';
  audio.addEventListener('playing', () => emit({ status: 'playing' }));
  audio.addEventListener('waiting', () => { if (state.status !== 'idle') emit({ status: 'loading' }); });
  audio.addEventListener('error', () => emit({ status: 'error' }));
  audio.addEventListener('stalled', () => { if (state.status === 'playing') emit({ status: 'loading' }); });
  return audio;
}

function teardownSource(): void {
  if (hls) { hls.destroy(); hls = null; }
  if (audio) {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
  }
}

export function isPlayingStation(station: StateRadioStation): boolean {
  return state.station?.url === station.url && state.status !== 'idle' && state.status !== 'error';
}

export async function playStation(station: StateRadioStation, countryCode: string): Promise<void> {
  if (isPlayingStation(station)) { stopRadio(); return; }
  const el = ensureAudio();
  teardownSource();
  emit({ status: 'loading', station, countryCode });
  try {
    if (station.kind === 'hls') {
      if (el.canPlayType('application/vnd.apple.mpegurl')) {
        el.src = station.url;
      } else {
        const { default: Hls } = await import('hls.js');
        if (!Hls.isSupported()) throw new Error('HLS unsupported');
        hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 30 });
        hls.on(Hls.Events.ERROR, (_evt, data) => {
          if (data.fatal) emit({ status: 'error' });
        });
        hls.loadSource(station.url);
        hls.attachMedia(el);
      }
    } else {
      el.src = station.url;
    }
    await el.play();
  } catch {
    emit({ status: 'error' });
  }
}

export function stopRadio(): void {
  teardownSource();
  emit({ status: 'idle', station: null, countryCode: null });
}

// --- Küçük "şu an çalıyor" çubuğu -------------------------------------------

function renderBar(): void {
  if (typeof document === 'undefined') return;
  if (state.status === 'idle') {
    bar?.remove();
    bar = null;
    return;
  }
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'radio-now-bar';
    bar.setAttribute('role', 'status');
    document.body.appendChild(bar);
  }
  const station = state.station;
  const label = state.status === 'error'
    ? t('components.stateRadio.error')
    : state.status === 'loading'
      ? t('components.stateRadio.connecting')
      : t('components.stateRadio.nowPlaying');
  bar.replaceChildren();
  const dot = document.createElement('span');
  dot.className = `radio-now-dot radio-now-dot-${state.status}`;
  const text = document.createElement('span');
  text.className = 'radio-now-text';
  const strong = document.createElement('strong');
  strong.textContent = station?.name ?? '';
  const meta = document.createElement('span');
  meta.textContent = ` · ${station?.broadcaster ?? ''} — ${label}`;
  text.append(strong, meta);
  const stop = document.createElement('button');
  stop.type = 'button';
  stop.className = 'radio-now-stop';
  stop.textContent = t('components.stateRadio.stop');
  stop.setAttribute('aria-label', t('components.stateRadio.stop'));
  stop.addEventListener('click', stopRadio);
  bar.append(dot, text, stop);
}
