package com.learning.javamissing.sec11_exception_handling.ch01_handling_errors.topics.handling_payment_failures;

/**
 * Concept: Handling Payment Failures
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * failures are part of the business flow and must stay understandable.
 *
 * Real-world setup:
 * This topic uses payment and gateway failures to make the concept easier to understand.
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

public class HandlingPaymentFailures {
    public static void main(String[] args) {
        try {
            chargeCard(false);
        } catch (IllegalStateException exception) {
            System.out.println("paymentStatus = failed");
            System.out.println("reason = " + exception.getMessage());
        }
        System.out.println("Concept: errors should preserve meaning for both developers and users.");
    }

    static void chargeCard(boolean gatewayAvailable) {
        if (!gatewayAvailable) {
            throw new IllegalStateException("Payment gateway is unavailable");
        }
    }
}
