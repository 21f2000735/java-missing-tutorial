---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# Idempotent Reservations

## Why This Matters

Reservation and booking systems always get retries.
The wrong answer is to trust the client not to retry.

## Intuition

Treat idempotent reservations as a practical decision tool, not just a term to memorize.

## Problem Statement

Reservation and booking systems always get retries.
The wrong answer is to trust the client not to retry.

## Core Idea

### Interview Angle

Mention:

- request id or idempotency key
- durable result storage
- same result returned on duplicate call
- metric: duplicate request rate and overbooking incidents

### Company Lens

- Amazon: ownership and customer trust
- Meta: practical backend safety under retry storms

## Mental Model

Use a small mental model first: identify the input, the rule, and the outcome that idempotent reservations should guarantee.

## Simple Example

### Run It

Run the same request twice and notice that only one reservation is created.

## Step-by-Step Working

Mention:

- request id or idempotency key
- durable result storage
- same result returned on duplicate call
- metric: duplicate request rate and overbooking incidents

## Rules / Syntax

- Prefer the smallest correct rule over cleverness.
- Connect the rule back to the runnable example.

## Common Mistakes

The common mistake is to use idempotent reservations by pattern-matching on syntax instead of understanding the decision behind it.

## When To Use / When Not To Use

Use it when it makes the code clearer or safer. Avoid it when a simpler direct approach explains the intent better.

## Practice

Change one part of the runnable example, rerun it, and explain whether idempotent reservations still behaves the way you expected.

### After That

Read `LatencyDebugPlaybook` next. It shows how to answer release-regression questions without hand-waving.

## Summary

After this topic, you should be able to explain idempotent reservations, run the example, and defend when it helps versus when it adds noise.

## The Problem

Reservation and booking systems always get retries.
The wrong answer is to trust the client not to retry.

## Run This Code

Run the same request twice and notice that only one reservation is created.

## Company Lens

- Amazon: ownership and customer trust
- Meta: practical backend safety under retry storms

## Strong Interview Answer

Mention:

- request id or idempotency key
- durable result storage
- same result returned on duplicate call
- metric: duplicate request rate and overbooking incidents

## Next Topic

Read `LatencyDebugPlaybook` next. It shows how to answer release-regression questions without hand-waving.
