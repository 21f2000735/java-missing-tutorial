# Text Processing And Regex Learning Kit

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Validating User Input: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Validating User Input](topics/validating_user_input/ValidatingUserInput.java)

Example:

```java
    public static void main(String[] args) {
        String email = "learner@example.com";
        boolean validEmail = email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
        System.out.println("validEmail = " + validEmail);
        System.out.println("Concept: text processing is about rules, not just string storage.");
    }
```

What happens:

- text processing is about rules, not just string storage.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        String email = "learner@example.com";
        boolean validEmail = email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
        System.out.println("validEmail = " + validEmail);
        System.out.println("Concept: text processing is about rules, not just string storage.");
    }
```

What happens:

- text processing is about rules, not just string storage.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Text Processing And Regex exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Validating User Input](topics/validating_user_input/ValidatingUserInput.java), [Validating User Input](topics/validating_user_input/ValidatingUserInput.java), and [Validating User Input](topics/validating_user_input/ValidatingUserInput.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Validating User Input](topics/validating_user_input/ValidatingUserInput.java) starts with the raw behavior, [Validating User Input](topics/validating_user_input/ValidatingUserInput.java) adds the safety rule, and [Validating User Input](topics/validating_user_input/ValidatingUserInput.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Validating User Input](topics/validating_user_input/ValidatingUserInput.java) and note the first thing that breaks.
- Run [Validating User Input](topics/validating_user_input/ValidatingUserInput.java) and remove the safety rule or coordination step.
- Run [Validating User Input](topics/validating_user_input/ValidatingUserInput.java) and compare the result with the naive approach.
