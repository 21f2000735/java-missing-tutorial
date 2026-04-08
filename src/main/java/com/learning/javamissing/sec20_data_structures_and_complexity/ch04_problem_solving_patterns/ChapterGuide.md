# Problem Solving Patterns Learning Kit

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

Sorted data often lets you avoid nested loops if you scan from both sides intelligently.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Scanning Sorted Data With Two Pointers: Sorted data often lets you avoid nested loops if you scan from both sides intelligently.
- Sliding Window Problems: Many range problems recalculate overlapping work from scratch even though most of the window stays the same.

## Fix

Run the topics in this order:

1. Run [Scanning Sorted Data With Two Pointers](topics/scanning_sorted_data_with_two_pointers/ScanningSortedDataWithTwoPointers.java)
2. Run [Sliding Window Problems](topics/sliding_window_problems/SlidingWindowProblems.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: sliding window");
        System.out.println("Problem: recalculating every overlapping range from scratch wastes work.");
        System.out.println();

        int[] hourlyOrders = {3, 5, 2, 6, 8, 1, 4};

        // Expected output:
        // bestThreeHourWindow = 16
        System.out.println("bestThreeHourWindow = " + maxWindowSum(hourlyOrders, 3));
        System.out.println("Why it works: each step reuses the previous window by adding one value and removing one value.");
        System.out.println("Common mistake: using sliding window when the problem does not actually involve overlapping ranges.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- sliding window reuses work from the previous range");
        System.out.println("- you add the incoming value and remove the outgoing value");
        System.out.println("- this turns many O(n*k) loops into O(n)");
    }
```

What happens:

- Problem: recalculating every overlapping range from scratch wastes work.
- Why it works: each step reuses the previous window by adding one value and removing one value.
- Common mistake: using sliding window when the problem does not actually involve overlapping ranges.

Why it matters:

Many range problems recalculate overlapping work from scratch even though most of the window stays the same.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: sliding window");
        System.out.println("Problem: recalculating every overlapping range from scratch wastes work.");
        System.out.println();

        int[] hourlyOrders = {3, 5, 2, 6, 8, 1, 4};

        // Expected output:
        // bestThreeHourWindow = 16
        System.out.println("bestThreeHourWindow = " + maxWindowSum(hourlyOrders, 3));
        System.out.println("Why it works: each step reuses the previous window by adding one value and removing one value.");
        System.out.println("Common mistake: using sliding window when the problem does not actually involve overlapping ranges.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- sliding window reuses work from the previous range");
        System.out.println("- you add the incoming value and remove the outgoing value");
        System.out.println("- this turns many O(n*k) loops into O(n)");
    }
```

What happens:

- Problem: recalculating every overlapping range from scratch wastes work.
- Why it works: each step reuses the previous window by adding one value and removing one value.
- Common mistake: using sliding window when the problem does not actually involve overlapping ranges.

Why it matters:

Many range problems recalculate overlapping work from scratch even though most of the window stays the same.

After this chapter, you should be able to explain why Problem Solving Patterns exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Scanning Sorted Data With Two Pointers](topics/scanning_sorted_data_with_two_pointers/ScanningSortedDataWithTwoPointers.java), [Sliding Window Problems](topics/sliding_window_problems/SlidingWindowProblems.java), and [Sliding Window Problems](topics/sliding_window_problems/SlidingWindowProblems.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Scanning Sorted Data With Two Pointers](topics/scanning_sorted_data_with_two_pointers/ScanningSortedDataWithTwoPointers.java) starts with the raw behavior, [Sliding Window Problems](topics/sliding_window_problems/SlidingWindowProblems.java) adds the safety rule, and [Sliding Window Problems](topics/sliding_window_problems/SlidingWindowProblems.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep one moving window, add the incoming value, and remove the outgoing value.

## Try this

- Run [Scanning Sorted Data With Two Pointers](topics/scanning_sorted_data_with_two_pointers/ScanningSortedDataWithTwoPointers.java) and note the first thing that breaks.
- Run [Sliding Window Problems](topics/sliding_window_problems/SlidingWindowProblems.java) and remove the safety rule or coordination step.
- Run [Sliding Window Problems](topics/sliding_window_problems/SlidingWindowProblems.java) and compare the result with the naive approach.
