---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# GC Algorithms Comparison

## Topic / Problem
- Real problem: the right garbage collector depends on heap size and pause-time requirements.
- Why this Java feature: each GC algorithm balances throughput, latency, and complexity differently.

Bad code:
```java
// always use one GC without checking the workload
```
Good code:
```java
// choose GC based on pause-time and throughput goals
```

## Intuition
- Serial GC keeps things simple for small heaps.
- Parallel GC maximizes throughput.
- G1 aims for predictable pauses.
- Comparison table:

| GC | Best for | Main tradeoff |
| --- | --- | --- |
| Serial | tiny heaps | single-threaded pauses |
| Parallel | throughput | longer pauses than low-latency collectors |
| G1 | balanced workloads | more tuning than serial |
| ZGC | huge heaps, low latency | newer and more specialized |

## Small Code Snippet
- The runnable example prints the main GC families and common flags.
- Expected output:
  - `G1 GC = region based, predictable pauses`
  - `ZGC = concurrent compaction, sub-10ms pauses`

## Internal Working
- Serial and Parallel stop the world more aggressively.
- G1 divides the heap into regions.
- ZGC and Shenandoah focus on concurrent work to reduce long pauses.
- Trap callout: the "best" GC is workload-specific, not universally the newest one.

## Comparison With Other
- Use Serial for small/simple heaps.
- Use Parallel when throughput matters more than pause time.
- Use G1 for balanced server workloads.
- Use ZGC or Shenandoah when latency is the main concern.

## Famous Company Interview Question
Q: Why would you choose G1 over Parallel GC?
A: Because G1 usually gives more predictable pause times.

Q: When is ZGC attractive?
A: When the heap is large and pause time must stay very low.

Q: Should you always pick the newest collector?
A: No. Pick the one that matches the workload.
