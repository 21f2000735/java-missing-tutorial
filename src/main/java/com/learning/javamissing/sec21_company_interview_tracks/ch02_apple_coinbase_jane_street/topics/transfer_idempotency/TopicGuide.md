---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# Transfer Idempotency

## Why This Matters

Financial systems cannot treat duplicate requests as harmless noise.

## Intuition

Treat transfer idempotency as a practical decision tool, not just a term to memorize.

## Problem Statement

Financial systems cannot treat duplicate requests as harmless noise.

## Core Idea

### Interview Angle

Mention:

- idempotency key
- persisted result
- ledger truth
- source-of-truth versus derived views

### Company Lens

- Coinbase: correctness first
- Apple: boundary contracts still matter here too

## Mental Model

Use a small mental model first: identify the input, the rule, and the outcome that transfer idempotency should guarantee.

## Simple Example

### Run It

Run the same transfer twice and notice that the system keeps one ledger entry.

## Step-by-Step Working

Mention:

- idempotency key
- persisted result
- ledger truth
- source-of-truth versus derived views

## Rules / Syntax

- Prefer the smallest correct rule over cleverness.
- Connect the rule back to the runnable example.

## Common Mistakes

The common mistake is to use transfer idempotency by pattern-matching on syntax instead of understanding the decision behind it.

## When To Use / When Not To Use

Use it when it makes the code clearer or safer. Avoid it when a simpler direct approach explains the intent better.

## Practice

Change one part of the runnable example, rerun it, and explain whether transfer idempotency still behaves the way you expected.

### After That

Read `RunningMedianPrices` next for the algorithm and invariant side of high-bar interviews.

## Summary

After this topic, you should be able to explain transfer idempotency, run the example, and defend when it helps versus when it adds noise.

## The Problem

Financial systems cannot treat duplicate requests as harmless noise.

## Run This Code

Run the same transfer twice and notice that the system keeps one ledger entry.

## Company Lens

- Coinbase: correctness first
- Apple: boundary contracts still matter here too

## Strong Interview Answer

Mention:

- idempotency key
- persisted result
- ledger truth
- source-of-truth versus derived views

## Next Topic

Read `RunningMedianPrices` next for the algorithm and invariant side of high-bar interviews.
