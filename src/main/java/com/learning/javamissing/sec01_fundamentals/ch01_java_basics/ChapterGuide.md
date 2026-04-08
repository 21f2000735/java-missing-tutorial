# Java Basics Learning Kit

## Problem

This chapter shows what breaks when java basics is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- arithmetic on `byte`, `short`, and `char` promotes to `int`
- `switch` coverage rules matter
- Java is pass-by-value, even for object references

## Fix

Run the topics in this order:

1. Run [Designing Small Methods](topics/designing_small_methods/DesigningSmallMethods.java)
2. Run [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java)
3. Run [Storing And Naming Values](topics/storing_and_naming_values/StoringAndNamingValues.java)

What to observe:

- Which topic shows the failure first: [Designing Small Methods](topics/designing_small_methods/DesigningSmallMethods.java).
- Which topic narrows the rule: [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java).
- Which topic shows the cleaner abstraction: [Storing And Naming Values](topics/storing_and_naming_values/StoringAndNamingValues.java).

## Improvement

After this chapter, you should be able to explain the main decisions behind java basics and connect them back to the runnable examples.

After this chapter, you should be able to explain why Java Basics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: After this chapter, you should be able to explain the main decisions behind java basics and connect them back to the runnable examples.

## Try this

- Run [Designing Small Methods](topics/designing_small_methods/DesigningSmallMethods.java) and note the first thing that breaks.
- Run [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java) and write down what the rule becomes.
- Run [Storing And Naming Values](topics/storing_and_naming_values/StoringAndNamingValues.java) and compare the result with the naive approach.
