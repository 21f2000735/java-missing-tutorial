package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.synchronization;

/**
 * Concept: Synchronization
 * Why this concept is needed:
 * Overlapping access to shared mutable state causes bugs that are hard to reproduce.
 *
 * What problem this solves:
 * It prevents lost updates when multiple threads modify the same data.
 *
 * Real-world setup:
 * Two worker tasks update the same progress counter.
 *
 * How to think about it:
 * Shared state needs one safety rule, not lucky timing.
 *
 * How to code it:
 * 1. Identify the shared mutable field.
 * 2. Protect the update path.
 * 3. Verify the final result after both threads finish.
 *
 * Expected output:
 * count = 2000
 */
public class Synchronization {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("The problem:");
        System.out.println("Two tasks update the same counter. Without protection, some increments may disappear.");
        System.out.println();
        wrongExample();

        int count = incrementWithTwoThreads(1_000);
        System.out.println("Run this example:");
        System.out.println("count = " + count);
        System.out.println("Why it works: only one thread can execute the synchronized counter logic at a time.");
        System.out.println("Use this when: threads really share mutable state and correctness matters.");
        System.out.println("Avoid this when: state can be isolated instead of shared.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- synchronization protects invariants on shared mutable state");
        System.out.println("- count++ is not safe just because it looks small");
        System.out.println("- isolated state is often simpler than shared synchronized state");
    }

    private static void wrongExample() {
        System.out.println("Common mistake:");
        System.out.println("- assuming count++ is safe because it is one short line");
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
