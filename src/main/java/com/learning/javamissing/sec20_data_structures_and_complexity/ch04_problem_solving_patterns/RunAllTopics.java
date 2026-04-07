package com.learning.javamissing.sec20_data_structures_and_complexity.ch04_problem_solving_patterns;

import com.learning.javamissing.sec20_data_structures_and_complexity.ch04_problem_solving_patterns.topics.scanning_sorted_data_with_two_pointers.ScanningSortedDataWithTwoPointers;
import com.learning.javamissing.sec20_data_structures_and_complexity.ch04_problem_solving_patterns.topics.solving_window_problems_with_sliding_window.SolvingWindowProblemsWithSlidingWindow;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Solving Window Problems With Sliding Window", () -> SolvingWindowProblemsWithSlidingWindow.main(args));
        run("Scanning Sorted Data With Two Pointers", () -> ScanningSortedDataWithTwoPointers.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
