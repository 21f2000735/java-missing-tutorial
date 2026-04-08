---
introduced: Java 5
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# CountDownLatch Vs CyclicBarrier Vs Phaser

## CountDownLatch Vs CyclicBarrier Vs Phaser

**Concept**

This step focuses on: Why it matters: each tool waits differently, so choosing the right one keeps coordination readable.

Why it matters: each tool waits differently, so choosing the right one keeps coordination readable. CountDownLatch merge = all preload tasks finished Phaser merge = dynamic parties can join and leave

**Example**

```java
    public static void main(String[] args) throws Exception {
        demoCountDownLatch();
        demoCyclicBarrier();
        demoPhaser();
        System.out.println("Why it matters: each tool waits differently, so choosing the right one keeps coordination readable.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- each tool waits differently, so choosing the right one keeps coordination readable.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: each tool waits differently, so choosing the right one keeps coordination readable.

**Try this**

- CountDownLatch merge = all preload tasks finished
- Phaser merge = dynamic parties can join and leave

- Next: compare this step with the next topic and notice what changes.
