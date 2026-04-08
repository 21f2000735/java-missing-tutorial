# Java Modules Learning Kit

## Learning Path

1. Step 1: Start with [Declaring Module Boundaries](topics/declaring_module_boundaries/DeclaringModuleBoundaries.java) to see the raw behavior.
2. Step 2: Try [Module Boundaries](topics/module_boundaries/ModuleBoundaries.java) to see the naive approach.
3. Step 3: Watch [Module Boundaries](topics/module_boundaries/ModuleBoundaries.java) to find the failure.
4. Step 4: Use [Module Boundaries](topics/module_boundaries/ModuleBoundaries.java) to restore correctness.
5. Step 5: Finish with [Pluggable Implementations](topics/pluggable_implementations/PluggableImplementations.java) to see the improvement.

## Problem

This chapter shows what breaks when java modules is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Declaring Module Boundaries](topics/declaring_module_boundaries/DeclaringModuleBoundaries.java)
2. Run [Module Boundaries](topics/module_boundaries/ModuleBoundaries.java)
3. Run [Pluggable Implementations](topics/pluggable_implementations/PluggableImplementations.java)

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        showStoreModuleExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- requires declares what this module needs");
        System.out.println("- exports declares what other modules may use");
        System.out.println("- good modular design exposes less, not more");
    }
```

What happens:

- Real-world problem: a store module depends on SQL but should expose only its API package.
- Mental model: one keyword talks about incoming dependency, the other about outgoing visibility.
- Why it matters: database access is needed internally, but only the API package is public to other modules.

Why it matters:

After this chapter, you can explain the rule behind java modules and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        runDiscountProviderExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- services support pluggable implementations behind one abstraction");
        System.out.println("- consumers depend on the contract, not the concrete class");
        System.out.println("- this is a boundary and extensibility tool");
    }
```

What happens:

- Real-world problem: a checkout module may use different discount providers for different business rules.
- Mental model: the consumer knows the interface, the runtime can choose the implementation.
- Why it matters: one consumer can work with multiple implementations without hard-coding one class.

Why it matters:

After this chapter, you can explain the rule behind java modules and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Modules exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Declaring Module Boundaries](topics/declaring_module_boundaries/DeclaringModuleBoundaries.java), [Module Boundaries](topics/module_boundaries/ModuleBoundaries.java), and [Pluggable Implementations](topics/pluggable_implementations/PluggableImplementations.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Declaring Module Boundaries](topics/declaring_module_boundaries/DeclaringModuleBoundaries.java) starts with the raw behavior, [Module Boundaries](topics/module_boundaries/ModuleBoundaries.java) adds the safety rule, and [Pluggable Implementations](topics/pluggable_implementations/PluggableImplementations.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Declaring Module Boundaries](topics/declaring_module_boundaries/DeclaringModuleBoundaries.java) and note the first thing that breaks.
- Run [Module Boundaries](topics/module_boundaries/ModuleBoundaries.java) and remove the safety rule or coordination step.
- Run [Pluggable Implementations](topics/pluggable_implementations/PluggableImplementations.java) and compare the result with the naive approach.
