# Structured Concurrency Learning Kit

## Learning Path

1. Step 1: Start with [Choosing First Successful Result](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java) to see the raw behavior.
2. Step 2: Try [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java) to see the naive approach.
3. Step 3: Watch [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java) to find the failure.
4. Step 4: Use [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java) to restore correctness.
5. Step 5: Finish with [Keeping Child Tasks Inside One Request](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java) to see the improvement.

## Problem

This chapter shows what breaks when structured concurrency is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Collecting Results From Child Tasks: Some workflows are incomplete until every required subtask succeeds.

## Fix

Run the topics in this order:

1. Run [Choosing First Successful Result](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java)
2. Run [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java)
3. Run [Keeping Child Tasks Inside One Request](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java)

Example:

```java
    public static void main(String[] args) throws Exception {
        explainWhy();
        runDashboardExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- some workflows require every child result");
        System.out.println("- result handling policy should be explicit at the scope boundary");
        System.out.println("- success and failure should be read as one operation outcome");
    }
```

What happens:

- Why it works: the joiner waits until all required child tasks succeed.
- Use this when: the workflow truly needs every result.
- Avoid this when: one successful answer is enough and slower siblings should stop.

Why it matters:

Some workflows are incomplete until every required subtask succeeds.

## Improvement

Example:

```java
    public static void main(String[] args) throws Exception {
        explainWhy();
        runProfileRequestExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- child tasks belong to one parent operation");
        System.out.println("- joining inside one scope keeps lifetime easier to reason about");
        System.out.println("- structured concurrency is about ownership, not just parallel execution");
    }
```

What happens:

- Real-world problem: a profile page request needs account data and notification status together.
- Mental model: if tasks belong to one request, their lifetime should stay inside one scope.
- Why it works: both subtasks stay tied to one parent request scope.

Why it matters:

After this chapter, you can explain the rule behind structured concurrency and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Structured Concurrency exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Choosing First Successful Result](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java), [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java), and [Keeping Child Tasks Inside One Request](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Choosing First Successful Result](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java) starts with the raw behavior, [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java) adds the safety rule, and [Keeping Child Tasks Inside One Request](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java) moves to the cleaner abstraction.

## Rule

👉 Rule: If the screen needs both pieces, the whole operation is incomplete until both succeed.

## Try this

- Run [Choosing First Successful Result](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java) and note the first thing that breaks.
- Run [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java) and remove the safety rule or coordination step.
- Run [Keeping Child Tasks Inside One Request](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java) and compare the result with the naive approach.
