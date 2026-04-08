# Virtual Threads Learning Kit

## Problem

Cheap threads do not remove design mistakes around locking and blocking.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Avoiding Virtual Thread Misuse: Cheap threads do not remove design mistakes around locking and blocking.
- Running Tasks With Virtual Thread Executor: Real request flows often need many independent waiting tasks.
- Why virtual threads matter: assuming virtual threads make every workload faster
- Why virtual threads matter: Why it works: the code stays simple and blocking-style, but the thread is lightweight.

## Fix

Run the topics in this order:

1. Run [Avoiding Virtual Thread Misuse](topics/avoiding_virtual_thread_misuse/AvoidingVirtualThreadMisuse.java)
2. Run [Running Tasks With Virtual Thread Executor](topics/running_tasks_with_virtual_thread_executor/RunningTasksWithVirtualThreadExecutor.java)
3. Run [Why virtual threads matter](topics/why_virtual_threads_matter/WhyVirtualThreadsMatter.java)

Example:

```java
    public static void main(String[] args) throws Exception {
        explainWhy();
        runRequestFanOutExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a virtual-thread-per-task executor matches request-style code well");
        System.out.println("- each task can block independently without forcing callback-style code");
        System.out.println("- you still need to think about failure and resource usage");
    }
```

What happens:

- Why it works: each submitted task gets a lightweight thread and the caller waits for results normally.
- Use this when: many tasks mostly wait and the code should stay direct.
- Avoid this when: you still need complex shared-state coordination or CPU-heavy optimization.

Why it matters:

Real request flows often need many independent waiting tasks.

## Improvement

Example:

```java
    public static void main(String[] args) throws InterruptedException {
        explainWhy();
        wrongMentalModel();
        runBlockingTaskExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a virtual thread is still a Thread");
        System.out.println("- virtual threads are useful when tasks spend time waiting");
        System.out.println("- they improve the cost model, not the business logic");
    }
```

What happens:

- assuming virtual threads make every workload faster
- Why it works: the code stays simple and blocking-style, but the thread is lightweight.
- Use this when: tasks mostly wait on external systems.

Why it matters:

Waiting-heavy systems need a cheaper way to express many concurrent tasks.

After this chapter, you should be able to explain why Virtual Threads exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Avoiding Virtual Thread Misuse](topics/avoiding_virtual_thread_misuse/AvoidingVirtualThreadMisuse.java), [Running Tasks With Virtual Thread Executor](topics/running_tasks_with_virtual_thread_executor/RunningTasksWithVirtualThreadExecutor.java), and [Why virtual threads matter](topics/why_virtual_threads_matter/WhyVirtualThreadsMatter.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Avoiding Virtual Thread Misuse](topics/avoiding_virtual_thread_misuse/AvoidingVirtualThreadMisuse.java) starts with the raw behavior, [Running Tasks With Virtual Thread Executor](topics/running_tasks_with_virtual_thread_executor/RunningTasksWithVirtualThreadExecutor.java) adds the safety rule, and [Why virtual threads matter](topics/why_virtual_threads_matter/WhyVirtualThreadsMatter.java) moves to the cleaner abstraction.

## Rule

👉 Rule: One task can map naturally to one lightweight thread.

## Try this

- Run [Avoiding Virtual Thread Misuse](topics/avoiding_virtual_thread_misuse/AvoidingVirtualThreadMisuse.java) and note the first thing that breaks.
- Run [Running Tasks With Virtual Thread Executor](topics/running_tasks_with_virtual_thread_executor/RunningTasksWithVirtualThreadExecutor.java) and remove the safety rule or coordination step.
- Run [Why virtual threads matter](topics/why_virtual_threads_matter/WhyVirtualThreadsMatter.java) and compare the result with the naive approach.
