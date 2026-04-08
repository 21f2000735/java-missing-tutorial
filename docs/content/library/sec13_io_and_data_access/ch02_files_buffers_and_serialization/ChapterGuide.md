# Files, Buffers, And Serialization Learning Kit

## Learning Path

1. Step 1: Start with [Bytes Chars And Files](topics/bytes_chars_and_files/BytesCharsAndFiles.java) to see the raw behavior.
2. Step 2: Try [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java) to see the naive approach.
3. Step 3: Watch [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java) to see the improvement.

## Problem

This chapter shows what breaks when files, buffers, and serialization is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Bytes Chars And Files](topics/bytes_chars_and_files/BytesCharsAndFiles.java)
2. Run [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: WatchService listens for filesystem changes and serialization turns object state into bytes.");
        System.out.println("WatchService use case: react when an upload folder receives a new file.");
        System.out.println("Serialization warning: object version changes and unsafe deserialization can create long-term problems.");
        System.out.println("Use this when: you need a mental model before reading the larger Files API docs.");
    }
```

What happens:

- WatchService use case: react when an upload folder receives a new file.
- Serialization warning: object version changes and unsafe deserialization can create long-term problems.
- Use this when: you need a mental model before reading the larger Files API docs.

Why it matters:

After this chapter, you can explain the rule behind files, buffers, and serialization and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: WatchService listens for filesystem changes and serialization turns object state into bytes.");
        System.out.println("WatchService use case: react when an upload folder receives a new file.");
        System.out.println("Serialization warning: object version changes and unsafe deserialization can create long-term problems.");
        System.out.println("Use this when: you need a mental model before reading the larger Files API docs.");
    }
```

What happens:

- WatchService use case: react when an upload folder receives a new file.
- Serialization warning: object version changes and unsafe deserialization can create long-term problems.
- Use this when: you need a mental model before reading the larger Files API docs.

Why it matters:

After this chapter, you can explain the rule behind files, buffers, and serialization and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Files Buffers And Serialization exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Bytes Chars And Files](topics/bytes_chars_and_files/BytesCharsAndFiles.java), [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java), and [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Bytes Chars And Files](topics/bytes_chars_and_files/BytesCharsAndFiles.java) starts with the raw behavior, [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java) adds the safety rule, and [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Bytes Chars And Files](topics/bytes_chars_and_files/BytesCharsAndFiles.java) and note the first thing that breaks.
- Run [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java) and remove the safety rule or coordination step.
- Run [Watch Service And Serialization](topics/watch_service_and_serialization/WatchServiceAndSerialization.java) and compare the result with the naive approach.
