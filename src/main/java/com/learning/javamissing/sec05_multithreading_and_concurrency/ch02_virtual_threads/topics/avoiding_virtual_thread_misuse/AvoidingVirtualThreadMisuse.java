package com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads.topics.avoiding_virtual_thread_misuse;

public class AvoidingVirtualThreadMisuse {
    public static void main(String[] args) throws InterruptedException {
        explainWhy();
        demonstratePinnedStyleRisk();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- virtual threads do not remove locking problems");
        System.out.println("- long synchronized blocking sections are still risky");
        System.out.println("- the biggest mistake is assuming the thread type fixes poor design");
    }

    private static void explainWhy() {
        System.out.println("Concept: virtual-thread pitfalls");
        System.out.println("Real-world problem: a team adopts virtual threads but keeps long lock-held blocking work.");
        System.out.println("Mental model: cheap thread creation does not replace careful synchronization and resource design.");
        System.out.println();
    }

    private static void demonstratePinnedStyleRisk() throws InterruptedException {
        CheckoutCache cache = new CheckoutCache();
        Thread worker = Thread.ofVirtual().start(cache::loadSlowlyInsideSynchronizedBlock);
        worker.join();

        // Expected output:
        // loading discount rules inside synchronized block
        // lesson = keep long waiting work out of synchronized sections when possible
        System.out.println("lesson = keep long waiting work out of synchronized sections when possible");
    }

    private static final class CheckoutCache {
        synchronized void loadSlowlyInsideSynchronizedBlock() {
            try {
                System.out.println("loading discount rules inside synchronized block");
                Thread.sleep(30);
            } catch (InterruptedException exception) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
