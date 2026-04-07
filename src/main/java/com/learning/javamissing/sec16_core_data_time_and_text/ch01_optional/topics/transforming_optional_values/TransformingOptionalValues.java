package com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.transforming_optional_values;

import java.util.Optional;

/**
 * Concept: Transform
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * some business values are optional and should be modeled explicitly.
 *
 * Real-world setup:
 * This topic uses user profile and missing form fields to make the concept easier to understand.
 *
 * How to think about it:
 * First understand the problem in plain language, then map that idea to the Java code.
 *
 * How to code it:
 * 1. Identify the business data or behavior.
 * 2. Choose the Java construct that expresses the idea clearly.
 * 3. Run the example and compare the output with the explanation.
 *
 * Expected output:
 * Read the inline comments and printed lines in main() to see the expected behavior.
 */

public class TransformingOptionalValues {
    public static void main(String[] args) {
        overview();
        wrongExample();
        // Expected output:
        // the display domain from customer@shopnow.com is shopnow.com
        Optional<String> email = Optional.of("customer@shopnow.com");
        String domain = extractDomain(email);
        System.out.println("domain = " + domain);
        System.out.println("Lesson: map transforms the present value without forcing manual null checks.");
        System.out.println("Common confusion: map changes the value inside Optional, it does not unwrap it permanently.");
        System.out.println("Real-world value: a profile page can show email domain details without fragile null checks.");
    }

    private static void overview() {
        System.out.println("Topic: Optional Transform");
        System.out.println("Real-world setup: a user profile page may or may not have an email address.");
        System.out.println("Why it matters: Optional lets us transform present data while staying safe when the value is missing.");
        System.out.println();
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Calling get() too early defeats the purpose of Optional and can fail if the value is absent.");
        System.out.println();
    }

    static String extractDomain(Optional<String> email) {
        return email
                .map(value -> value.substring(value.indexOf('@') + 1))
                .orElse("missing");
    }
}
