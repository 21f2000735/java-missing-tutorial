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

This step focuses on: Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.

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

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.

**Try this**

- Why it matters: ConcurrentHashMap is designed for shared reads and writes without one giant map-wide lock.

- Next: compare this step with the next topic and notice what changes.
