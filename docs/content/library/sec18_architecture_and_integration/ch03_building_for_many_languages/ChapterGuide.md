# Building For Many Languages Learning Kit

## Learning Path

1. Step 1: Start with [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) to see the improvement.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Showing Messages By Locale: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java)

Example:

```java
    public static void main(String[] args) {
        Locale locale = Locale.US;
        String message = locale.equals(Locale.US) ? "Order confirmed" : "Message unavailable";
        System.out.println("message = " + message);
        System.out.println("Concept: localization separates core behavior from user-facing language.");
    }
```

What happens:

- localization separates core behavior from user-facing language.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        Locale locale = Locale.US;
        String message = locale.equals(Locale.US) ? "Order confirmed" : "Message unavailable";
        System.out.println("message = " + message);
        System.out.println("Concept: localization separates core behavior from user-facing language.");
    }
```

What happens:

- localization separates core behavior from user-facing language.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Building For Many Languages exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java), [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java), and [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) starts with the raw behavior, [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) adds the safety rule, and [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) and note the first thing that breaks.
- Run [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) and remove the safety rule or coordination step.
- Run [Showing Messages By Locale](topics/showing_messages_by_locale/ShowingMessagesByLocale.java) and compare the result with the naive approach.
