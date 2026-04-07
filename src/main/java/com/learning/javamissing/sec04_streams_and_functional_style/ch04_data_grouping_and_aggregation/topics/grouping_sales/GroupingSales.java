package com.learning.javamissing.sec04_streams_and_functional_style.ch04_data_grouping_and_aggregation.topics.grouping_sales;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Concept: Grouping Sales
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * decision makers need grouped facts, not only raw rows.
 *
 * Real-world setup:
 * This topic uses sales totals and grouped summaries to make the concept easier to understand.
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

public class GroupingSales {
    public static void main(String[] args) {
        List<Sale> sales = List.of(
                new Sale("Books", 899),
                new Sale("Books", 499),
                new Sale("Electronics", 1_599)
        );

        Map<String, Integer> totalsByCategory = sales.stream()
                .collect(Collectors.groupingBy(Sale::category, Collectors.summingInt(Sale::amountInCents)));

        System.out.println("totalsByCategory = " + totalsByCategory);
        System.out.println("Concept: grouping helps teams read totals by business dimension, not raw rows.");
    }

    record Sale(String category, int amountInCents) {}
}
