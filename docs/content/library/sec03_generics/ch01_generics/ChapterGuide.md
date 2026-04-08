# Generics Learning Kit

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Bounds: Java programs stay useful when they are organized around ideas, not only syntax.
- Generic Type: Java programs stay useful when they are organized around ideas, not only syntax.
- Wildcards: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Bounds](topics/bounds/Bounds.java)
2. Run [Generic Type](topics/generic_type/GenericType.java)
3. Run [Wildcards](topics/wildcards/Wildcards.java)

Example:

```java
    public static void main(String[] args) {
        overview();
        wrongMentalModel();
        smallExample();
        betterRealWorldExample();
        compilerRuntimeView();
        interviewAngle();
        exercise();
        solution();
    }
```

What happens:

- Why this exists: one reusable container should work for many data types without unsafe casts.
- Problem it solves: duplicate classes like StudentBox, ReportBox, and InvoiceBox are wasteful and error-prone.
- Right mental model: generics are compile-time contracts for reusable APIs.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        overview();
        wrongMentalModel();
        producerExample();
        consumerExample();
        compilerRuntimeView();
        interviewAngle();
        exercise();
        solution();
    }
```

What happens:

- Why this exists: method boundaries often need flexibility without throwing away type safety.
- Problem it solves: exact type parameters can make reusable APIs too rigid for callers.
- Right mental model: wildcards describe how values flow into and out of an API.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Generics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Bounds](topics/bounds/Bounds.java), [Generic Type](topics/generic_type/GenericType.java), and [Wildcards](topics/wildcards/Wildcards.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Bounds](topics/bounds/Bounds.java) starts with the raw behavior, [Generic Type](topics/generic_type/GenericType.java) adds the safety rule, and [Wildcards](topics/wildcards/Wildcards.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Bounds](topics/bounds/Bounds.java) and note the first thing that breaks.
- Run [Generic Type](topics/generic_type/GenericType.java) and remove the safety rule or coordination step.
- Run [Wildcards](topics/wildcards/Wildcards.java) and compare the result with the naive approach.
