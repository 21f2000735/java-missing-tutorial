package com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.stream_pipeline;

import java.util.List;

/**
 * Concept: Stream Pipeline
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * business code often filters, transforms, groups, and summarizes data.
 *
 * Real-world setup:
 * This topic uses order processing and reporting to make the concept easier to understand.
 *
 * How to think about it:
 * First understand the problem in plain language, then map that idea to the Java code.
 *
 * How to code it:
 * 1. Identify the business data or behavior.
 * 2. Choose the Java construct that expresses the idea clearly.
 * 3. Run the example and compare the output with the explanation.
 *
 * Expected output:
 * Read the inline comments and printed lines in main() to see the expected behavior.
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
        System.out.println("Topic: Stream Pipeline");
        System.out.println("Chapter: Streams");
        System.out.println("Why it matters: stream pipelines let you express data transformation clearly when the problem is about filtering, mapping, and collecting values.");
        System.out.println();
    }

    private static void basicExample() {
        // Expected output:
        // longNames = [liam, alex]
        List<String> names = List.of("ava", "liam", "zoe", "alex");
        List<String> longNames = longNames(names, 4);

        System.out.println("Basic example:");
        System.out.println("longNames = " + longNames);
        System.out.println("Lesson: a stream pipeline reads as a sequence of data steps.");
        System.out.println("Dry run: filter checks ava(false), liam(true), zoe(false), alex(true).");
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

        System.out.println("Better example:");
        System.out.println("priorityTotal = " + priorityTotal);
        System.out.println("Lesson: streams are strongest when each step has one clear purpose.");
        System.out.println("Senior note: keep pipelines side-effect free so they stay easy to parallelize, test, and review.");
        System.out.println();
    }

    private static void commonPitfalls() {
        System.out.println("Common mistakes:");
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
