package com.learning.javamissing.sec14_famous_design_problems.ch01_cache_design_basics.topics.building_a_simple_lru_cache;

import java.util.LinkedHashMap;
import java.util.Map;

public class BuildingASimpleLruCache {
    public static void main(String[] args) {
        System.out.println("Concept: keep the most recently used entries and evict older ones");
        System.out.println("Real-world problem: a product service repeatedly looks up hot product details.");
        System.out.println();

        Map<String, String> cache = new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
                return size() > 2;
            }
        };

        cache.put("P1", "Laptop");
        cache.put("P2", "Mouse");
        cache.get("P1");
        cache.put("P3", "Keyboard");

        // Expected output:
        // keys = [P1, P3]
        System.out.println("keys = " + cache.keySet());
        System.out.println("Why it works: access-order LinkedHashMap can remove the least recently used entry.");
    }
}
