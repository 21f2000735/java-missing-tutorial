package com.learning.javamissing.sec08_internal_of_jvm.ch03_jit_and_garbage_collection.topics.jit_basics;

public class JitBasics {
    public static void main(String[] args) {
        System.out.println("Concept: the JVM optimizes hot code paths while the program is running.");
        long sum = 0;
        for (int round = 0; round < 10_000; round++) {
            sum += round % 10;
        }

        // Expected output:
        // sum = 45000
        System.out.println("sum = " + sum);
        System.out.println("Why it matters: the JIT watches frequently executed code and compiles it more aggressively than cold paths.");
    }
}
