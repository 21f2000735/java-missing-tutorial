# Optional Learning Kit

## Problem

This chapter shows what breaks when optional is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [Choosing Optional Boundaries](topics/choosing_optional_boundaries/ChoosingOptionalBoundaries.java)
2. Run [Optional Correct Usage](topics/optional_correct_usage/OptionalCorrectUsage.java)
3. Run [Representing Optional Values](topics/representing_optional_values/RepresentingOptionalValues.java)
4. Run [Transforming Optional Values](topics/transforming_optional_values/TransformingOptionalValues.java)

What to observe:

- Which topic shows the failure first: [Choosing Optional Boundaries](topics/choosing_optional_boundaries/ChoosingOptionalBoundaries.java).
- Which topic narrows the rule: [Representing Optional Values](topics/representing_optional_values/RepresentingOptionalValues.java).
- Which topic shows the cleaner abstraction: [Transforming Optional Values](topics/transforming_optional_values/TransformingOptionalValues.java).

## Improvement

After this chapter, you can explain the rule behind optional and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Optional exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Choosing Optional Boundaries](topics/choosing_optional_boundaries/ChoosingOptionalBoundaries.java) and note the first thing that breaks.
- Run [Representing Optional Values](topics/representing_optional_values/RepresentingOptionalValues.java) and write down what the rule becomes.
- Run [Transforming Optional Values](topics/transforming_optional_values/TransformingOptionalValues.java) and compare the result with the naive approach.
