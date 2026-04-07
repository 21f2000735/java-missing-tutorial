package com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.choosing_optional_boundaries;

import java.util.Optional;

/**
 * Concept: Best Practices
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

public class ChoosingOptionalBoundaries {
    public static void main(String[] args) {
        wrongExample();
        // Expected output:
        // nickname is present for Asha, and the mapped display name becomes uppercase.
        Optional<String> nickname = findNickname("Asha");
        System.out.println("nickname = " + displayNickname("Asha"));
        System.out.println("display name = " + displayName("Asha"));
        System.out.println("Lesson: use Optional at API boundaries where absence is expected and meaningful.");
        System.out.println("Senior note: Optional improves API contracts, but stuffing it into every field usually hurts ergonomics more than it helps.");
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Using Optional for every field in every model object usually adds noise instead of clarity.");
        System.out.println();
    }

    static Optional<String> findNickname(String learner) {
        return learner.startsWith("A") ? Optional.of("Ace") : Optional.empty();
    }

    static String displayNickname(String learner) {
        return findNickname(learner).orElse("not provided");
    }

    static String displayName(String learner) {
        return findNickname(learner).map(String::toUpperCase).orElse("GUEST");
    }
}
