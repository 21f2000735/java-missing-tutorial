package com.learning.javamissing.sec20_data_structures_and_complexity.ch03_sorting_searching_and_binary_search.topics.using_binary_search_correctly;

import java.util.List;

/**
 * Concept: Binary search
 * Why this concept is needed:
 * It is one of the clearest examples of how sorted data changes search cost.
 *
 * What problem this solves:
 * It finds a value in sorted data faster than repeated full scans.
 *
 * Real-world setup:
 * A billing system repeatedly checks whether a sorted invoice ID exists.
 *
 * How to think about it:
 * Compare the target to the middle, then throw away half the remaining search space each step.
 *
 * How to code it:
 * 1. Keep left and right boundaries.
 * 2. Compare with the middle value.
 * 3. Shrink the search space toward the target.
 *
 * Expected output:
 * foundIndex = 3
 */
public class UsingBinarySearchCorrectly {
    public static void main(String[] args) {
        System.out.println("Concept: binary search");
        System.out.println("Problem: repeated lookups on sorted data should not scan every value.");
        System.out.println();

        List<Integer> sortedInvoiceIds = List.of(101, 105, 110, 118, 130, 144, 156);

        // Expected output:
        // foundIndex = 3
        System.out.println("foundIndex = " + binarySearch(sortedInvoiceIds, 118));
        System.out.println("Why it works: each comparison removes half of the remaining search space.");
        System.out.println("Common mistake: applying binary search to unsorted data.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- binary search only works on sorted data");
        System.out.println("- each step removes half the remaining search space");
        System.out.println("- the return value is an index, not the item itself");
    }

    static int binarySearch(List<Integer> values, int target) {
        int left = 0;
        int right = values.size() - 1;
        while (left <= right) {
            int middle = left + (right - left) / 2;
            int middleValue = values.get(middle);
            if (middleValue == target) {
                return middle;
            }
            if (middleValue < target) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return -1;
    }
}
