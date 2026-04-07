package com.learning.javamissing.sec04_streams_and_functional_style.ch04_data_grouping_and_aggregation.topics.grouping_sales;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Concept: Grouping Sales
 * Why this concept is needed:
 * Business users usually ask for summaries by category, status, or region instead of raw rows.
 *
 * What problem this solves:
 * It groups many records into totals by a business dimension.
 *
 * Real-world setup:
 * Finance wants sales totals by category.
 *
 * How to think about it:
 * First decide the grouping key, then decide the final summary for each group.
 *
 * How to code it:
 * 1. Choose the business key for grouping.
 * 2. Choose the summary operation.
 * 3. Collect the grouped result.
 *
 * Expected output:
 * totalsByCategory = {Electronics=1599, Books=1398}
 */

public class GroupingSales {
    public static void main(String[] args) {
        System.out.println("The problem:");
        System.out.println("Finance does not want every sale row. It wants totals by category.");
        System.out.println();
        List<Sale> sales = List.of(
                new Sale("Books", 899),
                new Sale("Books", 499),
                new Sale("Electronics", 1_599)
        );

        Map<String, Integer> totalsByCategory = sales.stream()
                .collect(Collectors.groupingBy(Sale::category, Collectors.summingInt(Sale::amountInCents)));

        System.out.println("Run this example:");
        System.out.println("totalsByCategory = " + totalsByCategory);
        System.out.println("Why it works: groupingBy creates one bucket per category and summingInt adds the amounts in each bucket.");
        System.out.println("Use this when: the business question starts with 'by category', 'by status', or 'by region'.");
        System.out.println("Avoid this when: the result is flat and does not need grouped summaries.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- grouping needs a business key");
        System.out.println("- aggregation needs a final summary operation");
        System.out.println("- collectors make grouped results explicit");
    }

    record Sale(String category, int amountInCents) {}
}
