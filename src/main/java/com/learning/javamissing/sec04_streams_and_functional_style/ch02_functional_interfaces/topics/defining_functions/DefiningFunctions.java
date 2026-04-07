package com.learning.javamissing.sec04_streams_and_functional_style.ch02_functional_interfaces.topics.defining_functions;

/**
 * Concept: Defining Functions
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * some behavior should be passed around as data.
 *
 * Real-world setup:
 * This topic uses pricing and callback rules to make the concept easier to understand.
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

public class DefiningFunctions {
    public static void main(String[] args) {
        PriceRule festiveDiscount = price -> price - 200;
        PriceRule studentDiscount = price -> price - 150;
        System.out.println("festive price = " + festiveDiscount.apply(1_200));
        System.out.println("student price = " + studentDiscount.apply(1_200));
        System.out.println("Concept: one action shape can support many business rules.");
    }

    @FunctionalInterface
    interface PriceRule {
        int apply(int price);
    }
}
