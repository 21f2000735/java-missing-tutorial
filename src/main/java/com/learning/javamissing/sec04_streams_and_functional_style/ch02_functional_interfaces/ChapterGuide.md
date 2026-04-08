# Functional Interfaces Learning Kit

## Problem

This chapter exists because stream-style Java only feels natural once “passing behavior as data” stops feeling strange.

## Naive Approach

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Failure

- one small private method is enough
- the behavior is not really meant to vary
- introducing a functional interface makes the code harder to explain than before

## Fix

Run the topics in this order:

1. Run [Defining Functions](topics/defining_functions/DefiningFunctions.java)

What to observe:

- Which topic shows the failure first: [Defining Functions](topics/defining_functions/DefiningFunctions.java).
- Which topic narrows the rule: [Defining Functions](topics/defining_functions/DefiningFunctions.java).
- Which topic shows the cleaner abstraction: [Defining Functions](topics/defining_functions/DefiningFunctions.java).

## Improvement

Read the chapter as a small set of related ideas around functional Interfaces, not as isolated trivia.

After this chapter, you should be able to explain why Functional Interfaces exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Read the chapter as a small set of related ideas around functional Interfaces, not as isolated trivia.

## Try this

- Run [Defining Functions](topics/defining_functions/DefiningFunctions.java) and note the first thing that breaks.
- Run [Defining Functions](topics/defining_functions/DefiningFunctions.java) and write down what the rule becomes.
- Run [Defining Functions](topics/defining_functions/DefiningFunctions.java) and compare the result with the naive approach.
