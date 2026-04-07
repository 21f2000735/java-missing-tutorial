package com.learning.javamissing.sec11_exception_handling.ch01_handling_errors;

import com.learning.javamissing.sec11_exception_handling.ch01_handling_errors.topics.handling_payment_failures.HandlingPaymentFailures;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Handling Payment Failures", () -> HandlingPaymentFailures.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
