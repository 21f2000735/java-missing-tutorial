package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.visibility_and_volatile;

public class VisibilityAndVolatile {
    private static volatile boolean shutdownRequested;

    public static void main(String[] args) {
        try {
            System.out.println("Concept: volatile makes one thread's updated value visible to another thread.");
            Thread worker = new Thread(() -> {
                while (!shutdownRequested) {
                    // simulate waiting for a visible stop signal
                }
                System.out.println("worker observed shutdown = true");
            });

            worker.start();
            Thread.sleep(10);
            shutdownRequested = true;
            worker.join();

            // Expected output:
            // worker observed shutdown = true
            System.out.println("Why it matters: volatile helps with visibility for a single shared value, but it does not make compound updates automatically atomic.");
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            System.out.println("interrupted while waiting for the worker thread");
        }
    }
}
