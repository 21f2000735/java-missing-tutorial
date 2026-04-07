package com.learning.javamissing.sec20_data_structures_and_complexity.ch04_problem_solving_patterns.topics.scanning_sorted_data_with_two_pointers;

import java.util.List;

public class ScanningSortedDataWithTwoPointers {
    public static void main(String[] args) {
        List<Integer> sortedPrices = List.of(120, 180, 250, 300, 420, 500);

        // Expected output:
        // foundPair = 180 + 420
        System.out.println("foundPair = " + findPairSum(sortedPrices, 600));
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
