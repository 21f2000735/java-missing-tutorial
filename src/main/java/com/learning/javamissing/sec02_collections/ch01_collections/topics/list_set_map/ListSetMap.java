package com.learning.javamissing.sec02_collections.ch01_collections.topics.list_set_map;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Concept: List Set Map
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

public class ListSetMap {
    public static void main(String[] args) {
        overview();
        wrongExample();
        // Expected output:
        // cartItems keeps duplicates, couponCodes stay unique, quantities support product lookup.
        List<String> cartItems = sampleCartItems();
        Set<String> couponCodes = sampleCouponCodes();
        Map<String, Integer> quantitiesBySku = sampleQuantitiesBySku();
        System.out.println("cartItems = " + cartItems);
        System.out.println("couponCodes = " + couponCodes);
        System.out.println("quantitiesBySku = " + quantitiesBySku);
        System.out.println("What to notice: List fits cart order, Set fits unique coupon codes, Map fits product lookup by SKU.");
        System.out.println("Common confusion: choose List when duplicates or order matter, Set when uniqueness matters, Map when lookup by key matters.");
        System.out.println("Senior note: collection choice affects API clarity, mutation rules, and algorithmic cost.");
    }

    private static void overview() {
        System.out.println("Topic: List, Set, Map");
        System.out.println("Real-world setup: an online store tracks cart items, coupon codes, and product quantities.");
        System.out.println("Why it matters: the right collection makes the code easier to read and prevents the wrong data shape.");
        System.out.println();
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Using a List for coupon codes can keep the same coupon more than once by mistake.");
        System.out.println();
    }

    static List<String> sampleCartItems() {
        return List.of("USB Cable", "USB Cable", "Wireless Mouse");
    }

    static Set<String> sampleCouponCodes() {
        return Set.of("WELCOME10", "FREESHIP");
    }

    static Map<String, Integer> sampleQuantitiesBySku() {
        return Map.of("SKU-USB", 2, "SKU-MOUSE", 1);
    }
}
