# Missing Values And Optional Learning Kit

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Representing Absence: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Representing Absence](topics/representing_absence/RepresentingAbsence.java)

Example:

```java
    public static void main(String[] args) {
        Optional<String> promoCode = Optional.ofNullable(null);
        System.out.println("promoCode = " + promoCode);
        System.out.println("display = " + promoCode.orElse("No promo code"));
        System.out.println("Concept: absence should be explicit when it changes business behavior.");
    }
```

What happens:

- absence should be explicit when it changes business behavior.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        Optional<String> promoCode = Optional.ofNullable(null);
        System.out.println("promoCode = " + promoCode);
        System.out.println("display = " + promoCode.orElse("No promo code"));
        System.out.println("Concept: absence should be explicit when it changes business behavior.");
    }
```

What happens:

- absence should be explicit when it changes business behavior.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Missing Values And Optional exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Representing Absence](topics/representing_absence/RepresentingAbsence.java), [Representing Absence](topics/representing_absence/RepresentingAbsence.java), and [Representing Absence](topics/representing_absence/RepresentingAbsence.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Representing Absence](topics/representing_absence/RepresentingAbsence.java) starts with the raw behavior, [Representing Absence](topics/representing_absence/RepresentingAbsence.java) adds the safety rule, and [Representing Absence](topics/representing_absence/RepresentingAbsence.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Representing Absence](topics/representing_absence/RepresentingAbsence.java) and note the first thing that breaks.
- Run [Representing Absence](topics/representing_absence/RepresentingAbsence.java) and remove the safety rule or coordination step.
- Run [Representing Absence](topics/representing_absence/RepresentingAbsence.java) and compare the result with the naive approach.
