package com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads.topics.running_tasks_with_virtual_thread_executor;

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
        System.out.println("Concept: one task, one virtual thread");
        System.out.println("Real-world problem: a product page loads inventory, price, and reviews at the same time.");
        System.out.println("Mental model: submit independent waiting tasks without manually juggling platform threads.");
        System.out.println();
    }

    private static void runRequestFanOutExample() throws Exception {
        try (var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor()) {
            var inventory = executor.submit(() -> fetch("inventory"));
            var pricing = executor.submit(() -> fetch("pricing"));

            // Expected output:
            // inventory = inventory ready
            // pricing = pricing ready
            System.out.println("inventory = " + inventory.get());
            System.out.println("pricing = " + pricing.get());
            System.out.println("Why it works: each submitted task gets a lightweight thread and the caller waits for results normally.");
        }
    }

    private static String fetch(String resource) throws InterruptedException {
        Thread.sleep(40);
        return resource + " ready";
    }
}
