# Strings In Depth Learning Kit

## Learning Path

1. Step 1: Start with [Builders Formatting And Regex](topics/builders_formatting_and_regex/BuildersFormattingAndRegex.java) to see the raw behavior.
2. Step 2: Try [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java) to see the naive approach.
3. Step 3: Watch [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java) to see the improvement.

## Problem

This chapter shows what breaks when strings in depth is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Builders Formatting And Regex](topics/builders_formatting_and_regex/BuildersFormattingAndRegex.java)
2. Run [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java)

Example:

```java
    public static void main(String[] args) {
        String literalA = "java";
        String literalB = "java";
        String objectString = new String("java");

        // Expected output:
        // literalA == literalB -> true
        // literalA == objectString -> false
        // literalA.equals(objectString) -> true
        System.out.println("literalA == literalB -> " + (literalA == literalB));
        System.out.println("literalA == objectString -> " + (literalA == objectString));
        System.out.println("literalA.equals(objectString) -> " + literalA.equals(objectString));
        System.out.println("Why it works: literals can reuse the same pooled reference, but new String(...) creates a different object with the same content.");
    }
```

What happens:

Why it matters:

After this chapter, you can explain the rule behind strings in depth and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        String literalA = "java";
        String literalB = "java";
        String objectString = new String("java");

        // Expected output:
        // literalA == literalB -> true
        // literalA == objectString -> false
        // literalA.equals(objectString) -> true
        System.out.println("literalA == literalB -> " + (literalA == literalB));
        System.out.println("literalA == objectString -> " + (literalA == objectString));
        System.out.println("literalA.equals(objectString) -> " + literalA.equals(objectString));
        System.out.println("Why it works: literals can reuse the same pooled reference, but new String(...) creates a different object with the same content.");
    }
```

What happens:

Why it matters:

After this chapter, you can explain the rule behind strings in depth and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Strings In Depth exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Builders Formatting And Regex](topics/builders_formatting_and_regex/BuildersFormattingAndRegex.java), [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java), and [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Builders Formatting And Regex](topics/builders_formatting_and_regex/BuildersFormattingAndRegex.java) starts with the raw behavior, [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java) adds the safety rule, and [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Builders Formatting And Regex](topics/builders_formatting_and_regex/BuildersFormattingAndRegex.java) and note the first thing that breaks.
- Run [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java) and remove the safety rule or coordination step.
- Run [String Pool And Equals](topics/string_pool_and_equals/StringPoolAndEquals.java) and compare the result with the naive approach.
