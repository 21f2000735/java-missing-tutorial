---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# GC Algorithms Comparison

## GC Algorithms Comparison

**Concept**

different GC algorithms optimize different tradeoffs.

**Example**

```java
    public static void main(String[] args) {
        System.out.println("Concept: different GC algorithms optimize different tradeoffs.");
        System.out.println("Serial GC = single-threaded, simple, small heaps");
        System.out.println("Parallel GC = throughput focused, multi-threaded");
        System.out.println("G1 GC = region based, predictable pauses");
        System.out.println("ZGC = concurrent compaction, sub-10ms pauses");
        System.out.println("Shenandoah = concurrent evacuation");
        System.out.println("Flags: -XX:+UseG1GC, -XX:+UseZGC");
        System.out.println("Why it matters: the best GC depends on latency target, heap size, and throughput needs.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- different GC algorithms optimize different tradeoffs.
- the best GC depends on latency target, heap size, and throughput needs.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: the best GC depends on latency target, heap size, and throughput needs.

**Try this**

- Concept: different GC algorithms optimize different tradeoffs.
- Serial GC = single-threaded, simple, small heaps
- Parallel GC = throughput focused, multi-threaded
