package com.learning.javamissing.sec04_streams_and_functional_style.ch03_data_filtering_and_mapping;

import com.learning.javamissing.sec04_streams_and_functional_style.ch03_data_filtering_and_mapping.topics.filtering_orders.FilteringOrders;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Filtering Orders", () -> FilteringOrders.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
