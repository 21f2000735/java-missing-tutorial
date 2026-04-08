package com.learning.javamissing.sec08_internal_of_jvm.ch03_jit_and_garbage_collection.topics.jit_and_tiered_compilation;

public class JitAndTieredCompilation {
    public static void main(String[] args) {
        long sum = 0;
        for (int i = 0; i < 100_000; i++) {
            sum += hotMethod(i);
        }
        System.out.println("Concept: hot methods get optimized by the JIT over time.");
        System.out.println("sum = " + sum);
        System.out.println("Use -XX:+PrintCompilation to observe compilation decisions when needed.");
        System.out.println("Why it matters: tiered compilation moves from interpreted code to faster compiled code for hot paths.");
    }

    private static int hotMethod(int value) {
        return value % 7;
    }
}
