---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 8 min
---

# ArrayList growth and lookup

## ArrayList growth and lookup

**Concept**

ArrayList feels simple on the surface, but its backing-array behavior explains why some operations are cheap and some are not.

**Example**

```java
    public static void main(String[] args) {
        System.out.println("Concept: ArrayList internals");
        System.out.println("Problem: appends look cheap, but hidden resize work still exists.");
        System.out.println();

        List<String> recentOrders = new ArrayList<>();
        int copiedDuringGrowth = appendWithEstimatedCopyWork(recentOrders, 12);

        // Expected output:
        // itemAtIndex4 = order-5
        // estimatedCopiesDuringGrowth = 10
        System.out.println("itemAtIndex4 = " + recentOrders.get(4));
        System.out.println("estimatedCopiesDuringGrowth = " + copiedDuringGrowth);
        System.out.println("Why it works: index access is direct, but resizing copies old elements into a larger array.");
        System.out.println("Common mistake: saying append is always free instead of amortized.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- index lookup is fast because ArrayList stores elements in a contiguous backing array");
        System.out.println("- growth is usually cheap but occasional resize copies old elements");
        System.out.println("- append is amortized O(1), not magically free");
    }
```

**What happens**

- Concept: ArrayList internals
- Problem: appends look cheap, but hidden resize work still exists.
- Why it works: index access is direct, but resizing copies old elements into a larger array.

**What stays stable**

- Concept: ArrayList internals Problem: appends look cheap, but hidden resize work still exists. Why it works: index access is direct, but resizing copies old elements into a larger array.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: ArrayList internals Problem: appends look cheap, but hidden resize work still exists. Why it works: index access is direct, but resizing copies old elements into a larger array.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: ArrayList internals Problem: appends look cheap, but hidden resize work still exists. Why it works: index access is direct, but resizing copies old elements into a larger array.

**Rule**

👉 Rule: Concept: ArrayList internals Problem: appends look cheap, but hidden resize work still exists.

**Try this**

- Append items while estimating resize-copy work. 2. Read one item by index. 3. Compare cheap common appends with occasional expensive growth.
