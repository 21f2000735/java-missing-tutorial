package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.threads;

/**
 * Concept: Threads
 * Why this concept is needed:
 * Concurrency starts with one hard fact: two units of work can overlap in time.
 *
 * What problem this solves:
 * It shows how independent work starts and why shared state becomes risky.
 *
 * Real-world setup:
 * A reporting task runs in the background while the main flow continues.
 *
 * How to think about it:
 * A thread is a unit of execution. Starting work and sharing state are separate concerns.
 *
 * How to code it:
 * 1. Start one background task.
 * 2. Wait with join() when you need the task finished.
 * 3. Notice how shared mutable state changes the design problem.
 *
 * Expected output:
 * worker thread: prepare report
 * safe count = 2
 */
public class Threads {
    public static void main(String[] args) throws InterruptedException {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        exercise();
        solution();
    }

    private static void printOverview() {
        System.out.println("The problem:");
        System.out.println("You want one task to run independently, but once tasks overlap, execution order and shared state both matter.");
        System.out.println();
    }

    private static void wrongExample() {
        System.out.println("Common mistake:");
        System.out.println("- calling run() directly and expecting a new thread");
        System.out.println("- sharing mutable state before understanding the execution model");
        System.out.println();
    }

    private static void basicExample() throws InterruptedException {
        runWorkerAndWait();
        System.out.println("Run this first:");
        System.out.println("- A thread can run a small task independently.");
        System.out.println("- join() waits for that task to finish.");
        System.out.println();
    }

    private static void betterExample() throws InterruptedException {
        int safeCount = runSafeCounterDemo();
        System.out.println("Better example:");
        System.out.println("safe count = " + safeCount);
        System.out.println("Why it works: synchronized protects the shared counter.");
        System.out.println("Use this when: you are learning the execution model or showing a tiny one-off demo.");
        System.out.println("Avoid this when: production code needs many tasks, because executors age better.");
        System.out.println();
    }

    private static void commonPitfalls() {
        System.out.println("What to remember:");
        System.out.println("- start() creates a new thread; run() is just a normal method call");
        System.out.println("- execution order is not guaranteed just because start() was called first");
        System.out.println("- correctness becomes harder as soon as threads share mutable state");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Try next:");
        System.out.println("- remove synchronization from the counter example");
        System.out.println("- predict whether the final count always stays 2");
        System.out.println();
    }

    private static void solution() {
        System.out.println("After reading this example, you should know:");
        System.out.println("- threads let work overlap in time");
        System.out.println("- join() makes waiting explicit");
        System.out.println("- shared mutable state is where concurrency becomes dangerous");
    }

    static void runWorkerAndWait() throws InterruptedException {
        Thread worker = new Thread(() -> System.out.println("worker thread: prepare report"), "report-worker");
        worker.start();
        worker.join();
    }

    static int runSafeCounterDemo() throws InterruptedException {
        Counter counter = new Counter();
        Thread first = new Thread(counter::incrementSafely, "counter-1");
        Thread second = new Thread(counter::incrementSafely, "counter-2");
        first.start();
        second.start();
        first.join();
        second.join();
        return counter.value();
    }

    private static final class Counter {
        private int count;

        synchronized void incrementSafely() {
            count++;
        }

        synchronized int value() {
            return count;
        }
    }
}
