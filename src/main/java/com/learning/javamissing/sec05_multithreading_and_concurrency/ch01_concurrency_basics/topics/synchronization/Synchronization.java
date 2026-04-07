package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.synchronization;

/**
 * Concept: Synchronization
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * multiple tasks may run together and compete for shared state.
 *
 * Real-world setup:
 * This topic uses background jobs and shared counters to make the concept easier to understand.
 *
 * How to think about it:
 * First understand the problem in plain language, then map that idea to the Java code.
 *
 * How to code it:
 * 1. Identify the business data or behavior.
 * 2. Choose the Java construct that expresses the idea clearly.
 * 3. Run the example and compare the output with the explanation.
 *
 * Expected output:
 * Read the inline comments and printed lines in main() to see the expected behavior.
 */

public class Synchronization {
    public static void main(String[] args) throws InterruptedException {
        wrongExample();
        // Expected output:
        // count should be 2000 because both threads increment inside synchronized code.
        int count = incrementWithTwoThreads(1_000);
        System.out.println("count = " + count);
        System.out.println("Lesson: synchronized protects shared mutable state from lost updates.");
        System.out.println("Senior note: synchronization correctness matters more than cleverness; benchmark after correctness is established.");
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Without synchronization, count++ can overlap and lose updates.");
        System.out.println();
    }

    static int incrementWithTwoThreads(int iterationsPerThread) throws InterruptedException {
        Counter counter = new Counter();
        Thread first = new Thread(() -> counter.incrementManyTimes(iterationsPerThread));
        Thread second = new Thread(() -> counter.incrementManyTimes(iterationsPerThread));
        first.start();
        second.start();
        first.join();
        second.join();
        return counter.value();
    }

    private static final class Counter {
        private int count;

        synchronized void incrementManyTimes(int iterations) {
            for (int i = 0; i < iterations; i++) {
                count++;
            }
        }

        synchronized int value() {
            return count;
        }
    }
}
