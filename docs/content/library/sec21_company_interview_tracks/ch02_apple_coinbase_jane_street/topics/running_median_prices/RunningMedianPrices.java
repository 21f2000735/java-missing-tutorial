package com.learning.javamissing.sec21_company_interview_tracks.ch02_apple_coinbase_jane_street.topics.running_median_prices;

import java.util.Collections;
import java.util.PriorityQueue;

/**
 * Concept: running median prices
 * Why this concept is needed:
 * Some interviewers want to see whether you can keep an invariant while data keeps arriving.
 *
 * What problem this solves:
 * It maintains the median of a growing price stream.
 *
 * Real-world setup:
 * A trading dashboard wants the median of recent execution prices.
 *
 * How to think about it:
 * Keep the lower half in a max heap and the upper half in a min heap, then rebalance.
 *
 * How to code it:
 * 1. Insert into the correct heap.
 * 2. Rebalance sizes.
 * 3. Read the median from heap tops.
 *
 * Expected output:
 * median = 101.0
 */
public class RunningMedianPrices {
    public static void main(String[] args) {
        RunningMedian median = new RunningMedian();
        median.add(100);
        median.add(103);
        median.add(101);

        // Expected output:
        // median = 101.0
        System.out.println("median = " + median.median());
        System.out.println("Why it works: two heaps keep lower and upper halves balanced.");
        System.out.println("Company lens: Jane Street answers should explain invariants out loud.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- the lower heap stores the lower half");
        System.out.println("- the upper heap stores the upper half");
        System.out.println("- balanced heaps make median lookup cheap");
    }

    static final class RunningMedian {
        private final PriorityQueue<Integer> lower = new PriorityQueue<>(Collections.reverseOrder());
        private final PriorityQueue<Integer> upper = new PriorityQueue<>();

        void add(int value) {
            if (lower.isEmpty() || value <= lower.peek()) {
                lower.add(value);
            } else {
                upper.add(value);
            }
            rebalance();
        }

        double median() {
            if (lower.size() == upper.size()) {
                return (lower.peek() + upper.peek()) / 2.0;
            }
            return lower.peek();
        }

        private void rebalance() {
            if (lower.size() < upper.size()) {
                lower.add(upper.remove());
            } else if (lower.size() - upper.size() > 1) {
                upper.add(lower.remove());
            }
        }
    }
}
