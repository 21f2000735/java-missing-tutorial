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

Concept: different GC algorithms optimize different tradeoffs.

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

- Concept: different GC algorithms optimize different tradeoffs.
- Serial GC = single-threaded, simple, small heaps
- Parallel GC = throughput focused, multi-threaded

**What stays stable**

- Concept: different GC algorithms optimize different tradeoffs. Serial GC = single-threaded, simple, small heaps Parallel GC = throughput focused, multi-threaded G1 GC = region based, predictable pauses ZGC = concurrent compaction, sub-10ms pauses Shenandoah = concurrent evacuation Flags: -XX:+UseG1GC, -XX:+UseZGC Why it matters: the best GC depends on latency target, heap size, and throughput needs.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: different GC algorithms optimize different tradeoffs. Serial GC = single-threaded, simple, small heaps Parallel GC = throughput focused, multi-threaded G1 GC = region based, predictable pauses ZGC = concurrent compaction, sub-10ms pauses Shenandoah = concurrent evacuation Flags: -XX:+UseG1GC, -XX:+UseZGC Why it matters: the best GC depends on latency target, heap size, and throughput needs.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: different GC algorithms optimize different tradeoffs. Serial GC = single-threaded, simple, small heaps Parallel GC = throughput focused, multi-threaded G1 GC = region based, predictable pauses ZGC = concurrent compaction, sub-10ms pauses Shenandoah = concurrent evacuation Flags: -XX:+UseG1GC, -XX:+UseZGC Why it matters: the best GC depends on latency target, heap size, and throughput needs.

**Rule**

👉 Rule: Concept: different GC algorithms optimize different tradeoffs.

**Try this**

- Concept: different GC algorithms optimize different tradeoffs.
- Serial GC = single-threaded, simple, small heaps
- Parallel GC = throughput focused, multi-threaded
