package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.thread_local_context;

public class ThreadLocalContext {
    private static final ThreadLocal<String> currentUser = new ThreadLocal<>();

    public static void main(String[] args) throws InterruptedException {
        Thread alice = new Thread(() -> runRequest("alice", "orders"));
        Thread bob = new Thread(() -> runRequest("bob", "payments"));

        alice.start();
        bob.start();
        alice.join();
        bob.join();

        System.out.println("Why it matters: each thread can carry request context without sharing mutable state.");
    }

    private static void runRequest(String user, String endpoint) {
        try {
            currentUser.set(user);
            System.out.println(Thread.currentThread().getName() + " sees user = " + currentUser.get() + ", endpoint = " + endpoint);
        } finally {
            currentUser.remove();
        }
    }
}
