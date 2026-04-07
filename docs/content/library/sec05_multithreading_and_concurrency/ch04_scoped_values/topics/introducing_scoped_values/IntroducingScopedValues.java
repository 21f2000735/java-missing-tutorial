package com.learning.javamissing.sec05_multithreading_and_concurrency.ch04_scoped_values.topics.introducing_scoped_values;

public class IntroducingScopedValues {
    private static final java.lang.ScopedValue<String> USER_ROLE = java.lang.ScopedValue.newInstance();

    public static void main(String[] args) {
        explainWhy();
        runRequestContextExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- scoped values bind context for one execution scope");
        System.out.println("- code inside the scope can read the value without global mutable state");
        System.out.println("- this is useful for request metadata, not for ordinary business fields");
    }

    private static void explainWhy() {
        System.out.println("Concept: scoped request context");
        System.out.println("Real-world problem: logging and authorization both need the current user role.");
        System.out.println("Mental model: bind context around one operation and let inner code read it.");
        System.out.println();
    }

    private static void runRequestContextExample() {
        java.lang.ScopedValue.where(USER_ROLE, "admin").run(() -> {
            // Expected output:
            // visibleRole = admin
            System.out.println("visibleRole = " + USER_ROLE.get());
            System.out.println("Why it works: the role is bound only inside this execution scope.");
        });
    }
}
