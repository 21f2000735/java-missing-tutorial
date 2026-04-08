# Scoped Values Learning Kit

## Learning Path

1. Step 1: Start with [Binding Request Context](topics/binding_request_context/BindingRequestContext.java) to see the raw behavior.
2. Step 2: Try [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java) to see the naive approach.
3. Step 3: Watch [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java) to find the failure.
4. Step 4: Use [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java) to restore correctness.
5. Step 5: Finish with [Scoped Values Vs Thread Local](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java) to see the improvement.

## Problem

This chapter shows what breaks when scoped values is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Binding Request Context](topics/binding_request_context/BindingRequestContext.java)
2. Run [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java)
3. Run [Scoped Values Vs Thread Local](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java)

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        runRequestContextExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- scoped values bind context for one execution scope");
        System.out.println("- code inside the scope can read the value without global mutable state");
        System.out.println("- this is useful for request metadata, not for ordinary business fields");
    }
```

What happens:

- Real-world problem: logging and authorization both need the current user role.
- Mental model: bind context around one operation and let inner code read it.
- Why it works: the role is bound only inside this execution scope.

Why it matters:

After this chapter, you can explain the rule behind scoped values and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        compareApproaches();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- thread local is mutable per thread and easier to leak");
        System.out.println("- scoped values are better for bounded read-mostly context");
        System.out.println("- method parameters are still best when only a few calls need the value");
    }
```

What happens:

- Real-world problem: request metadata must be available in nested calls without leaking forever.
- Mental model: choose the narrowest and safest context mechanism.
- Why it matters: scoped values make lifetime clearer than mutable thread-local state.

Why it matters:

After this chapter, you can explain the rule behind scoped values and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Scoped Values exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Binding Request Context](topics/binding_request_context/BindingRequestContext.java), [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java), and [Scoped Values Vs Thread Local](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Binding Request Context](topics/binding_request_context/BindingRequestContext.java) starts with the raw behavior, [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java) adds the safety rule, and [Scoped Values Vs Thread Local](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Binding Request Context](topics/binding_request_context/BindingRequestContext.java) and note the first thing that breaks.
- Run [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java) and remove the safety rule or coordination step.
- Run [Scoped Values Vs Thread Local](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java) and compare the result with the naive approach.
