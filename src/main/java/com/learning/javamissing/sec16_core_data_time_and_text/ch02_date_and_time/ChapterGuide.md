# Date And Time Learning Kit

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

This chapter shows what breaks when date and time is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Formatting](topics/formatting/Formatting.java)
2. Run [Local Date Time](topics/local_date_time/LocalDateTime.java)
3. Run [Zones](topics/zones/Zones.java)

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        runMeetingExample();
        showCommonConfusion();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- LocalDateTime represents a local calendar date and clock time");
        System.out.println("- operations like plusMinutes return a new value");
        System.out.println("- LocalDateTime does not contain timezone information");
    }
```

What happens:

- LocalDateTime is not a global instant
- if London and Kolkata must agree on the same real moment, a zone-aware type is needed

Why it matters:

After this chapter, you can explain the rule behind date and time and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        runWebinarExample();
        showCommonConfusion();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a zone-aware value can represent the same instant in different regions");
        System.out.println("- withZoneSameInstant changes the view, not the real moment");
        System.out.println("- timezone handling matters whenever users are in different countries");
    }
```

What happens:

- changing the zone is not the same as changing the event time
- storing only LocalDateTime loses the region information

Why it matters:

After this chapter, you can explain the rule behind date and time and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Date And Time exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Formatting](topics/formatting/Formatting.java), [Local Date Time](topics/local_date_time/LocalDateTime.java), and [Zones](topics/zones/Zones.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Formatting](topics/formatting/Formatting.java) starts with the raw behavior, [Local Date Time](topics/local_date_time/LocalDateTime.java) adds the safety rule, and [Zones](topics/zones/Zones.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Formatting](topics/formatting/Formatting.java) and note the first thing that breaks.
- Run [Local Date Time](topics/local_date_time/LocalDateTime.java) and remove the safety rule or coordination step.
- Run [Zones](topics/zones/Zones.java) and compare the result with the naive approach.
