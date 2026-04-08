# Optional Learning Kit

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

- Using Optional for every field in every model object usually adds noise instead of clarity.

## Failure

- Choosing Optional Boundaries: Using Optional for every field in every model object usually adds noise instead of clarity.
- Representing Optional Values: Optional.of(null) throws NullPointerException immediately.
- Representing Optional Values: Topic: Optional Creation

## Fix

Run the topics in this order:

1. Run [Choosing Optional Boundaries](topics/choosing_optional_boundaries/ChoosingOptionalBoundaries.java)
2. Run [Optional Correct Usage](topics/optional_correct_usage/OptionalCorrectUsage.java)
3. Run [Representing Optional Values](topics/representing_optional_values/RepresentingOptionalValues.java)
4. Run [Transforming Optional Values](topics/transforming_optional_values/TransformingOptionalValues.java)

Example:

```java
    public static void main(String[] args) {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }
```

What happens:

- Optional.of(null) throws NullPointerException immediately.
- Topic: Optional Creation
- Chapter: Optional

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        overview();
        wrongExample();
        // Expected output:
        // the display domain from customer@shopnow.com is shopnow.com
        Optional<String> email = Optional.of("customer@shopnow.com");
        String domain = extractDomain(email);
        System.out.println("domain = " + domain);
        System.out.println("Lesson: map transforms the present value without forcing manual null checks.");
        System.out.println("Common confusion: map changes the value inside Optional, it does not unwrap it permanently.");
        System.out.println("Real-world value: a profile page can show email domain details without fragile null checks.");
    }
```

What happens:

- Calling get() too early defeats the purpose of Optional and can fail if the value is absent.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Optional exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Choosing Optional Boundaries](topics/choosing_optional_boundaries/ChoosingOptionalBoundaries.java), [Representing Optional Values](topics/representing_optional_values/RepresentingOptionalValues.java), and [Transforming Optional Values](topics/transforming_optional_values/TransformingOptionalValues.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Choosing Optional Boundaries](topics/choosing_optional_boundaries/ChoosingOptionalBoundaries.java) starts with the raw behavior, [Representing Optional Values](topics/representing_optional_values/RepresentingOptionalValues.java) adds the safety rule, and [Transforming Optional Values](topics/transforming_optional_values/TransformingOptionalValues.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Choosing Optional Boundaries](topics/choosing_optional_boundaries/ChoosingOptionalBoundaries.java) and note the first thing that breaks.
- Run [Representing Optional Values](topics/representing_optional_values/RepresentingOptionalValues.java) and remove the safety rule or coordination step.
- Run [Transforming Optional Values](topics/transforming_optional_values/TransformingOptionalValues.java) and compare the result with the naive approach.
