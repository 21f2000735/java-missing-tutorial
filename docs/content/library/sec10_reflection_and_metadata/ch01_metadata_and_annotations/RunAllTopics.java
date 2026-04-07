package com.learning.javamissing.sec10_reflection_and_metadata.ch01_metadata_and_annotations;

import com.learning.javamissing.sec10_reflection_and_metadata.ch01_metadata_and_annotations.topics.marking_api_contracts.MarkingApiContracts;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Marking Api Contracts", () -> MarkingApiContracts.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
