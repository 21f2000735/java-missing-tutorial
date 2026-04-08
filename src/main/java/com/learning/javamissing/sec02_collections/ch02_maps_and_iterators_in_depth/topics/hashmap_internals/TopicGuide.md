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

Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key.

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

- Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key.

**What stays stable**

- Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key. Why it matters: mutable keys break lookup because the hash bucket no longer matches the stored entry.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key. Why it matters: mutable keys break lookup because the hash bucket no longer matches the stored entry.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key. Why it matters: mutable keys break lookup because the hash bucket no longer matches the stored entry.

**Rule**

👉 Rule: Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key.

**Try this**

- Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key.
