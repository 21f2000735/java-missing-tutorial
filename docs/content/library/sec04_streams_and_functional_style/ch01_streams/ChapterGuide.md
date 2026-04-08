# Streams Learning Kit

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

- Using toMap without handling duplicate keys can fail at runtime.
- Topic: Collectors
- Chapter: Streams

## Failure

- Collectors: Using toMap without handling duplicate keys can fail at runtime.
- Collectors: Topic: Collectors
- Parallel Streams: Using parallel streams by default for tiny collections often adds overhead without helping.
- Stream Pipeline: using streams for logic that is simpler with a loop

## Fix

Run the topics in this order:

1. Run [Collectors](topics/collectors/Collectors.java)
2. Run [Parallel Streams](topics/parallel_streams/ParallelStreams.java)
3. Run [Stream Pipeline](topics/stream_pipeline/StreamPipeline.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("The problem:");
        System.out.println("A large calculation may be split across workers, but only if the work is independent and worth the overhead.");
        System.out.println();
        wrongExample();
        // Expected output:
        // sequentialSum and parallelSum should match because the calculation itself is safe.
        List<Integer> values = List.of(1, 2, 3, 4, 5, 6, 7, 8);
        int sequentialSum = sumOfSquaresSequential(values);
        int parallelSum = sumOfSquaresParallel(values);
        System.out.println("Run this example:");
        System.out.println("sequentialSum = " + sequentialSum);
        System.out.println("parallelSum = " + parallelSum);
        System.out.println("Why it works: the calculation is side-effect free, so sequential and parallel versions both produce the same answer.");
        System.out.println("Use this when: the workload is large, independent, and measured to benefit.");
        System.out.println("Avoid this when: the data is small or the pipeline depends on side effects.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- correct output does not prove parallel was a good choice");
        System.out.println("- side-effect free work is much safer for parallel execution");
        System.out.println("- parallel streams are an optimization decision, not a readability upgrade");
    }
```

What happens:

- Why it works: the calculation is side-effect free, so sequential and parallel versions both produce the same answer.
- Use this when: the workload is large, independent, and measured to benefit.
- Avoid this when: the data is small or the pipeline depends on side effects.

Why it matters:

Some workloads can benefit from splitting independent work, but the tradeoff must be understood.

## Improvement

Example:

```java
    public static void main(String[] args) {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }
```

What happens:

- Why it works: the filter keeps only names with length >= 4.
- Dry run: ava(false), liam(true), zoe(false), alex(true).

Why it matters:

Many business tasks are really data transformations, and the code should show that clearly.

After this chapter, you should be able to explain why Streams exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Collectors](topics/collectors/Collectors.java), [Parallel Streams](topics/parallel_streams/ParallelStreams.java), and [Stream Pipeline](topics/stream_pipeline/StreamPipeline.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Collectors](topics/collectors/Collectors.java) starts with the raw behavior, [Parallel Streams](topics/parallel_streams/ParallelStreams.java) adds the safety rule, and [Stream Pipeline](topics/stream_pipeline/StreamPipeline.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Parallel is an execution choice, not a different business rule.

## Try this

- Run [Collectors](topics/collectors/Collectors.java) and note the first thing that breaks.
- Run [Parallel Streams](topics/parallel_streams/ParallelStreams.java) and remove the safety rule or coordination step.
- Run [Stream Pipeline](topics/stream_pipeline/StreamPipeline.java) and compare the result with the naive approach.
