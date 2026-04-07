package com.learning.javamissing.sec21_company_interview_tracks.ch03_netflix_makemytrip_hoteltrader.topics.hotel_search_cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Concept: hotel search cache
 * Why this concept is needed:
 * Travel search is read-heavy, but stale prices and stale availability can hurt trust.
 *
 * What problem this solves:
 * It caches expensive search responses while keeping a short freshness window.
 *
 * Real-world setup:
 * A hotel search page repeatedly asks for the same city and dates.
 *
 * How to think about it:
 * Cache the hot read, but separate stable search shape from freshness policy.
 *
 * How to code it:
 * 1. Build a cache key from search input.
 * 2. Return cached results when still fresh.
 * 3. Refresh after the freshness window expires.
 *
 * Expected output:
 * cacheHit = true
 * hotels = [Sea View, Central Stay]
 */
public class HotelSearchCache {
    public static void main(String[] args) {
        SearchCache cache = new SearchCache(60);
        List<String> hotels = cache.search("goa|2026-05-10|2026-05-12");
        boolean cacheHit = cache.search("goa|2026-05-10|2026-05-12").equals(hotels);

        // Expected output:
        // cacheHit = true
        // hotels = [Sea View, Central Stay]
        System.out.println("cacheHit = " + cacheHit);
        System.out.println("hotels = " + hotels);
        System.out.println("Company lens: MakeMyTrip answers should mention cache hit rate and stale-result risk together.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- cache keys should reflect the search shape");
        System.out.println("- short freshness windows are often safer for travel data");
        System.out.println("- latency improvement is not enough if correctness degrades");
    }

    static final class SearchCache {
        private final Map<String, CacheEntry> entries = new HashMap<>();
        private final long freshnessSeconds;

        SearchCache(long freshnessSeconds) {
            this.freshnessSeconds = freshnessSeconds;
        }

        List<String> search(String key) {
            CacheEntry current = entries.get(key);
            if (current != null && current.ageSeconds < freshnessSeconds) {
                return current.hotels;
            }
            CacheEntry refreshed = new CacheEntry(List.of("Sea View", "Central Stay"), 0);
            entries.put(key, refreshed);
            return refreshed.hotels;
        }
    }

    record CacheEntry(List<String> hotels, long ageSeconds) {}
}
