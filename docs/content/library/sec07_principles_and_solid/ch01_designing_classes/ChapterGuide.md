# Designing Classes Learning Kit

## Learning Path

1. Step 1: Start with [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) to see the improvement.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Separating Responsibilities: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java)

Example:

```java
    public static void main(String[] args) {
        InvoiceCalculator calculator = new InvoiceCalculator();
        int total = calculator.totalInCents(2, 1_500);
        System.out.println("invoiceTotal = " + total);
        System.out.println("Concept: one class should own one kind of decision clearly.");
    }
```

What happens:

- one class should own one kind of decision clearly.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        InvoiceCalculator calculator = new InvoiceCalculator();
        int total = calculator.totalInCents(2, 1_500);
        System.out.println("invoiceTotal = " + total);
        System.out.println("Concept: one class should own one kind of decision clearly.");
    }
```

What happens:

- one class should own one kind of decision clearly.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Designing Classes exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java), [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java), and [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) starts with the raw behavior, [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) adds the safety rule, and [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) and note the first thing that breaks.
- Run [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) and remove the safety rule or coordination step.
- Run [Separating Responsibilities](topics/separating_responsibilities/SeparatingResponsibilities.java) and compare the result with the naive approach.
