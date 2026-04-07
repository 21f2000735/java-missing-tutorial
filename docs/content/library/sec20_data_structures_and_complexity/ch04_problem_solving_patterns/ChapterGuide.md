# Problem Solving Patterns Learning Kit

This chapter collects two patterns that matter because they replace repeated work with a smarter scanning model.

## What Problem This Chapter Solves

Many brute-force solutions repeat work they do not need to repeat:

- recalculate every overlapping window from scratch
- scan the same sorted data with nested loops

Sliding window and two pointers are valuable because they reduce repeated work without making the code magical.

## Study Order

1. Run [SlidingWindowProblems.java](topics/sliding_window_problems/SlidingWindowProblems.java)
2. Run [ScanningSortedDataWithTwoPointers.java](topics/scanning_sorted_data_with_two_pointers/ScanningSortedDataWithTwoPointers.java)

## Quick Summary

- sliding window reuses work from the previous range
- two pointers exploit sorted order to remove nested loops
- these patterns matter because they turn repeated recalculation into incremental progress

## Compare With

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| brute-force subarray scan | the data is tiny and clarity is more important | windows overlap heavily and repeated recalculation dominates |
| nested loops on sorted data | the size is tiny | the data is sorted and a left/right scan can shrink work |

## Mini Case Study

Imagine two analytics tasks.

- find the best three-hour sales window
- find two prices in a sorted list that match a target budget

Both tasks look like nested-loop problems at first. Both become simpler when you recognize the right scanning pattern.

## Sources

- Grokking Algorithms: https://www.manning.com/books/grokking-algorithms-second-edition
- Grokking the Coding Interview: https://www.educative.io/courses/grokking-the-coding-interview
