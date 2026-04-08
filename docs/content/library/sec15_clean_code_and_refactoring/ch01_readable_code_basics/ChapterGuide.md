# Readable Code Basics Learning Kit

## Learning Path

1. Step 1: Start with [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) to see the improvement.

## Problem

This chapter shows what breaks when readable code basics is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: small names and extracted steps make code easier to read");
        System.out.println("Real-world problem: checkout total code becomes hard to follow when too much logic stays inline.");
        System.out.println();

        int subtotal = 2_000;
        int shipping = 150;
        int grandTotal = calculateGrandTotal(subtotal, shipping);

        // Expected output:
        // grandTotal = 2150
        System.out.println("grandTotal = " + grandTotal);
        System.out.println("Why it works: the main method reads at the business level while smaller methods carry the detail.");
    }
```

What happens:

- Real-world problem: checkout total code becomes hard to follow when too much logic stays inline.
- Why it works: the main method reads at the business level while smaller methods carry the detail.

Why it matters:

After this chapter, you can explain the rule behind readable code basics and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: small names and extracted steps make code easier to read");
        System.out.println("Real-world problem: checkout total code becomes hard to follow when too much logic stays inline.");
        System.out.println();

        int subtotal = 2_000;
        int shipping = 150;
        int grandTotal = calculateGrandTotal(subtotal, shipping);

        // Expected output:
        // grandTotal = 2150
        System.out.println("grandTotal = " + grandTotal);
        System.out.println("Why it works: the main method reads at the business level while smaller methods carry the detail.");
    }
```

What happens:

- Real-world problem: checkout total code becomes hard to follow when too much logic stays inline.
- Why it works: the main method reads at the business level while smaller methods carry the detail.

Why it matters:

After this chapter, you can explain the rule behind readable code basics and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Readable Code Basics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java), [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java), and [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) starts with the raw behavior, [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) adds the safety rule, and [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) and note the first thing that breaks.
- Run [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) and remove the safety rule or coordination step.
- Run [Renaming And Extracting Methods](topics/renaming_and_extracting_methods/RenamingAndExtractingMethods.java) and compare the result with the naive approach.
