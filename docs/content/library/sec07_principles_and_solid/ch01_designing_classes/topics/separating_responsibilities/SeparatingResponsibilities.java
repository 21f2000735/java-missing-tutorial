package com.learning.javamissing.sec07_principles_and_solid.ch01_designing_classes.topics.separating_responsibilities;

/**
 * Concept: Separating Responsibilities
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * mixed responsibilities make code harder to change safely.
 *
 * Real-world setup:
 * This topic uses invoice and service responsibilities to make the concept easier to understand.
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

public class SeparatingResponsibilities {
    public static void main(String[] args) {
        InvoiceCalculator calculator = new InvoiceCalculator();
        int total = calculator.totalInCents(2, 1_500);
        System.out.println("invoiceTotal = " + total);
        System.out.println("Concept: one class should own one kind of decision clearly.");
    }

    static class InvoiceCalculator {
        int totalInCents(int quantity, int unitPriceInCents) {
            return quantity * unitPriceInCents;
        }
    }
}
