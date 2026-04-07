package com.learning.javamissing.sec16_core_data_time_and_text.ch03_missing_values_and_optional.topics.representing_absence;

import java.util.Optional;

/**
 * Concept: Representing Absence
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * absence changes behavior and should be explicit.
 *
 * Real-world setup:
 * This topic uses optional promo and profile data to make the concept easier to understand.
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

public class RepresentingAbsence {
    public static void main(String[] args) {
        Optional<String> promoCode = Optional.ofNullable(null);
        System.out.println("promoCode = " + promoCode);
        System.out.println("display = " + promoCode.orElse("No promo code"));
        System.out.println("Concept: absence should be explicit when it changes business behavior.");
    }
}
