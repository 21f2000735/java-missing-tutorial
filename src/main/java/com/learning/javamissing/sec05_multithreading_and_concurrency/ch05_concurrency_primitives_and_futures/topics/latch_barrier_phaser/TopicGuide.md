---
introduced: Java 5
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# CountDownLatch Vs CyclicBarrier Vs Phaser

## Topic / Problem
- Real problem: multiple parallel tasks must meet before you merge their results.
- Why this Java feature: each coordination tool waits in a different way.

Bad code:
```java
while (!allDone) {
    // busy wait
}
```
Good code:
```java
latch.await();
barrier.await();
phaser.arriveAndAwaitAdvance();
```

## Intuition
- `CountDownLatch` is one-time only.
- `CyclicBarrier` is reusable after all parties arrive.
- `Phaser` can add or remove parties dynamically.
- Comparison table:

| Tool | Reusable | Best for |
| --- | --- | --- |
| `CountDownLatch` | no | one-time start/finish gate |
| `CyclicBarrier` | yes | repeated phases with fixed parties |
| `Phaser` | yes | dynamic parties and phased work |

## Small Code Snippet
- The runnable example preloads orders and payments with a latch.
- It then shows barrier and phaser coordination.

## Internal Working
- A latch only counts down.
- A barrier waits for all parties, then opens together.
- A phaser tracks phase numbers and can register or deregister parties.
- Trap callout: if the parties are dynamic, a latch is usually the wrong choice.

## Comparison With Other
- Use `CountDownLatch` when the count is known once.
- Use `CyclicBarrier` when the same team repeats the same checkpoint.
- Use `Phaser` when workers may join late or leave early.

## Famous Company Interview Question
Q: What is the main difference between `CountDownLatch` and `CyclicBarrier`?
A: A latch counts down once; a barrier resets for the next phase.

Q: When would you choose `Phaser`?
A: When the number of participating threads can change.

Q: Why is busy waiting a bad idea?
A: It wastes CPU and makes the code harder to reason about.
