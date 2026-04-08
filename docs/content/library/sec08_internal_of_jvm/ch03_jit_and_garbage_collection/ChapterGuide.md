# JIT And Garbage Collection Learning Kit

## Problem

This chapter shows what breaks when jit and garbage collection is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [GC Algorithms Comparison](topics/gc_algorithms_comparison/GcAlgorithmsComparison.java)
2. Run [GC Strategies](topics/gc_strategies/GcStrategies.java)
3. Run [JIT Compilation And Tiered Compilation](topics/jit_and_tiered_compilation/JitAndTieredCompilation.java)
4. Run [Jit Basics](topics/jit_basics/JitBasics.java)

Example:

```java
    public static void main(String[] args) {
        long sum = 0;
        for (int i = 0; i < 100_000; i++) {
            sum += hotMethod(i);
        }
        System.out.println("Concept: hot methods get optimized by the JIT over time.");
        System.out.println("sum = " + sum);
        System.out.println("Use -XX:+PrintCompilation to observe compilation decisions when needed.");
        System.out.println("Why it matters: tiered compilation moves from interpreted code to faster compiled code for hot paths.");
    }
```

What happens:

- Use -XX:+PrintCompilation to observe compilation decisions when needed.
- Why it matters: tiered compilation moves from interpreted code to faster compiled code for hot paths.

Why it matters:

After this chapter, you can explain the rule behind jit and garbage collection and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: the JVM optimizes hot code paths while the program is running.");
        long sum = 0;
        for (int round = 0; round < 10_000; round++) {
            sum += round % 10;
        }

        // Expected output:
        // sum = 45000
        System.out.println("sum = " + sum);
        System.out.println("Why it matters: the JIT watches frequently executed code and compiles it more aggressively than cold paths.");
    }
```

What happens:

- Why it matters: the JIT watches frequently executed code and compiles it more aggressively than cold paths.

Why it matters:

After this chapter, you can explain the rule behind jit and garbage collection and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Jit And Garbage Collection exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [GC Algorithms Comparison](topics/gc_algorithms_comparison/GcAlgorithmsComparison.java), [JIT Compilation And Tiered Compilation](topics/jit_and_tiered_compilation/JitAndTieredCompilation.java), and [Jit Basics](topics/jit_basics/JitBasics.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [GC Algorithms Comparison](topics/gc_algorithms_comparison/GcAlgorithmsComparison.java) starts with the raw behavior, [JIT Compilation And Tiered Compilation](topics/jit_and_tiered_compilation/JitAndTieredCompilation.java) adds the safety rule, and [Jit Basics](topics/jit_basics/JitBasics.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [GC Algorithms Comparison](topics/gc_algorithms_comparison/GcAlgorithmsComparison.java) and note the first thing that breaks.
- Run [JIT Compilation And Tiered Compilation](topics/jit_and_tiered_compilation/JitAndTieredCompilation.java) and remove the safety rule or coordination step.
- Run [Jit Basics](topics/jit_basics/JitBasics.java) and compare the result with the naive approach.
