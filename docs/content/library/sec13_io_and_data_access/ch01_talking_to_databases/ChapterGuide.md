# Talking To Databases Learning Kit

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Querying Student Results: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java)

Example:

```java
    public static void main(String[] args) {
        List<StudentResult> results = List.of(
                new StudentResult("Asha", 91),
                new StudentResult("Ravi", 78)
        );

        System.out.println("results = " + results);
        System.out.println("Concept: database work is about reading and shaping persistent data safely.");
    }
```

What happens:

- database work is about reading and shaping persistent data safely.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        List<StudentResult> results = List.of(
                new StudentResult("Asha", 91),
                new StudentResult("Ravi", 78)
        );

        System.out.println("results = " + results);
        System.out.println("Concept: database work is about reading and shaping persistent data safely.");
    }
```

What happens:

- database work is about reading and shaping persistent data safely.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Talking To Databases exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java), [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java), and [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java) starts with the raw behavior, [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java) adds the safety rule, and [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java) and note the first thing that breaks.
- Run [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java) and remove the safety rule or coordination step.
- Run [Querying Student Results](topics/querying_student_results/QueryingStudentResults.java) and compare the result with the naive approach.
