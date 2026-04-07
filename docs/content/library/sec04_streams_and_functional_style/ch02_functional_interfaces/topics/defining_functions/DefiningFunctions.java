package com.learning.javamissing.sec04_streams_and_functional_style.ch02_functional_interfaces.topics.defining_functions;

/**
 * Concept: Defining Functions
 * Why this concept is needed:
 * Some rules should be supplied from outside the workflow instead of being hard-coded inside it.
 *
 * What problem this solves:
 * It lets Java code pass a business rule as data.
 *
 * Real-world setup:
 * Checkout may apply different pricing rules without rewriting the checkout flow.
 *
 * How to think about it:
 * A functional interface is one behavior shape that many rules can satisfy.
 *
 * How to code it:
 * 1. Define one abstract method.
 * 2. Provide different lambdas that match that method.
 * 3. Pass those lambdas where the workflow needs a varying rule.
 *
 * Expected output:
 * festive price = 1000
 * student price = 1050
 */

public class DefiningFunctions {
    public static void main(String[] args) {
        System.out.println("The problem:");
        System.out.println("The checkout flow stays the same, but the discount rule changes.");
        System.out.println();
        PriceRule festiveDiscount = price -> price - 200;
        PriceRule studentDiscount = price -> price - 150;
        System.out.println("Run this example:");
        System.out.println("festive price = " + festiveDiscount.apply(1_200));
        System.out.println("student price = " + studentDiscount.apply(1_200));
        System.out.println("Why it works: both lambdas satisfy the same PriceRule contract.");
        System.out.println("Use this when: one workflow should accept different rules.");
        System.out.println("Avoid this when: one simple method call is clearer than introducing a new function type.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- a functional interface represents one behavior shape");
        System.out.println("- different lambdas can supply different business rules");
        System.out.println("- this idea is the base for many stream operations");
    }

    @FunctionalInterface
    interface PriceRule {
        int apply(int price);
    }
}
