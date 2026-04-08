---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 9 min
---

# HashMap buckets and collisions

## HashMap buckets and collisions

**Concept**

This step focuses on: HashMap looks like instant lookup until collisions and hashing quality become relevant.

HashMap collisions

**Example**

```java
    public static void main(String[] args) {
        System.out.println("Concept: HashMap collisions");
        System.out.println("Problem: fast lookup depends on good key distribution, not on magic.");
        System.out.println();

        Map<CollidingKey, String> sessions = new HashMap<>();
        sessions.put(new CollidingKey("user-101"), "ACTIVE");
        sessions.put(new CollidingKey("user-205"), "EXPIRED");
        sessions.put(new CollidingKey("user-309"), "LOCKED");

        // Expected output:
        // status = EXPIRED
        // sameBucketCount = 3
        System.out.println("status = " + sessions.get(new CollidingKey("user-205")));
        System.out.println("sameBucketCount = " + sessions.size());
        System.out.println("Why it works: collisions do not break lookup when equals/hashCode are implemented correctly.");
        System.out.println("Common mistake: assuming HashMap is always O(1) without thinking about collision patterns.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- HashMap lookup is usually O(1) on average");
        System.out.println("- collisions mean multiple keys land in the same bucket");
        System.out.println("- correct equals/hashCode keeps lookups correct even when collisions happen");
    }
```

**What happens**

- HashMap lookup is usually O(1) on average

**What stays stable**

- HashMap lookup is usually O(1) on average
- HashMap collisions

**What changes**

- assuming HashMap is always O(1) without thinking about collision patterns.

**Why it matters**

collisions do not break lookup when equals/hashCode are implemented correctly.

**Rule**

👉 Rule: HashMap lookup is usually O(1) on average

**Try this**

- Store several keys with the same hash. 2. Read one value back. 3. See that correctness still depends on equals/hashCode, even when collisions exist.

- Next: compare this step with the next topic and notice what changes.
