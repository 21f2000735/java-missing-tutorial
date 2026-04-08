# Classes And Objects Learning Kit

## Problem

This chapter shows what breaks when classes and objects is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [Classes Objects](topics/classes_objects/ClassesObjects.java)
2. Run [Inheritance](topics/inheritance/Inheritance.java)
3. Run [Polymorphism](topics/polymorphism/Polymorphism.java)

What to observe:

- Which topic shows the failure first: [Classes Objects](topics/classes_objects/ClassesObjects.java).
- Which topic narrows the rule: [Inheritance](topics/inheritance/Inheritance.java).
- Which topic shows the cleaner abstraction: [Polymorphism](topics/polymorphism/Polymorphism.java).

## Improvement

After this chapter, you should be able to explain the main decisions behind classes and objects and connect them back to the runnable examples.

After this chapter, you should be able to explain why Classes And Objects exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: After this chapter, you should be able to explain the main decisions behind classes and objects and connect them back to the runnable examples.

## Try this

- Run [Classes Objects](topics/classes_objects/ClassesObjects.java) and note the first thing that breaks.
- Run [Inheritance](topics/inheritance/Inheritance.java) and write down what the rule becomes.
- Run [Polymorphism](topics/polymorphism/Polymorphism.java) and compare the result with the naive approach.
