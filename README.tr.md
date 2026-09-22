# Yerküre

[English](README.md)

**🌍 Canlı taslak: [yerkure.vercel.app](https://yerkure.vercel.app)** — geliştirme sürüyor; taslakta haber akışı ve arayüz canlıdır, veri panellerinin tamamı yerel kurulumda çalışır.

**Gerçek zamanlı küresel durum farkındalığı panosu** — canlı haberler, jeopolitik sinyaller, piyasalar ve altyapı; hepsi tek ekranda, üç boyutlu bir yerküre üzerinde. Türkçe öncelikli, 30'dan fazla arayüz diliyle.

![Yerküre panosu](docs/images/worldmonitor-7-mar-2026.jpg)

---

## Ne yapar?

- **Seçilmiş haber akışları** — küresel ve bölgesel kategorilerden toplanır, yapay zekâ ile kısa brifinglere dönüştürülür
- **Çift harita motoru** — ortak bir katman kataloğunu paylaşan 3B yerküre (globe.gl) ve WebGL düz harita (deck.gl)
- **Onlarca panel** — çatışmalar, depremler, internet kesintileri, deniz darboğazları, askeri uçuşlar, enerji, tahmin piyasaları ve daha fazlası
- **Çapraz akış ilişkilendirme** — askeri, ekonomik, afet ve tırmanma sinyalleri tek bir risk görünümünde birleşir
- **Ülke İstikrarsızlık Endeksi** — birinci kademe ülkeler için canlı puanlar, bantlar ve 24 saatlik değişim
- **Finans radarı** — borsalar, emtialar, kripto ve bileşik piyasa göstergesi
- **Yerel yapay zekâ** — Ollama ile her şey bilgisayarınızda çalışır, API anahtarı gerekmez
- **Tek kod tabanından site çeşitleri** — dünya, teknoloji, finans, emtia, iyi haberler, enerji
- **Yerel masaüstü uygulaması** (Tauri 2) — macOS, Windows ve Linux
- **Çok dilli arayüz** — ana dilde haber akışları ve sağdan sola yazım desteği; Türkçe çeviri baştan sona gözden geçirilmiştir

---

## Hızlı başlangıç

```bash
git clone https://github.com/xkudcobi/yerkure.git
cd yerkure
npm install
npm run dev
```

Tarayıcıda [localhost:3000](http://localhost:3000) adresini açın (portu `.env.local` içindeki `DEV_PORT` ile değiştirebilirsiniz). Uygulama hiçbir ortam değişkeni olmadan çalışır; bazı veri kaynakları için kimlik bilgisi gerekebilir, tam liste `.env.example` dosyasındadır.

Site çeşitlerini ayrı ayrı geliştirmek için:

```bash
npm run dev:tech       # teknoloji
npm run dev:finance    # finans
npm run dev:commodity  # emtia
npm run dev:happy      # iyi haberler
npm run dev:energy     # enerji
```

Arayüzü Türkçeye almak için üst çubuktaki dil menüsünden **Türkçe**'yi seçin; seçiminiz hatırlanır.

Tam Docker yığını (Redis, aktarıcı servisi, veri tohumlayıcılar) için [SELF_HOSTING.md](SELF_HOSTING.md) dosyasına bakın.

---

## Teknoloji yığını

| Alan | Teknolojiler |
|------|--------------|
| **Ön yüz** | Sade TypeScript, Vite, globe.gl + Three.js, deck.gl + MapLibre GL |
| **Masaüstü** | Tauri 2 (Rust) ve Node.js yardımcı süreci |
| **Yapay zekâ** | Ollama / Groq / OpenRouter, Transformers.js (tarayıcı içinde) |
| **API sözleşmeleri** | Protocol Buffers ve sebuf HTTP açıklamaları |
| **Dağıtım** | Vercel Edge Functions, aktarıcı servisi, Tauri, PWA |
| **Önbellek** | Redis, üç katmanlı önbellek, CDN, service worker |

Ayrıntılar için [ARCHITECTURE.md](ARCHITECTURE.md) ve [CONCEPTS.md](CONCEPTS.md) dosyalarına bakın.

---

## Geliştirme

```bash
npm run typecheck        # tip denetimi
npm run lint             # Biome ve depo kuralları
npm run test:data        # veri ve birim testleri
npm run build:full       # üretim derlemesi
```

Dil dosyaları `src/locales/` altındadır. `npm run sync:locales:check` komutu her dilin `en.json` ile aynı anahtarlara sahip olduğunu doğrular.

### Türkçe çeviri hakkında

Türkçe dil dosyası (`src/locales/tr.json`) bu çatalda elden geçirildi:

- Türkçe karakterleri kırpılmış yüzlerce metin ("Ulke", "yukleniyor", "Istikrarsizlik" gibi) düzeltildi
- Büyük harfli başlıklarda I/İ ayrımı uygulandı ("PİYASA DEĞERİ")
- İngilizce kalmış 300'den fazla anahtar çevrildi
- Kısaltmalar ve ürün adları (OSINT, GDELT, NOTAM, Product Hunt vb.) olduğu gibi bırakıldı

Bir hata görürseniz `tr.json` üzerinden düzeltme göndermeniz yeterli.

---

## Lisans

**AGPL-3.0-only.** Bu yazılımı kullanabilir, kendi sunucunuzda çalıştırabilir, değiştirebilir ve dağıtabilirsiniz; koşul, aynı lisansı korumanız ve ağ üzerinden sunduğunuz her kurulumun kaynak kodunu kullanıcılara açmanızdır. Ayrıntılar için [LICENSE](LICENSE).

Yerküre, Elie Habib tarafından geliştirilen [World Monitor](https://github.com/koala73/worldmonitor) projesinin (Telif Hakkı © 2024–2026) değiştirilmiş bir sürümüdür; 21 Eylül 2026'da v2.10.0 sürümünden çatallanmıştır. Yapılan değişiklikler — yeniden adlandırma, Türkçe yerelleştirme düzeltmeleri ve bu belgeler — © 2026 xkudcobi'ye aittir ve aynı lisansla sunulmaktadır. "World Monitor" bu projeyle bağlantılı değildir ve projeyi desteklediği anlamına gelmez.
