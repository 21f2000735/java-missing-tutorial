---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
---

# Running Median Prices

## Why This Exists

This is a strong Jane Street-style question because it tests whether you can keep invariants visible while data changes.

## The Pain Before It

This is a strong Jane Street-style question because it tests whether you can keep invariants visible while data changes.

## Java Creator Mindset

### Interview Angle

Mention:

- lower half max-heap
- upper half min-heap
- rebalance rule
- how median is read when sizes match or differ

## How You Might Invent It

Treat running median prices as a practical decision tool, not just a term to memorize.

## Naive Attempt

The first instinct is usually to solve the problem directly with local code and hope the edge cases stay small.

## Why It Breaks

The common mistake is to use running median prices by pattern-matching on syntax instead of understanding the decision behind it.

## Final Java Solution

### Interview Angle

Mention:

- lower half max-heap
- upper half min-heap
- rebalance rule
- how median is read when sizes match or differ

## Code

### Run It

Run the stream of prices and explain why the median stays readable after each insert.

## Walkthrough

Mention:

- lower half max-heap
- upper half min-heap
- rebalance rule
- how median is read when sizes match or differ

## Mental Model

Use a small mental model first: identify the input, the rule, and the outcome that running median prices should guarantee.

## Mistakes

The common mistake is to use running median prices by pattern-matching on syntax instead of understanding the decision behind it.

## Tradeoffs

The gain is usually safety or clarity. The cost is usually more structure, more rules, or less flexibility in the wrong place.

## Use / Avoid

Use it when it makes the code clearer or safer. Avoid it when a simpler direct approach explains the intent better.

## Practice

Change one part of the runnable example, rerun it, and explain whether running median prices still behaves the way you expected.

### After That

Go to `ch03_netflix_makemytrip_hoteltrader` for reliability and marketplace-style backend design.

## Summary

After this topic, you should be able to explain running median prices, run the example, and defend when it helps versus when it adds noise.
