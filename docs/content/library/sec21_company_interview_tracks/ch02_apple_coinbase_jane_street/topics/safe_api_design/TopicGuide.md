---
introduced: Java 16
status: stable
runner: embedded
estimated: 6 min
---

# safe API design

## Why This Exists

Concept: safe API design.

Good APIs reduce misuse before misuse becomes a production incident.

## The Pain Before It

It shows how validation and small construction rules make invalid states harder to create.

An internal notification API should reject incomplete requests early.

## Java Creator Mindset

API safety means the happy path is obvious and invalid states are hard to construct.

## How You Might Invent It

1. Validate required fields at creation time.
2. Keep the object small and obvious.
3. Expose clear methods instead of vague mutable state.

## Naive Attempt

The naive version is to use safe api design without checking what rule it is supposed to protect.

## Why It Breaks

It shows how validation and small construction rules make invalid states harder to create.

Edge cases usually show the bug first.

## Final Java Solution

API safety means the happy path is obvious and invalid states are hard to construct.

Run [SafeApiDesign.java](SafeApiDesign.java) as the source of truth for the example.

## Code

Run [SafeApiDesign.java](SafeApiDesign.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        NotificationRequest request = NotificationRequest.of("EMAIL", "ops@example.com", "Payment settled");

        // Expected output:
        // request = NotificationRequest[channel=EMAIL, recipient=ops@example.com, message=Payment settled]
        System.out.println("request = " + request);
        System.out.println("Why it works: the static factory validates required fields before the request exists.");
        System.out.println("Company lens: Apple-style answers should sound like 'hard to misuse' rather than 'more flexible'.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- good APIs prevent invalid states early");
        System.out.println("- validation at the boundary improves correctness");
        System.out.println("- safety is often more valuable than extra flexibility");
    }
```

## Walkthrough

1. Validate required fields at creation time.
2. Keep the object small and obvious.
3. Expose clear methods instead of vague mutable state.

What to observe:

- request = NotificationRequest[channel=EMAIL, recipient=ops@example.com, message=Payment settled]

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading safe API design as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [SafeApiDesign.java](SafeApiDesign.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why safe API design exists, what problem it solves, and what the runnable file proves.
