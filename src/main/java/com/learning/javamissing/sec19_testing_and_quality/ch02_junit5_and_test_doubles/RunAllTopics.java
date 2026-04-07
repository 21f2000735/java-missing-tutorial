package com.learning.javamissing.sec19_testing_and_quality.ch02_junit5_and_test_doubles;

import com.learning.javamissing.sec19_testing_and_quality.ch02_junit5_and_test_doubles.topics.junit5_lifecycle_and_parameters.Junit5LifecycleAndParameters;
import com.learning.javamissing.sec19_testing_and_quality.ch02_junit5_and_test_doubles.topics.test_doubles_and_verification.TestDoublesAndVerification;

public class RunAllTopics {
    public static void main(String[] args) {
        run("JUnit 5 Lifecycle And Parameters", () -> Junit5LifecycleAndParameters.main(args));
        run("Test Doubles And Verification", () -> TestDoublesAndVerification.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
