# Yerküre

[Türkçe](README.tr.md)

**Real-time global situational awareness dashboard** — live news, geopolitical signals, markets and infrastructure on a 3D globe, in one screen. Turkish-first, with 30+ interface languages.

![Yerküre dashboard](docs/images/worldmonitor-7-mar-2026.jpg)

---

## What it does

- **Curated news feeds** across global and regional categories, distilled into short AI briefs
- **Dual map engine** — a 3D globe (globe.gl) and a WebGL flat map (deck.gl) sharing one layer catalog
- **Dozens of panels** — conflicts, earthquakes, internet outages, shipping chokepoints, military flights, energy, prediction markets and more
- **Cross-stream correlation** — military, economic, disaster and escalation signals converge into a single risk view
- **Country Instability Index** — live scores, bands and 24-hour movement for Tier-1 countries
- **Finance radar** — stock exchanges, commodities, crypto and a market composite
- **Local AI** — run everything with Ollama, no API keys required
- **Site variants** from one codebase (world, tech, finance, commodity, happy, energy)
- **Native desktop app** (Tauri 2) for macOS, Windows and Linux
- **Multilingual UI** with native-language feeds and RTL support — the Turkish translation has been fully reviewed

---

## Quick start

```bash
git clone https://github.com/xkudcobi/yerkure.git
cd yerkure
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) (override the port with `DEV_PORT` in `.env.local`). The app runs with no environment variables; feature-specific data sources may need credentials — see `.env.example`.

Variant-specific development:

```bash
npm run dev:tech
npm run dev:finance
npm run dev:commodity
npm run dev:happy
npm run dev:energy
```

To switch the interface to Turkish, pick **Türkçe** from the language menu in the header; the choice is remembered.

For the full Docker stack (Redis, relay, seeders) see [SELF_HOSTING.md](SELF_HOSTING.md).

---

## Tech stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Vanilla TypeScript, Vite, globe.gl + Three.js, deck.gl + MapLibre GL |
| **Desktop** | Tauri 2 (Rust) with a Node.js sidecar |
| **AI/ML** | Ollama / Groq / OpenRouter, Transformers.js (in-browser) |
| **API contracts** | Protocol Buffers with sebuf HTTP annotations |
| **Deployment** | Vercel Edge Functions, relay service, Tauri, PWA |
| **Caching** | Redis, 3-tier cache, CDN, service worker |

See [ARCHITECTURE.md](ARCHITECTURE.md) and [CONCEPTS.md](CONCEPTS.md) for details.

---

## Development

```bash
npm run typecheck        # type checking
npm run lint             # Biome + repo lint rules
npm run test:data        # data & unit tests
npm run build:full       # production build
```

Locale files live in `src/locales/`. `npm run sync:locales:check` verifies that every language has the same keys as `en.json`.

---

## License

**AGPL-3.0-only.** You may use, self-host, modify and redistribute this software, provided that you keep it under the AGPL and make the source available to users of any network deployment. See [LICENSE](LICENSE).

Yerküre is a modified version of [World Monitor](https://github.com/koala73/worldmonitor) by Elie Habib (Copyright © 2024–2026), forked on 21 September 2026 from release v2.10.0. Modifications — rebranding, the Turkish localisation review and this documentation — are Copyright © 2026 xkudcobi and released under the same license. "World Monitor" is not affiliated with or endorsing this project.
