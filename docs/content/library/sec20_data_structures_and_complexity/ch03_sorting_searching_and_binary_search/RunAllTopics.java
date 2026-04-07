package com.learning.javamissing.sec20_data_structures_and_complexity.ch03_sorting_searching_and_binary_search;

import com.learning.javamissing.sec20_data_structures_and_complexity.ch03_sorting_searching_and_binary_search.topics.sorting_tradeoffs.SortingTradeoffs;
import com.learning.javamissing.sec20_data_structures_and_complexity.ch03_sorting_searching_and_binary_search.topics.using_binary_search_correctly.UsingBinarySearchCorrectly;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Using Binary Search Correctly", () -> UsingBinarySearchCorrectly.main(args));
        run("Sorting Tradeoffs", () -> SortingTradeoffs.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
