package com.learning.javamissing.sec06_design_patterns.ch03_structural_patterns;

import com.learning.javamissing.sec06_design_patterns.ch03_structural_patterns.topics.adding_features_with_decorator.AddingFeaturesWithDecorator;
import com.learning.javamissing.sec06_design_patterns.ch03_structural_patterns.topics.translating_incompatible_apis_with_adapter.TranslatingIncompatibleApisWithAdapter;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Translating Incompatible APIs With Adapter", () -> TranslatingIncompatibleApisWithAdapter.main(args));
        run("Adding Features With Decorator", () -> AddingFeaturesWithDecorator.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
