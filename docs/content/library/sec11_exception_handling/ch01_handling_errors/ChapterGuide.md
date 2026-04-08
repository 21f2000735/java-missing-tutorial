# Handling Errors Learning Kit

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Handling Payment Failures: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java)

Example:

```java
    public static void main(String[] args) {
        try {
            chargeCard(false);
        } catch (IllegalStateException exception) {
            System.out.println("paymentStatus = failed");
            System.out.println("reason = " + exception.getMessage());
        }
        System.out.println("Concept: errors should preserve meaning for both developers and users.");
    }
```

What happens:

- errors should preserve meaning for both developers and users.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        try {
            chargeCard(false);
        } catch (IllegalStateException exception) {
            System.out.println("paymentStatus = failed");
            System.out.println("reason = " + exception.getMessage());
        }
        System.out.println("Concept: errors should preserve meaning for both developers and users.");
    }
```

What happens:

- errors should preserve meaning for both developers and users.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Handling Errors exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java), [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java), and [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java) starts with the raw behavior, [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java) adds the safety rule, and [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java) and note the first thing that breaks.
- Run [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java) and remove the safety rule or coordination step.
- Run [Handling Payment Failures](topics/handling_payment_failures/HandlingPaymentFailures.java) and compare the result with the naive approach.
