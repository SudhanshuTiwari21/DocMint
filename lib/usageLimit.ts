const STORAGE_PREFIX = "docmint_usage_";

function getStorageKey(toolId: string): string {
  return `${STORAGE_PREFIX}${toolId}`;
}

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export type DailyUsageState = {
  allowed: boolean;
  count: number;
  limit: number;
};

/**
 * Reads daily usage from localStorage, resets count if the date has changed,
 * and optionally records a new use (increment).
 * Use increment: true only after a successful tool use.
 * Reusable across tools—pass a unique toolId and the daily limit.
 */
export function checkAndUpdateDailyUsage(
  toolId: string,
  limit: number,
  increment = false
): DailyUsageState {
  if (typeof window === "undefined") {
    return { allowed: true, count: 0, limit };
  }

  const key = getStorageKey(toolId);
  const today = getTodayDateString();

  let data: { count: number; date: string };
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as { count?: number; date?: string }) : null;
    if (!parsed || parsed.date !== today) {
      data = { count: 0, date: today };
    } else {
      data = { count: Math.max(0, Number(parsed.count) || 0), date: today };
    }
  } catch {
    data = { count: 0, date: today };
  }

  if (increment) {
    data.count += 1;
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // quota or disabled; continue with in-memory state
    }
  }

  const allowed = data.count < limit;
  return { allowed, count: data.count, limit };
}
