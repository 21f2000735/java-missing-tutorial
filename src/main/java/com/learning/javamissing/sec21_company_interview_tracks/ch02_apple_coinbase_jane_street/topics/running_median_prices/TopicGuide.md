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

- the lower heap stores the lower half

**What stays stable**

- the lower heap stores the lower half
- two heaps keep lower and upper halves balanced.

**What changes**

- It maintains the median of a growing price stream.

**Why it matters**

two heaps keep lower and upper halves balanced.

**Rule**

👉 Rule: the lower heap stores the lower half

**Try this**

- Insert into the correct heap. 2. Rebalance sizes. 3. Read the median from heap tops.
