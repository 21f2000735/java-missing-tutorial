package com.learning.javamissing.sec05_multithreading_and_concurrency.ch04_scoped_values.topics.scoped_values_vs_thread_local;

public class ScopedValuesVsThreadLocal {
    private static final ThreadLocal<String> THREAD_LOCAL = new ThreadLocal<>();
    private static final java.lang.ScopedValue<String> SCOPED = java.lang.ScopedValue.newInstance();

    public static void main(String[] args) {
        explainWhy();
        compareApproaches();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- thread local is mutable per thread and easier to leak");
        System.out.println("- scoped values are better for bounded read-mostly context");
        System.out.println("- method parameters are still best when only a few calls need the value");
    }

    private static void explainWhy() {
        System.out.println("Concept: scoped value versus thread local");
        System.out.println("Real-world problem: request metadata must be available in nested calls without leaking forever.");
        System.out.println("Mental model: choose the narrowest and safest context mechanism.");
        System.out.println();
    }

    private static void compareApproaches() {
        THREAD_LOCAL.set("legacy-user");
        System.out.println("threadLocal = " + THREAD_LOCAL.get());
        java.lang.ScopedValue.where(SCOPED, "scoped-user").run(() ->
                System.out.println("scopedValue = " + SCOPED.get())
        );
        THREAD_LOCAL.remove();
        System.out.println("Why it matters: scoped values make lifetime clearer than mutable thread-local state.");
    }
}
