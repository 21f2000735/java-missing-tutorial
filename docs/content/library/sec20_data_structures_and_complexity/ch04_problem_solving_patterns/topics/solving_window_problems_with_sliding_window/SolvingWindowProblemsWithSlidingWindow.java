package com.learning.javamissing.sec20_data_structures_and_complexity.ch04_problem_solving_patterns.topics.solving_window_problems_with_sliding_window;

public class SolvingWindowProblemsWithSlidingWindow {
    public static void main(String[] args) {
        int[] hourlyOrders = {3, 5, 2, 6, 8, 1, 4};

        // Expected output:
        // bestThreeHourWindow = 16
        System.out.println("bestThreeHourWindow = " + maxWindowSum(hourlyOrders, 3));
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
