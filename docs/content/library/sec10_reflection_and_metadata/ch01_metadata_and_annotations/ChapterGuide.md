# Metadata And Annotations Learning Kit

## Learning Path

1. Step 1: Start with [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) to see the improvement.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Marking Api Contracts: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java)

Example:

```java
    public static void main(String[] args) {
        PremiumDiscountService service = new PremiumDiscountService();
        System.out.println("discount = " + service.discountInCents());
        System.out.println("Concept: annotations can communicate intent to readers, compilers, and tools.");
    }
```

What happens:

- annotations can communicate intent to readers, compilers, and tools.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        PremiumDiscountService service = new PremiumDiscountService();
        System.out.println("discount = " + service.discountInCents());
        System.out.println("Concept: annotations can communicate intent to readers, compilers, and tools.");
    }
```

What happens:

- annotations can communicate intent to readers, compilers, and tools.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Metadata And Annotations exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java), [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java), and [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) starts with the raw behavior, [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) adds the safety rule, and [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) and note the first thing that breaks.
- Run [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) and remove the safety rule or coordination step.
- Run [Marking Api Contracts](topics/marking_api_contracts/MarkingApiContracts.java) and compare the result with the naive approach.
