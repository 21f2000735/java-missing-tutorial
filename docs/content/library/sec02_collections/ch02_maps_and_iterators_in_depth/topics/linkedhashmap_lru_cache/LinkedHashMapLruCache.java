package com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.linkedhashmap_lru_cache;

import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapLruCache {
    public static void main(String[] args) {
        LruCache cache = new LruCache(3);
        cache.put("home", "cached");
        cache.put("product", "cached");
        cache.put("cart", "cached");
        cache.get("home");
        cache.put("payment", "cached");

        System.out.println("Concept: access-order LinkedHashMap can act like a small LRU cache.");
        System.out.println("cache keys = " + cache.keySet());
        System.out.println("home = " + cache.get("home"));
        System.out.println("cart = " + cache.get("cart"));
        System.out.println("Why it matters: the least recently used entry is evicted automatically when size goes past the cap.");
    }

    static final class LruCache extends LinkedHashMap<String, String> {
        private final int maxEntries;

        LruCache(int maxEntries) {
            super(16, 0.75f, true);
            this.maxEntries = maxEntries;
        }

        @Override
        protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
            return size() > maxEntries;
        }
    }
}
