---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# LinkedHashMap As LRU Cache

## Topic / Problem
- Real problem: keep only the most recently used entries, like a product-page cache.
- Why this Java feature: `LinkedHashMap` remembers order without extra bookkeeping.

Bad code:
```java
Map<String, String> cache = new HashMap<>();
```
Good code:
```java
class LruCache extends LinkedHashMap<String, String> {
    protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
        return size() > 3;
    }
}
```

## Intuition
- In insertion-order mode, entries stay in the order they were added.
- In access-order mode, a `get()` moves the entry to the end.
- Comparison table:

| Mode | What moves the entry | Best use |
| --- | --- | --- |
| Insertion order | nothing after insert | read-mostly ordered lists |
| Access order | `get()` and `put()` | LRU cache |

## Small Code Snippet
- The runnable example stores three keys, touches `home`, then inserts `payment`.
- Expected output:
  - `cart` gets evicted
  - `home` stays because it was recently accessed

## Internal Working
- `removeEldestEntry()` runs after insertion.
- `accessOrder=true` is the switch that makes the structure act like an LRU cache.
- Trap callout: if you forget access-order mode, your cache becomes insertion-order, not LRU.

## Comparison With Other
- `LinkedHashMap` is simpler than building a separate cache class.
- A plain `HashMap` does not remember usage order.
- A real production cache may also need expiry, not only LRU.

## Famous Company Interview Question
Q: How do you build an LRU cache in Java?
A: Use `LinkedHashMap` in access-order mode and override `removeEldestEntry()`.

Q: Why does access-order matter?
A: Because the least recently used entry should move out, not the oldest inserted one.

Q: What extra feature might a production cache need?
A: Expiry or time-based eviction.
