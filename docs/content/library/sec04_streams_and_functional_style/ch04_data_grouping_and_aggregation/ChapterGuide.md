# Data Grouping And Aggregation Learning Kit

## Learning Path

1. Step 1: Start with [Grouping Sales](topics/grouping_sales/GroupingSales.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Grouping Sales](topics/grouping_sales/GroupingSales.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Grouping Sales](topics/grouping_sales/GroupingSales.java) to see the improvement.

## Problem

Business users usually ask for summaries by category, status, or region instead of raw rows.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Grouping Sales: Business users usually ask for summaries by category, status, or region instead of raw rows.

## Fix

Run the topics in this order:

1. Run [Grouping Sales](topics/grouping_sales/GroupingSales.java)

Example:

```java
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
```

What happens:

- Why it works: groupingBy creates one bucket per category and summingInt adds the amounts in each bucket.
- Use this when: the business question starts with 'by category', 'by status', or 'by region'.
- Avoid this when: the result is flat and does not need grouped summaries.

Why it matters:

Business users usually ask for summaries by category, status, or region instead of raw rows.

## Improvement

Example:

```java
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
```

What happens:

- Why it works: groupingBy creates one bucket per category and summingInt adds the amounts in each bucket.
- Use this when: the business question starts with 'by category', 'by status', or 'by region'.
- Avoid this when: the result is flat and does not need grouped summaries.

Why it matters:

Business users usually ask for summaries by category, status, or region instead of raw rows.

After this chapter, you should be able to explain why Data Grouping And Aggregation exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Grouping Sales](topics/grouping_sales/GroupingSales.java), [Grouping Sales](topics/grouping_sales/GroupingSales.java), and [Grouping Sales](topics/grouping_sales/GroupingSales.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Grouping Sales](topics/grouping_sales/GroupingSales.java) starts with the raw behavior, [Grouping Sales](topics/grouping_sales/GroupingSales.java) adds the safety rule, and [Grouping Sales](topics/grouping_sales/GroupingSales.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First decide the grouping key, then decide the final summary for each group.

## Try this

- Run [Grouping Sales](topics/grouping_sales/GroupingSales.java) and note the first thing that breaks.
- Run [Grouping Sales](topics/grouping_sales/GroupingSales.java) and remove the safety rule or coordination step.
- Run [Grouping Sales](topics/grouping_sales/GroupingSales.java) and compare the result with the naive approach.
