package com.learning.javamissing.sec02_collections.ch01_collections;

import com.learning.javamissing.sec02_collections.ch01_collections.topics.comparator.Comparator;
import com.learning.javamissing.sec02_collections.ch01_collections.topics.immutability.Immutability;
import com.learning.javamissing.sec02_collections.ch01_collections.topics.list_set_map.ListSetMap;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Comparator", () -> Comparator.main(args));
        run("Immutability", () -> Immutability.main(args));
        run("List Set Map", () -> ListSetMap.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
