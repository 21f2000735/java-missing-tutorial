# Concurrency Primitives And Futures Learning Kit

## Why This Chapter Matters

This chapter covers the concurrency tools teams reach for after raw threads are no longer enough.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

You may understand `Thread`, but real services also need visibility guarantees, safer coordination, and async result handling.

## Core Ideas

- what `volatile` actually guarantees
- `synchronized` vs `ReentrantLock`
- `CountDownLatch`, `Semaphore`, and `CyclicBarrier` mental models
- `CompletableFuture` chaining basics

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [VisibilityAndVolatile.java](topics/visibility_and_volatile/VisibilityAndVolatile.java)
2. Run [LocksLatchesAndFutures.java](topics/locks_latches_and_futures/LocksLatchesAndFutures.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- why visibility and atomicity are different questions
- why coordination primitives solve different waiting problems
- why `CompletableFuture` is about workflow composition, not only background execution

## The Problem

You may understand `Thread`, but real services also need visibility guarantees, safer coordination, and async result handling.

## What This Chapter Covers

- what `volatile` actually guarantees
- `synchronized` vs `ReentrantLock`
- `CountDownLatch`, `Semaphore`, and `CyclicBarrier` mental models
- `CompletableFuture` chaining basics

## After Reading This Chapter, You Should Know

- why visibility and atomicity are different questions
- why coordination primitives solve different waiting problems
- why `CompletableFuture` is about workflow composition, not only background execution
