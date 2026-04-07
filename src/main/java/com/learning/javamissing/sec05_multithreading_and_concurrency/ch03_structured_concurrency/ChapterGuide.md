# Structured Concurrency Learning Kit

## Why This Chapter Exists

This chapter teaches a design idea first: related tasks should live and die together.

## The Pain Before It

Many request flows need multiple subtasks:

- fetch user profile
- fetch plan
- fetch recommendations

If those tasks are scattered across futures and helpers, they can outlive the request, fail independently, or keep running after their result is no longer useful. Structured concurrency keeps them inside one parent scope.

## Java Creator Mindset

Read the chapter as a small set of related ideas around structured Concurrency, not as isolated trivia.

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

- tasks are truly independent long-lived jobs
- you are not ready to track JDK preview changes for this API

## Final Java Direction

Read the chapter as a small set of related ideas around structured Concurrency, not as isolated trivia.

## Study Order

1. Run [KeepingChildTasksInsideOneRequest.java](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java)
2. Run [CollectingResultsFromChildTasks.java](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java)
3. Run [ChoosingFirstSuccessfulResult.java](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java)

## What To Notice

- task lifetime belongs to the parent operation
- “need all results” and “need first success” are different business decisions
- cancellation and failure policy should be explicit where tasks are launched

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

- tasks are truly independent long-lived jobs
- you are not ready to track JDK preview changes for this API

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

### Use It When

- several tasks belong to one request or workflow
- task cancellation should follow request cancellation
- failure handling should stay local and readable

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

After this chapter, you should be able to explain the main decisions behind structured concurrency and connect them back to the runnable examples.

## Why This Chapter Matters

This chapter teaches a design idea first: related tasks should live and die together.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

Many request flows need multiple subtasks:

- fetch user profile
- fetch plan
- fetch recommendations

If those tasks are scattered across futures and helpers, they can outlive the request, fail independently, or keep running after their result is no longer useful. Structured concurrency keeps them inside one parent scope.

## Core Ideas

Read the chapter as a small set of related ideas around structured Concurrency, not as isolated trivia.

## When To Use / When Not To Use

### Use It When

- several tasks belong to one request or workflow
- task cancellation should follow request cancellation
- failure handling should stay local and readable

## The Problem

Many request flows need multiple subtasks:

- fetch user profile
- fetch plan
- fetch recommendations

If those tasks are scattered across futures and helpers, they can outlive the request, fail independently, or keep running after their result is no longer useful. Structured concurrency keeps them inside one parent scope.

## Run This First

1. Run [KeepingChildTasksInsideOneRequest.java](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java)
2. Run [CollectingResultsFromChildTasks.java](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java)
3. Run [ChoosingFirstSuccessfulResult.java](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java)

## What To Look For

- task lifetime belongs to the parent operation
- “need all results” and “need first success” are different business decisions
- cancellation and failure policy should be explicit where tasks are launched

## Use This Chapter When

- several tasks belong to one request or workflow
- task cancellation should follow request cancellation
- failure handling should stay local and readable

## Avoid This Approach When

- tasks are truly independent long-lived jobs
- you are not ready to track JDK preview changes for this API

## Version Note

These examples use the Java 25 preview form of `StructuredTaskScope`. Match the JDK and preview flags when you run them.

## Next Chapter

Move to `ch04_scoped_values` to see how request-scoped context can travel safely through the same kind of structured execution tree.
