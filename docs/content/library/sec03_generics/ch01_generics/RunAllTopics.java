package com.learning.javamissing.sec03_generics.ch01_generics;

import com.learning.javamissing.sec03_generics.ch01_generics.topics.bounds.Bounds;
import com.learning.javamissing.sec03_generics.ch01_generics.topics.generic_type.GenericType;
import com.learning.javamissing.sec03_generics.ch01_generics.topics.wildcards.Wildcards;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Bounds", () -> Bounds.main(args));
        run("Generic Type", () -> GenericType.main(args));
        run("Wildcards", () -> Wildcards.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
