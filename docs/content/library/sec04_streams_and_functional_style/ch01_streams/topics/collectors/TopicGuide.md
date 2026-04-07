---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
---

# Collectors

## Why This Exists

Filtering and mapping are only half the story.

## The Pain Before It

Filtering and mapping are only half the story.

Most business code eventually wants a final result like:

- a grouped map
- a count
- a summary
- a joined string
- a partitioned result

That is where many stream users get stuck.

## Java Creator Mindset

Use the collector that matches the final result shape:

- `toList()` when order matters
- `toSet()` when uniqueness matters
- `groupingBy(...)` when many values belong to one key
- `partitioningBy(...)` when the answer is naturally yes/no
- `summarizingInt(...)` when you need count, sum, min, max, and average together

## How You Might Invent It

Use the collector that matches the final result shape:

## Naive Attempt

Two common mistakes:

- using `toMap()` when duplicate keys are possible
- building complex mutable maps by hand when the collector already expresses the intent

## Why It Breaks

Two common mistakes:

- using `toMap()` when duplicate keys are possible
- building complex mutable maps by hand when the collector already expresses the intent

## Final Java Solution

Use the collector that matches the final result shape:

- `toList()` when order matters
- `toSet()` when uniqueness matters
- `groupingBy(...)` when many values belong to one key
- `partitioningBy(...)` when the answer is naturally yes/no
- `summarizingInt(...)` when you need count, sum, min, max, and average together

## Code

### Run It

Run the example and focus on four shapes:

- list/set output
- grouped map output
- true/false partition output
- summary output

### Expected Result

- uppercase category names in list and set form
- grouped product names by category
- pass/fail partition for scores
- summary statistics for order prices

## Walkthrough

Collectors make the *shape of the answer* explicit.

That improves readability because a reviewer can often understand the result structure without reading low-level mutation code.

## Mental Model

| Need | Collector |
| --- | --- |
| Keep all values in a list | `toList()` |
| Remove duplicates | `toSet()` |
| Group many values by key | `groupingBy(...)` |
| Split into true/false groups | `partitioningBy(...)` |
| Count per group | `groupingBy(..., counting())` |
| Summarize numeric values | `summarizingInt(...)` |

## Mistakes

Two common mistakes:

- using `toMap()` when duplicate keys are possible
- building complex mutable maps by hand when the collector already expresses the intent

## Tradeoffs

| Need | Collector |
| --- | --- |
| Keep all values in a list | `toList()` |
| Remove duplicates | `toSet()` |
| Group many values by key | `groupingBy(...)` |
| Split into true/false groups | `partitioningBy(...)` |
| Count per group | `groupingBy(..., counting())` |
| Summarize numeric values | `summarizingInt(...)` |

The useful question is not “are collectors fast?”

The useful question is:

“Does this collector express the result clearly enough that the code is easy to trust and review?”

Performance concerns usually come later:

- unnecessary intermediate allocations
- expensive mapping logic
- poor key choice for grouping

If the code becomes hard to explain, simplify it before arguing about micro-performance.

## Use / Avoid

### Use It When

- the final result has a clear structure
- grouping, counting, partitioning, or summarizing is the main goal

### Avoid It When

- a plain loop is much easier to explain
- duplicate-key behavior is unclear and unhandled

## Summary

- collectors describe the final result shape of a stream
- `groupingBy` and `partitioningBy` solve different kinds of result grouping
- `toMap()` needs extra care when duplicate keys are possible

## Why This Matters

Filtering and mapping are only half the story.

## Intuition

Use the collector that matches the final result shape:

## Problem Statement

Filtering and mapping are only half the story.

Most business code eventually wants a final result like:

- a grouped map
- a count
- a summary
- a joined string
- a partitioned result

That is where many stream users get stuck.

## Core Idea

Use the collector that matches the final result shape:

- `toList()` when order matters
- `toSet()` when uniqueness matters
- `groupingBy(...)` when many values belong to one key
- `partitioningBy(...)` when the answer is naturally yes/no
- `summarizingInt(...)` when you need count, sum, min, max, and average together

## Simple Example

### Run It

Run the example and focus on four shapes:

- list/set output
- grouped map output
- true/false partition output
- summary output

### Expected Result

- uppercase category names in list and set form
- grouped product names by category
- pass/fail partition for scores
- summary statistics for order prices

## Step-by-Step Working

Collectors make the *shape of the answer* explicit.

That improves readability because a reviewer can often understand the result structure without reading low-level mutation code.

## Rules / Syntax

- Prefer the smallest correct rule over cleverness.
- Connect the rule back to the runnable example.

## Common Mistakes

Two common mistakes:

- using `toMap()` when duplicate keys are possible
- building complex mutable maps by hand when the collector already expresses the intent

## When To Use / When Not To Use

### Use It When

- the final result has a clear structure
- grouping, counting, partitioning, or summarizing is the main goal

### Avoid It When

- a plain loop is much easier to explain
- duplicate-key behavior is unclear and unhandled

## Practice

Change one part of the runnable example, rerun it, and explain whether collectors still behaves the way you expected.

### After That

Return to the stream pipeline topic if the full filter-map-collect flow still feels unclear, then compare streams with loops in the compare guide.

## The Problem

Filtering and mapping are only half the story.

Most business code eventually wants a final result like:

- a grouped map
- a count
- a summary
- a joined string
- a partitioned result

That is where many stream users get stuck.

## Run This Code

Run the example and focus on four shapes:

- list/set output
- grouped map output
- true/false partition output
- summary output

## Expected Output

- uppercase category names in list and set form
- grouped product names by category
- pass/fail partition for scores
- summary statistics for order prices

## ❌ Bad Code

Two common mistakes:

- using `toMap()` when duplicate keys are possible
- building complex mutable maps by hand when the collector already expresses the intent

## ✅ Better Code

Use the collector that matches the final result shape:

- `toList()` when order matters
- `toSet()` when uniqueness matters
- `groupingBy(...)` when many values belong to one key
- `partitioningBy(...)` when the answer is naturally yes/no
- `summarizingInt(...)` when you need count, sum, min, max, and average together

## Why This Works

Collectors make the *shape of the answer* explicit.

That improves readability because a reviewer can often understand the result structure without reading low-level mutation code.

## Comparison Snapshot

| Need | Collector |
| --- | --- |
| Keep all values in a list | `toList()` |
| Remove duplicates | `toSet()` |
| Group many values by key | `groupingBy(...)` |
| Split into true/false groups | `partitioningBy(...)` |
| Count per group | `groupingBy(..., counting())` |
| Summarize numeric values | `summarizingInt(...)` |

## Performance Lens

The useful question is not “are collectors fast?”

The useful question is:

“Does this collector express the result clearly enough that the code is easy to trust and review?”

Performance concerns usually come later:

- unnecessary intermediate allocations
- expensive mapping logic
- poor key choice for grouping

If the code becomes hard to explain, simplify it before arguing about micro-performance.

## Use This When

- the final result has a clear structure
- grouping, counting, partitioning, or summarizing is the main goal

## Avoid This When

- a plain loop is much easier to explain
- duplicate-key behavior is unclear and unhandled

## After Reading This, You Should Know

- collectors describe the final result shape of a stream
- `groupingBy` and `partitioningBy` solve different kinds of result grouping
- `toMap()` needs extra care when duplicate keys are possible

## Next Topic

Return to the stream pipeline topic if the full filter-map-collect flow still feels unclear, then compare streams with loops in the compare guide.
