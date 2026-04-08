---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# resilient signup flow

## Why This Exists

Concept: resilient signup flow.

Distributed systems fail in pieces, not all at once.

## The Pain Before It

It shows how a signup flow can continue when one non-critical dependency fails.

Signup depends on account creation, billing, and welcome-email steps.

## Java Creator Mindset

Decide which steps are critical and which can degrade safely.

## How You Might Invent It

1. Run critical steps first.
2. Catch non-critical failure separately.
3. Return an honest degraded result.

## Naive Attempt

The naive version is to use resilient signup flow without checking what rule it is supposed to protect.

## Why It Breaks

It shows how a signup flow can continue when one non-critical dependency fails.

Edge cases usually show the bug first.

## Final Java Solution

Decide which steps are critical and which can degrade safely.

Run [ResilientSignupFlow.java](ResilientSignupFlow.java) as the source of truth for the example.

## Code

Run [ResilientSignupFlow.java](ResilientSignupFlow.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        SignupResult result = signup();

        // Expected output:
        // signupStatus = PARTIAL_SUCCESS
        System.out.println("signupStatus = " + result.status());
        System.out.println("deferredActions = " + result.deferredActions());
        System.out.println("Company lens: Netflix-style answers should show graceful degradation, not all-or-nothing panic.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- not every dependency deserves the same failure boundary");
        System.out.println("- degraded success can be better than total failure");
        System.out.println("- reliability answers need explicit recovery plans");
    }
```

## Walkthrough

1. Run critical steps first.
2. Catch non-critical failure separately.
3. Return an honest degraded result.

What to observe:

- signupStatus = PARTIAL_SUCCESS

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading resilient signup flow as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [ResilientSignupFlow.java](ResilientSignupFlow.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why resilient signup flow exists, what problem it solves, and what the runnable file proves.
