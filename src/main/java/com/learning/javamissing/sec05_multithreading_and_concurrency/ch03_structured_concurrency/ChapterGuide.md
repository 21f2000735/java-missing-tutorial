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

1. Run [Choosing First Successful Result](topics/choosing_first_successful_result/ChoosingFirstSuccessfulResult.java)
2. Run [Collecting Results From Child Tasks](topics/collecting_results_from_child_tasks/CollectingResultsFromChildTasks.java)
3. Run [Keeping Child Tasks Inside One Request](topics/keeping_child_tasks_inside_one_request/KeepingChildTasksInsideOneRequest.java)

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

## Next Chapter

Move to [Scoped Values Learning Kit](../ch04_scoped_values/ChapterGuide.md) after this chapter.
