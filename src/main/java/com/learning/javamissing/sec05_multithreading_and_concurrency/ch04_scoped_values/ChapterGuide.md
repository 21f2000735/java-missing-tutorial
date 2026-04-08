# Scoped Values Learning Kit

## Problem

This chapter is about one narrow but useful problem: some context belongs to one operation and should be readable through many nested calls without becoming global mutable state.

## Naive Approach

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Failure

- the value is ordinary business data for one small call chain
- the state is mutable domain state
- you are not matching the correct JDK preview setup

## Fix

Run the topics in this order:

1. Run [Binding Request Context](topics/binding_request_context/BindingRequestContext.java)
2. Run [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java)
3. Run [Scoped Values Vs Thread Local](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java)

What to observe:

- Which topic shows the failure first: [Binding Request Context](topics/binding_request_context/BindingRequestContext.java).
- Which topic narrows the rule: [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java).
- Which topic shows the cleaner abstraction: [Scoped Values Vs Thread Local](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java).

## Improvement

Read the chapter as a small set of related ideas around scoped Values, not as isolated trivia.

After this chapter, you should be able to explain why Scoped Values exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Read the chapter as a small set of related ideas around scoped Values, not as isolated trivia.

## Try this

- Run [Binding Request Context](topics/binding_request_context/BindingRequestContext.java) and note the first thing that breaks.
- Run [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java) and write down what the rule becomes.
- Run [Scoped Values Vs Thread Local](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java) and compare the result with the naive approach.
