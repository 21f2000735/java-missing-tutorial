# JIT And Garbage Collection Learning Kit

## Why This Chapter Exists

This chapter exists because many developers know the words JIT and GC but cannot connect them to runtime behavior.

## The Pain Before It

Weak JVM explanations often sound like this:

- "Java is interpreted."
- "The garbage collector just deletes memory."
- "G1, ZGC, and Shenandoah are just names."

Those answers miss the real design pressure: Java is trying to run managed code fast enough while still reclaiming memory safely.

## Java Creator Mindset

Read this chapter around two moving runtime loops:

- hot code gets optimized
- unreachable objects get reclaimed

The JVM is not frozen after startup. It keeps adapting while the program runs.

## How You Might Invent It

If Java only interpreted bytecode forever, long-running applications would leave a lot of performance on the table.

If Java never reclaimed unreachable objects, server processes would just keep growing.

So the runtime needs two ongoing systems:

- JIT compilation for hot paths
- garbage collection for memory recovery

## Naive Attempt

The naive mental model is:

- compilation happens only before runtime
- memory cleanup is one fixed delete algorithm

## Why It Breaks

That breaks when you need to explain:

- why repeated code paths can become faster over time
- why low-pause collectors exist
- why GC choice is about tradeoffs, not one universal "best collector"

## Final Java Direction

Keep this chapter simple:

- JIT is about optimizing frequently executed code
- GC is about reclaiming memory with different pause/throughput tradeoffs

Do not pretend to be a JVM tuner. Build the first correct mental model.

## Study Order

1. Run [JitBasics.java](topics/jit_basics/JitBasics.java)
2. Run [GcStrategies.java](topics/gc_strategies/GcStrategies.java)
3. Explain what "hot path" and "pause time" mean in plain language

## What To Notice

- repeated execution is the signal that attracts stronger optimization
- GC strategy names matter because runtime goals differ
- low pause and high throughput are related but not identical goals

### Compare With

| Compare | Left Side | Right Side |
| --- | --- | --- |
| interpreted only | simpler mental model | lower long-run performance |
| JIT compilation | more adaptive runtime | more complex implementation |
| GC choice | throughput focus | pause-time focus |

### Interview Focus

Q: What is the simplest correct explanation of JIT?  
A: The JVM watches hot code and compiles frequently used paths more aggressively while the program runs.

Q: Why are there multiple collectors?  
A: Because workloads trade throughput, latency, and memory behavior differently.

## Mental Model

Use this runtime picture:

- your code runs
- the JVM observes patterns
- hot code gets optimized
- unreachable objects become GC candidates

The runtime keeps making decisions after startup.

## Common Mistakes

- saying Java is "only interpreted"
- treating GC like one universal algorithm
- answering collector questions with brand names but no tradeoff explanation

## Tradeoffs

JIT gives you better long-run performance but adds runtime complexity.

GC gives you managed memory but forces tradeoffs among:

- pause time
- throughput
- memory overhead

## Use / Avoid

### Use It When

- you need a first JVM performance model
- you are preparing for backend interviews
- you want to talk about GC choices without hand-waving

### Avoid It When

- you are guessing collector names without explaining the runtime goal behind them

## Practice

### Small Exercise

Take a service with latency-sensitive traffic. Explain why a low-pause collector might be discussed, and then explain why that still does not mean "always best."

## Summary

After this chapter, you should be able to explain the JVM as an adaptive runtime:

- JIT optimizes hot paths
- GC reclaims memory
- collector choice is about tradeoffs, not magic

## Sources

- Java HotSpot VM documentation: https://docs.oracle.com/en/java/
