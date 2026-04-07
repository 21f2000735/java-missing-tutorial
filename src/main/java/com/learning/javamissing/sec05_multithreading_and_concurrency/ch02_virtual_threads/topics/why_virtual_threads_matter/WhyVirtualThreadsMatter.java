package com.learning.javamissing.sec05_multithreading_and_concurrency.ch02_virtual_threads.topics.why_virtual_threads_matter;

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
        System.out.println("Concept: cheap threads for waiting-heavy tasks");
        System.out.println("Real-world problem: an order request waits on inventory and pricing calls.");
        System.out.println("Mental model: if tasks mostly wait, a cheaper thread-per-task style becomes practical.");
        System.out.println();
    }

    private static void wrongMentalModel() {
        System.out.println("Common confusion:");
        System.out.println("- virtual threads are not a promise that everything becomes faster");
        System.out.println("- they help scaling of blocking-style work, especially I/O-heavy workloads");
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
    }
}
