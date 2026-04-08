# JIT And Garbage Collection Learning Kit

## Problem

This chapter exists because many developers know the words JIT and GC but cannot connect them to runtime behavior.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- That breaks when you need to explain:
- why repeated code paths can become faster over time
- why low-pause collectors exist

## Fix

Run the topics in this order:

1. Run [GC Algorithms Comparison](topics/gc_algorithms_comparison/GcAlgorithmsComparison.java)
2. Run [GC Strategies](topics/gc_strategies/GcStrategies.java)
3. Run [JIT Compilation And Tiered Compilation](topics/jit_and_tiered_compilation/JitAndTieredCompilation.java)
4. Run [Jit Basics](topics/jit_basics/JitBasics.java)

What to observe:

- Which topic shows the failure first: [GC Algorithms Comparison](topics/gc_algorithms_comparison/GcAlgorithmsComparison.java).
- Which topic narrows the rule: [JIT Compilation And Tiered Compilation](topics/jit_and_tiered_compilation/JitAndTieredCompilation.java).
- Which topic shows the cleaner abstraction: [Jit Basics](topics/jit_basics/JitBasics.java).

## Improvement

After this chapter, you can explain the rule behind jit and garbage collection and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Jit And Garbage Collection exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [GC Algorithms Comparison](topics/gc_algorithms_comparison/GcAlgorithmsComparison.java) and note the first thing that breaks.
- Run [JIT Compilation And Tiered Compilation](topics/jit_and_tiered_compilation/JitAndTieredCompilation.java) and write down what the rule becomes.
- Run [Jit Basics](topics/jit_basics/JitBasics.java) and compare the result with the naive approach.
