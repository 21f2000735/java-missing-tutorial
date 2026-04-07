package com.learning.javamissing.sec20_data_structures_and_complexity.ch01_reasoning_about_time_and_space.topics.measuring_growth_with_big_o;

import java.util.List;

public class MeasuringGrowthWithBigO {
    public static void main(String[] args) {
        List<Integer> sortedRollNumbers = List.of(3, 7, 11, 15, 19, 24, 31, 42);

        int linearSteps = linearSearchSteps(sortedRollNumbers, 31);
        int binarySteps = binarySearchSteps(sortedRollNumbers, 31);

        // Expected output:
        // linearSteps = 7
        // binarySteps = 3
        System.out.println("linearSteps = " + linearSteps);
        System.out.println("binarySteps = " + binarySteps);
        System.out.println("After reading this example, you should know:");
        System.out.println("- Big-O is about growth, not one machine's clock");
        System.out.println("- linear search inspects items one by one");
        System.out.println("- binary search removes half the search space each step");
    }

    static int linearSearchSteps(List<Integer> values, int target) {
        int steps = 0;
        for (int value : values) {
            steps++;
            if (value == target) {
                return steps;
            }
        }
        return steps;
    }

    static int binarySearchSteps(List<Integer> values, int target) {
        int left = 0;
        int right = values.size() - 1;
        int steps = 0;
        while (left <= right) {
            steps++;
            int middle = (left + right) / 2;
            int middleValue = values.get(middle);
            if (middleValue == target) {
                return steps;
            }
            if (middleValue < target) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return steps;
    }
}
