# JIT And Garbage Collection Learning Kit

This chapter introduces the runtime optimizations and cleanup work the JVM keeps doing while your code runs.

## The Problem

Developers often know the terms JIT and GC, but not what practical questions those terms answer.

## Study Order

1. Run [JitBasics.java](topics/jit_basics/JitBasics.java)
2. Run [GcStrategies.java](topics/gc_strategies/GcStrategies.java)

## What This Chapter Covers

- what JIT compilation is trying to improve
- why “hot code” matters
- generational GC intuition
- when people mention G1, ZGC, and Shenandoah

## After Reading This Chapter, You Should Know

- why Java code is not only interpreted forever
- why GC is a family of strategies, not one fixed algorithm
- how to talk about GC choices without pretending to be a JVM engineer
