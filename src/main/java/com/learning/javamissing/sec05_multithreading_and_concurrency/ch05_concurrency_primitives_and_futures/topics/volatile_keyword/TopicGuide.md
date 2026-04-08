---
introduced: Java 5
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# Volatile Keyword

## Topic / Problem
- Real problem: one thread sets a flag and another thread must see it immediately.
- Why this Java feature: `volatile` gives visibility across threads without full locking.

Bad code:
```java
boolean shutdownRequested;
```
Good code:
```java
volatile boolean shutdownRequested;
```

## Intuition
- `volatile` says "read the latest value from memory."
- It does not say "make compound updates atomic."
- Comparison table:

| Need | Use | Why |
| --- | --- | --- |
| Stop flag visibility | `volatile` | other threads see the update |
| Counter increments | `AtomicInteger` | increments must be atomic |
| Shared blocks of work | `synchronized` / `Lock` | protects a critical section |

## Small Code Snippet
- The runnable example stops a worker thread with a volatile flag.
- It then uses `AtomicInteger` for a safe shared count.
- Expected output:
  - `worker observed shutdown = true`
  - `AtomicInteger count = 2000`

## Internal Working
- `volatile` creates a happens-before style visibility guarantee.
- It is enough for one-way signals and cached configuration reads.
- Trap callout: `volatile` is not enough for `count++` or any read-modify-write operation.

## Comparison With Other
- `volatile` is lighter than a lock.
- `AtomicInteger` handles atomic updates on one value.
- `synchronized` protects a larger critical section.

## Famous Company Interview Question
Q: What does `volatile` guarantee?
A: Visibility and ordering for that variable, not atomic compound updates.

Q: When is `volatile` not enough?
A: When multiple steps must happen together, such as incrementing a counter.

Q: Why use volatile in double-checked locking?
A: To prevent reading a half-initialized singleton instance.
