package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch01_pattern_matching.topics.checking_shape_with_instanceof;

public class CheckingShapeWithInstanceof {
    public static void main(String[] args) {
        explainWhy();
        runSupportTicketExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- pattern matching combines the type check and typed variable");
        System.out.println("- this reduces manual casting noise");
        System.out.println("- the main gain is clearer branching on data shape");
    }

    private static void explainWhy() {
        System.out.println("Concept: check type and use the typed value immediately");
        System.out.println("Real-world problem: a support system receives mixed event payloads.");
        System.out.println("Mental model: once the shape matches, Java gives you a typed variable to work with.");
        System.out.println();
    }

    private static void runSupportTicketExample() {
        Object payload = "payment delayed";
        if (payload instanceof String text) {
            // Expected output:
            // upper = PAYMENT DELAYED
            // length = 15
            System.out.println("upper = " + text.toUpperCase());
            System.out.println("length = " + text.length());
            System.out.println("Why it works: the pattern both checks String and exposes text as a String.");
        }
    }
}
