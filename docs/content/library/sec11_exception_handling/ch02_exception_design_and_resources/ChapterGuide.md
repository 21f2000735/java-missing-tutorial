# Exception Design And Resources Learning Kit

## Learning Path

1. Step 1: Start with [Checked Unchecked And Custom](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java) to see the raw behavior.
2. Step 2: Try [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) to see the naive approach.
3. Step 3: Watch [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) to see the improvement.

## Problem

This chapter shows what breaks when exception design and resources is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Checked Unchecked And Custom](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java)
2. Run [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java)

Example:

```java
    public static void main(String[] args) {
        try {
            loadInvoice();
        } catch (IllegalStateException exception) {
            System.out.println("topLevelMessage = " + exception.getMessage());
            System.out.println("causeType = " + exception.getCause().getClass().getSimpleName());
        }
    }
```

What happens:

Why it matters:

After this chapter, you can explain the rule behind exception design and resources and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        try {
            loadInvoice();
        } catch (IllegalStateException exception) {
            System.out.println("topLevelMessage = " + exception.getMessage());
            System.out.println("causeType = " + exception.getCause().getClass().getSimpleName());
        }
    }
```

What happens:

Why it matters:

After this chapter, you can explain the rule behind exception design and resources and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Exception Design And Resources exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Checked Unchecked And Custom](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java), [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java), and [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Checked Unchecked And Custom](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java) starts with the raw behavior, [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) adds the safety rule, and [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Checked Unchecked And Custom](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java) and note the first thing that breaks.
- Run [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) and remove the safety rule or coordination step.
- Run [Try With Resources And Chaining](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java) and compare the result with the naive approach.
