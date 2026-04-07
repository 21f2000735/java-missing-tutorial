package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.executors;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

/**
 * Concept: Executors
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

public class Executors {
    public static void main(String[] args) throws Exception {
        overview();
        wrongExample();
        // Expected output:
        // both background report tasks finish and their values are printed through Future.get().
        TaskSummary summary = computeReportLengthAndRetryCount();
        System.out.println("reportLength = " + summary.reportLength());
        System.out.println("retryCount = " + summary.retryCount());
        System.out.println("What to notice: the task logic is separate from thread creation and waiting.");
        System.out.println("Senior note: executors separate task submission from thread management, which improves tuning and observability later.");
    }

    private static void overview() {
        System.out.println("Topic: Executors");
        System.out.println("Real-world setup: a reporting service runs multiple background tasks and waits for the results.");
        System.out.println("Why it matters: executors manage worker threads so the code can focus on tasks, not manual thread lifecycle.");
        System.out.println();
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Creating a brand-new thread for every report task becomes harder to manage than using an executor.");
        System.out.println();
    }

    static TaskSummary computeReportLengthAndRetryCount() throws Exception {
        ExecutorService pool = java.util.concurrent.Executors.newFixedThreadPool(2);
        try {
            Future<Integer> reportLength = pool.submit(() -> "quarterly-report".length());
            Future<Integer> retryCount = pool.submit(() -> 3);
            return new TaskSummary(reportLength.get(), retryCount.get());
        } finally {
            pool.shutdown();
        }
    }

    record TaskSummary(int reportLength, int retryCount) {}
}
