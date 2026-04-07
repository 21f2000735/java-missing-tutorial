package com.learning.javamissing.sec18_architecture_and_integration.ch04_writing_safe_java;

import com.learning.javamissing.sec18_architecture_and_integration.ch04_writing_safe_java.topics.validating_checkout_input.ValidatingCheckoutInput;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Validating Checkout Input", () -> ValidatingCheckoutInput.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
