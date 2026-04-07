package com.learning.javamissing.sec18_architecture_and_integration.ch02_modular_design;

import com.learning.javamissing.sec18_architecture_and_integration.ch02_modular_design.topics.separating_system_boundaries.SeparatingSystemBoundaries;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Separating System Boundaries", () -> SeparatingSystemBoundaries.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
