---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Fail-Fast Vs Fail-Safe Iterators

## Topic / Problem
- Real problem: you iterate a list of cart items while another part of code changes it.
- Why this Java feature: iterator behavior tells you whether Java should stop early or keep going.

Bad code:
```java
for (String item : cart) {
    cart.remove(item);
}
```
Good code:
```java
for (String item : new CopyOnWriteArrayList<>(cart)) {
    if (item.equals("banana")) continue;
}
```

## Intuition
- Fail-fast means "stop and tell me the collection changed."
- Fail-safe or weakly consistent means "keep going with a safe snapshot or a tolerant view."
- Comparison table:

| Collection | Iterator style | What happens |
| --- | --- | --- |
| `ArrayList` | fail-fast | `ConcurrentModificationException` |
| `CopyOnWriteArrayList` | fail-safe | iterates over a snapshot |
| `ConcurrentHashMap` | weakly consistent | tolerates concurrent updates |

## Small Code Snippet
- The runnable example throws `ConcurrentModificationException` on `ArrayList`.
- It then shows `CopyOnWriteArrayList` and `ConcurrentHashMap` behaving safely during iteration.

## Internal Working
- Fail-fast iterators compare a modification count while iterating.
- They are for bug detection, not concurrency safety.
- Trap callout: fail-fast does not mean "thread-safe." It means "early failure when the structure changes unexpectedly."

## Comparison With Other
- `ArrayList` is strict and good for single-threaded iteration.
- `CopyOnWriteArrayList` is better when reads are common and writes are rare.
- `ConcurrentHashMap` is designed for shared concurrent access.

## Famous Company Interview Question
Q: Why do fail-fast iterators throw `ConcurrentModificationException`?
A: Because the collection changed structurally while the iterator was using it.

Q: Is fail-fast the same as thread-safe?
A: No. It only detects unexpected modification.

Q: When would you use `CopyOnWriteArrayList`?
A: When iteration is frequent and writes are rare.
