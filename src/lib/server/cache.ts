/**
 * Simple in-memory cache with TTL support
 * Data refreshes once per day to avoid excessive API calls
 */

interface CacheEntry<T> {
	data: T;
	timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Get cached data if it exists and hasn't expired
 */
export function getCached<T>(key: string): T | null {
	const entry = cache.get(key);
	if (!entry) return null;

	// Check if cache has expired
	if (Date.now() - entry.timestamp > ONE_DAY_MS) {
		cache.delete(key);
		return null;
	}

	return entry.data as T;
}

/**
 * Store data in cache with current timestamp
 */
export function setCache<T>(key: string, data: T): void {
	cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Manually invalidate a cache entry
 */
export function invalidateCache(key: string): void {
	cache.delete(key);
}

/**
 * Clear entire cache
 */
export function clearCache(): void {
	cache.clear();
}

/**
 * Get cache age in milliseconds (for debugging)
 */
export function getCacheAge(key: string): number | null {
	const entry = cache.get(key);
	if (!entry) return null;
	return Date.now() - entry.timestamp;
}
