package com.learning.javamissing.sec04_streams_and_functional_style.ch03_data_filtering_and_mapping.topics.filtering_orders;

import java.util.List;

/**
 * Concept: Filtering Orders
 * Why this concept is needed:
 * Most real code does not need the raw input exactly as it arrives.
 *
 * What problem this solves:
 * It keeps only the needed records and reshapes them into a simpler answer.
 *
 * Real-world setup:
 * A dashboard only wants the names of priority orders.
 *
 * How to think about it:
 * First decide what stays, then decide what the result should look like.
 *
 * How to code it:
 * 1. Filter to keep matching rows.
 * 2. Map those rows to the field you need.
 * 3. Collect the final result.
 *
 * Expected output:
 * priorityItems = [Book, Keyboard]
 */

public class FilteringOrders {
    public static void main(String[] args) {
        System.out.println("The problem:");
        System.out.println("The dashboard does not need every order field. It only needs the names of priority orders.");
        System.out.println();
        List<Order> orders = List.of(
                new Order("Book", true, 899),
                new Order("Mouse", false, 1_599),
                new Order("Keyboard", true, 2_499)
        );

        List<String> priorityItems = orders.stream()
                .filter(Order::priority)
                .map(Order::itemName)
                .toList();

        System.out.println("Run this example:");
        System.out.println("priorityItems = " + priorityItems);
        System.out.println("Why it works: filter keeps only priority orders and map extracts only the item name.");
        System.out.println("Use this when: the final answer needs fewer rows and fewer fields than the raw input.");
        System.out.println("Avoid this when: the transformation is so stateful that a loop explains it better.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- filter answers what stays");
        System.out.println("- map answers what shape the result should take");
        System.out.println("- filtering and mapping together often model real business queries clearly");
    }

    record Order(String itemName, boolean priority, int priceInCents) {}
}
