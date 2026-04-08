---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# HashMap Internals

## Topic / Problem
- Real problem: you need fast lookup for orders, users, or inventory items.
- Why this Java feature: `HashMap` gives average O(1) lookup when keys are stable.

Bad code:
```java
class MutableKey {
    String id;
    public int hashCode() { return id.hashCode(); }
}
```
Good code:
```java
final class OrderKey {
    final String id;
    public int hashCode() { return id.hashCode(); }
}
```

## Intuition
- `put()` chooses a bucket from `hashCode()`.
- `get()` uses `hashCode()` first, then `equals()` to find the exact key.
- Comparison table:

| Need | Use | Why |
| --- | --- | --- |
| Fast lookup by key | `HashMap` | average O(1) access |
| Stable insertion order | `LinkedHashMap` | remembers order |
| Sorted keys | `TreeMap` | keeps keys ordered |

## Small Code Snippet
- The runnable example inserts two order keys with the same hash value.
- Expected output:
  - `get(ORD-101) = paid`
  - `collision lookup = packed`
  - after mutating the key, the lookup breaks

## Internal Working
- Collision handling starts as a bucket chain.
- In modern Java, a long collision chain can treeify at threshold 8 when the table is large enough.
- Resize usually happens around load factor `0.75`.
- Trap callout: never use mutable keys in a `HashMap`. If the key changes after `put()`, the entry becomes hard to find.

## Comparison With Other
- `HashMap` is best for general lookup.
- `LinkedHashMap` adds order tracking.
- `TreeMap` adds sorted keys but trades speed for ordering.

## Famous Company Interview Question
Q: Why should `HashMap` keys be immutable?
A: Because lookup depends on the key's hash and equality remaining stable after insertion.

Q: What happens when two keys collide?
A: They share a bucket, and Java uses `equals()` to pick the right entry.

Q: When does resizing happen?
A: When the table crosses the load factor threshold, usually `0.75`.
