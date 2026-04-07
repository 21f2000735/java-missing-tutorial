package com.learning.javamissing.sec02_collections.ch01_collections.topics.immutability;

import java.util.List;

/**
 * Concept: Immutability
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * teams must store repeated, unique, and keyed data correctly.
 *
 * Real-world setup:
 * This topic uses shopping cart, coupons, and product lookup to make the concept easier to understand.
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

public class Immutability {
    public static void main(String[] args) {
        wrongExample();
        // Expected output:
        // Java prints the list, then shows that modification is not allowed.
        List<String> fixedTopics = sampleTopics();
        System.out.println("fixedTopics = " + fixedTopics);
        try {
            fixedTopics.add("modules");
        } catch (UnsupportedOperationException exception) {
            System.out.println("cannot modify immutable list");
        }
        System.out.println("Lesson: immutable collections prevent accidental updates.");
        System.out.println("Senior note: immutability reduces defensive-copy pressure and makes shared-state bugs rarer.");
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Sharing one mutable list across many methods can create bugs when one method changes it unexpectedly.");
        System.out.println();
    }

    static List<String> sampleTopics() {
        return List.of("variables", "methods", "streams");
    }

    static boolean modificationBlocked() {
        try {
            sampleTopics().add("modules");
            return false;
        } catch (UnsupportedOperationException exception) {
            return true;
        }
    }
}
