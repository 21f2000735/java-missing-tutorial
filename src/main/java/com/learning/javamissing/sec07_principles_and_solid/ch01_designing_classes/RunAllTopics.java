package com.learning.javamissing.sec07_principles_and_solid.ch01_designing_classes;

import com.learning.javamissing.sec07_principles_and_solid.ch01_designing_classes.topics.separating_responsibilities.SeparatingResponsibilities;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Separating Responsibilities", () -> SeparatingResponsibilities.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
