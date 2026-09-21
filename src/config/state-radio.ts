/**
 * Devlet / kamu yayıncılarının canlı radyo akışları, ISO 3166-1 alpha-2 ülke koduna göre.
 *
 * Kapsam bilinçli olarak dar tutulmuştur: yalnızca ülkenin resmî kamu yayıncısı
 * (TRT, BBC, Deutschlandfunk, Radio France, RAI, RNE, NPR ...). Ticari istasyonlar
 * yoktur. Her adres eklendiği gün `curl` ile doğrulanmıştır (bkz. `verifiedAt`);
 * `scripts/check-state-radio.mjs` aynı denetimi yeniden çalıştırır.
 *
 * `kind`: 'hls' → .m3u8 (hls.js ile), 'mp3' | 'aac' → doğrudan <audio>.
 */
export interface StateRadioStation {
  /** Görünen ad (yerelleştirilmez; markadır). */
  name: string;
  /** Yayıncı kuruluş. */
  broadcaster: string;
  url: string;
  kind: 'hls' | 'mp3' | 'aac';
  /** Kanalın niteliği: haber ağırlıklı mı, genel mi? Sıralamada haber öne alınır. */
  focus: 'news' | 'general' | 'culture' | 'music';
  /** Adres yalnızca HTTP ise HTTPS sayfada tarayıcı engeller; vekil gerekir. */
  insecure?: boolean;
}

export const STATE_RADIO_VERIFIED_AT = '2026-09-22';

export const STATE_RADIO: Record<string, StateRadioStation[]> = {
  TR: [
    { name: 'TRT Radyo Haber', broadcaster: 'TRT', url: 'https://radio-trtradyohaber.live.trt.com.tr/master.m3u8', kind: 'hls', focus: 'news' },
    { name: 'TRT Radyo 1', broadcaster: 'TRT', url: 'https://radio-trtradyo1.live.trt.com.tr/master.m3u8', kind: 'hls', focus: 'general' },
    { name: 'TRT FM', broadcaster: 'TRT', url: 'https://radio-trtfm.live.trt.com.tr/master.m3u8', kind: 'hls', focus: 'music' },
    { name: 'TRT Radyo 3', broadcaster: 'TRT', url: 'https://radio-trtradyo3.live.trt.com.tr/master.m3u8', kind: 'hls', focus: 'culture' },
    { name: 'TRT Nağme', broadcaster: 'TRT', url: 'https://radio-trtnagme.live.trt.com.tr/master.m3u8', kind: 'hls', focus: 'music' },
    { name: 'TRT Türkü', broadcaster: 'TRT', url: 'https://radio-trtturku.live.trt.com.tr/master.m3u8', kind: 'hls', focus: 'music' },
  ],
  GB: [
    { name: 'BBC World Service', broadcaster: 'BBC', url: 'http://stream.live.vc.bbcmedia.co.uk/bbc_world_service', kind: 'mp3', focus: 'news', insecure: true },
  ],
  DE: [
    { name: 'Deutschlandfunk', broadcaster: 'Deutschlandradio', url: 'https://st01.sslstream.dlf.de/dlf/01/128/mp3/stream.mp3', kind: 'mp3', focus: 'news' },
    { name: 'Deutschlandfunk Kultur', broadcaster: 'Deutschlandradio', url: 'https://st02.sslstream.dlf.de/dlf/02/128/mp3/stream.mp3', kind: 'mp3', focus: 'culture' },
    { name: 'Deutschlandfunk Nova', broadcaster: 'Deutschlandradio', url: 'https://st03.sslstream.dlf.de/dlf/03/128/mp3/stream.mp3', kind: 'mp3', focus: 'general' },
  ],
  FR: [
    { name: 'franceinfo', broadcaster: 'Radio France', url: 'https://icecast.radiofrance.fr/franceinfo-midfi.mp3', kind: 'mp3', focus: 'news' },
    { name: 'France Inter', broadcaster: 'Radio France', url: 'https://icecast.radiofrance.fr/franceinter-midfi.mp3', kind: 'mp3', focus: 'general' },
    { name: 'France Culture', broadcaster: 'Radio France', url: 'https://icecast.radiofrance.fr/franceculture-midfi.mp3', kind: 'mp3', focus: 'culture' },
  ],
  IT: [
    { name: 'Rai Radio 2', broadcaster: 'RAI', url: 'https://icestreaming.rai.it/2.mp3', kind: 'mp3', focus: 'general' },
    { name: 'Rai Radio 3', broadcaster: 'RAI', url: 'https://icestreaming.rai.it/3.mp3', kind: 'mp3', focus: 'culture' },
  ],
  ES: [
    { name: 'RNE Radio Nacional', broadcaster: 'RTVE', url: 'https://dispatcher.rndfnk.com/crtve/rne1/main/mp3/high', kind: 'mp3', focus: 'general' },
    { name: 'RNE Radio 5 Todo Noticias', broadcaster: 'RTVE', url: 'https://dispatcher.rndfnk.com/crtve/rne5/mad/mp3/high', kind: 'mp3', focus: 'news' },
  ],
  US: [
    { name: 'NPR News', broadcaster: 'NPR', url: 'https://npr-ice.streamguys1.com/live.mp3', kind: 'mp3', focus: 'news' },
  ],
  RU: [
    { name: 'Vesti FM', broadcaster: 'VGTRK', url: 'https://icecast-vgtrk.cdnvideo.ru/vestifm_mp3_192kbps', kind: 'mp3', focus: 'news' },
    { name: 'Radio Mayak', broadcaster: 'VGTRK', url: 'https://icecast-vgtrk.cdnvideo.ru/mayakfm_mp3_192kbps', kind: 'mp3', focus: 'general' },
    { name: 'Radio Rossii', broadcaster: 'VGTRK', url: 'https://icecast-vgtrk.cdnvideo.ru/rrzonam_mp3_192kbps', kind: 'mp3', focus: 'general' },
  ],
  CN: [
    { name: 'CNR Voice of China', broadcaster: 'China National Radio', url: 'http://ngcdn001.cnr.cn/live/zgzs/index.m3u8', kind: 'hls', focus: 'news', insecure: true },
  ],
  IN: [
    { name: 'All India Radio', broadcaster: 'Prasar Bharati', url: 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8', kind: 'hls', focus: 'news' },
  ],
  PK: [
    { name: 'Radio Pakistan', broadcaster: 'PBC', url: 'https://whmsonic.radio.gov.pk:8006/stream', kind: 'mp3', focus: 'news' },
  ],
  GR: [
    { name: 'ERT Proto Programma', broadcaster: 'ERT', url: 'https://radiostreaming.ert.gr/ert-proto', kind: 'mp3', focus: 'news' },
    { name: 'ERT Deftero', broadcaster: 'ERT', url: 'https://radiostreaming.ert.gr/ert-deftero', kind: 'mp3', focus: 'culture' },
  ],
  NL: [
    { name: 'NPO Radio 1', broadcaster: 'NPO', url: 'https://icecast.omroep.nl/radio1-bb-mp3', kind: 'mp3', focus: 'news' },
    { name: 'NPO Radio 2', broadcaster: 'NPO', url: 'https://icecast.omroep.nl/radio2-bb-mp3', kind: 'mp3', focus: 'music' },
  ],
  BE: [
    { name: 'VRT Radio 1', broadcaster: 'VRT', url: 'https://icecast.vrtcdn.be/radio1-high.mp3', kind: 'mp3', focus: 'news' },
    { name: 'RTBF La Première', broadcaster: 'RTBF', url: 'https://radios.rtbf.be/laprem1ere-128.mp3', kind: 'mp3', focus: 'news' },
  ],
  NO: [
    { name: 'NRK P1', broadcaster: 'NRK', url: 'https://lyd.nrk.no/nrk_radio_p1_ostlandssendingen_mp3_h', kind: 'mp3', focus: 'general' },
    { name: 'NRK P2', broadcaster: 'NRK', url: 'https://lyd.nrk.no/nrk_radio_p2_mp3_h', kind: 'mp3', focus: 'culture' },
  ],
  CZ: [
    { name: 'ČRo Radiožurnál', broadcaster: 'Český rozhlas', url: 'https://rozhlas.stream/radiozurnal_mp3_128.mp3', kind: 'mp3', focus: 'news' },
    { name: 'ČRo Plus', broadcaster: 'Český rozhlas', url: 'https://rozhlas.stream/plus_mp3_128.mp3', kind: 'mp3', focus: 'news' },
  ],
  HU: [
    { name: 'Kossuth Rádió', broadcaster: 'MTVA', url: 'https://icast.connectmedia.hu/4736/mr1.mp3', kind: 'mp3', focus: 'news' },
    { name: 'Petőfi Rádió', broadcaster: 'MTVA', url: 'https://icast.connectmedia.hu/4738/mr2.mp3', kind: 'mp3', focus: 'music' },
  ],
  RO: [
    { name: 'Radio România Actualități', broadcaster: 'SRR', url: 'http://stream2.srr.ro:8000/actualitati', kind: 'mp3', focus: 'news', insecure: true },
  ],
  PT: [
    { name: 'Antena 1', broadcaster: 'RTP', url: 'https://radiocast.rtp.pt/antena180a.mp3', kind: 'mp3', focus: 'news' },
    { name: 'Antena 2', broadcaster: 'RTP', url: 'https://radiocast.rtp.pt/antena280a.mp3', kind: 'mp3', focus: 'culture' },
  ],
  IE: [
    { name: 'RTÉ Radio 1', broadcaster: 'RTÉ', url: 'https://av.rasset.ie/av/live/radio/radio1.m3u8', kind: 'hls', focus: 'news' },
  ],
  CH: [
    { name: 'SRF 1', broadcaster: 'SRG SSR', url: 'https://stream.srg-ssr.ch/m/drs1/mp3_128', kind: 'mp3', focus: 'general' },
    { name: 'RTS La Première', broadcaster: 'SRG SSR', url: 'https://stream.srg-ssr.ch/m/la-1ere/mp3_128', kind: 'mp3', focus: 'general' },
  ],
  AT: [
    { name: 'Ö1', broadcaster: 'ORF', url: 'https://orf-live.ors-shoutcast.at/oe1-q2a', kind: 'mp3', focus: 'news' },
    { name: 'Ö3', broadcaster: 'ORF', url: 'https://orf-live.ors-shoutcast.at/oe3-q2a', kind: 'mp3', focus: 'music' },
  ],
  IL: [
    { name: 'Kan Bet', broadcaster: 'Kan', url: 'https://27743.live.streamtheworld.com/KAN_BET.mp3', kind: 'mp3', focus: 'news' },
    { name: 'Kan Reka', broadcaster: 'Kan', url: 'https://27743.live.streamtheworld.com/KAN_REKA.mp3', kind: 'mp3', focus: 'news' },
  ],
  ZA: [
    { name: 'SAfm', broadcaster: 'SABC', url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/SAFM.mp3', kind: 'mp3', focus: 'news' },
  ],
  AR: [
    { name: 'Radio Nacional', broadcaster: 'RTA', url: 'http://sa.mp3.icecast.magma.edge-access.net:7200/sc_rad1', kind: 'mp3', focus: 'general', insecure: true },
  ],
  SK: [
    { name: 'Rádio Slovensko', broadcaster: 'RTVS', url: 'https://icecast.stv.livebox.sk/slovensko_128.mp3', kind: 'mp3', focus: 'news' },
  ],
  SI: [
    { name: 'Radio Slovenija Prvi', broadcaster: 'RTV Slovenija', url: 'https://mp3.rtvslo.si/ra1', kind: 'aac', focus: 'general' },
  ],
  EE: [
    { name: 'Vikerraadio', broadcaster: 'ERR', url: 'https://icecast.err.ee/vikerraadio.mp3', kind: 'mp3', focus: 'general' },
  ],
  IS: [
    { name: 'RÚV Rás 1', broadcaster: 'RÚV', url: 'http://netradio.ruv.is/ras1.mp3', kind: 'mp3', focus: 'general', insecure: true },
  ],
  GE: [
    { name: 'Radio 1', broadcaster: 'Georgian Public Broadcaster', url: 'https://tv.cdn.xsg.ge/gpb-radio1/index.m3u8', kind: 'hls', focus: 'general' },
  ],
};

const FOCUS_ORDER: Record<StateRadioStation['focus'], number> = { news: 0, general: 1, culture: 2, music: 3 };

/** Ülkenin istasyonları, haber kanalları önce. Ülke yoksa boş dizi. */
export function getStateRadioStations(countryCode: string): StateRadioStation[] {
  const list = STATE_RADIO[countryCode.toUpperCase()] ?? [];
  return [...list].sort((a, b) => FOCUS_ORDER[a.focus] - FOCUS_ORDER[b.focus]);
}

export function hasStateRadio(countryCode: string): boolean {
  return (STATE_RADIO[countryCode.toUpperCase()]?.length ?? 0) > 0;
}
