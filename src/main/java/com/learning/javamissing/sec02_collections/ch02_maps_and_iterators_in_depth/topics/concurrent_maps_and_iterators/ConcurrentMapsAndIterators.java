package com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.concurrent_maps_and_iterators;

import java.util.ArrayList;
import java.util.Collections;
import java.util.ConcurrentModificationException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentMapsAndIterators {
    public static void main(String[] args) {
        explainFailFast();
        compareConcurrentMaps();
    }

    private static void explainFailFast() {
        List<String> cartItems = new ArrayList<>(List.of("book", "pen", "stapler"));
        System.out.println("Concept: fail-fast iterators detect structural changes during iteration.");
        try {
            for (String item : cartItems) {
                if (item.equals("pen")) {
                    cartItems.remove(item);
                }
            }
        } catch (ConcurrentModificationException exception) {
            System.out.println("fail-fast detected = " + exception.getClass().getSimpleName());
        }
        System.out.println();
    }

    private static void compareConcurrentMaps() {
        Map<String, Integer> synchronizedMap = Collections.synchronizedMap(new ConcurrentHashMap<>());
        Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();
        synchronizedMap.put("inventory", 10);
        concurrentMap.put("inventory", 10);

        // Expected output:
        // synchronizedMap class = SynchronizedMap
        // concurrentMap class = ConcurrentHashMap
        System.out.println("synchronizedMap class = " + synchronizedMap.getClass().getSimpleName());
        System.out.println("concurrentMap class = " + concurrentMap.getClass().getSimpleName());
        System.out.println("Why it matters: a synchronized wrapper serializes access around another map, while ConcurrentHashMap is designed for shared access as the real data structure.");
    }
}
