package com.learning.javamissing.sec20_data_structures_and_complexity.ch01_reasoning_about_time_and_space.topics.measuring_growth_with_big_o;

import java.util.List;

/**
 * Concept: Big-O reasoning
 * Why this concept is needed:
 * Timing alone does not explain how code behaves as the input keeps growing.
 *
 * What problem this solves:
 * It gives a language for comparing growth patterns like linear and logarithmic search.
 *
 * Real-world setup:
 * A student portal repeatedly searches sorted roll numbers.
 *
 * How to think about it:
 * Ask what work grows as the input grows, not only how fast one run felt.
 *
 * How to code it:
 * 1. Count steps for one simple linear approach.
 * 2. Count steps for a logarithmic approach.
 * 3. Compare the growth model, not just the final number.
 *
 * Expected output:
 * linearSteps = 7
 * binarySteps = 3
 */
public class MeasuringGrowthWithBigO {
    public static void main(String[] args) {
        System.out.println("Concept: Big-O");
        System.out.println("Problem: two search approaches may feel similar on small data but scale very differently.");
        System.out.println();

        List<Integer> sortedRollNumbers = List.of(3, 7, 11, 15, 19, 24, 31, 42);

        int linearSteps = linearSearchSteps(sortedRollNumbers, 31);
        int binarySteps = binarySearchSteps(sortedRollNumbers, 31);

        // Expected output:
        // linearSteps = 7
        // binarySteps = 3
        System.out.println("linearSteps = " + linearSteps);
        System.out.println("binarySteps = " + binarySteps);
        System.out.println("Why it works: linear search checks one by one, while binary search removes half the remaining space each step.");
        System.out.println("Common mistake: treating Big-O as exact runtime instead of a growth model.");
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
