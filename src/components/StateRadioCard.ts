/**
 * Ülke panelinde "Devlet Radyosu" kartı: ülkenin kamu yayıncısı istasyonlarını
 * listeler, tek tıkla canlı yayına bağlanır. Oynatma durumu `radio-player`
 * tek örneğinden gelir; kart kapansa da yayın sürer.
 */
import { getStateRadioStations, type StateRadioStation } from '@/config/state-radio';
import { t } from '@/services/i18n';
import { getRadioState, isPlayingStation, onRadioChange, playStation } from '@/services/radio-player';

const FOCUS_ICON: Record<StateRadioStation['focus'], string> = {
  news: '📰',
  general: '📻',
  culture: '🎭',
  music: '🎵',
};

export interface StateRadioCardHandle {
  element: HTMLElement;
  destroy: () => void;
}

export function renderStateRadioCard(countryCode: string): StateRadioCardHandle | null {
  const stations = getStateRadioStations(countryCode);
  if (stations.length === 0) return null;

  const card = document.createElement('section');
  card.className = 'cdp-card cdp-radio-card';
  card.dataset.briefSection = 'radio';

  const heading = document.createElement('h3');
  heading.className = 'cdp-card-title';
  heading.textContent = `📻 ${t('components.stateRadio.title')}`;
  const help = document.createElement('button');
  help.type = 'button';
  help.className = 'cdp-card-help';
  help.textContent = '?';
  help.title = t('components.stateRadio.help');
  help.setAttribute('aria-label', t('components.stateRadio.help'));
  heading.append(help);

  const list = document.createElement('ul');
  list.className = 'cdp-radio-list';

  const buttons = new Map<string, HTMLButtonElement>();
  for (const station of stations) {
    const item = document.createElement('li');
    item.className = 'cdp-radio-item';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cdp-radio-play';
    btn.dataset.url = station.url;
    btn.addEventListener('click', () => { void playStation(station, countryCode); });

    const icon = document.createElement('span');
    icon.className = 'cdp-radio-icon';
    icon.textContent = FOCUS_ICON[station.focus];

    const nameWrap = document.createElement('span');
    nameWrap.className = 'cdp-radio-name-wrap';
    const name = document.createElement('span');
    name.className = 'cdp-radio-name';
    name.textContent = station.name;
    const meta = document.createElement('span');
    meta.className = 'cdp-radio-meta';
    meta.textContent = `${station.broadcaster} · ${t(`components.stateRadio.focus.${station.focus}`)}`;
    nameWrap.append(name, meta);

    const stateLabel = document.createElement('span');
    stateLabel.className = 'cdp-radio-state';

    btn.append(icon, nameWrap, stateLabel);
    item.append(btn);
    list.append(item);
    buttons.set(station.url, btn);
  }

  const note = document.createElement('p');
  note.className = 'cdp-measure-note';
  note.textContent = t('components.stateRadio.note');

  card.append(heading, list, note);

  const sync = () => {
    const state = getRadioState();
    for (const [url, btn] of buttons) {
      const station = stations.find((s) => s.url === url);
      const active = station ? isPlayingStation(station) : false;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      const label = btn.querySelector('.cdp-radio-state');
      if (!label) continue;
      if (!active) {
        label.textContent = t('components.stateRadio.play');
        label.className = 'cdp-radio-state';
      } else if (state.status === 'loading') {
        label.textContent = t('components.stateRadio.connecting');
        label.className = 'cdp-radio-state is-loading';
      } else if (state.status === 'error') {
        label.textContent = t('components.stateRadio.error');
        label.className = 'cdp-radio-state is-error';
      } else {
        label.textContent = `● ${t('components.stateRadio.live')}`;
        label.className = 'cdp-radio-state is-live';
      }
    }
  };
  const unsubscribe = onRadioChange(sync);

  return { element: card, destroy: unsubscribe };
}
