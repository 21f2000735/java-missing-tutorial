package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.threads;

/**
 * Concept: Threads
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

public class Threads {
    public static void main(String[] args) throws InterruptedException {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Calling run() directly does not create a new thread. It runs on the current thread.");
        System.out.println();
    }

    private static void printOverview() {
        System.out.println("Topic: Threads");
        System.out.println("Chapter: Concurrency Fundamentals");
        System.out.println("Why it matters: threads let work run independently, but they also introduce ordering, visibility, and safety problems.");
        System.out.println();
    }

    private static void basicExample() throws InterruptedException {
        // Expected output:
        // the worker thread prints first, then main continues after join()
        runWorkerAndWait();

        System.out.println("Basic example:");
        System.out.println("- A thread can run a small task independently.");
        System.out.println("- join() waits for that task to finish.");
        System.out.println("- Common confusion: calling run() directly does not start a new OS-managed thread.");
        System.out.println();
    }

    private static void betterExample() throws InterruptedException {
        // Expected output:
        // safe count = 2 because both increments are synchronized
        int safeCount = runSafeCounterDemo();

        System.out.println("Better example:");
        System.out.println("safe count = " + safeCount);
        System.out.println("Lesson: once threads share mutable state, the design must protect that state.");
        System.out.println("Senior note: raw threads teach the model, but task abstractions age better in production code.");
        System.out.println();
    }

    private static void commonPitfalls() {
        System.out.println("Common mistakes:");
        System.out.println("- starting raw threads for every small task instead of using higher-level APIs later");
        System.out.println("- reading shared mutable state without synchronization");
        System.out.println("- assuming execution order from the order of start() calls");
        System.out.println("- forgetting that a bug may appear only sometimes");
        System.out.println();
    }

    private static void examTrap() {
        System.out.println("OCJP trap:");
        System.out.println("Calling run() executes on the current thread.");
        System.out.println("Calling start() creates a new thread and then calls run() on that new thread.");
        System.out.println();
    }

    private static void interviewQuestion() {
        System.out.println("Interview Q&A:");
        System.out.println("Q: When should you create a Thread directly?");
        System.out.println("A: Usually only for learning, very small demos, or special low-level cases. In most production code, executors or structured concurrency are better choices.");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("Predict the final count if two threads increment the same field 1_000 times each without synchronization.");
        System.out.println("Then explain why the result may be less than 2_000.");
        System.out.println();
    }

    private static void solution() {
        System.out.println("Solution:");
        System.out.println("Without synchronization, increments can overlap and some updates can be lost.");
        System.out.println("That is a race condition.");
        System.out.println("Fixes include synchronized, locks, or atomic classes depending on the problem.");
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
