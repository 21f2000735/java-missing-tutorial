# Structured Concurrency Learning Kit

## Problem

This chapter teaches a design idea first: related tasks should live and die together.

## Naive Approach

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Failure

- tasks are truly independent long-lived jobs
- you are not ready to track JDK preview changes for this API

## Fix

Run the topics in this order:

1. Run [Choosing First Successful Result](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java)
2. Run [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java)
3. Run [Keeping Child Tasks Inside One Request](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java)

What to observe:

- Which topic shows the failure first: [Choosing First Successful Result](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java).
- Which topic narrows the rule: [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java).
- Which topic shows the cleaner abstraction: [Keeping Child Tasks Inside One Request](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java).

## Improvement

Read the chapter as a small set of related ideas around structured Concurrency, not as isolated trivia.

After this chapter, you should be able to explain why Structured Concurrency exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Read the chapter as a small set of related ideas around structured Concurrency, not as isolated trivia.

## Try this

- Run [Choosing First Successful Result](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java) and note the first thing that breaks.
- Run [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java) and write down what the rule becomes.
- Run [Keeping Child Tasks Inside One Request](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java) and compare the result with the naive approach.
