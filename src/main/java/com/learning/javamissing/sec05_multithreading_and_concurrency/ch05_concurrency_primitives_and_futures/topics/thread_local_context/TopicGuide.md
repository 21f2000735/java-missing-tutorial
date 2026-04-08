---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 8 min
mode: interview
visual: recommended
---

# ThreadLocal

## Topic / Problem
- Real problem: a request needs user/session data, but that data should not be shared across threads.
- Why this Java feature: `ThreadLocal` gives each thread its own isolated value.

Bad code:
```java
static String currentUser;
```
Good code:
```java
static final ThreadLocal<String> currentUser = new ThreadLocal<>();
```

## Intuition
- Think "one slot per thread."
- The same key name exists, but each thread reads its own value.
- Comparison table:

| Need | Use | Why |
| --- | --- | --- |
| Per-thread request context | `ThreadLocal` | isolates thread state |
| Cross-thread shared value | normal field with safety | one value is shared |
| Short-lived request data in web server | `ThreadLocal` + `remove()` | prevents leaks |

## Small Code Snippet
- The runnable example gives Alice and Bob different request contexts.
- Expected output:
  - each thread prints its own user
  - the values do not mix

## Internal Working
- Each thread keeps its own map of `ThreadLocal` values.
- Trap callout: always call `remove()` in `finally`, or thread-pool reuse can leak data between requests.

## Comparison With Other
- `ThreadLocal` is good for request-scoped state.
- It is not a replacement for proper shared-state design.
- In modern code, scoped values may be cleaner for structured concurrency use cases.

## Famous Company Interview Question
Q: Why use `ThreadLocal` in a web server?
A: To store request-scoped data like user id without sharing it across requests.

Q: What is the biggest trap?
A: Forgetting `remove()` when threads are reused.

Q: What problem does it solve better than a static field?
A: Isolation between concurrent requests.
