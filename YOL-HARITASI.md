# Yerküre — Yol Haritası

> Son güncelleme: 22 Eylül 2026, gece. Bu belge canlı bir çalışma planıdır; her aşama
> bittiğinde işaretlenir. Kararların gerekçesi burada, teknik ayrıntı `ARCHITECTURE.md`'de.

## Hedef

Tek kullanıcılı, **kendi makinemizde/sunucumuzda çalışan**, **gerçekten anlık** güncellenen,
**baştan sona Türkçe** bir küresel durum panosu. Abonelik, "Pro", hesap, ödeme yok —
kullanıcı yöneticidir, her şey açıktır.

## Neden veriler bayattı? (teşhis)

World Monitor'ün veri hattı üç parçadır; `npm run dev` bunların yalnızca birini çalıştırır:

| Parça | Ne yapar | Dev modunda |
|---|---|---|
| Vite + API işleyicileri | Sayfa, `/api/*` uç noktaları, RSS vekili | ✅ çalışır |
| **Redis** (Upstash uyumlu) | Tüm panellerin okuduğu önbellek/veri deposu | ❌ yoktu → paneller boş/"bayat" |
| **Seeder'lar + AIS relay** | Dış kaynaklardan çekip Redis'e yazan döngüler | ❌ yoktu → veri hiç yenilenmiyordu |

Haber akışları RSS vekiliyle canlı geliyordu; ama piyasa, uçuş, gemi, CII, deprem, kablo,
enerji vb. panellerin tamamı Redis'ten okur. Redis olmadan "veri yok / stale" görünüyordu.

## Aşamalar

### ✅ 0. Ayrıştırma (22 Eyl)
- Proje `gitpro/projects/` dışına, `Masaüstü/yerkure/` altına taşındı; kendi git deposu.
- Marka: Yerküre. AGPL atfı README lisans bölümünde; haritadaki telif rozeti korunuyor.

### ✅ 1. Yönetici modu (22 Eyl)
- `src/services/admin-mode.ts`: `VITE_YERKURE_ADMIN=1` → `isProUser()`, `isEntitled()`,
  `hasTier()` her zaman doğru; Pro afişi ve giriş/kayıt düğmeleri hiç kurulmaz.
- Premium isteklere `VITE_YERKURE_ADMIN_KEY` başlığı; sunucu tarafında aynı anahtar
  `WORLDMONITOR_VALID_KEYS` içinde ("enterprise key" yolu, `api/_api-key.js`).
- Anahtarlar `.env` (compose) ve `.env.local` (vite) dosyalarında; ikisi de git dışında.

### ✅ 2. Canlı veri altyapısı — yerel (22 Eyl)
- `docker compose up -d redis redis-rest ais-relay` — Redis + REST vekili + AIS relay
  (relay içinde piyasa, havacılık, GPSJAM, CII, UCDP seed döngüleri sürekli çalışır).
- `docker-compose.override.yml`: relay portu (3004) ana makineye açık; relay, dev
  sunucusuna `host.docker.internal:3000` ile ulaşır.
- `bash scripts/run-seeders.sh` — ~150 seeder, ilk turda Redis'e ~1.000+ anahtar yazdı.
- ✅ Zamanlama: `docker-compose.override.yml` içindeki `seeders` servisi (Node 22) tüm seeder'ları
  30 dakikada bir döngüyle çalıştırır; Docker ayakta olduğu sürece kendiliğinden sürer.
  (Windows Görev Zamanlayıcı denendi; bu oturumda kalıcı sistem değişikliği izni yoktu —
  gerekirse `scripts/yerkure-seed.cmd` ile elle kurulabilir.)
- ⚠️ Node 24 / Windows: bazı seeder'lar çıkışta `UV_HANDLE_CLOSING` assertion'ı basıyor.
  Veri yazımı bundan önce tamamlanıyor; kozmetik ama "FAIL" sayıyor. Node 22 LTS ile
  çalıştırmak temizler (`nvm use 22`).

### ✅ 3. Türkiye haber paketi (22 Eyl)
- Yeni `turkiye` kategorisi/paneli: TRT Haber (3 akış), NTV, Habertürk (2), Sözcü,
  Cumhuriyet, Milliyet, Sabah, Euronews TR, BBC Türkçe, DW Türkçe, Bloomberg HT, Dünya,
  Yeni Şafak, Independent TR, Evrensel, Duvar, BirGün, Diken, Akşam, Karar, Yeniçağ, Star.
  Hepsi `curl` ile doğrulandı (AA'nın RSS'i bot koruması yüzünden dışarıda kaldı).
- Hem istemci kataloğu (`src/config/feeds.ts`) hem sunucu özeti (`server/.../_feeds.ts`).
- RSS vekili izin listesi 3 kopyada güncellendi (`shared/`, `scripts/shared/`, `api/`).

### ✅ 4. Devlet radyoları (22 Eyl)
- `src/config/state-radio.ts`: 30 ülke, ~55 istasyon; yalnızca kamu yayıncıları
  (TRT ×6, Deutschlandfunk, Radio France, RAI, RNE, NPR, BBC WS, VGTRK, CNR, AIR, ...).
  Her adres eklenmeden önce doğrulandı; doğrulanamayanlar (İsveç, Danimarka, Polonya,
  Kanada, Japonya, Kore, Brezilya...) bilerek listede yok.
- Ülke paneli → "📻 Devlet Radyosu" kartı; tek örnekli oynatıcı (`radio-player.ts`),
  HLS için hls.js; panel kapansa da sağ altta "şu an çalıyor" çubuğu.
- ⏳ HTTP (şifresiz) akışlar HTTPS dağıtımda tarayıcıca engellenir → küçük bir
  `/api/radio-proxy` gerekecek (yerelde http://localhost'ta sorun yok).

### ✅ 5. Türkçe tamamlama (büyük ölçüde)
- ✅ `tr.json`: 700+ kırpık-karakterli metin, 95 büyük-harf I/İ, 335 İngilizce anahtar.
- ✅ Ertelenmiş panel kabukları ve kanonik haber panelleri artık çevrili başlık kullanıyor
  (`panelDisplayName`).
- ✅ 11 harita katmanı etiketi 27 dile eklendi.
- ✅ Ülke brifingi paneli: 90+ sabit metin `countryBrief.ui.*` anahtarlarına taşındı
  (özet/tam brifing, konu sekmeleri, bölüm başlıkları, yükleniyor/boş durumları).
- ✅ Başlığı locale'de olmayan 45 panel için `panels.*` anahtarı eklendi; kurucular `t()` kullanıyor.
- ✅ Test politikası: Türkçe için kopya payı sıfır; diğer 26 dil için yeni anahtarlarda
  150'lik geçici İngilizce payı (`tests/app-locale-freshness.test.mjs`, `FORK_PLACEHOLDER_ALLOWANCE`).
- ⏳ Alt bilgi bağlantıları (Countries · Chokepoints · Pricing · Blog · Docs) — çoğu
  upstream'in kendi sitesine gidiyor; Yerküre için ya kaldırılacak ya yerel sayfaya bağlanacak.
- ⏳ Panel içi ikincil metinler (tooltip, boş durum, tablo başlıkları) panel panel taranacak.
- Kural: yeni metin eklerken İ/I ayrımı ve şapkalı harfler (yapay zekâ, harekât).

### ⏳ 6. Performans
- ✅ Varsayılan katmanlardan `canadaAlerts` çıkarıldı (13 → 12); "performans bildirimi" artık açılışta çıkmıyor.
- Sentry / Umami / Clerk / Convex istemci kodunu yönetici modunda hiç yükleme
  (`isClerkAuthEnabled()` zaten kapalı; Sentry DSN boş; Convex URL boş — doğrula).
- `en.shell.json` boyut bütçesi upstream'de de aşılmış (54 KB > 52 KB); önemsiz.
- OneDrive: `node_modules` ve `.git` senkronizasyonu makineyi yoruyor → klasörü OneDrive
  "her zaman bu cihazda tut / senkronizasyon dışı" yapmak ya da `C:\yerkure`'ye taşımak.

### ⏳ 7. Kalıcı çalışma ("her zaman açık")
Seçenek A — bu bilgisayar: Docker Desktop açılışta başlar, `restart: unless-stopped`
zaten var; seeder'lar Görev Zamanlayıcı ile 30 dk'da bir; dev yerine üretim derlemesi
(`docker compose up -d worldmonitor` → nginx + Node API, port 3000).
Seçenek B — küçük bir VPS (2 vCPU / 4 GB yeter): aynı compose dosyası, Caddy ile HTTPS.
Karar kullanıcının; B'de her şey kesintisiz ve telefondan da erişilir.

### ⏳ 8. Sadeleştirme
Kullanılmayan yüzeyler: Convex/faturalama, checkout, MCP sunucusu, SDK'lar (py/rb/go),
blog-site, Mintlify docs, Tauri masaüstü. Şimdilik dokunulmadı (testler ve derleme
birbirine bağlı). İlk hedef: derleme ve testlerden bunları kopararak repo'yu küçültmek.

### 💡 Fikir havuzu (sonra)
- **Sabah brifingi**: her sabah 07:00'de Türkiye + dünya için tek sayfalık yapay zekâ özeti
  (Groq ücretsiz; ya da yerel Ollama).
- **Radyo → haber köprüsü**: TRT Radyo Haber'i dinlerken haritada Türkiye odaklı katmanlar
  otomatik açılsın.
- **Deprem uyarısı**: AFAD/Kandilli RSS (USGS'ye ek) — Türkiye için daha hızlı ve yerel.
- **Sıcaklık haritası**: Türkiye haber yoğunluğunu il bazında göster (haber başlığından şehir
  eşleme; `shared/country-headline-match.ts` zaten var).
- **Telefonda**: PWA olarak ana ekrana ekle; yönetici modu anahtarı localStorage'a değil
  derlemeye gömülü olduğundan güvenli.

## Kullanıcının yapması gerekenler (ücretsiz anahtarlar)

`.env` ve `.env.local` dosyalarına — hepsi ücretsiz kayıt:

| Anahtar | Açar | Nereden |
|---|---|---|
| `GROQ_API_KEY` | Yapay zekâ brifingleri/özetler | console.groq.com |
| `NASA_FIRMS_API_KEY` | Uydu yangın tespiti | firms.modaps.eosdis.nasa.gov |
| `AISSTREAM_API_KEY` | Canlı gemi takibi | aisstream.io |
| `FINNHUB_API_KEY` | Hisse/borsa | finnhub.io |
| `FRED_API_KEY` | ABD makro serileri | fred.stlouisfed.org |
| `EIA_API_KEY` | Enerji stokları | eia.gov/opendata |
| `ACLED_EMAIL` + `ACLED_PASSWORD` | Çatışma olayları | acleddata.com |

Anahtarsız da çalışanlar: depremler, hava, doğal olaylar, UNHCR, tahmin piyasaları,
kripto, denizaltı kabloları, siber tehditler, tüm RSS haberleri, devlet radyoları.

## Günlük komutlar

```bash
docker compose up -d redis redis-rest ais-relay   # veri altyapısı
bash scripts/run-seeders.sh                        # verileri doldur (30 dk'da bir)
npm run dev                                        # http://localhost:3000
npx tsc --noEmit && npm run sync:locales:check     # her değişiklikten sonra
```
