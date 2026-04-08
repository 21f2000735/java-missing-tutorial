---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 7 min
mode: interview
visual: required
visual_asset: GcStrategiesVisual.svg
---

# GC Strategies

## GC Strategies

**Concept**

This step focuses on: different garbage collectors optimize for different tradeoffs.

different garbage collectors optimize for different tradeoffs.

**Example**

```java
    public static void main(String[] args) {
        System.out.println("Concept: different garbage collectors optimize for different tradeoffs.");
        List<String> collectors = List.of("G1", "ZGC", "Shenandoah");

        // Expected output:
        // G1 -> balanced default for many server workloads
        // ZGC -> very low pause time focus
        // Shenandoah -> low pause time with concurrent compaction focus
        System.out.println("G1 -> balanced default for many server workloads");
        System.out.println("ZGC -> very low pause time focus");
        System.out.println("Shenandoah -> low pause time with concurrent compaction focus");
        System.out.println("collector count = " + collectors.size());
        System.out.println("Use this when: you need a first mental model before reading deeper GC tuning material.");
    }
```

![GC Strategies visual](./GcStrategiesVisual.svg)

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- different garbage collectors optimize for different tradeoffs.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

you need a first mental model before reading deeper GC tuning material.

**Rule**

👉 Rule: different garbage collectors optimize for different tradeoffs.

**Try this**

- Concept: different garbage collectors optimize for different tradeoffs.
- G1 -> balanced default for many server workloads
- ZGC -> very low pause time focus

- Next: compare this step with the next topic and notice what changes.
