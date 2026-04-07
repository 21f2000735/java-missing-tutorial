package com.learning.javamissing.sec18_architecture_and_integration.ch04_writing_safe_java.topics.validating_checkout_input;

/**
 * Concept: Validating Checkout Input
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * unsafe assumptions become production bugs.
 *
 * Real-world setup:
 * This topic uses validated checkout and request input to make the concept easier to understand.
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

public class ValidatingCheckoutInput {
    public static void main(String[] args) {
        System.out.println("validQuantity(2) = " + validQuantity(2));
        System.out.println("validQuantity(0) = " + validQuantity(0));
        System.out.println("Concept: safe code checks assumptions before they become bugs.");
    }

    static boolean validQuantity(int quantity) {
        return quantity > 0;
    }
}
