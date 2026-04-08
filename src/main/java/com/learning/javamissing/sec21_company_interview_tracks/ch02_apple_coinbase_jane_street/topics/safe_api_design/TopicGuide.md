---
introduced: Java 16
status: stable
runner: embedded
estimated: 6 min
---

# safe API design

## safe API design

**Concept**

Good APIs reduce misuse before misuse becomes a production incident.

**Example**

```java
    public static void main(String[] args) {
        NotificationRequest request = NotificationRequest.of("EMAIL", "ops@example.com", "Payment settled");

        // Expected output:
        // request = NotificationRequest[channel=EMAIL, recipient=ops@example.com, message=Payment settled]
        System.out.println("request = " + request);
        System.out.println("Why it works: the static factory validates required fields before the request exists.");
        System.out.println("Company lens: Apple-style answers should sound like 'hard to misuse' rather than 'more flexible'.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- good APIs prevent invalid states early");
        System.out.println("- validation at the boundary improves correctness");
        System.out.println("- safety is often more valuable than extra flexibility");
    }
```

**What happens**

- Why it works: the static factory validates required fields before the request exists.
- Company lens: Apple-style answers should sound like 'hard to misuse' rather than 'more flexible'.
- After reading this example, you should know:

**What stays stable**

- Why it works: the static factory validates required fields before the request exists. Company lens: Apple-style answers should sound like 'hard to misuse' rather than 'more flexible'.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Why it works: the static factory validates required fields before the request exists. Company lens: Apple-style answers should sound like 'hard to misuse' rather than 'more flexible'.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Why it works: the static factory validates required fields before the request exists. Company lens: Apple-style answers should sound like 'hard to misuse' rather than 'more flexible'.

**Rule**

👉 Rule: Why it works: the static factory validates required fields before the request exists.

**Try this**

- Validate required fields at creation time. 2. Keep the object small and obvious. 3. Expose clear methods instead of vague mutable state.
