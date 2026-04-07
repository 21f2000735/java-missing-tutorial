package com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.understanding_arraylist_growth_and_lookup;

import java.util.ArrayList;
import java.util.List;

/**
 * Concept: ArrayList growth and lookup
 * Why this concept is needed:
 * ArrayList feels simple on the surface, but its backing-array behavior explains why some operations are cheap and some are not.
 *
 * What problem this solves:
 * It explains why indexed reads are fast and why occasional resize cost appears during append-heavy workloads.
 *
 * Real-world setup:
 * An order dashboard keeps appending recent orders and later reads them by index.
 *
 * How to think about it:
 * ArrayList is fast because data stays in a backing array, but growth sometimes copies old elements.
 *
 * How to code it:
 * 1. Append items while estimating resize-copy work.
 * 2. Read one item by index.
 * 3. Compare cheap common appends with occasional expensive growth.
 *
 * Expected output:
 * itemAtIndex4 = order-5
 * estimatedCopiesDuringGrowth = 10
 */
public class UnderstandingArrayListGrowthAndLookup {
    public static void main(String[] args) {
        System.out.println("Concept: ArrayList internals");
        System.out.println("Problem: appends look cheap, but hidden resize work still exists.");
        System.out.println();

        List<String> recentOrders = new ArrayList<>();
        int copiedDuringGrowth = appendWithEstimatedCopyWork(recentOrders, 12);

        // Expected output:
        // itemAtIndex4 = order-5
        // estimatedCopiesDuringGrowth = 10
        System.out.println("itemAtIndex4 = " + recentOrders.get(4));
        System.out.println("estimatedCopiesDuringGrowth = " + copiedDuringGrowth);
        System.out.println("Why it works: index access is direct, but resizing copies old elements into a larger array.");
        System.out.println("Common mistake: saying append is always free instead of amortized.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- index lookup is fast because ArrayList stores elements in a contiguous backing array");
        System.out.println("- growth is usually cheap but occasional resize copies old elements");
        System.out.println("- append is amortized O(1), not magically free");
    }

    static int appendWithEstimatedCopyWork(List<String> values, int itemCount) {
        int capacity = 0;
        int copiedElements = 0;
        for (int index = 0; index < itemCount; index++) {
            if (values.size() == capacity) {
                int oldCapacity = capacity;
                capacity = capacity == 0 ? 10 : capacity + (capacity >> 1);
                copiedElements += oldCapacity;
            }
            values.add("order-" + (index + 1));
        }
        return copiedElements;
    }
}
