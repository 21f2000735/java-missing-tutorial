package com.learning.javamissing.sec16_core_data_time_and_text.ch06_text_processing_and_regex.topics.validating_user_input;

/**
 * Concept: Validating User Input
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * text is data that needs checking and transformation.
 *
 * Real-world setup:
 * This topic uses user input and validation rules to make the concept easier to understand.
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

public class ValidatingUserInput {
    public static void main(String[] args) {
        String email = "learner@example.com";
        boolean validEmail = email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
        System.out.println("validEmail = " + validEmail);
        System.out.println("Concept: text processing is about rules, not just string storage.");
    }
}
