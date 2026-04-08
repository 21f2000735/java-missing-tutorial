---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# ConcurrentHashMap Internals

## Topic / Problem
- Real problem: many threads update a shared map, like inventory or rate counters.
- Why this Java feature: `ConcurrentHashMap` is built for concurrent reads and writes.

Bad code:
```java
Map<String, Integer> stock = Collections.synchronizedMap(new HashMap<>());
```
Good code:
```java
Map<String, Integer> stock = new ConcurrentHashMap<>();
```

## Intuition
- Java 7 used segment locking.
- Java 8+ moved toward CAS operations and bin-level locking.
- Comparison table:

| Update need | Best method | Why |
| --- | --- | --- |
| Create only if missing | `putIfAbsent()` | avoids duplicate initialization |
| Increment safely | `merge()` | atomic update style |
| Lazy value creation | `computeIfAbsent()` | build once, reuse many times |

## Small Code Snippet
- The runnable example increments the same SKU from two threads.
- Expected output:
  - `sku-1 = 2000`
  - `sku-2 = 50`

## Internal Working
- Reads are designed to be highly concurrent.
- Writes coordinate at a smaller granularity than a synchronized wrapper.
- Trap callout: use map atomic helpers like `computeIfAbsent()` and `merge()` instead of check-then-act code.

## Comparison With Other
- `Collections.synchronizedMap()` serializes access around a wrapper.
- `ConcurrentHashMap` is the real concurrent structure.
- The weakly consistent iterator does not fail on concurrent updates.

## Famous Company Interview Question
Q: Why is `ConcurrentHashMap` better than a synchronized wrapper for heavy access?
A: Because it scales better by avoiding one big lock.

Q: When should you use `computeIfAbsent()`?
A: When you want to create a value only once under concurrency.

Q: What changed in Java 8?
A: It moved away from segment locking toward finer-grained concurrency control.
