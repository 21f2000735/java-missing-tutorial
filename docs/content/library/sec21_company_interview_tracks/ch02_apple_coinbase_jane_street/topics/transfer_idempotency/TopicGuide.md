---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# Transfer Idempotency

## Why This Exists

Financial systems cannot treat duplicate requests as harmless noise.

## The Pain Before It

Financial systems cannot treat duplicate requests as harmless noise.

## Java Creator Mindset

### Interview Angle

Mention:

- idempotency key
- persisted result
- ledger truth
- source-of-truth versus derived views

### Company Lens

- Coinbase: correctness first
- Apple: boundary contracts still matter here too

## How You Might Invent It

Treat transfer idempotency as a practical decision tool, not just a term to memorize.

## Naive Attempt

The first instinct is usually to solve the problem directly with local code and hope the edge cases stay small.

## Why It Breaks

The common mistake is to use transfer idempotency by pattern-matching on syntax instead of understanding the decision behind it.

## Final Java Solution

### Interview Angle

Mention:

- idempotency key
- persisted result
- ledger truth
- source-of-truth versus derived views

### Company Lens

- Coinbase: correctness first
- Apple: boundary contracts still matter here too

## Code

### Run It

Run the same transfer twice and notice that the system keeps one ledger entry.

## Walkthrough

Mention:

- idempotency key
- persisted result
- ledger truth
- source-of-truth versus derived views

## Mental Model

Use a small mental model first: identify the input, the rule, and the outcome that transfer idempotency should guarantee.

## Mistakes

The common mistake is to use transfer idempotency by pattern-matching on syntax instead of understanding the decision behind it.

## Tradeoffs

The gain is usually safety or clarity. The cost is usually more structure, more rules, or less flexibility in the wrong place.

## Use / Avoid

Use it when it makes the code clearer or safer. Avoid it when a simpler direct approach explains the intent better.

## Practice

Change one part of the runnable example, rerun it, and explain whether transfer idempotency still behaves the way you expected.

### After That

Read `RunningMedianPrices` next for the algorithm and invariant side of high-bar interviews.

## Summary

After this topic, you should be able to explain transfer idempotency, run the example, and defend when it helps versus when it adds noise.
