/**
 * Vercel sets VERCEL_ENV to "production", "preview" or "development". Only a
 * production deployment may be indexed; local builds (no VERCEL_ENV) behave
 * like production so they can be checked before release.
 */
export const isPreview = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production";
