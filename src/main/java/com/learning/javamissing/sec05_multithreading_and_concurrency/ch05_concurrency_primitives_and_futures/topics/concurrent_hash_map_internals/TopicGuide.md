---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# ConcurrentHashMap Internals

## ConcurrentHashMap Internals

**Concept**

Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.

**Example**

```java
    public static void main(String[] args) throws InterruptedException {
        Map<String, Integer> stock = new ConcurrentHashMap<>();
        stock.putIfAbsent("sku-1", 0);

        Thread first = new Thread(() -> addUnits(stock, "sku-1"));
        Thread second = new Thread(() -> addUnits(stock, "sku-1"));
        first.start();
        second.start();
        first.join();
        second.join();

        stock.computeIfAbsent("sku-2", key -> 50);
        System.out.println("sku-1 = " + stock.get("sku-1"));
        System.out.println("sku-2 = " + stock.get("sku-2"));
        System.out.println("Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.");
    }
```

**What happens**

- Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.

**What stays stable**

- Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.

**Rule**

👉 Rule: Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.

**Try this**

- Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.
