package com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.collectors;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.IntSummaryStatistics;

/**
 * Concept: Collectors
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

public class Collectors {
    public static void main(String[] args) {
        overview();
        wrongExample();
        toListExample();
        groupingByExample();
        partitioningByExample();
        summarizingExample();
        pitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }

    private static void wrongExample() {
        System.out.println("Wrong example:");
        System.out.println("Using toMap without handling duplicate keys can fail at runtime.");
        System.out.println();
    }

    private static void overview() {
        System.out.println("Topic: Collectors");
        System.out.println("Chapter: Streams");
        System.out.println("Real-world setup: an order screen needs grouped items, totals, pass/fail buckets, and printable summaries.");
        System.out.println("Collectors turn a stream into a final result like a List, Set, Map, summary, or grouped structure.");
        System.out.println();
    }

    private static void toListExample() {
        // Expected output:
        // upperCaseNames keeps duplicates, uniqueUpperCaseNames removes them
        List<String> categories = List.of("books", "electronics", "books", "stationery", "books");
        List<String> upperCaseCategories = uppercaseCategories(categories);
        Set<String> uniqueUpperCaseCategories = uniqueUppercaseCategories(categories);

        System.out.println("Example 1: toList and toSet");
        System.out.println("source = " + categories);
        System.out.println("upperCaseCategories = " + upperCaseCategories);
        System.out.println("uniqueUpperCaseCategories = " + uniqueUpperCaseCategories);
        System.out.println("What to notice: toList keeps duplicates, toSet removes duplicates.");
        System.out.println("Dry run: map turns each category name into uppercase before the collector receives it.");
        System.out.println();
    }

    private static void groupingByExample() {
        // Expected output:
        // category names map to grouped product-name lists
        List<Order> orders = List.of(
                new Order("book", "education", 899),
                new Order("pen", "education", 99),
                new Order("mouse", "electronics", 1599),
                new Order("keyboard", "electronics", 2499),
                new Order("notebook", "education", 199)
        );

        Map<String, List<String>> productNamesByCategory = groupProductNamesByCategory(orders);

        System.out.println("Example 2: groupingBy");
        System.out.println("orders = " + orders);
        System.out.println("productNamesByCategory = " + productNamesByCategory);
        System.out.println("What to notice: groupingBy creates a Map where each key holds matching values.");
        System.out.println("Senior note: collectors make aggregation intent explicit, which is easier to review than hand-built mutable maps.");
        System.out.println();
    }

    private static void partitioningByExample() {
        // Expected output:
        // passing scores go to true, failing scores go to false
        List<Integer> scores = List.of(91, 48, 77, 63, 39, 88);

        Map<Boolean, List<Integer>> scoresByPassStatus = partitionScores(scores, 60);

        System.out.println("Example 3: partitioningBy");
        System.out.println("scores = " + scores);
        System.out.println("scoresByPassStatus = " + scoresByPassStatus);
        System.out.println("What to notice: partitioningBy always creates two groups, true and false.");
        System.out.println();
    }

    private static void summarizingExample() {
        // Expected output:
        // count, sum, min, max, average, and joinedNames all print from the order list
        List<Order> orders = List.of(
                new Order("book", "education", 899),
                new Order("pen", "education", 99),
                new Order("mouse", "electronics", 1599),
                new Order("keyboard", "electronics", 2499),
                new Order("notebook", "education", 199)
        );

        IntSummaryStatistics summary = summarizePrices(orders);
        String joinedNames = joinNames(orders);

        System.out.println("Example 4: summarizingInt and joining");
        System.out.println("count = " + summary.getCount());
        System.out.println("sum = " + summary.getSum());
        System.out.println("min = " + summary.getMin());
        System.out.println("max = " + summary.getMax());
        System.out.println("average = " + summary.getAverage());
        System.out.println("joinedNames = " + joinedNames);
        System.out.println("What to notice: collectors can calculate statistics and combine values in one readable pipeline.");
        System.out.println();
    }

    private static void pitfalls() {
        System.out.println("Common mistakes:");
        System.out.println("- using groupingBy when partitioningBy would express the intent more clearly");
        System.out.println("- forgetting that toSet does not preserve duplicates");
        System.out.println("- collecting into a map without handling duplicate keys");
        System.out.println("- writing a stream pipeline when a simple loop is easier to read");
        System.out.println();
    }

    private static void examTrap() {
        System.out.println("OCJP trap:");
        System.out.println("Collectors.joining works on a stream of CharSequence values, not directly on numbers.");
        System.out.println("Collectors.toMap can fail with duplicate keys unless you provide a merge function.");
        System.out.println();
    }

    private static void interviewQuestion() {
        List<Order> orders = List.of(
                new Order("book", "education", 899),
                new Order("mouse", "electronics", 1599),
                new Order("notebook", "education", 199)
        );

        Map<String, Integer> totalPriceByCategory = totalPriceByCategory(orders);

        System.out.println("Interview Q&A:");
        System.out.println("Q: When is groupingBy better than toMap?");
        System.out.println("A: groupingBy is better when multiple values naturally belong to the same key.");
        System.out.println("Example answer structure: totalPriceByCategory = " + totalPriceByCategory);
        System.out.println();
    }

    private static void exercise() {
        System.out.println("Exercise:");
        System.out.println("From orders in categories education and electronics, build a map of category -> number of products.");
        System.out.println("Try solving it with groupingBy and counting.");
        System.out.println();
    }

    private static void solution() {
        List<Order> orders = List.of(
                new Order("book", "education", 899),
                new Order("pen", "education", 99),
                new Order("mouse", "electronics", 1599),
                new Order("keyboard", "electronics", 2499),
                new Order("notebook", "education", 199)
        );

        Map<String, Long> productCountByCategory = countProductsByCategory(orders);

        System.out.println("Solution:");
        System.out.println("productCountByCategory = " + productCountByCategory);
        System.out.println("Why this is good: groupingBy defines the key, and counting clearly expresses the final result.");
    }

    static List<String> uppercaseCategories(List<String> categories) {
        return categories.stream()
                .map(String::toUpperCase)
                .collect(java.util.stream.Collectors.toList());
    }

    static Set<String> uniqueUppercaseCategories(List<String> categories) {
        return categories.stream()
                .map(String::toUpperCase)
                .collect(java.util.stream.Collectors.toSet());
    }

    static Map<String, List<String>> groupProductNamesByCategory(List<Order> orders) {
        return orders.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        Order::category,
                        java.util.stream.Collectors.mapping(
                                Order::name,
                                java.util.stream.Collectors.toList()
                        )
                ));
    }

    static Map<Boolean, List<Integer>> partitionScores(List<Integer> scores, int passingScore) {
        return scores.stream()
                .collect(java.util.stream.Collectors.partitioningBy(score -> score >= passingScore));
    }

    static IntSummaryStatistics summarizePrices(List<Order> orders) {
        return orders.stream()
                .collect(java.util.stream.Collectors.summarizingInt(Order::priceInCents));
    }

    static String joinNames(List<Order> orders) {
        return orders.stream()
                .map(Order::name)
                .collect(java.util.stream.Collectors.joining(", "));
    }

    static Map<String, Integer> totalPriceByCategory(List<Order> orders) {
        return orders.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        Order::category,
                        java.util.stream.Collectors.summingInt(Order::priceInCents)
                ));
    }

    static Map<String, Long> countProductsByCategory(List<Order> orders) {
        return orders.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        Order::category,
                        java.util.stream.Collectors.counting()
                ));
    }

    record Order(String name, String category, int priceInCents) {}
}
