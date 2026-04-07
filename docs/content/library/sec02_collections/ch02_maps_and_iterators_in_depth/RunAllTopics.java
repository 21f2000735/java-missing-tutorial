package com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth;

import com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.concurrent_maps_and_iterators.ConcurrentMapsAndIterators;
import com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.map_tradeoffs.MapTradeoffs;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Map Tradeoffs", () -> MapTradeoffs.main(args));
        run("Concurrent Maps And Iterators", () -> ConcurrentMapsAndIterators.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
