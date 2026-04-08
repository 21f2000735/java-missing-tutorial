---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 7 min
---

# Handling Payment Failures

## Why This Exists

Concept: Handling Payment Failures.

Java programs stay useful when they are organized around ideas, not only syntax.

## The Pain Before It

failures are part of the business flow and must stay understandable.

This topic uses payment and gateway failures to make the concept easier to understand.

## Java Creator Mindset

First understand the problem in plain language, then map that idea to the Java code.

## How You Might Invent It

1. Identify the business data or behavior.
2. Choose the Java construct that expresses the idea clearly.
3. Run the example and compare the output with the explanation.

## Naive Attempt

The naive version is to use handling payment failures without checking what rule it is supposed to protect.

## Why It Breaks

failures are part of the business flow and must stay understandable.

Edge cases usually show the bug first.

## Final Java Solution

First understand the problem in plain language, then map that idea to the Java code.

Run [HandlingPaymentFailures.java](HandlingPaymentFailures.java) as the source of truth for the example.

## Code

Run [HandlingPaymentFailures.java](HandlingPaymentFailures.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        try {
            chargeCard(false);
        } catch (IllegalStateException exception) {
            System.out.println("paymentStatus = failed");
            System.out.println("reason = " + exception.getMessage());
        }
        System.out.println("Concept: errors should preserve meaning for both developers and users.");
    }
```

## Walkthrough

1. Identify the business data or behavior.
2. Choose the Java construct that expresses the idea clearly.
3. Run the example and compare the output with the explanation.

What to observe:

- Read the inline comments and printed lines in main() to see the expected behavior.

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading Handling Payment Failures as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [HandlingPaymentFailures.java](HandlingPaymentFailures.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why Handling Payment Failures exists, what problem it solves, and what the runnable file proves.
