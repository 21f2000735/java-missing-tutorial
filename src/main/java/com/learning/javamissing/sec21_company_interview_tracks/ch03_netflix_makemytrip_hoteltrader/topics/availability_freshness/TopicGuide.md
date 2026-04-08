---
introduced: Java 8
status: stable
runner: embedded
estimated: 6 min
---

# availability freshness

## Why This Exists

Concept: availability freshness.

Marketplace and partner systems need to know whether what they show is still trustworthy.

## The Pain Before It

It measures whether supplier availability is fresh enough to use.

A hotel connectivity platform receives room updates from suppliers.

## Java Creator Mindset

Freshness is a time-based trust check, not only a data-format check.

## How You Might Invent It

1. Keep the last supplier update time.
2. Compare it with now.
3. Mark inventory as stale when the lag is too large.

## Naive Attempt

The naive version is to use availability freshness without checking what rule it is supposed to protect.

## Why It Breaks

It measures whether supplier availability is fresh enough to use.

Edge cases usually show the bug first.

## Final Java Solution

Freshness is a time-based trust check, not only a data-format check.

Run [AvailabilityFreshness.java](AvailabilityFreshness.java) as the source of truth for the example.

## Code

Run [AvailabilityFreshness.java](AvailabilityFreshness.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        SupplierFeedStatus status = new SupplierFeedStatus(
                Instant.parse("2026-04-07T10:00:00Z"),
                Instant.parse("2026-04-07T10:17:00Z")
        );

        // Expected output:
        // isFresh = false
        // syncLagMinutes = 17
        System.out.println("isFresh = " + status.isFresh(Duration.ofMinutes(10)));
        System.out.println("syncLagMinutes = " + status.syncLagMinutes());
        System.out.println("Company lens: HotelTrader answers should mention sync lag and mismatch rate, not just API latency.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- freshness is a measurable property");
        System.out.println("- supplier lag can turn correct code into wrong product behavior");
        System.out.println("- platform APIs need trust metrics, not only uptime metrics");
    }
```

## Walkthrough

1. Keep the last supplier update time.
2. Compare it with now.
3. Mark inventory as stale when the lag is too large.

What to observe:

- isFresh = false
- syncLagMinutes = 17

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading availability freshness as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [AvailabilityFreshness.java](AvailabilityFreshness.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why availability freshness exists, what problem it solves, and what the runnable file proves.
