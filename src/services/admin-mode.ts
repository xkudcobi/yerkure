/**
 * Yerküre yönetici modu.
 *
 * Kendi sunucusunda çalışan tek kullanıcılı kurulumda abonelik, Clerk ve Convex
 * yoktur; her şey "Pro" sayılır. Derleme zamanında `VITE_YERKURE_ADMIN=1`
 * verildiğinde:
 *   - isProUser() / isEntitled() / hasTier() true döner,
 *   - Pro afişi ve giriş/kayıt düğmeleri hiç kurulmaz,
 *   - premium isteklere `VITE_YERKURE_ADMIN_KEY` başlığı eklenir; sunucu tarafında
 *     aynı anahtar `WORLDMONITOR_VALID_KEYS` içinde listelenir (api/_api-key.js).
 *
 * `import.meta.env` yalnızca Vite altında tanımlıdır; test paketleyicileri (esbuild)
 * onu boş bırakır, o yüzden korumalı okunur.
 */
const env: Record<string, string | undefined> =
  (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string | undefined> }).env) || {};

export const ADMIN_MODE: boolean = env.VITE_YERKURE_ADMIN === '1';
export const ADMIN_API_KEY: string = (env.VITE_YERKURE_ADMIN_KEY ?? '').trim();
