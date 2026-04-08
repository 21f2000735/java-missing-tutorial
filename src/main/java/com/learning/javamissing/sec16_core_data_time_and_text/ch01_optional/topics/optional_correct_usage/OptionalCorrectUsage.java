package com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.optional_correct_usage;

import java.util.Optional;

public class OptionalCorrectUsage {
    public static void main(String[] args) {
        Optional<String> email = findCustomerEmail("cust-101");
        String message = email.map(value -> "email = " + value)
                .orElseGet(() -> "email = missing");

        int amount = findAmount("order-1").orElseThrow();

        System.out.println("Concept: Optional models a missing value without null checks.");
        System.out.println(message);
        System.out.println("amount = " + amount);
        System.out.println("Why it matters: Optional works well as a return type, but not as a field or method parameter.");
    }

    private static Optional<String> findCustomerEmail(String customerId) {
        return Optional.of("alice@example.com");
    }

    private static Optional<Integer> findAmount(String orderId) {
        return Optional.of(499);
    }
}
