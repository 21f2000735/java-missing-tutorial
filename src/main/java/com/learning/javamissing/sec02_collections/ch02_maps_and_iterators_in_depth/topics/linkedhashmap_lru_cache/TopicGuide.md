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

Concept: access-order LinkedHashMap can act like a small LRU cache.

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

- Concept: access-order LinkedHashMap can act like a small LRU cache.

**What stays stable**

- Concept: access-order LinkedHashMap can act like a small LRU cache. Why it matters: the least recently used entry is evicted automatically when size goes past the cap.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: access-order LinkedHashMap can act like a small LRU cache. Why it matters: the least recently used entry is evicted automatically when size goes past the cap.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: access-order LinkedHashMap can act like a small LRU cache. Why it matters: the least recently used entry is evicted automatically when size goes past the cap.

**Rule**

👉 Rule: Concept: access-order LinkedHashMap can act like a small LRU cache.

**Try this**

- Concept: access-order LinkedHashMap can act like a small LRU cache.
