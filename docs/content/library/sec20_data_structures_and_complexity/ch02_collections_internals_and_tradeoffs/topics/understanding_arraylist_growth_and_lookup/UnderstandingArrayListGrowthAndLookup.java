package com.learning.javamissing.sec20_data_structures_and_complexity.ch02_collections_internals_and_tradeoffs.topics.understanding_arraylist_growth_and_lookup;

import java.util.ArrayList;
import java.util.List;

public class UnderstandingArrayListGrowthAndLookup {
    public static void main(String[] args) {
        List<String> recentOrders = new ArrayList<>();
        int copiedDuringGrowth = appendWithEstimatedCopyWork(recentOrders, 12);

        // Expected output:
        // itemAtIndex4 = order-5
        // estimatedCopiesDuringGrowth = 10
        System.out.println("itemAtIndex4 = " + recentOrders.get(4));
        System.out.println("estimatedCopiesDuringGrowth = " + copiedDuringGrowth);
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
