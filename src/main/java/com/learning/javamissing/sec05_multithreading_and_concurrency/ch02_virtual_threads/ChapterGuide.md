# Virtual Threads Learning Kit

## Problem

This chapter is about one practical question: what changes when Java can afford a much cheaper thread-per-task model for waiting-heavy work?

## Naive Approach

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Failure

- virtual threads are not “automatic performance mode”
- they do not make CPU-bound work faster
- they do not justify long blocking inside synchronized code

## Fix

Run the topics in this order:

1. Run [Avoiding Virtual Thread Misuse](topics/avoiding_virtual_thread_misuse/AvoidingVirtualThreadMisuse.java)
2. Run [Running Tasks With Virtual Thread Executor](topics/running_tasks_with_virtual_thread_executor/RunningTasksWithVirtualThreadExecutor.java)
3. Run [Why virtual threads matter](topics/why_virtual_threads_matter/WhyVirtualThreadsMatter.java)

What to observe:

- Which topic shows the failure first: [Avoiding Virtual Thread Misuse](topics/avoiding_virtual_thread_misuse/AvoidingVirtualThreadMisuse.java).
- Which topic narrows the rule: [Running Tasks With Virtual Thread Executor](topics/running_tasks_with_virtual_thread_executor/RunningTasksWithVirtualThreadExecutor.java).
- Which topic shows the cleaner abstraction: [Why virtual threads matter](topics/why_virtual_threads_matter/WhyVirtualThreadsMatter.java).

## Improvement

Read the chapter as a small set of related ideas around virtual Threads, not as isolated trivia.

After this chapter, you should be able to explain why Virtual Threads exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Read the chapter as a small set of related ideas around virtual Threads, not as isolated trivia.

## Try this

- Run [Avoiding Virtual Thread Misuse](topics/avoiding_virtual_thread_misuse/AvoidingVirtualThreadMisuse.java) and note the first thing that breaks.
- Run [Running Tasks With Virtual Thread Executor](topics/running_tasks_with_virtual_thread_executor/RunningTasksWithVirtualThreadExecutor.java) and write down what the rule becomes.
- Run [Why virtual threads matter](topics/why_virtual_threads_matter/WhyVirtualThreadsMatter.java) and compare the result with the naive approach.
