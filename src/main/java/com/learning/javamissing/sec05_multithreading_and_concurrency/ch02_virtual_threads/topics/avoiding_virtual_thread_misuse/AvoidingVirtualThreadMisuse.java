package com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads.topics.avoiding_virtual_thread_misuse;

/**
 * Concept: Avoiding virtual thread misuse
 * Why this concept is needed:
 * Cheap threads do not remove design mistakes around locking and blocking.
 *
 * What problem this solves:
 * It shows why virtual threads still need careful synchronization and resource design.
 *
 * Real-world setup:
 * A team adopts virtual threads but keeps slow work inside synchronized blocks.
 *
 * How to think about it:
 * Better thread cost does not remove bad contention.
 *
 * How to code it:
 * 1. Start a virtual thread.
 * 2. Let it hold a lock while waiting.
 * 3. Notice that the thread type did not fix the design.
 *
 * Expected output:
 * loading discount rules inside synchronized block
 * lesson = keep long waiting work out of synchronized sections when possible
 */
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
        System.out.println("The problem:");
        System.out.println("Virtual threads are cheaper, but long lock-held waiting still creates contention and poor scalability.");
        System.out.println();
    }

    private static void demonstratePinnedStyleRisk() throws InterruptedException {
        CheckoutCache cache = new CheckoutCache();
        Thread worker = Thread.ofVirtual().start(cache::loadSlowlyInsideSynchronizedBlock);
        worker.join();
        System.out.println("lesson = keep long waiting work out of synchronized sections when possible");
        System.out.println("Use this when: you want a warning sign before scaling virtual-thread designs.");
        System.out.println("Avoid this mistake: holding locks across slow blocking work.");
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
