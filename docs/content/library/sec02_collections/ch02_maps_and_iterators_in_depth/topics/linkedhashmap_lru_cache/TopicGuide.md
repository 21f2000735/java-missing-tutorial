---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# LinkedHashMap As LRU Cache

## LinkedHashMap As LRU Cache

**Concept**

access-order LinkedHashMap can act like a small LRU cache.

**Example**

```java
    public static void main(String[] args) {
        LruCache cache = new LruCache(3);
        cache.put("home", "cached");
        cache.put("product", "cached");
        cache.put("cart", "cached");
        cache.get("home");
        cache.put("payment", "cached");

        System.out.println("Concept: access-order LinkedHashMap can act like a small LRU cache.");
        System.out.println("cache keys = " + cache.keySet());
        System.out.println("home = " + cache.get("home"));
        System.out.println("cart = " + cache.get("cart"));
        System.out.println("Why it matters: the least recently used entry is evicted automatically when size goes past the cap.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- access-order LinkedHashMap can act like a small LRU cache.
- the least recently used entry is evicted automatically when size goes past the cap.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: the least recently used entry is evicted automatically when size goes past the cap.

**Try this**

- Concept: access-order LinkedHashMap can act like a small LRU cache.
