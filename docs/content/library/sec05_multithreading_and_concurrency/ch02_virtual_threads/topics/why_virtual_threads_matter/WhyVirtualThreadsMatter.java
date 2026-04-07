package com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads.topics.why_virtual_threads_matter;

/**
 * Concept: Why virtual threads matter
 * Why this concept is needed:
 * Waiting-heavy systems need a cheaper way to express many concurrent tasks.
 *
 * What problem this solves:
 * It keeps direct blocking-style code practical for very many mostly waiting tasks.
 *
 * Real-world setup:
 * An order request waits on inventory and pricing checks.
 *
 * How to think about it:
 * A virtual thread is still a thread, but its cost model is much better for waiting-heavy workloads.
 *
 * How to code it:
 * 1. Start one virtual thread.
 * 2. Let it block in a simple style.
 * 3. Compare the model with traditional expensive thread-per-task thinking.
 *
 * Expected output:
 * inventory check finished on VirtualThread...
 */
public class WhyVirtualThreadsMatter {
    public static void main(String[] args) throws InterruptedException {
        explainWhy();
        wrongMentalModel();
        runBlockingTaskExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a virtual thread is still a Thread");
        System.out.println("- virtual threads are useful when tasks spend time waiting");
        System.out.println("- they improve the cost model, not the business logic");
    }

    private static void explainWhy() {
        System.out.println("The problem:");
        System.out.println("Many requests mostly wait on I/O, but traditional thread-per-task models become expensive.");
        System.out.println();
    }

    private static void wrongMentalModel() {
        System.out.println("Common mistake:");
        System.out.println("- assuming virtual threads make every workload faster");
        System.out.println();
    }

    private static void runBlockingTaskExample() throws InterruptedException {
        Thread worker = Thread.ofVirtual().name("vt-order-check").start(() -> {
            try {
                Thread.sleep(50);
                System.out.println("inventory check finished on " + Thread.currentThread());
            } catch (InterruptedException exception) {
                Thread.currentThread().interrupt();
            }
        });
        worker.join();
        System.out.println("Why it works: the code stays simple and blocking-style, but the thread is lightweight.");
        System.out.println("Use this when: tasks mostly wait on external systems.");
        System.out.println("Avoid this when: the real problem is CPU-heavy work or bad locking.");
    }
}
