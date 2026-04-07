package com.learning.javamissing.sec10_reflection_and_metadata.ch01_metadata_and_annotations.topics.marking_api_contracts;

/**
 * Concept: Marking Api Contracts
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * code often needs extra meaning for humans and tools.
 *
 * Real-world setup:
 * This topic uses API intent and tooling hints to make the concept easier to understand.
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

public class MarkingApiContracts {
    public static void main(String[] args) {
        PremiumDiscountService service = new PremiumDiscountService();
        System.out.println("discount = " + service.discountInCents());
        System.out.println("Concept: annotations can communicate intent to readers, compilers, and tools.");
    }

    interface DiscountService {
        int discountInCents();
    }

    static class PremiumDiscountService implements DiscountService {
        @Override
        public int discountInCents() {
            return 300;
        }
    }
}
