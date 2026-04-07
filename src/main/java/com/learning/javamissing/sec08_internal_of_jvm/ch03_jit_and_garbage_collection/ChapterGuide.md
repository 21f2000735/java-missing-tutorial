# JIT And Garbage Collection Learning Kit

## Why This Chapter Matters

This chapter introduces the runtime optimizations and cleanup work the JVM keeps doing while your code runs.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

Developers often know the terms JIT and GC, but not what practical questions those terms answer.

## Core Ideas

- what JIT compilation is trying to improve
- why “hot code” matters
- generational GC intuition
- when people mention G1, ZGC, and Shenandoah

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [JitBasics.java](topics/jit_basics/JitBasics.java)
2. Run [GcStrategies.java](topics/gc_strategies/GcStrategies.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- why Java code is not only interpreted forever
- why GC is a family of strategies, not one fixed algorithm
- how to talk about GC choices without pretending to be a JVM engineer

## The Problem

Developers often know the terms JIT and GC, but not what practical questions those terms answer.

## What This Chapter Covers

- what JIT compilation is trying to improve
- why “hot code” matters
- generational GC intuition
- when people mention G1, ZGC, and Shenandoah

## After Reading This Chapter, You Should Know

- why Java code is not only interpreted forever
- why GC is a family of strategies, not one fixed algorithm
- how to talk about GC choices without pretending to be a JVM engineer
