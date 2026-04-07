package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.executors;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

/**
 * Concept: Executors
 * Why this concept is needed:
 * Most production code should separate task submission from low-level thread management.
 *
 * What problem this solves:
 * It manages worker threads so the code can focus on tasks and results.
 *
 * Real-world setup:
 * A reporting service runs multiple background tasks and waits for their results.
 *
 * How to think about it:
 * Submit tasks, then wait for results. Let the executor own the workers.
 *
 * How to code it:
 * 1. Choose an executor.
 * 2. Submit independent tasks.
 * 3. Read results through Future or other coordination APIs.
 *
 * Expected output:
 * reportLength = 16
 * retryCount = 3
 */
public class Executors {
    public static void main(String[] args) throws Exception {
        overview();
        wrongExample();
        TaskSummary summary = computeReportLengthAndRetryCount();
        System.out.println("Run this example:");
        System.out.println("reportLength = " + summary.reportLength());
        System.out.println("retryCount = " + summary.retryCount());
        System.out.println("Why it works: task logic is separate from thread creation and waiting.");
        System.out.println("Use this when: many tasks need cleaner lifecycle management than raw threads.");
        System.out.println("Avoid this when: you are only trying to understand what a thread is doing at the lowest level.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- executors separate task submission from worker management");
        System.out.println("- Futures let you wait for task results explicitly");
        System.out.println("- executor-based code usually scales better as systems grow");
    }

    private static void overview() {
        System.out.println("The problem:");
        System.out.println("You need concurrent tasks, but raw thread creation should not spread through the codebase.");
        System.out.println();
    }

    private static void wrongExample() {
        System.out.println("Common mistake:");
        System.out.println("- creating a brand-new thread for every small task");
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
