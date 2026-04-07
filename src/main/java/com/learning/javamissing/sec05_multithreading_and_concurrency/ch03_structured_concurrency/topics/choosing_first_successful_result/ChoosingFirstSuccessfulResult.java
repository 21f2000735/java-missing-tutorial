package com.learning.javamissing.sec05_multithreading_and_concurrency.ch03_structured_concurrency.topics.choosing_first_successful_result;

public class ChoosingFirstSuccessfulResult {
    public static void main(String[] args) throws Exception {
        explainWhy();
        runReplicaLookupExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- some workflows need the first good answer, not every answer");
        System.out.println("- shutdown policy is a business decision");
        System.out.println("- cancelling wasted sibling work improves clarity and resource use");
    }

    private static void explainWhy() {
        System.out.println("Concept: first-success result policy");
        System.out.println("Real-world problem: a search system calls primary and backup providers and accepts the first successful answer.");
        System.out.println("Mental model: if one answer is enough, slower siblings should stop once a winner exists.");
        System.out.println();
    }

    private static void runReplicaLookupExample() throws Exception {
        try (var scope = java.util.concurrent.StructuredTaskScope.open(
                java.util.concurrent.StructuredTaskScope.Joiner.<String>anySuccessfulResultOrThrow())) {
            scope.fork(() -> "primary result");
            scope.fork(() -> "backup result");
            String winner = scope.join();

            // Expected output:
            // winner = primary result
            // or backup result
            System.out.println("winner = " + winner);
            System.out.println("Why it works: the joiner returns the first successful result and can stop slower siblings.");
        }
    }
}
