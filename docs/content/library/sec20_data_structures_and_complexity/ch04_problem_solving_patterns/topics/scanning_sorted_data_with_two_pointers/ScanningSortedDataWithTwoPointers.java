package com.learning.javamissing.sec20_data_structures_and_complexity.ch04_problem_solving_patterns.topics.scanning_sorted_data_with_two_pointers;

import java.util.List;

/**
 * Concept: Two-pointers pattern
 * Why this concept is needed:
 * Sorted data often lets you avoid nested loops if you scan from both sides intelligently.
 *
 * What problem this solves:
 * It finds pair relationships in sorted data with less repeated work.
 *
 * Real-world setup:
 * A pricing screen needs two sorted prices that match a target promotional budget.
 *
 * How to think about it:
 * One pointer starts low, one starts high, and the sum tells you which side to move.
 *
 * How to code it:
 * 1. Start with left and right ends of sorted data.
 * 2. Compare the current sum with the target.
 * 3. Move the pointer that helps the sum get closer.
 *
 * Expected output:
 * foundPair = 180 + 420
 */
public class ScanningSortedDataWithTwoPointers {
    public static void main(String[] args) {
        System.out.println("Concept: two pointers");
        System.out.println("Problem: nested loops are unnecessary when sorted data can be scanned from both ends.");
        System.out.println();

        List<Integer> sortedPrices = List.of(120, 180, 250, 300, 420, 500);

        // Expected output:
        // foundPair = 180 + 420
        System.out.println("foundPair = " + findPairSum(sortedPrices, 600));
        System.out.println("Why it works: the sorted order tells you whether to move left or right after each comparison.");
        System.out.println("Common mistake: using two pointers on unsorted data without sorting or proving the order.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- two pointers work well on sorted data");
        System.out.println("- one pointer moves left to right and the other right to left");
        System.out.println("- this removes the need for nested loops in many pair problems");
    }

    static String findPairSum(List<Integer> values, int target) {
        int left = 0;
        int right = values.size() - 1;
        while (left < right) {
            int sum = values.get(left) + values.get(right);
            if (sum == target) {
                return values.get(left) + " + " + values.get(right);
            }
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return "not found";
    }
}
