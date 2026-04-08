# Creational Patterns

## Problem

This chapter shows what breaks when creational patterns is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- callers must know too much about implementation choice
- positional constructor arguments become hard to verify by eye
- partially built objects are possible before validation is complete

## Fix

Run the topics in this order:

1. Run [Assembling Objects With Builder](topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java)
2. Run [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java)

What to observe:

- Which topic shows the failure first: [Assembling Objects With Builder](topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java).
- Which topic narrows the rule: [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java).
- Which topic shows the cleaner abstraction: [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java).

## Improvement

After this chapter, you can explain the rule behind creational patterns and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Creational Patterns exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

- Run [Assembling Objects With Builder](topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java) and note the first thing that breaks.
- Run [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java) and write down what the rule becomes.
- Run [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java) and compare the result with the naive approach.
