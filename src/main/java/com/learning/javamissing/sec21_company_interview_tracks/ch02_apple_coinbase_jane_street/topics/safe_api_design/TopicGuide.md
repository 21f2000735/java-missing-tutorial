---
introduced: Java 16
status: stable
runner: embedded
estimated: 6 min
---

# Safe API Design

## Why This Exists

Apple-style platform questions often reward APIs that are hard to misuse.

## The Pain Before It

Apple-style platform questions often reward APIs that are hard to misuse.

## Java Creator Mindset

### Interview Angle

Mention:

- validate required fields at the boundary
- keep contracts small and obvious
- document thread safety and error behavior when relevant

## How You Might Invent It

Treat safe api design as a practical decision tool, not just a term to memorize.

## Naive Attempt

The first instinct is usually to solve the problem directly with local code and hope the edge cases stay small.

## Why It Breaks

The common mistake is to use safe api design by pattern-matching on syntax instead of understanding the decision behind it.

## Final Java Solution

### Interview Angle

Mention:

- validate required fields at the boundary
- keep contracts small and obvious
- document thread safety and error behavior when relevant

## Code

### Run It

Run the request factory and notice that validation happens before bad requests can spread.

## Walkthrough

Mention:

- validate required fields at the boundary
- keep contracts small and obvious
- document thread safety and error behavior when relevant

## Mental Model

Use a small mental model first: identify the input, the rule, and the outcome that safe api design should guarantee.

## Mistakes

The common mistake is to use safe api design by pattern-matching on syntax instead of understanding the decision behind it.

## Tradeoffs

The gain is usually safety or clarity. The cost is usually more structure, more rules, or less flexibility in the wrong place.

## Use / Avoid

Use it when it makes the code clearer or safer. Avoid it when a simpler direct approach explains the intent better.

## Summary

After this topic, you should be able to explain safe api design, run the example, and defend when it helps versus when it adds noise.

## Why This Matters

Apple-style platform questions often reward APIs that are hard to misuse.

## Intuition

Treat safe api design as a practical decision tool, not just a term to memorize.

## Problem Statement

Apple-style platform questions often reward APIs that are hard to misuse.

## Core Idea

### Interview Angle

Mention:

- validate required fields at the boundary
- keep contracts small and obvious
- document thread safety and error behavior when relevant

## Simple Example

### Run It

Run the request factory and notice that validation happens before bad requests can spread.

## Step-by-Step Working

Mention:

- validate required fields at the boundary
- keep contracts small and obvious
- document thread safety and error behavior when relevant

## Rules / Syntax

- Prefer the smallest correct rule over cleverness.
- Connect the rule back to the runnable example.

## Common Mistakes

The common mistake is to use safe api design by pattern-matching on syntax instead of understanding the decision behind it.

## When To Use / When Not To Use

Use it when it makes the code clearer or safer. Avoid it when a simpler direct approach explains the intent better.

## Practice

Change one part of the runnable example, rerun it, and explain whether safe api design still behaves the way you expected.

### After That

Read `TransferIdempotency` next to switch from API safety to money safety.

## The Problem

Apple-style platform questions often reward APIs that are hard to misuse.

## Run This Code

Run the request factory and notice that validation happens before bad requests can spread.

## Strong Interview Answer

Mention:

- validate required fields at the boundary
- keep contracts small and obvious
- document thread safety and error behavior when relevant

## Next Topic

Read `TransferIdempotency` next to switch from API safety to money safety.
