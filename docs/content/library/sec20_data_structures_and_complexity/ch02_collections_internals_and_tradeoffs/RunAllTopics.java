package com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs;

import com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.arraylist_growth_and_lookup.ArrayListGrowthAndLookup;
import com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.hashmap_buckets_and_collisions.HashMapBucketsAndCollisions;

public class RunAllTopics {
    public static void main(String[] args) {
        run("ArrayList Growth And Lookup", () -> ArrayListGrowthAndLookup.main(args));
        run("HashMap Buckets And Collisions", () -> HashMapBucketsAndCollisions.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
