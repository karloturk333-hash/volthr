export const GRANT_DEADLINE = "2026-04-03"

export function isGrantActive(): boolean {
  return new Date() <= new Date(GRANT_DEADLINE + "T23:59:59")
}
