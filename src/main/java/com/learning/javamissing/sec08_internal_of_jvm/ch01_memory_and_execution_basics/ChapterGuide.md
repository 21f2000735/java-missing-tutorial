# Memory And Execution Basics Learning Kit

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

This chapter shows what breaks when memory and execution basics is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [GC Roots And Reference Types](topics/gc_roots_and_references/GcRootsAndReferences.java)
2. Run [Understanding Stack, Heap, And References](topics/understanding_stack_heap_and_references/UnderstandingStackHeapAndReferences.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: local variable values and object state are not the same thing");
        System.out.println("Real-world problem: two variables point to the same cart object and one update surprises the learner.");
        System.out.println();

        Cart first = new Cart(2);
        Cart second = first;
        second.itemCount = 5;

        // Expected output:
        // first.itemCount = 5
        // second.itemCount = 5
        System.out.println("first.itemCount = " + first.itemCount);
        System.out.println("second.itemCount = " + second.itemCount);
        System.out.println("Why it works: both variables refer to the same heap object, so one mutation is visible through both references.");
    }
```

What happens:

- Real-world problem: two variables point to the same cart object and one update surprises the learner.
- Why it works: both variables refer to the same heap object, so one mutation is visible through both references.

Why it matters:

After this chapter, you can explain the rule behind memory and execution basics and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: local variable values and object state are not the same thing");
        System.out.println("Real-world problem: two variables point to the same cart object and one update surprises the learner.");
        System.out.println();

        Cart first = new Cart(2);
        Cart second = first;
        second.itemCount = 5;

        // Expected output:
        // first.itemCount = 5
        // second.itemCount = 5
        System.out.println("first.itemCount = " + first.itemCount);
        System.out.println("second.itemCount = " + second.itemCount);
        System.out.println("Why it works: both variables refer to the same heap object, so one mutation is visible through both references.");
    }
```

What happens:

- Real-world problem: two variables point to the same cart object and one update surprises the learner.
- Why it works: both variables refer to the same heap object, so one mutation is visible through both references.

Why it matters:

After this chapter, you can explain the rule behind memory and execution basics and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Memory And Execution Basics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [GC Roots And Reference Types](topics/gc_roots_and_references/GcRootsAndReferences.java), [Understanding Stack, Heap, And References](topics/understanding_stack_heap_and_references/UnderstandingStackHeapAndReferences.java), and [Understanding Stack, Heap, And References](topics/understanding_stack_heap_and_references/UnderstandingStackHeapAndReferences.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [GC Roots And Reference Types](topics/gc_roots_and_references/GcRootsAndReferences.java) starts with the raw behavior, [Understanding Stack, Heap, And References](topics/understanding_stack_heap_and_references/UnderstandingStackHeapAndReferences.java) adds the safety rule, and [Understanding Stack, Heap, And References](topics/understanding_stack_heap_and_references/UnderstandingStackHeapAndReferences.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [GC Roots And Reference Types](topics/gc_roots_and_references/GcRootsAndReferences.java) and note the first thing that breaks.
- Run [Understanding Stack, Heap, And References](topics/understanding_stack_heap_and_references/UnderstandingStackHeapAndReferences.java) and remove the safety rule or coordination step.
- Run [Understanding Stack, Heap, And References](topics/understanding_stack_heap_and_references/UnderstandingStackHeapAndReferences.java) and compare the result with the naive approach.
