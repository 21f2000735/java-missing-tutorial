package com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads.topics.running_tasks_with_virtual_thread_executor;

/**
 * Concept: Virtual-thread-per-task executor
 * Why this concept is needed:
 * Real request flows often need many independent waiting tasks.
 *
 * What problem this solves:
 * It lets each task use a simple blocking style without manually managing many platform threads.
 *
 * Real-world setup:
 * A product page loads inventory and pricing at the same time.
 *
 * How to think about it:
 * One task can map naturally to one lightweight thread.
 *
 * How to code it:
 * 1. Open a virtual-thread-per-task executor.
 * 2. Submit independent tasks.
 * 3. Wait for both results normally.
 *
 * Expected output:
 * inventory = inventory ready
 * pricing = pricing ready
 */
public class RunningTasksWithVirtualThreadExecutor {
    public static void main(String[] args) throws Exception {
        explainWhy();
        runRequestFanOutExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a virtual-thread-per-task executor matches request-style code well");
        System.out.println("- each task can block independently without forcing callback-style code");
        System.out.println("- you still need to think about failure and resource usage");
    }

    private static void explainWhy() {
        System.out.println("The problem:");
        System.out.println("One request needs several independent waiting tasks, but callback-heavy code hurts readability.");
        System.out.println();
    }

    private static void runRequestFanOutExample() throws Exception {
        try (var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor()) {
            var inventory = executor.submit(() -> fetch("inventory"));
            var pricing = executor.submit(() -> fetch("pricing"));

            System.out.println("Run this example:");
            System.out.println("inventory = " + inventory.get());
            System.out.println("pricing = " + pricing.get());
            System.out.println("Why it works: each submitted task gets a lightweight thread and the caller waits for results normally.");
            System.out.println("Use this when: many tasks mostly wait and the code should stay direct.");
            System.out.println("Avoid this when: you still need complex shared-state coordination or CPU-heavy optimization.");
        }
    }

    private static String fetch(String resource) throws InterruptedException {
        Thread.sleep(40);
        return resource + " ready";
    }
}
