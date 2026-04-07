package com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.stream_pipeline;

import java.util.List;

/**
 * Concept: Stream Pipeline
 * Why this concept is needed:
 * Many business tasks are really data transformations, and the code should show that clearly.
 *
 * What problem this solves:
 * It expresses filtering and mapping as a readable sequence of steps.
 *
 * Real-world setup:
 * An order screen needs only priority items and only the fields needed for the next step.
 *
 * How to think about it:
 * A pipeline reads like: start with data, keep what matters, reshape it, finish with a result.
 *
 * How to code it:
 * 1. Start with a collection.
 * 2. Add filter and map steps in the same order as the business rule.
 * 3. Finish with a terminal operation that produces the answer.
 *
 * Expected output:
 * longNames = [liam, alex]
 * priorityTotal = 3798
 */

public class StreamPipeline {
    public static void main(String[] args) {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Using a stream for very tiny logic can be worse than a plain loop if the code becomes harder to read.");
        System.out.println();
    }

    private static void printOverview() {
        System.out.println("The problem:");
        System.out.println("You have raw data, but the business wants a smaller and clearer answer.");
        System.out.println("A stream pipeline helps when the code is really a chain of filtering and transformation steps.");
        System.out.println();
    }

    private static void basicExample() {
        // Expected output:
        // longNames = [liam, alex]
        List<String> names = List.of("ava", "liam", "zoe", "alex");
        List<String> longNames = longNames(names, 4);

        System.out.println("Run this first:");
        System.out.println("longNames = " + longNames);
        System.out.println("Why it works: the filter keeps only names with length >= 4.");
        System.out.println("Dry run: ava(false), liam(true), zoe(false), alex(true).");
        System.out.println();
    }

    private static void betterExample() {
        // Expected output:
        // priorityTotal = 3798 because only book and bag are priority orders
        List<Order> orders = List.of(
                new Order("book", 1_299, true),
                new Order("pen", 199, false),
                new Order("bag", 2_499, true)
        );

        int priorityTotal = sumPriorityOrders(orders);

        System.out.println("Better real-world example:");
        System.out.println("priorityTotal = " + priorityTotal);
        System.out.println("Why it works: the filter keeps only priority orders and mapToInt extracts only the field needed for the sum.");
        System.out.println("Use this when: the task is really filter -> transform -> answer.");
        System.out.println("Avoid this when: the logic is stateful and a loop is easier to explain.");
        System.out.println();
    }

    private static void commonPitfalls() {
        System.out.println("Common mistake:");
        System.out.println("- using streams for logic that is simpler with a loop");
        System.out.println("- mutating external state inside map or filter");
        System.out.println("- forgetting that streams do nothing until a terminal operation runs");
        System.out.println("- making the pipeline so long that it becomes harder to read than a loop");
        System.out.println();
    }

    private static void examTrap() {
        System.out.println("OCJP trap:");
        System.out.println("Intermediate operations are lazy.");
        System.out.println("A stream pipeline needs a terminal operation like toList(), count(), or sum() to execute.");
        System.out.println();
    }

    private static void interviewQuestion() {
        System.out.println("Interview Q&A:");
        System.out.println("Q: When would you choose a loop over a stream?");
        System.out.println("A: Choose a loop when the logic is stateful, hard to express cleanly in a pipeline, or easier to debug step by step.");
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("From scores {55, 91, 78, 42, 88}, build a stream pipeline that keeps passing scores and counts them.");
        System.out.println();
    }

    private static void solution() {
        long passingCount = countPassingScores(List.of(55, 91, 78, 42, 88), 60);

        System.out.println("Solution:");
        System.out.println("passingCount = " + passingCount);
        System.out.println("Why this is better: the filter explains the rule, and count() makes the final goal explicit.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- a stream pipeline is best when the work is a chain of data steps");
        System.out.println("- terminal operations are what actually trigger execution");
        System.out.println("- a loop is still the better choice when the pipeline stops being clear");
    }

    static List<String> longNames(List<String> names, int minimumLength) {
        return names.stream()
                .filter(name -> name.length() >= minimumLength)
                .toList();
    }

    static int sumPriorityOrders(List<Order> orders) {
        return orders.stream()
                .filter(Order::priority)
                .mapToInt(Order::priceInCents)
                .sum();
    }

    static long countPassingScores(List<Integer> scores, int passingScore) {
        return scores.stream()
                .filter(score -> score >= passingScore)
                .count();
    }

    record Order(String name, int priceInCents, boolean priority) {}
}
