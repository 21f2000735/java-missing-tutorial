---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# HashMap Internals

## HashMap Internals

**Concept**

HashMap uses hashCode() to find a bucket and equals() to find the exact key.

**Example**

```java
    public static void main(String[] args) {
        Map<OrderKey, String> orders = new HashMap<>();
        OrderKey paid = new OrderKey("ORD-101");
        OrderKey packed = new OrderKey("ORD-202");

        orders.put(paid, "paid");
        orders.put(packed, "packed");

        System.out.println("Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key.");
        System.out.println("get(ORD-101) = " + orders.get(new OrderKey("ORD-101")));
        System.out.println("collision lookup = " + orders.get(new OrderKey("ORD-202")));

        paid.id = "ORD-999";
        System.out.println("after mutating the key, get(ORD-101) = " + orders.get(new OrderKey("ORD-101")));
        System.out.println("Why it matters: mutable keys break lookup because the hash bucket no longer matches the stored entry.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- HashMap uses hashCode() to find a bucket and equals() to find the exact key.
- mutable keys break lookup because the hash bucket no longer matches the stored entry.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: mutable keys break lookup because the hash bucket no longer matches the stored entry.

**Try this**

- Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key.
