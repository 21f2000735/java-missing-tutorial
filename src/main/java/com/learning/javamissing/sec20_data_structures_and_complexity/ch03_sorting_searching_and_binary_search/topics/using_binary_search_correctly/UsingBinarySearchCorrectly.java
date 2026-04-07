package com.learning.javamissing.sec20_data_structures_and_complexity.ch03_sorting_searching_and_binary_search.topics.using_binary_search_correctly;

import java.util.List;

public class UsingBinarySearchCorrectly {
    public static void main(String[] args) {
        List<Integer> sortedInvoiceIds = List.of(101, 105, 110, 118, 130, 144, 156);

        // Expected output:
        // foundIndex = 3
        System.out.println("foundIndex = " + binarySearch(sortedInvoiceIds, 118));
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
