package com.learning.javamissing.sec02_collections.ch01_collections.topics.comparator;

import java.util.ArrayList;
import java.util.List;

/**
 * Concept: Comparator
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

public class Comparator {
    public static void main(String[] args) {
        wrongExample();
        // Expected output:
        // products should be sorted by price first, then by name if prices match.
        List<Product> products = new ArrayList<>(List.of(
                new Product("Mouse", 1599),
                new Product("Keyboard", 2499),
                new Product("Notebook", 199)
        ));
        sortProductsByPriceThenName(products);
        System.out.println("sorted products = " + products);
        System.out.println("Lesson: a comparator defines ordering without changing the object itself.");
        System.out.println("Senior note: explicit comparators localize ordering rules instead of leaking hidden sorting assumptions across the codebase.");
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Sorting only by one fixed rule inside the class makes it harder to sort the same object in different ways later.");
        System.out.println();
    }

    static void sortProductsByPriceThenName(List<Product> products) {
        products.sort(java.util.Comparator.comparingInt(Product::priceInCents).thenComparing(Product::name));
    }

    record Product(String name, int priceInCents) {}
}
