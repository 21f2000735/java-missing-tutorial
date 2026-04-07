package com.learning.javamissing.sec05_multithreading_and_concurrency.ch03_structured_concurrency.topics.collecting_results_from_child_tasks;

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
        System.out.println("Concept: collecting results from related tasks");
        System.out.println("Real-world problem: a dashboard needs both user profile and subscription plan.");
        System.out.println("Mental model: if the screen needs both pieces, the operation is incomplete until both succeed.");
        System.out.println();
    }

    private static void runDashboardExample() throws Exception {
        try (var scope = java.util.concurrent.StructuredTaskScope.open(
                java.util.concurrent.StructuredTaskScope.Joiner.<String>awaitAllSuccessfulOrThrow())) {
            var user = scope.fork(() -> "user: Asha");
            var plan = scope.fork(() -> "plan: premium");
            scope.join();

            // Expected output:
            // user = user: Asha
            // plan = plan: premium
            System.out.println("user = " + user.get());
            System.out.println("plan = " + plan.get());
            System.out.println("Why it works: the joiner waits until all required child tasks succeed.");
        }
    }
}
