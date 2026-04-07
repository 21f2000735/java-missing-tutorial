package com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs;

import com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.understanding_arraylist_growth_and_lookup.UnderstandingArrayListGrowthAndLookup;
import com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.understanding_hashmap_buckets_and_collisions.UnderstandingHashMapBucketsAndCollisions;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Understanding ArrayList Growth And Lookup", () -> UnderstandingArrayListGrowthAndLookup.main(args));
        run("Understanding HashMap Buckets And Collisions", () -> UnderstandingHashMapBucketsAndCollisions.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
