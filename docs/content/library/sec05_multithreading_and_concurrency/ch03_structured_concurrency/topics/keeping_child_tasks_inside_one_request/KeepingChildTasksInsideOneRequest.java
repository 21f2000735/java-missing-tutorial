package com.learning.javamissing.sec05_multithreading_and_concurrency.ch03_structured_concurrency.topics.keeping_child_tasks_inside_one_request;

public class KeepingChildTasksInsideOneRequest {
    public static void main(String[] args) throws Exception {
        explainWhy();
        runProfileRequestExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- child tasks belong to one parent operation");
        System.out.println("- joining inside one scope keeps lifetime easier to reason about");
        System.out.println("- structured concurrency is about ownership, not just parallel execution");
    }

    private static void explainWhy() {
        System.out.println("Concept: one parent scope owns related child tasks");
        System.out.println("Real-world problem: a profile page request needs account data and notification status together.");
        System.out.println("Mental model: if tasks belong to one request, their lifetime should stay inside one scope.");
        System.out.println();
    }

    private static void runProfileRequestExample() throws Exception {
        try (var scope = java.util.concurrent.StructuredTaskScope.open(
                java.util.concurrent.StructuredTaskScope.Joiner.<String>awaitAllSuccessfulOrThrow())) {
            var account = scope.fork(() -> "account ready");
            var notifications = scope.fork(() -> "notifications ready");
            scope.join();

            // Expected output:
            // account = account ready
            // notifications = notifications ready
            System.out.println("account = " + account.get());
            System.out.println("notifications = " + notifications.get());
            System.out.println("Why it works: both subtasks stay tied to one parent request scope.");
        }
    }
}
