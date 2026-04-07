# Problem Solving Patterns Learning Kit

## Why This Chapter Matters

Many brute-force solutions repeat work they do not need to repeat:

- recalculate every overlapping window from scratch
- scan the same sorted data with nested loops

Sliding window and two pointers are valuable because they reduce repeated work without making the code magical.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

Many brute-force solutions repeat work they do not need to repeat:

- recalculate every overlapping window from scratch
- scan the same sorted data with nested loops

Sliding window and two pointers are valuable because they reduce repeated work without making the code magical.

## Core Ideas

- sliding window reuses work from the previous range
- two pointers exploit sorted order to remove nested loops
- these patterns matter because they turn repeated recalculation into incremental progress

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [SlidingWindowProblems.java](topics/sliding_window_problems/SlidingWindowProblems.java)
2. Run [ScanningSortedDataWithTwoPointers.java](topics/scanning_sorted_data_with_two_pointers/ScanningSortedDataWithTwoPointers.java)

## What To Notice

### Compare With

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| brute-force subarray scan | the data is tiny and clarity is more important | windows overlap heavily and repeated recalculation dominates |
| nested loops on sorted data | the size is tiny | the data is sorted and a left/right scan can shrink work |

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

### Mini Case Study

Imagine two analytics tasks.

- find the best three-hour sales window
- find two prices in a sorted list that match a target budget

Both tasks look like nested-loop problems at first. Both become simpler when you recognize the right scanning pattern.

## Summary

- sliding window reuses work from the previous range
- two pointers exploit sorted order to remove nested loops
- these patterns matter because they turn repeated recalculation into incremental progress

## What Problem This Chapter Solves

Many brute-force solutions repeat work they do not need to repeat:

- recalculate every overlapping window from scratch
- scan the same sorted data with nested loops

Sliding window and two pointers are valuable because they reduce repeated work without making the code magical.

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
