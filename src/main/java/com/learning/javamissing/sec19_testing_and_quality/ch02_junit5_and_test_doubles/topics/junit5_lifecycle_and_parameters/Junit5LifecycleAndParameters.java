package com.learning.javamissing.sec19_testing_and_quality.ch02_junit5_and_test_doubles.topics.junit5_lifecycle_and_parameters;

import java.util.List;

public class Junit5LifecycleAndParameters {
    public static void main(String[] args) {
        List<Integer> taxRates = List.of(5, 12, 18);
        System.out.println("Concept: one business rule can be checked with many inputs through a parameterized test style.");
        for (int taxRate : taxRates) {
            int total = 1_000 + (1_000 * taxRate / 100);
            System.out.println("rate=" + taxRate + " -> total=" + total);
        }
        System.out.println("Why it matters: JUnit 5 parameterized tests turn this repeating pattern into one clear test method fed by multiple values.");
    }
}
