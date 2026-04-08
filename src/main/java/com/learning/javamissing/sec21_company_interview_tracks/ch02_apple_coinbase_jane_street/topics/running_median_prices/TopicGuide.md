---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
---

# running median prices

## running median prices

**Concept**

Some interviewers want to see whether you can keep an invariant while data keeps arriving.

**Example**

```java
    public static void main(String[] args) {
        RunningMedian median = new RunningMedian();
        median.add(100);
        median.add(103);
        median.add(101);

        // Expected output:
        // median = 101.0
        System.out.println("median = " + median.median());
        System.out.println("Why it works: two heaps keep lower and upper halves balanced.");
        System.out.println("Company lens: Jane Street answers should explain invariants out loud.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- the lower heap stores the lower half");
        System.out.println("- the upper heap stores the upper half");
        System.out.println("- balanced heaps make median lookup cheap");
    }
```

**What happens**

- Why it works: two heaps keep lower and upper halves balanced.
- Company lens: Jane Street answers should explain invariants out loud.
- After reading this example, you should know:

**What stays stable**

- Why it works: two heaps keep lower and upper halves balanced. Company lens: Jane Street answers should explain invariants out loud.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Why it works: two heaps keep lower and upper halves balanced. Company lens: Jane Street answers should explain invariants out loud.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Why it works: two heaps keep lower and upper halves balanced. Company lens: Jane Street answers should explain invariants out loud.

**Rule**

👉 Rule: Why it works: two heaps keep lower and upper halves balanced.

**Try this**

- Insert into the correct heap. 2. Rebalance sizes. 3. Read the median from heap tops.
