package com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth;

import com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.fail_fast_vs_fail_safe_iterators.FailFastVsFailSafeIterators;
import com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.hashmap_internals.HashMapInternals;
import com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.linkedhashmap_lru_cache.LinkedHashMapLruCache;
import com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.concurrent_maps_and_iterators.ConcurrentMapsAndIterators;
import com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.map_tradeoffs.MapTradeoffs;
import com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.priority_queue_heap_internals.PriorityQueueHeapInternals;

public class RunAllTopics {
    public static void main(String[] args) {
        run("HashMap Internals", () -> HashMapInternals.main(args));
        run("LinkedHashMap LRU Cache", () -> LinkedHashMapLruCache.main(args));
        run("Fail Fast Vs Fail Safe Iterators", () -> FailFastVsFailSafeIterators.main(args));
        run("Priority Queue Heap Internals", () -> PriorityQueueHeapInternals.main(args));
        run("Map Tradeoffs", () -> MapTradeoffs.main(args));
        run("Concurrent Maps And Iterators", () -> ConcurrentMapsAndIterators.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
