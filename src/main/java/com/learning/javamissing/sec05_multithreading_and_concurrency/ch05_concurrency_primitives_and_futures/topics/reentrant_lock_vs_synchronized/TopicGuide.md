---
introduced: Java 5
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# ReentrantLock Vs Synchronized

## Topic / Problem
- Real problem: shared data needs mutual exclusion, but sometimes you also need timeout or interruptible waiting.
- Why this Java feature: `ReentrantLock` exposes more control than `synchronized`.

Bad code:
```java
// one giant synchronized block around everything
```
Good code:
```java
if (lock.tryLock(30, TimeUnit.MILLISECONDS)) {
    try { /* critical section */ }
    finally { lock.unlock(); }
}
```

## Intuition
- `synchronized` is simple and built into the language.
- `ReentrantLock` is explicit and gives more knobs.
- Comparison table:

| Need | Use | Why |
| --- | --- | --- |
| Simple mutual exclusion | `synchronized` | easiest to read |
| Timeout or fairness | `ReentrantLock` | extra control |
| Interruptible waiting | `ReentrantLock` | can respond to interruption |

## Small Code Snippet
- The runnable example holds a lock, then another thread tries to acquire it with a timeout.
- Expected output:
  - `tryLock acquired = false`
  - `synchronized example = monitor-based mutual exclusion`

## Internal Working
- Both tools protect a critical section.
- `ReentrantLock` can be fair, timed, and interruptible.
- Trap callout: deadlock is often prevented by lock ordering, not by picking a different lock class.

## Comparison With Other
- Use `synchronized` for the smallest, clearest synchronized block.
- Use `ReentrantLock` when you need timeouts, fairness, or interrupt handling.
- Avoid mixing multiple lock styles on the same state.

## Famous Company Interview Question
Q: Why choose `ReentrantLock` over `synchronized`?
A: Because it supports `tryLock`, fairness, and interruptible waiting.

Q: What is deadlock?
A: A cycle where threads wait on each other's locks forever.

Q: How do you prevent deadlock in practice?
A: Use a consistent lock ordering and keep critical sections small.
