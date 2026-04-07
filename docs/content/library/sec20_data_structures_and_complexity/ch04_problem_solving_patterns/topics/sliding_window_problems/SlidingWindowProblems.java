package com.learning.javamissing.sec20_data_structures_and_complexity.ch04_problem_solving_patterns.topics.sliding_window_problems;

/**
 * Concept: Sliding window pattern
 * Why this concept is needed:
 * Many range problems recalculate overlapping work from scratch even though most of the window stays the same.
 *
 * What problem this solves:
 * It reuses the previous window's work so repeated range calculations become linear instead of nested.
 *
 * Real-world setup:
 * An analytics dashboard wants the best three-hour sales window.
 *
 * How to think about it:
 * Keep one moving window, add the incoming value, and remove the outgoing value.
 *
 * How to code it:
 * 1. Calculate the first window once.
 * 2. Slide the window one step at a time.
 * 3. Update the best result incrementally.
 *
 * Expected output:
 * bestThreeHourWindow = 16
 */
public class SlidingWindowProblems {
    public static void main(String[] args) {
        System.out.println("Concept: sliding window");
        System.out.println("Problem: recalculating every overlapping range from scratch wastes work.");
        System.out.println();

        int[] hourlyOrders = {3, 5, 2, 6, 8, 1, 4};

        // Expected output:
        // bestThreeHourWindow = 16
        System.out.println("bestThreeHourWindow = " + maxWindowSum(hourlyOrders, 3));
        System.out.println("Why it works: each step reuses the previous window by adding one value and removing one value.");
        System.out.println("Common mistake: using sliding window when the problem does not actually involve overlapping ranges.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- sliding window reuses work from the previous range");
        System.out.println("- you add the incoming value and remove the outgoing value");
        System.out.println("- this turns many O(n*k) loops into O(n)");
    }

    static int maxWindowSum(int[] values, int windowSize) {
        int windowSum = 0;
        for (int index = 0; index < windowSize; index++) {
            windowSum += values[index];
        }

        int best = windowSum;
        for (int right = windowSize; right < values.length; right++) {
            windowSum += values[right];
            windowSum -= values[right - windowSize];
            best = Math.max(best, windowSum);
        }
        return best;
    }
}
