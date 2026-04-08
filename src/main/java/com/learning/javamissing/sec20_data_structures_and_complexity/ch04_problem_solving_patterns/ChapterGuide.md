# Problem Solving Patterns Learning Kit

## Why This Chapter Exists

Many brute-force solutions repeat work they do not need to repeat:

- recalculate every overlapping window from scratch
- scan the same sorted data with nested loops

Sliding window and two pointers are valuable because they reduce repeated work without making the code magical.

## The Pain Before It

Many brute-force solutions repeat work they do not need to repeat:

- recalculate every overlapping window from scratch
- scan the same sorted data with nested loops

Sliding window and two pointers are valuable because they reduce repeated work without making the code magical.

## Java Creator Mindset

- sliding window reuses work from the previous range
- two pointers exploit sorted order to remove nested loops
- these patterns matter because they turn repeated recalculation into incremental progress

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| brute-force subarray scan | the data is tiny and clarity is more important | windows overlap heavily and repeated recalculation dominates |
| nested loops on sorted data | the size is tiny | the data is sorted and a left/right scan can shrink work |

## Why It Breaks

That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Final Java Direction

- sliding window reuses work from the previous range
- two pointers exploit sorted order to remove nested loops
- these patterns matter because they turn repeated recalculation into incremental progress

## Study Order

1. Run [Scanning Sorted Data With Two Pointers](topics/scanning_sorted_data_with_two_pointers/ScanningSortedDataWithTwoPointers.java)
2. Run [Sliding Window Problems](topics/sliding_window_problems/SlidingWindowProblems.java)

## What To Notice

### Compare With

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| brute-force subarray scan | the data is tiny and clarity is more important | windows overlap heavily and repeated recalculation dominates |
| nested loops on sorted data | the size is tiny | the data is sorted and a left/right scan can shrink work |

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## Tradeoffs

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| brute-force subarray scan | the data is tiny and clarity is more important | windows overlap heavily and repeated recalculation dominates |
| nested loops on sorted data | the size is tiny | the data is sorted and a left/right scan can shrink work |

## Use / Avoid

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
