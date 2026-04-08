---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# hotel search cache

## hotel search cache

**Concept**

Travel search is read-heavy, but stale prices and stale availability can hurt trust.

**Example**

```java
    public static void main(String[] args) {
        SearchCache cache = new SearchCache(60);
        List<String> hotels = cache.search("goa|2026-05-10|2026-05-12");
        boolean cacheHit = cache.search("goa|2026-05-10|2026-05-12").equals(hotels);

        // Expected output:
        // cacheHit = true
        // hotels = [Sea View, Central Stay]
        System.out.println("cacheHit = " + cacheHit);
        System.out.println("hotels = " + hotels);
        System.out.println("Company lens: MakeMyTrip answers should mention cache hit rate and stale-result risk together.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- cache keys should reflect the search shape");
        System.out.println("- short freshness windows are often safer for travel data");
        System.out.println("- latency improvement is not enough if correctness degrades");
    }
```

**What happens**

- cache keys should reflect the search shape

**What stays stable**

- cache keys should reflect the search shape

**What changes**

- It caches expensive search responses while keeping a short freshness window.

**Why it matters**

Travel search is read-heavy, but stale prices and stale availability can hurt trust.

**Rule**

👉 Rule: cache keys should reflect the search shape

**Try this**

- Build a cache key from search input. 2. Return cached results when still fresh. 3. Refresh after the freshness window expires.
