package com.learning.javamissing.sec18_architecture_and_integration.ch02_modular_design.topics.separating_system_boundaries;

/**
 * Concept: Separating System Boundaries
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * large codebases need explicit structure.
 *
 * Real-world setup:
 * This topic uses system boundaries and dependencies to make the concept easier to understand.
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

public class SeparatingSystemBoundaries {
    public static void main(String[] args) {
        System.out.println("billing exports InvoiceService");
        System.out.println("checkout depends on billing");
        System.out.println("Concept: modules describe which parts of a system should depend on each other.");
    }
}
