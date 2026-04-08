# Reasoning About Time And Space Learning Kit

## Problem

This chapter shows what breaks when reasoning about time and space is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java)

What to observe:

- Which topic shows the failure first: [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java).
- Which topic narrows the rule: [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java).
- Which topic shows the cleaner abstraction: [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java).

## Improvement

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

After this chapter, you should be able to explain why Reasoning About Time And Space exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The chapter keeps the same learning loop: run, observe, change one thing, and compare.
- The real pressure stays the same even when the API changes.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.

## Rule

👉 Rule: Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Try this

- Run [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) and note the first thing that breaks.
- Run [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) and write down what the rule becomes.
- Run [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) and compare the result with the naive approach.
