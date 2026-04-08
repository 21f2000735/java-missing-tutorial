# Designing Classes Learning Kit

## Problem

This chapter teaches the concept of giving each class one clear responsibility.

## Naive Approach

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java)

What to observe:

- Which topic shows the failure first: [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java).
- Which topic narrows the rule: [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java).
- Which topic shows the cleaner abstraction: [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java).

## Improvement

Read the chapter as a small set of related ideas around designing Classes, not as isolated trivia.

After this chapter, you should be able to explain why Designing Classes exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Read the chapter as a small set of related ideas around designing Classes, not as isolated trivia.

## Try this

- Run [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) and note the first thing that breaks.
- Run [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) and write down what the rule becomes.
- Run [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) and compare the result with the naive approach.
