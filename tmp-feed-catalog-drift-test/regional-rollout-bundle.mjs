// <define:import.meta.env>
var define_import_meta_env_default = { DEV: false, PROD: true, SSR: false, MODE: "test", BASE_URL: "/", VITE_VARIANT: "full", VITE_RSS_DIRECT_TO_RELAY: "false" };

// src/config/variant.ts
var SITE_VARIANTS = ["full", "tech", "finance", "happy", "commodity", "energy"];
function isSiteVariant(value) {
  return typeof value === "string" && SITE_VARIANTS.includes(value);
}
var buildVariant = (() => {
  try {
    return define_import_meta_env_default.VITE_VARIANT || "full";
  } catch {
    return "full";
  }
})();
function loadStoredVariant() {
  try {
    return localStorage.getItem("worldmonitor-variant");
  } catch {
    return null;
  }
}
var SITE_VARIANT = (() => {
  if (typeof window === "undefined") return buildVariant;
  const isTauri = "__TAURI_INTERNALS__" in window || "__TAURI__" in window;
  if (isTauri) {
    const stored = loadStoredVariant();
    if (isSiteVariant(stored)) return stored;
    return buildVariant;
  }
  const h = window.location?.hostname;
  if (!h) return buildVariant;
  if (h.startsWith("tech.")) return "tech";
  if (h.startsWith("finance.")) return "finance";
  if (h.startsWith("happy.")) return "happy";
  if (h.startsWith("commodity.")) return "commodity";
  if (h.startsWith("energy.")) return "energy";
  if (h === "localhost" || h === "127.0.0.1") {
    const stored = loadStoredVariant();
    if (isSiteVariant(stored)) return stored;
    return buildVariant;
  }
  return "full";
})();

// stub:stub-utils
function rssProxyUrl(url) {
  return url;
}

// src/config/feed-resolution.ts
function feedKey(feed) {
  return typeof feed.url === "string" ? feed.url : JSON.stringify(feed.url);
}
function mergeCanonicalFeeds(variantMaps) {
  const merged = {};
  for (const map of variantMaps) {
    for (const [category, feeds] of Object.entries(map)) {
      if (!Array.isArray(feeds)) continue;
      const bucket = merged[category] ?? (merged[category] = []);
      const seen = new Set(bucket.map(feedKey));
      for (const feed of feeds) {
        const key = feedKey(feed);
        if (!seen.has(key)) {
          bucket.push(feed);
          seen.add(key);
        }
      }
    }
  }
  return merged;
}

// shared/source-provenance-declarations.ts
var CONFIGURED_SOURCE_PROVENANCE_DECLARATIONS = Object.freeze({
  "+972 Magazine": { risk: "reviewed", type: "reviewed" },
  "14ymedio": { risk: "reviewed", type: "reviewed" },
  "20VC Episodes": { risk: "unknown", type: "unknown" },
  "24.hu": { risk: "unknown", type: "reviewed" },
  "36Kr English": { risk: "unknown", type: "reviewed" },
  "444.hu": { risk: "unknown", type: "reviewed" },
  "500 Global News": { risk: "unknown", type: "unknown" },
  "a16z Blog": { risk: "unknown", type: "unknown" },
  "a16z Insights": { risk: "unknown", type: "unknown" },
  "Aaj Tak": { risk: "unknown", type: "reviewed" },
  "ABC News": { risk: "unknown", type: "unknown" },
  "ABC News Australia": { risk: "unknown", type: "unknown" },
  "Acquired Episodes": { risk: "unknown", type: "unknown" },
  "Actualite.cd": { risk: "unknown", type: "unknown" },
  "ActuNiger": { risk: "reviewed", type: "reviewed" },
  "Africa News": { risk: "unknown", type: "unknown" },
  "Africa Startups": { risk: "unknown", type: "unknown" },
  "Africa Tech News": { risk: "unknown", type: "unknown" },
  "Africanews": { risk: "unknown", type: "unknown" },
  "Aftenposten": { risk: "reviewed", type: "reviewed" },
  "Agriculture": { risk: "unknown", type: "unknown" },
  "AI Interviews": { risk: "unknown", type: "unknown" },
  "AI News": { risk: "unknown", type: "reviewed" },
  "AI Now Institute": { risk: "unknown", type: "reviewed" },
  "AI Podcasts": { risk: "unknown", type: "unknown" },
  "AI Regulation": { risk: "unknown", type: "unknown" },
  "AI Weekly": { risk: "unknown", type: "unknown" },
  "A\xEFr Info": { risk: "reviewed", type: "reviewed" },
  "Al Arabiya": { risk: "reviewed", type: "reviewed" },
  "Al Jazeera": { risk: "reviewed", type: "reviewed" },
  "All-In Podcast": { risk: "unknown", type: "reviewed" },
  "Aluminum & Zinc": { risk: "unknown", type: "unknown" },
  "Alwihda Info": { risk: "reviewed", type: "reviewed" },
  "Amar Ujala": { risk: "unknown", type: "reviewed" },
  "AMNA": { risk: "reviewed", type: "reviewed" },
  "Amu TV": { risk: "reviewed", type: "reviewed" },
  "AngelList News": { risk: "unknown", type: "unknown" },
  "Annahar": { risk: "reviewed", type: "reviewed" },
  "ANSA": { risk: "unknown", type: "reviewed" },
  "Anthropic News": { risk: "unknown", type: "unknown" },
  "AP Mexico": { risk: "unknown", type: "unknown" },
  "AP News": { risk: "reviewed", type: "reviewed" },
  "Arab News": { risk: "unknown", type: "unknown" },
  "Arabian Business": { risk: "unknown", type: "unknown" },
  "Arctic Today": { risk: "reviewed", type: "reviewed" },
  "Armenpress": { risk: "reviewed", type: "reviewed" },
  "Arms Control Assn": { risk: "unknown", type: "reviewed" },
  "Ars Technica": { risk: "unknown", type: "reviewed" },
  "ArXiv AI": { risk: "unknown", type: "reviewed" },
  "ArXiv ML": { risk: "unknown", type: "unknown" },
  "Asahi Shimbun": { risk: "unknown", type: "unknown" },
  "Asharq Business": { risk: "unknown", type: "unknown" },
  "Asharq News": { risk: "unknown", type: "unknown" },
  "Asia News": { risk: "unknown", type: "unknown" },
  "Asia Pacific Tech": { risk: "unknown", type: "unknown" },
  "Asia VC News": { risk: "unknown", type: "unknown" },
  "Atlantic Council": { risk: "unknown", type: "reviewed" },
  "ATV": { risk: "unknown", type: "reviewed" },
  "Australian Mining": { risk: "unknown", type: "unknown" },
  "AWS Status": { risk: "unknown", type: "unknown" },
  "Axios": { risk: "unknown", type: "reviewed" },
  "AyiboPost": { risk: "reviewed", type: "reviewed" },
  "Azertag": { risk: "reviewed", type: "reviewed" },
  "Balkan Insight": { risk: "unknown", type: "reviewed" },
  "Bangkok Post": { risk: "unknown", type: "unknown" },
  "Bank Research": { risk: "unknown", type: "unknown" },
  "Banking Rules": { risk: "unknown", type: "unknown" },
  "BBC Africa": { risk: "unknown", type: "unknown" },
  "BBC Afrique": { risk: "unknown", type: "unknown" },
  "BBC Asia": { risk: "unknown", type: "unknown" },
  "BBC Hindi": { risk: "unknown", type: "reviewed" },
  "BBC Latin America": { risk: "unknown", type: "unknown" },
  "BBC Middle East": { risk: "reviewed", type: "reviewed" },
  "BBC Mundo": { risk: "unknown", type: "reviewed" },
  "BBC Persian": { risk: "unknown", type: "unknown" },
  "BBC Russian": { risk: "unknown", type: "unknown" },
  "BBC Turkce": { risk: "unknown", type: "unknown" },
  "BBC World": { risk: "reviewed", type: "reviewed" },
  "Bellingcat": { risk: "reviewed", type: "reviewed" },
  "Benchmark Mineral": { risk: "unknown", type: "unknown" },
  "BHP News": { risk: "unknown", type: "unknown" },
  "Bihus.Info": { risk: "reviewed", type: "reviewed" },
  "Bild": { risk: "unknown", type: "unknown" },
  "Binance Announcements": { risk: "reviewed", type: "reviewed" },
  "Bitcoin Magazine": { risk: "unknown", type: "unknown" },
  "Blockchain Finance": { risk: "unknown", type: "unknown" },
  "Bloomberg Commodities": { risk: "unknown", type: "unknown" },
  "Bloomberg Crypto": { risk: "unknown", type: "unknown" },
  "Bloomberg Energy": { risk: "unknown", type: "unknown" },
  "Bloomberg Markets": { risk: "unknown", type: "unknown" },
  "BoE Watch": { risk: "unknown", type: "unknown" },
  "BoJ Watch": { risk: "unknown", type: "unknown" },
  "Bond Market": { risk: "unknown", type: "unknown" },
  "Brasil Paralelo": { risk: "reviewed", type: "reviewed" },
  "Brazil Tech": { risk: "unknown", type: "unknown" },
  "Breaking Defense": { risk: "reviewed", type: "reviewed" },
  "Brookings": { risk: "unknown", type: "reviewed" },
  "Brookings Tech": { risk: "unknown", type: "reviewed" },
  "Bulletin of Atomic Scientists": { risk: "unknown", type: "reviewed" },
  "Business Insider": { risk: "reviewed", type: "reviewed" },
  "Business Wire": { risk: "reviewed", type: "reviewed" },
  "Calgary Herald": { risk: "reviewed", type: "reviewed" },
  "Caracas Chronicles": { risk: "reviewed", type: "reviewed" },
  "Carnegie": { risk: "unknown", type: "reviewed" },
  "CB Insights": { risk: "unknown", type: "unknown" },
  "CB Insights Unicorn": { risk: "unknown", type: "unknown" },
  "CBC News": { risk: "reviewed", type: "reviewed" },
  "CBS News": { risk: "unknown", type: "unknown" },
  "CDC": { risk: "unknown", type: "reviewed" },
  "Central Bank Rates": { risk: "unknown", type: "unknown" },
  "Chainwire": { risk: "reviewed", type: "reviewed" },
  "Changelog": { risk: "unknown", type: "unknown" },
  "Channels TV": { risk: "unknown", type: "unknown" },
  "Chatham House": { risk: "unknown", type: "unknown" },
  "Chatham House Tech": { risk: "unknown", type: "reviewed" },
  "China Commodity Imports": { risk: "unknown", type: "unknown" },
  "China Mineral Policy": { risk: "unknown", type: "unknown" },
  "China Startups": { risk: "unknown", type: "unknown" },
  "China Tech Analysis": { risk: "unknown", type: "unknown" },
  "China Tech Giants": { risk: "unknown", type: "unknown" },
  "China Tech Policy": { risk: "unknown", type: "unknown" },
  "Chosun Ilbo": { risk: "unknown", type: "unknown" },
  "CISA": { risk: "reviewed", type: "reviewed" },
  "Citi Newsroom": { risk: "unknown", type: "unknown" },
  "Civil.ge": { risk: "reviewed", type: "reviewed" },
  "Clar\xEDn": { risk: "unknown", type: "unknown" },
  "Cloud Outages": { risk: "unknown", type: "unknown" },
  "CNA": { risk: "reviewed", type: "reviewed" },
  "CNAS": { risk: "unknown", type: "reviewed" },
  "CNBC": { risk: "unknown", type: "reviewed" },
  "CNBC Commodities": { risk: "unknown", type: "unknown" },
  "CNBC Tech": { risk: "unknown", type: "unknown" },
  "CNN Greece": { risk: "unknown", type: "reviewed" },
  "CNN World": { risk: "reviewed", type: "reviewed" },
  "Cobalt Market": { risk: "unknown", type: "unknown" },
  "Coinbase Blog": { risk: "reviewed", type: "reviewed" },
  "CoinDesk": { risk: "unknown", type: "unknown" },
  "Cointelegraph": { risk: "unknown", type: "unknown" },
  "Commodity Futures": { risk: "unknown", type: "unknown" },
  "Commodity Trading": { risk: "unknown", type: "unknown" },
  "Conservation Optimism": { risk: "unknown", type: "unknown" },
  "Copper Market": { risk: "unknown", type: "unknown" },
  "Corporate Bonds": { risk: "unknown", type: "unknown" },
  "Correctiv": { risk: "unknown", type: "reviewed" },
  "Corriere della Sera": { risk: "unknown", type: "reviewed" },
  "CP24": { risk: "reviewed", type: "reviewed" },
  "CrisisWatch": { risk: "unknown", type: "reviewed" },
  "Critical Mineral Companies": { risk: "unknown", type: "unknown" },
  "Crunchbase News": { risk: "unknown", type: "unknown" },
  "Crypto News": { risk: "unknown", type: "unknown" },
  "Crypto Regulation": { risk: "unknown", type: "unknown" },
  "CryptoSlate": { risk: "unknown", type: "unknown" },
  "CSIS": { risk: "unknown", type: "reviewed" },
  "CSIS Tech": { risk: "unknown", type: "reviewed" },
  "CTV News": { risk: "reviewed", type: "reviewed" },
  "Dabanga Sudan": { risk: "unknown", type: "unknown" },
  "Dagens Nyheter": { risk: "unknown", type: "reviewed" },
  "Daily Nation": { risk: "reviewed", type: "reviewed" },
  "Daily Sabah": { risk: "reviewed", type: "reviewed" },
  "Daily Trust": { risk: "unknown", type: "unknown" },
  "DailyGood": { risk: "unknown", type: "unknown" },
  "Dark Reading": { risk: "unknown", type: "unknown" },
  "Dawn": { risk: "unknown", type: "reviewed" },
  "De Telegraaf": { risk: "unknown", type: "reviewed" },
  "Decacorn News": { risk: "unknown", type: "unknown" },
  "Decrypt": { risk: "unknown", type: "unknown" },
  "Defense News": { risk: "unknown", type: "reviewed" },
  "Defense One": { risk: "reviewed", type: "reviewed" },
  "DeFi News": { risk: "unknown", type: "unknown" },
  "Demo Day News": { risk: "unknown", type: "unknown" },
  "Der Spiegel": { risk: "unknown", type: "reviewed" },
  "Dev Events": { risk: "unknown", type: "unknown" },
  "Dev.to": { risk: "unknown", type: "unknown" },
  "DevOps.com": { risk: "unknown", type: "unknown" },
  "DFRLab": { risk: "unknown", type: "reviewed" },
  "Dhaka Tribune": { risk: "reviewed", type: "reviewed" },
  "DHS": { risk: "unknown", type: "reviewed" },
  "Die Zeit": { risk: "unknown", type: "reviewed" },
  "Digi24": { risk: "reviewed", type: "reviewed" },
  "DigiChina": { risk: "unknown", type: "reviewed" },
  "DL News": { risk: "unknown", type: "unknown" },
  "Dnevnik": { risk: "reviewed", type: "reviewed" },
  "DOJ": { risk: "unknown", type: "reviewed" },
  "Dollar Watch": { risk: "unknown", type: "unknown" },
  "DR Nyheder": { risk: "reviewed", type: "reviewed" },
  "DW News": { risk: "reviewed", type: "reviewed" },
  "DW Turkish": { risk: "unknown", type: "unknown" },
  "Earnings Reports": { risk: "unknown", type: "unknown" },
  "ECB Watch": { risk: "unknown", type: "unknown" },
  "ECFR": { risk: "unknown", type: "unknown" },
  "Economic Data": { risk: "unknown", type: "unknown" },
  "Edmonton Journal": { risk: "reviewed", type: "reviewed" },
  "Efecto Cocuyo": { risk: "reviewed", type: "reviewed" },
  "EFF News": { risk: "unknown", type: "reviewed" },
  "Egypt Independent": { risk: "reviewed", type: "reviewed" },
  "EIA Reports": { risk: "unknown", type: "unknown" },
  "El Mundo": { risk: "unknown", type: "reviewed" },
  "El Pa\xEDs": { risk: "unknown", type: "reviewed" },
  "El Tiempo": { risk: "unknown", type: "unknown" },
  "El Universo": { risk: "unknown", type: "unknown" },
  "Enab Baladi English": { risk: "reviewed", type: "reviewed" },
  "Energy Crisis & Shortages": { risk: "unknown", type: "unknown" },
  "Energy Intel": { risk: "unknown", type: "unknown" },
  "Energy Sanctions": { risk: "unknown", type: "unknown" },
  "Engadget": { risk: "unknown", type: "unknown" },
  "ERR News": { risk: "reviewed", type: "reviewed" },
  "ERT": { risk: "reviewed", type: "reviewed" },
  "ESG in Mining": { risk: "unknown", type: "unknown" },
  "Ethiopia Insight": { risk: "unknown", type: "unknown" },
  "EU Commission Digital": { risk: "unknown", type: "unknown" },
  "EU Digital Policy": { risk: "unknown", type: "unknown" },
  "EU ISS": { risk: "unknown", type: "reviewed" },
  "EU Startups": { risk: "unknown", type: "reviewed" },
  "EU Tech Policy": { risk: "unknown", type: "unknown" },
  "Euractiv Digital": { risk: "unknown", type: "unknown" },
  "Eurasianet": { risk: "reviewed", type: "reviewed" },
  "EuroNews": { risk: "reviewed", type: "reviewed" },
  "EV Battery Supply": { risk: "unknown", type: "unknown" },
  "FAO GIEWS": { risk: "unknown", type: "reviewed" },
  "FAO News": { risk: "unknown", type: "unknown" },
  "Fars News": { risk: "unknown", type: "unknown" },
  "FAS": { risk: "unknown", type: "unknown" },
  "Fast Company": { risk: "unknown", type: "unknown" },
  "Federal Reserve": { risk: "unknown", type: "reviewed" },
  "FEMA": { risk: "unknown", type: "reviewed" },
  "Financial Post": { risk: "reviewed", type: "reviewed" },
  "Financial Regulation": { risk: "unknown", type: "unknown" },
  "Financial Times": { risk: "reviewed", type: "reviewed" },
  "FinTech LATAM": { risk: "unknown", type: "unknown" },
  "Fintech News": { risk: "unknown", type: "unknown" },
  "First Round Review": { risk: "unknown", type: "unknown" },
  "Focus Taiwan": { risk: "unknown", type: "reviewed" },
  "Folha de S.Paulo": { risk: "unknown", type: "unknown" },
  "Foreign Affairs": { risk: "unknown", type: "reviewed" },
  "Foreign Policy": { risk: "unknown", type: "reviewed" },
  "Forex News": { risk: "unknown", type: "unknown" },
  "Fortune Term Sheet": { risk: "unknown", type: "unknown" },
  "Fox Business": { risk: "reviewed", type: "reviewed" },
  "Fox News": { risk: "unknown", type: "unknown" },
  "FPRI": { risk: "unknown", type: "reviewed" },
  "France 24": { risk: "reviewed", type: "reviewed" },
  "France 24 Africa": { risk: "reviewed", type: "reviewed" },
  "France 24 Asia Pacific": { risk: "reviewed", type: "reviewed" },
  "France 24 LatAm": { risk: "reviewed", type: "reviewed" },
  "Freeport & Copper Miners": { risk: "unknown", type: "unknown" },
  "FT Energy": { risk: "unknown", type: "unknown" },
  "Futures Trading": { risk: "unknown", type: "unknown" },
  "FwdStart Newsletter": { risk: "unknown", type: "unknown" },
  "FX Empire Gold": { risk: "unknown", type: "unknown" },
  "G4Media": { risk: "reviewed", type: "reviewed" },
  "Gazeta Wyborcza": { risk: "reviewed", type: "reviewed" },
  "gCaptain": { risk: "unknown", type: "reviewed" },
  "Geo News": { risk: "unknown", type: "reviewed" },
  "GitHub Blog": { risk: "unknown", type: "unknown" },
  "GitHub Trending": { risk: "unknown", type: "unknown" },
  "GITOC": { risk: "unknown", type: "reviewed" },
  "Glencore & Vale": { risk: "unknown", type: "unknown" },
  "Global Central Banks": { risk: "unknown", type: "unknown" },
  "Global News": { risk: "reviewed", type: "reviewed" },
  "Globe and Mail": { risk: "reviewed", type: "reviewed" },
  "GlobeNewswire": { risk: "reviewed", type: "reviewed" },
  "GMF": { risk: "unknown", type: "reviewed" },
  "GNN Animals": { risk: "unknown", type: "unknown" },
  "GNN Earth": { risk: "unknown", type: "unknown" },
  "GNN Health": { risk: "unknown", type: "unknown" },
  "GNN Heroes": { risk: "unknown", type: "unknown" },
  "GNN Heroes Spotlight": { risk: "unknown", type: "unknown" },
  "GNN Science": { risk: "unknown", type: "unknown" },
  "Gold & Metals": { risk: "unknown", type: "unknown" },
  "Gold Majors": { risk: "unknown", type: "unknown" },
  "Gold Price News": { risk: "unknown", type: "unknown" },
  "Gold Silver Worlds": { risk: "unknown", type: "unknown" },
  "GoldSeek": { risk: "unknown", type: "unknown" },
  "Good Good Good": { risk: "unknown", type: "unknown" },
  "GOOD Magazine": { risk: "unknown", type: "unknown" },
  "Good News Network": { risk: "unknown", type: "unknown" },
  "Greater Good (Berkeley)": { risk: "unknown", type: "unknown" },
  "Guardian Africa": { risk: "reviewed", type: "reviewed" },
  "Guardian Americas": { risk: "unknown", type: "unknown" },
  "Guardian Australia": { risk: "unknown", type: "unknown" },
  "Guardian Caribbean": { risk: "reviewed", type: "reviewed" },
  "Guardian ME": { risk: "unknown", type: "reviewed" },
  "Guardian Pacific": { risk: "reviewed", type: "reviewed" },
  "Guardian World": { risk: "reviewed", type: "reviewed" },
  "Gulf FDI": { risk: "unknown", type: "unknown" },
  "Gulf Investments": { risk: "unknown", type: "unknown" },
  "Haaretz": { risk: "reviewed", type: "reviewed" },
  "Hacker News": { risk: "unknown", type: "reviewed" },
  "HaitiLibre English": { risk: "reviewed", type: "reviewed" },
  "Handelsblatt": { risk: "reviewed", type: "reviewed" },
  "Hard Fork (NYT)": { risk: "unknown", type: "reviewed" },
  "Havana Times": { risk: "reviewed", type: "reviewed" },
  "Hedge Fund News": { risk: "unknown", type: "unknown" },
  "Hiiraan Online": { risk: "unknown", type: "unknown" },
  "H\xEDrad\xF3": { risk: "unknown", type: "reviewed" },
  "HotNews": { risk: "reviewed", type: "reviewed" },
  "Housing Market": { risk: "unknown", type: "unknown" },
  "How I Built This": { risk: "unknown", type: "reviewed" },
  "Hromadske": { risk: "reviewed", type: "reviewed" },
  "Hromadske EN": { risk: "reviewed", type: "reviewed" },
  "Human Progress": { risk: "unknown", type: "unknown" },
  "Hurriyet": { risk: "unknown", type: "unknown" },
  "HVG": { risk: "unknown", type: "reviewed" },
  "IAEA": { risk: "reviewed", type: "reviewed" },
  "IEA Critical Minerals": { risk: "unknown", type: "unknown" },
  "IEA News": { risk: "unknown", type: "unknown" },
  "iefimerida": { risk: "unknown", type: "reviewed" },
  "in.gr": { risk: "unknown", type: "reviewed" },
  "Inc42 (India)": { risk: "unknown", type: "reviewed" },
  "Index.hr": { risk: "unknown", type: "reviewed" },
  "Index.hu": { risk: "unknown", type: "reviewed" },
  "India News Network": { risk: "unknown", type: "unknown" },
  "India Startups": { risk: "unknown", type: "unknown" },
  "India Tech News": { risk: "unknown", type: "unknown" },
  "India Tech Policy": { risk: "unknown", type: "unknown" },
  "Indian Express": { risk: "unknown", type: "unknown" },
  "Indonesia Nickel Policy": { risk: "unknown", type: "unknown" },
  "Indonesia Tech": { risk: "unknown", type: "unknown" },
  "Infobae Americas": { risk: "unknown", type: "unknown" },
  "InfoQ": { risk: "unknown", type: "unknown" },
  "InSight Crime": { risk: "unknown", type: "unknown" },
  "Interfax EN": { risk: "reviewed", type: "reviewed" },
  "Interfax RU": { risk: "reviewed", type: "reviewed" },
  "Investing.com News": { risk: "unknown", type: "unknown" },
  "IPO News": { risk: "unknown", type: "unknown" },
  "iPolitics": { risk: "reviewed", type: "reviewed" },
  "Iran International": { risk: "reviewed", type: "reviewed" },
  "IRNA": { risk: "reviewed", type: "reviewed" },
  "Iron Ore Market": { risk: "unknown", type: "unknown" },
  "Irrawaddy": { risk: "unknown", type: "reviewed" },
  "ISEAS (Singapore)": { risk: "unknown", type: "unknown" },
  "Island Times (Palau)": { risk: "unknown", type: "unknown" },
  "ISW": { risk: "reviewed", type: "reviewed" },
  "Jakarta Post": { risk: "unknown", type: "reviewed" },
  "Jamestown": { risk: "unknown", type: "reviewed" },
  "JAMnews": { risk: "reviewed", type: "reviewed" },
  "Janes": { risk: "reviewed", type: "reviewed" },
  "Japan Startups": { risk: "unknown", type: "unknown" },
  "Japan Tech News": { risk: "unknown", type: "unknown" },
  "Japan Today": { risk: "unknown", type: "unknown" },
  "Jerusalem Post": { risk: "reviewed", type: "reviewed" },
  "Jeune Afrique": { risk: "unknown", type: "unknown" },
  "Jin10": { risk: "reviewed", type: "reviewed" },
  "Jutarnji list": { risk: "unknown", type: "reviewed" },
  "Kathimerini": { risk: "unknown", type: "reviewed" },
  "Kitco Gold": { risk: "unknown", type: "unknown" },
  "Kitco News": { risk: "unknown", type: "unknown" },
  "Korea Startups": { risk: "unknown", type: "unknown" },
  "Korea Tech News": { risk: "unknown", type: "unknown" },
  "KrASIA": { risk: "unknown", type: "unknown" },
  "Krebs Security": { risk: "reviewed", type: "reviewed" },
  "Kyiv Independent": { risk: "reviewed", type: "reviewed" },
  "L'Orient Today": { risk: "reviewed", type: "reviewed" },
  "La Presse": { risk: "reviewed", type: "reviewed" },
  "La Silla Vac\xEDa": { risk: "unknown", type: "unknown" },
  "LATAM Startups": { risk: "unknown", type: "unknown" },
  "Latin America": { risk: "unknown", type: "unknown" },
  "LAVCA (LATAM)": { risk: "unknown", type: "unknown" },
  "Layoffs News": { risk: "unknown", type: "reviewed" },
  "Layoffs.fyi": { risk: "unknown", type: "reviewed" },
  "Le Devoir": { risk: "reviewed", type: "reviewed" },
  "Le Monde": { risk: "reviewed", type: "reviewed" },
  "Le Quotidien": { risk: "unknown", type: "unknown" },
  "leFaso.net": { risk: "reviewed", type: "reviewed" },
  "Lenny's Newsletter": { risk: "unknown", type: "unknown" },
  "Lex Fridman Tech": { risk: "unknown", type: "unknown" },
  "Liberal GR": { risk: "unknown", type: "reviewed" },
  "Libya Herald": { risk: "reviewed", type: "reviewed" },
  "Lighthouse Reports": { risk: "unknown", type: "reviewed" },
  "Lithium Market": { risk: "unknown", type: "unknown" },
  "Live Science": { risk: "unknown", type: "unknown" },
  "LME Metals": { risk: "unknown", type: "unknown" },
  "Lobsters": { risk: "unknown", type: "unknown" },
  "Lowy Institute": { risk: "unknown", type: "reviewed" },
  "LRT English": { risk: "reviewed", type: "reviewed" },
  "LSM English": { risk: "reviewed", type: "reviewed" },
  "M&A News": { risk: "unknown", type: "unknown" },
  "Maclean's": { risk: "reviewed", type: "reviewed" },
  "Mada Masr": { risk: "reviewed", type: "reviewed" },
  "Market Outlook": { risk: "unknown", type: "unknown" },
  "MarketWatch": { risk: "unknown", type: "reviewed" },
  "MarketWatch Tech": { risk: "unknown", type: "unknown" },
  "Masters of Scale": { risk: "unknown", type: "reviewed" },
  "Meduza": { risk: "reviewed", type: "reviewed" },
  "Mehr News": { risk: "reviewed", type: "unknown" },
  "MENA Startups": { risk: "unknown", type: "unknown" },
  "MENA Tech News": { risk: "unknown", type: "unknown" },
  "Messari": { risk: "unknown", type: "unknown" },
  "Metals Bulletin": { risk: "unknown", type: "unknown" },
  "Mexico News Daily": { risk: "reviewed", type: "reviewed" },
  "Mexico Security": { risk: "unknown", type: "unknown" },
  "Middle East Institute": { risk: "unknown", type: "unknown" },
  "MIIT (China)": { risk: "reviewed", type: "reviewed" },
  "Military Times": { risk: "unknown", type: "reviewed" },
  "Mine Web (SNL)": { risk: "unknown", type: "unknown" },
  "Mining & Resources": { risk: "unknown", type: "unknown" },
  "Mining Journal": { risk: "unknown", type: "unknown" },
  "Mining Regulation": { risk: "unknown", type: "unknown" },
  "Mining Technology": { risk: "unknown", type: "unknown" },
  "Mining Weekly": { risk: "unknown", type: "unknown" },
  "Mining.com": { risk: "unknown", type: "unknown" },
  "MIT Research": { risk: "unknown", type: "unknown" },
  "MIT Tech Policy": { risk: "unknown", type: "unknown" },
  "MIT Tech Review": { risk: "unknown", type: "reviewed" },
  "MOFCOM (China)": { risk: "reviewed", type: "reviewed" },
  "Mongabay": { risk: "unknown", type: "unknown" },
  "Montreal Gazette": { risk: "reviewed", type: "reviewed" },
  "Moscow Times": { risk: "reviewed", type: "reviewed" },
  "MyJoyOnline": { risk: "unknown", type: "unknown" },
  "N1 Croatia": { risk: "unknown", type: "reviewed" },
  "Naftemporiki": { risk: "unknown", type: "reviewed" },
  "Naharnet Lebanon": { risk: "reviewed", type: "reviewed" },
  "Nasdaq-100 & QQQ": { risk: "unknown", type: "unknown" },
  "National Post": { risk: "reviewed", type: "reviewed" },
  "Natural Gas & LNG": { risk: "unknown", type: "unknown" },
  "Natural Gas News": { risk: "unknown", type: "unknown" },
  "Nature News": { risk: "unknown", type: "unknown" },
  "NBC News": { risk: "unknown", type: "unknown" },
  "NDTV": { risk: "unknown", type: "unknown" },
  "NDTV India": { risk: "unknown", type: "reviewed" },
  "New Scientist": { risk: "unknown", type: "unknown" },
  "New Unicorns": { risk: "unknown", type: "unknown" },
  "News24": { risk: "unknown", type: "unknown" },
  "NewsMaker": { risk: "reviewed", type: "reviewed" },
  "NFT News": { risk: "unknown", type: "unknown" },
  "Nickel News": { risk: "unknown", type: "unknown" },
  "Nikkei Asia": { risk: "reviewed", type: "reviewed" },
  "Nikkei Tech": { risk: "unknown", type: "reviewed" },
  "Northern Miner": { risk: "unknown", type: "unknown" },
  "NOS Nieuws": { risk: "unknown", type: "reviewed" },
  "Novaya Gazeta Europe": { risk: "unknown", type: "unknown" },
  "NPR News": { risk: "unknown", type: "reviewed" },
  "NQ Influence Basket": { risk: "unknown", type: "unknown" },
  "NRC": { risk: "unknown", type: "reviewed" },
  "NRK": { risk: "reviewed", type: "reviewed" },
  "NTI": { risk: "unknown", type: "unknown" },
  "Nuclear Energy": { risk: "unknown", type: "unknown" },
  "NV EN": { risk: "reviewed", type: "reviewed" },
  "O Globo": { risk: "unknown", type: "unknown" },
  "OC Media": { risk: "reviewed", type: "reviewed" },
  "OCCRP": { risk: "unknown", type: "reviewed" },
  "OECD Digital": { risk: "unknown", type: "reviewed" },
  "Oil & Gas": { risk: "unknown", type: "unknown" },
  "OilPrice.com": { risk: "unknown", type: "unknown" },
  "OKO.press": { risk: "reviewed", type: "reviewed" },
  "Oman Observer": { risk: "unknown", type: "unknown" },
  "Onet": { risk: "reviewed", type: "reviewed" },
  "OPEC & Crude": { risk: "unknown", type: "unknown" },
  "OPEC News": { risk: "unknown", type: "unknown" },
  "Open Source News": { risk: "unknown", type: "unknown" },
  "OpenAI News": { risk: "unknown", type: "unknown" },
  "Optimist Daily": { risk: "unknown", type: "unknown" },
  "Options Market": { risk: "unknown", type: "unknown" },
  "ORF Tech (India)": { risk: "unknown", type: "unknown" },
  "Oryx OSINT": { risk: "unknown", type: "reviewed" },
  "Ottawa Citizen": { risk: "reviewed", type: "reviewed" },
  "Pajhwok Afghan News": { risk: "reviewed", type: "reviewed" },
  "PAP": { risk: "reviewed", type: "reviewed" },
  "Paul Graham Essays": { risk: "unknown", type: "unknown" },
  "PBoC Watch": { risk: "unknown", type: "unknown" },
  "PBS NewsHour": { risk: "unknown", type: "unknown" },
  "Pentagon": { risk: "unknown", type: "reviewed" },
  "Pipelines & Chokepoints": { risk: "unknown", type: "unknown" },
  "PitchBook News": { risk: "unknown", type: "unknown" },
  "Pivot Podcast": { risk: "unknown", type: "unknown" },
  "Politico": { risk: "unknown", type: "reviewed" },
  "Politico Tech": { risk: "unknown", type: "reviewed" },
  "Polityka": { risk: "reviewed", type: "reviewed" },
  "Polsat News": { risk: "unknown", type: "unknown" },
  "Port & Logistics": { risk: "unknown", type: "unknown" },
  "Port & Terminal": { risk: "unknown", type: "unknown" },
  "Portfolio.hu": { risk: "unknown", type: "reviewed" },
  "Positive.News": { risk: "unknown", type: "unknown" },
  "PR Newswire": { risk: "reviewed", type: "reviewed" },
  "Precious Metals": { risk: "unknown", type: "unknown" },
  "Premium Times": { risk: "unknown", type: "unknown" },
  "Primicias": { risk: "unknown", type: "unknown" },
  "Private Equity": { risk: "unknown", type: "unknown" },
  "Product Hunt": { risk: "unknown", type: "unknown" },
  "Proto Thema": { risk: "unknown", type: "reviewed" },
  "Radio Ndeke Luka": { risk: "reviewed", type: "reviewed" },
  "Radio Okapi": { risk: "unknown", type: "unknown" },
  "Radio Tamazuj": { risk: "unknown", type: "unknown" },
  "Radio-Canada": { risk: "reviewed", type: "reviewed" },
  "RAND": { risk: "unknown", type: "reviewed" },
  "Ransomware.live": { risk: "unknown", type: "unknown" },
  "Rappler": { risk: "unknown", type: "reviewed" },
  "Rare Earths News": { risk: "unknown", type: "unknown" },
  "Reasons to be Cheerful": { risk: "unknown", type: "unknown" },
  "Refinery & Disruptions": { risk: "unknown", type: "unknown" },
  "Renaissance IPO": { risk: "unknown", type: "unknown" },
  "Repubblica": { risk: "unknown", type: "reviewed" },
  "Resource World": { risk: "unknown", type: "unknown" },
  "Responsible Statecraft": { risk: "unknown", type: "reviewed" },
  "Reuters Asia": { risk: "unknown", type: "unknown" },
  "Reuters Business": { risk: "unknown", type: "reviewed" },
  "Reuters Commodities": { risk: "unknown", type: "unknown" },
  "Reuters Crypto": { risk: "unknown", type: "unknown" },
  "Reuters Energy": { risk: "unknown", type: "unknown" },
  "Reuters India": { risk: "unknown", type: "unknown" },
  "Reuters LatAm": { risk: "unknown", type: "unknown" },
  "Reuters Markets": { risk: "unknown", type: "unknown" },
  "Reuters Nasdaq Futures": { risk: "unknown", type: "reviewed" },
  "Reuters US": { risk: "unknown", type: "unknown" },
  "Reuters World": { risk: "unknown", type: "reviewed" },
  "RFE/RL Central Asia": { risk: "reviewed", type: "reviewed" },
  "RFI Afrique": { risk: "unknown", type: "unknown" },
  "RIETI (Japan)": { risk: "unknown", type: "unknown" },
  "Rigzone": { risk: "unknown", type: "unknown" },
  "Rio Tinto News": { risk: "unknown", type: "unknown" },
  "Risk & Volatility": { risk: "unknown", type: "unknown" },
  "RT": { risk: "reviewed", type: "reviewed" },
  "RT Russia": { risk: "reviewed", type: "reviewed" },
  "Rudaw": { risk: "unknown", type: "unknown" },
  "RUSI": { risk: "unknown", type: "reviewed" },
  "Rzeczpospolita": { risk: "unknown", type: "unknown" },
  "S&P Global Commodity": { risk: "unknown", type: "unknown" },
  "S&P Global Platts": { risk: "unknown", type: "unknown" },
  "SaaStr": { risk: "unknown", type: "unknown" },
  "Sahel Crisis": { risk: "unknown", type: "unknown" },
  "Sana'a Center": { risk: "reviewed", type: "reviewed" },
  "Schneier": { risk: "unknown", type: "unknown" },
  "ScienceDaily": { risk: "unknown", type: "unknown" },
  "SEA Startups": { risk: "unknown", type: "unknown" },
  "SEA Tech News": { risk: "unknown", type: "unknown" },
  "SEC": { risk: "unknown", type: "reviewed" },
  "SEC Filings": { risk: "unknown", type: "unknown" },
  "Seed & Pre-Seed": { risk: "unknown", type: "unknown" },
  "Seeking Alpha": { risk: "unknown", type: "unknown" },
  "Seeking Alpha Metals": { risk: "unknown", type: "unknown" },
  "Seeking Alpha Tech": { risk: "unknown", type: "unknown" },
  "SemiAnalysis": { risk: "unknown", type: "unknown" },
  "Semiconductor News": { risk: "unknown", type: "unknown" },
  "Semiconductors": { risk: "unknown", type: "unknown" },
  "Sequoia Blog": { risk: "unknown", type: "unknown" },
  "Seznam Zpr\xE1vy": { risk: "reviewed", type: "reviewed" },
  "Shareable": { risk: "unknown", type: "unknown" },
  "Shipping & Freight": { risk: "unknown", type: "unknown" },
  "Show HN": { risk: "unknown", type: "unknown" },
  "Sifted (Europe)": { risk: "unknown", type: "reviewed" },
  "Silver Price News": { risk: "unknown", type: "unknown" },
  "SilverSeek": { risk: "unknown", type: "unknown" },
  "Singularity Hub": { risk: "unknown", type: "unknown" },
  "Slidstvo.Info": { risk: "reviewed", type: "reviewed" },
  "South China Morning Post": { risk: "unknown", type: "unknown" },
  "Sovereign Wealth": { risk: "unknown", type: "unknown" },
  "Stablecoin Policy": { risk: "unknown", type: "unknown" },
  "Stanford HAI": { risk: "unknown", type: "reviewed" },
  "Startup Funding": { risk: "unknown", type: "unknown" },
  "Startup School": { risk: "unknown", type: "unknown" },
  "Startups LATAM": { risk: "unknown", type: "unknown" },
  "State Dept": { risk: "reviewed", type: "reviewed" },
  "Stimson Center": { risk: "unknown", type: "reviewed" },
  "Stratechery": { risk: "unknown", type: "reviewed" },
  "Strategic Chokepoints": { risk: "unknown", type: "unknown" },
  "Studio Tamani": { risk: "reviewed", type: "reviewed" },
  "Sunny Skyz": { risk: "unknown", type: "unknown" },
  "Suspilne": { risk: "reviewed", type: "reviewed" },
  "Svenska Dagbladet": { risk: "unknown", type: "reviewed" },
  "SVT Nyheter": { risk: "unknown", type: "reviewed" },
  "Syria Direct": { risk: "reviewed", type: "reviewed" },
  "Ta Nea": { risk: "unknown", type: "reviewed" },
  "Tagesschau": { risk: "unknown", type: "reviewed" },
  "Taipei Times": { risk: "unknown", type: "reviewed" },
  "Taiwan News": { risk: "unknown", type: "reviewed" },
  "Taiwan Tech": { risk: "unknown", type: "unknown" },
  "Tanker & Shipping": { risk: "unknown", type: "unknown" },
  "Task & Purpose": { risk: "unknown", type: "reviewed" },
  "TASS": { risk: "reviewed", type: "reviewed" },
  "Tchadinfos": { risk: "reviewed", type: "reviewed" },
  "Tech Antitrust": { risk: "unknown", type: "unknown" },
  "Tech in Asia": { risk: "unknown", type: "reviewed" },
  "Tech IPO News": { risk: "unknown", type: "unknown" },
  "Tech Newsletters": { risk: "unknown", type: "unknown" },
  "Tech.eu": { risk: "unknown", type: "reviewed" },
  "TechCabal (Africa)": { risk: "unknown", type: "reviewed" },
  "TechCrunch": { risk: "unknown", type: "unknown" },
  "TechCrunch Layoffs": { risk: "unknown", type: "reviewed" },
  "TechCrunch Startups": { risk: "unknown", type: "unknown" },
  "TechCrunch Venture": { risk: "unknown", type: "unknown" },
  "TechMeme": { risk: "unknown", type: "unknown" },
  "Techstars News": { risk: "unknown", type: "unknown" },
  "Telegraph": { risk: "reviewed", type: "reviewed" },
  "Telex": { risk: "unknown", type: "reviewed" },
  "Thai PBS": { risk: "unknown", type: "unknown" },
  "The Astana Times": { risk: "reviewed", type: "reviewed" },
  "The Better India": { risk: "unknown", type: "unknown" },
  "The Block": { risk: "unknown", type: "unknown" },
  "The Daily Star": { risk: "reviewed", type: "reviewed" },
  "The Defiant": { risk: "unknown", type: "unknown" },
  "The Diplomat": { risk: "unknown", type: "reviewed" },
  "The Guardian Post": { risk: "reviewed", type: "reviewed" },
  "The Hacker News": { risk: "reviewed", type: "reviewed" },
  "The Hill": { risk: "unknown", type: "unknown" },
  "The Hindu": { risk: "unknown", type: "unknown" },
  "The Information": { risk: "unknown", type: "unknown" },
  "The Narwhal": { risk: "reviewed", type: "reviewed" },
  "The National": { risk: "unknown", type: "unknown" },
  "The New Stack": { risk: "unknown", type: "unknown" },
  "The Next Web": { risk: "unknown", type: "reviewed" },
  "The Province": { risk: "reviewed", type: "reviewed" },
  "The Reporter Ethiopia": { risk: "unknown", type: "unknown" },
  "The Sentry": { risk: "unknown", type: "reviewed" },
  "The Star (Malaysia)": { risk: "unknown", type: "reviewed" },
  "The Times of Central Asia": { risk: "reviewed", type: "reviewed" },
  "The Tyee": { risk: "reviewed", type: "reviewed" },
  "The Verge": { risk: "unknown", type: "reviewed" },
  "The Verge AI": { risk: "unknown", type: "reviewed" },
  "The War Zone": { risk: "reviewed", type: "reviewed" },
  "ThisDay": { risk: "unknown", type: "unknown" },
  "Times of India": { risk: "reviewed", type: "reviewed" },
  "Tom's Hardware": { risk: "unknown", type: "unknown" },
  "Toronto Star": { risk: "reviewed", type: "reviewed" },
  "Trade & Tariffs": { risk: "unknown", type: "unknown" },
  "Trade Routes": { risk: "unknown", type: "unknown" },
  "Trading Tech": { risk: "unknown", type: "unknown" },
  "Treasury": { risk: "unknown", type: "reviewed" },
  "Treasury Watch": { risk: "unknown", type: "unknown" },
  "Trump - Truth Social": { risk: "unknown", type: "unknown" },
  "Tuoi Tre News": { risk: "unknown", type: "unknown" },
  "TVA Nouvelles": { risk: "reviewed", type: "reviewed" },
  "TVN24": { risk: "unknown", type: "unknown" },
  "TVP Info": { risk: "reviewed", type: "reviewed" },
  "TWIST Episodes": { risk: "unknown", type: "unknown" },
  "U.S. Trade Representative": { risk: "reviewed", type: "reviewed" },
  "UK MOD": { risk: "reviewed", type: "reviewed" },
  "UK Tech Policy": { risk: "unknown", type: "unknown" },
  "Ukrainska Pravda": { risk: "reviewed", type: "reviewed" },
  "Ukrainska Pravda EN": { risk: "reviewed", type: "reviewed" },
  "Ukrinform": { risk: "reviewed", type: "reviewed" },
  "UN News": { risk: "reviewed", type: "reviewed" },
  "Unchained": { risk: "unknown", type: "unknown" },
  "UNHCR": { risk: "unknown", type: "reviewed" },
  "Unicorn News": { risk: "unknown", type: "unknown" },
  "Upworthy": { risk: "unknown", type: "unknown" },
  "Uranium Market": { risk: "unknown", type: "unknown" },
  "USNI News": { risk: "unknown", type: "reviewed" },
  "Vancouver Sun": { risk: "reviewed", type: "reviewed" },
  "Vanguard Nigeria": { risk: "unknown", type: "unknown" },
  "VC Insights": { risk: "unknown", type: "unknown" },
  "VC News": { risk: "unknown", type: "unknown" },
  "VentureBeat": { risk: "unknown", type: "unknown" },
  "VentureBeat AI": { risk: "unknown", type: "reviewed" },
  "Verge Shows": { risk: "unknown", type: "unknown" },
  "Vietnam Tech": { risk: "unknown", type: "unknown" },
  "Vision 2030": { risk: "unknown", type: "unknown" },
  "VnExpress": { risk: "unknown", type: "unknown" },
  "VSquare": { risk: "unknown", type: "reviewed" },
  "WAFA English": { risk: "reviewed", type: "reviewed" },
  "Wall Street Journal": { risk: "reviewed", type: "reviewed" },
  "War on the Rocks": { risk: "unknown", type: "reviewed" },
  "Welt": { risk: "reviewed", type: "reviewed" },
  "White House": { risk: "unknown", type: "reviewed" },
  "White House Actions": { risk: "unknown", type: "reviewed" },
  "WHO": { risk: "unknown", type: "reviewed" },
  "Wilson Center": { risk: "unknown", type: "reviewed" },
  "Winnipeg Free Press": { risk: "reviewed", type: "reviewed" },
  "Wired": { risk: "reviewed", type: "reviewed" },
  "World Gold Council": { risk: "unknown", type: "unknown" },
  "Wu Blockchain": { risk: "unknown", type: "unknown" },
  "Xinhua": { risk: "reviewed", type: "reviewed" },
  "Y Combinator Blog": { risk: "unknown", type: "unknown" },
  "Yahoo Finance": { risk: "unknown", type: "reviewed" },
  "YC Launches": { risk: "unknown", type: "unknown" },
  "YC News": { risk: "unknown", type: "unknown" },
  "Yemen Online": { risk: "reviewed", type: "reviewed" },
  "Yes! Magazine": { risk: "unknown", type: "unknown" },
  "Yle News": { risk: "reviewed", type: "reviewed" },
  "Ynetnews": { risk: "reviewed", type: "unknown" },
  "Yonhap News": { risk: "unknown", type: "unknown" },
  "YourStory": { risk: "unknown", type: "reviewed" },
  "ZDNet": { risk: "unknown", type: "unknown" },
  "Zerkalo": { risk: "reviewed", type: "reviewed" },
  "Ziarul de Gard\u0103": { risk: "reviewed", type: "reviewed" },
  "ZN.UA": { risk: "reviewed", type: "reviewed" }
});

// shared/x-account-source-tiers.json
var x_account_source_tiers_default = {
  "Al Arabiya": 2,
  "Aurora Intel": 3,
  "BNO News": 1,
  CGTN: 3,
  "Clash Report": 3,
  CrowdStrike: 3,
  "Dark Web Informer": 3,
  DeepState: 3,
  "Department of War": 1,
  Haaretz: 2,
  IDF: 1,
  IRNA: 3,
  "Intel Crab": 3,
  "Jerusalem Post": 2,
  Kaspersky: 3,
  "Kyiv Independent": 2,
  LiveUAMap: 3,
  "Moscow Times": 2,
  NATO: 1,
  "New York Times": 2,
  "OSINT Technical": 3,
  OSINTdefender: 3,
  "Press TV": 3,
  "The CyberWire": 3,
  "The Economist": 2,
  "The Hacker News": 3,
  "Times of Israel": 2,
  "US CENTCOM": 1,
  "Washington Post": 2,
  "vx-underground": 3
};

// shared/x-account-trust.ts
var X_ACCOUNT_TRUST = [
  {
    sourceName: "Al Arabiya",
    tier: 2,
    type: "mainstream",
    risk: "medium",
    stateAffiliated: "Saudi Arabia",
    note: "Saudi-owned Gulf newsroom; established outlet, not a wire",
    reuseRisk: true
  },
  {
    sourceName: "Aurora Intel",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "OSINT aggregator; not a major established newsroom"
  },
  {
    sourceName: "BNO News",
    tier: 1,
    type: "wire",
    risk: "low",
    note: "Independent newsroom and subscription newswire; publisher history: https://bnonews.es/index.php/about-us/"
  },
  {
    sourceName: "Bloomberg",
    tier: 1,
    type: "wire",
    risk: "low",
    note: "Financial wire service with editorial standards",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "Breaking Defense",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Defense trade press; specialty desk, not a wire",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "CGTN",
    tier: 3,
    type: "mainstream",
    risk: "high",
    stateAffiliated: "China",
    note: "Chinese state broadcaster",
    reuseRisk: true
  },
  {
    sourceName: "CISA",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "USA",
    note: "Official US cybersecurity agency publisher; treat statements as government claims",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "CNN World",
    tier: 2,
    type: "mainstream",
    risk: "medium",
    note: "US cable news world desk; established outlet, not a wire",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "Clash Report",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Conflict OSINT aggregator; unverified battlefield claims are common"
  },
  {
    sourceName: "CrowdStrike",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Vendor threat-intel publisher; not independent journalism"
  },
  {
    sourceName: "Dark Web Informer",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Dark-web monitoring aggregator"
  },
  {
    sourceName: "DeepState",
    tier: 3,
    type: "intel",
    risk: "medium",
    knownBiases: ["Pro-Ukraine"],
    note: "Ukrainian OSINT mapping project; high-signal maps, not a wire service"
  },
  {
    sourceName: "Defense One",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Defense trade press; specialty desk, not a wire",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "Haaretz",
    tier: 2,
    type: "mainstream",
    risk: "low",
    knownBiases: ["Israeli left-liberal"],
    note: "Israeli newspaper of record with editorial standards"
  },
  {
    sourceName: "IAEA",
    tier: 1,
    type: "gov",
    risk: "medium",
    note: "UN nuclear watchdog official publisher; treat statements as institutional claims",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "IDF",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "Israel",
    note: "Official IDF publisher on X; treat statements as government claims, not independent observation"
  },
  {
    sourceName: "IRNA",
    tier: 3,
    type: "wire",
    risk: "high",
    stateAffiliated: "Iran",
    note: "Iranian state news agency",
    reuseRisk: true
  },
  {
    sourceName: "Intel Crab",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Military OSINT aggregator; treat as a lead"
  },
  {
    sourceName: "Iran International",
    tier: 3,
    type: "mainstream",
    risk: "medium",
    stateAffiliated: "Saudi Arabia",
    knownBiases: ["Iranian opposition"],
    note: "Saudi-funded Iranian exile broadcaster; established newsroom, not independent of a state sponsor",
    reuseTier: true
  },
  {
    sourceName: "Janes",
    tier: 3,
    type: "intel",
    risk: "low",
    note: "Defense intelligence publisher with editorial standards",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "Jerusalem Post",
    tier: 2,
    type: "mainstream",
    risk: "low",
    knownBiases: ["Israeli centre-right"],
    note: "English-language Israeli daily of record",
    reuseRisk: true
  },
  {
    sourceName: "Kaspersky",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Vendor research publisher; not independent journalism"
  },
  {
    sourceName: "Krebs Security",
    tier: 3,
    type: "intel",
    risk: "low",
    note: "Independent cybersecurity reporting",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "Kyiv Independent",
    tier: 2,
    type: "mainstream",
    risk: "medium",
    knownBiases: ["Pro-Ukraine"],
    note: "Ukrainian English-language primary",
    reuseType: true,
    reuseRisk: true
  },
  {
    sourceName: "LiveUAMap",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Live conflict-mapping aggregator; source quality varies by incident"
  },
  {
    sourceName: "Moscow Times",
    tier: 2,
    type: "mainstream",
    risk: "medium",
    knownBiases: ["Anti-Kremlin"],
    note: "Independent English-language Russian outlet, critical of Kremlin",
    reuseType: true,
    reuseRisk: true
  },
  {
    sourceName: "NATO",
    tier: 1,
    type: "gov",
    risk: "high",
    note: "Official NATO publisher; treat statements as alliance claims, not independent observation"
  },
  {
    sourceName: "NHK World",
    tier: 2,
    type: "mainstream",
    risk: "medium",
    stateAffiliated: "Japan",
    note: "Japanese public broadcaster English service",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "New York Times",
    tier: 2,
    type: "mainstream",
    risk: "low",
    note: "US newspaper of record with editorial standards"
  },
  {
    sourceName: "Nikkei Asia",
    tier: 2,
    type: "market",
    risk: "low",
    note: "Nikkei English-language Asia desk",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "OSINT Technical",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Technical OSINT aggregator; treat as a lead"
  },
  {
    sourceName: "OSINTdefender",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Military OSINT aggregator; treat as a lead"
  },
  {
    // Renamed from 'Pentagon' (#6654 follow-up). @PentagonPresSec no longer
    // exists: the department rebranded and the account is now @DeptofWar.
    // Beware the neighbours — @WarDepartment, @SecretaryOfWar and @thePentagon
    // are unrelated personal accounts with three-figure follower counts, so
    // only the id verified against the API belongs in a tier-1 slot.
    sourceName: "Department of War",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "USA",
    note: "Official US Department of War publisher; treat statements as government claims"
    // No reuse flags: 'Pentagon' could borrow the existing defense.gov RSS
    // masthead's type/risk, but 'Department of War' is a new public name with
    // no masthead behind it, so this entry must emit its own keys or the
    // account falls through to the tier-4 default and is dropped from alerts.
  },
  {
    sourceName: "Press TV",
    tier: 3,
    type: "mainstream",
    risk: "high",
    stateAffiliated: "Iran",
    note: "Iranian state media",
    reuseRisk: true
  },
  {
    sourceName: "State Dept",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "USA",
    note: "Official US State Department publisher; treat statements as government claims",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "The CyberWire",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Cybersecurity briefing specialist"
  },
  {
    sourceName: "The Economist",
    tier: 2,
    type: "mainstream",
    risk: "low",
    note: "Weekly news magazine with editorial standards"
  },
  {
    sourceName: "The Hacker News",
    tier: 3,
    type: "tech",
    risk: "medium",
    note: "Cybersecurity news specialist; not a general wire"
  },
  {
    sourceName: "The War Zone",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Defense specialty desk; not a wire",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "Times of Israel",
    tier: 2,
    type: "mainstream",
    risk: "low",
    knownBiases: ["Israeli mainstream"],
    note: "English-language Israeli newspaper"
  },
  {
    sourceName: "UK MOD",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "UK",
    note: "Official UK Ministry of Defence publisher; treat statements as government claims",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "UN News",
    tier: 1,
    type: "gov",
    risk: "medium",
    note: "Official UN news publisher; treat statements as institutional claims",
    reuseType: true,
    reuseTier: true
  },
  {
    sourceName: "US CENTCOM",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "USA",
    note: "Official US Central Command publisher; treat statements as government claims"
  },
  {
    sourceName: "Wall Street Journal",
    tier: 1,
    type: "market",
    risk: "low",
    note: "US business newspaper with editorial standards",
    reuseTier: true
  },
  {
    sourceName: "Washington Post",
    tier: 2,
    type: "mainstream",
    risk: "low",
    note: "US national newspaper with editorial standards"
  },
  {
    sourceName: "vx-underground",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Malware-research archive; technical primary, not a newsroom"
  }
];
function xRiskProfile(entry) {
  return {
    risk: entry.risk,
    ...entry.stateAffiliated ? { stateAffiliated: entry.stateAffiliated } : {},
    ...entry.knownBiases ? { knownBiases: entry.knownBiases } : {},
    note: entry.note
  };
}
var X_ACCOUNT_SOURCE_TYPES = Object.fromEntries(
  X_ACCOUNT_TRUST.filter((entry) => !entry.reuseType).map((entry) => [entry.sourceName, entry.type])
);
var X_ACCOUNT_SOURCE_PROPAGANDA_RISK = Object.fromEntries(
  X_ACCOUNT_TRUST.filter((entry) => !entry.reuseRisk).map((entry) => [entry.sourceName, xRiskProfile(entry)])
);
var X_ACCOUNT_SOURCE_TIERS = x_account_source_tiers_default;

// shared/telegram-channel-trust.ts
var TELEGRAM_CHANNEL_TRUST = [
  {
    handle: "InaTEWS_BMKG",
    name: "BMKG InaTEWS",
    tier: 1,
    type: "gov",
    risk: "low",
    stateAffiliated: "Indonesia",
    note: "Official earthquake and tsunami authority; Tier 1 applies to its hazard bulletins. Ownership: https://inatews.bmkg.go.id/eng/detail?day=614&name=20251010093608"
  },
  {
    handle: "dsns_telegram",
    name: "Ukraine State Emergency Service",
    tier: 1,
    type: "gov",
    risk: "medium",
    stateAffiliated: "Ukraine",
    note: "Primary emergency-service reports; attribute incident and conflict claims to the authority. Ownership: https://cpd.gov.ua/announcement/spysok-bezpechnyh-kanaliv-otrymannya-informacziyi/"
  },
  {
    handle: "PikudHaOref_all",
    name: "Israel Home Front Command",
    tier: 1,
    type: "gov",
    risk: "medium",
    stateAffiliated: "Israel",
    note: "Official civil-defense warnings and protective instructions; not independent confirmation of military claims. Ownership: IDF social-account disclosure linked in docs/operations/telegram-source-additions-2026-09-15.md"
  },
  {
    handle: "cnalatest",
    name: "CNA",
    tier: 2,
    type: "mainstream",
    risk: "low",
    stateAffiliated: "Singapore",
    note: "Established Mediacorp newsroom; retain the same CNA publisher identity as RSS. Ownership: https://www.mediacorp.sg/online-links-policy"
  },
  {
    handle: "govsg",
    name: "Singapore Government",
    tier: 1,
    type: "gov",
    risk: "low",
    stateAffiliated: "Singapore",
    note: "Primary source for Singapore government announcements; routine campaigns are not emergency alerts. Ownership: https://www.mddi.gov.sg/what-we-do/public-comms-and-engagement/public-communications/"
  },
  {
    handle: "wamnews_en",
    name: "Emirates News Agency (WAM)",
    tier: 1,
    type: "wire",
    risk: "medium",
    stateAffiliated: "UAE",
    note: "UAE state newswire; attribute government and conflict claims. Official English Telegram link published by https://www.wam.ae/en"
  },
  {
    handle: "SaudiDCD",
    name: "Saudi Civil Defense",
    tier: 1,
    type: "gov",
    risk: "low",
    stateAffiliated: "Saudi Arabia",
    note: "Official Saudi Civil Defense channel (https://t.me/SaudiDCD); primary source for civil-defense warnings and emergency notices. Attribute incident reports to the authority, not independent confirmation"
  },
  {
    handle: "VahidOnline",
    name: "Vahid Online",
    tier: 2,
    type: "intel",
    risk: "medium",
    note: "Independent Iranian journalist. Operational Telegram priority is not a wire-service rating"
  },
  {
    handle: "abualiexpress",
    name: "Abu Ali Express",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Hebrew-language military OSINT channel; treat posts as leads, not confirmation"
  },
  {
    handle: "AuroraIntel",
    name: "Aurora Intel",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "OSINT aggregator; not a major established newsroom"
  },
  {
    handle: "BNONews",
    name: "BNO News",
    tier: 1,
    type: "wire",
    risk: "low",
    note: "Independent newsroom and subscription newswire; publisher history: https://bnonews.es/index.php/about-us/"
  },
  {
    handle: "ClashReport",
    name: "Clash Report",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Conflict OSINT aggregator; unverified battlefield claims are common"
  },
  {
    handle: "DeepStateUA",
    name: "DeepState",
    tier: 3,
    type: "intel",
    risk: "medium",
    knownBiases: ["Pro-Ukraine"],
    note: "Ukrainian OSINT mapping project; high-signal maps, not a wire service"
  },
  {
    handle: "DefenderDome",
    name: "The Defender Dome",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Conflict OSINT aggregator"
  },
  {
    handle: "englishabuali",
    name: "Abu Ali Express EN",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "English edition of Abu Ali Express military OSINT"
  },
  {
    handle: "IranIntl_En",
    name: "Iran International EN",
    tier: 2,
    type: "mainstream",
    risk: "medium",
    stateAffiliated: "Saudi Arabia",
    knownBiases: ["Iranian opposition"],
    note: "Saudi-funded Iranian exile broadcaster; established newsroom, not independent of a state sponsor"
  },
  {
    handle: "kpszsu",
    name: "Air Force of the Armed Forces of Ukraine",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "Ukraine",
    note: "Official Ukrainian Air Force publisher; treat statements as government claims"
  },
  {
    handle: "LiveUAMap",
    name: "LiveUAMap",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Live conflict-mapping aggregator; source quality varies by incident"
  },
  {
    handle: "OSINTdefender",
    name: "OSINTdefender",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Military OSINT aggregator; treat as a lead"
  },
  {
    handle: "OsintUpdates",
    name: "Osint Updates",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Breaking OSINT aggregator"
  },
  {
    handle: "bellingcat",
    name: "Bellingcat",
    tier: 3,
    type: "intel",
    risk: "low",
    note: "Open-source investigations, methodology transparent",
    reuseExisting: true
  },
  {
    handle: "CyberDetective",
    name: "CyberDetective",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Cyber OSINT specialist"
  },
  {
    handle: "GeopoliticalCenter",
    name: "GeopoliticalCenter",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Geopolitical commentary aggregator"
  },
  {
    handle: "Middle_East_Spectator",
    name: "Middle East Spectator",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Middle East OSINT aggregator"
  },
  {
    handle: "MiddleEastNow_Breaking",
    name: "Middle East Now Breaking",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Regional breaking-news aggregator"
  },
  {
    handle: "nexta_tv",
    name: "NEXTA",
    tier: 3,
    type: "mainstream",
    risk: "medium",
    knownBiases: ["Belarusian opposition"],
    note: "Belarusian opposition media; useful primary, not a wire"
  },
  {
    handle: "OSINTIndustries",
    name: "OSINT Industries",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Commercial OSINT vendor channel"
  },
  {
    handle: "Osintlatestnews",
    name: "OSIntOps News",
    tier: 4,
    type: "intel",
    risk: "medium",
    note: "Anonymous OSINT news aggregator; not an editorial newsroom"
  },
  {
    handle: "osintlive",
    name: "OSINT Live",
    tier: 4,
    type: "intel",
    risk: "medium",
    note: "Anonymous OSINT aggregator"
  },
  {
    handle: "OsintTv",
    name: "OsintTV",
    tier: 4,
    type: "intel",
    risk: "medium",
    note: "Anonymous OSINT video aggregator"
  },
  {
    handle: "spectatorindex",
    name: "The Spectator Index",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Headline aggregator; speed over original reporting"
  },
  {
    handle: "wfwitness",
    name: "Witness",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Conflict-witness aggregator"
  },
  {
    handle: "war_monitor",
    name: "monitor",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Ukraine-focused conflict monitor; label matches the product-managed channel list"
  },
  {
    handle: "nayaforiraq",
    name: "Naya for Iraq",
    tier: 3,
    type: "mainstream",
    risk: "medium",
    note: "Iraq-focused regional desk"
  },
  {
    handle: "yediotnews25",
    name: "Yedioth News",
    tier: 2,
    type: "mainstream",
    risk: "low",
    knownBiases: ["Israeli mainstream"],
    note: "Yedioth Ahronoth Telegram desk; same newsroom family as Ynetnews"
  },
  {
    handle: "DDGeopolitics",
    name: "DD Geopolitics",
    tier: 4,
    type: "intel",
    risk: "medium",
    knownBiases: ["Pro-Russia"],
    note: "Anonymous partisan aggregator; not independent journalism"
  },
  {
    handle: "FotrosResistancee",
    name: "Fotros Resistance",
    tier: 4,
    type: "intel",
    risk: "medium",
    knownBiases: ["Iran-aligned resistance"],
    note: "Partisan resistance channel; treat as advocacy, not reporting"
  },
  {
    handle: "RezistanceTrench1",
    name: "Resistance Trench",
    tier: 4,
    type: "intel",
    risk: "medium",
    knownBiases: ["Iran-aligned resistance"],
    note: "Partisan resistance channel; treat as advocacy, not reporting"
  },
  {
    handle: "geopolitics_prime",
    name: "Geopolitics Prime",
    tier: 4,
    type: "intel",
    risk: "medium",
    note: "State-adjacent geopolitical aggregator; not an independent newsroom"
  },
  {
    handle: "thecradlemedia",
    name: "The Cradle",
    tier: 3,
    type: "mainstream",
    risk: "medium",
    knownBiases: ["West-Asia alignment"],
    note: "West Asia analytical outlet with a disclosed editorial line"
  },
  {
    handle: "LebUpdate",
    name: "Lebanon Update",
    tier: 3,
    type: "mainstream",
    risk: "medium",
    note: "Lebanon breaking-news aggregator"
  },
  {
    handle: "middleeastobserver",
    name: "Middle East Observer",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Regional observer/OSINT desk"
  },
  {
    handle: "MiddleEastEye_TG",
    name: "Middle East Eye",
    tier: 2,
    type: "mainstream",
    risk: "medium",
    stateAffiliated: "Qatar",
    note: "Qatar-linked Middle East newsroom; established outlet, not a wire"
  },
  {
    handle: "dragonwatch",
    name: "Dragon Watch",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Indo-Pacific OSINT aggregator"
  },
  {
    handle: "IDFofficial",
    name: "IDF Official",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "Israel",
    note: "Official IDF publisher; treat statements as government claims, not independent observation"
  },
  {
    handle: "RocketAlert",
    name: "Rocket Alert",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "Israel",
    note: "Official Israeli civilian rocket-alert publisher; values are primary government claims"
  },
  {
    handle: "sepah",
    name: "IRGC Official",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "Iran",
    note: "Official IRGC publisher; treat statements as government claims"
  },
  {
    handle: "defapress_ir",
    name: "DefaPress (Iran MOD)",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "Iran",
    note: "Iranian Ministry of Defence publisher; treat statements as government claims"
  },
  {
    handle: "TasnimNewsEN",
    name: "Tasnim News EN",
    tier: 3,
    type: "mainstream",
    risk: "high",
    stateAffiliated: "Iran",
    note: "Iranian state-affiliated outlet; not a wire service"
  },
  {
    handle: "PressTV",
    name: "PressTV (Iran State)",
    tier: 3,
    type: "mainstream",
    risk: "high",
    stateAffiliated: "Iran",
    note: 'Iranian state media Telegram desk; distinct key from RSS "Press TV"'
  },
  {
    handle: "FarsNews_EN",
    name: "Fars News EN",
    tier: 3,
    type: "mainstream",
    risk: "high",
    stateAffiliated: "Iran",
    note: 'Iranian state-affiliated outlet; distinct key from RSS "Fars News"'
  },
  {
    handle: "SaberinFa",
    name: "Saberin (IRGC Intel)",
    tier: 1,
    type: "gov",
    risk: "high",
    stateAffiliated: "Iran",
    note: "IRGC-linked intelligence publisher; treat statements as government claims"
  },
  {
    handle: "warfareanalysis",
    name: "Warfare Analysis",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Military analysis/OSINT desk"
  },
  {
    handle: "rnintel",
    name: "RN Intel",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "OSINT aggregator"
  },
  {
    handle: "bintjbeilnews",
    name: "Bint Jbeil News",
    tier: 3,
    type: "mainstream",
    risk: "medium",
    note: "Southern Lebanon local desk in a polarized media environment"
  },
  {
    handle: "HAMASW",
    name: "Hamas-Israel War",
    tier: 4,
    type: "intel",
    risk: "medium",
    knownBiases: ["Faction-aligned"],
    note: "Faction-aligned war aggregator; not an editorial newsroom"
  },
  {
    handle: "QudsNen",
    name: "Quds News",
    tier: 4,
    type: "intel",
    risk: "medium",
    knownBiases: ["Faction-aligned"],
    note: "Faction-aligned aggregator; treat as advocacy, not reporting"
  },
  {
    handle: "Alsaa_plus_EN",
    name: "Al-Saa EN",
    tier: 3,
    type: "mainstream",
    risk: "medium",
    note: "Arabic-to-English regional desk"
  },
  {
    handle: "GeoPWatch",
    name: "GeoPol Watch",
    tier: 4,
    type: "intel",
    risk: "medium",
    note: "Anonymous geopolitical aggregator"
  },
  {
    handle: "dropsitenews",
    name: "Drop Site News",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Investigative digital outlet; specialty desk, not a wire"
  },
  {
    handle: "france24_en",
    name: "France 24 EN",
    tier: 2,
    type: "mainstream",
    risk: "medium",
    stateAffiliated: "France",
    note: 'French state-funded broadcaster Telegram desk; editorially independent charter, distinct key from RSS "France 24"'
  },
  {
    handle: "kianmeli1",
    name: "Kian Meli (Iran)",
    tier: 4,
    type: "intel",
    risk: "medium",
    note: "Unverified personal Iran desk; not a reviewed newsroom"
  },
  {
    handle: "TimesofIsrael",
    name: "Times of Israel",
    tier: 2,
    type: "mainstream",
    risk: "low",
    knownBiases: ["Israeli mainstream"],
    note: "English-language Israeli newspaper Telegram desk"
  },
  {
    handle: "thehackernews",
    name: "The Hacker News",
    tier: 3,
    type: "tech",
    risk: "medium",
    note: "Cybersecurity news specialist; not a general wire"
  },
  {
    handle: "cybersecboardrm",
    name: "Cybersecurity Boardroom",
    tier: 3,
    type: "tech",
    risk: "medium",
    note: "Cybersecurity industry aggregator"
  },
  {
    handle: "securelist",
    name: "Securelist by Kaspersky",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Kaspersky research blog; vendor research, not independent journalism"
  },
  {
    handle: "DarkWebInformer",
    name: "Dark Web Informer",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Dark-web monitoring aggregator"
  },
  {
    handle: "CYBERWARCOM",
    name: "CYBERWAR.COM",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Cyber-conflict aggregator"
  },
  {
    handle: "thecyberwire",
    name: "The CyberWire",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Cybersecurity briefing specialist"
  },
  {
    handle: "vxunderground",
    name: "vx-underground",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Malware-research archive; technical primary, not a newsroom"
  },
  {
    handle: "falconfeeds",
    name: "FalconFeeds.io",
    tier: 3,
    type: "intel",
    risk: "medium",
    note: "Commercial threat-intel feed"
  }
];
function telegramRiskProfile(entry) {
  return {
    risk: entry.risk,
    ...entry.stateAffiliated ? { stateAffiliated: entry.stateAffiliated } : {},
    ...entry.knownBiases ? { knownBiases: entry.knownBiases } : {},
    note: entry.note
  };
}
var TELEGRAM_SOURCE_TYPES = Object.fromEntries(
  TELEGRAM_CHANNEL_TRUST.filter((entry) => !entry.reuseExisting).map((entry) => [entry.name, entry.type])
);
var TELEGRAM_SOURCE_PROPAGANDA_RISK = Object.fromEntries(
  TELEGRAM_CHANNEL_TRUST.filter((entry) => !entry.reuseExisting).map((entry) => [entry.name, telegramRiskProfile(entry)])
);
var TELEGRAM_SOURCE_TIERS = Object.fromEntries(
  TELEGRAM_CHANNEL_TRUST.filter((entry) => !entry.reuseExisting).map((entry) => [entry.name, entry.tier])
);
var TELEGRAM_HANDLE_TO_PUBLIC_NAME = Object.fromEntries(
  TELEGRAM_CHANNEL_TRUST.map((entry) => [entry.handle, entry.name])
);
function normalizeTelegramHandle(handle) {
  return handle.trim().replace(/^@/, "").toLowerCase();
}
var TELEGRAM_NORMALIZED_HANDLE_TO_PUBLIC_NAME = (() => {
  const entries = /* @__PURE__ */ new Map();
  for (const entry of TELEGRAM_CHANNEL_TRUST) {
    const normalizedHandle = normalizeTelegramHandle(entry.handle);
    if (entries.has(normalizedHandle)) {
      throw new Error(`Duplicate Telegram trust handle: ${entry.handle}`);
    }
    entries.set(normalizedHandle, entry.name);
  }
  return entries;
})();

// shared/source-provenance.ts
var SOURCE_TYPES = {
  // Wire services - fastest, most authoritative
  "Reuters": "wire",
  "Reuters World": "wire",
  "Reuters Business": "wire",
  "Reuters Nasdaq Futures": "wire",
  "AP News": "wire",
  "AFP": "wire",
  "Bloomberg": "wire",
  // Government & International Org sources
  "White House": "gov",
  "White House Actions": "gov",
  "State Dept": "gov",
  "Pentagon": "gov",
  "Treasury": "gov",
  "DOJ": "gov",
  "DHS": "gov",
  "CDC": "gov",
  "FEMA": "gov",
  "Federal Reserve": "gov",
  "SEC": "gov",
  "U.S. Trade Representative": "gov",
  "UN News": "gov",
  "CISA": "gov",
  // Direct official military publishers. Their claims remain publisher claims,
  // not independent ADS-B/AIS observations.
  "Taiwan Ministry of National Defense": "gov",
  "Japan Joint Staff": "gov",
  // Chinese government ministries (Tier 1 official sources — not wire/verified outlets)
  "CAC (China)": "gov",
  "SAMR (China)": "gov",
  "MIIT (China)": "gov",
  "MOFCOM (China)": "gov",
  "NDRC (China)": "gov",
  "NBS (China)": "gov",
  "PBoC (China)": "gov",
  "SAFE (China)": "gov",
  "GACC (China)": "gov",
  // Intel/Defense specialty
  "Defense One": "intel",
  "Breaking Defense": "intel",
  "The War Zone": "intel",
  "Defense News": "intel",
  "Janes": "intel",
  "Military Times": "intel",
  "Task & Purpose": "intel",
  "USNI News": "intel",
  "gCaptain": "intel",
  "Oryx OSINT": "intel",
  "UK MOD": "gov",
  "Bellingcat": "intel",
  "Krebs Security": "intel",
  "Foreign Policy": "intel",
  "The Diplomat": "intel",
  "Atlantic Council": "intel",
  "Foreign Affairs": "intel",
  "CrisisWatch": "intel",
  "CSIS": "intel",
  "RAND": "intel",
  "Brookings": "intel",
  "Carnegie": "intel",
  "IAEA": "gov",
  "WHO": "gov",
  "UNHCR": "gov",
  "Xinhua": "wire",
  "TASS": "wire",
  "RT": "wire",
  "RT Russia": "wire",
  "NHK World": "mainstream",
  "Nikkei Asia": "market",
  // Independent RU exile / UA English primary (default-eligible under #5950 balance rule)
  "Meduza": "mainstream",
  "Moscow Times": "mainstream",
  "Kyiv Independent": "mainstream",
  // Ukraine depth pack (#5951) + uk native pack (#5959)
  "Ukrinform": "wire",
  "Suspilne": "mainstream",
  "Ukrainska Pravda EN": "mainstream",
  "NV EN": "mainstream",
  "Hromadske EN": "mainstream",
  "ISW": "intel",
  "Ukrainska Pravda": "mainstream",
  "Hromadske": "mainstream",
  "Bihus.Info": "intel",
  "Slidstvo.Info": "intel",
  "ZN.UA": "mainstream",
  // Mainstream outlets
  "BBC World": "mainstream",
  "BBC Middle East": "mainstream",
  "Guardian World": "mainstream",
  "Guardian ME": "mainstream",
  "Guardian Africa": "mainstream",
  "Guardian Caribbean": "mainstream",
  "Guardian Pacific": "mainstream",
  "France 24 Africa": "mainstream",
  "France 24 Asia Pacific": "mainstream",
  "France 24 LatAm": "mainstream",
  "Mexico News Daily": "mainstream",
  "NPR News": "mainstream",
  "Al Jazeera": "mainstream",
  "CNN World": "mainstream",
  "Politico": "mainstream",
  "Axios": "mainstream",
  "EuroNews": "mainstream",
  "France 24": "mainstream",
  "Le Monde": "mainstream",
  // European Addition
  "El Pa\xEDs": "mainstream",
  "El Mundo": "mainstream",
  "BBC Mundo": "mainstream",
  "Tagesschau": "mainstream",
  "Der Spiegel": "mainstream",
  "Die Zeit": "mainstream",
  "DW News": "mainstream",
  "ANSA": "wire",
  "Corriere della Sera": "mainstream",
  "Repubblica": "mainstream",
  "Handelsblatt": "market",
  "Welt": "mainstream",
  "Telegraph": "mainstream",
  "Interfax RU": "wire",
  "Interfax EN": "wire",
  "NOS Nieuws": "mainstream",
  "NRC": "mainstream",
  "De Telegraaf": "mainstream",
  // Croatian (HR)
  "N1 Croatia": "mainstream",
  "Index.hr": "mainstream",
  "Jutarnji list": "mainstream",
  "Balkan Insight": "intel",
  // Romanian (RO) — Eastern flank (#5952)
  "Digi24": "mainstream",
  "HotNews": "mainstream",
  "G4Media": "mainstream",
  // Bulgarian (BG) — Black Sea flank (#5952)
  "Dnevnik": "mainstream",
  // Greek (EL) — locale-boosted; Kathimerini is the EN strategic default
  "Kathimerini": "mainstream",
  "Naftemporiki": "mainstream",
  "in.gr": "mainstream",
  "iefimerida": "mainstream",
  "Proto Thema": "mainstream",
  "ERT": "mainstream",
  "AMNA": "wire",
  "Ta Nea": "mainstream",
  "Liberal GR": "mainstream",
  "CNN Greece": "mainstream",
  // Baltic states — Eastern flank (#5952)
  "ERR News": "mainstream",
  "LRT English": "mainstream",
  "LSM English": "mainstream",
  // Turkey EN path (#5952)
  "Daily Sabah": "mainstream",
  // Polish (PL) depth — catalog opt-in, locale-boosted
  "PAP": "wire",
  "Gazeta Wyborcza": "mainstream",
  "Polityka": "mainstream",
  "Onet": "mainstream",
  "OKO.press": "intel",
  "TVP Info": "mainstream",
  // Czech (CS) — V4 balance (#5952)
  "Seznam Zpr\xE1vy": "mainstream",
  // Hindi (HI)
  "BBC Hindi": "mainstream",
  "Aaj Tak": "mainstream",
  "NDTV India": "mainstream",
  "Amar Ujala": "mainstream",
  // Hungarian (HU)
  "Telex": "mainstream",
  "Index.hu": "mainstream",
  "HVG": "mainstream",
  "444.hu": "mainstream",
  "24.hu": "mainstream",
  "H\xEDrad\xF3": "mainstream",
  "ATV": "mainstream",
  "Portfolio.hu": "market",
  "SVT Nyheter": "mainstream",
  "Dagens Nyheter": "mainstream",
  "Svenska Dagbladet": "mainstream",
  // Canada + Arctic/Nordic pack (#5960) + depth pack (#6604/#6605)
  "CBC News": "mainstream",
  "Globe and Mail": "mainstream",
  "Global News": "mainstream",
  "Toronto Star": "mainstream",
  "National Post": "mainstream",
  "Financial Post": "market",
  "iPolitics": "mainstream",
  "The Narwhal": "mainstream",
  "The Tyee": "mainstream",
  "Maclean's": "mainstream",
  "Radio-Canada": "mainstream",
  "La Presse": "mainstream",
  "Le Devoir": "mainstream",
  "TVA Nouvelles": "mainstream",
  "Vancouver Sun": "mainstream",
  "Calgary Herald": "mainstream",
  "Winnipeg Free Press": "mainstream",
  "Edmonton Journal": "mainstream",
  "Ottawa Citizen": "mainstream",
  "The Province": "mainstream",
  "CTV News": "mainstream",
  "CP24": "mainstream",
  "Montreal Gazette": "mainstream",
  "Yle News": "mainstream",
  "NRK": "mainstream",
  "Aftenposten": "mainstream",
  "DR Nyheder": "mainstream",
  "Arctic Today": "mainstream",
  // Brazilian Addition
  "Brasil Paralelo": "mainstream",
  // Market/Finance
  "CNBC": "market",
  "MarketWatch": "market",
  "Yahoo Finance": "market",
  "Financial Times": "market",
  "Fox Business": "market",
  "Business Insider": "market",
  "Jin10": "market",
  "Coinbase Blog": "market",
  "Binance Announcements": "market",
  // Press-release distribution is publisher-submitted content. Do not label
  // these feeds as independent wire reporting.
  "GlobeNewswire": "other",
  "Business Wire": "other",
  "PR Newswire": "other",
  "Chainwire": "other",
  "Shanghai Stock Exchange": "market",
  "Shenzhen Stock Exchange": "market",
  // Tech
  "Hacker News": "tech",
  "Ars Technica": "tech",
  "The Verge": "tech",
  "The Verge AI": "tech",
  "MIT Tech Review": "tech",
  "TechCrunch Layoffs": "tech",
  "AI News": "tech",
  "ArXiv AI": "tech",
  "VentureBeat AI": "tech",
  "Wired": "tech",
  "Layoffs.fyi": "tech",
  "Layoffs News": "tech",
  // Regional Tech Startups
  "EU Startups": "tech",
  "Tech.eu": "tech",
  "Sifted (Europe)": "tech",
  "The Next Web": "tech",
  "Tech in Asia": "tech",
  "e27 (SEA)": "tech",
  "DealStreetAsia": "tech",
  "Pandaily (China)": "tech",
  "36Kr English": "tech",
  "TechNode (China)": "tech",
  "The Bridge (Japan)": "tech",
  "Nikkei Tech": "tech",
  "Inc42 (India)": "tech",
  "YourStory": "tech",
  "TechCabal (Africa)": "tech",
  "Wamda (MENA)": "tech",
  "Magnitt": "tech",
  // Think Tanks & Policy
  "Brookings Tech": "intel",
  "CSIS Tech": "intel",
  "Stanford HAI": "intel",
  "AI Now Institute": "intel",
  "OECD Digital": "intel",
  "Bruegel (EU)": "intel",
  "Chatham House Tech": "intel",
  "DigiChina": "intel",
  "Lowy Institute": "intel",
  "EFF News": "intel",
  "Politico Tech": "intel",
  // Security/Defense Think Tanks
  "RUSI": "intel",
  "Wilson Center": "intel",
  "GMF": "intel",
  "Stimson Center": "intel",
  "CNAS": "intel",
  // Nuclear & Arms Control
  "Arms Control Assn": "intel",
  "Bulletin of Atomic Scientists": "intel",
  // Food Security & Regional
  "FAO GIEWS": "gov",
  "EU ISS": "intel",
  // Investigative journalism & accountability
  "OCCRP": "intel",
  "DFRLab": "intel",
  "Lighthouse Reports": "intel",
  "The Sentry": "intel",
  "GITOC": "intel",
  "VSquare": "intel",
  "Correctiv": "intel",
  // New verified think tanks
  "War on the Rocks": "intel",
  "AEI": "intel",
  "Responsible Statecraft": "intel",
  "FPRI": "intel",
  "Jamestown": "intel",
  // Podcasts & Newsletters
  "Acquired Podcast": "tech",
  "All-In Podcast": "tech",
  "a16z Podcast": "tech",
  "This Week in Startups": "tech",
  "The Twenty Minute VC": "tech",
  "Hard Fork (NYT)": "tech",
  "Pivot (Vox)": "tech",
  "Stratechery": "tech",
  "Benedict Evans": "tech",
  "How I Built This": "tech",
  "Masters of Scale": "tech",
  // Periphery packs (#5953) — Caucasus
  "Civil.ge": "mainstream",
  "OC Media": "mainstream",
  "JAMnews": "mainstream",
  "Azertag": "wire",
  "Armenpress": "wire",
  // Periphery packs (#5953) — Belarus / Moldova
  "Zerkalo": "mainstream",
  "NewsMaker": "mainstream",
  "Ziarul de Gard\u0103": "mainstream",
  // Periphery packs (#5953) — Central Asia
  "Eurasianet": "mainstream",
  "RFE/RL Central Asia": "mainstream",
  "The Astana Times": "mainstream",
  "The Times of Central Asia": "mainstream",
  // Indo-Pacific feeds (#5954)
  "Focus Taiwan": "wire",
  "Taipei Times": "mainstream",
  "Taiwan News": "mainstream",
  "Dawn": "mainstream",
  "Geo News": "mainstream",
  "Jakarta Post": "mainstream",
  "Rappler": "mainstream",
  "The Star (Malaysia)": "mainstream",
  "Irrawaddy": "mainstream",
  // Validated crisis desks (#6813-#6830)
  "Yemen Online": "mainstream",
  "Sana'a Center": "intel",
  "Syria Direct": "mainstream",
  "Enab Baladi English": "mainstream",
  "+972 Magazine": "mainstream",
  "WAFA English": "gov",
  "HaitiLibre English": "mainstream",
  "AyiboPost": "mainstream",
  "Amu TV": "mainstream",
  "Pajhwok Afghan News": "wire",
  "Naharnet Lebanon": "mainstream",
  "L'Orient Today": "mainstream",
  "Annahar": "mainstream",
  "Studio Tamani": "mainstream",
  "leFaso.net": "mainstream",
  "ActuNiger": "mainstream",
  "A\xEFr Info": "mainstream",
  "Caracas Chronicles": "mainstream",
  "Efecto Cocuyo": "mainstream",
  "Havana Times": "mainstream",
  "14ymedio": "mainstream",
  "Libya Herald": "mainstream",
  "Egypt Independent": "mainstream",
  "Mada Masr": "mainstream",
  "The Daily Star": "mainstream",
  "Dhaka Tribune": "mainstream",
  "Daily Nation": "mainstream",
  "Times of India": "mainstream",
  "The Guardian Post": "mainstream",
  "Tchadinfos": "mainstream",
  "Alwihda Info": "mainstream",
  "Radio Ndeke Luka": "mainstream",
  // Telegram channels (#6600). Additive keys keyed by channel display label.
  ...TELEGRAM_SOURCE_TYPES,
  // Curated X news-account overlay (#6654). Additive to Telegram.
  ...X_ACCOUNT_SOURCE_TYPES
};
var UNREVIEWED_SOURCE_RISK = Object.freeze({
  risk: "unknown",
  note: "Provenance not yet reviewed \u2014 do not treat as independent journalism"
});
var SOURCE_PROPAGANDA_RISK = {
  // High risk - State-controlled media
  "Xinhua": { risk: "high", stateAffiliated: "China", note: "Official CCP news agency" },
  "TASS": { risk: "high", stateAffiliated: "Russia", note: "Russian state news agency" },
  "RT": { risk: "high", stateAffiliated: "Russia", note: "Russian state media, banned in EU" },
  "RT Russia": { risk: "high", stateAffiliated: "Russia", note: "Russian state media, Russia desk" },
  "Sputnik": { risk: "high", stateAffiliated: "Russia", note: "Russian state media" },
  "CGTN": { risk: "high", stateAffiliated: "China", note: "Chinese state broadcaster" },
  "Press TV": { risk: "high", stateAffiliated: "Iran", note: "Iranian state media" },
  "IRNA": { risk: "high", stateAffiliated: "Iran", note: "Iranian state news agency (Islamic Republic News Agency)" },
  "Mehr News": { risk: "high", stateAffiliated: "Iran", note: "Iranian state-affiliated, Basij-linked" },
  "KCNA": { risk: "high", stateAffiliated: "North Korea", note: "North Korean state media" },
  // Official Chinese ministry feeds (government sources, not independent media)
  "MIIT (China)": {
    risk: "high",
    stateAffiliated: "China",
    note: "Chinese Ministry of Industry and Information Technology official feed"
  },
  "MOFCOM (China)": {
    risk: "high",
    stateAffiliated: "China",
    note: "Chinese Ministry of Commerce official feed"
  },
  // Official exchange authorities. These are authoritative primary publishers,
  // not independent journalism; omit stateAffiliated so the shared validator
  // does not conflate an exchange authority with state-controlled media.
  "Shanghai Stock Exchange": {
    risk: "high",
    note: "Official mainland China exchange authority; metadata-only source"
  },
  "Shenzhen Stock Exchange": {
    risk: "high",
    note: "Official mainland China exchange authority; metadata-only source"
  },
  "Taiwan Ministry of National Defense": {
    risk: "high",
    stateAffiliated: "Taiwan",
    note: "Direct government activity reports; treat values as official publisher claims, not independent observations"
  },
  "Japan Joint Staff": {
    risk: "high",
    stateAffiliated: "Japan",
    note: "Direct government activity reports; only manually reviewed documents are admitted as regional augmentation"
  },
  "CAC (China)": {
    risk: "high",
    stateAffiliated: "China",
    note: "Cyberspace Administration of China official publication"
  },
  "SAMR (China)": {
    risk: "high",
    stateAffiliated: "China",
    note: "State Administration for Market Regulation official publication"
  },
  "NDRC (China)": {
    risk: "high",
    stateAffiliated: "China",
    note: "National Development and Reform Commission official publication"
  },
  "NBS (China)": {
    risk: "high",
    stateAffiliated: "China",
    note: "National Bureau of Statistics of China official data release"
  },
  "PBoC (China)": {
    risk: "high",
    stateAffiliated: "China",
    note: "People's Bank of China official publication"
  },
  "SAFE (China)": {
    risk: "high",
    stateAffiliated: "China",
    note: "State Administration of Foreign Exchange official data release"
  },
  "GACC (China)": {
    risk: "high",
    stateAffiliated: "China",
    note: "General Administration of Customs of China official data release"
  },
  "U.S. Trade Representative": {
    risk: "high",
    stateAffiliated: "USA",
    note: "Official U.S. government trade-policy publication; treat statements as primary government claims"
  },
  // Medium risk - State-affiliated or known bias
  "Al Jazeera": { risk: "medium", stateAffiliated: "Qatar", note: "Qatari state-funded, independent editorial" },
  "Al Arabiya": { risk: "medium", stateAffiliated: "Saudi Arabia", note: "Saudi-owned, reflects Gulf perspective" },
  "TRT World": { risk: "medium", stateAffiliated: "Turkey", note: "Turkish state broadcaster" },
  "France 24": { risk: "medium", stateAffiliated: "France", note: "French state-funded, editorially independent" },
  "France 24 Africa": { risk: "medium", stateAffiliated: "France", note: "French state-funded, editorially independent" },
  "France 24 Asia Pacific": { risk: "medium", stateAffiliated: "France", note: "French state-funded, editorially independent" },
  "France 24 LatAm": { risk: "medium", stateAffiliated: "France", note: "French state-funded, editorially independent" },
  "EuroNews": { risk: "low", note: "European public broadcaster consortium", knownBiases: ["Pro-EU"] },
  "Le Monde": { risk: "low", note: "French newspaper of record" },
  "DW News": { risk: "medium", stateAffiliated: "Germany", note: "German state-funded, editorially independent" },
  "ERT": { risk: "medium", stateAffiliated: "Greece", note: "Greek public broadcaster" },
  "AMNA": { risk: "medium", stateAffiliated: "Greece", note: "Greek national news agency" },
  "Voice of America": { risk: "medium", stateAffiliated: "USA", note: "US government-funded" },
  "Kyiv Independent": { risk: "medium", knownBiases: ["Pro-Ukraine"], note: "Ukrainian English-language primary on Russia-Ukraine war (#5950 balance: dedicated UA voice)" },
  // Ukraine depth pack (#5951) — local institutions + frontline assessment
  "Ukrinform": { risk: "high", stateAffiliated: "Ukraine", note: "Ukrainian national state news agency (UKRINFORM)" },
  "Suspilne": { risk: "medium", stateAffiliated: "Ukraine", note: "Ukrainian public broadcaster, state-funded" },
  "Ukrainska Pravda EN": { risk: "medium", knownBiases: ["Pro-Ukraine"], note: "Independent Ukrainian outlet, high-signal English edition" },
  "NV EN": { risk: "medium", knownBiases: ["Pro-Ukraine"], note: "New Voice of Ukraine English edition, independent" },
  "Hromadske EN": { risk: "medium", knownBiases: ["Pro-Ukraine"], note: "Ukrainian independent public broadcaster (English)" },
  // Ukrainian native outlets (#5959) — locale-boosted for uk UI
  "Ukrainska Pravda": { risk: "medium", knownBiases: ["Pro-Ukraine"], note: "Independent Ukrainian outlet, Ukrainian-language edition" },
  "Hromadske": { risk: "medium", knownBiases: ["Pro-Ukraine"], note: "Ukrainian independent public broadcaster (Ukrainian)" },
  "Bihus.Info": { risk: "medium", knownBiases: ["Pro-Ukraine"], note: "Ukrainian investigative anti-corruption outlet" },
  "Slidstvo.Info": { risk: "medium", knownBiases: ["Pro-Ukraine"], note: "Ukrainian investigative journalism project (Radio Free Europe partnership)" },
  "ZN.UA": { risk: "medium", knownBiases: ["Pro-Ukraine"], note: "Dzerkalo Tyzhnia \u2014 Ukrainian weekly analytical newspaper" },
  "ISW": { risk: "low", note: "Institute for the Study of War, nonpartisan research nonprofit, daily frontline assessments" },
  "Moscow Times": { risk: "medium", knownBiases: ["Anti-Kremlin"], note: "Independent English-language Russian outlet, critical of Kremlin" },
  "Interfax RU": { risk: "medium", note: "Russian private news agency operating under domestic media restrictions; Russian-language feed" },
  "Interfax EN": { risk: "medium", note: "Russian private news agency operating under domestic media restrictions; English-language edition" },
  "GlobeNewswire": { risk: "medium", note: "Publisher-submitted press releases; not independent reporting" },
  "Business Wire": { risk: "medium", note: "Publisher-submitted press releases; not independent reporting" },
  "PR Newswire": { risk: "medium", note: "Publisher-submitted press releases; not independent reporting" },
  "Chainwire": { risk: "medium", note: "Paid crypto press-release distribution; not independent reporting" },
  "Coinbase Blog": { risk: "medium", note: "Coinbase first-party company publication; treat statements as issuer claims" },
  "Binance Announcements": { risk: "medium", note: "Binance first-party announcement channel; treat statements as issuer claims" },
  "Jin10": { risk: "medium", note: "Chinese financial-news and market-data publisher; limited English editorial transparency" },
  // Independent RU exile press — not state media; eligible for EN defaults (#5950)
  "Meduza": { risk: "low", knownBiases: ["Anti-Kremlin"], note: "Independent Russian exile outlet (Riga); English + Russian RSS" },
  // Validated crisis desks (#6813-#6830). These declarations are editorial
  // provenance, not endorsements of every publisher claim.
  "Yemen Online": { risk: "medium", note: "Independent English-language Yemeni platform; exile and conflict-reporting context" },
  "Sana'a Center": { risk: "low", note: "Independent Yemeni policy and analysis center" },
  "Syria Direct": { risk: "low", note: "Independent nonprofit Syria newsroom" },
  "Enab Baladi English": { risk: "medium", knownBiases: ["Syrian opposition perspective"], note: "Independent Syrian newsroom founded by citizen journalists" },
  "+972 Magazine": { risk: "medium", knownBiases: ["Israeli-Palestinian human-rights perspective"], note: "Independent Israeli-Palestinian magazine" },
  "WAFA English": { risk: "high", stateAffiliated: "Palestine", note: "Official Palestinian news agency; treat statements as government claims" },
  "HaitiLibre English": { risk: "medium", note: "Translated Haiti-focused desk; retain explicit publisher attribution" },
  "AyiboPost": { risk: "low", note: "Independent Haitian investigative newsroom" },
  "Amu TV": { risk: "medium", note: "Independent Afghan exile newsroom with reporters inside Afghanistan" },
  "Pajhwok Afghan News": { risk: "medium", note: "Independent Kabul-based news agency operating under domestic restrictions" },
  "Naharnet Lebanon": { risk: "low", note: "Independent Lebanese digital outlet" },
  "L'Orient Today": { risk: "low", note: "Independent English-language Lebanese newsroom" },
  "Annahar": { risk: "low", note: "Independent Lebanese Arabic-language political newspaper" },
  "PAP": { risk: "medium", stateAffiliated: "Poland", note: "Polish national news agency (Polska Agencja Prasowa); state-owned wire" },
  "Gazeta Wyborcza": { risk: "low", note: "Independent Polish daily newspaper published by Agora" },
  "Polityka": { risk: "low", note: "Independent Polish weekly news magazine" },
  "Onet": { risk: "low", note: "Polish commercial news portal published by Ringier Axel Springer Polska" },
  "OKO.press": { risk: "low", note: "Independent Polish investigative and fact-checking outlet" },
  "TVP Info": { risk: "medium", stateAffiliated: "Poland", note: "Polish public-service news channel; state-funded broadcaster" },
  "Studio Tamani": { risk: "low", note: "Mali newsroom operated by Fondation Hirondelle; Journalism Trust Initiative certified" },
  "leFaso.net": { risk: "low", note: "Independent Burkina Faso digital newsroom" },
  "ActuNiger": { risk: "medium", note: "Niger-focused independent newsroom" },
  "A\xEFr Info": { risk: "low", note: "Independent northern Niger and Agadez newsroom" },
  "Caracas Chronicles": { risk: "medium", knownBiases: ["Opposition-leaning Venezuela analysis"], note: "Independent English-language Venezuela analysis outlet" },
  "Efecto Cocuyo": { risk: "low", note: "Independent Venezuelan newsroom" },
  "Havana Times": { risk: "medium", knownBiases: ["Independent Cuban perspective"], note: "Independent English-language Cuba-focused publication" },
  "14ymedio": { risk: "medium", knownBiases: ["Cuban opposition perspective"], note: "Independent Cuban digital newspaper" },
  "Libya Herald": { risk: "medium", note: "Independent English-language Libya newsroom in a polarized media environment" },
  "Egypt Independent": { risk: "medium", note: "Independent English-language Egypt newsroom operating under domestic restrictions" },
  "Mada Masr": { risk: "medium", note: "Independent Egyptian newsroom operating under domestic restrictions" },
  "The Daily Star": { risk: "low", note: "Independent English-language Bangladesh newspaper" },
  "Dhaka Tribune": { risk: "low", note: "Independent English-language Bangladesh newspaper" },
  "Daily Nation": { risk: "low", note: "Kenyan newspaper published by Nation Media Group" },
  "The Guardian Post": { risk: "medium", note: "Independent Cameroon English-language newspaper" },
  "Tchadinfos": { risk: "medium", note: "Chad-focused French-language newsroom" },
  "Alwihda Info": { risk: "medium", note: "Pan-African French-language publisher with Chad coverage; source mapping is not article geolocation" },
  "Radio Ndeke Luka": { risk: "low", note: "CAR-focused newsroom; Journalism Trust Initiative certified" },
  // Low risk - Independent with editorial standards (explicit)
  "Jerusalem Post": { risk: "low", knownBiases: ["Israeli centre-right"], note: "English-language Israeli daily of record" },
  "Ynetnews": { risk: "low", knownBiases: ["Israeli mainstream"], note: "Yedioth Ahronoth English edition" },
  "Digi24": { risk: "low", note: "Romanian independent news channel, member of ERNO" },
  "HotNews": { risk: "low", note: "Romanian independent online news portal" },
  "G4Media": { risk: "low", note: "Romanian independent investigative outlet" },
  "Dnevnik": { risk: "low", note: "Bulgarian independent daily newspaper" },
  "ERR News": { risk: "low", note: "Estonian Public Broadcasting English service" },
  "LRT English": { risk: "low", note: "Lithuanian Public Broadcasting English service" },
  "LSM English": { risk: "low", note: "Latvian Public Broadcasting English service" },
  // Canada + Arctic/Nordic pack (#5960) + depth pack (#6604/#6605)
  "CBC News": { risk: "medium", stateAffiliated: "Canada", note: "Canadian public broadcaster (CBC/Radio-Canada), editorially independent charter" },
  "Globe and Mail": { risk: "low", note: "Canadian newspaper of record" },
  "Global News": { risk: "low", note: "Canadian national news network (Corus Entertainment)" },
  "Toronto Star": { risk: "low", note: "Canadian metropolitan daily newspaper of record (Toronto)" },
  "National Post": { risk: "low", note: "Canadian national newspaper (Postmedia)" },
  "Financial Post": { risk: "low", note: "Canadian business newspaper (Postmedia)" },
  "iPolitics": { risk: "low", note: "Canadian political news outlet" },
  "The Narwhal": { risk: "low", note: "Canadian independent environmental investigative outlet" },
  "The Tyee": { risk: "low", note: "Canadian independent British Columbia news magazine" },
  "Maclean's": { risk: "low", note: "Canadian national news magazine" },
  "Radio-Canada": { risk: "medium", stateAffiliated: "Canada", note: "CBC/Radio-Canada French service, editorially independent charter" },
  "La Presse": { risk: "low", note: "Quebec French-language daily newspaper" },
  "Le Devoir": { risk: "low", note: "Quebec French-language newspaper of record" },
  "TVA Nouvelles": { risk: "low", note: "Quebec private television news (Quebecor); not state-affiliated" },
  "Vancouver Sun": { risk: "low", note: "Vancouver daily newspaper (Postmedia)" },
  "Calgary Herald": { risk: "low", note: "Calgary daily newspaper (Postmedia)" },
  "Winnipeg Free Press": { risk: "low", note: "Winnipeg daily newspaper" },
  "Edmonton Journal": { risk: "low", note: "Edmonton daily newspaper (Postmedia)" },
  "Ottawa Citizen": { risk: "low", note: "Ottawa daily newspaper (Postmedia)" },
  "The Province": { risk: "low", note: "Vancouver daily tabloid (Postmedia)" },
  "CTV News": { risk: "low", note: "Canadian national television news (Bell Media); GNews site: fallback, no native RSS" },
  "CP24": { risk: "low", note: "Toronto 24-hour news channel (Bell Media); GNews site: fallback, no native RSS" },
  "Montreal Gazette": { risk: "low", note: "Montreal English daily (Postmedia); GNews site: fallback, native RSS dead" },
  "Yle News": { risk: "medium", stateAffiliated: "Finland", note: "Finnish public broadcaster English service (Yle)" },
  "NRK": { risk: "medium", stateAffiliated: "Norway", note: "Norwegian public broadcaster" },
  "Aftenposten": { risk: "low", note: "Norwegian newspaper of record (Schibsted)" },
  "DR Nyheder": { risk: "medium", stateAffiliated: "Denmark", note: "Danish public broadcaster (DR)" },
  "Arctic Today": { risk: "low", note: "Independent High North / Arctic security and business news" },
  "Daily Sabah": { risk: "medium", stateAffiliated: "Turkey", note: "Turkish pro-government daily, English edition" },
  "Seznam Zpr\xE1vy": { risk: "low", note: "Czech independent online news outlet" },
  "Reuters": { risk: "low", note: "Wire service, strict editorial standards" },
  "AP News": { risk: "low", note: "Wire service, nonprofit cooperative" },
  "AFP": { risk: "low", note: "Wire service, editorially independent" },
  "BBC World": { risk: "low", note: "Public broadcaster, editorial independence charter" },
  "BBC Middle East": { risk: "low", note: "Public broadcaster, editorial independence charter" },
  "Guardian World": { risk: "low", knownBiases: ["Center-left"], note: "Scott Trust ownership, no shareholders" },
  "Guardian Africa": { risk: "low", knownBiases: ["Center-left"], note: "Scott Trust ownership, no shareholders" },
  "Guardian Caribbean": { risk: "low", knownBiases: ["Center-left"], note: "Scott Trust ownership, no shareholders" },
  "Guardian Pacific": { risk: "low", knownBiases: ["Center-left"], note: "Scott Trust ownership, no shareholders" },
  "Mexico News Daily": { risk: "low", note: "English-language Mexican news publication" },
  "Financial Times": { risk: "low", note: "Business focus, Nikkei-owned" },
  "Times of India": { risk: "low", note: "Major Indian national newspaper with an established editorial newsroom" },
  "Fox Business": { risk: "low", note: "Commercial U.S. business-news publisher" },
  "Business Insider": { risk: "low", note: "Commercial business-news publisher with editorial standards" },
  "Wired": { risk: "low", note: "Technology publication with editorial standards" },
  "Handelsblatt": { risk: "low", note: "German business newspaper with editorial standards" },
  "Welt": { risk: "low", note: "German national newspaper with editorial standards" },
  "Telegraph": { risk: "low", note: "British national newspaper with editorial standards" },
  "Bellingcat": { risk: "low", note: "Open-source investigations, methodology transparent" },
  "Brasil Paralelo": { risk: "low", note: "Independent media company: no political ties, no public funding, 100% subscriber-funded." },
  // Periphery packs (#5953) — Caucasus
  "Civil.ge": { risk: "low", note: "Independent Georgian English-language news outlet" },
  "OC Media": { risk: "low", note: "Independent South Caucasus regional news outlet" },
  "JAMnews": { risk: "medium", note: "Regional Caucasus news platform, limited editorial transparency" },
  "Azertag": { risk: "high", stateAffiliated: "Azerbaijan", note: "Azerbaijani state news agency (AZERTAC)" },
  "Armenpress": { risk: "high", stateAffiliated: "Armenia", note: "Armenian state news agency" },
  // Periphery packs (#5953) — Belarus / Moldova
  "Zerkalo": { risk: "low", note: "Independent Belarusian exile news outlet (formerly TUT.BY)" },
  "NewsMaker": { risk: "medium", note: "Moldovan independent news outlet; configured Russian-language feed" },
  "Ziarul de Gard\u0103": { risk: "medium", note: "Moldovan investigative journalism outlet, Romanian-language" },
  // Periphery packs (#5953) — Central Asia
  "Eurasianet": { risk: "medium", note: "Nonprofit regional news covering Eurasia, Carnegie-funded" },
  "RFE/RL Central Asia": { risk: "medium", stateAffiliated: "USA", note: "US government-funded Central Asia desk (Radio Free Europe)" },
  "The Astana Times": { risk: "medium", stateAffiliated: "Kazakhstan", note: "Kazakhstan government-funded English-language news" },
  "The Times of Central Asia": { risk: "medium", note: "Independent English-language Central Asia news outlet" },
  // Telegram channels (#6600). Additive keys keyed by channel display label.
  ...TELEGRAM_SOURCE_PROPAGANDA_RISK,
  // Curated X news-account overlay (#6654). Additive to Telegram.
  ...X_ACCOUNT_SOURCE_PROPAGANDA_RISK
};

// shared/source-tiers.json
var source_tiers_default = {
  "24.hu": 2,
  "36Kr English": 3,
  "444.hu": 2,
  "ABC News": 2,
  "ABC News Australia": 2,
  AEI: 3,
  AFP: 1,
  "AI News": 4,
  "AI Now Institute": 3,
  "AI Podcast (NVIDIA)": 3,
  "AI Regulation": 3,
  ANSA: 1,
  "AP News": 1,
  ATV: 2,
  "Aaj Tak": 2,
  "Acquired Podcast": 2,
  "Actualite.cd": 3,
  Aftenposten: 2,
  "Al Jazeera": 2,
  "All-In Podcast": 2,
  "Amar Ujala": 2,
  AMNA: 1,
  "ArXiv AI": 4,
  "Arctic Today": 2,
  Armenpress: 1,
  "Arms Control Assn": 2,
  "Ars Technica": 3,
  "Atlantic Council": 3,
  Axios: 2,
  Azertag: 1,
  "BBC Hindi": 2,
  "BBC Middle East": 2,
  "BBC Mundo": 2,
  "BBC Persian": 2,
  "BBC Russian": 2,
  "BBC Turkce": 2,
  "BBC World": 2,
  "Balkan Insight": 1,
  "Bangkok Post": 2,
  Bellingcat: 3,
  "Benedict Evans": 2,
  "Bihus.Info": 2,
  "Binance Announcements": 2,
  Bloomberg: 1,
  "Brasil Paralelo": 2,
  "Brazil Tech News": 3,
  "Breaking Defense": 3,
  Brookings: 3,
  "Brookings Tech": 3,
  "Bruegel (EU)": 3,
  "Bulletin of Atomic Scientists": 2,
  "Business Insider": 2,
  "Business Wire": 3,
  "CAC (China)": 1,
  "CB Insights": 2,
  "CBC News": 1,
  "CBS News": 2,
  CDC: 2,
  CISA: 1,
  CNAS: 2,
  CNBC: 2,
  "CNN World": 2,
  "CNN Greece": 2,
  CP24: 2,
  CSIS: 3,
  "CSIS Tech": 3,
  "CTV News": 2,
  "Calgary Herald": 3,
  Carnegie: 3,
  Chainwire: 3,
  "Channels TV": 2,
  "Chatham House Tech": 3,
  "China Tech Analysis": 3,
  "China Tech News": 3,
  "China Tech Policy": 3,
  "Chosun Ilbo": 2,
  "Citi Newsroom": 3,
  "Civil.ge": 2,
  "Coinbase Blog": 2,
  "Conservation Optimism": 3,
  "Contxto (LATAM)": 3,
  Correctiv: 3,
  "Corriere della Sera": 2,
  CrisisWatch: 3,
  "Crunchbase News": 2,
  DFRLab: 2,
  DHS: 2,
  DOJ: 2,
  "DR Nyheder": 1,
  "DW News": 2,
  "DW Turkish": 2,
  "Dabanga Sudan": 3,
  "Dagens Nyheter": 2,
  "Daily Sabah": 2,
  "Daily Trust": 3,
  DailyGood: 3,
  Dawn: 2,
  "De Telegraaf": 2,
  DealStreetAsia: 3,
  "Decoder (Verge)": 3,
  "Defense News": 3,
  "Defense One": 3,
  "Der Spiegel": 2,
  "Die Zeit": 2,
  Digi24: 2,
  DigiChina: 2,
  Dnevnik: 2,
  "EFF News": 3,
  "ERR News": 2,
  ERT: 1,
  "EU Commission Digital": 2,
  "EU Digital Policy": 3,
  "EU ISS": 3,
  "EU Startups": 3,
  "Edmonton Journal": 3,
  "El Mundo": 2,
  "El Pa\xEDs": 2,
  "Entrackr (India)": 3,
  "Ethiopia Insight": 3,
  "Euractiv Digital": 3,
  Eurasianet: 2,
  EuroNews: 2,
  "Eye on AI": 3,
  "FAO GIEWS": 2,
  FEMA: 2,
  FPRI: 3,
  "Fars News": 3,
  "Federal Reserve": 3,
  "Financial Post": 2,
  "Financial Times": 2,
  "Focus Taiwan": 1,
  "Foreign Affairs": 3,
  "Foreign Policy": 3,
  "Fox Business": 2,
  "Fox News": 2,
  "France 24": 2,
  "France 24 Africa": 2,
  "France 24 Asia Pacific": 2,
  "France 24 LatAm": 2,
  G4Media: 2,
  "Gazeta Wyborcza": 1,
  GITOC: 3,
  GMF: 3,
  "GNN Animals": 3,
  "GNN Earth": 3,
  "GNN Health": 3,
  "GNN Heroes": 3,
  "GNN Heroes Spotlight": 3,
  "GNN Science": 3,
  "GOOD Magazine": 3,
  "Geo News": 2,
  "GloNewswire (Taiwan)": 4,
  "Global News": 2,
  "Globe and Mail": 2,
  GlobeNewswire: 3,
  "Good Good Good": 3,
  "Good News Network": 2,
  "Gradient Dissent": 3,
  "Guardian Africa": 2,
  "Guardian Australia": 2,
  "Guardian Caribbean": 2,
  "Guardian ME": 2,
  "Guardian Pacific": 2,
  "Guardian World": 2,
  HVG: 2,
  "Hacker News": 4,
  Handelsblatt: 2,
  "Hard Fork (NYT)": 2,
  "Hiiraan Online": 3,
  HotNews: 2,
  "How I Built This": 2,
  Hromadske: 2,
  "Hromadske EN": 2,
  Hurriyet: 2,
  H\u00EDrad\u00F3: 2,
  IAEA: 1,
  "ISEAS (Singapore)": 3,
  ISW: 2,
  "Inc42 (India)": 3,
  "Index.hr": 2,
  "Index.hu": 2,
  "India Tech News": 3,
  "India Tech Policy": 3,
  "Interfax EN": 1,
  "Interfax RU": 1,
  "Iran International": 3,
  Irrawaddy: 3,
  JAMnews: 3,
  "Jakarta Post": 2,
  Jamestown: 3,
  Janes: 3,
  "Japan Tech News": 3,
  Jin10: 2,
  "Jutarnji list": 2,
  "KED Global": 3,
  Kathimerini: 2,
  "Korea Tech News": 3,
  "Krebs Security": 3,
  "LATAM Fintech": 3,
  "LATAM Tech News": 3,
  "LRT English": 2,
  "LSM English": 2,
  "La Presse": 2,
  "La Silla Vac\xEDa": 3,
  "Layoffs News": 4,
  "Layoffs.fyi": 3,
  "Le Devoir": 2,
  "Le Monde": 2,
  "Le Quotidien": 3,
  "Lenny Newsletter": 2,
  "Lex Fridman Tech": 3,
  "Liberal GR": 2,
  "Lighthouse Reports": 3,
  "Lowy Institute": 3,
  "MIIT (China)": 1,
  "MIT Tech Policy": 3,
  "MIT Tech Review": 3,
  "MOFCOM (China)": 1,
  "Maclean's": 3,
  Magnitt: 3,
  MarketWatch: 2,
  "Masters of Scale": 2,
  Meduza: 2,
  "Mexico News Daily": 2,
  "Mexico Tech News": 3,
  "Military Times": 2,
  Mongabay: 3,
  "Montreal Gazette": 2,
  "My Modern Met": 2,
  MyJoyOnline: 2,
  "N1 Croatia": 2,
  "NBC News": 2,
  "NDRC (China)": 1,
  "NDTV India": 2,
  "NHK World": 2,
  "NOS Nieuws": 1,
  "NPR News": 2,
  NRC: 2,
  NRK: 1,
  "NV EN": 2,
  Naftemporiki: 2,
  "National Post": 2,
  NewsMaker: 2,
  "Nikkei Asia": 2,
  "Nikkei Tech": 2,
  "Novaya Gazeta Europe": 2,
  "OC Media": 2,
  OCCRP: 2,
  "OECD Digital": 2,
  "OKO.press": 2,
  Onet: 2,
  "ORF Tech (India)": 3,
  "OpenAI News": 3,
  "Optimist Daily": 2,
  "Oryx OSINT": 2,
  "Ottawa Citizen": 3,
  "PBS NewsHour": 2,
  "PBoC (China)": 1,
  "PR Newswire": 3,
  "Pandaily (China)": 3,
  PAP: 1,
  "Paul Graham Essays": 2,
  Pentagon: 1,
  "PitchBook News": 2,
  "Pivot (Vox)": 2,
  Politico: 2,
  "Politico Tech": 2,
  Polityka: 2,
  "Polsat News": 2,
  "Portfolio.hu": 2,
  "Positive.News": 2,
  "Premium Times": 2,
  "Proto Thema": 3,
  RAND: 3,
  "RFE/RL Central Asia": 2,
  "RFI Afrique": 2,
  "RIETI (Japan)": 3,
  RT: 3,
  "RT Russia": 3,
  RUSI: 2,
  "Radio Okapi": 3,
  "Radio Tamazuj": 3,
  "Radio-Canada": 1,
  "Ransomware.live": 3,
  Rappler: 2,
  "Reasons to be Cheerful": 2,
  Repubblica: 2,
  "Responsible Statecraft": 3,
  Reuters: 1,
  "Reuters Business": 1,
  "Reuters India": 1,
  "Reuters US": 1,
  "Reuters World": 1,
  Rzeczpospolita: 2,
  "SAMR (China)": 1,
  SEC: 3,
  "SVT Nyheter": 1,
  "Sequoia Blog": 2,
  "Seznam Zpr\xE1vy": 2,
  Shareable: 3,
  "Sifted (Europe)": 3,
  "Slidstvo.Info": 2,
  "Stanford HAI": 2,
  "Startups.co (LATAM)": 3,
  "State Dept": 1,
  "Stimson Center": 3,
  Stratechery: 2,
  "Sunny Skyz": 3,
  Suspilne: 1,
  "Svenska Dagbladet": 2,
  TASS: 3,
  "TVA Nouvelles": 2,
  TVN24: 2,
  "TVP Info": 2,
  Tagesschau: 1,
  "Ta Nea": 2,
  "Taipei Times": 2,
  "Taiwan News": 2,
  "Taiwan Tech News": 3,
  "Task & Purpose": 3,
  "Tech Antitrust": 3,
  "Tech in Asia": 3,
  "Tech.eu": 3,
  "TechCabal (Africa)": 3,
  "TechCrunch Layoffs": 4,
  "TechNode (China)": 3,
  Telegraph: 2,
  Telex: 2,
  "Thai PBS": 2,
  "The Astana Times": 2,
  "The Better India": 3,
  "The Bridge (Japan)": 3,
  "The Diplomat": 3,
  "The Hill": 3,
  "The Information": 2,
  "The Narwhal": 3,
  "The National": 2,
  "The Next Web": 3,
  "The Pitch": 3,
  "The Pragmatic Engineer": 2,
  "The Province": 2,
  "The Reporter Ethiopia": 3,
  "The Sentry": 3,
  "The Star (Malaysia)": 2,
  "The Times of Central Asia": 3,
  "Times of India": 2,
  "The Twenty Minute VC": 2,
  "The Tyee": 3,
  "The Verge": 4,
  "The Verge AI": 4,
  "The Vergecast": 3,
  "The War Zone": 3,
  "This Week in Startups": 3,
  ThisDay: 2,
  "Toronto Star": 2,
  Treasury: 2,
  "Tuoi Tre News": 2,
  "U.S. Trade Representative": 1,
  "UK MOD": 1,
  "UK Tech Policy": 3,
  "UN News": 1,
  UNHCR: 1,
  "USNI News": 2,
  "Ukrainska Pravda": 2,
  "Ukrainska Pravda EN": 2,
  Ukrinform: 1,
  Upworthy: 3,
  VSquare: 3,
  "Vancouver Sun": 3,
  "Vanguard Nigeria": 2,
  "VentureBeat AI": 4,
  VnExpress: 2,
  WHO: 1,
  "Wall Street Journal": 1,
  "Wamda (MENA)": 3,
  "War on the Rocks": 2,
  Welt: 2,
  "White House": 1,
  "White House Actions": 1,
  "Wilson Center": 3,
  "Winnipeg Free Press": 3,
  Wired: 2,
  Xinhua: 3,
  "Y Combinator Blog": 2,
  "Yahoo Finance": 4,
  "Yes! Magazine": 2,
  "Yle News": 1,
  "Yonhap News": 2,
  YourStory: 3,
  "ZN.UA": 2,
  Zerkalo: 2,
  "Ziarul de Gard\u0103": 3,
  "a16z Blog": 2,
  "a16z Podcast": 2,
  "e27 (SEA)": 3,
  gCaptain: 3,
  iPolitics: 3,
  iefimerida: 3,
  "in.gr": 3,
  "14ymedio": 2,
  "+972 Magazine": 2,
  ActuNiger: 2,
  "A\xEFr Info": 2,
  "Alwihda Info": 2,
  "Amu TV": 2,
  Annahar: 2,
  AyiboPost: 2,
  "Caracas Chronicles": 2,
  "Daily Nation": 2,
  "Dhaka Tribune": 2,
  "Efecto Cocuyo": 2,
  "Egypt Independent": 2,
  "Enab Baladi English": 2,
  "HaitiLibre English": 2,
  "Havana Times": 2,
  "Libya Herald": 2,
  "L'Orient Today": 2,
  "Mada Masr": 2,
  "Naharnet Lebanon": 2,
  "Pajhwok Afghan News": 2,
  "Radio Ndeke Luka": 2,
  "Sana'a Center": 2,
  "Studio Tamani": 2,
  "Syria Direct": 2,
  Tchadinfos: 2,
  "The Daily Star": 2,
  "The Guardian Post": 2,
  "WAFA English": 3,
  "Yemen Online": 2,
  "leFaso.net": 2
};

// server/_shared/source-tiers.ts
var SOURCE_TIERS = {
  ...source_tiers_default,
  ...TELEGRAM_SOURCE_TIERS,
  ...X_ACCOUNT_SOURCE_TIERS
};

// shared/news-credibility.js
var CREDIBILITY_WEIGHTS = Object.freeze({
  sourceTier: 0.3,
  propagandaRisk: 0.5,
  independentCorroboration: 0.2
});
var CREDIBILITY_TIER_SCORES = Object.freeze({
  1: 100,
  2: 75,
  3: 50,
  4: 25
});
var CREDIBILITY_RISK_SCORES = Object.freeze({
  low: 100,
  medium: 50,
  unknown: 35,
  high: 12
});

// src/config/feeds.ts
var rss = rssProxyUrl;
var railwayRss = rssProxyUrl;
var FULL_FEEDS = {
  politics: [
    { name: "BBC World", url: rss("https://feeds.bbci.co.uk/news/world/rss.xml") },
    { name: "Guardian World", url: rss("https://www.theguardian.com/world/rss") },
    { name: "AP News", url: rss("https://news.google.com/rss/search?q=site:apnews.com&hl=en-US&gl=US&ceid=US:en") },
    { name: "Reuters World", url: rss("https://news.google.com/rss/search?q=site:reuters.com+world&hl=en-US&gl=US&ceid=US:en") },
    { name: "CNN World", url: rss("https://news.google.com/rss/search?q=site:cnn.com+world+news+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Trump - Truth Social", url: rss("https://trumpstruth.org/feed") }
  ],
  us: [
    { name: "Reuters US", url: rss("https://news.google.com/rss/search?q=site:reuters.com+US&hl=en-US&gl=US&ceid=US:en") },
    { name: "NPR News", url: rss("https://feeds.npr.org/1001/rss.xml") },
    { name: "PBS NewsHour", url: rss("https://www.pbs.org/newshour/feeds/rss/headlines") },
    { name: "ABC News", url: rss("https://feeds.abcnews.com/abcnews/topstories") },
    { name: "CBS News", url: rss("https://www.cbsnews.com/latest/rss/main") },
    { name: "NBC News", url: rss("https://feeds.nbcnews.com/nbcnews/public/news") },
    { name: "Wall Street Journal", url: rss("https://feeds.content.dowjones.io/public/rss/RSSUSnews") },
    { name: "Politico", url: rss("https://rss.politico.com/politics-news.xml") },
    { name: "The Hill", url: rss("https://thehill.com/news/feed") },
    { name: "Axios", url: rss("https://api.axios.com/feed/") },
    { name: "Fox News", url: rss("https://moxie.foxnews.com/google-publisher/us.xml") },
    // Canada + North America key-country pack (#5960). CA is a North America
    // keyCountry but had zero dedicated catalog sources. CBC World is the
    // EN-default (noise-acceptable public broadcaster); Globe and Global News
    // stay catalog opt-in. Canadian Press has no usable public RSS/GNews feed.
    { name: "CBC News", url: rss("https://www.cbc.ca/webfeed/rss/rss-world") },
    { name: "Globe and Mail", url: rss("https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/canada/?outputType=xml") },
    { name: "Global News", url: rss("https://globalnews.ca/feed/") },
    // Canada depth pack (#6604/#6605). CBC stays default-on; CTV News and
    // Toronto Star join the EN default-on national floor (floors.CA = 3).
    // Remaining names are catalog opt-in. FR sources are locale-boosted only.
    { name: "Toronto Star", url: rss("https://www.thestar.com/search/?f=rss&t=article&c=news/canada") },
    { name: "National Post", url: rss("https://nationalpost.com/feed/") },
    { name: "Financial Post", url: rss("https://financialpost.com/feed/") },
    { name: "iPolitics", url: rss("https://www.ipolitics.ca/feed") },
    { name: "The Narwhal", url: rss("https://thenarwhal.ca/feed/") },
    { name: "The Tyee", url: rss("https://thetyee.ca/rss2.xml") },
    { name: "Radio-Canada", url: rss("https://ici.radio-canada.ca/info/rss/info/en-continu"), lang: "fr" },
    { name: "La Presse", url: rss("https://www.lapresse.ca/actualites/rss"), lang: "fr" },
    { name: "Le Devoir", url: rss("https://www.ledevoir.com/rss/manchettes.xml"), lang: "fr" },
    { name: "TVA Nouvelles", url: rss("https://www.tvanouvelles.ca/rss.xml"), lang: "fr" },
    { name: "Vancouver Sun", url: rss("https://vancouversun.com/feed/") },
    { name: "Calgary Herald", url: rss("https://calgaryherald.com/feed/") },
    { name: "Winnipeg Free Press", url: rss("https://www.winnipegfreepress.com/feed") },
    { name: "Ottawa Citizen", url: rss("https://ottawacitizen.com/feed/") },
    { name: "Edmonton Journal", url: rss("https://edmontonjournal.com/feed/") },
    { name: "Maclean's", url: rss("https://macleans.ca/feed/") },
    { name: "The Province", url: rss("https://theprovince.com/feed/") },
    // GNews-only (#6604): no parseable native RSS. CA locale. Do not allowlist publisher hosts.
    { name: "CTV News", url: rss("https://news.google.com/rss/search?q=site:ctvnews.ca+when:1d&hl=en-CA&gl=CA&ceid=CA:en") },
    { name: "CP24", url: rss("https://news.google.com/rss/search?q=site:cp24.com+when:1d&hl=en-CA&gl=CA&ceid=CA:en") },
    { name: "Montreal Gazette", url: rss("https://news.google.com/rss/search?q=site:montrealgazette.com+when:1d&hl=en-CA&gl=CA&ceid=CA:en") }
  ],
  europe: [
    {
      name: "France 24",
      url: {
        en: rss("https://www.france24.com/en/rss"),
        fr: rss("https://www.france24.com/fr/rss"),
        es: rss("https://www.france24.com/es/rss"),
        ar: rss("https://www.france24.com/ar/rss")
      }
    },
    {
      name: "EuroNews",
      url: {
        en: rss("https://www.euronews.com/rss?format=xml"),
        fr: rss("https://fr.euronews.com/rss?format=xml"),
        de: rss("https://de.euronews.com/rss?format=xml"),
        it: rss("https://it.euronews.com/rss?format=xml"),
        es: rss("https://es.euronews.com/rss?format=xml"),
        pt: rss("https://pt.euronews.com/rss?format=xml"),
        ru: rss("https://ru.euronews.com/rss?format=xml"),
        gr: rss("https://gr.euronews.com/rss?format=xml")
      }
    },
    {
      name: "Le Monde",
      url: {
        en: rss("https://www.lemonde.fr/en/rss/une.xml"),
        fr: rss("https://www.lemonde.fr/rss/une.xml")
      }
    },
    { name: "DW News", url: { en: rss("https://rss.dw.com/xml/rss-en-all"), de: rss("https://rss.dw.com/xml/rss-de-all"), es: rss("https://news.google.com/rss/search?q=site:dw.com/es&hl=es-419&gl=MX&ceid=MX:es-419") } },
    { name: "Telegraph", url: rss("https://www.telegraph.co.uk/rss.xml") },
    { name: "Interfax EN", url: rss("https://news.google.com/rss/search?q=site%3Ainterfax.com%20when%3A7d&hl=en-US&gl=US&ceid=US:en") },
    // Spanish (ES)
    { name: "El Pa\xEDs", url: rss("https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada"), lang: "es" },
    { name: "El Mundo", url: rss("https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml"), lang: "es" },
    { name: "BBC Mundo", url: rss("https://www.bbc.com/mundo/index.xml"), lang: "es" },
    // German (DE)
    { name: "Tagesschau", url: rss("https://www.tagesschau.de/xml/rss2/"), lang: "de" },
    { name: "Bild", url: rss("https://www.bild.de/feed/alles.xml"), lang: "de" },
    { name: "Der Spiegel", url: rss("https://www.spiegel.de/schlagzeilen/tops/index.rss"), lang: "de" },
    { name: "Die Zeit", url: rss("https://newsfeed.zeit.de/index"), lang: "de" },
    { name: "Handelsblatt", url: rss("https://www.handelsblatt.com/contentexport/feed/schlagzeilen"), lang: "de" },
    { name: "Welt", url: rss("https://www.welt.de/feeds/latest.rss"), lang: "de" },
    // Italian (IT)
    { name: "ANSA", url: rss("https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml"), lang: "it" },
    { name: "Corriere della Sera", url: rss("https://www.corriere.it/rss/homepage.xml"), lang: "it" },
    { name: "Repubblica", url: rss("https://www.repubblica.it/rss/homepage/rss2.0.xml"), lang: "it" },
    // Dutch (NL)
    { name: "NOS Nieuws", url: rss("https://feeds.nos.nl/nosnieuwsalgemeen"), lang: "nl" },
    { name: "NRC", url: rss("https://www.nrc.nl/rss/"), lang: "nl" },
    { name: "De Telegraaf", url: rss("https://news.google.com/rss/search?q=site:telegraaf.nl+when:1d&hl=nl&gl=NL&ceid=NL:nl"), lang: "nl" },
    // Swedish (SV)
    { name: "SVT Nyheter", url: rss("https://www.svt.se/nyheter/rss.xml"), lang: "sv" },
    { name: "Dagens Nyheter", url: rss("https://www.dn.se/rss/"), lang: "sv" },
    { name: "Svenska Dagbladet", url: rss("https://www.svd.se/feed/articles.rss"), lang: "sv" },
    // Arctic / Nordic security pack (#5960) — High North + Nordics beyond Sweden.
    // no/da/fi are not UI locales, so native Nordics are left unscoped (no lang
    // tag) so EN analysts can enable them. Yle News + Arctic Today are English.
    { name: "Yle News", url: rss("https://yle.fi/rss/news") },
    { name: "NRK", url: rss("https://www.nrk.no/nyheter/siste.rss") },
    { name: "Aftenposten", url: rss("https://www.aftenposten.no/rss") },
    { name: "DR Nyheder", url: rss("https://www.dr.dk/nyheder/service/feeds/allenyheder") },
    // High North specialty (Berlingske/High North News lack reliable public RSS).
    { name: "Arctic Today", url: rss("https://news.google.com/rss/search?q=site:arctictoday.com+when:14d&hl=en-US&gl=US&ceid=US:en") },
    // Turkish (TR)
    { name: "BBC Turkce", url: rss("https://feeds.bbci.co.uk/turkce/rss.xml"), lang: "tr" },
    { name: "DW Turkish", url: rss("https://rss.dw.com/xml/rss-tur-all"), lang: "tr" },
    { name: "Hurriyet", url: rss("https://www.hurriyet.com.tr/rss/anasayfa"), lang: "tr", strategicDefault: true },
    // Daily Sabah (EN) — Turkey EN path improvement (#5952). English-language,
    // no lang tag, so EN digests include it as a default-on flank source.
    { name: "Daily Sabah", url: rss("https://www.dailysabah.com/rss/home-page") },
    // Polish (PL) — TVN24 / Rzeczpospolita are EN-default frontline sources (#5949).
    // Their native RSS feeds are used for both locales: the Google News site
    // queries previously used for EN returned HTTP 200 with no <item> nodes.
    // No `lang` tag so isFeedInLanguage / server digests do not drop them for EN.
    // Polsat News — strategic default via `strategicDefault: true` (#5958).
    { name: "TVN24", url: {
      en: rss("https://tvn24.pl/swiat.xml"),
      pl: rss("https://tvn24.pl/swiat.xml")
    } },
    { name: "Polsat News", url: rss("https://www.polsatnews.pl/rss/wszystkie.xml"), lang: "pl", strategicDefault: true },
    { name: "Rzeczpospolita", url: {
      en: rss("https://www.rp.pl/rss_main"),
      pl: rss("https://www.rp.pl/rss_main")
    } },
    // Polish depth — catalog opt-in, locale-boosted for `pl`. Native RSS for
    // PAP (`/rss.xml`) and Onet (`wiadomosci.onet.pl/rss/index.xml`) is dead;
    // keep those on Google News. OKO.press still publishes a live native feed.
    { name: "PAP", url: rss("https://news.google.com/rss/search?q=site%3Apap.pl%20when%3A2d&hl=pl&gl=PL&ceid=PL:pl"), lang: "pl" },
    { name: "Gazeta Wyborcza", url: rss("https://news.google.com/rss/search?q=site%3Awyborcza.pl%20when%3A2d&hl=pl&gl=PL&ceid=PL:pl"), lang: "pl" },
    { name: "Polityka", url: rss("https://news.google.com/rss/search?q=site%3Apolityka.pl%20when%3A2d&hl=pl&gl=PL&ceid=PL:pl"), lang: "pl" },
    { name: "Onet", url: rss("https://news.google.com/rss/search?q=site%3Awiadomosci.onet.pl%20when%3A2d&hl=pl&gl=PL&ceid=PL:pl"), lang: "pl" },
    { name: "OKO.press", url: rss("https://oko.press/feed"), lang: "pl" },
    { name: "TVP Info", url: rss("https://news.google.com/rss/search?q=site%3Atvp.info%20when%3A2d&hl=pl&gl=PL&ceid=PL:pl"), lang: "pl" },
    // Hungarian (HU) — V4 / CEE coverage. Locale-gated for hu users only,
    // matching the Tagesschau (de) / ANSA (it) / NOS Nieuws (nl) / SVT (sv)
    // convention. `hu` is registered as a supported locale in src/services/i18n.ts.
    { name: "Telex", url: rss("https://telex.hu/rss"), lang: "hu" },
    { name: "Index.hu", url: rss("https://index.hu/24ora/rss"), lang: "hu" },
    { name: "HVG", url: rss("https://hvg.hu/rss"), lang: "hu" },
    { name: "444.hu", url: rss("https://444.hu/feed"), lang: "hu" },
    { name: "24.hu", url: rss("https://24.hu/feed/"), lang: "hu" },
    { name: "H\xEDrad\xF3", url: rss("https://news.google.com/rss/search?q=site:hirado.hu+when:2d&hl=hu&gl=HU&ceid=HU:hu"), lang: "hu" },
    { name: "Portfolio.hu", url: rss("https://portfolio.hu/rss/all.xml"), lang: "hu" },
    { name: "ATV", url: rss("https://www.atv.hu/rss"), lang: "hu" },
    // Czech (CS) — V4 balance with Hungary (#5952). Locale-boosted for cs users.
    { name: "Seznam Zpr\xE1vy", url: rss("https://www.seznamzpravy.cz/rss"), lang: "cs" },
    // Croatian (HR) — mainstream + investigative
    { name: "N1 Croatia", url: rss("https://n1info.hr/feed/"), lang: "hr" },
    { name: "Index.hr", url: rss("https://www.index.hr/rss"), lang: "hr" },
    { name: "Jutarnji list", url: rss("https://www.jutarnji.hr/feed"), lang: "hr" },
    { name: "Balkan Insight", url: rss("https://balkaninsight.com/feed/") },
    // Romanian (RO) — Eastern flank (#5952). Locale-boosted for ro users.
    { name: "Digi24", url: rss("https://www.digi24.ro/rss"), lang: "ro" },
    { name: "HotNews", url: rss("https://www.hotnews.ro/rss"), lang: "ro" },
    { name: "G4Media", url: rss("https://www.g4media.ro/feed/"), lang: "ro" },
    // Bulgarian (BG) — Black Sea flank (#5952). Locale-boosted for bg users.
    { name: "Dnevnik", url: rss("https://www.dnevnik.bg/rss/"), lang: "bg" },
    // Greek (EL)
    { name: "Kathimerini", url: rss("https://news.google.com/rss/search?q=site:kathimerini.gr+when:2d&hl=el&gl=GR&ceid=GR:el"), lang: "el", strategicDefault: true },
    { name: "Naftemporiki", url: rss("https://www.naftemporiki.gr/feed/"), lang: "el" },
    { name: "in.gr", url: rss("https://www.in.gr/feed/"), lang: "el" },
    { name: "iefimerida", url: rss("https://www.iefimerida.gr/rss.xml"), lang: "el" },
    { name: "Proto Thema", url: rss("https://news.google.com/rss/search?q=site:protothema.gr+when:2d&hl=el&gl=GR&ceid=GR:el"), lang: "el" },
    { name: "ERT", url: rss("https://news.google.com/rss/search?q=site:ert.gr+when:2d&hl=el&gl=GR&ceid=GR:el"), lang: "el" },
    { name: "AMNA", url: rss("https://news.google.com/rss/search?q=site:amna.gr+when:2d&hl=el&gl=GR&ceid=GR:el"), lang: "el" },
    { name: "Ta Nea", url: rss("https://www.tanea.gr/feed/"), lang: "el" },
    { name: "Liberal GR", url: rss("https://news.google.com/rss/search?q=site:liberal.gr+when:2d&hl=el&gl=GR&ceid=GR:el"), lang: "el" },
    { name: "CNN Greece", url: rss("https://news.google.com/rss/search?q=site:cnn.gr+when:2d&hl=el&gl=GR&ceid=GR:el"), lang: "el" },
    // Baltic states — Eastern flank (#5952). English-language Baltic news
    // services (no lang tag) so EN digests can include them as flank sources.
    { name: "ERR News", url: rss("https://news.err.ee/rss") },
    { name: "LRT English", url: rss("https://www.lrt.lt/en/news-in-english?rss") },
    { name: "LSM English", url: rss("https://eng.lsm.lv/rss/") },
    // Russia & Ukraine — EN default balance rule (#5950):
    // For DEFAULT_ENABLED_SOURCES.europe (EN full-variant path), keep at least:
    //   ≥1 dedicated UA primary (today: Kyiv Independent)
    //   ≥1 independent RU (today: Meduza and/or Moscow Times)
    // Never default-enable TASS / RT / RT Russia (state propaganda; catalog opt-in only).
    // Default EN path must not be “Western wires + RU state media only.”
    // Independent / exile / UA outlets below are eligible for defaults; state media is not.
    { name: "BBC Russian", url: rss("https://feeds.bbci.co.uk/russian/rss.xml"), lang: "ru" },
    { name: "Interfax RU", url: rss("https://www.interfax.ru/rss.asp"), lang: "ru" },
    // Meduza: multi-URL so EN digests use the English RSS (no lang gate); RU UI keeps Russian.
    { name: "Meduza", url: {
      en: rss("https://meduza.io/rss/en/all"),
      ru: rss("https://meduza.io/rss/all")
    } },
    { name: "Novaya Gazeta Europe", url: rss("https://novayagazeta.eu/feed/rss"), lang: "ru" },
    { name: "TASS", url: rss("https://news.google.com/rss/search?q=site:tass.com+OR+TASS+Russia+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "RT", url: rss("https://www.rt.com/rss/") },
    { name: "RT Russia", url: rss("https://www.rt.com/rss/russia/") },
    // English-language (no lang tag) — always EN-digest-reachable
    { name: "Kyiv Independent", url: rss("https://news.google.com/rss/search?q=site:kyivindependent.com+when:3d&hl=en-US&gl=US&ceid=US:en") },
    // Ukraine depth pack (#5951) — local institutional + independent sources.
    // Ukrinform / Suspilne are multi-URL so EN digests keep the English edition
    // while `uk` UI users get UA-language Google News (locale boost via url key).
    { name: "Ukrinform", url: {
      en: rss("https://news.google.com/rss/search?q=site:ukrinform.net+when:3d&hl=en-US&gl=US&ceid=US:en"),
      uk: rss("https://news.google.com/rss/search?q=site:ukrinform.ua+when:3d&hl=uk&gl=UA&ceid=UA:uk")
    } },
    { name: "Suspilne", url: {
      en: rss("https://news.google.com/rss/search?q=site:suspilne.media+when:2d&hl=en-US&gl=US&ceid=US:en"),
      uk: rss("https://news.google.com/rss/search?q=site:suspilne.media+when:2d&hl=uk&gl=UA&ceid=UA:uk")
    } },
    { name: "Ukrainska Pravda EN", url: rss("https://news.google.com/rss/search?q=site:euromaidanpress.com+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "NV EN", url: rss("https://news.google.com/rss/search?q=site:english.nv.ua+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Hromadske EN", url: rss("https://news.google.com/rss/search?q=site:hromadske.ua+when:3d&hl=en-US&gl=US&ceid=US:en") },
    // Ukrainian (uk) — native-language pack for uk locale (#5959).
    // Locale-gated like Telex (hu) / Digi24 (ro): not EN default-on.
    { name: "Ukrainska Pravda", url: rss("https://news.google.com/rss/search?q=site:pravda.com.ua+when:2d&hl=uk&gl=UA&ceid=UA:uk"), lang: "uk" },
    { name: "Hromadske", url: rss("https://news.google.com/rss/search?q=site:hromadske.ua+when:3d&hl=uk&gl=UA&ceid=UA:uk"), lang: "uk" },
    { name: "Bihus.Info", url: rss("https://news.google.com/rss/search?q=site:bihus.info+when:7d&hl=uk&gl=UA&ceid=UA:uk"), lang: "uk" },
    { name: "Slidstvo.Info", url: rss("https://news.google.com/rss/search?q=site:slidstvo.info+when:7d&hl=uk&gl=UA&ceid=UA:uk"), lang: "uk" },
    { name: "ZN.UA", url: rss("https://news.google.com/rss/search?q=site:zn.ua+when:3d&hl=uk&gl=UA&ceid=UA:uk"), lang: "uk" },
    { name: "Moscow Times", url: rss("https://www.themoscowtimes.com/rss/news") },
    // Caucasus (#5953) — secondary Russian periphery / BRI hinterland
    { name: "Civil.ge", url: rss("https://civil.ge/feed/") },
    { name: "OC Media", url: rss("https://oc-media.org/feed/") },
    { name: "JAMnews", url: rss("https://jam-news.net/feed/") },
    // Risk-tagged state wires — Azertag (Azerbaijan) / Armenpress (Armenia)
    { name: "Azertag", url: rss("https://news.google.com/rss/search?q=site:azertag.az+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Armenpress", url: rss("https://news.google.com/rss/search?q=site:armenpress.am+when:3d&hl=en-US&gl=US&ceid=US:en") },
    // Belarus / Moldova (#5953) — secondary pressure line
    { name: "Zerkalo", url: rss("https://news.google.com/rss/search?q=site:zerkalo.io+when:2d&hl=en-US&gl=US&ceid=US:en") },
    // NewsMaker removed its English feed; keep the live native Russian feed
    // locale-scoped instead of default-enabling a 404 or mislabeled content.
    { name: "NewsMaker", url: rss("https://newsmaker.md/feed"), lang: "ru" },
    { name: "Ziarul de Gard\u0103", url: rss("https://www.zdg.md/feed/"), lang: "ro" }
  ],
  middleeast: [
    { name: "BBC Middle East", url: rss("https://feeds.bbci.co.uk/news/world/middle_east/rss.xml") },
    { name: "Al Jazeera", url: { en: rss("https://www.aljazeera.com/xml/rss/all.xml"), ar: rss("https://www.aljazeera.net/aljazeerarss/a7c186be-1adb-4b11-a982-4783e765316e/4e17ecdc-8fb9-40de-a5d6-d00f72384a51") } },
    // AlArabiya EN blocks cloud IPs — Google News fallback; AR RSS is direct
    { name: "Al Arabiya", url: { en: rss("https://news.google.com/rss/search?q=site:english.alarabiya.net+when:2d&hl=en-US&gl=US&ceid=US:en"), ar: rss("https://www.alarabiya.net/tools/mrss/?cat=main") } },
    // Arab News and Times of Israel removed — 403 from cloud IPs
    { name: "Guardian ME", url: rss("https://www.theguardian.com/world/middleeast/rss") },
    { name: "BBC Persian", url: rss("https://feeds.bbci.co.uk/persian/rss.xml") },
    { name: "Iran International", url: rss("https://news.google.com/rss/search?q=site:iranintl.com+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Fars News", url: rss("https://news.google.com/rss/search?q=site:farsnews.ir+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "IRNA", url: rss("https://en.irna.ir/rss") },
    { name: "Mehr News", url: rss("https://en.mehrnews.com/rss") },
    { name: "Haaretz", url: rss("https://news.google.com/rss/search?q=site:haaretz.com+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Jerusalem Post", url: rss("https://www.jpost.com/rss/rssfeedsheadlines.aspx") },
    { name: "Ynetnews", url: rss("https://www.ynetnews.com/Integration/StoryRss3089.xml") },
    { name: "Arab News", url: rss("https://news.google.com/rss/search?q=site:arabnews.com+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "The National", url: rss("https://news.google.com/rss/search?q=site:thenationalnews.com+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Oman Observer", url: rss("https://www.omanobserver.om/rssFeed/1") },
    { name: "Asharq Business", url: rss("https://asharqbusiness.com/rss.xml") },
    { name: "Asharq News", url: rss("https://asharq.com/snapchat/rss.xml"), lang: "ar" },
    { name: "Rudaw", url: rss("https://news.google.com/rss/search?q=site:rudaw.net+when:7d&hl=en&gl=US&ceid=US:en") },
    // Validated crisis-floor desks (#6813-#6818, #6824-#6825).
    { name: "Yemen Online", url: rss("https://news.google.com/rss/search?q=site%3Ayemenonline.info%20when%3A14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Sana'a Center", url: rss("https://sanaacenter.org/feed/") },
    { name: "Syria Direct", url: rss("https://syriadirect.org/feed/") },
    { name: "Enab Baladi English", url: rss("https://news.google.com/rss/search?q=site%3Aenglish.enabbaladi.net%20when%3A14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "+972 Magazine", url: rss("https://www.972mag.com/feed/") },
    { name: "WAFA English", url: rss("https://news.google.com/rss/search?q=site%3Aenglish.wafa.ps%20when%3A7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Naharnet Lebanon", url: rss("https://www.naharnet.com/tags/lebanon/en/feed.atom") },
    { name: "L'Orient Today", url: rss("https://news.google.com/rss/search?q=site%3Alorientlejour.com%20Lebanon%20when%3A7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Annahar", url: rss("https://news.google.com/rss/search?q=site%3Aannahar.com%2Flebanon%20when%3A7d&hl=ar&gl=LB&ceid=LB:ar"), lang: "ar", strategicDefault: true },
    { name: "Libya Herald", url: rss("https://libyaherald.com/rss.xml") },
    { name: "Egypt Independent", url: rss("https://www.egyptindependent.com/feed/") },
    { name: "Mada Masr", url: rss("https://news.google.com/rss/search?q=site%3Amadamasr.com%20when%3A30d&hl=en-US&gl=US&ceid=US:en") }
  ],
  tech: [
    { name: "Hacker News", url: rss("https://hnrss.org/frontpage") },
    { name: "Ars Technica", url: rss("https://feeds.arstechnica.com/arstechnica/technology-lab") },
    { name: "The Verge", url: rss("https://www.theverge.com/rss/index.xml") },
    { name: "MIT Tech Review", url: rss("https://www.technologyreview.com/feed/") },
    { name: "Wired", url: rss("https://www.wired.com/feed/rss") }
  ],
  ai: [
    { name: "AI News", url: rss('https://news.google.com/rss/search?q=(OpenAI+OR+Anthropic+OR+Google+AI+OR+"large+language+model"+OR+ChatGPT)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "VentureBeat AI", url: rss("https://venturebeat.com/category/ai/feed/") },
    { name: "The Verge AI", url: rss("https://www.theverge.com/rss/ai-artificial-intelligence/index.xml") },
    { name: "MIT Tech Review", url: rss("https://www.technologyreview.com/topic/artificial-intelligence/feed") },
    { name: "ArXiv AI", url: rss("https://export.arxiv.org/rss/cs.AI") }
  ],
  finance: [
    { name: "CNBC", url: rss("https://www.cnbc.com/id/100003114/device/rss/rss.html") },
    { name: "MarketWatch", url: rss("https://news.google.com/rss/search?q=site:marketwatch.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Yahoo Finance", url: rss("https://finance.yahoo.com/news/rssindex") },
    { name: "Financial Times", url: rss("https://www.ft.com/rss/home") },
    { name: "Reuters Business", url: rss("https://news.google.com/rss/search?q=site:reuters.com+business+markets&hl=en-US&gl=US&ceid=US:en") },
    { name: "Fox Business", url: rss("https://moxie.foxbusiness.com/google-publisher/latest.xml") },
    { name: "Business Insider", url: rss("https://www.businessinsider.com/rss") },
    { name: "GlobeNewswire", url: rss("https://www.globenewswire.com/RssFeed/subjectcode/22/feedTitle/GlobeNewswire") },
    { name: "Business Wire", url: rss("https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtRWA==") },
    { name: "PR Newswire", url: rss("https://news.google.com/rss/search?q=site%3Aprnewswire.com%20when%3A1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Chainwire", url: rss("https://chainwire.org/feed/") },
    { name: "Coinbase Blog", url: rss("https://news.google.com/rss/search?q=site%3Acoinbase.com%2Fblog%20when%3A7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Binance Announcements", url: rss("https://news.google.com/rss/search?q=site%3Abinance.com%2Fen%2Fsupport%2Fannouncement%20when%3A3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Jin10", url: rss("https://news.google.com/rss/search?q=site%3Ajin10.com%20when%3A1d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans"), lang: "zh" }
  ],
  gov: [
    { name: "White House", url: rss("https://www.whitehouse.gov/briefings-statements/feed/") },
    { name: "White House Actions", url: rss("https://www.whitehouse.gov/presidential-actions/feed/") },
    { name: "State Dept", url: rss('https://news.google.com/rss/search?q=site:state.gov+OR+"State+Department"&hl=en-US&gl=US&ceid=US:en') },
    { name: "Pentagon", url: rss("https://www.war.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=945") },
    { name: "Treasury", url: rss('https://news.google.com/rss/search?q=site:treasury.gov+OR+"Treasury+Department"&hl=en-US&gl=US&ceid=US:en') },
    { name: "DOJ", url: rss('https://news.google.com/rss/search?q=site:justice.gov+OR+"Justice+Department"+DOJ&hl=en-US&gl=US&ceid=US:en') },
    { name: "Federal Reserve", url: rss("https://www.federalreserve.gov/feeds/press_all.xml") },
    { name: "SEC", url: rss("https://www.sec.gov/news/pressreleases.rss") },
    { name: "CDC", url: rss("https://news.google.com/rss/search?q=site:cdc.gov+OR+CDC+health&hl=en-US&gl=US&ceid=US:en") },
    { name: "FEMA", url: rss("https://news.google.com/rss/search?q=site:fema.gov+OR+FEMA+emergency&hl=en-US&gl=US&ceid=US:en") },
    { name: "DHS", url: rss('https://news.google.com/rss/search?q=site:dhs.gov+OR+"Homeland+Security"&hl=en-US&gl=US&ceid=US:en') },
    { name: "U.S. Trade Representative", url: rss("https://ustr.gov/rss.xml") },
    { name: "UN News", url: railwayRss("https://news.un.org/feed/subscribe/en/news/all/rss.xml") },
    { name: "CISA", url: railwayRss("https://www.cisa.gov/cybersecurity-advisories/all.xml") }
  ],
  layoffs: [
    { name: "Layoffs.fyi", url: rss("https://news.google.com/rss/search?q=tech+company+layoffs+announced&hl=en&gl=US&ceid=US:en") },
    { name: "TechCrunch Layoffs", url: rss("https://techcrunch.com/tag/layoffs/feed/") },
    { name: "Layoffs News", url: rss('https://news.google.com/rss/search?q=(layoffs+OR+"job+cuts"+OR+"workforce+reduction")+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  thinktanks: [
    { name: "Foreign Policy", url: rss("https://foreignpolicy.com/feed/") },
    { name: "Atlantic Council", url: railwayRss("https://www.atlanticcouncil.org/feed/") },
    { name: "Foreign Affairs", url: rss("https://www.foreignaffairs.com/rss.xml") },
    { name: "CSIS", url: rss("https://news.google.com/rss/search?q=site:csis.org+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "RAND", url: rss("https://www.rand.org/pubs/articles.xml") },
    { name: "Brookings", url: rss("https://news.google.com/rss/search?q=site:brookings.edu+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Carnegie", url: rss("https://news.google.com/rss/search?q=site:carnegieendowment.org+when:7d&hl=en-US&gl=US&ceid=US:en") },
    // New verified think tank feeds
    // War on the Rocks - Defense and national security analysis
    { name: "War on the Rocks", url: rss("https://warontherocks.com/feed") },
    // Responsible Statecraft - Foreign policy analysis (Quincy Institute)
    { name: "Responsible Statecraft", url: rss("https://responsiblestatecraft.org/feed/") },
    // RUSI - Royal United Services Institute (UK defense & security)
    { name: "RUSI", url: rss("https://news.google.com/rss/search?q=site:rusi.org+when:3d&hl=en-US&gl=US&ceid=US:en") },
    // FPRI - Foreign Policy Research Institute (US foreign policy)
    { name: "FPRI", url: rss("https://www.fpri.org/feed/") },
    // Jamestown Foundation - Eurasia/China/Terrorism analysis
    { name: "Jamestown", url: rss("https://jamestown.org/feed/") },
    // ISW — Institute for the Study of War, daily Ukraine frontline operational assessments
    { name: "ISW", url: rss("https://news.google.com/rss/search?q=site:understandingwar.org+when:2d&hl=en-US&gl=US&ceid=US:en") }
  ],
  crisis: [
    { name: "CrisisWatch", url: rss("https://www.crisisgroup.org/rss") },
    { name: "IAEA", url: rss("https://www.iaea.org/feeds/topnews") },
    { name: "WHO", url: rss("https://www.who.int/rss-feeds/news-english.xml") },
    { name: "UNHCR", url: rss("https://news.google.com/rss/search?q=site:unhcr.org+OR+UNHCR+refugees+when:3d&hl=en-US&gl=US&ceid=US:en") }
  ],
  africa: [
    // Regional desks widen country grounding beyond the world-news feeds (#7748).
    { name: "Guardian Africa", url: rss("https://www.theguardian.com/world/africa/rss") },
    { name: "France 24 Africa", url: rss("https://www.france24.com/en/africa/rss") },
    { name: "Africa News", url: rss('https://news.google.com/rss/search?q=(Africa+OR+Nigeria+OR+Kenya+OR+"South+Africa"+OR+Ethiopia)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Sahel Crisis", url: rss('https://news.google.com/rss/search?q=(Sahel+OR+Mali+OR+Niger+OR+"Burkina+Faso"+OR+Wagner)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "News24", url: rss("https://feeds.news24.com/articles/news24/TopStories/rss") },
    { name: "BBC Africa", url: rss("https://feeds.bbci.co.uk/news/world/africa/rss.xml") },
    { name: "Jeune Afrique", url: rss("https://www.jeuneafrique.com/feed/"), lang: "fr", strategicDefault: true },
    { name: "Africanews", url: { en: rss("https://www.africanews.com/feed/rss"), fr: rss("https://fr.africanews.com/feed/rss") } },
    { name: "BBC Afrique", url: rss("https://www.bbc.com/afrique/index.xml"), lang: "fr" },
    // Nigeria
    { name: "Premium Times", url: rss("https://www.premiumtimesng.com/feed") },
    { name: "Vanguard Nigeria", url: rss("https://www.vanguardngr.com/feed/") },
    { name: "Channels TV", url: rss("https://www.channelstv.com/feed/") },
    { name: "Daily Trust", url: rss("https://dailytrust.com/feed/") },
    { name: "ThisDay", url: rss("https://www.thisdaylive.com/feed") },
    // Horn of Africa
    { name: "Radio Tamazuj", url: rss("https://www.radiotamazuj.org/en/feed") },
    { name: "The Reporter Ethiopia", url: rss("https://www.thereporterethiopia.com/feed/") },
    { name: "Ethiopia Insight", url: rss("https://www.ethiopia-insight.com/feed/") },
    { name: "Dabanga Sudan", url: rss("https://www.dabangasudan.org/en/feed") },
    { name: "Hiiraan Online", url: rss("https://news.google.com/rss/search?q=site%3Ahiiraan.com%20when%3A7d&hl=en-US&gl=US&ceid=US:en") },
    // DRC / Great Lakes
    { name: "Actualite.cd", url: rss("https://actualite.cd/feed"), lang: "fr" },
    { name: "Radio Okapi", url: rss("https://www.radiookapi.net/rss.xml"), lang: "fr" },
    // West Africa beyond Nigeria
    { name: "MyJoyOnline", url: rss("https://www.myjoyonline.com/feed/") },
    { name: "Citi Newsroom", url: rss("https://news.google.com/rss/search?q=site%3Acitinewsroom.com%20when%3A7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Le Quotidien", url: rss("https://lequotidien.sn/feed/"), lang: "fr" },
    // Pan-African
    { name: "RFI Afrique", url: rss("https://www.rfi.fr/en/africa/rss") },
    // Validated crisis-floor and locale desks (#6819-#6821, #6827-#6830).
    { name: "Studio Tamani", url: rss("https://www.studiotamani.org/feed/"), lang: "fr", strategicDefault: true },
    { name: "leFaso.net", url: rss("https://lefaso.net/spip.php?page=backend"), lang: "fr", strategicDefault: true },
    { name: "ActuNiger", url: rss("https://news.google.com/rss/search?q=site%3Aactuniger.com%20Niger%20when%3A7d&hl=fr&gl=FR&ceid=FR:fr"), lang: "fr", strategicDefault: true },
    { name: "A\xEFr Info", url: rss("https://airinfoagadez.com/feed/"), lang: "fr" },
    { name: "Daily Nation", url: rss("https://nation.africa/kenya/rss.xml") },
    { name: "The Guardian Post", url: rss("https://news.google.com/rss/search?q=site%3Atheguardianpostcameroon.com%20when%3A30d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Tchadinfos", url: rss("https://tchadinfos.com/feed/"), lang: "fr" },
    { name: "Alwihda Info", url: rss("https://www.alwihdainfo.com/rss/"), lang: "fr" },
    { name: "Radio Ndeke Luka", url: rss("https://www.radiondekeluka.org/feed/"), lang: "fr" }
  ],
  latam: [
    { name: "Guardian Caribbean", url: rss("https://www.theguardian.com/world/caribbean/rss") },
    { name: "Latin America", url: rss("https://news.google.com/rss/search?q=(Brazil+OR+Mexico+OR+Argentina+OR+Venezuela+OR+Colombia+OR+Haiti)+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "BBC Latin America", url: rss("https://feeds.bbci.co.uk/news/world/latin_america/rss.xml") },
    { name: "Reuters LatAm", url: rss("https://news.google.com/rss/search?q=site:reuters.com+(Brazil+OR+Mexico+OR+Argentina)+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Guardian Americas", url: rss("https://www.theguardian.com/world/americas/rss") },
    // Localized Feeds
    { name: "Clar\xEDn", url: rss("https://www.clarin.com/rss/lo-ultimo/"), lang: "es" },
    { name: "O Globo", url: rss("https://news.google.com/rss/search?q=site:oglobo.globo.com+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419"), lang: "pt" },
    { name: "Folha de S.Paulo", url: rss("https://feeds.folha.uol.com.br/emcimadahora/rss091.xml"), lang: "pt" },
    { name: "Brasil Paralelo", url: rss("https://www.brasilparalelo.com.br/noticias/rss.xml"), lang: "pt" },
    { name: "El Tiempo", url: rss("https://www.eltiempo.com/rss/mundo_latinoamerica.xml"), lang: "es" },
    { name: "La Silla Vac\xEDa", url: rss("https://www.lasillavacia.com/rss") },
    { name: "Primicias", url: rss("https://www.primicias.ec/feed/"), lang: "es" },
    { name: "Infobae Americas", url: rss("https://www.infobae.com/arc/outboundfeeds/rss/"), lang: "es" },
    { name: "El Universo", url: rss("https://www.eluniverso.com/arc/outboundfeeds/rss/category/noticias/?outputType=xml"), lang: "es" },
    // Mexico
    { name: "Mexico News Daily", url: rss("https://mexiconewsdaily.com/feed/") },
    { name: "Mexico Security", url: rss("https://news.google.com/rss/search?q=(Mexico+cartel+OR+Mexico+violence+OR+Mexico+troops+OR+narco+Mexico)+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "AP Mexico", url: rss("https://news.google.com/rss/search?q=site:apnews.com+Mexico+when:3d&hl=en-US&gl=US&ceid=US:en") },
    // LatAm Security
    { name: "InSight Crime", url: rss("https://insightcrime.org/feed/") },
    { name: "France 24 LatAm", url: rss("https://www.france24.com/en/americas/rss") },
    // Validated crisis-floor desks (#6816, #6822-#6823).
    { name: "HaitiLibre English", url: rss("https://www.haitilibre.com/rss-flash-en.php") },
    { name: "AyiboPost", url: rss("https://news.google.com/rss/search?q=site%3Aayibopost.com%20Haiti%20when%3A14d&hl=fr&gl=FR&ceid=FR:fr"), lang: "fr" },
    { name: "Caracas Chronicles", url: rss("https://www.caracaschronicles.com/feed/") },
    { name: "Efecto Cocuyo", url: rss("https://efectococuyo.com/feed/"), lang: "es" },
    { name: "Havana Times", url: rss("https://havanatimes.org/feed/") },
    { name: "14ymedio", url: rss("https://www.14ymedio.com/rss/"), lang: "es" }
  ],
  asia: [
    { name: "Asia News", url: rss("https://news.google.com/rss/search?q=(China+OR+Japan+OR+Korea+OR+India+OR+ASEAN)+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "BBC Asia", url: rss("https://feeds.bbci.co.uk/news/world/asia/rss.xml") },
    { name: "The Diplomat", url: rss("https://thediplomat.com/feed/") },
    { name: "South China Morning Post", url: railwayRss("https://www.scmp.com/rss/91/feed/") },
    { name: "Reuters Asia", url: rss("https://news.google.com/rss/search?q=site:reuters.com+(China+OR+Japan+OR+Taiwan+OR+Korea)+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Reuters India", url: rss("https://news.google.com/rss/search?q=site:reuters.com+India+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Xinhua", url: rss("https://news.google.com/rss/search?q=site:xinhuanet.com+OR+Xinhua+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Japan Today", url: rss("https://japantoday.com/feed/atom") },
    { name: "Nikkei Asia", url: rss("https://news.google.com/rss/search?q=site:asia.nikkei.com+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Asahi Shimbun", url: rss("https://www.asahi.com/rss/asahi/newsheadlines.rdf"), lang: "ja", strategicDefault: true },
    { name: "The Hindu", url: rss("https://www.thehindu.com/news/national/feeder/default.rss"), lang: "en" },
    { name: "Indian Express", url: rss("https://indianexpress.com/section/india/feed/") },
    { name: "NDTV", url: rss("https://feeds.feedburner.com/ndtvnews-top-stories") },
    { name: "India News Network", url: rss("https://news.google.com/rss/search?q=India+diplomacy+foreign+policy+news&hl=en&gl=US&ceid=US:en") },
    // Hindi (HI) — mainstream national coverage boosted for Hindi locale users
    { name: "BBC Hindi", url: rss("https://feeds.bbci.co.uk/hindi/rss.xml"), lang: "hi" },
    { name: "Aaj Tak", url: rss("https://www.aajtak.in/rssfeeds/?id=home"), lang: "hi" },
    { name: "NDTV India", url: rss("https://feeds.feedburner.com/ndtvkhabar-latest"), lang: "hi" },
    { name: "Amar Ujala", url: rss("https://www.amarujala.com/rss/national.xml"), lang: "hi" },
    { name: "CNA", url: rss("https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml") },
    { name: "MIIT (China)", url: rss("https://news.google.com/rss/search?q=site:miit.gov.cn+when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans"), lang: "zh", strategicDefault: true },
    { name: "MOFCOM (China)", url: rss("https://news.google.com/rss/search?q=site:mofcom.gov.cn+when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans"), lang: "zh", strategicDefault: true },
    // Thailand
    { name: "Bangkok Post", url: rss("https://news.google.com/rss/search?q=site:bangkokpost.com+when:1d&hl=en-US&gl=US&ceid=US:en"), lang: "th", strategicDefault: true },
    { name: "Thai PBS", url: rss("https://news.google.com/rss/search?q=Thai+PBS+World+news&hl=en&gl=US&ceid=US:en"), lang: "th" },
    // Vietnam
    { name: "VnExpress", url: rss("https://vnexpress.net/rss/tin-moi-nhat.rss"), lang: "vi", strategicDefault: true },
    { name: "Tuoi Tre News", url: rss("https://news.tuoitre.vn/rss"), lang: "vi" },
    // Korea
    { name: "Yonhap News", url: rss("https://www.yonhapnewstv.co.kr/browse/feed/"), lang: "ko", strategicDefault: true },
    { name: "Chosun Ilbo", url: rss("https://www.chosun.com/arc/outboundfeeds/rss/?outputType=xml"), lang: "ko" },
    // Australia
    { name: "ABC News Australia", url: rss("https://www.abc.net.au/news/feed/2942460/rss.xml") },
    { name: "Guardian Australia", url: rss("https://www.theguardian.com/australia-news/rss") },
    // Pacific Islands
    { name: "Guardian Pacific", url: rss("https://www.theguardian.com/world/pacific-islands/rss") },
    { name: "France 24 Asia Pacific", url: rss("https://www.france24.com/en/asia-pacific/rss") },
    { name: "Island Times (Palau)", url: rss("https://islandtimes.org/feed/") },
    // Central Asia (#5953) — Russia rear area, China BRI, sanctions leakage
    { name: "Eurasianet", url: rss("https://eurasianet.org/rss") },
    { name: "RFE/RL Central Asia", url: rss("https://news.google.com/rss/search?q=site:rferl.org+Central+Asia+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "The Astana Times", url: rss("https://astanatimes.com/feed/") },
    { name: "The Times of Central Asia", url: rss("https://timesca.com/feed/") },
    // Taiwan (#5954)
    { name: "Focus Taiwan", url: rss("https://news.google.com/rss/search?q=site%3Afocustaiwan.tw%20when%3A3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Taipei Times", url: rss("https://news.google.com/rss/search?q=site%3Ataipeitimes.com%20when%3A3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Taiwan News", url: rss("https://news.google.com/rss/search?q=site%3Ataiwannews.com.tw%20when%3A3d&hl=en-US&gl=US&ceid=US:en") },
    // Pakistan (#5954)
    { name: "Dawn", url: rss("https://www.dawn.com/feeds/home/") },
    { name: "Geo News", url: rss("https://news.google.com/rss/search?q=site:geo.tv+when:2d&hl=en-US&gl=US&ceid=US:en") },
    // SE Asia security (#5954)
    { name: "Jakarta Post", url: rss("https://news.google.com/rss/search?q=site%3Athejakartapost.com%20when%3A3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Rappler", url: rss("https://www.rappler.com/feed/") },
    { name: "The Star (Malaysia)", url: rss("https://news.google.com/rss/search?q=site%3Athestar.com.my%20when%3A3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Irrawaddy", url: rss("https://www.irrawaddy.com/feed/") },
    // Validated crisis-floor desks (#6817, #6826).
    { name: "Amu TV", url: rss("https://amu.tv/feed/") },
    { name: "Pajhwok Afghan News", url: rss("https://news.google.com/rss/search?q=site%3Apajhwok.com%20Afghanistan%20when%3A7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "The Daily Star", url: rss("https://news.google.com/rss/search?q=site%3Athedailystar.net%20when%3A14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Dhaka Tribune", url: rss("https://news.google.com/rss/search?q=site%3Adhakatribune.com%20when%3A14d&hl=en-US&gl=US&ceid=US:en") },
    // New opt-in feeds stay at the end of the category. The free source cap
    // consumes declaration order, so inserting earlier can evict an existing
    // source from persisted free-user selections.
    { name: "Times of India", url: rss("https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms"), lang: "en" }
  ],
  energy: [
    { name: "Oil & Gas", url: rss('https://news.google.com/rss/search?q=(oil+price+OR+OPEC+OR+"natural+gas"+OR+pipeline+OR+LNG)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Nuclear Energy", url: rss('https://news.google.com/rss/search?q=("nuclear+energy"+OR+"nuclear+power"+OR+uranium+OR+IAEA)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Reuters Energy", url: rss("https://news.google.com/rss/search?q=site:reuters.com+(oil+OR+gas+OR+energy+OR+OPEC)+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Mining & Resources", url: rss('https://news.google.com/rss/search?q=(lithium+OR+"rare+earth"+OR+cobalt+OR+mining)+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  turkiye: [
    { name: "TRT Haber", url: rss("https://www.trthaber.com/manset_articles.rss"), lang: "tr" },
    { name: "TRT Haber Son Dakika", url: rss("https://www.trthaber.com/sondakika.rss"), lang: "tr" },
    { name: "TRT Haber D\xFCnya", url: rss("https://www.trthaber.com/dunya_articles.rss"), lang: "tr" },
    { name: "NTV", url: rss("https://www.ntv.com.tr/gundem.rss"), lang: "tr" },
    { name: "Habert\xFCrk", url: rss("https://www.haberturk.com/rss"), lang: "tr" },
    { name: "Habert\xFCrk D\xFCnya", url: rss("https://www.haberturk.com/rss/kategori/dunya.xml"), lang: "tr" },
    { name: "S\xF6zc\xFC", url: rss("https://www.sozcu.com.tr/feeds-rss-category-sozcu"), lang: "tr" },
    { name: "Cumhuriyet", url: rss("https://www.cumhuriyet.com.tr/rss/son_dakika.xml"), lang: "tr" },
    { name: "Milliyet", url: rss("https://www.milliyet.com.tr/rss/rssnew/gundemrss.xml"), lang: "tr" },
    { name: "Sabah", url: rss("https://www.sabah.com.tr/rss/gundem.xml"), lang: "tr" },
    { name: "Euronews T\xFCrk\xE7e", url: rss("https://tr.euronews.com/rss"), lang: "tr" },
    { name: "BBC T\xFCrk\xE7e", url: rss("https://feeds.bbci.co.uk/turkce/rss.xml"), lang: "tr" },
    { name: "DW T\xFCrk\xE7e", url: rss("https://rss.dw.com/xml/rss-tur-all"), lang: "tr" },
    { name: "Bloomberg HT", url: rss("https://www.bloomberght.com/rss"), lang: "tr" },
    { name: "D\xFCnya Gazetesi", url: rss("https://www.dunya.com/rss"), lang: "tr" },
    { name: "Yeni \u015Eafak", url: rss("https://www.yenisafak.com/rss"), lang: "tr" },
    { name: "Independent T\xFCrk\xE7e", url: rss("https://www.indyturk.com/rss.xml"), lang: "tr" },
    { name: "Evrensel", url: rss("https://www.evrensel.net/rss/haber.xml"), lang: "tr" },
    { name: "Gazete Duvar", url: rss("https://www.gazeteduvar.com.tr/export/rss"), lang: "tr" },
    { name: "BirG\xFCn", url: rss("https://www.birgun.net/rss/home"), lang: "tr" },
    { name: "Diken", url: rss("https://www.diken.com.tr/feed/"), lang: "tr" },
    { name: "Ak\u015Fam", url: rss("https://www.aksam.com.tr/rss/rss.asp"), lang: "tr" },
    { name: "Karar", url: rss("https://www.karar.com/rss"), lang: "tr" },
    { name: "Yeni\xE7a\u011F", url: rss("https://www.yenicaggazetesi.com.tr/rss"), lang: "tr" },
    { name: "Star", url: rss("https://www.star.com.tr/rss/rss.asp"), lang: "tr" }
  ]
};
var TECH_FEEDS = {
  tech: [
    { name: "TechCrunch", url: rss("https://techcrunch.com/feed/") },
    { name: "The Verge", url: rss("https://www.theverge.com/rss/index.xml") },
    { name: "Ars Technica", url: rss("https://feeds.arstechnica.com/arstechnica/technology-lab") },
    { name: "Hacker News", url: rss("https://hnrss.org/frontpage") },
    { name: "MIT Tech Review", url: rss("https://www.technologyreview.com/feed/") },
    { name: "ZDNet", url: rss("https://www.zdnet.com/news/rss.xml") },
    { name: "TechMeme", url: rss("https://www.techmeme.com/feed.xml") },
    { name: "Engadget", url: rss("https://www.engadget.com/rss.xml") },
    { name: "Fast Company", url: rss("https://feeds.feedburner.com/fastcompany/headlines") },
    { name: "Wired", url: rss("https://www.wired.com/feed/rss") }
  ],
  ai: [
    { name: "AI News", url: rss('https://news.google.com/rss/search?q=(OpenAI+OR+Anthropic+OR+Google+AI+OR+"large+language+model"+OR+ChatGPT+OR+Claude+OR+"AI+model")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "VentureBeat AI", url: rss("https://venturebeat.com/category/ai/feed/") },
    { name: "The Verge AI", url: rss("https://www.theverge.com/rss/ai-artificial-intelligence/index.xml") },
    { name: "MIT Tech Review AI", url: rss("https://www.technologyreview.com/topic/artificial-intelligence/feed") },
    { name: "MIT Research", url: rss("https://news.mit.edu/rss/research") },
    { name: "ArXiv AI", url: rss("https://export.arxiv.org/rss/cs.AI") },
    { name: "ArXiv ML", url: rss("https://export.arxiv.org/rss/cs.LG") },
    { name: "AI Weekly", url: rss('https://news.google.com/rss/search?q="artificial+intelligence"+OR+"machine+learning"+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Anthropic News", url: rss("https://news.google.com/rss/search?q=Anthropic+Claude+AI+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "OpenAI News", url: rss("https://news.google.com/rss/search?q=OpenAI+ChatGPT+GPT-4+when:7d&hl=en-US&gl=US&ceid=US:en") }
  ],
  startups: [
    { name: "TechCrunch Startups", url: rss("https://techcrunch.com/category/startups/feed/") },
    { name: "VentureBeat", url: rss("https://venturebeat.com/feed/") },
    { name: "Crunchbase News", url: rss("https://news.crunchbase.com/feed/") },
    { name: "SaaStr", url: rss("https://www.saastr.com/feed/") },
    { name: "AngelList News", url: rss('https://news.google.com/rss/search?q=site:angellist.com+OR+"AngelList"+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "TechCrunch Venture", url: rss("https://techcrunch.com/category/venture/feed/") },
    { name: "The Information", url: rss("https://news.google.com/rss/search?q=site:theinformation.com+startup+OR+funding+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Fortune Term Sheet", url: rss('https://news.google.com/rss/search?q="Term+Sheet"+venture+capital+OR+startup+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "PitchBook News", url: rss("https://news.google.com/rss/search?q=site:pitchbook.com+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "CB Insights", url: rss("https://www.cbinsights.com/research/feed/") }
  ],
  vcblogs: [
    { name: "Y Combinator Blog", url: rss("https://www.ycombinator.com/blog/rss/") },
    { name: "a16z Blog", url: rss('https://news.google.com/rss/search?q=site:a16z.com+OR+"Andreessen+Horowitz"+blog+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "First Round Review", url: rss("https://review.firstround.com/articles/rss") },
    { name: "Sequoia Blog", url: rss("https://news.google.com/rss/search?q=site:sequoiacap.com+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Paul Graham Essays", url: rss('https://news.google.com/rss/search?q="Paul+Graham"+essay+OR+blog+when:30d&hl=en-US&gl=US&ceid=US:en') },
    { name: "VC Insights", url: rss('https://news.google.com/rss/search?q=("venture+capital"+insights+OR+"VC+trends"+OR+"startup+advice")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Lenny's Newsletter", url: rss("https://www.lennysnewsletter.com/feed") },
    { name: "Stratechery", url: rss("https://stratechery.com/feed/") },
    { name: "FwdStart Newsletter", url: "/api/fwdstart" }
  ],
  regionalStartups: [
    // Europe
    { name: "EU Startups", url: rss("https://news.google.com/rss/search?q=site:eu-startups.com+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Tech.eu", url: rss("https://tech.eu/feed/") },
    { name: "Sifted (Europe)", url: rss("https://sifted.eu/feed") },
    { name: "The Next Web", url: rss("https://news.google.com/rss/search?q=site:thenextweb.com+when:7d&hl=en-US&gl=US&ceid=US:en") },
    // Asia - General
    { name: "Tech in Asia", url: rss("https://news.google.com/rss/search?q=site:techinasia.com+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "KrASIA", url: rss("https://news.google.com/rss/search?q=site:kr-asia.com+OR+KrASIA+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "SEA Startups", url: rss("https://news.google.com/rss/search?q=(Singapore+OR+Indonesia+OR+Vietnam+OR+Thailand+OR+Malaysia)+startup+funding+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Asia VC News", url: rss('https://news.google.com/rss/search?q=("Southeast+Asia"+OR+ASEAN)+venture+capital+OR+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // China
    { name: "China Startups", url: rss('https://news.google.com/rss/search?q=China+startup+funding+OR+"Chinese+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "36Kr English", url: rss('https://news.google.com/rss/search?q=site:36kr.com+OR+"36Kr"+startup+china+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "China Tech Giants", url: rss("https://news.google.com/rss/search?q=(Alibaba+OR+Tencent+OR+ByteDance+OR+Baidu+OR+JD.com+OR+Xiaomi+OR+Huawei)+when:3d&hl=en-US&gl=US&ceid=US:en") },
    // Japan
    { name: "Japan Startups", url: rss('https://news.google.com/rss/search?q=Japan+startup+funding+OR+"Japanese+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Japan Tech News", url: rss("https://news.google.com/rss/search?q=(Japan+startup+OR+Japan+tech+OR+SoftBank+OR+Rakuten+OR+Sony)+funding+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Nikkei Tech", url: rss("https://news.google.com/rss/search?q=site:asia.nikkei.com+technology+when:3d&hl=en-US&gl=US&ceid=US:en") },
    // Korea
    { name: "Korea Tech News", url: rss("https://news.google.com/rss/search?q=(Korea+startup+OR+Korean+tech+OR+Samsung+OR+Kakao+OR+Naver+OR+Coupang)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Korea Startups", url: rss('https://news.google.com/rss/search?q=Korea+startup+funding+OR+"Korean+unicorn"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // India
    { name: "Inc42 (India)", url: rss("https://inc42.com/feed/") },
    { name: "YourStory", url: rss("https://yourstory.com/feed") },
    { name: "India Startups", url: rss('https://news.google.com/rss/search?q=India+startup+funding+OR+"Indian+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "India Tech News", url: rss("https://news.google.com/rss/search?q=(Flipkart+OR+Razorpay+OR+Zerodha+OR+Zomato+OR+Paytm+OR+PhonePe)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    // Southeast Asia
    { name: "SEA Tech News", url: rss("https://news.google.com/rss/search?q=(Grab+OR+GoTo+OR+Sea+Limited+OR+Shopee+OR+Tokopedia)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Vietnam Tech", url: rss("https://news.google.com/rss/search?q=Vietnam+startup+OR+Vietnam+tech+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Indonesia Tech", url: rss("https://news.google.com/rss/search?q=Indonesia+startup+OR+Indonesia+tech+when:7d&hl=en-US&gl=US&ceid=US:en") },
    // Taiwan
    { name: "Taiwan Tech", url: rss("https://news.google.com/rss/search?q=(Taiwan+startup+OR+TSMC+OR+MediaTek+OR+Foxconn)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    // Latin America
    { name: "LAVCA (LATAM)", url: rss("https://news.google.com/rss/search?q=site:lavca.org+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "LATAM Startups", url: rss('https://news.google.com/rss/search?q=("Latin+America"+startup+OR+LATAM+funding)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Startups LATAM", url: rss("https://news.google.com/rss/search?q=(startup+Brazil+OR+startup+Mexico+OR+startup+Argentina+OR+startup+Colombia+OR+startup+Chile)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Brazil Tech", url: rss("https://news.google.com/rss/search?q=(Nubank+OR+iFood+OR+Mercado+Libre+OR+Rappi+OR+VTEX)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "FinTech LATAM", url: rss('https://news.google.com/rss/search?q=fintech+(Brazil+OR+Mexico+OR+Argentina+OR+"Latin+America")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Africa
    { name: "TechCabal (Africa)", url: rss("https://techcabal.com/feed/") },
    { name: "Africa Startups", url: rss('https://news.google.com/rss/search?q=Africa+startup+funding+OR+"African+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Africa Tech News", url: rss('https://news.google.com/rss/search?q=(Flutterwave+OR+Paystack+OR+Jumia+OR+Andela+OR+"Africa+startup")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Middle East
    { name: "MENA Startups", url: rss('https://news.google.com/rss/search?q=(MENA+startup+OR+"Middle+East"+funding+OR+Gulf+startup)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "MENA Tech News", url: rss("https://news.google.com/rss/search?q=(UAE+startup+OR+Saudi+tech+OR+Dubai+startup+OR+NEOM+tech)+when:7d&hl=en-US&gl=US&ceid=US:en") }
  ],
  github: [
    { name: "GitHub Blog", url: rss("https://github.blog/feed/") },
    { name: "GitHub Trending", url: rss("https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml") },
    { name: "YC Launches", url: rss('https://news.google.com/rss/search?q=("Y+Combinator"+OR+"YC+launch"+OR+"YC+W25"+OR+"YC+S25")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Dev Events", url: rss('https://news.google.com/rss/search?q=("developer+conference"+OR+"tech+summit"+OR+"devcon"+OR+"developer+event")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Open Source News", url: rss('https://news.google.com/rss/search?q="open+source"+project+release+OR+launch+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  ipo: [
    { name: "IPO News", url: rss('https://news.google.com/rss/search?q=(IPO+OR+"initial+public+offering"+OR+SPAC)+tech+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Renaissance IPO", url: rss("https://news.google.com/rss/search?q=site:renaissancecapital.com+IPO+when:14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Tech IPO News", url: rss('https://news.google.com/rss/search?q=tech+IPO+OR+"tech+company"+IPO+when:7d&hl=en-US&gl=US&ceid=US:en') }
  ],
  funding: [
    { name: "SEC Filings", url: rss('https://news.google.com/rss/search?q=(S-1+OR+"IPO+filing"+OR+"SEC+filing")+startup+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "VC News", url: rss('https://news.google.com/rss/search?q=("Series+A"+OR+"Series+B"+OR+"Series+C"+OR+"funding+round"+OR+"venture+capital")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Seed & Pre-Seed", url: rss('https://news.google.com/rss/search?q=("seed+round"+OR+"pre-seed"+OR+"angel+round"+OR+"seed+funding")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Startup Funding", url: rss('https://news.google.com/rss/search?q=("startup+funding"+OR+"raised+funding"+OR+"raised+$"+OR+"funding+announced")+when:7d&hl=en-US&gl=US&ceid=US:en') }
  ],
  producthunt: [
    { name: "Product Hunt", url: rss("https://www.producthunt.com/feed") }
  ],
  outages: [
    { name: "AWS Status", url: rss('https://news.google.com/rss/search?q=AWS+outage+OR+"Amazon+Web+Services"+down+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Cloud Outages", url: rss("https://news.google.com/rss/search?q=(Azure+OR+GCP+OR+Cloudflare+OR+Slack+OR+GitHub)+outage+OR+down+when:1d&hl=en-US&gl=US&ceid=US:en") }
  ],
  security: [
    { name: "Krebs Security", url: rss("https://krebsonsecurity.com/feed/") },
    { name: "The Hacker News", url: rss("https://feeds.feedburner.com/TheHackersNews") },
    { name: "Dark Reading", url: rss("https://www.darkreading.com/rss.xml") },
    { name: "Schneier", url: rss("https://www.schneier.com/feed/") }
  ],
  policy: [
    // US Policy
    { name: "Politico Tech", url: rss("https://rss.politico.com/technology.xml") },
    { name: "AI Regulation", url: rss('https://news.google.com/rss/search?q=AI+regulation+OR+"artificial+intelligence"+law+OR+policy+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Tech Antitrust", url: rss("https://news.google.com/rss/search?q=tech+antitrust+OR+FTC+Google+OR+FTC+Apple+OR+FTC+Amazon+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "EFF News", url: rss('https://news.google.com/rss/search?q=site:eff.org+OR+"Electronic+Frontier+Foundation"+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // EU Digital Policy
    { name: "EU Digital Policy", url: rss('https://news.google.com/rss/search?q=("Digital+Services+Act"+OR+"Digital+Markets+Act"+OR+"EU+AI+Act"+OR+"GDPR")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Euractiv Digital", url: rss("https://news.google.com/rss/search?q=site:euractiv.com+digital+OR+tech+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "EU Commission Digital", url: rss("https://news.google.com/rss/search?q=site:ec.europa.eu+digital+OR+technology+when:14d&hl=en-US&gl=US&ceid=US:en") },
    // China Tech Policy
    { name: "China Tech Policy", url: rss("https://news.google.com/rss/search?q=(China+tech+regulation+OR+China+AI+policy+OR+MIIT+technology)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    // UK Policy
    { name: "UK Tech Policy", url: rss('https://news.google.com/rss/search?q=(UK+AI+safety+OR+"Online+Safety+Bill"+OR+UK+tech+regulation)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // India Policy
    { name: "India Tech Policy", url: rss("https://news.google.com/rss/search?q=(India+tech+regulation+OR+India+data+protection+OR+India+AI+policy)+when:7d&hl=en-US&gl=US&ceid=US:en") }
  ],
  thinktanks: [
    // US Think Tanks
    { name: "Brookings Tech", url: rss("https://news.google.com/rss/search?q=site:brookings.edu+technology+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "CSIS Tech", url: rss("https://news.google.com/rss/search?q=site:csis.org+technology+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "MIT Tech Policy", url: rss("https://news.google.com/rss/search?q=%22Tech+Policy+Press%22&hl=en&gl=US&ceid=US:en") },
    { name: "Stanford HAI", url: rss("https://news.google.com/rss/search?q=site:hai.stanford.edu+when:14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "AI Now Institute", url: rss("https://news.google.com/rss/search?q=%22AI+Now+Institute%22&hl=en&gl=US&ceid=US:en") },
    // Europe Think Tanks
    { name: "OECD Digital", url: rss("https://news.google.com/rss/search?q=site:oecd.org+digital+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "EU Tech Policy", url: rss('https://news.google.com/rss/search?q=("EU+tech+policy"+OR+"European+digital"+OR+Bruegel+tech)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Chatham House Tech", url: rss("https://news.google.com/rss/search?q=site:chathamhouse.org+technology+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en") },
    // Asia Think Tanks
    { name: "ISEAS (Singapore)", url: rss("https://news.google.com/rss/search?q=site:iseas.edu.sg+technology+when:14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "ORF Tech (India)", url: rss('https://news.google.com/rss/search?q=(India+tech+policy+OR+ORF+technology+OR+"Observer+Research+Foundation"+tech)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "RIETI (Japan)", url: rss("https://news.google.com/rss/search?q=site:rieti.go.jp+technology+when:30d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Asia Pacific Tech", url: rss('https://news.google.com/rss/search?q=("Asia+Pacific"+tech+policy+OR+"Lowy+Institute"+technology)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // China Research (External Views)
    { name: "China Tech Analysis", url: rss('https://news.google.com/rss/search?q=("China+tech+strategy"+OR+"Chinese+AI"+OR+"China+semiconductor")+analysis+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "DigiChina", url: rss("https://news.google.com/rss/search?q=DigiChina+Stanford+China+technology&hl=en&gl=US&ceid=US:en") }
  ],
  finance: [
    { name: "CNBC Tech", url: rss("https://www.cnbc.com/id/19854910/device/rss/rss.html") },
    { name: "MarketWatch Tech", url: rss("https://news.google.com/rss/search?q=site:marketwatch.com+technology+markets+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Yahoo Finance", url: rss("https://finance.yahoo.com/rss/topstories") },
    { name: "Seeking Alpha Tech", url: rss("https://seekingalpha.com/market_currents.xml") }
  ],
  hardware: [
    { name: "Tom's Hardware", url: rss("https://www.tomshardware.com/feeds.xml") },
    { name: "SemiAnalysis", url: rss("https://news.google.com/rss/search?q=site:semianalysis.com+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Semiconductor News", url: rss("https://news.google.com/rss/search?q=semiconductor+OR+chip+OR+TSMC+OR+NVIDIA+OR+Intel+when:3d&hl=en-US&gl=US&ceid=US:en") }
  ],
  cloud: [
    { name: "InfoQ", url: rss("https://feed.infoq.com/") },
    { name: "The New Stack", url: rss("https://thenewstack.io/feed/") },
    { name: "DevOps.com", url: rss("https://devops.com/feed/") }
  ],
  dev: [
    { name: "Dev.to", url: rss("https://dev.to/feed") },
    { name: "Lobsters", url: rss("https://lobste.rs/rss") },
    { name: "Changelog", url: rss("https://changelog.com/feed") },
    { name: "Show HN", url: rss("https://hnrss.org/show") }
  ],
  layoffs: [
    { name: "Layoffs.fyi", url: rss("https://news.google.com/rss/search?q=tech+layoffs+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "TechCrunch Layoffs", url: rss("https://techcrunch.com/tag/layoffs/feed/") }
  ],
  unicorns: [
    { name: "Unicorn News", url: rss('https://news.google.com/rss/search?q=("unicorn+startup"+OR+"unicorn+valuation"+OR+"$1+billion+valuation")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "CB Insights Unicorn", url: rss("https://news.google.com/rss/search?q=site:cbinsights.com+unicorn+when:14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Decacorn News", url: rss('https://news.google.com/rss/search?q=("decacorn"+OR+"$10+billion+valuation"+OR+"$10B+valuation")+startup+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "New Unicorns", url: rss('https://news.google.com/rss/search?q=("becomes+unicorn"+OR+"joins+unicorn"+OR+"reaches+unicorn"+OR+"achieved+unicorn")+when:14d&hl=en-US&gl=US&ceid=US:en') }
  ],
  accelerators: [
    { name: "YC News", url: rss("https://news.ycombinator.com/rss") },
    { name: "Techstars News", url: rss("https://news.google.com/rss/search?q=Techstars+accelerator+when:14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "500 Global News", url: rss('https://news.google.com/rss/search?q="500+Global"+OR+"500+Startups"+accelerator+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Demo Day News", url: rss('https://news.google.com/rss/search?q=("demo+day"+OR+"YC+batch"+OR+"accelerator+batch")+startup+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Startup School", url: rss('https://news.google.com/rss/search?q="Startup+School"+OR+"YC+Startup+School"+when:14d&hl=en-US&gl=US&ceid=US:en') }
  ],
  podcasts: [
    // Tech Podcast Episodes (via Google News - podcast hosts block RSS proxies)
    { name: "Acquired Episodes", url: rss('https://news.google.com/rss/search?q="Acquired+podcast"+episode+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "All-In Podcast", url: rss('https://news.google.com/rss/search?q="All-In+podcast"+(Chamath+OR+Sacks+OR+Friedberg)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "a16z Insights", url: rss('https://news.google.com/rss/search?q=("a16z"+OR+"Andreessen+Horowitz")+podcast+OR+interview+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "TWIST Episodes", url: rss('https://news.google.com/rss/search?q="This+Week+in+Startups"+Jason+Calacanis+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "20VC Episodes", url: rss("https://rss.libsyn.com/shows/61840/destinations/240976.xml") },
    { name: "Lex Fridman Tech", url: rss('https://news.google.com/rss/search?q=("Lex+Fridman"+interview)+(AI+OR+tech+OR+startup+OR+CEO)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Tech Media Shows
    { name: "Verge Shows", url: rss('https://news.google.com/rss/search?q=("Vergecast"+OR+"Decoder+podcast"+Verge)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Hard Fork (NYT)", url: rss('https://news.google.com/rss/search?q="Hard+Fork"+podcast+NYT+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Pivot Podcast", url: rss("https://feeds.megaphone.fm/pivot") },
    // Newsletters
    { name: "Tech Newsletters", url: rss('https://news.google.com/rss/search?q=("Benedict+Evans"+OR+"Pragmatic+Engineer"+OR+Stratechery)+tech+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // AI Podcasts & Shows
    { name: "AI Podcasts", url: rss('https://news.google.com/rss/search?q=("AI+podcast"+OR+"artificial+intelligence+podcast")+episode+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "AI Interviews", url: rss("https://news.google.com/rss/search?q=(NVIDIA+OR+OpenAI+OR+Anthropic+OR+DeepMind)+interview+OR+podcast+when:14d&hl=en-US&gl=US&ceid=US:en") },
    // Startup Shows
    { name: "How I Built This", url: rss('https://news.google.com/rss/search?q="How+I+Built+This"+Guy+Raz+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Masters of Scale", url: rss("https://rss.art19.com/masters-of-scale") }
  ]
};
var FINANCE_FEEDS = {
  markets: [
    { name: "CNBC", url: rss("https://www.cnbc.com/id/100003114/device/rss/rss.html") },
    // Direct MarketWatch RSS returns frequent 403s from cloud IPs; use Google News fallback.
    { name: "MarketWatch", url: rss("https://news.google.com/rss/search?q=site:marketwatch.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Yahoo Finance", url: rss("https://finance.yahoo.com/rss/topstories") },
    { name: "Seeking Alpha", url: rss("https://seekingalpha.com/market_currents.xml") },
    { name: "Reuters Markets", url: rss("https://news.google.com/rss/search?q=site:reuters.com+markets+stocks+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Bloomberg Markets", url: rss("https://news.google.com/rss/search?q=site:bloomberg.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Investing.com News", url: rss("https://news.google.com/rss/search?q=site:investing.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Fox Business", url: rss("https://moxie.foxbusiness.com/google-publisher/latest.xml") },
    { name: "Business Insider", url: rss("https://www.businessinsider.com/rss") },
    { name: "GlobeNewswire", url: rss("https://www.globenewswire.com/RssFeed/subjectcode/22/feedTitle/GlobeNewswire") },
    { name: "Business Wire", url: rss("https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtRWA==") },
    { name: "PR Newswire", url: rss("https://news.google.com/rss/search?q=site%3Aprnewswire.com%20when%3A1d&hl=en-US&gl=US&ceid=US:en") }
  ],
  forex: [
    { name: "Forex News", url: rss('https://news.google.com/rss/search?q=("forex"+OR+"currency"+OR+"FX+market")+trading+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Dollar Watch", url: rss('https://news.google.com/rss/search?q=("dollar+index"+OR+DXY+OR+"US+dollar"+OR+"euro+dollar")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Central Bank Rates", url: rss('https://news.google.com/rss/search?q=("central+bank"+OR+"interest+rate"+OR+"rate+decision"+OR+"monetary+policy")+when:2d&hl=en-US&gl=US&ceid=US:en') }
  ],
  bonds: [
    { name: "Bond Market", url: rss('https://news.google.com/rss/search?q=("bond+market"+OR+"treasury+yields"+OR+"bond+yields"+OR+"fixed+income")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Treasury Watch", url: rss('https://news.google.com/rss/search?q=("US+Treasury"+OR+"Treasury+auction"+OR+"10-year+yield"+OR+"2-year+yield")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Corporate Bonds", url: rss('https://news.google.com/rss/search?q=("corporate+bond"+OR+"high+yield"+OR+"investment+grade"+OR+"credit+spread")+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  commodities: [
    { name: "Oil & Gas", url: rss('https://news.google.com/rss/search?q=(oil+price+OR+OPEC+OR+"natural+gas"+OR+"crude+oil"+OR+WTI+OR+Brent)+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Gold & Metals", url: rss('https://news.google.com/rss/search?q=(gold+price+OR+silver+price+OR+copper+OR+platinum+OR+"precious+metals")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Agriculture", url: rss("https://news.google.com/rss/search?q=(wheat+OR+corn+OR+soybeans+OR+coffee+OR+sugar)+price+OR+commodity+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Commodity Trading", url: rss('https://news.google.com/rss/search?q=("commodity+trading"+OR+"futures+market"+OR+CME+OR+NYMEX+OR+COMEX)+when:2d&hl=en-US&gl=US&ceid=US:en') }
  ],
  crypto: [
    { name: "CoinDesk", url: rss("https://www.coindesk.com/arc/outboundfeeds/rss/") },
    { name: "Cointelegraph", url: rss("https://cointelegraph.com/rss") },
    { name: "The Block", url: rss("https://news.google.com/rss/search?q=site:theblock.co+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Crypto News", url: rss('https://news.google.com/rss/search?q=(bitcoin+OR+ethereum+OR+crypto+OR+"digital+assets")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "DeFi News", url: rss('https://news.google.com/rss/search?q=(DeFi+OR+"decentralized+finance"+OR+DEX+OR+"yield+farming")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Decrypt", url: rss("https://decrypt.co/feed") },
    // Blockworks REMOVED (PR #3715 review): blockworks.co/feed is
    // Cloudflare-blocked from both Vercel edge AND Railway egress, AND Google
    // News returns 0 items for site:blockworks.co at every probed time window
    // (publisher likely blocks Googlebot on the same wholesale tier — so the
    // Google News fallback we tried first is a silent placeholder). The Block
    // (above) covers the same institutional-crypto territory; no coverage
    // lost. Also removed from the server feeds (_feeds.ts) for parity.
    { name: "The Defiant", url: rss("https://thedefiant.io/feed") },
    { name: "Bitcoin Magazine", url: rss("https://bitcoinmagazine.com/feed") },
    { name: "DL News", url: rss("https://news.google.com/rss/search?q=site:dlnews.com+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "CryptoSlate", url: rss("https://cryptoslate.com/feed/") },
    { name: "Unchained", url: rss("https://unchainedcrypto.com/feed/") },
    { name: "Wu Blockchain", url: rss("https://news.google.com/rss/search?q=site:wublockchain.com+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Messari", url: rss("https://news.google.com/rss/search?q=site:messari.io+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Bloomberg Crypto", url: rss("https://news.google.com/rss/search?q=bloomberg+crypto+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Chainwire", url: rss("https://chainwire.org/feed/") },
    { name: "Coinbase Blog", url: rss("https://news.google.com/rss/search?q=site%3Acoinbase.com%2Fblog%20when%3A7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Binance Announcements", url: rss("https://news.google.com/rss/search?q=site%3Abinance.com%2Fen%2Fsupport%2Fannouncement%20when%3A3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Jin10", url: rss("https://news.google.com/rss/search?q=site%3Ajin10.com%20when%3A1d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans"), lang: "zh" },
    { name: "Reuters Crypto", url: rss("https://news.google.com/rss/search?q=reuters+crypto+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "NFT News", url: rss('https://news.google.com/rss/search?q=(NFT+OR+"non-fungible")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Stablecoin Policy", url: rss('https://news.google.com/rss/search?q=(stablecoin+regulation+OR+"stablecoin+bill")+when:7d&hl=en-US&gl=US&ceid=US:en') }
  ],
  centralbanks: [
    { name: "Federal Reserve", url: rss("https://www.federalreserve.gov/feeds/press_all.xml") },
    { name: "ECB Watch", url: rss('https://news.google.com/rss/search?q=("European+Central+Bank"+OR+ECB+OR+Lagarde)+monetary+policy+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "BoJ Watch", url: rss('https://news.google.com/rss/search?q=("Bank+of+Japan"+OR+BoJ)+monetary+policy+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "BoE Watch", url: rss('https://news.google.com/rss/search?q=("Bank+of+England"+OR+BoE)+monetary+policy+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "PBoC Watch", url: rss('https://news.google.com/rss/search?q=("People%27s+Bank+of+China"+OR+PBoC+OR+PBOC)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Global Central Banks", url: rss('https://news.google.com/rss/search?q=("rate+hike"+OR+"rate+cut"+OR+"interest+rate+decision")+central+bank+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  economic: [
    { name: "Economic Data", url: rss('https://news.google.com/rss/search?q=(CPI+OR+inflation+OR+GDP+OR+"jobs+report"+OR+"nonfarm+payrolls"+OR+PMI)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Trade & Tariffs", url: rss('https://news.google.com/rss/search?q=(tariff+OR+"trade+war"+OR+"trade+deficit"+OR+sanctions)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Housing Market", url: rss('https://news.google.com/rss/search?q=("housing+market"+OR+"home+prices"+OR+"mortgage+rates"+OR+REIT)+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  ipo: [
    { name: "IPO News", url: rss('https://news.google.com/rss/search?q=(IPO+OR+"initial+public+offering"+OR+SPAC+OR+"direct+listing")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Earnings Reports", url: rss('https://news.google.com/rss/search?q=("earnings+report"+OR+"quarterly+earnings"+OR+"revenue+beat"+OR+"earnings+miss")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "M&A News", url: rss('https://news.google.com/rss/search?q=("merger"+OR+"acquisition"+OR+"takeover+bid"+OR+"buyout")+billion+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  derivatives: [
    { name: "Options Market", url: rss('https://news.google.com/rss/search?q=("options+market"+OR+"options+trading"+OR+"put+call+ratio"+OR+VIX)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Futures Trading", url: rss('https://news.google.com/rss/search?q=("futures+trading"+OR+"S%26P+500+futures"+OR+"Nasdaq+futures")+when:1d&hl=en-US&gl=US&ceid=US:en') }
  ],
  fintech: [
    { name: "Fintech News", url: rss('https://news.google.com/rss/search?q=(fintech+OR+"payment+technology"+OR+"neobank"+OR+"digital+banking")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Trading Tech", url: rss('https://news.google.com/rss/search?q=("algorithmic+trading"+OR+"trading+platform"+OR+"quantitative+finance")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Blockchain Finance", url: rss('https://news.google.com/rss/search?q=("blockchain+finance"+OR+"tokenization"+OR+"digital+securities"+OR+CBDC)+when:7d&hl=en-US&gl=US&ceid=US:en') }
  ],
  "fin-regulation": [
    { name: "SEC", url: rss("https://www.sec.gov/news/pressreleases.rss") },
    { name: "Financial Regulation", url: rss("https://news.google.com/rss/search?q=(SEC+OR+CFTC+OR+FINRA+OR+FCA)+regulation+OR+enforcement+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Banking Rules", url: rss('https://news.google.com/rss/search?q=(Basel+OR+"capital+requirements"+OR+"banking+regulation")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Crypto Regulation", url: rss('https://news.google.com/rss/search?q=(crypto+regulation+OR+"digital+asset"+regulation+OR+"stablecoin"+regulation)+when:7d&hl=en-US&gl=US&ceid=US:en') }
  ],
  institutional: [
    { name: "Hedge Fund News", url: rss('https://news.google.com/rss/search?q=("hedge+fund"+OR+"Bridgewater"+OR+"Citadel"+OR+"Renaissance")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Private Equity", url: rss('https://news.google.com/rss/search?q=("private+equity"+OR+Blackstone+OR+KKR+OR+Apollo+OR+Carlyle)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Sovereign Wealth", url: rss('https://news.google.com/rss/search?q=("sovereign+wealth+fund"+OR+"pension+fund"+OR+"institutional+investor")+when:7d&hl=en-US&gl=US&ceid=US:en') }
  ],
  analysis: [
    { name: "Market Outlook", url: rss('https://news.google.com/rss/search?q=("market+outlook"+OR+"stock+market+forecast"+OR+"bull+market"+OR+"bear+market")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Risk & Volatility", url: rss('https://news.google.com/rss/search?q=(VIX+OR+"market+volatility"+OR+"risk+off"+OR+"market+correction")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Bank Research", url: rss('https://news.google.com/rss/search?q=("Goldman+Sachs"+OR+"JPMorgan"+OR+"Morgan+Stanley")+forecast+OR+outlook+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  gccNews: [
    { name: "Arabian Business", url: rss("https://news.google.com/rss/search?q=site:arabianbusiness.com+(Saudi+Arabia+OR+UAE+OR+GCC)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "The National", url: rss("https://news.google.com/rss/search?q=site:thenationalnews.com+(Abu+Dhabi+OR+UAE+OR+Saudi)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Arab News", url: rss("https://news.google.com/rss/search?q=site:arabnews.com+(Saudi+Arabia+OR+investment+OR+infrastructure)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Gulf FDI", url: rss('https://news.google.com/rss/search?q=(PIF+OR+"DP+World"+OR+Mubadala+OR+ADNOC+OR+Masdar+OR+"ACWA+Power")+infrastructure+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Gulf Investments", url: rss('https://news.google.com/rss/search?q=("Saudi+Arabia"+OR+"UAE"+OR+"Abu+Dhabi")+investment+infrastructure+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Vision 2030", url: rss('https://news.google.com/rss/search?q="Vision+2030"+(project+OR+investment+OR+announced)+when:14d&hl=en-US&gl=US&ceid=US:en') }
  ]
};
var HAPPY_FEEDS = {
  positive: [
    { name: "Good News Network", url: rss("https://www.goodnewsnetwork.org/feed/") },
    { name: "Positive.News", url: rss("https://www.positive.news/feed/") },
    { name: "Reasons to be Cheerful", url: rss("https://reasonstobecheerful.world/feed/") },
    { name: "Optimist Daily", url: rss("https://www.optimistdaily.com/feed/") },
    { name: "Upworthy", url: rss("https://www.upworthy.com/feed/") },
    { name: "DailyGood", url: rss("https://www.dailygood.org/feed") },
    { name: "Good Good Good", url: rss("https://www.goodgoodgood.co/articles/rss.xml") },
    { name: "GOOD Magazine", url: rss("https://www.good.is/feed/") },
    { name: "Sunny Skyz", url: rss("https://www.sunnyskyz.com/rss_tebow.php") },
    { name: "The Better India", url: rss("https://thebetterindia.com/feed/") }
  ],
  science: [
    { name: "GNN Science", url: rss("https://www.goodnewsnetwork.org/category/news/science/feed/") },
    { name: "ScienceDaily", url: rss("https://www.sciencedaily.com/rss/all.xml") },
    { name: "Nature News", url: rss("https://www.nature.com/nature.rss") },
    { name: "Live Science", url: rss("https://www.livescience.com/feeds.xml") },
    { name: "New Scientist", url: rss("https://www.newscientist.com/feed/home/") },
    { name: "Singularity Hub", url: rss("https://singularityhub.com/feed/") },
    { name: "Human Progress", url: rss("https://humanprogress.org/feed/") },
    { name: "Greater Good (Berkeley)", url: rss("https://greatergood.berkeley.edu/site/rss/articles") }
  ],
  nature: [
    { name: "GNN Animals", url: rss("https://www.goodnewsnetwork.org/category/news/animals/feed/") },
    { name: "GNN Earth", url: rss("https://www.goodnewsnetwork.org/category/news/earth/feed/") },
    { name: "Mongabay", url: rss("https://news.mongabay.com/feed/") },
    { name: "Conservation Optimism", url: rss("https://conservationoptimism.org/feed/") }
  ],
  inspiring: [
    { name: "GNN Heroes", url: rss("https://www.goodnewsnetwork.org/category/news/inspiring/feed/") },
    { name: "GNN Health", url: rss("https://www.goodnewsnetwork.org/category/news/health/feed/") },
    { name: "GNN Heroes Spotlight", url: rss("https://www.goodnewsnetwork.org/category/news/heroes/feed/") }
  ],
  community: [
    { name: "Shareable", url: rss("https://www.shareable.net/feed/") },
    { name: "Yes! Magazine", url: rss("https://www.yesmagazine.org/feed") }
  ]
};
var COMMODITY_FEEDS = {
  "commodity-news": [
    // Kitco shut down their public RSS feeds in 2025 (every /rss/*, /news/feed,
    // /news/category/*/feed path now returns an HTML SPA page, not XML). Fall
    // back to Google News scoped to site:kitco.com, matching the pattern used
    // by TASS / Kyiv Independent / Telegraaf elsewhere in this file.
    { name: "Kitco News", url: rss("https://news.google.com/rss/search?q=site:kitco.com+(gold+OR+silver+OR+metals)+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Mining.com", url: rss("https://www.mining.com/feed/") },
    { name: "Bloomberg Commodities", url: rss("https://news.google.com/rss/search?q=site:bloomberg.com+commodities+OR+metals+OR+mining+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Reuters Commodities", url: rss("https://news.google.com/rss/search?q=site:reuters.com+commodities+OR+metals+OR+mining+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "S&P Global Commodity", url: rss("https://news.google.com/rss/search?q=site:spglobal.com+commodities+metals+when:3d&hl=en-US&gl=US&ceid=US:en") },
    // Commodity Trade Mantra REMOVED (PR #3715 review):
    // commoditytrademantra.com wholesale-403s any direct fetch AND Google News
    // returns 0 items for site:commoditytrademantra.com at every probed time
    // window (publisher effectively not indexed by Google News). commodity-news
    // still has Mining.com / Bloomberg / Reuters / S&P Global / CNBC —
    // coverage isn't lost.
    { name: "CNBC Commodities", url: rss("https://news.google.com/rss/search?q=site:cnbc.com+(commodities+OR+metals+OR+gold+OR+copper)+when:1d&hl=en-US&gl=US&ceid=US:en") }
  ],
  "gold-silver": [
    // Kitco RSS shutdown (see Kitco News comment in commodity-news above).
    // Gold-scoped Google News query targeting site:kitco.com.
    { name: "Kitco Gold", url: rss("https://news.google.com/rss/search?q=site:kitco.com+gold+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Gold Price News", url: rss('https://news.google.com/rss/search?q=(gold+price+OR+"gold+market"+OR+bullion+OR+LBMA)+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Silver Price News", url: rss('https://news.google.com/rss/search?q=(silver+price+OR+"silver+market"+OR+"silver+futures")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Precious Metals", url: rss('https://news.google.com/rss/search?q=("precious+metals"+OR+platinum+OR+palladium+OR+"gold+ETF"+OR+GLD+OR+SLV)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "World Gold Council", url: rss('https://news.google.com/rss/search?q="World+Gold+Council"+OR+"central+bank+gold"+OR+"gold+reserves"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // GoldSeek + SilverSeek moved their feeds from the `news.*` subdomain to
    // the apex domain (the old subdomain returns 404; the apex /rss.xml on
    // both returns application/rss+xml).
    { name: "GoldSeek", url: rss("https://www.goldseek.com/rss.xml") },
    { name: "SilverSeek", url: rss("https://www.silverseek.com/rss.xml") },
    { name: "Gold Silver Worlds", url: rss("https://goldsilverworlds.com/feed/") },
    // The /api/v1/.../feed endpoint FX Empire used to expose was deprecated;
    // their generic /feed now returns text/html, not RSS. Google News scoped
    // to site:fxempire.com for gold articles.
    { name: "FX Empire Gold", url: rss("https://news.google.com/rss/search?q=site:fxempire.com+gold+when:1d&hl=en-US&gl=US&ceid=US:en") }
  ],
  energy: [
    { name: "OilPrice.com", url: rss("https://oilprice.com/rss/main") },
    { name: "Rigzone", url: rss("https://www.rigzone.com/news/rss/rigzone_latest.aspx") },
    { name: "EIA Reports", url: rss("https://www.eia.gov/rss/press_room.xml") },
    { name: "OPEC News", url: rss('https://news.google.com/rss/search?q=(OPEC+OR+"oil+price"+OR+"crude+oil"+OR+WTI+OR+Brent+OR+"oil+production")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Natural Gas News", url: rss('https://news.google.com/rss/search?q=("natural+gas"+OR+LNG+OR+"gas+price"+OR+"Henry+Hub")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Energy Intel", url: rss('https://news.google.com/rss/search?q=(energy+commodities+OR+"energy+market"+OR+"energy+prices")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Reuters Energy", url: rss("https://news.google.com/rss/search?q=site:reuters.com+(oil+OR+gas+OR+energy)+when:1d&hl=en-US&gl=US&ceid=US:en") }
  ],
  "mining-news": [
    // mining-journal.com migrated to Kreatio CMS; /feed/ now returns
    // text/html (the homepage SPA), not RSS — produces "Parse error for
    // Mining Journal" in the client. Google News fallback.
    { name: "Mining Journal", url: rss("https://news.google.com/rss/search?q=site:mining-journal.com+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Northern Miner", url: rss("https://www.northernminer.com/feed/") },
    // www.miningweekly.com domain-wide 403s every IP-based fetch (homepage
    // included), not just Vercel edge — Railway relay likely wouldn't help.
    // Google News scoped to site:miningweekly.com is the reliable path and
    // matches the pattern used for other wholesale-blocked publishers.
    { name: "Mining Weekly", url: rss("https://news.google.com/rss/search?q=site:miningweekly.com+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Mining Technology", url: rss("https://www.mining-technology.com/feed/") },
    { name: "Australian Mining", url: rss("https://www.australianmining.com.au/feed/") },
    { name: "Mine Web (SNL)", url: rss('https://news.google.com/rss/search?q=("mining+company"+OR+"mine+production"+OR+"mining+operations")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Resource World", url: rss('https://news.google.com/rss/search?q=("mining+project"+OR+"mineral+exploration"+OR+"mine+development")+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  "critical-minerals": [
    { name: "Benchmark Mineral", url: rss('https://news.google.com/rss/search?q=("critical+minerals"+OR+"battery+metals"+OR+lithium+OR+cobalt+OR+"rare+earths")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Lithium Market", url: rss('https://news.google.com/rss/search?q=(lithium+price+OR+"lithium+market"+OR+"lithium+supply"+OR+spodumene+OR+LCE)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Cobalt Market", url: rss('https://news.google.com/rss/search?q=(cobalt+price+OR+"cobalt+market"+OR+"DRC+cobalt"+OR+"battery+cobalt")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Rare Earths News", url: rss('https://news.google.com/rss/search?q=("rare+earth"+OR+"rare+earths"+OR+"REE"+OR+neodymium+OR+praseodymium)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "EV Battery Supply", url: rss('https://news.google.com/rss/search?q=("EV+battery"+OR+"battery+supply+chain"+OR+"battery+materials")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "IEA Critical Minerals", url: rss("https://news.google.com/rss/search?q=site:iea.org+(minerals+OR+critical+OR+battery)+when:14d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Uranium Market", url: rss('https://news.google.com/rss/search?q=(uranium+price+OR+"uranium+market"+OR+U3O8+OR+nuclear+fuel)+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ],
  "base-metals": [
    { name: "LME Metals", url: rss('https://news.google.com/rss/search?q=(LME+OR+"London+Metal+Exchange")+copper+OR+aluminum+OR+zinc+OR+nickel+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Copper Market", url: rss('https://news.google.com/rss/search?q=(copper+price+OR+"copper+market"+OR+"copper+supply"+OR+COMEX+copper)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Nickel News", url: rss('https://news.google.com/rss/search?q=(nickel+price+OR+"nickel+market"+OR+"nickel+supply"+OR+Indonesia+nickel)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Aluminum & Zinc", url: rss('https://news.google.com/rss/search?q=(aluminum+price+OR+aluminium+OR+zinc+price+OR+"base+metals")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Iron Ore Market", url: rss('https://news.google.com/rss/search?q=("iron+ore"+price+OR+"iron+ore+market"+OR+"steel+raw+materials")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Metals Bulletin", url: rss('https://news.google.com/rss/search?q=("metals+market"+OR+"base+metals"+OR+SHFE+OR+"Shanghai+Futures")+when:2d&hl=en-US&gl=US&ceid=US:en') }
  ],
  "mining-companies": [
    { name: "BHP News", url: rss('https://news.google.com/rss/search?q=BHP+(mining+OR+production+OR+results+OR+copper+OR+"iron+ore")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Rio Tinto News", url: rss('https://news.google.com/rss/search?q="Rio+Tinto"+(mining+OR+production+OR+results+OR+Pilbara)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Glencore & Vale", url: rss('https://news.google.com/rss/search?q=(Glencore+OR+Vale)+(mining+OR+production+OR+cobalt+OR+"iron+ore")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Gold Majors", url: rss("https://news.google.com/rss/search?q=(Newmont+OR+Barrick+OR+AngloGold+OR+Agnico)+(gold+mine+OR+production+OR+results)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Freeport & Copper Miners", url: rss("https://news.google.com/rss/search?q=(Freeport+McMoRan+OR+Southern+Copper+OR+Teck+OR+Antofagasta)+when:7d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Critical Mineral Companies", url: rss('https://news.google.com/rss/search?q=(Albemarle+OR+SQM+OR+"MP+Materials"+OR+Lynas+OR+Cameco)+when:7d&hl=en-US&gl=US&ceid=US:en') }
  ],
  "supply-chain": [
    { name: "Shipping & Freight", url: rss('https://news.google.com/rss/search?q=("bulk+carrier"+OR+"dry+bulk"+OR+"commodity+shipping"+OR+"Port+Hedland"+OR+"Strait+of+Hormuz")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Trade Routes", url: rss('https://news.google.com/rss/search?q=("trade+route"+OR+"supply+chain"+OR+"commodity+export"+OR+"mineral+export")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "China Commodity Imports", url: rss('https://news.google.com/rss/search?q=(China+imports+copper+OR+iron+ore+OR+lithium+OR+cobalt+OR+"rare+earth")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Port & Logistics", url: rss('https://news.google.com/rss/search?q=("iron+ore+port"+OR+"copper+port"+OR+"commodity+port"+OR+"mineral+logistics")+when:7d&hl=en-US&gl=US&ceid=US:en') }
  ],
  "commodity-regulation": [
    { name: "Mining Regulation", url: rss('https://news.google.com/rss/search?q=("mining+regulation"+OR+"mining+policy"+OR+"mining+permit"+OR+"mining+ban")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "ESG in Mining", url: rss('https://news.google.com/rss/search?q=("mining+ESG"+OR+"responsible+mining"+OR+"mine+closure"+OR+"tailings")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Trade & Tariffs", url: rss('https://news.google.com/rss/search?q=("mineral+tariff"+OR+"metals+tariff"+OR+"critical+mineral+policy"+OR+"mining+export+ban")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Indonesia Nickel Policy", url: rss('https://news.google.com/rss/search?q=(Indonesia+nickel+OR+"nickel+export"+OR+"nickel+ban"+OR+"nickel+processing")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: "China Mineral Policy", url: rss('https://news.google.com/rss/search?q=(China+"rare+earth"+OR+"mineral+export"+OR+"critical+mineral")+policy+OR+restriction+when:7d&hl=en-US&gl=US&ceid=US:en') }
  ],
  markets: [
    { name: "Yahoo Finance Commodities", url: rss("https://finance.yahoo.com/rss/topstories") },
    { name: "CNBC Markets", url: rss("https://www.cnbc.com/id/100003114/device/rss/rss.html") },
    { name: "Seeking Alpha Metals", url: rss("https://news.google.com/rss/search?q=site:seekingalpha.com+(gold+OR+silver+OR+copper+OR+mining)+when:2d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Commodity Futures", url: rss('https://news.google.com/rss/search?q=(COMEX+OR+NYMEX+OR+"commodity+futures"+OR+CME+commodities)+when:2d&hl=en-US&gl=US&ceid=US:en') }
  ],
  finance: [
    { name: "CNBC", url: rss("https://www.cnbc.com/id/100003114/device/rss/rss.html") },
    { name: "MarketWatch", url: rss("https://news.google.com/rss/search?q=site:marketwatch.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Yahoo Finance", url: rss("https://finance.yahoo.com/news/rssindex") },
    { name: "Financial Times", url: rss("https://www.ft.com/rss/home") },
    { name: "Reuters Business", url: rss("https://news.google.com/rss/search?q=site:reuters.com+business+markets&hl=en-US&gl=US&ceid=US:en") }
  ]
};
var ENERGY_FEEDS = {
  "live-news": [
    { name: "OilPrice.com", url: rss("https://oilprice.com/rss/main") },
    { name: "Rigzone", url: rss("https://www.rigzone.com/news/rss/rigzone_latest.aspx") },
    { name: "Reuters Energy", url: rss("https://news.google.com/rss/search?q=site:reuters.com+(oil+OR+gas+OR+energy+OR+OPEC+OR+pipeline+OR+LNG)+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Bloomberg Energy", url: rss("https://news.google.com/rss/search?q=site:bloomberg.com+(oil+OR+gas+OR+energy+OR+pipeline+OR+LNG)+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "FT Energy", url: rss("https://news.google.com/rss/search?q=site:ft.com+(oil+OR+gas+OR+energy+OR+LNG+OR+OPEC)+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "IEA News", url: rss("https://news.google.com/rss/search?q=site:iea.org+(oil+OR+gas+OR+energy)+when:3d&hl=en-US&gl=US&ceid=US:en") },
    { name: "S&P Global Platts", url: rss("https://news.google.com/rss/search?q=site:spglobal.com+(oil+OR+gas+OR+LNG+OR+pipeline)+when:2d&hl=en-US&gl=US&ceid=US:en") }
  ],
  energy: [
    { name: "OilPrice.com", url: rss("https://oilprice.com/rss/main") },
    { name: "Rigzone", url: rss("https://www.rigzone.com/news/rss/rigzone_latest.aspx") },
    { name: "EIA Press Room", url: rss("https://www.eia.gov/rss/press_room.xml") },
    { name: "OPEC & Crude", url: rss('https://news.google.com/rss/search?q=(OPEC+OR+"oil+price"+OR+"crude+oil"+OR+WTI+OR+Brent+OR+"oil+production"+OR+"oil+inventory")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Natural Gas & LNG", url: rss('https://news.google.com/rss/search?q=("natural+gas"+OR+LNG+OR+"gas+price"+OR+"Henry+Hub"+OR+TTF+OR+JKM+OR+"LNG+cargo")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Pipelines & Chokepoints", url: rss('https://news.google.com/rss/search?q=(pipeline+OR+Druzhba+OR+"Nord+Stream"+OR+TurkStream+OR+"Strait+of+Hormuz"+OR+"Bab+el-Mandeb"+OR+"Suez+Canal"+OR+"Power+of+Siberia")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Energy Crisis & Shortages", url: rss('https://news.google.com/rss/search?q=("fuel+shortage"+OR+"gas+shortage"+OR+"diesel+shortage"+OR+"jet+fuel+shortage"+OR+"energy+crisis"+OR+rationing+OR+"petrol+shortage")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Refinery & Disruptions", url: rss('https://news.google.com/rss/search?q=(refinery+OR+"refinery+outage"+OR+"force+majeure"+OR+"pipeline+sabotage"+OR+"pipeline+attack")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Energy Intel", url: rss('https://news.google.com/rss/search?q=(energy+commodities+OR+"energy+market"+OR+"energy+prices"+OR+"energy+security")+when:2d&hl=en-US&gl=US&ceid=US:en') }
  ],
  "supply-chain": [
    { name: "Tanker & Shipping", url: rss('https://news.google.com/rss/search?q=(tanker+OR+VLCC+OR+Suezmax+OR+Aframax+OR+"oil+shipping"+OR+"LNG+carrier"+OR+"shadow+fleet")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Strategic Chokepoints", url: rss('https://news.google.com/rss/search?q=("Strait+of+Hormuz"+OR+"Strait+of+Malacca"+OR+"Bab+el-Mandeb"+OR+"Suez+Canal"+OR+"Panama+Canal"+OR+"Turkish+Straits"+OR+"Danish+Straits")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Energy Sanctions", url: rss('https://news.google.com/rss/search?q=("oil+sanctions"+OR+"gas+sanctions"+OR+"price+cap"+OR+"energy+embargo"+OR+"LNG+sanctions")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Port & Terminal", url: rss('https://news.google.com/rss/search?q=("LNG+terminal"+OR+"crude+terminal"+OR+"oil+port"+OR+"Ras+Laffan"+OR+"Sabine+Pass"+OR+"Rotterdam+oil")+when:3d&hl=en-US&gl=US&ceid=US:en') }
  ]
};
var FEEDS = SITE_VARIANT === "tech" ? TECH_FEEDS : SITE_VARIANT === "finance" ? FINANCE_FEEDS : SITE_VARIANT === "happy" ? HAPPY_FEEDS : SITE_VARIANT === "commodity" ? COMMODITY_FEEDS : SITE_VARIANT === "energy" ? ENERGY_FEEDS : FULL_FEEDS;
var ON_DEMAND_FEEDS = {
  "nq-news": [
    { name: "Reuters Nasdaq Futures", url: rss('https://news.google.com/rss/search?q=site:reuters.com+(Nasdaq+futures+OR+NQ+OR+"E-mini")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Nasdaq-100 & QQQ", url: rss('https://news.google.com/rss/search?q=("Nasdaq-100"+OR+QQQ+OR+"Nasdaq+100")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: "Federal Reserve", url: rss("https://www.federalreserve.gov/feeds/press_all.xml") },
    { name: "NQ Influence Basket", url: rss("https://news.google.com/rss/search?q=(AAPL+OR+Apple+OR+MSFT+OR+Microsoft+OR+NVDA+OR+NVIDIA+OR+AMZN+OR+Amazon+OR+GOOGL+OR+Alphabet+OR+META+OR+AVGO+OR+Broadcom+OR+TSLA+OR+Tesla)+when:1d&hl=en-US&gl=US&ceid=US:en") },
    { name: "Semiconductors", url: rss('https://news.google.com/rss/search?q=(semiconductor+OR+chip+OR+"AI+chip"+OR+TSMC+OR+ASML)+when:1d&hl=en-US&gl=US&ceid=US:en') }
  ]
};
var CANONICAL_FEEDS = mergeCanonicalFeeds([
  FULL_FEEDS,
  TECH_FEEDS,
  FINANCE_FEEDS,
  COMMODITY_FEEDS,
  ENERGY_FEEDS,
  HAPPY_FEEDS,
  ON_DEMAND_FEEDS
]);
var INTEL_SOURCES = [
  // Defense & Security (Tier 1)
  { name: "Defense One", url: rss("https://www.defenseone.com/rss/all/"), type: "defense" },
  { name: "The War Zone", url: rss("https://www.twz.com/feed"), type: "defense" },
  { name: "Defense News", url: rss("https://www.defensenews.com/arc/outboundfeeds/rss/?outputType=xml"), type: "defense" },
  { name: "Janes", url: rss("https://news.google.com/rss/search?q=site:janes.com+when:3d&hl=en-US&gl=US&ceid=US:en"), type: "defense" },
  { name: "Military Times", url: rss("https://www.militarytimes.com/arc/outboundfeeds/rss/?outputType=xml"), type: "defense" },
  { name: "Task & Purpose", url: rss("https://taskandpurpose.com/feed/"), type: "defense" },
  { name: "USNI News", url: rss("https://news.google.com/rss/search?q=site:news.usni.org+when:3d&hl=en-US&gl=US&ceid=US:en"), type: "defense" },
  { name: "gCaptain", url: rss("https://gcaptain.com/feed/"), type: "defense" },
  { name: "Oryx OSINT", url: rss("https://www.oryxspioenkop.com/feeds/posts/default?alt=rss"), type: "defense" },
  // Declared LAST in the defense group on purpose. The free-tier source cap
  // (selectSourcesUnderCap, FREE_MAX_SOURCES) fills category buckets round-robin
  // in DECLARATION ORDER, and the intel bucket only gets a handful of slots — so
  // inserting a new name near the top silently evicts whichever default-enabled
  // source it pushes past the cap. That eviction is written back into
  // worldmonitor-disabled-feeds and cloud-synced rather than recomputed, so it
  // never recovers. Appending makes a new source absorb its own cap cost instead
  // of deleting an existing one from every free-tier user (#5405 review).
  { name: "Breaking Defense", url: rss("https://breakingdefense.com/feed/"), type: "defense" },
  { name: "UK MOD", url: rss("https://www.gov.uk/government/organisations/ministry-of-defence.atom"), type: "defense" },
  { name: "CSIS", url: rss("https://news.google.com/rss/search?q=site:csis.org&hl=en&gl=US&ceid=US:en"), type: "defense" },
  // International Relations (Tier 2)
  { name: "Chatham House", url: rss("https://news.google.com/rss/search?q=site:chathamhouse.org+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "intl" },
  { name: "ECFR", url: rss("https://news.google.com/rss/search?q=site:ecfr.eu+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "intl" },
  { name: "Foreign Policy", url: rss("https://foreignpolicy.com/feed/"), type: "intl" },
  { name: "Foreign Affairs", url: rss("https://www.foreignaffairs.com/rss.xml"), type: "intl" },
  { name: "Atlantic Council", url: railwayRss("https://www.atlanticcouncil.org/feed/"), type: "intl" },
  { name: "Middle East Institute", url: rss("https://news.google.com/rss/search?q=site:mei.edu+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "intl" },
  // Think Tanks & Research (Tier 3)
  { name: "RAND", url: rss("https://www.rand.org/pubs/articles.xml"), type: "research" },
  { name: "Brookings", url: rss("https://news.google.com/rss/search?q=site:brookings.edu&hl=en&gl=US&ceid=US:en"), type: "research" },
  { name: "Carnegie", url: rss("https://news.google.com/rss/search?q=site:carnegieendowment.org&hl=en&gl=US&ceid=US:en"), type: "research" },
  { name: "FAS", url: rss("https://news.google.com/rss/search?q=site:fas.org+nuclear+weapons+security&hl=en&gl=US&ceid=US:en"), type: "research" },
  { name: "NTI", url: rss("https://news.google.com/rss/search?q=site:nti.org+when:30d&hl=en-US&gl=US&ceid=US:en"), type: "research" },
  { name: "RUSI", url: rss("https://news.google.com/rss/search?q=site:rusi.org+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "research" },
  { name: "Wilson Center", url: rss("https://news.google.com/rss/search?q=site:wilsoncenter.org+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "research" },
  { name: "GMF", url: rss("https://news.google.com/rss/search?q=site:gmfus.org+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "research" },
  { name: "Stimson Center", url: rss("https://www.stimson.org/feed/"), type: "research" },
  { name: "CNAS", url: rss("https://news.google.com/rss/search?q=site:cnas.org+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "research" },
  { name: "Lowy Institute", url: rss("https://news.google.com/rss/search?q=site:lowyinstitute.org+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "research" },
  // Nuclear & Arms Control (Tier 2)
  { name: "Arms Control Assn", url: rss("https://news.google.com/rss/search?q=site:armscontrol.org+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "nuclear" },
  { name: "Bulletin of Atomic Scientists", url: rss("https://news.google.com/rss/search?q=site:thebulletin.org+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "nuclear" },
  // OSINT & Monitoring (Tier 2)
  { name: "Bellingcat", url: rss("https://news.google.com/rss/search?q=site:bellingcat.com+when:30d&hl=en-US&gl=US&ceid=US:en"), type: "osint" },
  { name: "Krebs Security", url: rss("https://krebsonsecurity.com/feed/"), type: "cyber" },
  { name: "Ransomware.live", url: rss("https://www.ransomware.live/rss.xml"), type: "cyber" },
  // Economic & Food Security (Tier 2)
  { name: "FAO News", url: rss("https://www.fao.org/feeds/fao-newsroom-rss"), type: "economic" },
  { name: "FAO GIEWS", url: rss("https://news.google.com/rss/search?q=site:fao.org+GIEWS+food+security+when:30d&hl=en-US&gl=US&ceid=US:en"), type: "economic" },
  // Investigative Journalism & Accountability
  // Cross-border corruption & organized crime investigations (Panama Papers, Pandora Papers)
  { name: "OCCRP", url: rss("https://www.occrp.org/en/feed"), type: "investigative" },
  // Atlantic Council Digital Forensic Research Lab — disinformation/influence operations
  { name: "DFRLab", url: rss("https://dfrlab.org/feed/"), type: "investigative" },
  // European investigative collective — migration, extremism, accountability
  { name: "Lighthouse Reports", url: rss("https://www.lighthousereports.com/feed/"), type: "investigative" },
  // Africa-focused: war crimes, illicit finance, sanctions evasion
  { name: "The Sentry", url: rss("https://thesentry.org/feed/"), type: "investigative" },
  // Global Initiative Against Transnational Organized Crime
  { name: "GITOC", url: rss("https://globalinitiative.net/feed/"), type: "investigative" },
  // V4/CEE investigative network (OCCRP member)
  { name: "VSquare", url: rss("https://vsquare.org/feed/"), type: "investigative" },
  // German investigative journalism & fact-checking nonprofit
  { name: "Correctiv", url: rss("https://correctiv.org/feed/"), type: "investigative" },
  { name: "EU ISS", url: rss("https://news.google.com/rss/search?q=site:iss.europa.eu+when:7d&hl=en-US&gl=US&ceid=US:en"), type: "intl" }
];
var FRONTLINE_EUROPE_PROTECTED_SOURCES = [
  "Kyiv Independent",
  "TVN24",
  "Rzeczpospolita",
  "Meduza",
  "Moscow Times",
  "Ukrainska Pravda EN",
  "NV EN"
];
var EASTERN_FLANK_EN_DEFAULT_SOURCES = [
  "Daily Sabah",
  "ERR News"
];
var AFRICA_DEPTH_EN_DEFAULT_SOURCES = [
  "Hiiraan Online",
  "RFI Afrique"
];
var CAUCASUS_EN_DEFAULT_SOURCES = [
  "Civil.ge",
  "OC Media"
];
var CENTRAL_ASIA_EN_DEFAULT_SOURCES = [
  "Eurasianet",
  "The Astana Times"
];
var INDO_PACIFIC_EN_DEFAULT_SOURCES = [
  "Focus Taiwan",
  "Dawn",
  "Rappler"
];
var CRISIS_FLOOR_EN_DEFAULT_SOURCES = [
  "Yemen Online",
  "Syria Direct",
  "+972 Magazine",
  "HaitiLibre English",
  "Amu TV",
  "Naharnet Lebanon",
  "Caracas Chronicles",
  "Havana Times",
  "Libya Herald",
  "Egypt Independent",
  "The Daily Star",
  "Daily Nation",
  "The Guardian Post"
];
var CRISIS_FLOOR_STRATEGIC_DEFAULT_SOURCES = [
  "Annahar",
  "Studio Tamani",
  "leFaso.net",
  "ActuNiger"
];
var CRISIS_FLOOR_OPT_IN_SOURCES = [
  "Sana'a Center",
  "Enab Baladi English",
  "WAFA English",
  "AyiboPost",
  "Pajhwok Afghan News",
  "L'Orient Today",
  "A\xEFr Info",
  "Efecto Cocuyo",
  "14ymedio",
  "Mada Masr",
  "Dhaka Tribune",
  "Tchadinfos",
  "Alwihda Info",
  "Radio Ndeke Luka"
];
var CRISIS_DESK_ROLLOUT_SOURCES = [
  ...CRISIS_FLOOR_EN_DEFAULT_SOURCES,
  ...CRISIS_FLOOR_STRATEGIC_DEFAULT_SOURCES,
  ...CRISIS_FLOOR_OPT_IN_SOURCES
];
var REGIONAL_FEED_ROLLOUT_DEFAULT_SOURCES = [
  ...EASTERN_FLANK_EN_DEFAULT_SOURCES,
  ...CAUCASUS_EN_DEFAULT_SOURCES,
  ...CENTRAL_ASIA_EN_DEFAULT_SOURCES,
  ...INDO_PACIFIC_EN_DEFAULT_SOURCES,
  ...AFRICA_DEPTH_EN_DEFAULT_SOURCES
];
var REGIONAL_FEED_ROLLOUT_OPT_IN_SOURCES = [
  "Seznam Zpr\xE1vy",
  "Digi24",
  "HotNews",
  "G4Media",
  "Dnevnik",
  "LRT English",
  "LSM English",
  "JAMnews",
  "Azertag",
  "Armenpress",
  "Zerkalo",
  "NewsMaker",
  "Ziarul de Gard\u0103",
  "Radio Tamazuj",
  "The Reporter Ethiopia",
  "Actualite.cd",
  "Radio Okapi",
  "MyJoyOnline",
  "Le Quotidien",
  "RFE/RL Central Asia",
  "The Times of Central Asia",
  "Taipei Times",
  "Taiwan News",
  "Geo News",
  "Jakarta Post",
  "The Star (Malaysia)",
  "Irrawaddy",
  "Ethiopia Insight",
  "Dabanga Sudan",
  "Citi Newsroom"
];
var CANADA_EN_DEFAULT_SOURCES = [
  "CBC News",
  "CTV News",
  "Toronto Star"
];
var CANADA_ARCTIC_OPT_IN_SOURCES = [
  "Globe and Mail",
  "Global News",
  "Yle News",
  "NRK",
  "Aftenposten",
  "DR Nyheder",
  "Arctic Today"
];
var CANADA_DEPTH_OPT_IN_SOURCES = [
  "National Post",
  "Financial Post",
  "iPolitics",
  "The Narwhal",
  "The Tyee",
  "Radio-Canada",
  "La Presse",
  "Le Devoir",
  "TVA Nouvelles",
  "Vancouver Sun",
  "Calgary Herald",
  "Winnipeg Free Press",
  "Ottawa Citizen",
  "Edmonton Journal",
  "Maclean's",
  "The Province",
  "CP24",
  "Montreal Gazette"
];
var CURATED_REGIONAL_OPT_IN_SOURCES = [
  "Guardian Africa",
  "France 24 Africa",
  "Guardian Caribbean",
  "Guardian Pacific",
  "France 24 Asia Pacific"
];
var TURKIYE_FEED_SOURCES = [
  "TRT Haber",
  "TRT Haber Son Dakika",
  "TRT Haber D\xFCnya",
  "NTV",
  "Habert\xFCrk",
  "Habert\xFCrk D\xFCnya",
  "S\xF6zc\xFC",
  "Cumhuriyet",
  "Milliyet",
  "Sabah",
  "Euronews T\xFCrk\xE7e",
  "BBC T\xFCrk\xE7e",
  "DW T\xFCrk\xE7e",
  "Bloomberg HT",
  "D\xFCnya Gazetesi",
  "Yeni \u015Eafak",
  "Independent T\xFCrk\xE7e",
  "Evrensel",
  "Gazete Duvar",
  "BirG\xFCn",
  "Diken",
  "Ak\u015Fam",
  "Karar",
  "Yeni\xE7a\u011F",
  "Star"
];
var REGIONAL_FEED_ROLLOUT_STAGES = [
  {
    introducedNames: [
      "Civil.ge",
      "OC Media",
      "JAMnews",
      "Azertag",
      "Armenpress",
      "Zerkalo",
      "NewsMaker",
      "Ziarul de Gard\u0103",
      "Radio Tamazuj",
      "The Reporter Ethiopia",
      "Actualite.cd",
      "Radio Okapi",
      "MyJoyOnline",
      "Le Quotidien",
      "Eurasianet",
      "RFE/RL Central Asia",
      "The Astana Times",
      "The Times of Central Asia"
    ],
    protectedNames: [...FRONTLINE_EUROPE_PROTECTED_SOURCES]
  },
  {
    introducedNames: [
      "Focus Taiwan",
      "Taipei Times",
      "Taiwan News",
      "Dawn",
      "Geo News",
      "Jakarta Post",
      "Rappler",
      "The Star (Malaysia)",
      "Irrawaddy"
    ],
    protectedNames: [...FRONTLINE_EUROPE_PROTECTED_SOURCES]
  },
  {
    introducedNames: [
      "Daily Sabah",
      "Seznam Zpr\xE1vy",
      "Digi24",
      "HotNews",
      "G4Media",
      "Dnevnik",
      "ERR News",
      "LRT English",
      "LSM English"
    ],
    protectedNames: [
      ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
      ...EASTERN_FLANK_EN_DEFAULT_SOURCES
    ]
  },
  {
    introducedNames: [
      "Ethiopia Insight",
      "Dabanga Sudan",
      "Hiiraan Online",
      "Citi Newsroom",
      "RFI Afrique"
    ],
    protectedNames: [
      ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
      ...EASTERN_FLANK_EN_DEFAULT_SOURCES,
      ...AFRICA_DEPTH_EN_DEFAULT_SOURCES
    ]
  },
  {
    // #5960 is newer than the schema-5 regional wave. Keeping its names in a
    // chronological stage removes them from every pre-pack fingerprint
    // while still allowing current-cap states to be reconstructed after it.
    // Freeze CBC as the historical default-on name so expanding
    // CANADA_EN_DEFAULT_SOURCES does not rewrite this stage.
    introducedNames: [
      "CBC News",
      ...CANADA_ARCTIC_OPT_IN_SOURCES
    ],
    protectedNames: [
      ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
      ...REGIONAL_FEED_ROLLOUT_DEFAULT_SOURCES,
      "CBC News"
    ]
  },
  {
    // Canada depth pack (#6604/#6605). Introduces the remaining national,
    // francophone, and regional names after the #5960 trio.
    introducedNames: [
      "Toronto Star",
      "CTV News",
      ...CANADA_DEPTH_OPT_IN_SOURCES
    ],
    protectedNames: [
      ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
      ...REGIONAL_FEED_ROLLOUT_DEFAULT_SOURCES,
      ...CANADA_EN_DEFAULT_SOURCES
    ]
  },
  {
    // Validated crisis desks (#6813-#6830): defaults, strategic defaults, and opt-ins.
    introducedNames: [
      ...CRISIS_DESK_ROLLOUT_SOURCES
    ],
    protectedNames: [
      ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
      ...REGIONAL_FEED_ROLLOUT_DEFAULT_SOURCES,
      ...CANADA_EN_DEFAULT_SOURCES,
      ...CRISIS_FLOOR_EN_DEFAULT_SOURCES,
      ...CRISIS_FLOOR_STRATEGIC_DEFAULT_SOURCES
    ]
  },
  {
    introducedNames: [...CURATED_REGIONAL_OPT_IN_SOURCES],
    protectedNames: [
      ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
      ...REGIONAL_FEED_ROLLOUT_DEFAULT_SOURCES,
      ...CANADA_EN_DEFAULT_SOURCES,
      ...CRISIS_FLOOR_EN_DEFAULT_SOURCES,
      ...CRISIS_FLOOR_STRATEGIC_DEFAULT_SOURCES
    ]
  },
  {
    // Yerküre: Türkiye kamu/ulusal haber paketi. Türkçe arayüzde dil eşleşmesiyle
    // açılır; diğer dillerde isteğe bağlıdır. Kronolojik aşama olarak kayıtlı ki
    // eski profil parmak izleri bu adları içermesin.
    introducedNames: [...TURKIYE_FEED_SOURCES],
    protectedNames: [
      ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
      ...REGIONAL_FEED_ROLLOUT_DEFAULT_SOURCES,
      ...CANADA_EN_DEFAULT_SOURCES,
      ...CRISIS_FLOOR_EN_DEFAULT_SOURCES,
      ...CRISIS_FLOOR_STRATEGIC_DEFAULT_SOURCES
    ]
  }
];
var FREE_CAP_PROTECTED_SOURCES = [
  ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
  ...REGIONAL_FEED_ROLLOUT_DEFAULT_SOURCES,
  ...CANADA_EN_DEFAULT_SOURCES,
  ...CRISIS_FLOOR_EN_DEFAULT_SOURCES,
  ...CRISIS_FLOOR_STRATEGIC_DEFAULT_SOURCES
];
function getStrategicDefaultSources() {
  const strategic = /* @__PURE__ */ new Set();
  for (const feeds of Object.values(FULL_FEEDS)) {
    for (const feed of feeds) {
      if (feed.strategicDefault) strategic.add(feed.name);
    }
  }
  for (const feed of INTEL_SOURCES) {
    if (feed.strategicDefault) strategic.add(feed.name);
  }
  return strategic;
}
var DEFAULT_ENABLED_SOURCES = {
  politics: ["BBC World", "Guardian World", "AP News", "Reuters World", "CNN World"],
  // Canada pack (#5960/#6604/#6605): CBC News + CTV News + Toronto Star
  // default-on for North America keyCountry CA (floors.CA = 3). Globe and Mail
  // + Global News remain catalog opt-in (arctic pack). Remaining depth names
  // are catalog opt-in. FR sources are locale-boosted only. CTV is GNews-only.
  us: ["Reuters US", "NPR News", "PBS NewsHour", "ABC News", "CBS News", "NBC News", "Wall Street Journal", "Politico", "The Hill", "CBC News", "CTV News", "Toronto Star"],
  // Europe defaults — Ukraine war frontline (#5949) + UA/RU balance rule (#5950):
  // ≥1 dedicated UA primary (Kyiv Independent) + ≥1 independent RU (Meduza, Moscow Times).
  // PL frontline: TVN24 + Rzeczpospolita (not all three PL; noise control).
  // TASS/RT never default-on. Extra UA outlets deferred to #5951.
  // HU/EL locale packs remain locale-boosted only, not EN default-on.
  // Eastern flank (#5952): Daily Sabah (EN Turkey) + ERR News (EN Baltic) as
  // default-on; RO/BG/CS feeds stay locale-boosted (lang tags).
  europe: [
    "France 24",
    "EuroNews",
    "Le Monde",
    "DW News",
    "Tagesschau",
    "ANSA",
    "NOS Nieuws",
    "SVT Nyheter",
    "Balkan Insight",
    ...EASTERN_FLANK_EN_DEFAULT_SOURCES,
    ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
    // Periphery packs (#5953) — Caucasus, Belarus/Moldova
    ...CAUCASUS_EN_DEFAULT_SOURCES
  ],
  middleeast: ["BBC Middle East", "Al Jazeera", "Al Arabiya", "Guardian ME", "BBC Persian", "Iran International", "IRNA", "Mehr News", "Haaretz", "Jerusalem Post", "Ynetnews", "Asharq News", "The National", "Yemen Online", "Syria Direct", "+972 Magazine", "Naharnet Lebanon", "Libya Herald", "Egypt Independent"],
  africa: [
    "BBC Africa",
    "News24",
    "Africanews",
    "Jeune Afrique",
    "Africa News",
    "Premium Times",
    "Channels TV",
    "Sahel Crisis",
    ...AFRICA_DEPTH_EN_DEFAULT_SOURCES,
    "Daily Nation",
    "The Guardian Post"
  ],
  latam: ["BBC Latin America", "Reuters LatAm", "InSight Crime", "Mexico News Daily", "Clar\xEDn", "Primicias", "Infobae Americas", "El Universo", "HaitiLibre English", "Caracas Chronicles", "Havana Times"],
  asia: [
    "BBC Asia",
    "The Diplomat",
    "South China Morning Post",
    "Reuters Asia",
    "Reuters India",
    "Nikkei Asia",
    "CNA",
    "Asia News",
    "The Hindu",
    ...CENTRAL_ASIA_EN_DEFAULT_SOURCES,
    ...INDO_PACIFIC_EN_DEFAULT_SOURCES,
    "Amu TV",
    "The Daily Star"
  ],
  tech: ["Hacker News", "Ars Technica", "The Verge", "MIT Tech Review"],
  ai: ["AI News", "VentureBeat AI", "The Verge AI", "MIT Tech Review", "ArXiv AI"],
  finance: ["CNBC", "MarketWatch", "Yahoo Finance", "Financial Times", "Reuters Business"],
  gov: ["White House", "State Dept", "Pentagon", "UN News", "CISA", "Treasury", "DOJ", "CDC"],
  layoffs: ["Layoffs.fyi", "TechCrunch Layoffs", "Layoffs News"],
  thinktanks: ["Foreign Policy", "Atlantic Council", "Foreign Affairs", "CSIS", "RAND", "Brookings", "Carnegie", "War on the Rocks", "ISW"],
  crisis: ["CrisisWatch", "IAEA", "WHO", "UNHCR"],
  energy: ["Oil & Gas", "Nuclear Energy", "Reuters Energy", "Mining & Resources"]
};
var DEFAULT_ENABLED_INTEL = [
  "Defense One",
  "Breaking Defense",
  "The War Zone",
  "Defense News",
  "Military Times",
  "USNI News",
  "Bellingcat",
  "Krebs Security"
];
function getExplicitDefaultEnabledSources() {
  const s = /* @__PURE__ */ new Set();
  for (const names of Object.values(DEFAULT_ENABLED_SOURCES)) names.forEach((n) => s.add(n));
  DEFAULT_ENABLED_INTEL.forEach((n) => s.add(n));
  return s;
}
function getAllDefaultEnabledSources() {
  const s = getExplicitDefaultEnabledSources();
  for (const name of getStrategicDefaultSources()) s.add(name);
  return s;
}
function getLanguageMatchedSources(locale) {
  const lang = (locale.split("-")[0] ?? "en").toLowerCase();
  const boosted = /* @__PURE__ */ new Set();
  if (lang === "en") return boosted;
  const allFeeds = [...Object.values(FULL_FEEDS).flat(), ...INTEL_SOURCES];
  for (const f of allFeeds) {
    if (f.lang === lang) boosted.add(f.name);
    if (typeof f.url === "object" && lang in f.url) boosted.add(f.name);
  }
  return boosted;
}
var PRE_ROLLOUT_RECONCILIATION_DEFAULTS = [
  "Ukrainska Pravda EN",
  "NV EN",
  "NewsMaker"
];
function computePreStrategicDefaultDisabledSources(locale) {
  const enabled = getExplicitDefaultEnabledSources();
  for (const name of PRE_ROLLOUT_RECONCILIATION_DEFAULTS) enabled.add(name);
  if (locale) {
    for (const name of getLanguageMatchedSources(locale)) enabled.add(name);
  }
  const all = /* @__PURE__ */ new Set();
  for (const feeds of Object.values(FULL_FEEDS)) for (const feed of feeds) all.add(feed.name);
  for (const feed of INTEL_SOURCES) all.add(feed.name);
  return [...all].filter((name) => !enabled.has(name));
}
function computePreRegionalFeedRolloutDefaultDisabledSources(locale) {
  const introduced = new Set(
    REGIONAL_FEED_ROLLOUT_STAGES.flatMap((stage) => [...stage.introducedNames])
  );
  return computePreStrategicDefaultDisabledSources(locale).filter((name) => !introduced.has(name));
}
if (define_import_meta_env_default.DEV) {
  const allFeedNames = /* @__PURE__ */ new Set();
  for (const feeds of Object.values(FULL_FEEDS)) for (const f of feeds) allFeedNames.add(f.name);
  for (const f of INTEL_SOURCES) allFeedNames.add(f.name);
  const defaultEnabled = getAllDefaultEnabledSources();
  for (const name of defaultEnabled) {
    if (!allFeedNames.has(name)) console.error(`[feeds] DEFAULT_ENABLED name "${name}" not found in FULL_FEEDS!`);
  }
  console.log(`[feeds] ${defaultEnabled.size} unique default-enabled sources / ${allFeedNames.size} total`);
}

// src/services/source-cap.ts
function canonicalStringSet(values) {
  return JSON.stringify([...values].sort());
}
function filterFeedsToAvailable(feedsByCategory, intelSources, availableNames) {
  const feeds = {};
  for (const [category, entries] of Object.entries(feedsByCategory)) {
    if (!entries) {
      feeds[category] = entries;
      continue;
    }
    feeds[category] = entries.filter((entry) => availableNames.has(entry.name));
  }
  return {
    feeds,
    intel: intelSources.filter((entry) => availableNames.has(entry.name))
  };
}
function computeRolloutLegacyDisabledStates(feedsByCategory, intelSources, initialDisabled, cap, baselineProtectedNames, stages) {
  const allConfiguredNames = /* @__PURE__ */ new Set();
  for (const entries of Object.values(feedsByCategory)) {
    for (const entry of entries ?? []) allConfiguredNames.add(entry.name);
  }
  for (const entry of intelSources) allConfiguredNames.add(entry.name);
  const allIntroducedNames = /* @__PURE__ */ new Set();
  for (const stage of stages) {
    for (const name of stage.introducedNames) {
      if (allIntroducedNames.has(name)) {
        throw new Error(`Source "${name}" is introduced by more than one rollout stage`);
      }
      allIntroducedNames.add(name);
    }
  }
  const availableNames = new Set(
    [...allConfiguredNames].filter((name) => !allIntroducedNames.has(name))
  );
  const states = /* @__PURE__ */ new Map();
  const remember = (state) => {
    const copy = new Set(state);
    states.set(canonicalStringSet(copy), copy);
  };
  const applyCap = (state, protectedNames, catalog) => {
    const { autoDisabled } = selectSourcesUnderCap(
      catalog.feeds,
      catalog.intel,
      state,
      cap,
      protectedNames
    );
    return /* @__PURE__ */ new Set([...state, ...autoDisabled]);
  };
  remember(initialDisabled);
  const baselineCatalog = filterFeedsToAvailable(feedsByCategory, intelSources, availableNames);
  remember(applyCap(initialDisabled, baselineProtectedNames, baselineCatalog));
  for (const stage of stages) {
    for (const name of stage.introducedNames) availableNames.add(name);
    const catalog = filterFeedsToAvailable(feedsByCategory, intelSources, availableNames);
    const priorStates = [...states.values()];
    for (const state of priorStates) remember(applyCap(state, stage.protectedNames, catalog));
  }
  return [...states.values()];
}
function selectSourcesUnderCap(feedsByCategory, intelSources, userDisabled, cap, protectedNames = /* @__PURE__ */ new Set()) {
  if (cap < 0) {
    return { keep: /* @__PURE__ */ new Set(), autoDisabled: /* @__PURE__ */ new Set() };
  }
  const buckets = [];
  for (const [category, feeds] of Object.entries(feedsByCategory)) {
    if (!feeds) continue;
    const names = feeds.map((f) => f.name).filter((n) => !userDisabled.has(n));
    if (names.length > 0) buckets.push({ category, remaining: names });
  }
  const intelNames = intelSources.map((f) => f.name).filter((n) => !userDisabled.has(n));
  if (intelNames.length > 0) buckets.push({ category: "__intel__", remaining: intelNames });
  const keep = /* @__PURE__ */ new Set();
  if (protectedNames.size > 0) {
    const eligibleNames = /* @__PURE__ */ new Set();
    for (const bucket of buckets) {
      for (const name of bucket.remaining) eligibleNames.add(name);
    }
    for (const name of protectedNames) {
      if (keep.size >= cap) break;
      if (eligibleNames.has(name)) keep.add(name);
    }
  }
  let madeProgress = true;
  while (keep.size < cap && madeProgress) {
    madeProgress = false;
    for (const bucket of buckets) {
      if (keep.size >= cap) break;
      while (bucket.remaining.length > 0 && keep.has(bucket.remaining[0])) {
        bucket.remaining.shift();
      }
      if (bucket.remaining.length === 0) continue;
      keep.add(bucket.remaining.shift());
      madeProgress = true;
    }
  }
  const autoDisabled = /* @__PURE__ */ new Set();
  for (const bucket of buckets) {
    for (const name of bucket.remaining) {
      if (!keep.has(name)) autoDisabled.add(name);
    }
  }
  return { keep, autoDisabled };
}

// src/services/regional-feed-rollout.ts
var REGIONAL_FEED_ROLLOUT_NAMES = new Set(
  REGIONAL_FEED_ROLLOUT_STAGES.flatMap((stage) => [...stage.introducedNames])
);
var STRATEGIC_DEFAULT_SOURCES = getStrategicDefaultSources();
var PRE_STRATEGIC_FREE_CAP_PROTECTED_SOURCES = new Set(FREE_CAP_PROTECTED_SOURCES);
var INITIAL_FRONTLINE_DEFAULT_SOURCES = [
  "Kyiv Independent",
  "TVN24",
  "Rzeczpospolita",
  "Meduza",
  "Moscow Times"
];
var UKRAINE_DEPTH_ROLLOUT_DEFAULT_SOURCES = [
  "Ukrainska Pravda EN",
  "NV EN",
  "ISW"
];
var UKRAINE_DEPTH_ROLLOUT_OPT_IN_SOURCES = [
  "Ukrinform",
  "Suspilne",
  "Hromadske EN"
];
var UKRAINE_DEPTH_ROLLOUT_NAMES = /* @__PURE__ */ new Set([
  ...UKRAINE_DEPTH_ROLLOUT_DEFAULT_SOURCES,
  ...UKRAINE_DEPTH_ROLLOUT_OPT_IN_SOURCES
]);
var RECONCILED_ROLLOUT_NAMES = /* @__PURE__ */ new Set([
  ...INITIAL_FRONTLINE_DEFAULT_SOURCES,
  ...UKRAINE_DEPTH_ROLLOUT_NAMES,
  ...REGIONAL_FEED_ROLLOUT_NAMES
]);
function catalogLanguages() {
  const languages = /* @__PURE__ */ new Set(["en"]);
  for (const feed of [...Object.values(FEEDS).flat(), ...INTEL_SOURCES]) {
    if (feed.lang) languages.add(feed.lang.toLowerCase());
    if (typeof feed.url === "object") {
      for (const language of Object.keys(feed.url)) languages.add(language.toLowerCase());
    }
  }
  return [...languages].sort();
}
function legacyLocaleProtectedNames(locale) {
  const protectedNames = getLanguageMatchedSources(locale);
  protectedNames.delete("NewsMaker");
  return protectedNames;
}
function buildPreStrategicDefaultDisabledStates(cap, locale) {
  const locales = locale ? [(locale.split("-")[0] ?? "en").toLowerCase()] : catalogLanguages();
  const baseDisabled = computePreStrategicDefaultDisabledSources();
  const uniqueStates = /* @__PURE__ */ new Map();
  for (const language of locales) {
    const localeProtected = legacyLocaleProtectedNames(language);
    const defaultDisabled = new Set(baseDisabled);
    if (language === "ru") defaultDisabled.add("NewsMaker");
    for (const name of localeProtected) defaultDisabled.delete(name);
    const protectedNames = /* @__PURE__ */ new Set([
      ...PRE_STRATEGIC_FREE_CAP_PROTECTED_SOURCES,
      ...localeProtected
    ]);
    const { autoDisabled } = selectSourcesUnderCap(
      FEEDS,
      INTEL_SOURCES,
      defaultDisabled,
      cap,
      protectedNames
    );
    const capDisabled = /* @__PURE__ */ new Set([...defaultDisabled, ...autoDisabled]);
    uniqueStates.set(canonicalStringSet(defaultDisabled), defaultDisabled);
    uniqueStates.set(canonicalStringSet(capDisabled), capDisabled);
  }
  return [...uniqueStates.values()];
}
function buildRegionalFeedRolloutMigrationTargets(cap, locale) {
  const locales = locale ? [(locale.split("-")[0] ?? "en").toLowerCase()] : catalogLanguages();
  const targets = [];
  for (const language of locales) {
    const localeProtected = legacyLocaleProtectedNames(language);
    const localeDefaults = new Set(
      [...getLanguageMatchedSources(language)].filter((name) => RECONCILED_ROLLOUT_NAMES.has(name))
    );
    const defaultNames = /* @__PURE__ */ new Set([
      ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
      ...UKRAINE_DEPTH_ROLLOUT_DEFAULT_SOURCES,
      ...REGIONAL_FEED_ROLLOUT_DEFAULT_SOURCES,
      ...STRATEGIC_DEFAULT_SOURCES,
      ...localeDefaults
    ]);
    const optInNames = new Set(
      [...UKRAINE_DEPTH_ROLLOUT_OPT_IN_SOURCES, ...REGIONAL_FEED_ROLLOUT_OPT_IN_SOURCES].filter((name) => !defaultNames.has(name))
    );
    const postUkraineDefault = new Set(
      computePreRegionalFeedRolloutDefaultDisabledSources(language)
    );
    const postFrontlineDefault = new Set(postUkraineDefault);
    for (const name of UKRAINE_DEPTH_ROLLOUT_NAMES) postFrontlineDefault.delete(name);
    const preFrontlineDefault = new Set(postFrontlineDefault);
    for (const name of INITIAL_FRONTLINE_DEFAULT_SOURCES) {
      if (!localeProtected.has(name)) preFrontlineDefault.add(name);
    }
    const regionalStages = REGIONAL_FEED_ROLLOUT_STAGES.map((stage) => ({
      introducedNames: new Set(stage.introducedNames),
      protectedNames: /* @__PURE__ */ new Set([...stage.protectedNames, ...localeProtected])
    }));
    const postFrontlineStages = [
      {
        introducedNames: UKRAINE_DEPTH_ROLLOUT_NAMES,
        protectedNames: /* @__PURE__ */ new Set([
          ...FRONTLINE_EUROPE_PROTECTED_SOURCES,
          ...localeProtected
        ])
      },
      ...regionalStages
    ];
    const languageStates = [
      // Dormant schema-1/2 rows last written before #5949. This sequence is
      // intentionally rooted in a frozen pre-frontline fingerprint so later
      // catalog additions cannot strand it before schema 4.
      ...computeRolloutLegacyDisabledStates(
        FEEDS,
        INTEL_SOURCES,
        preFrontlineDefault,
        cap,
        localeProtected,
        postFrontlineStages
      ),
      // Profiles that consumed the frontline migration but predate the
      // Ukraine depth pack.
      ...computeRolloutLegacyDisabledStates(
        FEEDS,
        INTEL_SOURCES,
        postFrontlineDefault,
        cap,
        /* @__PURE__ */ new Set([...INITIAL_FRONTLINE_DEFAULT_SOURCES, ...localeProtected]),
        postFrontlineStages
      ),
      // Fresh profiles created after the Ukraine depth pack but before one or
      // more of the regional releases.
      ...computeRolloutLegacyDisabledStates(
        FEEDS,
        INTEL_SOURCES,
        postUkraineDefault,
        cap,
        /* @__PURE__ */ new Set([...FRONTLINE_EUROPE_PROTECTED_SOURCES, ...localeProtected]),
        regionalStages
      )
    ];
    const uniqueStates = /* @__PURE__ */ new Map();
    for (const legacyDisabled of languageStates) {
      uniqueStates.set(canonicalStringSet(legacyDisabled), legacyDisabled);
    }
    for (const legacyDisabled of uniqueStates.values()) {
      targets.push({ legacyDisabled, defaultNames, optInNames });
    }
  }
  return targets;
}
export {
  buildPreStrategicDefaultDisabledStates,
  buildRegionalFeedRolloutMigrationTargets
};
