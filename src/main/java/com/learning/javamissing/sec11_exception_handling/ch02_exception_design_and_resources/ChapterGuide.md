# Exception Design And Resources Learning Kit

## Problem

This chapter goes beyond “catch the exception” and focuses on designing exception flow well.

## Naive Approach

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [Checked Unchecked And Custom](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java)
2. Run [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java)

What to observe:

- Which topic shows the failure first: [Checked Unchecked And Custom](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java).
- Which topic narrows the rule: [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java).
- Which topic shows the cleaner abstraction: [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java).

## Improvement

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

After this chapter, you should be able to explain why Exception Design And Resources exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

- Run [Checked Unchecked And Custom](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java) and note the first thing that breaks.
- Run [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) and write down what the rule becomes.
- Run [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) and compare the result with the naive approach.
