# Structured Concurrency Learning Kit

This chapter teaches a design idea first: related tasks should live and die together.

## The Problem

Many request flows need multiple subtasks:

- fetch user profile
- fetch plan
- fetch recommendations

If those tasks are scattered across futures and helpers, they can outlive the request, fail independently, or keep running after their result is no longer useful. Structured concurrency keeps them inside one parent scope.

## Run This First

1. Run [KeepingChildTasksInsideOneRequest.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch03_structured_concurrency/topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java)
2. Run [CollectingResultsFromChildTasks.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch03_structured_concurrency/topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java)
3. Run [ChoosingFirstSuccessfulResult.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch03_structured_concurrency/topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java)

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
