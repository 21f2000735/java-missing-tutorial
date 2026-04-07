package com.learning.javamissing.sec07_principles_and_solid.ch02_immutability_and_value_objects.topics.protecting_invoice_data;

/**
 * Concept: Protecting Invoice Data
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * important business facts should remain stable after creation.
 *
 * Real-world setup:
 * This topic uses invoice and identity data to make the concept easier to understand.
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

public class ProtectingInvoiceData {
    public static void main(String[] args) {
        Invoice invoice = new Invoice("INV-101", 4_500);
        System.out.println("invoice = " + invoice);
        System.out.println("Concept: immutable value objects keep important business facts stable.");
    }

    record Invoice(String invoiceNumber, int totalInCents) {}
}
