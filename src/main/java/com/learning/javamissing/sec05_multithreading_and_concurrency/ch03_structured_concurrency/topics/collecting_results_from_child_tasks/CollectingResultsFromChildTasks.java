package com.learning.javamissing.sec05_multithreading_and_concurrency.ch03_structured_concurrency.topics.collecting_results_from_child_tasks;

/**
 * Concept: Collecting results from child tasks
 * Why this concept is needed:
 * Some workflows are incomplete until every required subtask succeeds.
 *
 * What problem this solves:
 * It keeps the "need all results" policy explicit at one scope boundary.
 *
 * Real-world setup:
 * A dashboard needs both user profile and subscription plan before it can render correctly.
 *
 * How to think about it:
 * If the screen needs both pieces, the whole operation is incomplete until both succeed.
 *
 * How to code it:
 * 1. Open one scope for related tasks.
 * 2. Fork both required subtasks.
 * 3. Join with an "all successful" policy.
 *
 * Expected output:
 * user = user: Asha
 * plan = plan: premium
 */
public class CollectingResultsFromChildTasks {
    public static void main(String[] args) throws Exception {
        explainWhy();
        runDashboardExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- some workflows require every child result");
        System.out.println("- result handling policy should be explicit at the scope boundary");
        System.out.println("- success and failure should be read as one operation outcome");
    }

    private static void explainWhy() {
        System.out.println("The problem:");
        System.out.println("A dashboard is incomplete if one required child result is missing.");
        System.out.println();
    }

    private static void runDashboardExample() throws Exception {
        try (var scope = java.util.concurrent.StructuredTaskScope.open(
                java.util.concurrent.StructuredTaskScope.Joiner.<String>awaitAllSuccessfulOrThrow())) {
            var user = scope.fork(() -> "user: Asha");
            var plan = scope.fork(() -> "plan: premium");
            scope.join();

            System.out.println("Run this example:");
            System.out.println("user = " + user.get());
            System.out.println("plan = " + plan.get());
            System.out.println("Why it works: the joiner waits until all required child tasks succeed.");
            System.out.println("Use this when: the workflow truly needs every result.");
            System.out.println("Avoid this when: one successful answer is enough and slower siblings should stop.");
        }
    }
}
