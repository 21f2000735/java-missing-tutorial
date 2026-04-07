---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
---

# Running Median Prices

## Why This Matters

This is a strong Jane Street-style question because it tests whether you can keep invariants visible while data changes.

## Intuition

Treat running median prices as a practical decision tool, not just a term to memorize.

## Problem Statement

This is a strong Jane Street-style question because it tests whether you can keep invariants visible while data changes.

## Core Idea

### Interview Angle

Mention:

- lower half max-heap
- upper half min-heap
- rebalance rule
- how median is read when sizes match or differ

## Mental Model

Use a small mental model first: identify the input, the rule, and the outcome that running median prices should guarantee.

## Simple Example

### Run It

Run the stream of prices and explain why the median stays readable after each insert.

## Step-by-Step Working

Mention:

- lower half max-heap
- upper half min-heap
- rebalance rule
- how median is read when sizes match or differ

## Rules / Syntax

- Prefer the smallest correct rule over cleverness.
- Connect the rule back to the runnable example.

## Common Mistakes

The common mistake is to use running median prices by pattern-matching on syntax instead of understanding the decision behind it.

## When To Use / When Not To Use

Use it when it makes the code clearer or safer. Avoid it when a simpler direct approach explains the intent better.

## Practice

Change one part of the runnable example, rerun it, and explain whether running median prices still behaves the way you expected.

### After That

Go to `ch03_netflix_makemytrip_hoteltrader` for reliability and marketplace-style backend design.

## Summary

After this topic, you should be able to explain running median prices, run the example, and defend when it helps versus when it adds noise.

## The Problem

This is a strong Jane Street-style question because it tests whether you can keep invariants visible while data changes.

## Run This Code

Run the stream of prices and explain why the median stays readable after each insert.

## Strong Interview Answer

Mention:

- lower half max-heap
- upper half min-heap
- rebalance rule
- how median is read when sizes match or differ

## Next Topic

Go to `ch03_netflix_makemytrip_hoteltrader` for reliability and marketplace-style backend design.
