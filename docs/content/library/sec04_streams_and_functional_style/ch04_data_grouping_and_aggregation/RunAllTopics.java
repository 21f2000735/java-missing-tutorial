package com.learning.javamissing.sec04_streams_and_functional_style.ch04_data_grouping_and_aggregation;

import com.learning.javamissing.sec04_streams_and_functional_style.ch04_data_grouping_and_aggregation.topics.grouping_sales.GroupingSales;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Grouping Sales", () -> GroupingSales.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
