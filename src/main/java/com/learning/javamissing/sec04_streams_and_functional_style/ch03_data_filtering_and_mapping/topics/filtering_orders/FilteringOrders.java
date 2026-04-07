package com.learning.javamissing.sec04_streams_and_functional_style.ch03_data_filtering_and_mapping.topics.filtering_orders;

import java.util.List;

/**
 * Concept: Filtering Orders
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * raw data often must be narrowed and reshaped.
 *
 * Real-world setup:
 * This topic uses order selection and report shaping to make the concept easier to understand.
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

public class FilteringOrders {
    public static void main(String[] args) {
        List<Order> orders = List.of(
                new Order("Book", true, 899),
                new Order("Mouse", false, 1_599),
                new Order("Keyboard", true, 2_499)
        );

        List<String> priorityItems = orders.stream()
                .filter(Order::priority)
                .map(Order::itemName)
                .toList();

        System.out.println("priorityItems = " + priorityItems);
        System.out.println("Concept: first filter the right data, then map it to the shape you need.");
    }

    record Order(String itemName, boolean priority, int priceInCents) {}
}
