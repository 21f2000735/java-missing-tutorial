---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Fail-Fast Vs Fail-Safe Iterators

## Fail-Fast Vs Fail-Safe Iterators

**Concept**

Concept: ArrayList iterators are fail-fast.

**Example**

```java
    public static void main(String[] args) {
        List<String> failFast = new ArrayList<>(List.of("apple", "banana", "cherry"));
        System.out.println("Concept: ArrayList iterators are fail-fast.");
        try {
            for (String item : failFast) {
                if (item.equals("banana")) {
                    failFast.remove(item);
                }
            }
        } catch (ConcurrentModificationException exception) {
            System.out.println("fail-fast exception = " + exception.getClass().getSimpleName());
        }

        List<String> failSafe = new CopyOnWriteArrayList<>(List.of("order-1", "order-2"));
        for (String item : failSafe) {
            if (item.equals("order-1")) {
                failSafe.add("order-3");
            }
        }
        System.out.println("CopyOnWriteArrayList after iteration = " + failSafe);

        Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();
        concurrentMap.put("sku-1", 10);
        for (String key : concurrentMap.keySet()) {
            concurrentMap.put("sku-2", 20);
        }
        System.out.println("ConcurrentHashMap keys = " + concurrentMap.keySet());
        System.out.println("Why it matters: fail-fast helps catch bugs early, while fail-safe and weakly consistent iterators trade strict detection for concurrency.");
    }
```

**What happens**

- Concept: ArrayList iterators are fail-fast.

**What stays stable**

- Concept: ArrayList iterators are fail-fast. Why it matters: fail-fast helps catch bugs early, while fail-safe and weakly consistent iterators trade strict detection for concurrency.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: ArrayList iterators are fail-fast. Why it matters: fail-fast helps catch bugs early, while fail-safe and weakly consistent iterators trade strict detection for concurrency.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: ArrayList iterators are fail-fast. Why it matters: fail-fast helps catch bugs early, while fail-safe and weakly consistent iterators trade strict detection for concurrency.

**Rule**

👉 Rule: Concept: ArrayList iterators are fail-fast.

**Try this**

- Concept: ArrayList iterators are fail-fast.
