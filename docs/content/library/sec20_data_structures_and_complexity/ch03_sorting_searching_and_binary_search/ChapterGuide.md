# Sorting Searching And Binary Search Learning Kit

## Problem

Sorting costs work upfront, so the decision is only good when later operations benefit from the order.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Sorting Tradeoffs: Sorting costs work upfront, so the decision is only good when later operations benefit from the order.
- Using Binary Search Correctly: It is one of the clearest examples of how sorted data changes search cost.

## Fix

Run the topics in this order:

1. Run [Sorting Tradeoffs](topics/sorting_tradeoffs/SortingTradeoffs.java)
2. Run [Using Binary Search Correctly](topics/using_binary_search_correctly/UsingBinarySearchCorrectly.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: binary search");
        System.out.println("Problem: repeated lookups on sorted data should not scan every value.");
        System.out.println();

        List<Integer> sortedInvoiceIds = List.of(101, 105, 110, 118, 130, 144, 156);

        // Expected output:
        // foundIndex = 3
        System.out.println("foundIndex = " + binarySearch(sortedInvoiceIds, 118));
        System.out.println("Why it works: each comparison removes half of the remaining search space.");
        System.out.println("Common mistake: applying binary search to unsorted data.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- binary search only works on sorted data");
        System.out.println("- each step removes half the remaining search space");
        System.out.println("- the return value is an index, not the item itself");
    }
```

What happens:

- Problem: repeated lookups on sorted data should not scan every value.
- Why it works: each comparison removes half of the remaining search space.
- Common mistake: applying binary search to unsorted data.

Why it matters:

It is one of the clearest examples of how sorted data changes search cost.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: binary search");
        System.out.println("Problem: repeated lookups on sorted data should not scan every value.");
        System.out.println();

        List<Integer> sortedInvoiceIds = List.of(101, 105, 110, 118, 130, 144, 156);

        // Expected output:
        // foundIndex = 3
        System.out.println("foundIndex = " + binarySearch(sortedInvoiceIds, 118));
        System.out.println("Why it works: each comparison removes half of the remaining search space.");
        System.out.println("Common mistake: applying binary search to unsorted data.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- binary search only works on sorted data");
        System.out.println("- each step removes half the remaining search space");
        System.out.println("- the return value is an index, not the item itself");
    }
```

What happens:

- Problem: repeated lookups on sorted data should not scan every value.
- Why it works: each comparison removes half of the remaining search space.
- Common mistake: applying binary search to unsorted data.

Why it matters:

It is one of the clearest examples of how sorted data changes search cost.

After this chapter, you should be able to explain why Sorting Searching And Binary Search exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Sorting Tradeoffs](topics/sorting_tradeoffs/SortingTradeoffs.java), [Using Binary Search Correctly](topics/using_binary_search_correctly/UsingBinarySearchCorrectly.java), and [Using Binary Search Correctly](topics/using_binary_search_correctly/UsingBinarySearchCorrectly.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Sorting Tradeoffs](topics/sorting_tradeoffs/SortingTradeoffs.java) starts with the raw behavior, [Using Binary Search Correctly](topics/using_binary_search_correctly/UsingBinarySearchCorrectly.java) adds the safety rule, and [Using Binary Search Correctly](topics/using_binary_search_correctly/UsingBinarySearchCorrectly.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Compare the target to the middle, then throw away half the remaining search space each step.

## Try this

- Run [Sorting Tradeoffs](topics/sorting_tradeoffs/SortingTradeoffs.java) and note the first thing that breaks.
- Run [Using Binary Search Correctly](topics/using_binary_search_correctly/UsingBinarySearchCorrectly.java) and remove the safety rule or coordination step.
- Run [Using Binary Search Correctly](topics/using_binary_search_correctly/UsingBinarySearchCorrectly.java) and compare the result with the naive approach.
