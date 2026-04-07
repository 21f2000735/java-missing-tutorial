package com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.representing_optional_values;

import java.util.Optional;

/**
 * Concept: Creation
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

public class RepresentingOptionalValues {
    public static void main(String[] args) {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Optional.of(null) throws NullPointerException immediately.");
        System.out.println();
    }

    private static void printOverview() {
        System.out.println("Topic: Optional Creation");
        System.out.println("Chapter: Optional");
        System.out.println("Why it matters: Optional makes absence explicit instead of hiding it in null checks.");
        System.out.println();
    }

    private static void basicExample() {
        // Expected output:
        // couponCode is present and referralCode is empty
        Optional<String> couponCode = Optional.of("WELCOME10");
        Optional<String> referralCode = Optional.empty();

        System.out.println("Basic example:");
        System.out.println("couponCode = " + couponCode);
        System.out.println("referralCode = " + referralCode);
        System.out.println("Lesson: use of() for guaranteed non-null values and empty() when the value is absent.");
        System.out.println();
    }

    private static void betterExample() {
        // Expected output:
        // email is empty and fallbackEmail prints support@example.com
        String emailFromForm = null;
        Optional<String> email = optionalFromNullable(emailFromForm);

        System.out.println("Better example:");
        System.out.println("email = " + email);
        System.out.println("fallbackEmail = " + displayOrDefault(email, "support@example.com"));
        System.out.println("Lesson: ofNullable() is the safe choice when the input may be null.");
        System.out.println("Senior note: use Optional at boundaries where absence matters, not as a blanket replacement for all references.");
        System.out.println();
    }

    private static void commonPitfalls() {
        System.out.println("Common mistakes:");
        System.out.println("- calling Optional.of(value) when value may be null");
        System.out.println("- using Optional for every field in a data class");
        System.out.println("- using get() without proving a value is present");
        System.out.println("- treating Optional as a replacement for all null checks everywhere");
        System.out.println();
    }

    private static void examTrap() {
        System.out.println("OCJP trap:");
        System.out.println("Optional.of(null) throws NullPointerException immediately.");
        System.out.println("Optional.ofNullable(null) returns Optional.empty().");
        System.out.println();
    }

    private static void interviewQuestion() {
        System.out.println("Interview Q&A:");
        System.out.println("Q: When should you return Optional from a method?");
        System.out.println("A: Return Optional when the result may be absent and forcing the caller to handle that absence improves clarity.");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("Create an Optional from a middle name that may be null.");
        System.out.println("Then return 'N/A' when the value is missing.");
        System.out.println();
    }

    private static void solution() {
        String middleName = null;
        Optional<String> optionalMiddleName = optionalFromNullable(middleName);

        System.out.println("Solution:");
        System.out.println("optionalMiddleName = " + optionalMiddleName);
        System.out.println("display = " + displayOrDefault(optionalMiddleName, "N/A"));
        System.out.println("Why this is better: the missing-value path is explicit and easy to follow.");
    }

    static Optional<String> optionalFromNullable(String value) {
        return Optional.ofNullable(value);
    }

    static String displayOrDefault(Optional<String> value, String fallback) {
        return value.orElse(fallback);
    }
}
